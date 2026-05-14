type GeocodeAddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

type GeocodeResponse = {
  status: string
  results: Array<{
    address_components: GeocodeAddressComponent[]
  }>
}

export type GeocodedAddress = {
  city: string
  state: string
}

export async function geocodeAddress(address: string, zipCode: string): Promise<GeocodedAddress> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    console.warn("[geocode] NEXT_PUBLIC_GOOGLE_PLACES_API_KEY is not set; skipping geocoding")
    return { city: "", state: "" }
  }

  const query = `${address.trim()}, ${zipCode.trim()}`
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json")
  url.searchParams.set("address", query)
  url.searchParams.set("key", apiKey)
  url.searchParams.set("components", "country:US")

  try {
    const res = await fetch(url.toString(), { method: "GET", cache: "no-store" })
    if (!res.ok) {
      console.warn("[geocode] API HTTP error:", res.status)
      return { city: "", state: "" }
    }

    const data = (await res.json()) as GeocodeResponse

    if (data.status !== "OK" || !data.results.length) {
      console.warn("[geocode] No results for address. Status:", data.status)
      return { city: "", state: "" }
    }

    const components = data.results[0].address_components
    let city = ""
    let state = ""

    for (const c of components) {
      if (c.types.includes("locality")) city = c.long_name
      if (c.types.includes("sublocality_level_1") && !city) city = c.long_name
      if (c.types.includes("administrative_area_level_1")) state = c.short_name
    }

    return { city, state }
  } catch (e) {
    console.error("[geocode] Fetch error:", e)
    return { city: "", state: "" }
  }
}
