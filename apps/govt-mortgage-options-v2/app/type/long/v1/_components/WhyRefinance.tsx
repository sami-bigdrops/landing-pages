"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getCookie, setCookie } from "@workspace/lp-core"
import { track } from "@vercel/analytics"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { Button } from "@workspace/ui/components/button"
import { WHY_CONTENT } from "@/lib/constant"

const ZIP_COOKIE_NAME = "zipCode"
const ZIP_COOKIE_DAYS = 30

export default function WhyRefinance() {
  const router = useRouter()
  const [zipCode, setZipCode] = useState("")
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const savedZip = getCookie(ZIP_COOKIE_NAME)
    if (savedZip) {
      setZipCode(savedZip)
      return
    }

    let cancelled = false
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        const zip = data?.zip != null ? String(data.zip).trim() : null
        if (zip) setZipCode(zip)
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
    track("zip_submission", { zip_code: trimmed })
    setIsRedirecting(true)
    router.push("/form")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue()
  }

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5))

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-14 lg:py-16 xl:px-23 xl:py-20">
      <div className="container mx-auto">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="font-inter text-2xl font-bold leading-tight tracking-tight text-[#1e3a5f] sm:text-3xl lg:text-4xl">
            {WHY_CONTENT.header}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-inter text-sm text-[#4B5563] sm:text-base">
            {WHY_CONTENT.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {WHY_CONTENT.items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image
                src={item.icon}
                alt=""
                width={88}
                height={88}
                className="h-[88px] w-[88px] object-contain"
              />
              <h3 className="mt-5 whitespace-nowrap font-inter text-base font-bold leading-snug text-[#1C2833] sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[260px] font-inter text-sm leading-relaxed text-[#4B5563]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 w-full max-w-md sm:mt-14">
          <div className="flex w-full flex-col overflow-hidden rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:flex-row sm:items-stretch">
            <ZipCodeInput
              id="why-zipcode"
              value={zipCode}
              onChange={(value) => setZipCode(value)}
              onKeyDown={handleKeyPress}
              placeholder={WHY_CONTENT.zipPlaceholder}
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
              {isRedirecting ? "Redirecting..." : WHY_CONTENT.ctaButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
