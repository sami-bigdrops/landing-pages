import { NextResponse } from "next/server"
import { desc } from "drizzle-orm"
import { db } from "@/lib/db"
import { years } from "@/lib/db/schema"
import { fetchYearsFromEndurance } from "@/lib/vehicle-years"

const QUERY_TIMEOUT_MS = 3_000

const cacheHeaders = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
}

async function fetchYearsFromDb() {
  return db
    .select({ id: years.id, year: years.year })
    .from(years)
    .orderBy(desc(years.year))
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Database query timed out")), ms)
    }),
  ])
}

export async function GET() {
  try {
    const rows = await withTimeout(fetchYearsFromDb(), QUERY_TIMEOUT_MS)

    if (rows.length > 0) {
      return NextResponse.json({ years: rows }, { headers: cacheHeaders })
    }
  } catch (error) {
    console.warn("years API: database unavailable, using Endurance fallback:", error)
  }

  try {
    const rows = await fetchYearsFromEndurance()
    return NextResponse.json({ years: rows }, { headers: cacheHeaders })
  } catch (error) {
    console.error("years API error:", error)
    return NextResponse.json({ error: "Failed to fetch years" }, { status: 503 })
  }
}
