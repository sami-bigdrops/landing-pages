export type BrandColors = {
  primary: string
  secondary: string
  accent: string
}

export type BrandDefinition = {
  id: string
  brandName: string
  logo: string
  favicon: string
  colors: BrandColors
  hosts: readonly string[]
}

const DEFAULT_BRAND_ID = "quotifii"

export const BRANDS: readonly BrandDefinition[] = [
  {
    id: "quotifii",
    brandName: "Quotifii",
    logo: "/logos/quotifii-logo.svg",
    favicon: "/favicons/quotifii-favicon.png",
    colors: {
      primary: "#3498DB",
      secondary: "#2C3E50",
      accent: "#1ABC9C",
    },
    hosts: ["dashboard.quotifii.com", "localhost"],
  },
  {
    id: "insurlii",
    brandName: "Insurlii",
    logo: "/logos/insurlii-logo.svg",
    favicon: "/favicons/insurlii-favicon.png",
    colors: {
      primary: "#1D4ED8",
      secondary: "#0F172A",
      accent: "#FF5715",
    },
    hosts: ["dashboard.insurlii.com"],
  },
  {
    id: "assurerates",
    brandName: "Assurerates",
    logo: "/logos/assurerates-logo.svg",
    favicon: "/logos/assurerates-logo.svg",
    colors: {
      primary: "#0F766E",
      secondary: "#134E4A",
      accent: "#F59E0B",
    },
    hosts: ["dashboard.assurerates.com"],
  },
] as const satisfies readonly BrandDefinition[]

export function normalizeHostname(host: string): string {
  return host.split(":")[0]?.toLowerCase() ?? ""
}

export function getBrandById(id: string): BrandDefinition | undefined {
  return BRANDS.find((b) => b.id === id)
}

export function getBrandByHostname(hostname: string): BrandDefinition {
  const normalized = normalizeHostname(hostname)
  for (const brand of BRANDS) {
    if (brand.hosts.includes(normalized)) return brand
  }
  const fallback = getBrandById(DEFAULT_BRAND_ID)
  if (!fallback) throw new Error(`Missing default brand: ${DEFAULT_BRAND_ID}`)
  return fallback
}
