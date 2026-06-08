import { NextRequest, NextResponse } from "next/server"
import { getEverquoteMakeLogoUrl } from "@/lib/everquote-vehicle-logos"
import type { FormVehicleType } from "@/lib/constant"

const EVERQUOTE_API = "https://vehicle-service.services.everquote.com/findV2"

interface EverQuoteResponse {
  Options?: string[]
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const year = searchParams.get("year")
  const type = (searchParams.get("type") || "car") as FormVehicleType

  if (!year) {
    return NextResponse.json({ error: "year is required" }, { status: 400 })
  }

  if (type !== "car") {
    return NextResponse.json(
      { error: "type must be car" },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(`${EVERQUOTE_API}/${encodeURIComponent(year)}/${type}`, {
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch makes" },
        { status: 502 }
      )
    }

    const data: EverQuoteResponse = await response.json()
    const names = [...new Set(data?.Options ?? [])].filter((n) => n.trim().length > 0)
    names.sort((a, b) => a.localeCompare(b))

    const makes = names.map((name) => ({
      name,
      logoUrl: getEverquoteMakeLogoUrl(name),
    }))

    return NextResponse.json(makes, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch makes" },
      { status: 500 }
    )
  }
}
