export type LeadProsperApiResponse = {
  status?: string
  code?: number
  message?: string
  id?: string
  lead_id?: string
  redirect_url?: string
}

export const LEADPROSPER_REDIRECT_STORAGE_KEY = "lp_redirect_url"
export const LEADPROSPER_REDIRECT_DELAY_MS = 10_000

export function getSafeHttpRedirectUrl(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed) return null
  try {
    const url = new URL(trimmed)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    return url.toString()
  } catch {
    return null
  }
}

type LeadProsperCallResult =
  | { ok: true; data: LeadProsperApiResponse }
  | { ok: false; reason: "invalid_response"; raw?: string }

const LEADPROSPER_DEFAULT_DIRECT_POST_URL =
  "https://api.leadprosper.io/direct_post"

function describeLeadProsperOutcome(status: string | undefined): string {
  switch ((status ?? "").toUpperCase()) {
    case "ACCEPTED":
      return "Lead accepted — a buyer took this lead"
    case "DUPLICATED":
      return "Lead duplicated — this lead was already submitted"
    case "ERROR":
      return "Lead rejected — LeadProsper returned an error"
    default:
      return status
        ? `Unexpected LeadProsper status: ${status}`
        : "LeadProsper response missing a status"
  }
}

export function logLeadProsperResponse(data: LeadProsperApiResponse) {
  const status = data.status ?? "UNKNOWN"
  const outcome = describeLeadProsperOutcome(data.status)
  const message = data.message?.trim() ? data.message.trim() : "(none)"

  console.log(
    [
      "[submit-form] LeadProsper response",
      `  Outcome: ${outcome}`,
      `  Status: ${status}`,
      `  Code: ${data.code ?? "(none)"}`,
      `  Message: ${message}`,
      `  Lead ID: ${data.lead_id ?? "(none)"}`,
      `  Response ID: ${data.id ?? "(none)"}`,
      `  Redirect URL: ${data.redirect_url?.trim() || "(none)"}`,
    ].join("\n")
  )
}

export function logLeadProsperInvalidResponse(raw?: string) {
  console.error(
    [
      "[submit-form] LeadProsper response",
      "  Outcome: Invalid response — LeadProsper did not return valid JSON",
      `  Raw body: ${raw?.trim() || "(empty)"}`,
    ].join("\n")
  )
}

export function getLeadProsperPostUrl(): string {
  const configured = process.env.LEADPROSPER_API_URL?.trim()
  if (!configured) return LEADPROSPER_DEFAULT_DIRECT_POST_URL
  if (configured.includes("/post") && !configured.includes("/direct_post")) {
    return configured.replace("/post", "/direct_post")
  }
  return configured
}

async function callLeadProsperApi(
  url: string,
  payload: Record<string, unknown>
): Promise<LeadProsperCallResult> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  const raw = await response.text()
  try {
    const data = JSON.parse(raw) as LeadProsperApiResponse
    return { ok: true, data }
  } catch {
    return { ok: false, reason: "invalid_response", raw: raw.slice(0, 500) }
  }
}

export async function postLeadProsper(payload: Record<string, unknown>) {
  const logPayload = { ...payload, lp_key: payload.lp_key ? "[REDACTED]" : "" }
  console.log(
    "[submit-form] LeadProsper DIRECT_POST payload:",
    JSON.stringify(logPayload, null, 2)
  )

  return callLeadProsperApi(getLeadProsperPostUrl(), payload)
}
