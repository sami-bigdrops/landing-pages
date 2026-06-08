"use client"

import { useEffect, useState } from "react"
import { DEFAULT_FALLBACK_CITY } from "@/lib/constant"

function normalizeZip(zip: string | null | undefined): string {
  return (zip ?? "").replace(/\D/g, "").slice(0, 5)
}

export function useCityFromZip(zipParam: string | null | undefined): { city: string; state: string } {
  const [city, setCity] = useState(DEFAULT_FALLBACK_CITY)
  const [state, setState] = useState("")

  useEffect(() => {
    const zip = normalizeZip(zipParam)

    if (zip.length !== 5) {
      setCity(DEFAULT_FALLBACK_CITY)
      setState("")
      return
    }

    let cancelled = false

    fetch(`/api/zip-to-city?zip=${encodeURIComponent(zip)}`)
      .then((res) => res.json())
      .then((data: { city?: string | null; state?: string | null }) => {
        if (cancelled) return
        const cityVal = data?.city?.trim()
        setCity(cityVal && cityVal.length > 0 ? cityVal : DEFAULT_FALLBACK_CITY)
        setState(data?.state?.trim() ?? "")
      })
      .catch(() => {
        if (!cancelled) { setCity(DEFAULT_FALLBACK_CITY); setState("") }
      })

    return () => {
      cancelled = true
    }
  }, [zipParam])

  return { city, state }
}
