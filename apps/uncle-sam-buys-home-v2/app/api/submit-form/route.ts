import { NextRequest, NextResponse } from "next/server"

import { sendSubmissionConfirmationEmail } from "@/lib/send-submission-email"
import { verifyEmailWithHunter } from "@/lib/hunter-verify-email"
import { geocodeAddress } from "@/lib/geocode-address"

const REQUIRED_FIELDS = [
  "howSoonToSell",
  "sellHouseForCash",
  "repairsAndMaintenance",
  "sellHouse",
  "firstName",
  "lastName",
  "address",
  "email",
  "phoneNumber",
  "zipCode",
] as const

const TCPA_TEXT =
  'By clicking "SEE MY INSTANT CASH OFFER" you electronically sign (pursuant to the ESIGN Act) and agree: to share your information with up to 2 partners; that you are providing your prior express written consent for those partners to contact you at the telephone number you provided (including through an automatic telephone dialing system, pre-recorded or artificial voice, AI, SMS and MMS) even if your telephone number is listed on any state, federal or corporate Do Not Call list; you agree to our Terms of Use, including its Arbitration provision, and Privacy Policy; and that we can use your data for marketing and analytics. Your consent, and e-signature, is not a condition of accessing our services, as you may email consent@unclesambuyshomes.com and you can revoke your consent at any time by emailing us.'

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

function isCaliforniaLead(state: string, zipCode: string): boolean {
  const s = String(state).trim()
  const upper = s.toUpperCase()
  if (upper === "CA" || s.toLowerCase() === "california") return true
  const digits = String(zipCode).replace(/\D/g, "").slice(0, 5)
  if (digits.length !== 5) return false
  const n = parseInt(digits, 10)
  if (!Number.isFinite(n)) return false
  return n >= 90001 && n <= 96162
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
      howSoonToSell,
      sellHouseForCash,
      repairsAndMaintenance,
      sellHouse,
      firstName,
      lastName,
      address,
      city,
      state,
      email,
      phoneNumber,
      zipCode,
      subid1,
      subid2,
      subid3,
      xxTrustedFormCertUrl,
      xxTrustedFormToken,
    } = body

    const missingFields = REQUIRED_FIELDS.filter((field) => !body[field]?.trim?.())
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "All fields are required", missingFields: [...missingFields] },
        { status: 400 }
      )
    }

    const zipVal = typeof zipCode === "string" ? zipCode : String(zipCode ?? "")

    // Geocode city/state from the address on the server side
    const geocoded = await geocodeAddress(String(address).trim(), zipVal)
    const resolvedCity = geocoded.city || (typeof city === "string" ? city : "")
    const resolvedState = geocoded.state || (typeof state === "string" ? state : "")
    console.log("[submit-form] geocoded:", { city: resolvedCity, state: resolvedState })

    if (isCaliforniaLead(resolvedState, zipVal)) {
      console.log("[submit-form] Rejected: California")
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
    const hunterResult = await verifyEmailWithHunter(emailTrimmed)
    if (!hunterResult.ok) {
      return NextResponse.json(
        { error: hunterResult.message, field: "email" as const },
        { status: 422 }
      )
    }

    const veriphoneKey = process.env.VERIPHONE_API_KEY
    if (veriphoneKey) {
      const verification = await verifyPhone(String(phoneNumber).trim(), veriphoneKey, "US")
      if (!verification.valid) {
        return NextResponse.json(
          { error: verification.error ?? "Invalid phone number", field: "phoneNumber" },
          { status: 400 }
        )
      }
    }

    const forwarded = request.headers.get("x-forwarded-for")
    const firstForwarded = forwarded?.split(",")[0]
    const ip = firstForwarded
      ? firstForwarded.trim()
      : request.headers.get("x-real-ip") || "unknown"

    const submittedPayload = {
      howSoonToSell,
      sellHouseForCash,
      repairsAndMaintenance,
      sellHouse,
      firstName,
      lastName,
      address,
      city: resolvedCity,
      state: resolvedState,
      email: emailTrimmed,
      phoneNumber,
      zipCode,
      subid1: subid1 ?? "",
      subid2: subid2 ?? "",
      subid3: subid3 ?? "",
      xxTrustedFormCertUrl,
      xxTrustedFormToken: xxTrustedFormToken ?? "",
      ip,
    }
    console.log("[submit-form] submitted:", JSON.stringify(submittedPayload, null, 2))

    const hasLeadProsper =
      process.env.LEADPROSPER_CAMPAIGN_ID &&
      process.env.LEADPROSPER_SUPPLIER_ID &&
      process.env.LEADPROSPER_API_KEY &&
      process.env.LEADPROSPER_API_URL

    if (hasLeadProsper) {
      const formData = {
        lp_campaign_id: process.env.LEADPROSPER_CAMPAIGN_ID,
        lp_supplier_id: process.env.LEADPROSPER_SUPPLIER_ID,
        lp_key: process.env.LEADPROSPER_API_KEY,
        lp_subid1: subid1 ?? "",
        lp_subid2: subid2 ?? "",
        lp_subid3: subid3 ?? "",
        first_name: String(firstName).trim(),
        last_name: String(lastName).trim(),
        email: emailTrimmed,
        phone: leadProsperPhoneDigits(String(phoneNumber)),
        zip_code: String(zipCode).trim(),
        address: String(address).trim(),
        city: resolvedCity,
        state: resolvedState,
        how_soon_to_sell: howSoonToSell,
        sell_house_for_cash: sellHouseForCash,
        repairs_and_maintenance: repairsAndMaintenance,
        sell_house: sellHouse,
        tcpa_text: TCPA_TEXT,
        ip_address: ip,
        user_agent: request.headers.get("user-agent") ?? "",
        landing_page_url: request.headers.get("referer") ?? "",
        trustedform_cert_url: xxTrustedFormCertUrl ?? "",
        trustedform_token: xxTrustedFormToken ?? "",
      }

      const logPayload = { ...formData, lp_key: formData.lp_key ? "[REDACTED]" : "" }
      console.log("[submit-form] formData:", JSON.stringify(logPayload, null, 2))

      const apiResponse = await fetch(process.env.LEADPROSPER_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      const rawResponse = await apiResponse.text()
      let result: { status?: string; code?: number; message?: string }
      try {
        result = JSON.parse(rawResponse)
      } catch {
        console.error("[submit-form] LeadProsper invalid JSON:", rawResponse.slice(0, 500))
        return NextResponse.json(
          { success: false, error: "Lead submission failed" },
          { status: 400 }
        )
      }

      if (result.status === "ERROR") {
        console.warn(
          "[submit-form] LeadProsper ERROR:",
          result.code,
          result.message ?? rawResponse.slice(0, 200)
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
          },
          { status: 200 }
        )
      }

      const acceptedStatuses = ["ACCEPTED", "DUPLICATED"]
      if (!result.status || !acceptedStatuses.includes(result.status)) {
        return NextResponse.json(
          {
            success: false,
            error: "Lead submission failed",
            leadProsperStatus: result.status,
          },
          { status: 400 }
        )
      }
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
        redirectUrl: `/thankyou?email=${encodeURIComponent(emailTrimmed)}`,
        accessToken,
        expiresAt,
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
