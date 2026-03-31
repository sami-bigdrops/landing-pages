import { NextRequest, NextResponse } from "next/server"

import { AUTH_COOKIE, createSession, createUser, findUserByUsername } from "@/lib/auth"

function validate(username: string, password: string): string | null {
  if (!username || !password) return "Username and password are required."
  if (!/^[a-zA-Z0-9._-]{3,30}$/.test(username)) {
    return "Username must be 3-30 chars and only letters, numbers, dot, dash or underscore."
  }
  if (password.length < 8) return "Password must be at least 8 characters."
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      username?: string
      password?: string
    }
    const username = body.username?.trim() ?? ""
    const password = body.password ?? ""

    const validationError = validate(username, password)
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 })
    }

    const exists = await findUserByUsername(username)
    if (exists) {
      return NextResponse.json(
        { success: false, error: "Username already exists." },
        { status: 409 }
      )
    }

    const user = await createUser(username, password)
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
    console.error("[auth:register] failed", error)
    return NextResponse.json({ success: false, error: "Failed to register." }, { status: 500 })
  }
}
