export type LeadProsperApiResponse = {
  status?: string
  code?: number
  message?: string
  ping_id?: string
  bids?: Array<{ bid_id?: string; payout?: number }>
}

type LeadProsperCallResult =
  | { ok: true; data: LeadProsperApiResponse }
  | { ok: false; reason: "invalid_response"; raw?: string }

const LEADPROSPER_DEFAULT_PING_URL = "https://api.leadprosper.io/ping"

export function getLeadProsperPingUrl(): string {
  return process.env.LEADPROSPER_PING_URL?.trim() || LEADPROSPER_DEFAULT_PING_URL
}

export function getLeadProsperPostUrl(): string {
  const configured = process.env.LEADPROSPER_API_URL?.trim()
  if (!configured) return "https://api.leadprosper.io/post"
  if (configured.includes("/direct_post")) {
    return configured.replace("/direct_post", "/post")
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

export type LeadProsperPingParams = {
  campaignId: string
  supplierId: string
  apiKey: string
  zipCode: string
  subid1?: string
  subid2?: string
}

export async function pingLeadProsper(params: LeadProsperPingParams) {
  const payload = {
    lp_campaign_id: params.campaignId,
    lp_supplier_id: params.supplierId,
    lp_key: params.apiKey,
    lp_action: "",
    lp_subid1: params.subid1 ?? "",
    lp_subid2: params.subid2 ?? "",
    zip_code: params.zipCode,
  }

  const logPayload = { ...payload, lp_key: "[REDACTED]" }
  console.log("[submit-form] LeadProsper PING payload:", JSON.stringify(logPayload, null, 2))

  return callLeadProsperApi(getLeadProsperPingUrl(), payload)
}

export async function postLeadProsper(payload: Record<string, unknown>) {
  const logPayload = { ...payload, lp_key: payload.lp_key ? "[REDACTED]" : "" }
  console.log("[submit-form] LeadProsper POST payload:", JSON.stringify(logPayload, null, 2))

  return callLeadProsperApi(getLeadProsperPostUrl(), payload)
}
