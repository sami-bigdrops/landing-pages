"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check } from "lucide-react"
import { FORM_PRIMARY_COLOR, THANKYOU_PAGE } from "@/lib/constant"

interface ThankYouMessageProps {
  requireEmailCheck: boolean
}

export function ThankYouMessage({ requireEmailCheck }: ThankYouMessageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [ready, setReady] = useState(false)
  const checkedRef = useRef(false)

  useEffect(() => {
    if (checkedRef.current) return
    checkedRef.current = true

    if (!requireEmailCheck) {
      setReady(true)
      if (searchParams.get("email")) {
        window.history.replaceState({}, document.title, window.location.pathname)
      }
      return
    }

    const email = searchParams.get("email")?.trim()
    if (!email) {
      router.replace("/form")
      return
    }

    setReady(true)
    window.history.replaceState({}, document.title, window.location.pathname)
  }, [requireEmailCheck, router, searchParams])

  if (!ready) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#205BB9]" />
      </main>
    )
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-lg text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full md:h-20 md:w-20"
          style={{ backgroundColor: "#10b981" }}
          aria-hidden="true"
        >
          <Check className="h-8 w-8 text-white md:h-10 md:w-10" strokeWidth={3} />
        </div>
        <h1
          className="text-2xl font-bold tracking-tight md:text-3xl"
          style={{ color: FORM_PRIMARY_COLOR }}
        >
          {THANKYOU_PAGE.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
          {THANKYOU_PAGE.message}
        </p>
      </div>
    </main>
  )
}
