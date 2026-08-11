import { NextResponse } from "next/server"

const CACHE_TTL_MS = 5 * 60 * 1000
const cache = new Map()

export async function GET(request) {
    try {
        const forwarded = request.headers.get("x-forwarded-for")
        const ip = forwarded ? forwarded.split(",")[0].trim() : null
        const targetIp = !ip || ip === "::1" || ip === "127.0.0.1" ? "8.8.8.8" : ip

        const cached = cache.get(targetIp)
        if (cached && cached.expiresAt > Date.now()) {
            return NextResponse.json(cached.body)
        }

        const response = await fetch(`https://ipinfo.io/${targetIp}/json/`, {
            next: { revalidate: 300 },
            headers: { "User-Agent": "home-insurance-quotifii-v2/1.0" },
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
            const reason = data?.reason || "RateLimited"
            const body = { city: null, zip: null, message: reason || "Unknown Error" }
            return NextResponse.json(body)
        }

        if (data && data.error === true) {
            return NextResponse.json({ city: null, zip: null })
        }

        const body = {
            city: data?.city ?? null,
            zip: data?.postal ?? null,
        }
        cache.set(targetIp, { body, expiresAt: Date.now() + CACHE_TTL_MS })
        return NextResponse.json(body)
    } catch {
        return NextResponse.json({ city: null, zip: null })
    }
}
