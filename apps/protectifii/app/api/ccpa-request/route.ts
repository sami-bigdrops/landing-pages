import { NextRequest, NextResponse } from "next/server"

import {
  appendCcpaRequestToSheet,
  type CcpaRequestPayload,
} from "@/lib/send-ccpa-to-sheets"

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "address",
  "city",
  "state",
  "zip",
  "email",
  "phone",
] as const

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function asYesNo(value: unknown): "yes" | "no" {
  return String(value).toLowerCase() === "yes" ? "yes" : "no"
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const payload: CcpaRequestPayload = {
      firstName: asTrimmedString(body.firstName),
      lastName: asTrimmedString(body.lastName),
      address: asTrimmedString(body.address),
      city: asTrimmedString(body.city),
      state: asTrimmedString(body.state),
      zip: asTrimmedString(body.zip),
      email: asTrimmedString(body.email),
      phone: asTrimmedString(body.phone),
      preferredContactMethod: asTrimmedString(body.preferredContactMethod) || "Both",
      receiveInformationVia: asTrimmedString(body.receiveInformationVia) || "Email",
      wantAccess: asYesNo(body.wantAccess),
      wantDelete: asYesNo(body.wantDelete),
      wantOptOutSale: asYesNo(body.wantOptOutSale),
      isAuthorizedAgent: asYesNo(body.isAuthorizedAgent),
    }

    const missing = REQUIRED_FIELDS.filter((field) => !payload[field])
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields", missing },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 }
      )
    }

    if (!/^\d{5}(-\d{4})?$/.test(payload.zip)) {
      return NextResponse.json(
        { success: false, error: "Invalid ZIP code" },
        { status: 400 }
      )
    }

    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") ?? ""

    console.log(
      "[ccpa-request]",
      JSON.stringify(
        {
          ...payload,
          ip,
          userAgent,
          submittedAt: new Date().toISOString(),
        },
        null,
        2
      )
    )

    const saved = await appendCcpaRequestToSheet(payload, { ip, userAgent })
    if (!saved) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to save CCPA request to Google Sheets",
        },
        { status: 502 }
      )
    }

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
