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

const PROPERTY_TYPE_MAP: Record<string, string> = {
  single_family: "single family",
  condominium: "condominium",
  townhome: "townhome",
  mobile: "mobile or manufactured home",
  vacant_land: "vacant land",
}

const PROPERTY_CONDITION_MAP: Record<string, string> = {
  needs_work: "needs work",
  fair: "fair",
  good: "good",
  excellent: "excellent",
}

const REASON_FOR_SELLING_MAP: Record<string, string> = {
  late: "behind on mortgage payments",
  job: "job income loss",
  cash: "need to access cash",
  repairs: "property needs repairs",
  move: "downsizing relocating",
  metrics: "curious to see house value",
}

const TIMEFRAME_MAP: Record<string, string> = {
  asap: "asap",
  "2_3_months": "2 to 3 months",
  "6_months": "6 months",
  no_rush: "im in no rush",
}

const HOUSE_VALUE_MIDPOINTS: Record<string, number> = {
  u100: 75000,
  "100_150": 125000,
  "150_200": 175000,
  "200_250": 225000,
  "250_300": 275000,
  "300_350": 325000,
  "350_400": 375000,
  "400_450": 425000,
  "450_500": 475000,
  "500_550": 525000,
  "550_600": 575000,
  "600_700": 650000,
  "700_800": 750000,
  "800_900": 850000,
  "900k_1m": 950000,
  "1m_1_1": 1050000,
  "1_1_1_2": 1150000,
  "1_2_1_3": 1250000,
  "1_3_1_4": 1350000,
  "1_4_1_5": 1450000,
  "1_5m_plus": 1500000,
}

export function mapPropertyType(value: string): string {
  return PROPERTY_TYPE_MAP[value] ?? value
}

export function mapPropertyCondition(value: string): string {
  return PROPERTY_CONDITION_MAP[value] ?? value
}

export function mapReasonForSelling(value: string): string {
  return REASON_FOR_SELLING_MAP[value] ?? value
}

export function mapTimeframe(value: string): string {
  return TIMEFRAME_MAP[value] ?? value
}

export function mapRealtorListing(value: string): string {
  const normalized = value.trim().toLowerCase()
  if (normalized === "yes" || normalized === "no") return normalized
  return value
}

export function mapPropertyValue(houseValueRange: string): number | undefined {
  return HOUSE_VALUE_MIDPOINTS[houseValueRange]
}
