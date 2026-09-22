export type LeadProsperApiResponse = {
  status?: string
  code?: number
  message?: string
  id?: string
  lead_id?: string
}

type LeadProsperCallResult =
  | { ok: true; data: LeadProsperApiResponse }
  | { ok: false; reason: "invalid_response"; raw?: string }

const LEADPROSPER_DEFAULT_DIRECT_POST_URL =
  "https://api.leadprosper.io/direct_post"

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
