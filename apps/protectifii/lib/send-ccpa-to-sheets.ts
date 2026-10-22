export type CcpaRequestPayload = {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  email: string
  phone: string
  preferredContactMethod: string
  receiveInformationVia: string
  wantAccess: string
  wantDelete: string
  wantOptOutSale: string
  isAuthorizedAgent: string
}

function yesNoLabel(value: unknown): string {
  return String(value).toLowerCase() === "yes" ? "Yes" : "No"
}

export async function appendCcpaRequestToSheet(
  data: CcpaRequestPayload,
  meta?: { ip?: string; userAgent?: string }
): Promise<boolean> {
  const webhookUrl = process.env.CCPA_GOOGLE_SHEETS_WEBHOOK_URL?.trim()
  if (!webhookUrl) {
    console.warn(
      "[ccpa-sheets] Set CCPA_GOOGLE_SHEETS_WEBHOOK_URL; skipping Google Sheets append"
    )
    return false
  }

  const submittedAt = new Date().toISOString()
  const payload = {
    submittedAt,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    email: data.email,
    phone: data.phone,
    preferredContactMethod: data.preferredContactMethod,
    receiveInformationVia: data.receiveInformationVia,
    wantAccess: yesNoLabel(data.wantAccess),
    wantDelete: yesNoLabel(data.wantDelete),
    wantOptOutSale: yesNoLabel(data.wantOptOutSale),
    isAuthorizedAgent: yesNoLabel(data.isAuthorizedAgent),
    ip: meta?.ip ?? "",
    userAgent: meta?.userAgent ?? "",
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    })

    if (!response.ok) {
      const body = await response.text().catch(() => "")
      console.error(
        "[ccpa-sheets] Google Sheets webhook failed:",
        response.status,
        body.slice(0, 500)
      )
      return false
    }

    console.log("[ccpa-sheets] CCPA request appended to Google Sheet")
    return true
  } catch (error) {
    console.error("[ccpa-sheets] Failed to append CCPA request:", error)
    return false
  }
}
