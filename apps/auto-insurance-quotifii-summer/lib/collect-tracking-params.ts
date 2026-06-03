import { NextRequest } from "next/server"

const TRACKED_UTM_KEYS = [
  "utm_source",
  "utm_id",
  "utm_s1",
  "utm_medium",
  "utm_term",
  "utm_campaign",
] as const

const COOKIE_ALIASES: Record<string, string> = {
  utm_source: "subid1",
  utm_id: "subid2",
  utm_s1: "subid3",
}

export function collectTrackingParams(request: NextRequest): Map<string, string> {
  const collected = new Map<string, string>()

  for (const key of TRACKED_UTM_KEYS) {
    const value = request.nextUrl.searchParams.get(key)?.trim()
    if (value) collected.set(key, value)
  }

  for (const key of TRACKED_UTM_KEYS) {
    if (collected.has(key)) continue
    const alias = COOKIE_ALIASES[key]
    const fromAlias = alias ? request.cookies.get(alias)?.value?.trim() : undefined
    const fromRaw = request.cookies.get(key)?.value?.trim()
    const value = fromAlias || fromRaw
    if (value) collected.set(key, value)
  }

  return collected
}
