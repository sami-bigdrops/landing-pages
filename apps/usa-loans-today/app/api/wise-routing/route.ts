import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const routing = request.nextUrl.searchParams.get("routing")?.replace(/\D/g, "")
  if (!routing || routing.length !== 9) {
    return NextResponse.json({ error: "Invalid routing number" }, { status: 400 })
  }

  try {
    const res = await fetch(`https://www.routingnumbers.info/api/data.json?rn=${routing}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Bank lookup failed" }, { status: 404 })
    }

    const data = (await res.json()) as { code?: number; customer_name?: string }
    if (data.code !== 200 || !data.customer_name) {
      return NextResponse.json({ error: "Bank not found" }, { status: 404 })
    }

    return NextResponse.json({
      routingNumber: routing,
      bankName: data.customer_name,
    })
  } catch {
    return NextResponse.json({ error: "Bank lookup failed" }, { status: 500 })
  }
}
