"use client"

import React, { useState, useEffect, useCallback, Suspense } from "react"
import { Loader2, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import type { RadioOption } from "@workspace/ui/components/radio-button-group"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { TrustedForm, getCookie } from "@workspace/lp-core"


import { cn } from "@workspace/ui/lib/utils"

const TOTAL_STEPS = 8

const ROOF_SHADE_OPTIONS: { value: string; label: string; image: string }[] = [
  { value: "no_shade", label: "No Shade", image: "/house-1.svg" },
  { value: "little_shade", label: "A Little Shade", image: "/house-2.svg" },
  { value: "lot_shade", label: "A Lot Of Shade", image: "/house-3.svg" },
  { value: "uncertain", label: "Uncertain", image: "/quetion-mark.svg" },
]

const PRIMARY_UTILITY_VALUE = "consolidated_edison_ny_inc"
const PRIMARY_UTILITY_LABEL = "Consolidated Edison Co-NY Inc"

const MORE_UTILITY_OPTIONS: { value: string; label: string }[] = [
  { value: "national_grid_upstate", label: "National Grid (Upstate)" },
  { value: "pseg_long_island", label: "PSEG Long Island" },
  { value: "orange_rockland", label: "Orange & Rockland" },
  { value: "rochester_gas_electric", label: "Rochester Gas & Electric" },
  { value: "central_hudson", label: "Central Hudson Gas & Electric" },
  { value: "other", label: "Other / Not listed" },
]

const POWER_BILL_RANGES: { value: string; label: string }[] = [
  { value: "0_50", label: "$0 - $50" },
  { value: "51_100", label: "$51 - $100" },
  { value: "101_150", label: "$101 - $150" },
  { value: "151_200", label: "$151 - $200" },
  { value: "201_300", label: "$201 - $300" },
  { value: "301_400", label: "$301 - $400" },
  { value: "401_500", label: "$401 - $500" },
  { value: "501_plus", label: "$501+" },
]


const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
  "VT", "VA", "WA", "WV", "WI", "WY",
] as const

const defaultFormData = {
  powerBillRange: POWER_BILL_RANGES[3]?.value ?? "",
  electricityProvider: "",
  roofShade: "",
  projectNature: "",
  homeowner: "",
  windowCount: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  workDone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
}

function FormPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState("")
  const [cityName, setCityName] = useState("")
  const [formData, setFormData] = useState(defaultFormData)
  const [powerBillIndex, setPowerBillIndex] = useState(3)
 

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const saved = localStorage.getItem("windows_current_step")
      if (saved) {
        const step = parseInt(saved, 10)
        if (step >= 1 && step <= TOTAL_STEPS) setCurrentStep(step)
      }
      const storedZip = localStorage.getItem("zipCode")
      if (storedZip?.length === 5) {
        setFormData((prev) => ({ ...prev, zipCode: storedZip }))
      }
      const savedData = localStorage.getItem("windows_form_data")
      if (savedData) {
        const parsed = JSON.parse(savedData)
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          address: prev.address,
          city: prev.city,
          state: prev.state,
          zipCode: prev.zipCode || parsed.zipCode || "",
        }))
        if (parsed.powerBillRange) {
          const idx = POWER_BILL_RANGES.findIndex((r) => r.value === parsed.powerBillRange)
          if (idx >= 0) setPowerBillIndex(idx)
        }
      }
      const savedCity = localStorage.getItem("city")
      if (savedCity) setCityName(savedCity)
    } catch {
      // ignore load errors
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    let cancelled = false
    fetch("/api/location")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        const zip = data?.zip != null ? String(data.zip).replace(/\D/g, "").slice(0, 5) : null
        const city = data?.city != null ? String(data.city).trim() : null
        if (zip && zip.length === 5) {
          try {
            localStorage.setItem("zipCode", zip)
          } catch {
            // ignore
          }
        }
        if (city) {
          setCityName(city)
          try {
            localStorage.setItem("city", city)
          } catch {
            // ignore
          }
        }
        setFormData((prev) => ({
          ...prev,
          zipCode: zip && zip.length === 5 && !prev.zipCode ? zip : prev.zipCode,
          city: city && !prev.city ? city : prev.city,
        }))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem("windows_current_step", String(currentStep))
    } catch {
      // ignore
    }
  }, [currentStep])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const toSave = {
        powerBillRange: formData.powerBillRange,
        electricityProvider: formData.electricityProvider,
        roofShade: formData.roofShade,
        projectNature: formData.projectNature,
        homeowner: formData.homeowner,
        windowCount: formData.windowCount,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        workDone: formData.workDone,
      }
      localStorage.setItem("windows_form_data", JSON.stringify(toSave))
    } catch {
      // ignore
    }
  }, [formData])

  const handleTrustedFormReady = useCallback((certUrl: string) => {
    if (certUrl) setTrustedFormCertUrl(certUrl)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const tick = setInterval(() => {
      const el = document.getElementById("xxTrustedFormCertUrl_0") as HTMLInputElement | null
      const byName = document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement | null
      const input = el || byName
      if (input?.value?.trim() && input.value.trim() !== trustedFormCertUrl) {
        setTrustedFormCertUrl(input.value.trim())
      }
    }, 1000)
    return () => clearInterval(tick)
  }, [trustedFormCertUrl])

  const handleInputChange = (field: string, value: string, autoAdvance = false) => {
    if (field === "state") value = value.toUpperCase().slice(0, 2)
    if (field === "zipCode") value = value.replace(/\D/g, "").slice(0, 5)
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (autoAdvance && currentStep < TOTAL_STEPS) {
      setTimeout(() => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS)), 150)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.powerBillRange !== ""
      case 2:
        return formData.homeowner === "YES"
      case 3:
        return formData.electricityProvider !== ""
      case 4:
        return formData.roofShade !== ""
      case 5:
        return (
          formData.address.trim() !== "" &&
          formData.city.trim() !== "" &&
          formData.state.trim() !== "" &&
          formData.zipCode.length === 5
        )
      case 6:
        return formData.firstName?.trim() !== "" && formData.lastName?.trim() !== ""
      case 7: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return formData.email !== "" && emailRegex.test(formData.email)
      }
      case 8:
        return formData.phoneNumber.replace(/\D/g, "").length === 10
      default:
        return false
    }
  }

  const handleNext = async () => {
    if (!isStepValid()) return
    if (currentStep === TOTAL_STEPS) {
      setIsSubmitting(true)
      try {
        const certInput = document.getElementById("xxTrustedFormCertUrl_0") as HTMLInputElement | null
        const finalCert = certInput?.value?.trim() || trustedFormCertUrl || ""

        const payload = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          powerBillRange: formData.powerBillRange,
          electricityProvider: formData.electricityProvider,
          roofShade: formData.roofShade,
          homeowner: formData.homeowner,
          projectNature: formData.projectNature,
          windowCount: formData.windowCount,
          workDone: formData.workDone,
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          zipCode: formData.zipCode,
          subid1: getCookie("subid1") ?? "",
          subid2: getCookie("subid2") ?? "",
          subid3: getCookie("subid3") ?? "",
          xxTrustedFormCertUrl: finalCert,
        }

        const res = await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        let result: { success?: boolean; redirectUrl?: string; error?: string }
        try {
          const text = await res.text()
          result = text ? JSON.parse(text) : { success: res.ok }
        } catch {
          result = { success: res.ok, redirectUrl: `/thankyou?email=${encodeURIComponent(formData.email)}` }
        }
        if (typeof result.success === "undefined") result.success = res.ok

        if (typeof window !== "undefined") {
          localStorage.removeItem("windows_form_data")
          localStorage.removeItem("windows_current_step")
        }

        const redirectUrl =
          result.redirectUrl ||
          (result.success ? `/thankyou?email=${encodeURIComponent(formData.email)}` : `/thankyou?email=${encodeURIComponent(formData.email)}`)
        router.replace(redirectUrl)
      } catch {
        if (typeof window !== "undefined") {
          localStorage.removeItem("windows_form_data")
          localStorage.removeItem("windows_current_step")
        }
        router.replace(`/thankyou?email=${encodeURIComponent(formData.email)}`)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setCurrentStep((p) => p + 1)
    }
  }

  const handleBack = () => setCurrentStep((p) => p - 1)

  return (
    <div className="flex min-h-[400px] lg:min-h-[460px] xl:min-h-[580px] flex-col bg-[#F8FAFC] font-inter">
      <div className="w-full shrink-0">
        <ProgressBar
          type="7"
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          foregroundColor="#F5820D"
          backgroundColor="#FFEAD2"
          className="w-full"
        />
      </div>
      <div className="w-full  flex-1 flex items-center justify-center px-4 pb-8 pt-6">
        <form
          className="mx-auto w-full max-w-3xl"
          onSubmit={(e) => {
            e.preventDefault()
            if (currentStep === 4) return
            if (isStepValid() && !isSubmitting) handleNext()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && currentStep !== 4 && isStepValid() && !isSubmitting) {
              e.preventDefault()
              handleNext()
            }
          }}
        >
          <div className="flex w-full flex-col items-center justify-center">
            <TrustedForm onCertUrlReady={handleTrustedFormReady} />

            {currentStep === 1 && (
              <div className="flex flex-col items-center justify-center text-center w-full">
                <h2
                  className={` mb-4 xl:mb-10 text-xl font-inter font-bold  text-[#1F2937]  md:text-2xl xl:text-3xl `}
                >
                  Current Monthly Power Bill
                </h2>
                <p className="mb-4 md:mb-6 xl:mb-8 text-xl md:text-2xl xl:text-3xl font-inter font-bold text-[#0F766E] ">
                  {POWER_BILL_RANGES[powerBillIndex]?.label ?? ""}
                </p>
                <div className="mb-8 md:mb-10 xl:mb-14 w-full md:max-w-sm xl:max-w-md ">
                  <input
                    type="range"
                    min={0}
                    max={POWER_BILL_RANGES.length - 1}
                    step={1}
                    value={powerBillIndex}
                    aria-label="Monthly power bill range"
                    onChange={(e) => {
                      const idx = Number(e.target.value)
                      setPowerBillIndex(idx)
                      const v = POWER_BILL_RANGES[idx]?.value ?? ""
                      setFormData((prev) => ({ ...prev, powerBillRange: v }))
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E5E7EB] accent-[#0D9488] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0D9488] [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#0D9488]"
                    style={{
                      background:
                        POWER_BILL_RANGES.length <= 1
                          ? "#0D9488"
                          : `linear-gradient(to right, #0D9488 0%, #0D9488 ${(powerBillIndex / (POWER_BILL_RANGES.length - 1)) * 100}%, #E5E7EB ${(powerBillIndex / (POWER_BILL_RANGES.length - 1)) * 100}%, #E5E7EB 100%)`,
                    }}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex w-full flex-col items-center text-center">
                <h2 className="mb-6 xl:mb-10 text-xl font-bold text-[#1F2937]  md:text-2xl xl:text-3xl">
                  Do you own your home?
                </h2>
                <div className="flex  items-center justify-center gap-4 md:gap-5 xl:gap-6">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, homeowner: "YES" }))
                      setCurrentStep(3)
                    }}
                    className={cn(
                      "flex w-22 h-22 md:w-26 md:h-26 xl:w-32 xl:h-32 flex-col items-center justify-center gap-3 xl:gap-4 rounded-[10px] border border-[#D3D3D3] bg-white transition-colors hover:border-[#0D9488]/50  cursor-pointer",
                    )}
                  >
                    <Image
                      src="/right.svg"
                      alt=""
                      width={44}
                      height={44}
                      className="h-5 w-5 xl:h-6 xl:w-6 object-contain "
                      aria-hidden
                    />
                    <span className="text-sm xl:text-base font-semibold uppercase  text-[#4B5563]">YES</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, homeowner: "NO" }))}
                    className={cn(
                      "flex w-22 h-22 md:w-26 md:h-26 xl:w-32 xl:h-32 flex-col items-center justify-center gap-3 xl:gap-4 rounded-[10px] border bg-white transition-colors hover:border-[#0D9488]/50 cursor-pointer",
                      formData.homeowner === "NO"
                        ? "border-[#0D9488] bg-[#E3FFF0]"
                        : "border-[#D3D3D3]"
                    )}
                  >
                    <Image
                      src="/wrong.svg"
                      alt=""
                      width={44}
                      height={44}
                      className="h-5 w-5 xl:h-6 xl:w-6 object-contain "
                      aria-hidden
                    />
                    <span className="text-sm xl:text-base font-semibold uppercase  text-[#4B5563]">NO</span>
                  </button>
                </div>
                {formData.homeowner === "NO" ? (
                  <p className="mt-10  px-2 text-center text-xs md:text-sm font-medium text-[#EF4444] sm:mt-12 xl:text-base">
                    Sorry! You Must Be A Homeowner To Qualify For This Program.
                  </p>
                ) : null}
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex w-full flex-col items-center justify-center text-center">
                <h2
                  className={`font-inter mb-6 text-xl font-bold text-[#1F2937] md:mb-6 md:text-2xl xl:mb-10 xl:text-3xl`}
                >
                  Who is your electricity provider?
                </h2>
                <div className="mb-8 w-full md:max-w-[320px] xl:max-w-md space-y-3 md:mb-10 xl:mb-15 ">
                  <label className="flex cursor-pointer items-center gap-3 rounded-[6px] border border-[#D3D3D3] bg-white px-4 py-3.5 md:py-5 text-left transition-colors hover:border-[#D1D5DB] ">
                    <input
                      type="radio"
                      name="electricityProvider"
                      checked={formData.electricityProvider === PRIMARY_UTILITY_VALUE}
                      onChange={() =>
                        setFormData((prev) => ({ ...prev, electricityProvider: PRIMARY_UTILITY_VALUE }))
                      }
                      className="size-4 shrink-0 accent-[#374151] rounded-[6px] border border-[#D3D3D3] bg-white"
                    />
                    <span className="text-sm xl:text-lg font-medium text-[#374151]">{PRIMARY_UTILITY_LABEL}</span>
                  </label>
                  <div className="relative">
                    <select
                      aria-label="More electricity provider options"
                      value={
                        formData.electricityProvider !== PRIMARY_UTILITY_VALUE
                          ? formData.electricityProvider
                          : ""
                      }
                      onChange={(e) => {
                        const v = e.target.value
                        setFormData((prev) => ({ ...prev, electricityProvider: v }))
                      }}
                      className={cn(
                        "w-full appearance-none rounded-[6px] border border-[#8F8E93] bg-white py-3.5 md:py-5 pl-4 pr-10 text-left text-sm xl:text-lg outline-none transition-colors focus:border-[#0D9488]",
                        formData.electricityProvider === PRIMARY_UTILITY_VALUE ||
                          formData.electricityProvider === ""
                          ? "text-gray-500"
                          : "text-[#374151]"
                      )}
                    >
                      <option value="" disabled>
                        More Options
                      </option>
                      {MORE_UTILITY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#9CA3AF]"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex w-full flex-col items-center text-center">
                <h2 className="font-inter mb-6 text-xl font-bold text-[#1F2937] md:mb-6 md:text-2xl xl:mb-10 xl:text-3xl">
                  How much roof shade do you have?
                </h2>
                <div className="mb-8 flex w-full max-w-sm mx-auto md:max-w-[600px] lg:max-w-[700px] xl:max-w-[740px] flex-col items-center justify-center gap-4 lg:gap-5 xl:gap-5 md:flex-row md:justify-center md:gap-5">
                  {ROOF_SHADE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, roofShade: opt.value }))
                        setCurrentStep(5)
                      }}
                      className="flex h-35 w-40 xl:w-58 xl:h-38 flex-col items-center justify-center gap-3 rounded-[10px] border border-[#D3D3D3] bg-white p-4 shadow-sm transition hover:border-sky-400 hover:shadow-md"
                    >
                      <div className="flex h-28 xl:h-32 w-full items-center justify-center ">
                        <Image
                          src={opt.image}
                          alt={opt.label}
                          width={140}
                          height={112}
                          className="h-15 xl:h-18 w-full object-contain"
                        />
                      </div>
                      <span className="text-sm xl:text-base font-medium text-[#4B5563]">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="flex w-full flex-col items-center text-center">
                <h2 className="font-inter mb-3 text-xl font-bold text-[#1F2937]  md:text-2xl  xl:text-3xl">
                  What&apos;s your property address?
                </h2>
                <p className="mb-8  text-sm font-medium text-[#0F766E]  xl:text-base">
                  For verification only. We do not mail.
                </p>
                <div className="w-full md:max-w-xs xl:max-w-sm space-y-4 text-left  mb-10">
                  <TextInput
                    id="propertyAddress"
                    label={
                      <>
                        Address <span className="text-[#FB2C36]">*</span>
                      </>
                    }
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="123 Main street"
                    labelClassName="text-sm xl:text-base font-medium text-[#4B5563]"
                    className="h-12 xl:h-13 mt-1.5 pl-4 rounded-[6px] border border-[#D3D3D3] bg-white text-sm xl:text-base font-normal placeholder:text-[#8F8E93] placeholder:text-[0.8rem] xl:placeholder:text-[0.9rem] focus:border-[#8F8E93]"
                  />
                  <TextInput
                    id="propertyCity"
                    label={
                      <>
                        City <span className="text-[#FB2C36]">*</span>
                      </>
                    }
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="New York"
                    labelClassName="text-sm xl:text-base font-medium text-[#4B5563]"
                    className="h-12 xl:h-13 mt-1.5 pl-4 rounded-[6px] border border-[#D3D3D3] bg-white text-sm xl:text-base font-normal placeholder:text-[#8F8E93] placeholder:text-[0.8rem] xl:placeholder:text-[0.9rem] focus:border-[#8F8E93]"
                  />
                  <div className="space-y-1.5">
                    <label htmlFor="propertyState" className="text-sm xl:text-base font-medium text-[#4B5563]">
                      State <span className="text-[#FB2C36]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="propertyState"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className={cn(
                          "h-12 xl:h-13 mt-1.5 w-full appearance-none rounded-[6px] border border-[#D3D3D3] bg-white py-2 pl-4 pr-10 text-left text-sm xl:text-base outline-none transition-colors placeholder:text-[#8F8E93] placeholder:text-[0.8rem] xl:placeholder:text-[0.9rem] focus:border-[#8F8E93]",
                          formData.state === "" ? "text-gray-500" : "text-[#374151]"
                        )}
                      >
                        <option value="" disabled>
                          Choose a state...
                        </option>
                        {US_STATES.map((abbr) => (
                          <option key={abbr} value={abbr}>
                            {abbr}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#9CA3AF]"
                        aria-hidden
                      />
                    </div>
                  </div>
                  <ZipCodeInput
                    id="propertyZip"
                    label={
                      <>
                        Zip <span className="text-[#FB2C36]">*</span>
                      </>
                    }
                    value={formData.zipCode}
                    onChange={(v) => handleInputChange("zipCode", v)}
                    placeholder="90001"
                    labelClassName="text-sm xl:text-base font-medium text-[#4B5563]"
                    className="h-12 xl:h-13 mt-1.5 pl-4 rounded-[6px] border border-[#D3D3D3] bg-white text-sm xl:text-base font-normal placeholder:text-[#8F8E93] placeholder:text-[0.8rem] xl:placeholder:text-[0.9rem] focus:border-[#8F8E93]"
                  />
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="flex w-full flex-col items-center text-center">
                <h2 className="font-inter mb-3 text-xl font-bold text-[#1F2937] md:text-2xl xl:text-3xl">
                  What&apos;s your name?
                </h2>
                <p className="mb-8 xl:mb-9 text-sm font-medium text-[#0F766E] xl:text-base">
                  Personal Information Is Safe &amp; Secure.
                </p>
                <div className="w-full md:max-w-xs xl:max-w-sm space-y-4 text-left mb-10 xl:mb-13">
                  <TextInput
                    id="step6FirstName"
                    label={
                      <>
                        First Name <span className="text-[#FB2C36]">*</span>
                      </>
                    }
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                    labelClassName="text-sm xl:text-base font-medium text-[#4B5563]"
                    className="h-12 xl:h-13 mt-1.5 pl-4 rounded-[6px] border border-[#D3D3D3] bg-white text-sm xl:text-base font-normal placeholder:text-[#8F8E93] placeholder:text-[0.8rem] xl:placeholder:text-[0.9rem] focus:border-[#8F8E93]"
                  />
                  <TextInput
                    id="step6LastName"
                    label={
                      <>
                        Last Name <span className="text-[#FB2C36]">*</span>
                      </>
                    }
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                    labelClassName="text-sm xl:text-base font-medium text-[#4B5563]"
                    className="h-12 xl:h-13 mt-1.5 pl-4 rounded-[6px] border border-[#D3D3D3] bg-white text-sm xl:text-base font-normal placeholder:text-[#8F8E93] placeholder:text-[0.8rem] xl:placeholder:text-[0.9rem] focus:border-[#8F8E93]"
                  />
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="flex w-full flex-col items-center">
              <h2 className="mb-3 text-center font-inter text-xl font-bold text-[#1F2937] md:mb-4 md:text-2xl xl:text-3xl">
                What&apos;s your email?
              </h2>
              <p className="mb-8 text-sm font-medium text-[#0F766E] xl:text-base">
              We take privacy seriously. No spam!
              </p>
              <div className="mb-8 w-full md:max-w-xs xl:max-w-sm text-left">
                <TextInput
                  id="email"
                  label={
                    <>
                      Email <span className="text-[#FB2C36]">*</span>
                    </>
                  }
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@gmail.com"
                  labelClassName="text-sm xl:text-base font-medium text-[#4B5563]"
                  className="h-12 xl:h-13 mt-1.5 pl-4 rounded-[6px] border border-[#D3D3D3] bg-white text-sm xl:text-base font-normal placeholder:text-[#8F8E93] placeholder:text-[0.8rem] xl:placeholder:text-[0.9rem] focus:border-[#8F8E93]"
                />
              </div>
            </div>
            )}

            {currentStep === 8 && (
              <div className="flex w-full flex-col items-center text-center">
                <p className="mb-3 xl:mb-8 xl:mt-8 max-w-lg text-sm xl:text-base font-medium text-[#4B5563] ">
                  You&apos;ve Been Matched With Top Providers To Get Quotes!
                </p>
                <h2 className="font-inter mb-8 text-xl font-bold text-[#1F2937] md:mb-8 md:text-2xl xl:text-3xl">
                  Complete This Final Step To See Results
                </h2>
                <div className="mb-8 md:mb-10 xl:mb-12 w-full md:max-w-xs xl:max-w-sm text-left">
                  <PhoneNumberInput
                    id="phoneNumber"
                    label={
                      <>
                        Phone <span className="text-[#FB2C36]">*</span>
                      </>
                    }
                    value={formData.phoneNumber}
                    onChange={(v) => handleInputChange("phoneNumber", v)}
                    placeholder="(555) 555-5555"
                    labelClassName="text-sm xl:text-base font-medium text-[#4B5563]"
                    className="h-12 xl:h-13 mt-1.5 pl-4 rounded-[6px] border border-[#D3D3D3] bg-white text-sm xl:text-base font-normal placeholder:text-[#8F8E93] focus:border-[#8F8E93]"
                  />
                </div>
              </div>
            )}

            {currentStep !== 2 && currentStep !== 4 && (
            <div className="mx-auto flex w-full max-w-2xl justify-center gap-4 md:max-w-[200px] xl:max-w-[250px]">
              
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className={`${
                  currentStep > 1 && currentStep !== 2 && currentStep !== 3 && currentStep !== 5 && currentStep !== 6 && currentStep !== 8
                    ? "flex-1"
                    : "w-full"
                } flex items-center justify-center gap-2 rounded-[6px] py-3 font-semibold text-base text-white transition-all duration-300 md:py-3.5 xl:py-4.5 xl:text-lg ${
                  !isStepValid() && !isSubmitting
                    ? "cursor-not-allowed bg-[#FF7A00] shadow-md"
                    : "cursor-pointer bg-[#FF7A00] shadow-lg hover:scale-[1.02] hover:bg-[#e56d00] hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : currentStep === TOTAL_STEPS ? (
                  "View Results"
                ) : (
                  "Continue"
                )}
              </button>
            </div>
            )}

            {currentStep === TOTAL_STEPS && (
              <div className="mx-auto mt-10 xl:mt-12 w-full md:max-w-lg xl:max-w-xl rounded-[10px] font-normal border border-gray-200 bg-[#F0F2F5] p-4 ">
                <p className="text-left font-normal text-xs  text-[#1F2937 leading-relaxed">
                By clicking the button above, I am providing my electronic signature in which I authorize Solarifii and up to four{" "}
                  <a
                    href="/partners"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#246A99] underline cursor-pointer"
                  >
                    home services or solar companies
                  </a>
                  {" "}
                  to email and/or call me, and send me pre-recorded messages and text messages at the number I’ve entered above, using an autodialer, with offers about their solar products or services, even if my phone number is on any national, or state or corporate "Do- Not -Call" list. Message and data rates may apply. Your consent is not a condition of purchase. You may revoke your consent at any time. You also agree to our{" "}
                  <a href="/terms-of-use" className="text-[#246A99] underline" target="_blank" rel="noopener noreferrer">
                    terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-[#246A99] underline" target="_blank" rel="noopener noreferrer">
                    privacy policy
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </form>
      </div>

     
    </div>
  )
}

export default function FormPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white font-inter">
          <div className="text-sky-600 text-lg md:text-xl font-semibold">Loading...</div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  )
}
