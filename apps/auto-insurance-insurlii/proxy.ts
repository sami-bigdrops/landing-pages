import { NextRequest, NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { utmParams } from "@/lib/db/schema"

const BRAND_ID = "quotifii"
const UTM_PRODUCT_ID = "auto_insurance_quotifii"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90
const ALLOWED_UTM_KEYS = new Set(["utm_source", "utm_s1"])

function collectUtmParams(request: NextRequest): Map<string, string> {
  const collected = new Map<string, string>()

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    const normalizedKey = key.toLowerCase()
    if (ALLOWED_UTM_KEYS.has(normalizedKey) && value.trim()) {
      collected.set(normalizedKey, value.trim())
    }
  }

  for (const cookie of request.cookies.getAll()) {
    const normalizedKey = cookie.name.toLowerCase()
    if (!ALLOWED_UTM_KEYS.has(normalizedKey)) continue
    if (collected.has(normalizedKey)) continue
    if (!cookie.value.trim()) continue
    collected.set(normalizedKey, cookie.value.trim())
  }

  return collected
}

function applyUtmCookies(response: NextResponse, utmMap: Map<string, string>) {
  for (const [key, value] of utmMap) {
    response.cookies.set(key, value, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: COOKIE_MAX_AGE,
    })
  }
}

export async function proxy(request: NextRequest) {
  const deniedPath = "/access-denied"
  const { pathname } = request.nextUrl

  if (pathname === deniedPath || pathname.includes(".")) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  if (request.method !== "GET") return response

  const utmMap = collectUtmParams(request)
  if (utmMap.size === 0) return response

  applyUtmCookies(response, utmMap)

  try {
    for (const [key, value] of utmMap) {
      const existing = await db.query.utmParams.findFirst({
        where: and(
          eq(utmParams.brandId, BRAND_ID),
          eq(utmParams.productId, UTM_PRODUCT_ID),
          eq(utmParams.key, key),
          eq(utmParams.value, value)
        ),
      })

      if (existing) {
        if (existing.status === "blocked") {
          const deniedUrl = new URL(deniedPath, request.url)
          const deniedResponse = NextResponse.redirect(deniedUrl)
          applyUtmCookies(deniedResponse, utmMap)
          return deniedResponse
        }
        continue
      }

      await db.insert(utmParams).values({
        brandId: BRAND_ID,
        productId: UTM_PRODUCT_ID,
        key,
        value,
        status: "active",
      })
    }
  } catch (error) {
    console.error("[utm-middleware] failed to persist UTM params", error)
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|access-denied|.*\\..*).*)"],
}
