import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"

    console.log(
      "[ccpa-request]",
      JSON.stringify(
        {
          ...body,
          ip,
          userAgent: request.headers.get("user-agent") ?? "",
          submittedAt: new Date().toISOString(),
        },
        null,
        2
      )
    )

    return NextResponse.json({
      success: true,
      message: "CCPA request received",
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
