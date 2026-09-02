export type AddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

export type PlacePredictionText = {
  description?: string
  structured_formatting?: {
    main_text?: string
    secondary_text?: string
  }
  terms?: Array<{ value: string }>
}

export function parseAddressComponents(components: AddressComponent[]) {
  let streetNumber = ""
  let route = ""
  let parsedCity = ""
  let parsedState = ""
  let parsedZip = ""

  for (const c of components) {
    if (c.types.includes("street_number")) streetNumber = c.long_name
    if (c.types.includes("route")) route = c.long_name
    if (c.types.includes("locality")) parsedCity = c.long_name
    if (c.types.includes("postal_town") && !parsedCity) parsedCity = c.long_name
    if (c.types.includes("neighborhood") && !parsedCity) parsedCity = c.long_name
    if (c.types.includes("sublocality") && !parsedCity) parsedCity = c.long_name
    if (c.types.includes("sublocality_level_1") && !parsedCity) parsedCity = c.long_name
    if (c.types.includes("administrative_area_level_2") && !parsedCity) parsedCity = c.long_name
    if (c.types.includes("administrative_area_level_3") && !parsedCity) parsedCity = c.long_name
    if (c.types.includes("administrative_area_level_1")) parsedState = c.short_name
    if (c.types.includes("postal_code")) parsedZip = c.long_name
  }

  return { streetNumber, route, parsedCity, parsedState, parsedZip }
}

export function parseCityStateFromTerms(terms?: Array<{ value: string }>): { city: string; state: string } {
  if (!terms?.length) return { city: "", state: "" }

  for (let i = 0; i < terms.length; i++) {
    const term = terms[i]?.value?.trim() ?? ""
    if (/^[A-Z]{2}$/.test(term)) {
      const city = i > 0 ? (terms[i - 1]?.value?.trim() ?? "") : ""
      if (city && city.toUpperCase() !== term) {
        return { city, state: term }
      }
    }
  }

  return { city: "", state: "" }
}

export function parseCityStateFromCommaSeparated(text: string): { city: string; state: string } {
  const parts = text
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)

  for (let i = 0; i < parts.length - 1; i++) {
    const cityCandidate = parts[i] ?? ""
    const stateMatch = parts[i + 1]?.match(/^([A-Z]{2})(?:\s+\d{5})?\b/i)
    const stateCode = stateMatch?.[1]
    if (!stateCode || !cityCandidate) continue
    if (/USA|United States/i.test(cityCandidate)) continue
    if (i === 0 && /\d/.test(cityCandidate)) continue
    return { city: cityCandidate, state: stateCode.toUpperCase() }
  }

  if (parts.length >= 2) {
    const stateMatch = parts[1]?.match(/^([A-Z]{2})\b/i)
    if (stateMatch?.[1] && parts[0]) {
      return { city: parts[0], state: stateMatch[1].toUpperCase() }
    }
  }

  return { city: "", state: "" }
}

export function parseCityStateFromPrediction(pred: PlacePredictionText): { city: string; state: string } {
  const fromTerms = parseCityStateFromTerms(pred.terms)
  if (fromTerms.city && fromTerms.state) return fromTerms

  const fromDescription = parseCityStateFromCommaSeparated(pred.description ?? "")
  if (fromDescription.city && fromDescription.state) return fromDescription

  const fromSecondary = parseCityStateFromCommaSeparated(pred.structured_formatting?.secondary_text ?? "")
  if (fromSecondary.city && fromSecondary.state) return fromSecondary

  return {
    city: fromTerms.city || fromDescription.city || fromSecondary.city,
    state: fromTerms.state || fromDescription.state || fromSecondary.state,
  }
}
