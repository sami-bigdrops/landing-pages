import { getCookie } from "@workspace/lp-core"

export function buildProductRedirectUrl(baseUrl: string) {
  const utmId = getCookie("subid2") || ""
  const utmS1 = getCookie("subid3") || ""

  const params = new URLSearchParams()
  params.set("tid", utmId)
  params.set("uid", utmId)
  params.set("sid", "organic")
  params.set("sub1", utmS1)

  return `${baseUrl.replace(/\/$/, "")}/?${params.toString()}`
}
