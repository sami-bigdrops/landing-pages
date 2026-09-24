import { NextRequest, NextResponse } from "next/server"

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : String(value ?? "").trim()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const firstName = asTrimmedString(body.firstName)
    const lastName = asTrimmedString(body.lastName)
    const email = asTrimmedString(body.email)
    const phoneNumber = asTrimmedString(body.phoneNumber)
    const zipCode = asTrimmedString(body.zipCode).replace(/\D/g, "").slice(0, 5)
    const address = asTrimmedString(body.address)
    const city = asTrimmedString(body.city)
    const state = asTrimmedString(body.state).toUpperCase().slice(0, 2)
    const subid1 = asTrimmedString(body.subid1)
    const subid2 = asTrimmedString(body.subid2)
    const subid3 = asTrimmedString(body.subid3)
    const xxTrustedFormCertUrl = asTrimmedString(body.xxTrustedFormCertUrl)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneDigits = phoneNumber.replace(/\D/g, "")

    if (
      !firstName ||
      !lastName ||
      !email ||
      !emailRegex.test(email) ||
      phoneDigits.length !== 10 ||
      !address ||
      zipCode.length !== 5
    ) {
      return NextResponse.json(
        { success: false, error: "Please complete all required fields with valid details." },
        { status: 400 }
      )
    }

    const forwarded = request.headers.get("x-forwarded-for")
    const firstForwarded = forwarded?.split(",")[0]
    const ip = firstForwarded
      ? firstForwarded.trim()
      : request.headers.get("x-real-ip") || "unknown"

    const submittedPayload = {
      firstName,
      lastName,
      email,
      phoneNumber: phoneDigits,
      zipCode,
      address,
      city,
      state,
      subid1,
      subid2,
      subid3,
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
        lp_subid1: subid1,
        lp_subid2: subid2,
        lp_subid3: subid3,
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phoneDigits,
        zip_code: zipCode,
        address,
        city,
        state,
        tcpa:
          "By submitting this form, I agree to the Windowfii Terms of Use and Privacy Policy. I authorize Windowfii and its partners to send me marketing text messages or phone calls at the number provided, including those made with an autodialer. Standard message and data rates may apply. Message frequency varies. Opt-out anytime by replying STOP or using the unsubscribe link.",
        ip_address: ip,
        user_agent: request.headers.get("user-agent") ?? "",
        landing_page_url: request.headers.get("referer") ?? "",
        trustedform_cert_url: xxTrustedFormCertUrl,
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
      let result: { status?: string }
      try {
        result = JSON.parse(rawResponse)
      } catch {
        result = { status: "ACCEPTED" }
      }

      const acceptedStatuses = ["ACCEPTED", "DUPLICATED", "ERROR"]
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

    const accessToken = crypto.randomUUID()
    const expiresAt = Date.now() + 10 * 60 * 1000

    const successResponse = NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        redirectUrl: `/thankyou?email=${encodeURIComponent(email)}`,
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
