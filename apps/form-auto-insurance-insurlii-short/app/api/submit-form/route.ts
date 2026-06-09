import { NextRequest, NextResponse } from "next/server"
import { BRAND_TCPA_DISCLAIMER } from "@/lib/constant"
import { verifyEmailWithHunter } from "@/lib/hunter-verify-email"
import { verifyPhone } from "@/lib/veriphone-verify-phone"

function trimStr(value: unknown): string {
  return String(value ?? "").trim()
}

function formatBool(value: boolean | null | undefined): string {
  if (value === true) return "Yes"
  if (value === false) return "No"
  return ""
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      zipCode,
      email,
      phoneNumber,
      address,
      dob,
      city,
      state,
      d1FirstName,
      d1LastName,
      vehicleYear,
      vehicleType,
      vehicleMake,
      vehicleModel,
      addVehicle2,
      v2Year,
      v2Make,
      v2VehicleType,
      v2Model,
      hadInsurance,
      currentInsurer,
      yearsInsured,
      driverCount,
      d1Gender,
      d1Married,
      d1Accidents,
      d1DUI,
      isHomeowner,
      wantsHomeDiscount,
      servedMilitary,
      subid1,
      subid2,
      subid3,
      xxTrustedFormCertUrl,
      xxTrustedFormToken,
    } = body

    const emailTrimmed = trimStr(email)
    if (emailTrimmed) {
      const hunter = await verifyEmailWithHunter(emailTrimmed)
      if (!hunter.ok) {
        return NextResponse.json(
          { error: hunter.message, invalidField: "email" as const },
          { status: 422 }
        )
      }
    }

    const phoneTrimmed = trimStr(phoneNumber)
    if (phoneTrimmed) {
      const veriphoneKey = process.env.VERIPHONE_API_KEY?.trim()
      if (veriphoneKey) {
        const verification = await verifyPhone(phoneTrimmed, veriphoneKey, "US")
        if (!verification.valid) {
          return NextResponse.json(
            {
              error: verification.error ?? "Invalid phone number",
              field: "phoneNumber" as const,
            },
            { status: 422 }
          )
        }
      }
    }

    const forwarded = request.headers.get("x-forwarded-for")
    const firstForwarded = forwarded?.split(",")[0]
    const ip = firstForwarded
      ? firstForwarded.trim()
      : request.headers.get("x-real-ip") || "unknown"

    const submittedPayload = {
      zipCode: trimStr(zipCode),
      email: emailTrimmed,
      phoneNumber: phoneTrimmed,
      address: trimStr(address),
      dob: trimStr(dob),
      city: trimStr(city),
      state: trimStr(state),
      d1FirstName: trimStr(d1FirstName),
      d1LastName: trimStr(d1LastName),
      vehicleYear: trimStr(vehicleYear),
      vehicleType: trimStr(vehicleType),
      vehicleMake: trimStr(vehicleMake),
      vehicleModel: trimStr(vehicleModel),
      addVehicle2,
      v2Year: trimStr(v2Year),
      v2Make: trimStr(v2Make),
      v2VehicleType: trimStr(v2VehicleType),
      v2Model: trimStr(v2Model),
      hadInsurance,
      currentInsurer: trimStr(currentInsurer),
      yearsInsured: trimStr(yearsInsured),
      driverCount,
      d1Gender: trimStr(d1Gender),
      d1Married,
      d1Accidents: trimStr(d1Accidents),
      d1DUI,
      isHomeowner,
      wantsHomeDiscount,
      servedMilitary,
      subid1: subid1 ?? "",
      subid2: subid2 ?? "",
      subid3: subid3 ?? "",
      xxTrustedFormCertUrl: xxTrustedFormCertUrl ?? "",
      ip,
    }
    console.log("[submit-form] submitted:", JSON.stringify(submittedPayload, null, 2))

    const hasLeadProsper =
      process.env.LEADPROSPER_CAMPAIGN_ID &&
      process.env.LEADPROSPER_SUPPLIER_ID &&
      process.env.LEADPROSPER_API_KEY &&
      process.env.LEADPROSPER_API_URL

    if (hasLeadProsper) {
      const phoneDigits = phoneTrimmed.replace(/\D/g, "")

      const formData = {
        lp_campaign_id: process.env.LEADPROSPER_CAMPAIGN_ID,
        lp_supplier_id: process.env.LEADPROSPER_SUPPLIER_ID,
        lp_key: process.env.LEADPROSPER_API_KEY,
        lp_subid1: subid1 ?? "",
        lp_subid2: subid2 ?? "",
        lp_subid3: subid3 ?? "",
        first_name: trimStr(d1FirstName),
        last_name: trimStr(d1LastName),
        email: emailTrimmed,
        phone: phoneDigits,
        zip_code: trimStr(zipCode),
        address: trimStr(address),
        city: trimStr(city),
        state: trimStr(state),
        dob: trimStr(dob),
        homeowner: formatBool(isHomeowner),
        Vehicle_Year: trimStr(vehicleYear),
        Vehicle_Make: trimStr(vehicleMake),
        Vehicle_Model: trimStr(vehicleModel),
        Vehicle_Type: trimStr(vehicleType),
        Vehicle2_Year: addVehicle2 === true ? trimStr(v2Year) : "",
        Vehicle2_Make: addVehicle2 === true ? trimStr(v2Make) : "",
        Vehicle2_Model: addVehicle2 === true ? trimStr(v2Model) : "",
        Vehicle2_Type: addVehicle2 === true ? trimStr(v2VehicleType) : "",
        Had_Insurance: formatBool(hadInsurance),
        Current_Insurer: trimStr(currentInsurer),
        Years_Insured: trimStr(yearsInsured),
        Driver_Count: driverCount != null ? String(driverCount) : "1",
        Driver1_Gender: trimStr(d1Gender),
        Driver1_Married: formatBool(d1Married),
        Driver1_Accidents: trimStr(d1Accidents),
        Driver1_DUI: formatBool(d1DUI),
        Wants_Home_Discount: formatBool(wantsHomeDiscount),
        Served_Military: formatBool(servedMilitary),
        tcpa: BRAND_TCPA_DISCLAIMER,
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
