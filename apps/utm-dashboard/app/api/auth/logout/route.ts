import { NextRequest, NextResponse } from "next/server"

import { AUTH_COOKIE, deleteSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE)?.value
    if (token) {
      await deleteSession(token)
    }
    const response = NextResponse.json({ success: true })
    response.cookies.set(AUTH_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    })
    return response
  } catch (error) {
    console.error("[auth:logout] failed", error)
    return NextResponse.json({ success: false, error: "Failed to logout." }, { status: 500 })
  }
}
