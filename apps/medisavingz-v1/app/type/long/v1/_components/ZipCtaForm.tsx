"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "@workspace/lp-core"
import { track } from "@vercel/analytics"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { Button } from "@workspace/ui/components/button"
import Image from "next/image"

const ZIP_COOKIE_NAME = "zipCode"
const ZIP_COOKIE_DAYS = 30

type ZipCtaFormProps = {
  buttonLabel: string
  idPrefix: string
  align?: "center" | "start"
  className?: string
}

export default function ZipCtaForm({
  buttonLabel,
  idPrefix,
  align = "center",
  className = "",
}: ZipCtaFormProps) {
  const router = useRouter()
  const [zipCode, setZipCode] = useState("")
  const [cityName, setCityName] = useState("")
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        const city = data?.city != null ? String(data.city).trim() : null
        const zip =
          data?.zip != null ? String(data.zip).replace(/\D/g, "").slice(0, 5) : null
        if (city) setCityName(city)
        if (zip && zip.length === 5) {
          setZipCode((prev) => (prev === "" ? zip : prev))
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5)
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code")
      return
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS)
    track("zip_submission", { state: cityName || undefined, zip_code: trimmed })
    setIsRedirecting(true)
    router.push("/form")
  }

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5))
  const itemsAlign = align === "start" ? "items-start" : "items-center"
  const justify = align === "start" ? "justify-start" : "justify-center"

  return (
    <div className={`w-full ${className}`}>
      <form
        data-arohaa-zip-form
        onSubmit={handleSubmit}
        className={`flex w-full flex-col gap-2.5 sm:hidden ${itemsAlign}`}
      >
        <div className="relative w-full max-w-[420px]">
          <div className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2">
            <Image
              src="/location.svg"
              alt=""
              width={20}
              height={20}
              className="h-4.5 w-4.5"
            />
          </div>
          <ZipCodeInput
            id={`${idPrefix}-zip-mobile`}
            name="zip"
            data-arohaa-zip
            value={zipCode}
            onChange={setZipCode}
            placeholder="90001"
            inputClassName="h-14 w-full rounded-[10px] border border-[#CEDBEC] bg-white pl-9.5 pr-2 text-[0.9rem] font-normal shadow-[0_0_2px_0_rgba(23,33,43,0.06)] placeholder:text-[#102A43] focus-visible:ring-0 focus-visible:ring-offset-0"
            containerClassName="w-full"
          />
        </div>
        <Button
          type="1"
          variant="default"
          htmlType="submit"
          data-arohaa-zip-submit
          disabled={isRedirecting || !zipValid}
          className="flex h-14 w-full max-w-[420px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2F6FED] px-8 text-[0.9rem] font-semibold text-white transition-all duration-300 hover:bg-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-90"
        >
          {buttonLabel}
        </Button>
      </form>

      <form
        data-arohaa-zip-form
        onSubmit={handleSubmit}
        className={`hidden w-full flex-row gap-2 sm:flex xl:gap-3 ${itemsAlign} ${justify}`}
      >
        <div className="relative w-full max-w-[145px] min-w-0 shrink lg:max-w-[170px] xl:max-w-[200px]">
          <div className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2">
            <Image
              src="/location.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </div>
          <ZipCodeInput
            id={`${idPrefix}-zip`}
            name="zip"
            data-arohaa-zip
            value={zipCode}
            onChange={setZipCode}
            placeholder="90001"
            inputClassName="h-14 w-full rounded-[10px] border border-[#CEDBEC] bg-white pl-10 pr-2 text-[0.9rem] font-normal shadow-[0_0_2px_0_rgba(23,33,43,0.06)] placeholder:text-[#102A43] focus-visible:ring-0 focus-visible:ring-offset-0 xl:h-16 xl:text-base"
            containerClassName="w-full"
          />
        </div>
        <Button
          type="1"
          variant="default"
          htmlType="submit"
          data-arohaa-zip-submit
          disabled={isRedirecting || !zipValid}
          className="flex h-14 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#2F6FED] px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-90 xl:h-16 xl:px-6 xl:text-lg"
        >
          {buttonLabel}
        </Button>
      </form>
    </div>
  )
}
