import { NextRequest, NextResponse } from "next/server"

import { sendSubmissionConfirmationEmail } from "@/lib/send-submission-email"
import { verifyEmailWithHunter } from "@/lib/hunter-verify-email"
import { geocodeAddress } from "@/lib/geocode-address"
import {
  mapPropertyCondition,
  mapPropertyType,
  mapPropertyValue,
  mapRealtorListing,
  mapReasonForSelling,
  mapTimeframe,
  postLeadProsper,
} from "@/lib/leadprosper"

const REQUIRED_FIELDS = [
  "homeType",
  "propertyType",
  "propertyList",
  "sell",
  "money",
  "credit",
  "houseValueRange",
  "firstName",
  "lastName",
  "address",
  "email",
  "phoneNumber",
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
      homeType,
      propertyType,
      propertyList,
      sell,
      money,
      credit,
      houseValueRange,
      firstName,
      lastName,
      address,
      email,
      phoneNumber,
      zipCode,
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

    const zipHint =
      typeof zipCode === "string" ? normalizeZip(zipCode) : normalizeZip(String(zipCode ?? ""))

    // Resolve city/state/zip from client payload or address geocoding
    const geocoded = await geocodeAddress(String(address).trim(), zipHint)
    const bodyCity = typeof body.city === "string" ? body.city.trim() : ""
    const bodyState = typeof body.state === "string" ? body.state.trim() : ""
    const resolvedCity = bodyCity || geocoded.city
    const resolvedState = bodyState || geocoded.state
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
          error: "Could not determine ZIP code from the address. Please select a valid street address.",
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
      homeType,
      propertyType,
      propertyList,
      sell,
      money,
      credit,
      houseValueRange,
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
      const propertyValue = mapPropertyValue(String(houseValueRange).trim())

      const formData: Record<string, unknown> = {
        lp_campaign_id: campaignId,
        lp_supplier_id: supplierId,
        lp_key: apiKey,
        lp_action: "",
        lp_subid1: subid1 ?? "",
        lp_subid2: subid2 ?? "",
        first_name: String(firstName).trim(),
        last_name: String(lastName).trim(),
        email: emailTrimmed,
        phone: leadProsperPhoneDigits(String(phoneNumber)),
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
          'By clicking "SEE MY INSTANT CASH OFFER" you electronically sign (pursuant to the ESIGN Act) and agree: to share your information with up to 2 partners; that you are providing your prior express written consent for those partners to contact you at the telephone number you provided (including through an automatic telephone dialing system, pre-recorded or artificial voice, AI, SMS and MMS) even if your telephone number is listed on any state, federal or corporate Do Not Call list; you agree to our Terms of Use, including its Arbitration provision, and Privacy Policy; and that we can use your data for marketing and analytics. Your consent, and e-signature, is not a condition of accessing our services, as you may email consent@unclesambuyshomes.com and you can revoke your consent at any time by emailing us.',
        propertytype: mapPropertyType(String(homeType).trim()),
        propertycondition: mapPropertyCondition(String(propertyType).trim()),
        reasonforselling: mapReasonForSelling(String(sell).trim()),
        timeframe: mapTimeframe(String(money).trim()),
        realtorldisting: mapRealtorListing(String(propertyList).trim()),
      }

      if (propertyValue != null) {
        formData.propertyvalue = propertyValue
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
