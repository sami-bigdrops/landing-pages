import { NextRequest, NextResponse } from "next/server"

import {
  AUTH_COOKIE,
  createSession,
  findUserByUsername,
  verifyPassword,
} from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { username?: string; password?: string }
    const username = body.username?.trim() ?? ""
    const password = body.password ?? ""

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      )
    }

    const user = await findUserByUsername(username)
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      )
    }

    const sessionToken = await createSession(user.id)
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
    })
    response.cookies.set(AUTH_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch (error) {
    console.error("[auth:login] failed", error)
    return NextResponse.json({ success: false, error: "Failed to login." }, { status: 500 })
  }
}
