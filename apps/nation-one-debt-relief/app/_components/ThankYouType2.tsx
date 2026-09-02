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
  requireEmailInParams?: boolean
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
  requireEmailInParams = false,
}: ThankYouType2Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState(false)
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

    if (!requireEmailInParams) {
      setIsAuthorized(true)
      setIsLoading(false)
      return
    }

    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl) {
      setIsAuthorized(true)
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
  }, [searchParams, router, redirectPath, requireEmailInParams])

  if (isLoading) {
    if (loadingFallback) return <>{loadingFallback}</>
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-white px-6 py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-200 border-t-[#142B4A]" />
      </main>
    )
  }

  if (!isAuthorized) return null

  const replaceUtm = (link: string) =>
    link
      .replace(/\$\{utm_source\}/g, utmParams.utm_source)
      .replace(/\$\{utm_id\}/g, utmParams.utm_id)

  return (
    <main className="flex flex-1 flex-col bg-white">
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-14 md:px-8 md:py-14 lg:px-14 lg:py-16 xl:py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h1
            className="font-sans text-2xl font-extrabold text-[#142B4A] md:text-3xl xl:text-4xl"
            style={{ lineHeight: "1.3" }}
          >
            {content.title}
          </h1>

          <p
            className="mt-4 max-w-2xl font-sans text-[0.85rem] font-normal text-[#475467] md:mt-5 md:max-w-[450px] xl:max-w-[620px] xl:mt-6 xl:text-lg"
            style={{ lineHeight: "1.6" }}
          >
            {content.confirmationMessage}
          </p>

          {content.featureCards.length > 0 ? (
            <div className="mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-8 sm:mt-12 sm:flex-row sm:gap-14 md:mt-14 md:gap-16 xl:mt-16 xl:gap-20">
              {content.featureCards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-center justify-center gap-3 xl:gap-4"
                >
                  <Image
                    src={card.iconSrc}
                    alt=""
                    width={60}
                    height={60}
                    className="h-11 w-11 md:h-12 md:w-12 object-contain xl:h-14 xl:w-14"
                    aria-hidden
                  />
                  <p className="font-sans text-base font-bold text-[#142B4A] xl:text-lg">
                    {card.title}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {ads.length > 0 ? (
        <section className="border-t border-gray-200 bg-[#F8F9FB] px-6 py-10 md:px-8 md:py-12 lg:px-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center font-sans text-base font-semibold text-[#142B4A] md:mb-8 md:text-lg">
              {adSectionTitle ?? `We have handpicked ${ads.length} great offers, just for you.`}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              {ads.map((ad, index) => (
                <a
                  key={index}
                  href={replaceUtm(ad.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
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
      ) : null}
    </main>
  )
}
