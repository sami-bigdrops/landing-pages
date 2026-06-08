import { NextRequest, NextResponse } from "next/server"
import { verifyEmailWithHunter } from "@/lib/hunter-verify-email"
import { validateEmail } from "@/lib/validate-email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body.email ?? "").trim()

    const localError = validateEmail(email)
    if (localError) {
      return NextResponse.json({ error: localError }, { status: 400 })
    }

    const result = await verifyEmailWithHunter(email)
    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 422 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Email verification failed. Please try again." },
      { status: 500 }
    )
  }
}
