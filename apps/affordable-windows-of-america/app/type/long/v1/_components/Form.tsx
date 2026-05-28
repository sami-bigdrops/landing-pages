"use client"

import React, { useState, useEffect, useCallback, Suspense } from "react"
import { ArrowLeft, Loader2, Check } from "lucide-react"
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

const THEME_ORANGE = "rgb(249,115,22)"
const THEME_ORANGE_BG = "rgba(249,115,22,0.08)"

const TOTAL_STEPS = 7

const projectNatureOptions: RadioOption[] = [
  { value: "home_window_replacement", label: "Install new window(s)" },
  { value: "home_window_repair", label: "Repair existing window(s)" },
]

const homeownerOptions: RadioOption[] = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "No" },
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FormPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState("")
  const [cityName, setCityName] = useState("")
  const [showErrors, setShowErrors] = useState(false)
  const [homeownerCount] = useState(() => Math.floor(Math.random() * 3) + 3)
  const [minutesText] = useState(() => {
    const options = [5, 10, 15, 20]
    return options[Math.floor(Math.random() * options.length)]
  })
  const [formData, setFormData] = useState(defaultFormData)
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
        return formData.homeowner !== ""
      case 2:
        return formData.projectNature !== ""
      case 3:
        return formData.windowCount !== ""
      case 4:
        return formData.workDone !== ""
      case 5:
        return (
          formData.firstName?.trim() !== "" &&
          formData.lastName?.trim() !== "" &&
          formData.email !== "" &&
          emailRegex.test(formData.email)
        )
      case 6:
        return (
          formData.address.trim() !== "" &&
          formData.city.trim() !== "" &&
          formData.state.trim() !== "" &&
          formData.zipCode.length === 5
        )
      case 7:
        return formData.phoneNumber.replace(/\D/g, "").length === 10
      default:
        return false
    }
  }

  const handleNext = async () => {
    if (!isStepValid()) {
      setShowErrors(true)
      return
    }
    setShowErrors(false)
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

  const handleBack = () => {
    setShowErrors(false)
    setCurrentStep((p) => p - 1)
  }

  const radioWrapperStyle = {
    "--primary": THEME_ORANGE,
    "--primary-foreground": "#ffffff",
  } as React.CSSProperties

  return (
    <div className="min-h-screen bg-white px-4 pt-8 pb-8">
      {googlePlacesApiKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${googlePlacesApiKey}&libraries=places`}
          strategy="lazyOnload"
          onLoad={() => setGooglePlacesReady(true)}
        />
      )}
      <div className="w-full max-w-3xl mx-auto">
        {cityName && homeownerCount > 0 && (
          <div className="mb-5 text-center">
            <p className="text-sm md:text-base text-[#1A1A1A] font-semibold max-w-2xl mx-auto leading-snug">
              {homeownerCount} Customers from <span className="text-[#0F2A44] font-bold">{cityName}</span> got their FREE quote in the last {minutesText} minutes!
            </p>
          </div>
        )}
        <ProgressBar
          type="5"
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          className="mb-6"
          backgroundColor="#B8CFE8"
          foregroundColor={THEME_ORANGE}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (isStepValid() && !isSubmitting) handleNext()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isStepValid() && !isSubmitting) {
              e.preventDefault()
              handleNext()
            }
          }}
        >
          <div className="rounded-[10px] border border-[#E2E8F0] bg-white p-6 shadow-[0_0_10px_0_rgba(0,0,0,0.12)] md:p-8">
            <TrustedForm onCertUrlReady={handleTrustedFormReady} />

            {currentStep === 1 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-8 md:mb-10">Are you a homeowner?</h2>
                <div style={radioWrapperStyle}>
                  <RadioButtonGroup
                    type="1"
                    layout="row"
                    name="homeowner"
                    label="Select an Option"
                    labelClassName="text-base font-semibold text-[#1A1A1A]"
                    options={homeownerOptions}
                    value={formData.homeowner}
                    onChange={(value) => handleInputChange("homeowner", value, true)}
                    className="mb-8"
                    optionClassName="flex-row-reverse justify-between flex-1"
                    selectedOptionBackgroundColor={THEME_ORANGE_BG}
                    selectedOptionBorderColor={THEME_ORANGE}
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-8 md:mb-10">What is the nature of this project?</h2>
                <div style={radioWrapperStyle}>
                  <RadioButtonGroup
                    name="projectNature"
                    label="Select an Option"
                    labelClassName="text-base font-semibold text-[#1A1A1A]"
                    options={projectNatureOptions}
                    value={formData.projectNature}
                    onChange={(value) => handleInputChange("projectNature", value, true)}
                    className="mb-8"
                    optionClassName="flex-row-reverse justify-between"
                    selectedOptionBackgroundColor={THEME_ORANGE_BG}
                    selectedOptionBorderColor={THEME_ORANGE}
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-8 md:mb-10">
                  {formData.projectNature === "home_window_replacement" ? "How many windows do you need to install?" : "How many windows do you need to repair?"}
                </h2>
                <div style={radioWrapperStyle}>
                  <RadioButtonGroup
                    name="windowCount"
                    label="Select an Option"
                    labelClassName="text-base font-semibold text-[#1A1A1A]"
                    options={windowCountOptions}
                    value={formData.windowCount}
                    onChange={(value) => handleInputChange("windowCount", value, true)}
                    className="mb-8"
                    optionClassName="flex-row-reverse justify-between"
                    selectedOptionBackgroundColor={THEME_ORANGE_BG}
                    selectedOptionBorderColor={THEME_ORANGE}
                  />
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-8 md:mb-10">When do you need this work done?</h2>
                <div style={radioWrapperStyle}>
                  <RadioButtonGroup
                    name="workDone"
                    label="Select an Option"
                    labelClassName="text-base font-semibold text-[#1A1A1A]"
                    options={workDoneOptions}
                    value={formData.workDone}
                    onChange={(value) => handleInputChange("workDone", value, true)}
                    className="mb-8"
                    optionClassName="flex-row-reverse justify-between"
                    selectedOptionBackgroundColor={THEME_ORANGE_BG}
                    selectedOptionBorderColor={THEME_ORANGE}
                  />
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-8 md:mb-10">Who should we prepare this FREE quote for?</h2>
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <TextInput
                      id="firstName"
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="John"
                      labelClassName="text-base font-semibold text-[#1A1A1A]"
                      className="h-12 text-base font-normal"
                      error={showErrors && !formData.firstName?.trim() ? "First name is required" : undefined}
                    />
                    <TextInput
                      id="lastName"
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Doe"
                      labelClassName="text-base font-semibold text-[#1A1A1A]"
                      className="h-12 text-base font-normal"
                      error={showErrors && !formData.lastName?.trim() ? "Last name is required" : undefined}
                    />
                  </div>
                  <TextInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@email.com"
                    labelClassName="text-base font-semibold text-[#1A1A1A]"
                    className="h-12 text-base font-normal"
                    error={
                      showErrors
                        ? !formData.email
                          ? "Email address is required"
                          : !emailRegex.test(formData.email)
                          ? "Please enter a valid email address"
                          : undefined
                        : undefined
                    }
                  />
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-8 md:mb-10">Address Information</h2>
                <div className="mb-8 space-y-6">
                  <div>
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
                      labelClassName="text-base font-semibold text-[#1A1A1A]"
                      className="h-12 text-base font-normal"
                      googleReady={googlePlacesReady}
                    />
                    {showErrors && !formData.address.trim() && (
                      <p className="mt-1 text-sm text-destructive" role="alert">Address is required</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      id="city"
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                      labelClassName="text-base font-semibold text-[#1A1A1A]"
                      className="h-12 text-base font-normal"
                      error={showErrors && !formData.city.trim() ? "City is required" : undefined}
                    />
                    <TextInput
                      id="state"
                      label="State"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="State"
                      maxLength={2}
                      labelClassName="text-base font-semibold text-[#1A1A1A]"
                      className="h-12 text-base font-normal"
                      error={showErrors && !formData.state.trim() ? "State is required (2-letter code)" : undefined}
                    />
                  </div>
                  <ZipCodeInput
                    id="zipCode"
                    label="Zip Code"
                    value={formData.zipCode}
                    onChange={(v) => handleInputChange("zipCode", v)}
                    placeholder="12345"
                    labelClassName="text-base font-semibold text-[#1A1A1A]"
                    className="h-12 text-base font-normal"
                    error={showErrors && formData.zipCode.length !== 5 ? "Please enter a valid 5-digit zip code" : undefined}
                  />
                </div>
              </>
            )}

            {currentStep === 7 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-8 md:mb-10">Phone Number</h2>
                <div className="mb-8">
                  <PhoneNumberInput
                    id="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(v) => handleInputChange("phoneNumber", v)}
                    labelClassName="text-base font-semibold text-[#1A1A1A]"
                    className="h-12 text-base font-normal"
                    error={showErrors && formData.phoneNumber.replace(/\D/g, "").length !== 10 ? "Please enter a valid 10-digit phone number" : undefined}
                  />
                </div>
              </>
            )}

            {currentStep >= 5 && (
              <div className="mb-6 flex items-center gap-3">
                <div className="relative">
                  <Image src="/lady.png" alt="Security" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-[#0F2A44] p-1 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                </div>
                <p className="text-base font-semibold text-[#1A1A1A]">Your Information is safe & secure</p>
              </div>
            )}

            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 rounded-[10px] border-2 border-[#BBB] px-6 py-4 text-base font-semibold text-[#1A1A1A] transition-all duration-300 hover:border-[rgb(249,115,22)] hover:text-[rgb(249,115,22)] hover:shadow-[0_0_10px_0_rgba(0,0,0,0.1)] md:text-lg"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className={`${currentStep > 1 ? "flex-1" : "w-full"} flex cursor-pointer items-center justify-center gap-2 rounded-[6px] py-4 text-base font-semibold uppercase transition-all duration-300 shadow-[0_0_4px_0_rgba(0,0,0,0.25)] md:text-lg ${
                  isSubmitting
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-[rgb(249,115,22)] text-white hover:bg-[rgb(229,95,2)]"
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

            {currentStep === TOTAL_STEPS && (
              <div className="mt-6 rounded-[10px] border border-[#BBB] bg-[#F8F9FB] p-4">
                <p className="text-xs font-medium leading-relaxed text-[#1A1A1A]">
                  By submitting this form, I agree to the Affordable Windows of America{" "}
                  <a href="/terms-of-use" className="text-[#0F2A44] underline hover:text-[rgb(249,115,22)]" target="_blank" rel="noopener noreferrer">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-[#0F2A44] underline hover:text-[rgb(249,115,22)]" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                  . I authorize Affordable Windows of America and its{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsPartnerModalOpen(true)
                    }}
                    className="cursor-pointer text-[#0F2A44] underline hover:text-[rgb(249,115,22)]"
                  >
                    partners
                  </button>{" "}
                  to send me marketing text messages or phone calls at the number provided, including those made with an autodialer. Standard message and data rates may apply. Message frequency varies. Opt-out anytime by replying STOP or using the unsubscribe link.
                </p>
              </div>
            )}
          </div>
        </form>
        <div className="w-full max-w-3xl mx-auto mt-8 flex justify-center">
          <Image src="/warranty.webp" alt="Warranty" width={800} height={400} className="w-60 h-auto rounded-lg" />
        </div>
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
          <div className="text-lg font-semibold text-[#0F2A44] md:text-xl">Loading...</div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  )
}
