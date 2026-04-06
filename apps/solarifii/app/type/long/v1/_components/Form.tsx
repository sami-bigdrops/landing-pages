"use client"

import React, { useState, useEffect, useCallback, Suspense } from "react"
import { ArrowLeft, Loader2, Check, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Script from "next/script"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group"
import type { RadioOption } from "@workspace/ui/components/radio-button-group"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { TrustedForm, getCookie } from "@workspace/lp-core"
import { AddressAutocomplete } from "./AddressAutocomplete"
import PartnerModal from "./Partners-model"
import { fontPoppins } from "@/app/fonts"
import { cn } from "@workspace/ui/lib/utils"

const TOTAL_STEPS = 10

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

const projectNatureOptions: RadioOption[] = [
  { value: "home_window_replacement", label: "Install new window(s)" },
  { value: "home_window_repair", label: "Repair existing window(s)" },
]

const windowCountOptions: RadioOption[] = [
  { value: "Windows - New Windows - 1-2", label: "1 - 2 Windows" },
  { value: "Windows - New Windows - 3-5", label: "3 - 5 Windows" },
  { value: "Windows - New Windows - 6 +", label: "6+ Windows" },
]

const workDoneOptions: RadioOption[] = [
  { value: "immediately", label: "Immediately" },
  { value: "1_6_months", label: "1-6 Months" },
  { value: "not_sure", label: "Not Sure / Still Planning" },
]

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
  const [homeownerCount] = useState(() => Math.floor(Math.random() * 3) + 3)
  const [minutesText] = useState(() => {
    const options = [5, 10, 15, 20]
    return options[Math.floor(Math.random() * options.length)]
  })
  const [formData, setFormData] = useState(defaultFormData)
  const [powerBillIndex, setPowerBillIndex] = useState(3)
  const [googlePlacesReady, setGooglePlacesReady] = useState(false)
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false)

  const googlePlacesApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

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
        return formData.projectNature !== ""
      case 6:
        return formData.windowCount !== ""
      case 7:
        return formData.workDone !== ""
      case 8: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return (
          formData.firstName?.trim() !== "" &&
          formData.lastName?.trim() !== "" &&
          formData.email !== "" &&
          emailRegex.test(formData.email)
        )
      }
      case 9:
        return (
          formData.address.trim() !== "" &&
          formData.city.trim() !== "" &&
          formData.state.trim() !== "" &&
          formData.zipCode.length === 5
        )
      case 10:
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
    <div className="flex min-h-[400px] lg:min-h-[460px] xl:min-h-[580px] flex-col bg-[#F8FAFC">
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
      {googlePlacesApiKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${googlePlacesApiKey}&libraries=places`}
          strategy="lazyOnload"
          onLoad={() => setGooglePlacesReady(true)}
        />
      )}
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
                <h2 className="mb-8 text-xl font-bold leading-tight tracking-tight text-[#1e1e1e] md:mb-10 md:text-2xl lg:text-3xl">
                  What is the nature of this project?
                </h2>
                <RadioButtonGroup
                  name="projectNature"
                  label="Select an Option"
                  labelClassName="text-base font-semibold text-gray-800"
                  options={projectNatureOptions}
                  value={formData.projectNature}
                  onChange={(value) => handleInputChange("projectNature", value, true)}
                  className="mb-8 w-full max-w-lg"
                />
              </div>
            )}

            {currentStep === 6 && (
              <div className="flex w-full flex-col items-center text-center">
                <h2 className="mb-8 text-xl font-bold leading-tight tracking-tight text-[#1e1e1e] md:mb-10 md:text-2xl lg:text-3xl">
                  {formData.projectNature === "home_window_replacement" ? "How many windows do you need to install?" : "How many windows do you need to repair?"}
                </h2>
                <RadioButtonGroup
                  name="windowCount"
                  label="Select an Option"
                  labelClassName="text-base font-semibold text-gray-800"
                  options={windowCountOptions}
                  value={formData.windowCount}
                  onChange={(value) => handleInputChange("windowCount", value, true)}
                  className="mb-8 w-full max-w-lg"
                />
              </div>
            )}

            {currentStep === 7 && (
              <div className="flex w-full flex-col items-center text-center">
                <h2 className="mb-8 text-xl font-bold leading-tight tracking-tight text-[#1e1e1e] md:mb-10 md:text-2xl lg:text-3xl">
                  When do you need this work done?
                </h2>
                <RadioButtonGroup
                  name="workDone"
                  label="Select an Option"
                  labelClassName="text-base font-semibold text-gray-800"
                  options={workDoneOptions}
                  value={formData.workDone}
                  onChange={(value) => handleInputChange("workDone", value, true)}
                  className="mb-8 w-full max-w-lg"
                />
              </div>
            )}

            {currentStep === 8 && (
              <div className="flex w-full flex-col items-center">
                <h2 className="mb-8 text-center text-xl font-bold leading-tight tracking-tight text-[#1e1e1e] md:mb-10 md:text-2xl lg:text-3xl">
                  Who should we prepare this FREE quote for?
                </h2>
                <div className="mb-8 w-full max-w-2xl">
                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextInput
                      id="firstName"
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="John"
                      labelClassName="text-base font-semibold text-gray-800"
                      className="h-12 text-base font-normal"
                    />
                    <TextInput
                      id="lastName"
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Doe"
                      labelClassName="text-base font-semibold text-gray-800"
                      className="h-12 text-base font-normal"
                    />
                  </div>
                  <TextInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@email.com"
                    labelClassName="text-base font-semibold text-gray-800"
                    className="h-12 text-base font-normal"
                  />
                </div>
              </div>
            )}

            {currentStep === 9 && (
              <div className="flex w-full flex-col items-center">
                <h2 className="mb-8 text-center text-xl font-bold leading-tight tracking-tight text-[#1e1e1e] md:mb-10 md:text-2xl lg:text-3xl">
                  Address Information
                </h2>
                <div className="mb-8 w-full max-w-2xl space-y-6">
                  <AddressAutocomplete
                    id="address"
                    label="Address"
                    value={formData.address}
                    onChange={(v) => handleInputChange("address", v)}
                    onPlaceSelect={(details) => {
                      setFormData((prev) => ({
                        ...prev,
                        address: details.address,
                        city: details.city,
                        state: details.state,
                        zipCode: details.zipCode,
                      }))
                    }}
                    placeholder="Start typing your address..."
                    labelClassName="text-base font-semibold text-gray-800"
                    className="h-12 text-base font-normal"
                    googleReady={googlePlacesReady}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      id="city"
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                      labelClassName="text-base font-semibold text-gray-800"
                      className="h-12 text-base font-normal"
                    />
                    <TextInput
                      id="state"
                      label="State"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="State"
                      maxLength={2}
                      labelClassName="text-base font-semibold text-gray-800"
                      className="h-12 text-base font-normal"
                    />
                  </div>
                  <ZipCodeInput
                    id="zipCode"
                    label="Zip Code"
                    value={formData.zipCode}
                    onChange={(v) => handleInputChange("zipCode", v)}
                    placeholder="12345"
                    labelClassName="text-base font-semibold text-gray-800"
                    className="h-12 text-base font-normal"
                  />
                </div>
              </div>
            )}

            {currentStep === 10 && (
              <div className="flex w-full flex-col items-center">
                <h2 className="mb-8 text-center text-xl font-bold leading-tight tracking-tight text-[#1e1e1e] md:mb-10 md:text-2xl lg:text-3xl">
                  Phone Number
                </h2>
                <div className="mb-8 w-full max-w-2xl">
                  <PhoneNumberInput
                    id="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(v) => handleInputChange("phoneNumber", v)}
                    labelClassName="text-base font-semibold text-gray-800"
                    className="h-12 text-base font-normal"
                  />
                </div>
              </div>
            )}

            {currentStep >= 8 && (
              <div className="mb-6 flex w-full items-center justify-center gap-3">
                <div className="relative">
                  <Image src="/lady.png" alt="Security" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-sky-500 rounded-full p-1 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                </div>
                <p className="text-base text-gray-700 font-semibold">Your Information is safe & secure</p>
              </div>
            )}

            {currentStep !== 2 && currentStep !== 4 && (
            <div className="mx-auto flex w-full max-w-2xl justify-center gap-4 md:max-w-[200px] xl:max-w-[250px]">
              {currentStep > 1 && currentStep !== 3 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 rounded-[6px] border-2 border-gray-300 px-6 py-3 font-semibold text-base text-gray-800 transition-all duration-300 hover:border-sky-600 hover:text-sky-600 hover:shadow-lg md:py-4 md:text-lg"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className={`${
                  currentStep > 1 && currentStep !== 2 && currentStep !== 3 ? "flex-1" : "w-full"
                } flex items-center justify-center gap-2 rounded-[6px] py-3 font-semibold text-base transition-all duration-300 md:py-3.5 xl:py-4.5 xl:text-lg ${
                  !isStepValid() || isSubmitting
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : currentStep <= 2 || currentStep === 3
                      ? "cursor-pointer bg-[#FF7A00] text-white shadow-lg hover:scale-[1.02] hover:bg-[#e56d00] hover:shadow-xl"
                      : "cursor-pointer bg-sky-600 text-white shadow-lg hover:scale-105 hover:bg-sky-700 hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : currentStep === TOTAL_STEPS ? (
                  "Submit Details"
                ) : (
                  "Continue"
                )}
              </button>
            </div>
            )}

            {currentStep === TOTAL_STEPS && (
              <div className="mx-auto mt-6 w-full max-w-2xl rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  By submitting this form, I agree to the Platinum Window Experts{" "}
                  <a href="/terms-of-use" className="text-sky-600 hover:text-sky-700 underline" target="_blank" rel="noopener noreferrer">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-sky-600 hover:text-sky-700 underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                  . I authorize Platinum Window Experts and its{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsPartnerModalOpen(true)
                    }}
                    className="text-sky-600 hover:text-sky-700 underline cursor-pointer"
                  >
                    partners
                  </button>{" "}
                  to send me marketing text messages or phone calls at the number provided, including those made with an autodialer. Standard message and data rates may apply. Message frequency varies. Opt-out anytime by replying STOP or using the unsubscribe link.
                </p>
              </div>
            )}
          </div>
        </form>
      </div>

      <PartnerModal isOpen={isPartnerModalOpen} onClose={() => setIsPartnerModalOpen(false)} />
    </div>
  )
}

export default function FormPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-sky-600 text-lg md:text-xl font-semibold">Loading...</div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  )
}
