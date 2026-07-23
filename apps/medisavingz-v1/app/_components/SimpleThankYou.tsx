"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check } from "lucide-react"
import { trackArohaa } from "@/lib/arohaa"

const AROHAA_SUBMITTED_KEY = "arohaa_medisavingz_submitted"

type SimpleThankYouProps = {
  title: string
  message: string
  redirectPath?: string
  loadingFallback?: React.ReactNode
}

export default function SimpleThankYou({
  title,
  message,
  redirectPath = "/",
  loadingFallback,
}: SimpleThankYouProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const accessCheckStartedRef = useRef(false)

  useEffect(() => {
    if (accessCheckStartedRef.current) return
    accessCheckStartedRef.current = true

    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl) {
      setIsAuthorized(true)
      try {
        if (sessionStorage.getItem(AROHAA_SUBMITTED_KEY) === "1") {
          trackArohaa("form_success")
          sessionStorage.removeItem(AROHAA_SUBMITTED_KEY)
        }
      } catch {
        trackArohaa("form_success")
      }
      setTimeout(() => {
        if (typeof window !== "undefined") {
          const cleanUrl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname
          window.history.replaceState({}, document.title, cleanUrl)
        }
      }, 100)
    } else {
      router.replace(redirectPath)
    }
    setIsLoading(false)
  }, [searchParams, router, redirectPath])

  if (isLoading) {
    if (loadingFallback) return <>{loadingFallback}</>
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-white px-6 py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-200 border-t-[#2F6FED]" />
      </main>
    )
  }

  if (!isAuthorized) return null

  return (
    <main className="flex flex-1 items-center justify-center bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1F7A63] md:mb-7 md:h-20 md:w-20"
          aria-hidden
        >
          <Check className="h-8 w-8 text-white md:h-10 md:w-10" strokeWidth={3} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#17212B] md:text-4xl xl:text-5xl">
          {title}
        </h1>
        <p
          className="mt-5 text-base font-normal text-[#464F5B] md:text-lg xl:text-xl"
          style={{ lineHeight: 1.6 }}
        >
          {message}
        </p>
      </div>
    </main>
  )
}
