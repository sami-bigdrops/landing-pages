import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

const CCPA_OPT_OUT_TO =
  process.env.CCPA_OPT_OUT_EMAIL?.trim() || "ccpaoptout@protectifii.com"

const region = process.env.AWS_REGION || "us-east-1"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const sesClient = new SESClient({
  region,
  ...(accessKeyId && secretAccessKey
    ? {
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      }
    : {}),
})

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function getSesFromSource(): string | null {
  const addr = process.env.AWS_SES_FROM_EMAIL?.trim()
  if (!addr) return null
  return `Protectifii <${addr}>`
}

function yesNoLabel(value: unknown): string {
  return String(value).toLowerCase() === "yes" ? "Yes" : "No"
}

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

export async function sendCcpaRequestEmail(
  data: CcpaRequestPayload
): Promise<boolean> {
  const source = getSesFromSource()
  if (!source) {
    console.warn(
      "[send-ccpa-email] Set AWS_SES_FROM_EMAIL; skipping CCPA opt-out email"
    )
    return false
  }

  const subject = `CCPA request — ${data.firstName} ${data.lastName}`.trim()
  const rows: Array<[string, string]> = [
    ["First Name", data.firstName],
    ["Last Name", data.lastName],
    ["Address", data.address],
    ["City", data.city],
    ["State", data.state],
    ["Zip", data.zip],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Preferred contact method", data.preferredContactMethod],
    ["Receive information via", data.receiveInformationVia],
    ["Want access to Personal Information", yesNoLabel(data.wantAccess)],
    ["Want delete Personal Information", yesNoLabel(data.wantDelete)],
    ["Want opt-out of sale", yesNoLabel(data.wantOptOutSale)],
    ["Authorized agent", yesNoLabel(data.isAuthorizedAgent)],
  ]

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`
    )
    .join("")

  const textBody = rows.map(([label, value]) => `${label}: ${value}`).join("\n")

  const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,Helvetica,sans-serif;color:#111;background:#f8fafc;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
    <div style="padding:16px 20px;background:#191443;color:#fff;">
      <h1 style="margin:0;font-size:18px;">Protectifii CCPA Request</h1>
    </div>
    <div style="padding:20px;">
      <p style="margin:0 0 16px;">A new California privacy request was submitted.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${htmlRows}</table>
    </div>
  </div>
</body>
</html>`

  try {
    await sesClient.send(
      new SendEmailCommand({
        Source: source,
        Destination: { ToAddresses: [CCPA_OPT_OUT_TO] },
        ReplyToAddresses: data.email.includes("@") ? [data.email] : undefined,
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: textBody, Charset: "UTF-8" },
            Html: { Data: htmlBody, Charset: "UTF-8" },
          },
        },
      })
    )
    console.log(`[send-ccpa-email] CCPA request emailed to ${CCPA_OPT_OUT_TO}`)
    return true
  } catch (error) {
    console.error("[send-ccpa-email] Failed to send CCPA request email:", error)
    return false
  }
}
