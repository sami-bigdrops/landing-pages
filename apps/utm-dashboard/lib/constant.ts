export { BRANDS, getBrandByHostname, getBrandById } from "./brand-config"
export type { BrandDefinition, BrandColors } from "./brand-config"
export {
  UTM_PRODUCTS_BY_BRAND,
  ALLOWED_UTM_PARAM_KEYS,
  getUtmProductTabsForBrand,
  getDefaultUtmProductId,
  parseUtmProductIdParam,
  isUtmProductIdForBrand,
  isAllowedUtmParamKey,
  filterAllowedUtmParams,
  getUtmParamLabel,
} from "./utm-products"
export type { UtmProductTab } from "./utm-products"
