"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getCookie, setCookie } from "@workspace/lp-core"
import { track } from "@vercel/analytics"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { Button } from "@workspace/ui/components/button"
import { EXPERTS_CONTENT } from "@/lib/constant"

const ZIP_COOKIE_NAME = "zipCode"
const ZIP_COOKIE_DAYS = 30

function ExpertCard({
  name,
  role,
  avatar,
  quote,
}: {
  name: string
  role: string
  avatar: string
  quote: string
}) {
  return (
    <article className="flex h-full min-h-[280px] flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-7">
      <div className="flex items-start gap-3.5">
        <Image
          src={avatar}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 pt-0.5">
          <p className="font-inter text-base font-bold leading-snug text-[#1C2833] sm:text-lg">
            {name}
          </p>
          <p className="mt-0.5 line-clamp-2 font-inter text-sm leading-snug text-[#6B7280]">
            {role}
          </p>
        </div>
      </div>

      <p className="mt-5 flex-1 font-inter text-sm leading-relaxed text-[#4B5563] sm:text-[15px]">
        {quote}
      </p>
    </article>
  )
}

export default function AskTheExperts() {
  const router = useRouter()
  const items = EXPERTS_CONTENT.items
  const [startIndex, setStartIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(2)
  const [zipCode, setZipCode] = useState("")
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const update = () => {
      setVisibleCount(window.matchMedia("(min-width: 768px)").matches ? 2 : 1)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const maxStart = Math.max(0, items.length - visibleCount)
    if (startIndex > maxStart) setStartIndex(maxStart)
  }, [visibleCount, items.length, startIndex])

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

  const maxStart = Math.max(0, items.length - visibleCount)
  const canPrev = startIndex > 0
  const canNext = startIndex < maxStart
  const visibleItems = items.slice(startIndex, startIndex + visibleCount)
  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5))

  return (
    <section className="w-full bg-[#F7F9FC] px-4 py-12 sm:px-6 sm:py-14 lg:px-14 lg:py-16 xl:px-23 xl:py-20">
      <div className="container mx-auto">
        <div className="mb-8 text-center md:mb-10">
          <p className="font-inter text-xs font-bold uppercase tracking-[0.12em] text-[#1e3a5f] sm:text-sm">
            {EXPERTS_CONTENT.eyebrow}
          </p>
          <h2 className="mx-auto mt-2 max-w-3xl font-inter text-2xl font-bold leading-tight tracking-tight text-[#1e3a5f] sm:text-3xl lg:text-4xl">
            {EXPERTS_CONTENT.header}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {visibleItems.map((item) => (
            <ExpertCard
              key={item.name}
              name={item.name}
              role={item.role}
              avatar={item.avatar}
              quote={item.quote}
            />
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous experts"
            disabled={!canPrev}
            onClick={() => setStartIndex((i) => Math.max(0, i - 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#1e3a5f] transition-colors hover:border-[#1e3a5f] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next experts"
            disabled={!canNext}
            onClick={() => setStartIndex((i) => Math.min(maxStart, i + 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1e3a5f] text-white transition-colors hover:bg-[#152C4B] disabled:cursor-not-allowed disabled:bg-[#1e3a5f]/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto mt-12 w-full max-w-md sm:mt-14">
          <div className="flex w-full flex-col overflow-hidden rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:flex-row sm:items-stretch">
            <ZipCodeInput
              id="experts-zipcode"
              value={zipCode}
              onChange={(value) => setZipCode(value)}
              onKeyDown={handleKeyPress}
              placeholder={EXPERTS_CONTENT.zipPlaceholder}
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
              {isRedirecting ? "Redirecting..." : EXPERTS_CONTENT.ctaButton}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
