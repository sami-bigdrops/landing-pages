"use client"

import { useEffect } from "react"

export function TermsHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "")
    if (!hash) return

    const scrollToTarget = () => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    scrollToTarget()
    const t = window.setTimeout(scrollToTarget, 100)
    return () => window.clearTimeout(t)
  }, [])

  return null
}
