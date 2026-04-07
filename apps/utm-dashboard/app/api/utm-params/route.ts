import { NextRequest, NextResponse } from "next/server"
import { and, asc, eq, inArray } from "drizzle-orm"
import { headers } from "next/headers"

import { db } from "@/lib/db"
import { getBrandByHostname } from "@/lib/brand-config"
import { utmParams } from "@/lib/db/schema"
import { getCurrentUser } from "@/lib/auth"
import { isUtmProductId, parseUtmProductIdParam } from "@/lib/utm-products"

type ParamStatus = "active" | "blocked"

type ParamPayload = {
  key: string
  value: string
  status: ParamStatus
}

async function resolveBrandIdForRequest() {
  const h = await headers()
  const forwarded = h.get("x-forwarded-host")
  const host = forwarded?.split(",")[0]?.trim() ?? h.get("host") ?? ""
  const brand = getBrandByHostname(host)
  return brand.id
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const brandId = await resolveBrandIdForRequest()
    const productId = parseUtmProductIdParam(request.nextUrl.searchParams.get("productId"))

    const rows = await db
      .select({
        key: utmParams.key,
        value: utmParams.value,
        status: utmParams.status,
      })
      .from(utmParams)
      .where(and(eq(utmParams.brandId, brandId), eq(utmParams.productId, productId)))
      .orderBy(asc(utmParams.key), asc(utmParams.value))

    return NextResponse.json({ success: true, items: rows, productId })
  } catch (error) {
    console.error("[utm-params:get] failed", error)
    return NextResponse.json({ success: false, error: "Failed to load UTM params" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const brandId = await resolveBrandIdForRequest()
    const body = (await request.json()) as { items?: ParamPayload[]; productId?: string }
    const items = body.items ?? []

    const rawProduct = body.productId
    if (rawProduct !== undefined && !isUtmProductId(rawProduct)) {
      return NextResponse.json({ success: false, error: "Invalid productId" }, { status: 400 })
    }
    const productId = parseUtmProductIdParam(rawProduct ?? null)

    const valid = items.filter(
      (item) =>
        item &&
        typeof item.key === "string" &&
        typeof item.value === "string" &&
        (item.status === "active" || item.status === "blocked")
    )

    if (valid.length === 0) {
      return NextResponse.json({ success: true, updated: 0 })
    }

    const values = [...new Set(valid.map((item) => item.value))]
    const keys = [...new Set(valid.map((item) => item.key))]

    const existing = await db
      .select({
        key: utmParams.key,
        value: utmParams.value,
      })
      .from(utmParams)
      .where(
        and(
          eq(utmParams.brandId, brandId),
          eq(utmParams.productId, productId),
          inArray(utmParams.key, keys),
          inArray(utmParams.value, values)
        )
      )

    const existingSet = new Set(existing.map((item) => `${item.key}::${item.value}`))

    let updated = 0
    for (const item of valid) {
      const id = `${item.key}::${item.value}`
      if (existingSet.has(id)) {
        await db
          .update(utmParams)
          .set({ status: item.status })
          .where(
            and(
              eq(utmParams.brandId, brandId),
              eq(utmParams.productId, productId),
              eq(utmParams.key, item.key),
              eq(utmParams.value, item.value)
            )
          )
      } else {
        await db.insert(utmParams).values({
          brandId,
          productId,
          key: item.key,
          value: item.value,
          status: item.status,
        })
      }
      updated += 1
    }

    return NextResponse.json({ success: true, updated, productId })
  } catch (error) {
    console.error("[utm-params:put] failed", error)
    return NextResponse.json(
      { success: false, error: "Failed to update UTM params" },
      { status: 500 }
    )
  }
}
