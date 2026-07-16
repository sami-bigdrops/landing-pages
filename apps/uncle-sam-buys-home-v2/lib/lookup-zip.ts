export type ZipLookupResult = {
  city: string
  state: string
}

export async function lookupCityStateByZip(zipCode: string): Promise<ZipLookupResult> {
  const zip = zipCode.replace(/\D/g, "").slice(0, 5)
  if (zip.length !== 5) return { city: "", state: "" }

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`, { cache: "no-store" })
    if (!res.ok) return { city: "", state: "" }

    const data = (await res.json()) as {
      places?: Array<{
        "place name"?: string
        "state abbreviation"?: string
      }>
    }

    const place = data.places?.[0]
    if (!place) return { city: "", state: "" }

    return {
      city: String(place["place name"] ?? "").trim(),
      state: String(place["state abbreviation"] ?? "").trim(),
    }
  } catch {
    return { city: "", state: "" }
  }
}
