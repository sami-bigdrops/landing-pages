import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      PRODUCT, PROP_ZIP, PROP_DESC, PROP_PURP, CRED_GRADE,
      EST_VAL, BAL_ONE, MTG_ONE_INT, MTG_TWO,
      BAL_TWO, MTG_TWO_INT, ADD_CASH,
      LOAN_TYPE, VA_STATUS,
      FHA_BANK_FORECLOSURE, ANNUAL_VERIFIABLE_INCOME, NUM_MORTGAGE_LATES,
      EMAIL, FNAME, LNAME,
      ADDRESS, CITY, STATE, ZIP, PRI_PHON,
      trustedformCertUrl,
    } = body

    const subid1 = request.cookies.get("subid1")?.value ?? ""
    const subid2 = request.cookies.get("subid2")?.value ?? ""
    const subid3 = request.cookies.get("subid3")?.value ?? ""

    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded
      ? forwarded.split(",")[0]!.trim()
      : (request.headers.get("x-real-ip") ?? "unknown")

    console.log("[submit-refinance] payload:", JSON.stringify({
      PRODUCT, PROP_ZIP, PROP_DESC, PROP_PURP, CRED_GRADE,
      EST_VAL, BAL_ONE, MTG_ONE_INT, MTG_TWO, BAL_TWO, MTG_TWO_INT, ADD_CASH,
      LOAN_TYPE, VA_STATUS, FHA_BANK_FORECLOSURE, ANNUAL_VERIFIABLE_INCOME,
      NUM_MORTGAGE_LATES, EMAIL, FNAME, LNAME, ADDRESS, CITY, STATE, ZIP, PRI_PHON,
      subid1, subid2, subid3, ip,
    }, null, 2))

    const hasLeadProsper =
      process.env.REFI_LEADPROSPER_CAMPAIGN_ID &&
      process.env.REFI_LEADPROSPER_SUPPLIER_ID &&
      process.env.REFI_LEADPROSPER_API_KEY &&
      process.env.REFI_LEADPROSPER_API_URL

    if (hasLeadProsper) {
      const lpPayload = {
        lp_campaign_id:  process.env.REFI_LEADPROSPER_CAMPAIGN_ID,
        lp_supplier_id:  process.env.REFI_LEADPROSPER_SUPPLIER_ID,
        lp_key:          process.env.REFI_LEADPROSPER_API_KEY,
        lp_subid1:       subid1,
        lp_subid2:       subid2,
        lp_subid3:       subid3,

        PRODUCT:         String(PRODUCT ?? "PP_REFI"),
        PROP_ZIP:        String(PROP_ZIP ?? "").trim(),
        PROP_DESC:       String(PROP_DESC ?? "").trim(),
        PROP_PURP:       String(PROP_PURP ?? "PRIMARY").trim(),
        CRED_GRADE:      String(CRED_GRADE ?? "GOOD").trim(),
        EST_VAL:         Number(EST_VAL ?? 0),
        BAL_ONE:         Number(BAL_ONE ?? 0),
        MTG_ONE_INT:     Number(MTG_ONE_INT ?? 5.25),
        MTG_TWO:         String(MTG_TWO ?? "NO").trim(),
        BAL_TWO:         Number(BAL_TWO ?? 0),
        MTG_TWO_INT:     Number(MTG_TWO_INT ?? 0),
        ADD_CASH:        Number(ADD_CASH ?? 0),
        LOAN_TYPE:       String(LOAN_TYPE ?? "FIXED").trim(),
        FHA_BANK_FORECLOSURE:      String(FHA_BANK_FORECLOSURE ?? "NO").trim(),
        ANNUAL_VERIFIABLE_INCOME:  String(ANNUAL_VERIFIABLE_INCOME ?? "YES").trim(),
        NUM_MORTGAGE_LATES:        String(NUM_MORTGAGE_LATES ?? "NONE").trim(),
        VA_STATUS:       String(VA_STATUS ?? "NO").trim(),
        EMAIL:           String(EMAIL ?? "").trim(),
        FNAME:           String(FNAME ?? "").trim(),
        LNAME:           String(LNAME ?? "").trim(),
        ADDRESS:         String(ADDRESS ?? "").trim(),
        CITY:            String(CITY ?? "").trim(),
        STATE:           String(STATE ?? "").trim(),
        ZIP:             String(ZIP ?? PROP_ZIP ?? "").trim(),
        PRI_PHON:        String(PRI_PHON ?? "").replace(/\D/g, ""),

        tcpa: "By clicking Submit Details, you agree to: (1) our TERMS OF USE, which include a Class Waiver and Mandatory Arbitration Agreement, (2) our PRIVACY POLICY, and (3) receive notices and other COMMUNICATIONS ELECTRONICALLY. By clicking Submit Details, you: (a) provide your express written consent and binding signature under the ESIGN Act for Leadpoint, Inc. dba SecureRights, a Delaware corporation, to share your information with up to four (4) of its PREMIER PARTNERS and/or third parties acting on their behalf to contact you via telephone, mobile device (including SMS and MMS) and/or email, including but not limited to texts or calls made using an automated telephone dialing system, AI-generated voice and text messages, or pre-recorded or artificial voice messages, regarding financial services or other offers related to homeownership; (b) understand that your consent is valid even if your telephone number is currently listed on any state, federal, local or corporate Do Not Call list; (c) represent that you are the wireless subscriber or customary user of the wireless number(s) provided with authority to consent; (d) understand your consent is not required in order to obtain any good or service; (e) represent that you have received and reviewed the MORTGAGE BROKER DISCLOSURES for your state; and (f) provide your consent under the Fair Credit Reporting Act for SecureRights and/or its PREMIER PARTNERS to obtain information from your personal credit profile to prequalify you for credit options and connect you with an appropriate partner. You may choose to speak with an individual service provider by dialing (844) 326-3442. Leadpoint, Inc. NMLS 3175.",
        trustedform_cert_url: String(trustedformCertUrl ?? "").trim(),
        ip_address:      ip,
        user_agent:      request.headers.get("user-agent") ?? "",
        landing_page_url: request.headers.get("referer") ?? "",
      }

      const lpLog = { ...lpPayload, lp_key: lpPayload.lp_key ? "[REDACTED]" : "" }
      console.log("[submit-refinance] LeadProsper payload:", JSON.stringify(lpLog, null, 2))

      const apiResponse = await fetch(process.env.REFI_LEADPROSPER_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(lpPayload),
      })

      const rawText = await apiResponse.text()
      console.log("[submit-refinance] LeadProsper raw response:", rawText)

      let result: { status?: string } = {}
      try { result = JSON.parse(rawText) } catch { result = { status: "ACCEPTED" } }

      const acceptedStatuses = ["ACCEPTED", "DUPLICATED", "ERROR"]
      if (!result.status || !acceptedStatuses.includes(result.status)) {
        const email = String(EMAIL ?? "").trim()
        const redirectUrl = `/thankyou?email=${encodeURIComponent(email)}&qualified=false`
        return NextResponse.json({
          success: true,
          message: "Lead not accepted by partner",
          redirectUrl,
        }, { status: 200 })
      }
    }

    const accessToken = crypto.randomUUID()
    const expiresAt   = Date.now() + 10 * 60 * 1000

    const successResponse = NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        redirectUrl: `/thankyou?email=${encodeURIComponent(String(EMAIL ?? "").trim())}`,
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
  } catch (err) {
    console.error("[submit-refinance] error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
