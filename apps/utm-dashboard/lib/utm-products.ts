export const UTM_PRODUCT_TABS = [
  { id: "auto_insurance_quotifii", label: "Auto Insurance Quotifii" },
  { id: "auto_veterans_quotifii", label: "Auto Veterans Quotifii" },
] as const

export type UtmProductId = (typeof UTM_PRODUCT_TABS)[number]["id"]

export const DEFAULT_UTM_PRODUCT_ID: UtmProductId = UTM_PRODUCT_TABS[0].id

const ALLOWED = new Set<string>(UTM_PRODUCT_TABS.map((t) => t.id))

export function isUtmProductId(id: string | null | undefined): id is UtmProductId {
  return id != null && ALLOWED.has(id)
}

export function parseUtmProductIdParam(raw: string | null): UtmProductId {
  if (isUtmProductId(raw)) return raw
  return DEFAULT_UTM_PRODUCT_ID
}
