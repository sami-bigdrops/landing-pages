import { lookupCityStateByZip } from "@/lib/lookup-zip"
import { parseAddressComponents } from "@/lib/parse-place-address"

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
  const zip = zipCode.trim()
  let city = ""
  let state = ""

  if (apiKey) {
    const query = `${address.trim()}, ${zip}`
    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json")
    url.searchParams.set("address", query)
    url.searchParams.set("key", apiKey)
    url.searchParams.set("components", "country:US")

    try {
      const res = await fetch(url.toString(), { method: "GET", cache: "no-store" })
      if (res.ok) {
        const data = (await res.json()) as GeocodeResponse
        if (data.status === "OK" && data.results.length > 0) {
          const firstResult = data.results[0]
          if (firstResult) {
            const parsed = parseAddressComponents(firstResult.address_components)
            city = parsed.parsedCity
            state = parsed.parsedState
          }
        } else {
          console.warn("[geocode] No results for address. Status:", data.status)
        }
      } else {
        console.warn("[geocode] API HTTP error:", res.status)
      }
    } catch (e) {
      console.error("[geocode] Fetch error:", e)
    }
  } else {
    console.warn("[geocode] NEXT_PUBLIC_GOOGLE_PLACES_API_KEY is not set; skipping geocoding")
  }

  if (!city || !state) {
    const fromZip = await lookupCityStateByZip(zip)
    city = city || fromZip.city
    state = state || fromZip.state
  }

  return { city, state }
}
