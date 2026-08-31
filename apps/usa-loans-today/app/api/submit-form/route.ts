import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      loanAmount: loanAmountFromBody,
      firstName,
      lastName,
      email,
      dob,
      ssn,
      zip,
      city,
      state,
      address,
      monthsAtAddress,
      homeOwnership,
      driversLicense,
      driversLicenseState,
      cellPhone,
      homePhone,
      workPhone,
      employmentType,
      employerName,
      monthsEmployed,
      military,
      monthlyIncome,
      payFrequency,
      nextPayDate,
      secondPayDate,
      payType,
      bankRoutingNumber,
      bankName,
      bankAccountNumber,
      bankAccountType,
      monthsAtBank,
      spendingPurpose,
      creditScore,
      debtAmount,
      unsecuredDebtAmount,
      monthlyHousingPayment,
      hasDirectDeposit,
      occupation,
      vehicleStatus,
      hasFiledBankruptcy,
      bankruptcyChapter,
      bankruptcyStatus,
      bankruptcyDischargedInLast2Years,
      subid1,
      subid2,
      subid3,
      trustedformCertUrl,
      xxTrustedFormCertUrl,
    } = body

    const loanAmount =
      request.cookies.get("borrowAmount")?.value || loanAmountFromBody || ""

    const forwarded = request.headers.get("x-forwarded-for")
    const firstForwarded = forwarded?.split(",")[0]
    const ip = firstForwarded
      ? firstForwarded.trim()
      : request.headers.get("x-real-ip") || "unknown"

    const certUrl = trustedformCertUrl || xxTrustedFormCertUrl || ""

    const submittedPayload = {
      loanAmount,
      firstName,
      lastName,
      email,
      dob,
      zip,
      city,
      state,
      address,
      monthsAtAddress,
      homeOwnership,
      driversLicense,
      driversLicenseState,
      cellPhone,
      homePhone,
      workPhone,
      employmentType,
      employerName,
      monthsEmployed,
      military,
      monthlyIncome,
      payFrequency,
      nextPayDate,
      secondPayDate,
      payType,
      bankRoutingNumber,
      bankName,
      bankAccountNumber,
      bankAccountType,
      monthsAtBank,
      spendingPurpose,
      creditScore,
      debtAmount,
      unsecuredDebtAmount,
      monthlyHousingPayment,
      hasDirectDeposit,
      occupation,
      vehicleStatus,
      hasFiledBankruptcy,
      bankruptcyChapter,
      bankruptcyStatus,
      bankruptcyDischargedInLast2Years,
      ssn: ssn ? "[REDACTED]" : "",
      subid1: subid1 ?? "",
      subid2: subid2 ?? "",
      subid3: subid3 ?? "",
      trustedformCertUrl: certUrl,
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
        loan_amount: String(loanAmount ?? "").trim(),
        first_name: String(firstName ?? "").trim(),
        last_name: String(lastName ?? "").trim(),
        email: String(email ?? "").trim(),
        dob: String(dob ?? "").trim(),
        ssn: String(ssn ?? "").replace(/\D/g, ""),
        zip_code: String(zip ?? "").trim(),
        city: String(city ?? "").trim(),
        state: String(state ?? "").trim(),
        address: String(address ?? "").trim(),
        months_at_address: String(monthsAtAddress ?? "").trim(),
        home_ownership: String(homeOwnership ?? "").trim(),
        drivers_license: String(driversLicense ?? "").trim(),
        drivers_license_state: String(driversLicenseState ?? "").trim(),
        phone: String(cellPhone ?? "").trim(),
        home_phone: String(homePhone ?? "").trim(),
        work_phone: String(workPhone ?? "").trim(),
        employment_type: String(employmentType ?? "").trim(),
        employer_name: String(employerName ?? "").trim(),
        months_employed: String(monthsEmployed ?? "").trim(),
        military: String(military ?? "").trim(),
        monthly_income: String(monthlyIncome ?? "").trim(),
        pay_frequency: String(payFrequency ?? "").trim(),
        next_pay_date: String(nextPayDate ?? "").trim(),
        second_pay_date: String(secondPayDate ?? "").trim(),
        pay_type: String(payType ?? "").trim(),
        bank_routing_number: String(bankRoutingNumber ?? "").trim(),
        bank_name: String(bankName ?? "").trim(),
        bank_account_number: String(bankAccountNumber ?? "").trim(),
        bank_account_type: String(bankAccountType ?? "").trim(),
        months_at_bank: String(monthsAtBank ?? "").trim(),
        spending_purpose: String(spendingPurpose ?? "").trim(),
        credit_score: String(creditScore ?? "").trim(),
        debt_amount: String(debtAmount ?? "").trim(),
        unsecured_debt_amount: String(unsecuredDebtAmount ?? "").trim(),
        monthly_housing_payment: String(monthlyHousingPayment ?? "").trim(),
        occupation: String(occupation ?? "").trim(),
        vehicle_status: String(vehicleStatus ?? "").trim(),
        has_filed_bankruptcy: String(hasFiledBankruptcy ?? "").trim(),
        bankruptcy_chapter: String(bankruptcyChapter ?? "").trim(),
        bankruptcy_status: String(bankruptcyStatus ?? "").trim(),
        bankruptcy_discharged: String(bankruptcyDischargedInLast2Years ?? "").trim(),
        tcpa:
          "By submitting this form, I agree to the USA Loans Today Terms of Use and Privacy Policy. I authorize USA Loans Today and its partners to contact me at the number provided, including autodialed calls and text messages. Message and data rates may apply. Opt-out anytime by replying STOP.",
        ip_address: ip,
        user_agent: request.headers.get("user-agent") ?? "",
        landing_page_url: request.headers.get("referer") ?? "",
        trustedform_cert_url: certUrl,
      }

      const logPayload = { ...formData, lp_key: formData.lp_key ? "[REDACTED]" : "", ssn: formData.ssn ? "[REDACTED]" : "" }
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
        redirectUrl: `/thankyou?email=${encodeURIComponent(String(email ?? "").trim())}`,
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
