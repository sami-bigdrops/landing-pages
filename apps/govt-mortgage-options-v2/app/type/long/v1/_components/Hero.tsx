"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core"
import { track } from "@vercel/analytics"
import { HERO_CONTENT } from "@/lib/constant"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { Button } from "@workspace/ui/components/button"
import HeroCards from "./HeroCards"
import HeroNotification from "./HeroNotification"

const ZIP_COOKIE_NAME = "zipCode"
const ZIP_COOKIE_DAYS = 30

function formatUpdateDate(date = new Date()) {
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase()
}

export default function Hero() {
  useUtmParams(30)
  const router = useRouter()

  const [zipCode, setZipCode] = useState("")
  const [stateName, setStateName] = useState("")
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const savedZip = getCookie(ZIP_COOKIE_NAME)
    if (savedZip) setZipCode(savedZip)

    let cancelled = false
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        const region = data?.region != null ? String(data.region).trim() : null
        if (region) setStateName(region)
        if (!savedZip) {
          const zip = data?.zip != null ? String(data.zip).trim() : null
          if (zip) setZipCode(zip)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const handleContinue = () => {
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5)
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code")
      return
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS)
    track("zip_submission", { state: stateName || undefined, zip_code: trimmed })
    setIsRedirecting(true)
    router.push("/form")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue()
  }

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5))
  const updateState = (stateName || "Your Area").toUpperCase()

  return (
    <>
      <div className="relative w-full">
        <div className="container mx-auto flex flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14 xl:px-20 xl:py-16">
          <p className="text-center font-inter text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-base md:text-lg">
            {updateState} UPDATE: {formatUpdateDate()}
          </p>

          <h1 className="mt-3 max-w-3xl text-center font-inter text-xl font-semibold uppercase leading-snug tracking-tight text-white sm:mt-4 sm:text-2xl md:text-3xl lg:text-4xl">
            {HERO_CONTENT.headline}
            <br />
            {HERO_CONTENT.headlineSecondary}
          </h1>

          <div className="mt-6 w-full max-w-md sm:mt-7">
            <div className="flex w-full flex-col overflow-hidden rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:flex-row sm:items-stretch">
              <ZipCodeInput
                id="hero-zipcode"
                value={zipCode}
                onChange={(value) => setZipCode(value)}
                onKeyDown={handleKeyPress}
                placeholder={HERO_CONTENT.zipPlaceholder}
                containerClassName="w-full min-w-0 flex-1 space-y-0"
                inputClassName="
                  !h-[56px] w-full rounded-none border-0 bg-white px-4
                  text-center sm:text-left
                  font-inter text-lg font-medium leading-none text-[#1C2833]
                  shadow-none outline-none
                  placeholder:text-[#9CA3AF] placeholder:font-normal placeholder:text-base
                  focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0
                "
              />
              <Button
                type="6"
                variant="default"
                onClick={handleContinue}
                disabled={isRedirecting || !zipValid}
                className="!h-[56px] w-full shrink-0 cursor-pointer rounded-none bg-[#34C759] px-6 font-inter text-lg font-semibold text-white shadow-none transition-colors hover:bg-[#2DB84E] hover:text-white disabled:cursor-not-allowed disabled:opacity-90 sm:w-[160px]"
              >
                {isRedirecting ? "Redirecting..." : HERO_CONTENT.ctaButton}
              </Button>
            </div>
          </div>

          <div className="mt-7 w-full max-w-[340px] sm:mt-8 sm:max-w-[360px]">
            <HeroCards />
          </div>
        </div>
      </div>

      <HeroNotification />
    </>
  )
}
