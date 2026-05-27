import { NextRequest, NextResponse } from "next/server"

const EVERQUOTE_API = "https://vehicle-service.services.everquote.com/findV2"

interface EverQuoteResponse {
  Options?: string[]
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const make = searchParams.get("make")
  const year = searchParams.get("year")
  const type = searchParams.get("type") || "car"

  if (!make || !year) {
    return NextResponse.json(
      { error: "make and year are required" },
      { status: 400 }
    )
  }

  if (type !== "car" && type !== "motorcycle") {
    return NextResponse.json(
      { error: "type must be car or motorcycle" },
      { status: 400 }
    )
  }

  const url = `${EVERQUOTE_API}/${encodeURIComponent(year)}/${type}/${encodeURIComponent(make.toUpperCase())}`

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch models" },
        { status: 502 }
      )
    }

    const data: EverQuoteResponse = await response.json()
    const models = [...new Set(data?.Options ?? [])]
      .filter((n) => n.trim().length > 0)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ name }))

    return NextResponse.json(models, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    )
  }
}
