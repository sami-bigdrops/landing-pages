import { NextRequest } from "next/server"
import { collectStoredUtmParams } from "@workspace/lp-core"

export function collectTrackingParams(request: NextRequest): Map<string, string> {
  return collectStoredUtmParams({
    getSearchParam: (key) => request.nextUrl.searchParams.get(key),
    getCookie: (name) => request.cookies.get(name)?.value,
  })
}
