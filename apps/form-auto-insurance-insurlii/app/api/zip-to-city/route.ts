import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get("zip")?.replace(/\D/g, "").slice(0, 5)
  if (!zip || zip.length !== 5) {
    return NextResponse.json({ city: null })
  }

  try {
    const zippoRes = await fetch(`https://api.zippopotam.us/us/${zip}`, { cache: "no-store" })
    if (zippoRes.ok) {
      const zippo = await zippoRes.json().catch(() => null)
      const placeName = zippo?.places?.[0]?.["place name"]
      if (placeName) return NextResponse.json({ city: String(placeName) })
    }
  } catch {
    // fallback below
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search")
    url.searchParams.set("postalcode", zip)
    url.searchParams.set("country", "United States")
    url.searchParams.set("format", "json")
    url.searchParams.set("limit", "1")
    url.searchParams.set("addressdetails", "1")

    const res = await fetch(url.toString(), {
      headers: { "User-Agent": "form-auto-insurance-insurlii/1.0" },
      cache: "no-store",
    })
    const data = await res.json().catch(() => null)

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ city: null })
    }

    const place = data[0]
    const address = place?.address
    let city =
      address?.city ??
      address?.town ??
      address?.village ??
      address?.municipality ??
      address?.county ??
      null

    if (!city && place?.display_name) {
      const parts = String(place.display_name).split(",").map((p: string) => p.trim())
      if (parts.length >= 2) city = parts[1]
      else if (parts.length === 1) city = parts[0]
    }

    return NextResponse.json({ city: city ? String(city) : null })
  } catch {
    return NextResponse.json({ city: null })
  }
}
