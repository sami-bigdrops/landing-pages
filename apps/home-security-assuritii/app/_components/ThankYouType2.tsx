"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Shield, Building2, CheckCircle, Mail } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import type { ThankYouType2Content } from "@/lib/constant"

const ICON_MAP = {
  shield: Shield,
  building: Building2,
  check: CheckCircle,
} as const

export interface ThankYouAd {
  image: string
  link: string
}

export interface ThankYouType2Props {
  content: ThankYouType2Content
  ads?: ThankYouAd[]
  adSectionTitle?: string
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
}: ThankYouType2Props) {
  const searchParams = useSearchParams()
  const [utmParams, setUtmParams] = useState({ utm_source: "", utm_id: "" })

  useEffect(() => {
    const utm_source =
      searchParams.get("utm_source") || getCookie("subid1") || ""
    const utm_id = searchParams.get("utm_id") || getCookie("subid2") || ""
    setUtmParams({ utm_source, utm_id })
  }, [searchParams])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!searchParams.get("email")) return
    const url = new URL(window.location.href)
    if (!url.searchParams.has("email")) return
    url.searchParams.delete("email")
    const next =
      url.pathname + (url.search ? url.search : "") + (url.hash ?? "")
    window.history.replaceState({}, document.title, next)
  }, [searchParams])

  const isAdtLogo =
    content.partnerLogo.src === "/partner-1.svg" ||
    content.partnerLogo.src.endsWith("/partner-1.svg")

  const replaceUtm = (link: string) =>
    link
      .replace(/\$\{utm_source\}/g, utmParams.utm_source)
      .replace(/\$\{utm_id\}/g, utmParams.utm_id)

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-3xl">
            {content.title}
          </h1>

          <div className="mt-8 flex justify-center">
            <Image
              src={content.partnerLogo.src}
              alt={content.partnerLogo.alt}
              width={isAdtLogo ? 120 : 200}
              height={isAdtLogo ? 52 : 86}
              className={cn(
                "h-auto w-full object-contain",
                isAdtLogo
                  ? "max-w-[96px] sm:max-w-[104px]"
                  : "max-w-[160px] sm:max-w-[180px]"
              )}
              priority
            />
          </div>

          <p className="mx-auto mt-6 max-w-[690px] text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
            {content.confirmationMessage}
          </p>

          {content.emailConfirmationNotice ? (
            <div className="mx-auto mt-6 flex max-w-[690px] gap-3 rounded-xl border border-emerald-200/90 bg-emerald-50/90 px-4 py-3.5 text-left sm:px-5 sm:py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                <Mail className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} aria-hidden />
              </div>
              <p className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-emerald-950 sm:text-[0.9375rem]">
                {content.emailConfirmationNotice}
              </p>
            </div>
          ) : null}

          <h2 className="mt-10 text-lg font-bold text-gray-900 sm:mt-12 sm:text-xl">
            {content.aboutSectionTitle}
          </h2>

          <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-6">
            {content.featureCards.map((card, index) => {
              const IconComponent = ICON_MAP[card.icon]
              return (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-white p-5 text-left shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white sm:h-12 sm:w-12">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-gray-900 sm:text-lg">
                    {card.title}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {card.bulletPoints.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 sm:text-[0.9375rem]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
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
