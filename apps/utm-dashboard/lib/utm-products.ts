export type UtmProductTab = {
  id: string
  label: string
}

export const UTM_PRODUCTS_BY_BRAND: Record<string, readonly UtmProductTab[]> = {
  quotifii: [
    { id: "auto_insurance_quotifii", label: "Auto Insurance Quotifii" },
    { id: "auto_veterans_quotifii", label: "Auto Veterans Quotifii" },
    { id: "home_insurance_quotifii", label: "Home Insurance Quotifii" },
  ],
  insurlii: [{ id: "auto_insurance_insurlii", label: "Auto Insurance" }],
  assurerates: [],
}

export const ALLOWED_UTM_PARAM_KEYS = ["utm_source", "utm_s1"] as const

export type AllowedUtmParamKey = (typeof ALLOWED_UTM_PARAM_KEYS)[number]

export function isAllowedUtmParamKey(key: string): key is AllowedUtmParamKey {
  return (ALLOWED_UTM_PARAM_KEYS as readonly string[]).includes(key)
}

export function filterAllowedUtmParams<T extends { key: string }>(rows: T[]): T[] {
  return rows.filter((row) => isAllowedUtmParamKey(row.key))
}

export function getUtmParamLabel(key: string): string {
  if (key === "utm_source") return "Source"
  if (key === "utm_s1") return "S1"
  return key
}

export function getUtmProductTabsForBrand(brandId: string): readonly UtmProductTab[] {
  return UTM_PRODUCTS_BY_BRAND[brandId] ?? []
}

export function getDefaultUtmProductId(brandId: string): string {
  const tabs = getUtmProductTabsForBrand(brandId)
  return tabs[0]?.id ?? "auto_insurance_quotifii"
}

export function isUtmProductIdForBrand(
  brandId: string,
  id: string | null | undefined
): boolean {
  if (id == null) return false
  return getUtmProductTabsForBrand(brandId).some((tab) => tab.id === id)
}

export function parseUtmProductIdParam(brandId: string, raw: string | null): string {
  if (isUtmProductIdForBrand(brandId, raw)) return raw!
  return getDefaultUtmProductId(brandId)
}

