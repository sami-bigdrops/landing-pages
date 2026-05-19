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

export const UTM_PARAM_KEYS_SHOWN_FOR_PRODUCT: Partial<Record<string, ReadonlySet<string>>> = {
  home_insurance_quotifii: new Set(["utm_source", "utm_s1"]),
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

export function filterUtmRowsForProductDisplay<T extends { key: string }>(
  productId: string,
  rows: T[]
): T[] {
  const allowed = UTM_PARAM_KEYS_SHOWN_FOR_PRODUCT[productId]
  if (!allowed) return rows
  return rows.filter((row) => allowed.has(row.key))
}
