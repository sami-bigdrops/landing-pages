const LOGO_REPO_BASE =
  "https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos"

export const CAR_LOGOS_DATASET_URLS = [
  `${LOGO_REPO_BASE}/dataset.json`,
  `${LOGO_REPO_BASE}/data.json`,
] as const

export const CAR_LOGO_THUMB_BASE = `${LOGO_REPO_BASE}/thumb`

export interface CarLogoDatasetEntry {
  name: string
  slug: string
  image?: {
    thumb?: string
    optimized?: string
    original?: string
  }
}

let cachedDataset: CarLogoDatasetEntry[] | null = null
let cachedSlugIndex: Map<string, string> | null = null

export function getCarLogoThumbUrl(slug: string): string {
  return `${CAR_LOGO_THUMB_BASE}/${slug}.png`
}

export function makeNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function buildSlugIndex(dataset: CarLogoDatasetEntry[]): Map<string, string> {
  const index = new Map<string, string>()

  for (const entry of dataset) {
    index.set(entry.slug, entry.slug)
    index.set(normalizeKey(entry.slug), entry.slug)
    index.set(normalizeKey(entry.name), entry.slug)
    index.set(makeNameToSlug(entry.name), entry.slug)
  }

  return index
}

async function fetchDataset(): Promise<CarLogoDatasetEntry[]> {
  let lastError: unknown

  for (const url of CAR_LOGOS_DATASET_URLS) {
    try {
      const response = await fetch(url)
      if (!response.ok) continue
      const data = (await response.json()) as CarLogoDatasetEntry[]
      if (Array.isArray(data) && data.length > 0) return data
    } catch (error) {
      lastError = error
    }
  }

  throw new Error("Failed to load car logos dataset", { cause: lastError })
}

export async function loadCarLogosDataset(): Promise<CarLogoDatasetEntry[]> {
  if (cachedDataset) return cachedDataset

  cachedDataset = await fetchDataset()
  cachedSlugIndex = buildSlugIndex(cachedDataset)
  return cachedDataset
}

export async function getCarLogoSlugIndex(): Promise<Map<string, string>> {
  if (cachedSlugIndex) return cachedSlugIndex
  await loadCarLogosDataset()
  return cachedSlugIndex!
}

export function resolveCarLogoSlug(
  makeName: string,
  slugIndex: Map<string, string>
): string | null {
  const candidates = [makeNameToSlug(makeName), normalizeKey(makeName)]

  for (const key of candidates) {
    const slug = slugIndex.get(key)
    if (slug) return slug
  }

  return null
}

export async function resolveCarLogoThumbUrl(makeName: string): Promise<string | null> {
  const slugIndex = await getCarLogoSlugIndex()
  const slug = resolveCarLogoSlug(makeName, slugIndex)
  return slug ? getCarLogoThumbUrl(slug) : null
}
