import { NextRequest, NextResponse } from "next/server"
import { verifyPhone } from "@/lib/veriphone-verify-phone"

const PHONE_ERROR = "Please enter a valid 10-digit phone number"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const phone = String(body.phoneNumber ?? body.phone ?? "").trim()
    const digits = phone.replace(/\D/g, "")

    if (digits.length !== 10) {
      return NextResponse.json({ error: PHONE_ERROR }, { status: 400 })
    }

    const veriphoneKey = process.env.VERIPHONE_API_KEY?.trim()
    if (!veriphoneKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[veriphone] VERIPHONE_API_KEY is not set; skipping phone verification")
      }
      return NextResponse.json({ ok: true })
    }

    const verification = await verifyPhone(phone, veriphoneKey, "US")
    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error ?? "Please enter a valid phone number" },
        { status: 422 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Phone verification failed. Please try again." },
      { status: 500 }
    )
  }
}
