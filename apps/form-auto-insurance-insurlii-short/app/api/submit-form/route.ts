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
      d2FirstName,
      d2LastName,
      d3FirstName,
      d3LastName,
      vehicleYear,
      vehicleType,
      vehicleMake,
      vehicleModel,
      v1Ownership,
      v1PrimaryUse,
      v1Miles,
      v1Coverage,
      addVehicle2,
      v2Year,
      v2Make,
      v2VehicleType,
      v2Model,
      v2Ownership,
      v2PrimaryUse,
      v2Miles,
      v2Coverage,
      addVehicle3,
      v3Year,
      v3Make,
      v3VehicleType,
      v3Model,
      v3Ownership,
      v3PrimaryUse,
      v3Miles,
      v3Coverage,
      hadInsurance,
      currentInsurer,
      yearsInsured,
      driverCount,
      d1Gender,
      d1Married,
      d1Education,
      d1Occupation,
      d1CreditScore,
      d1Accidents,
      d1Tickets,
      d1DUI,
      d1Suspended,
      d2Relation,
      d2Gender,
      d2Married,
      d2Education,
      d2Occupation,
      d2Accidents,
      d2Tickets,
      d2DUI,
      d2Suspended,
      d2DOB,
      d3Relation,
      d3Gender,
      d3Married,
      d3Education,
      d3Occupation,
      d3Accidents,
      d3Tickets,
      d3DUI,
      d3Suspended,
      d3DOB,
      isHomeowner,
      wantsHomeDiscount,
      wantsRentersDiscount,
      servedMilitary,
      helpGoal,
      belongsToAARP,
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
      d2FirstName: trimStr(d2FirstName),
      d2LastName: trimStr(d2LastName),
      d3FirstName: trimStr(d3FirstName),
      d3LastName: trimStr(d3LastName),
      vehicleYear: trimStr(vehicleYear),
      vehicleType: trimStr(vehicleType),
      vehicleMake: trimStr(vehicleMake),
      vehicleModel: trimStr(vehicleModel),
      v1Ownership: trimStr(v1Ownership),
      v1PrimaryUse: trimStr(v1PrimaryUse),
      v1Miles: trimStr(v1Miles),
      v1Coverage: trimStr(v1Coverage),
      addVehicle2,
      v2Year: trimStr(v2Year),
      v2Make: trimStr(v2Make),
      v2VehicleType: trimStr(v2VehicleType),
      v2Model: trimStr(v2Model),
      v2Ownership: trimStr(v2Ownership),
      v2PrimaryUse: trimStr(v2PrimaryUse),
      v2Miles: trimStr(v2Miles),
      v2Coverage: trimStr(v2Coverage),
      addVehicle3,
      v3Year: trimStr(v3Year),
      v3Make: trimStr(v3Make),
      v3VehicleType: trimStr(v3VehicleType),
      v3Model: trimStr(v3Model),
      v3Ownership: trimStr(v3Ownership),
      v3PrimaryUse: trimStr(v3PrimaryUse),
      v3Miles: trimStr(v3Miles),
      v3Coverage: trimStr(v3Coverage),
      hadInsurance,
      currentInsurer: trimStr(currentInsurer),
      yearsInsured: trimStr(yearsInsured),
      driverCount,
      d1Gender: trimStr(d1Gender),
      d1Married,
      d1Education: trimStr(d1Education),
      d1Occupation: trimStr(d1Occupation),
      d1CreditScore: trimStr(d1CreditScore),
      d1Accidents: trimStr(d1Accidents),
      d1Tickets: trimStr(d1Tickets),
      d1DUI,
      d1Suspended,
      d2Relation: trimStr(d2Relation),
      d2Gender: trimStr(d2Gender),
      d2Married,
      d2Education: trimStr(d2Education),
      d2Occupation: trimStr(d2Occupation),
      d2Accidents: trimStr(d2Accidents),
      d2Tickets: trimStr(d2Tickets),
      d2DUI,
      d2Suspended,
      d2DOB: trimStr(d2DOB),
      d3Relation: trimStr(d3Relation),
      d3Gender: trimStr(d3Gender),
      d3Married,
      d3Education: trimStr(d3Education),
      d3Occupation: trimStr(d3Occupation),
      d3Accidents: trimStr(d3Accidents),
      d3Tickets: trimStr(d3Tickets),
      d3DUI,
      d3Suspended,
      d3DOB: trimStr(d3DOB),
      isHomeowner,
      wantsHomeDiscount,
      wantsRentersDiscount,
      servedMilitary,
      helpGoal: trimStr(helpGoal),
      belongsToAARP,
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
        Vehicle_Ownership: trimStr(v1Ownership),
        Vehicle_Primary_Use: trimStr(v1PrimaryUse),
        Expected_Mileage: trimStr(v1Miles),
        Vehicle_Coverage: trimStr(v1Coverage),
        Vehicle2_Year: addVehicle2 === true ? trimStr(v2Year) : "",
        Vehicle2_Make: addVehicle2 === true ? trimStr(v2Make) : "",
        Vehicle2_Model: addVehicle2 === true ? trimStr(v2Model) : "",
        Vehicle2_Type: addVehicle2 === true ? trimStr(v2VehicleType) : "",
        Vehicle2_Ownership: addVehicle2 === true ? trimStr(v2Ownership) : "",
        Vehicle2_Primary_Use: addVehicle2 === true ? trimStr(v2PrimaryUse) : "",
        Vehicle2_Expected_Mileage: addVehicle2 === true ? trimStr(v2Miles) : "",
        Vehicle2_Coverage: addVehicle2 === true ? trimStr(v2Coverage) : "",
        Vehicle3_Year: addVehicle3 === true ? trimStr(v3Year) : "",
        Vehicle3_Make: addVehicle3 === true ? trimStr(v3Make) : "",
        Vehicle3_Model: addVehicle3 === true ? trimStr(v3Model) : "",
        Vehicle3_Type: addVehicle3 === true ? trimStr(v3VehicleType) : "",
        Vehicle3_Ownership: addVehicle3 === true ? trimStr(v3Ownership) : "",
        Vehicle3_Primary_Use: addVehicle3 === true ? trimStr(v3PrimaryUse) : "",
        Vehicle3_Expected_Mileage: addVehicle3 === true ? trimStr(v3Miles) : "",
        Vehicle3_Coverage: addVehicle3 === true ? trimStr(v3Coverage) : "",
        Had_Insurance: formatBool(hadInsurance),
        Current_Insurer: trimStr(currentInsurer),
        Years_Insured: trimStr(yearsInsured),
        Driver_Count: driverCount != null ? String(driverCount) : "",
        Driver1_Gender: trimStr(d1Gender),
        Driver1_Married: formatBool(d1Married),
        Driver1_Education: trimStr(d1Education),
        Driver1_Occupation: trimStr(d1Occupation),
        Driver1_Credit_Score: trimStr(d1CreditScore),
        Driver1_Accidents: trimStr(d1Accidents),
        Driver1_Tickets: trimStr(d1Tickets),
        Driver1_DUI: formatBool(d1DUI),
        Driver1_License_Suspended: formatBool(d1Suspended),
        Driver2_First_Name: trimStr(d2FirstName),
        Driver2_Last_Name: trimStr(d2LastName),
        Driver2_Relation: trimStr(d2Relation),
        Driver2_Gender: trimStr(d2Gender),
        Driver2_Married: formatBool(d2Married),
        Driver2_Education: trimStr(d2Education),
        Driver2_Occupation: trimStr(d2Occupation),
        Driver2_Accidents: trimStr(d2Accidents),
        Driver2_Tickets: trimStr(d2Tickets),
        Driver2_DUI: formatBool(d2DUI),
        Driver2_License_Suspended: formatBool(d2Suspended),
        Driver2_DOB: trimStr(d2DOB),
        Driver3_First_Name: trimStr(d3FirstName),
        Driver3_Last_Name: trimStr(d3LastName),
        Driver3_Relation: trimStr(d3Relation),
        Driver3_Gender: trimStr(d3Gender),
        Driver3_Married: formatBool(d3Married),
        Driver3_Education: trimStr(d3Education),
        Driver3_Occupation: trimStr(d3Occupation),
        Driver3_Accidents: trimStr(d3Accidents),
        Driver3_Tickets: trimStr(d3Tickets),
        Driver3_DUI: formatBool(d3DUI),
        Driver3_License_Suspended: formatBool(d3Suspended),
        Driver3_DOB: trimStr(d3DOB),
        Wants_Home_Discount: formatBool(wantsHomeDiscount),
        Wants_Renters_Discount: formatBool(wantsRentersDiscount),
        Served_Military: formatBool(servedMilitary),
        Help_Goal: trimStr(helpGoal),
        Belongs_To_AARP: formatBool(belongsToAARP),
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
