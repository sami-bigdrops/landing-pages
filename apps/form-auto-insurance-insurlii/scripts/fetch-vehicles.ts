import "../lib/load-env.js"
import axios from "axios"
import {
  getCarLogoSlugIndex,
  getCarLogoThumbUrl,
  loadCarLogosDataset,
  resolveCarLogoSlug,
} from "../lib/car-logos.js"
import { db } from "../lib/db/index.js"
import { bikeMakes, carMakes, years } from "../lib/db/schema.js"

const YEARS_API = "https://leadsubmission.enduranceapi.com/api/v2/vehicle/years"
const EVERQUOTE_API = "https://vehicle-service.services.everquote.com/findV2"

const BATCH_SIZE = 200
const MAX_RETRIES = 5
const INITIAL_DELAY = 2000
const API_CONCURRENCY = 5

interface ApiYear { id: number; name: string }
interface EverQuoteResponse { Options?: string[] }

function elapsed(start: number): string {
  const ms = Date.now() - start
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === retries) throw error

      const status = axios.isAxiosError(error) ? error.response?.status : undefined
      const isBlock = status === 403 || status === 429 || (status !== undefined && status >= 500)

      const delay = isBlock
        ? INITIAL_DELAY * Math.pow(2, attempt)
        : INITIAL_DELAY * attempt

      await sleep(delay)
    }
  }
  throw new Error("Max retries reached")
}

async function processConcurrently<T>(
  items: T[],
  fn: (item: T) => Promise<void>,
  concurrency: number
): Promise<void> {
  const executing: Promise<void>[] = []

  for (const item of items) {
    const promise = fn(item).then(() => {
      executing.splice(executing.indexOf(promise), 1)
    })
    executing.push(promise)

    if (executing.length >= concurrency) {
      await Promise.race(executing)
    }
  }

  await Promise.all(executing)
}

async function fetchYears(): Promise<ApiYear[]> {
  const { data } = await axios.get<ApiYear[]>(YEARS_API)
  return data.filter((y) => y.id !== 0 && y.name !== "0")
}

async function fetchEverQuoteMakes(year: number, type: "car" | "motorcycle"): Promise<string[]> {
  const { data } = await axios.get<EverQuoteResponse>(`${EVERQUOTE_API}/${year}/${type}`)
  if (!data?.Options || !Array.isArray(data.Options)) return []
  return data.Options.filter((name) => name.trim().length > 0)
}

async function collectAllMakes(
  yearValues: number[],
  type: "car" | "motorcycle"
): Promise<string[]> {
  const allNames = new Set<string>()
  let completed = 0

  await processConcurrently(
    yearValues,
    async (year) => {
      try {
        const names = await fetchWithRetry(() => fetchEverQuoteMakes(year, type))
        for (const name of names) {
          allNames.add(name.trim())
        }
      } catch {
        // year might not be supported by EverQuote (pre-1981)
      }

      completed++
      if (completed % 10 === 0 || completed === yearValues.length) {
        console.log(`  ${type} makes: ${completed}/${yearValues.length} years scanned, ${allNames.size} unique makes`)
      }
    },
    API_CONCURRENCY
  )

  return [...allNames].sort((a, b) => a.localeCompare(b))
}

async function upsertYears(apiYears: ApiYear[]): Promise<number> {
  const values = apiYears
    .map((y) => ({ apiYearId: y.id, year: parseInt(y.name, 10) }))
    .filter((y) => !Number.isNaN(y.year) && y.year > 0)
    .sort((a, b) => b.year - a.year)

  let count = 0
  for (const batch of chunk(values, BATCH_SIZE)) {
    const rows = await db
      .insert(years)
      .values(batch)
      .onConflictDoUpdate({ target: years.apiYearId, set: { year: years.year } })
      .returning({ id: years.id })
    count += rows.length
  }
  return count
}

async function upsertCarMakes(
  names: string[],
  logoResolver: (name: string) => string | null
): Promise<number> {
  let count = 0
  for (const batch of chunk(names, BATCH_SIZE)) {
    const rows = await db
      .insert(carMakes)
      .values(batch.map((name) => ({ name, logoUrl: logoResolver(name) })))
      .onConflictDoUpdate({
        target: carMakes.name,
        set: { logoUrl: carMakes.logoUrl },
      })
      .returning({ id: carMakes.id })
    count += rows.length
  }
  return count
}

async function upsertBikeMakes(
  names: string[],
  logoResolver: (name: string) => string | null
): Promise<number> {
  let count = 0
  for (const batch of chunk(names, BATCH_SIZE)) {
    const rows = await db
      .insert(bikeMakes)
      .values(batch.map((name) => ({ name, logoUrl: logoResolver(name) })))
      .onConflictDoUpdate({
        target: bikeMakes.name,
        set: { logoUrl: bikeMakes.logoUrl },
      })
      .returning({ id: bikeMakes.id })
    count += rows.length
  }
  return count
}

function buildLogoResolver(
  slugIndex: Map<string, string>
): (makeName: string) => string | null {
  return (makeName: string) => {
    const slug = resolveCarLogoSlug(makeName, slugIndex)
    return slug ? getCarLogoThumbUrl(slug) : null
  }
}

async function main() {
  const t0 = Date.now()

  try {
    // Phase 1: Fetch years + logo dataset in parallel
    console.log("[1/3] Fetching years and logo dataset...")
    const phase1Start = Date.now()

    const [apiYears] = await Promise.all([
      fetchWithRetry(fetchYears),
      loadCarLogosDataset(),
    ])

    const yearValues = apiYears
      .map((y) => parseInt(y.name, 10))
      .filter((y) => !Number.isNaN(y) && y > 0)
      .sort((a, b) => b - a)

    console.log(`  Fetched ${apiYears.length} years, logo dataset loaded (${elapsed(phase1Start)})`)

    // Phase 2: Collect all makes across years from EverQuote
    console.log("[2/3] Collecting makes from EverQuote across all years...")
    const phase2Start = Date.now()

    const [carMakeNames, bikeMakeNames] = await Promise.all([
      collectAllMakes(yearValues, "car"),
      collectAllMakes(yearValues, "motorcycle"),
    ])

    console.log(
      `  Found ${carMakeNames.length} unique car makes, ${bikeMakeNames.length} unique motorcycle makes (${elapsed(phase2Start)})`
    )

    // Phase 3: Upsert everything to DB
    console.log("[3/3] Upserting to database...")
    const phase3Start = Date.now()

    const slugIndex = await getCarLogoSlugIndex()
    const logoResolver = buildLogoResolver(slugIndex)

    const [yearCount, carMakeCount, bikeMakeCount] = await Promise.all([
      upsertYears(apiYears),
      upsertCarMakes(carMakeNames, logoResolver),
      upsertBikeMakes(bikeMakeNames, logoResolver),
    ])

    console.log(
      `  Upserted ${yearCount} years, ${carMakeCount} car makes (with logos), ${bikeMakeCount} bike makes (with logos) (${elapsed(phase3Start)})`
    )

    console.log(`\nDone in ${elapsed(t0)}`)
    console.log(`  Years:      ${yearCount}`)
    console.log(`  Car makes:  ${carMakeCount}`)
    console.log(`  Bike makes: ${bikeMakeCount}`)

    process.exit(0)
  } catch (error) {
    console.error(`\nFailed after ${elapsed(t0)}`)
    console.error("Error:", error)
    if (axios.isAxiosError(error)) {
      console.error("API details:", {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      })
    }
    process.exit(1)
  }
}

main()
