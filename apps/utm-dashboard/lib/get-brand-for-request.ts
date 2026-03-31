import { headers } from "next/headers"

import { getBrandByHostname, getBrandById } from "./brand-config"

export async function getBrandForRequest() {
  const override = process.env.DASHBOARD_BRAND_ID
  if (override) {
    const byEnv = getBrandById(override)
    if (byEnv) return byEnv
  }

  const h = await headers()
  const forwarded = h.get("x-forwarded-host")
  const firstForwarded = forwarded?.split(",")[0]?.trim()
  const host = firstForwarded ?? h.get("host") ?? ""
  return getBrandByHostname(host)
}
