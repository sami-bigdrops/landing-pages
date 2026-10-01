import { NextRequest, NextResponse } from "next/server"

import { sendSubmissionConfirmationEmail } from "@/lib/send-submission-email"
import { verifyEmailWithHunter } from "@/lib/hunter-verify-email"
import { geocodeAddress } from "@/lib/geocode-address"
import { isValidDob } from "@/lib/validate-dob"
import { isoToLeadProsperDob } from "@/lib/dob-format"
import { postLeadProsper } from "@/lib/leadprosper"

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "address",
  "zipCode",
  "dob",
] as const

function isEnvEnabled(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "true"
}

function toE164(phone: string, defaultCountry = "US"): string {
  const digits = String(phone).replace(/\D/g, "")
  if (defaultCountry === "US") {
    if (digits.length === 10) return `+1${digits}`
    if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`
  }
  return digits ? `+${digits}` : ""
}

function leadProsperPhoneDigits(phone: string): string {
  const d = String(phone).replace(/\D/g, "")
  if (d.length === 11 && d.startsWith("1")) return d.slice(1)
  return d
}

function normalizeZip(zip: string): string {
  return String(zip).replace(/\D/g, "").slice(0, 5)
}

function isCaliforniaLead(state: string): boolean {
  const s = String(state).trim()
  const upper = s.toUpperCase()
  return upper === "CA" || s.toLowerCase() === "california"
}

async function verifyPhone(phone: string, key: string, defaultCountry = "US"): Promise<{ valid: boolean; error?: string }> {
  const e164 = toE164(phone, defaultCountry)
  if (!e164) return { valid: false, error: "Invalid phone number" }
  const url = new URL("https://api.veriphone.io/v2/verify")
  url.searchParams.set("key", key)
  url.searchParams.set("phone", e164)
  url.searchParams.set("default_country", defaultCountry)
  try {
    const res = await fetch(url.toString(), { method: "GET" })
    const data = await res.json().catch(() => ({}))
    if (res.status !== 200) {
      return { valid: false, error: data.message ?? "Phone verification failed" }
    }
    const valid = data.phone_valid === true
    return { valid, error: valid ? undefined : "Please enter a valid phone number" }
  } catch (e) {
    console.error("[submit-form] Veriphone error:", e)
    return { valid: false, error: "Phone verification unavailable" }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      firstName,
      lastName,
      address,
      email,
      phoneNumber,
      zipCode,
      dob,
      debtAmount,
      subid1,
      subid2,
      subid3,
      xxTrustedFormCertUrl,
    } = body

    const missingFields = REQUIRED_FIELDS.filter((field) => !body[field]?.trim?.())
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "All fields are required", missingFields: [...missingFields] },
        { status: 400 }
      )
    }

    const dobVal = typeof dob === "string" ? dob.trim() : String(dob ?? "").trim()
    if (!isValidDob(dobVal)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid date of birth. You must be between 18 and 100 years old.",
          field: "dob",
        },
        { status: 400 }
      )
    }

    const zipHint =
      typeof zipCode === "string" ? normalizeZip(zipCode) : normalizeZip(String(zipCode ?? ""))

    // Resolve city/state/zip from client payload or address geocoding
    const geocoded = await geocodeAddress(String(address).trim(), zipHint)
    const bodyCity = typeof body.city === "string" ? body.city.trim() : ""
    const bodyState =
      typeof body.state === "string"
        ? body.state.trim().toUpperCase().slice(0, 2)
        : ""
    const resolvedCity = bodyCity || geocoded.city
    const resolvedState = (bodyState || geocoded.state).toUpperCase().slice(0, 2)
    const zipVal = zipHint.length === 5 ? zipHint : geocoded.zipCode
    console.log("[submit-form] geocoded:", {
      city: resolvedCity,
      state: resolvedState,
      zipCode: zipVal,
    })

    if (zipVal.length !== 5) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid 5-digit ZIP code.",
          field: "zipCode",
        },
        { status: 400 }
      )
    }

    if (!resolvedCity || resolvedState.length !== 2) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please select a street address from the suggestions so we can detect your city and state.",
          field: "address",
        },
        { status: 400 }
      )
    }

    if (isCaliforniaLead(resolvedState)) {
      console.log("[submit-form] LeadProsper status: NOT SENT (lead rejected — California)")
      return NextResponse.json(
        {
          success: true,
          rejected: true,
          redirectUrl: "/rejected",
        },
        { status: 200 }
      )
    }

    const emailTrimmed = String(email).trim()

    const submittedFormData = {
      firstName,
      lastName,
      address,
      city: resolvedCity,
      state: resolvedState,
      email: emailTrimmed,
      phoneNumber,
      zipCode: zipVal,
      dob: dobVal,
      subid1: subid1 ?? "",
      subid2: subid2 ?? "",
      subid3: subid3 ?? "",
      xxTrustedFormCertUrl: xxTrustedFormCertUrl ?? "",
    }
    console.log("[submit-form] Form data submitted:", JSON.stringify(submittedFormData, null, 2))

    if (isEnvEnabled(process.env.SET_HUNTER)) {
      const hunterResult = await verifyEmailWithHunter(emailTrimmed)
      if (!hunterResult.ok) {
        return NextResponse.json(
          { error: hunterResult.message, field: "email" as const },
          { status: 422 }
        )
      }
    }

    if (isEnvEnabled(process.env.SET_VERIPHONE)) {
      const veriphoneKey = process.env.VERIPHONE_API_KEY
      if (!veriphoneKey) {
        console.warn("[submit-form] SET_VERIPHONE is true but VERIPHONE_API_KEY is not set; skipping phone verification")
      } else {
        const verification = await verifyPhone(String(phoneNumber).trim(), veriphoneKey, "US")
        if (!verification.valid) {
          return NextResponse.json(
            { error: verification.error ?? "Invalid phone number", field: "phoneNumber" },
            { status: 400 }
          )
        }
      }
    }

    const forwarded = request.headers.get("x-forwarded-for")
    const firstForwarded = forwarded?.split(",")[0]
    const ip = firstForwarded
      ? firstForwarded.trim()
      : request.headers.get("x-real-ip") || "unknown"

    const hasLeadProsper =
      process.env.LEADPROSPER_CAMPAIGN_ID &&
      process.env.LEADPROSPER_SUPPLIER_ID &&
      process.env.LEADPROSPER_API_KEY &&
      process.env.LEADPROSPER_API_URL

    let leadProsperStatus: {
      received: boolean
      status?: string
      reason?: string
    } = {
      received: false,
      reason: "not_configured",
    }

    if (hasLeadProsper) {
      const campaignId = process.env.LEADPROSPER_CAMPAIGN_ID!
      const supplierId = process.env.LEADPROSPER_SUPPLIER_ID!
      const apiKey = process.env.LEADPROSPER_API_KEY!
      const trustedFormUrl =
        typeof xxTrustedFormCertUrl === "string" ? xxTrustedFormCertUrl.trim() : ""

      const formData: Record<string, unknown> = {
        lp_campaign_id: campaignId,
        lp_supplier_id: supplierId,
        lp_key: apiKey,
        lp_subid1: subid1 ?? "",
        lp_subid2: subid2 ?? "",
        first_name: String(firstName).trim(),
        last_name: String(lastName).trim(),
        email: emailTrimmed,
        phone: leadProsperPhoneDigits(String(phoneNumber)),
        DOB: isoToLeadProsperDob(dobVal),
        debt_amount:
          typeof debtAmount === "string" ? debtAmount.trim() : String(debtAmount ?? "").trim(),
        address: String(address).trim(),
        city: resolvedCity,
        state: resolvedState,
        zip_code: zipVal,
        ip_address: ip,
        user_agent: request.headers.get("user-agent") ?? "",
        landing_page_url: request.headers.get("referer") ?? "",
        trustedform_cert_url: trustedFormUrl,
        trustedformtoken: trustedFormUrl,
        tcpa_text:
          'By clicking “Check My Options” I also provide express written consent under the Fair Credit Reporting Act (FCRA) for Nationonedebtrelief and its partners to obtain my consumer credit report and related information from one or more credit bureaus, both now and in the future for a maximum of twelve months, as needed to provide me with personal loan and debt consolidation options. These inquiries will not affect my credit score.',
      }

      const postResult = await postLeadProsper(formData)

      if (!postResult.ok) {
        console.error(
          "[submit-form] LeadProsper DIRECT_POST status: NOT RECEIVED (invalid JSON response)"
        )
        if (postResult.raw) {
          console.error(
            "[submit-form] LeadProsper DIRECT_POST invalid JSON:",
            postResult.raw
          )
        }
        return NextResponse.json(
          {
            success: false,
            error: "Lead submission failed",
            leadProsper: { received: false, reason: "invalid_response" },
          },
          { status: 400 }
        )
      }

      const result = postResult.data

      if (result.status === "ERROR") {
        leadProsperStatus = {
          received: false,
          status: result.status,
          reason: result.message ?? "error",
        }
        console.log(
          `[submit-form] LeadProsper status: NOT RECEIVED (${result.status}${result.code != null ? `, code ${result.code}` : ""}${result.message ? ` — ${result.message}` : ""})`
        )
        const code = result.code
        const qs =
          typeof code === "number" && Number.isFinite(code)
            ? `?code=${encodeURIComponent(String(code))}`
            : ""
        return NextResponse.json(
          {
            success: true,
            rejected: true,
            redirectUrl: `/rejected${qs}`,
            leadProsper: leadProsperStatus,
          },
          { status: 200 }
        )
      }

      const acceptedStatuses = ["ACCEPTED", "DUPLICATED"]
      if (!result.status || !acceptedStatuses.includes(result.status)) {
        leadProsperStatus = {
          received: false,
          status: result.status,
          reason: "unexpected_status",
        }
        console.log(
          `[submit-form] LeadProsper status: NOT RECEIVED (unexpected status: ${result.status ?? "none"})`
        )
        return NextResponse.json(
          {
            success: false,
            error: "Lead submission failed",
            leadProsperStatus: result.status,
            leadProsper: leadProsperStatus,
          },
          { status: 400 }
        )
      }

      leadProsperStatus = {
        received: true,
        status: result.status,
      }
      console.log(`[submit-form] LeadProsper status: RECEIVED (${result.status})`)
    } else {
      console.log("[submit-form] LeadProsper status: NOT SENT (LeadProsper env not configured)")
    }

    const sent = await sendSubmissionConfirmationEmail({
      to: emailTrimmed,
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
    })
    if (sent) {
      console.log("[submit-form] confirmation email sent")
    } else {
      console.error("[submit-form] confirmation email was not sent")
    }

    const accessToken = crypto.randomUUID()
    const expiresAt = Date.now() + 10 * 60 * 1000

    const successResponse = NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        redirectUrl: `/thankyou?email=${encodeURIComponent(emailTrimmed)}&firstName=${encodeURIComponent(String(firstName).trim())}`,
        accessToken,
        expiresAt,
        leadProsper: leadProsperStatus,
      },
      { status: 200 }
    )

    successResponse.cookies.set("thankyou_access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 60,
    })

    return successResponse
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
