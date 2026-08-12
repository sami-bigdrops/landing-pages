import { getCookie } from "@workspace/lp-core"

export function buildProductRedirectUrl(baseUrl: string) {
  const transactionId = getCookie("subid2") || ""

  const params = new URLSearchParams()
  params.set("utm_source", "organic")
  params.set("utm_id", transactionId)
  params.set("utm_s1", "organic_redirect_quotifii.com")
  params.set("utm_medium", "organic")

  return `${baseUrl.replace(/\/$/, "")}/?${params.toString()}`
}
