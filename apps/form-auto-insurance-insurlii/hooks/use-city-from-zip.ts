"use client"

import { useEffect, useState } from "react"
import { DEFAULT_FALLBACK_CITY } from "@/lib/constant"

function normalizeZip(zip: string | null | undefined): string {
  return (zip ?? "").replace(/\D/g, "").slice(0, 5)
}

export function useCityFromZip(zipParam: string | null | undefined): string {
  const [cityName, setCityName] = useState(DEFAULT_FALLBACK_CITY)

  useEffect(() => {
    const zip = normalizeZip(zipParam)

    if (zip.length !== 5) {
      setCityName(DEFAULT_FALLBACK_CITY)
      return
    }

    let cancelled = false

    fetch(`/api/zip-to-city?zip=${encodeURIComponent(zip)}`)
      .then((res) => res.json())
      .then((data: { city?: string | null }) => {
        if (cancelled) return
        const city = data?.city?.trim()
        setCityName(city && city.length > 0 ? city : DEFAULT_FALLBACK_CITY)
      })
      .catch(() => {
        if (!cancelled) setCityName(DEFAULT_FALLBACK_CITY)
      })

    return () => {
      cancelled = true
    }
  }, [zipParam])

  return cityName
}
