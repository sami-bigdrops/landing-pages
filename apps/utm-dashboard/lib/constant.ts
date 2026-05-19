export { BRANDS, getBrandByHostname, getBrandById } from "./brand-config"
export type { BrandDefinition, BrandColors } from "./brand-config"
export {
  UTM_PRODUCTS_BY_BRAND,
  getUtmProductTabsForBrand,
  getDefaultUtmProductId,
  parseUtmProductIdParam,
  isUtmProductIdForBrand,
  filterUtmRowsForProductDisplay,
} from "./utm-products"
export type { UtmProductTab } from "./utm-products"
