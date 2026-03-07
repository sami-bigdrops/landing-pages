"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import type { ThankYouType2Content } from "@/lib/constant"

export interface ThankYouAd {
  image: string
  link: string
}

export interface ThankYouType2Props {
  content: ThankYouType2Content
  ads?: ThankYouAd[]
  adSectionTitle?: string
  redirectPath?: string
  loadingFallback?: React.ReactNode
}

function getCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift()?.trim() ?? ""
  return ""
}

export function ThankYouType2({
  content,
  ads = [],
  adSectionTitle,
  redirectPath = "/",
  loadingFallback,
}: ThankYouType2Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isNotQualified, setIsNotQualified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [utmParams, setUtmParams] = useState({ utm_source: "", utm_id: "" })
  const accessCheckStartedRef = useRef(false)

  useEffect(() => {
    if (!isAuthorized) return
    const utm_source =
      searchParams.get("utm_source") || getCookie("subid1") || ""
    const utm_id = searchParams.get("utm_id") || getCookie("subid2") || ""
    setUtmParams({ utm_source, utm_id })
  }, [isAuthorized, searchParams])

  useEffect(() => {
    if (accessCheckStartedRef.current) return
    accessCheckStartedRef.current = true

    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl) {
      setIsAuthorized(true)
      setIsNotQualified(searchParams.get("qualified") === "false")
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
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-200 border-t-sky-600" />
      </main>
    )
  }

  if (!isAuthorized) return null

  const replaceUtm = (link: string) =>
    link
      .replace(/\$\{utm_source\}/g, utmParams.utm_source)
      .replace(/\$\{utm_id\}/g, utmParams.utm_id)

  const showNotQualified = isNotQualified && (content.notQualifiedTitle ?? content.notQualifiedMessage)

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          {showNotQualified ? (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-[#1e3a5f] sm:text-4xl lg:text-5xl">
                {content.notQualifiedTitle ?? "We're Unable to Assist at This Time"}
              </h1>
              <p className="mt-6 text-base font-medium leading-relaxed text-gray-600 sm:text-lg max-w-[690px] mx-auto">
                {content.notQualifiedMessage ?? "Thank you for your interest. Unfortunately, we're not able to process your request at this time. Please check back later."}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-[#1e3a5f] sm:text-4xl lg:text-5xl">
                {content.title}
              </h1>

              {content.subheading ? (
                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">
                  {content.subheading}
                </h2>
              ) : null}

              {content.partnerLogo?.src ? (
                <div className="mt-8 flex justify-center">
                  <Image
                    src={content.partnerLogo.src}
                    alt={content.partnerLogo.alt}
                    width={280}
                    height={120}
                    className="h-auto w-full max-w-[280px] object-contain"
                  />
                </div>
              ) : null}

              <p className="mt-6 text-base font-medium leading-relaxed text-gray-600 sm:text-lg max-w-[690px] mx-auto">
                {content.confirmationMessage}
              </p>
            </>
          )}
        </div>
      </section>

      {ads.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50 px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-base font-semibold text-gray-900 sm:mb-8 sm:text-lg">
              {adSectionTitle ?? `We have handpicked ${ads.length} great offers, just for you.`}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              {ads.map((ad, index) => (
                <a
                  key={index}
                  href={replaceUtm(ad.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Image
                    src={ad.image}
                    alt="Offer"
                    width={900}
                    height={450}
                    className="h-auto w-full object-cover transition-opacity group-hover:opacity-[0.97]"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
