const EVERQUOTE_VEHICLE_ASSETS_BASE =
  "https://consumer-assets.everquote.com/static-assets/tests-assets/auto/form/vehicles"

export function makeNameToEverquoteLogoSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-")
}

export function getEverquoteMakeLogoUrl(makeName: string): string {
  const slug = makeNameToEverquoteLogoSlug(makeName)
  return `${EVERQUOTE_VEHICLE_ASSETS_BASE}/${slug}.png`
}
