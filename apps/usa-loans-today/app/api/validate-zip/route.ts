import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get("zip")?.replace(/\D/g, "").slice(0, 5)
  if (!zip || zip.length !== 5) {
    return NextResponse.json(
      { valid: false, isNewYork: false, error: "Please enter a valid 5-digit US zip code" },
      { status: 400 }
    )
  }

  try {
    const zippoRes = await fetch(`https://api.zippopotam.us/us/${zip}`, { cache: "no-store" })
    if (!zippoRes.ok) {
      return NextResponse.json(
        { valid: false, isNewYork: false, error: "Please enter a valid US zip code" },
        { status: 400 }
      )
    }

    const zippo = await zippoRes.json()
    const place = zippo?.places?.[0]
    const city = place?.["place name"] ? String(place["place name"]) : ""
    const stateAbbreviation = place?.["state abbreviation"]
      ? String(place["state abbreviation"])
      : ""

    if (stateAbbreviation.toUpperCase() === "NY") {
      return NextResponse.json({
        valid: false,
        isNewYork: true,
        error: "We do not provide service in New York",
        city,
        stateAbbreviation,
      })
    }

    return NextResponse.json({
      valid: true,
      isNewYork: false,
      city,
      stateAbbreviation,
    })
  } catch {
    return NextResponse.json(
      { valid: false, isNewYork: false, error: "Please enter a valid US zip code" },
      { status: 500 }
    )
  }
}
