import { NextRequest, NextResponse } from "next/server"

type RefinanceSubmitBody = {
  PRODUCT?: string
  PROP_ZIP?: string
  PROP_DESC?: string
  PROP_PURP?: string
  CRED_GRADE?: string
  loanpurpose?: string
  ANNUAL_INCOME?: number
  EST_VAL?: number
  BAL_ONE?: number
  MTG_ONE_INT?: number
  MTG_TWO?: string
  EMPLOYMENT_STATUS?: string
  BAL_TWO?: number
  MTG_TWO_INT?: number
  ADD_CASH?: number
  LOAN_TYPE?: string
  FHA_STATUS?: string
  VA_STATUS?: string
  FHA_BANK_FORECLOSURE?: string
  ANNUAL_VERIFIABLE_INCOME?: string
  NUM_MORTGAGE_LATES?: string
  DOB?: string
  EMAIL?: string
  FNAME?: string
  LNAME?: string
  ADDRESS?: string
  CITY?: string
  STATE?: string
  ZIP?: string
  PRI_PHON?: string
  trustedformCertUrl?: string
}

function normalizePhone(value: unknown): string {
  return String(value ?? "").replace(/\D/g, "")
}

/** LTV (%) = (loan amount / property value) × 100 */
function calculateLtv(loanAmount: number, propertyValue: number): number {
  if (!Number.isFinite(loanAmount) || !Number.isFinite(propertyValue) || propertyValue <= 0) {
    return 0
  }
  const raw = (Math.max(0, loanAmount) / propertyValue) * 100
  return Math.round(raw * 100) / 100
}

const TCPA_TEXT =
  "By clicking Submit Details, you agree to: (1) our TERMS OF USE, which include a Class Waiver and Mandatory Arbitration Agreement, (2) our PRIVACY POLICY, and (3) receive notices and other COMMUNICATIONS ELECTRONICALLY. By clicking Submit Details, you: (a) provide your express written consent and binding signature under the ESIGN Act for Leadpoint, Inc. dba SecureRights, a Delaware corporation, to share your information with up to four (4) of its PREMIER PARTNERS and/or third parties acting on their behalf to contact you via telephone, mobile device (including SMS and MMS) and/or email, including but not limited to texts or calls made using an automated telephone dialing system, AI-generated voice and text messages, or pre-recorded or artificial voice messages, regarding financial services or other offers related to homeownership; (b) understand that your consent is valid even if your telephone number is currently listed on any state, federal, local or corporate Do Not Call list; (c) represent that you are the wireless subscriber or customary user of the wireless number(s) provided with authority to consent; (d) understand your consent is not required in order to obtain any good or service; (e) represent that you have received and reviewed the MORTGAGE BROKER DISCLOSURES for your state; and (f) provide your consent under the Fair Credit Reporting Act for SecureRights and/or its PREMIER PARTNERS to obtain information from your personal credit profile to prequalify you for credit options and connect you with an appropriate partner."

function buildLeadPayload(body: RefinanceSubmitBody, ip: string, request: NextRequest) {
  const subid1 = request.cookies.get("subid1")?.value ?? ""
  const subid2 = request.cookies.get("subid2")?.value ?? ""

  const propZip = String(body.PROP_ZIP ?? "").trim()
  const zip = String(body.ZIP ?? propZip).trim()
  const propertyValue = Number(body.EST_VAL ?? 0)
  const mortgageBalance = Number(body.BAL_ONE ?? 0)
  const addCash = Number(body.ADD_CASH ?? 0)
  const loanAmount = mortgageBalance + Math.max(0, addCash)
  const ltv = calculateLtv(loanAmount, propertyValue)

  return {
    lp_campaign_id: process.env.LEADPROSPER_CAMPAIGN_ID,
    lp_supplier_id: process.env.LEADPROSPER_SUPPLIER_ID,
    lp_key: process.env.LEADPROSPER_API_KEY,
    lp_action: "",
    lp_subid1: subid1,
    lp_subid2: subid2,

    first_name: String(body.FNAME ?? "").trim(),
    last_name: String(body.LNAME ?? "").trim(),
    email: String(body.EMAIL ?? "").trim(),
    phone: normalizePhone(body.PRI_PHON),
    address: String(body.ADDRESS ?? "").trim(),
    city: String(body.CITY ?? "").trim(),
    state: String(body.STATE ?? "").trim(),
    zip_code: zip ? Number(zip) || zip : "",

    ip_address: ip,
    user_agent: request.headers.get("user-agent") ?? "",
    landing_page_url: request.headers.get("referer") ?? "",
    trustedform_cert_url: String(body.trustedformCertUrl ?? "").trim(),
    tcpa_text: TCPA_TEXT,

    ltv,
    loanamount: loanAmount,
    CRED_GRADE: String(body.CRED_GRADE ?? "").trim(),
    loanpurpose: String(body.loanpurpose ?? "").trim(),
    PropertyValue: String(propertyValue),
    PropertyType: String(body.PROP_DESC ?? "").trim(),
    PropertyUse: String(body.PROP_PURP ?? "").trim(),
    income: String(body.ANNUAL_INCOME ?? ""),
    VA_STATUS: String(body.VA_STATUS ?? "NO").trim() || "NO",
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RefinanceSubmitBody

    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded
      ? forwarded.split(",")[0]!.trim()
      : (request.headers.get("x-real-ip") ?? "unknown")

    const email = String(body.EMAIL ?? "").trim()
    const phone = normalizePhone(body.PRI_PHON)

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 })
    }
    if (phone.length !== 10) {
      return NextResponse.json({ error: "Valid phone number is required." }, { status: 400 })
    }

    const hasLeadProsper =
      process.env.LEADPROSPER_CAMPAIGN_ID &&
      process.env.LEADPROSPER_SUPPLIER_ID &&
      process.env.LEADPROSPER_API_KEY &&
      process.env.LEADPROSPER_API_URL

    if (hasLeadProsper) {
      const lpPayload = buildLeadPayload(body, ip, request)
      const lpLog = { ...lpPayload, lp_key: lpPayload.lp_key ? "[REDACTED]" : "" }
      console.log("[submit-refinance] LeadProsper payload:", JSON.stringify(lpLog, null, 2))

      const apiResponse = await fetch(process.env.LEADPROSPER_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(lpPayload),
      })

      const rawText = await apiResponse.text()
      console.log("[submit-refinance] LeadProsper raw response:", rawText)

      let result: { status?: string } = {}
      try {
        result = JSON.parse(rawText) as { status?: string }
      } catch {
        result = { status: "ACCEPTED" }
      }

      const acceptedStatuses = ["ACCEPTED", "DUPLICATED", "ERROR"]
      if (!result.status || !acceptedStatuses.includes(result.status)) {
        return NextResponse.json(
          {
            success: true,
            message: "Lead not accepted by partner",
            redirectUrl: `/thankyou?email=${encodeURIComponent(email)}&qualified=false`,
          },
          { status: 200 },
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
      { status: 200 },
    )

    successResponse.cookies.set("thankyou_access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 60,
    })

    return successResponse
  } catch (err) {
    console.error("[submit-refinance] error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
