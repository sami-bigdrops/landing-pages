import { createUtmBlockMiddleware } from "@workspace/lp-core/middleware"
import type { NextRequest } from "next/server"

const utmBlock = createUtmBlockMiddleware({
  wid: process.env.AROHAA_LANDING_PAGE_ID ?? process.env.NEXT_PUBLIC_AROHAA_WID ?? "",
  apiBase:
    process.env.AROHAA_INGEST_API_BASE ??
    process.env.NEXT_PUBLIC_AROHAA_INGEST_API_BASE ??
    "https://api.arohaa.net",
  deniedPath: process.env.AROHAA_UTM_DENIED_PATH ?? "/access-denied",
})

export async function proxy(request: NextRequest) {
  return utmBlock(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
