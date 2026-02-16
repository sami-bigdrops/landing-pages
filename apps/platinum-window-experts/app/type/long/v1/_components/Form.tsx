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

function FormPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState("")
  const [cityName, setCityName] = useState("")
  const [homeownerCount] = useState(() => Math.floor(Math.random() * 3) + 3)
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
      case 5: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return (
          formData.firstName?.trim() !== "" &&
          formData.lastName?.trim() !== "" &&
          formData.email !== "" &&
          emailRegex.test(formData.email)
        )
      }
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 px-4 pt-8 pb-8">
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
            <p className="text-sm md:text-base text-gray-700 font-semibold max-w-2xl mx-auto leading-snug">
              {homeownerCount} people from <span className="text-sky-600 font-bold">{cityName}</span> got their FREE quote in the last 5 minutes from{" "}
              <span className="text-sky-600 font-bold">Platinum Window Experts</span>
            </p>
          </div>
        )}
        <ProgressBar type="5" currentStep={currentStep} totalSteps={TOTAL_STEPS} className="mb-6" />
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
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
            <TrustedForm onCertUrlReady={handleTrustedFormReady} />

            {currentStep === 1 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e1e1e] tracking-tight leading-tight mb-8 md:mb-10">Are you a homeowner?</h2>
                <RadioButtonGroup
                  type="1"
                  name="homeowner"
                  label="Select an Option"
                  labelClassName="text-base font-semibold text-gray-800"
                  options={homeownerOptions}
                  value={formData.homeowner}
                  onChange={(value) => handleInputChange("homeowner", value, true)}
                  className="mb-8"
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e1e1e] tracking-tight leading-tight mb-8 md:mb-10">What is the nature of this project?</h2>
                <RadioButtonGroup
                  name="projectNature"
                  label="Select an Option"
                  labelClassName="text-base font-semibold text-gray-800"
                  options={projectNatureOptions}
                  value={formData.projectNature}
                  onChange={(value) => handleInputChange("projectNature", value, true)}
                  className="mb-8"
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e1e1e] tracking-tight leading-tight mb-8 md:mb-10">
                  {formData.projectNature === "home_window_replacement" ? "How many windows do you need to install?" : "How many windows do you need to repair?"}
                </h2>
                <RadioButtonGroup
                  name="windowCount"
                  label="Select an Option"
                  labelClassName="text-base font-semibold text-gray-800"
                  options={windowCountOptions}
                  value={formData.windowCount}
                  onChange={(value) => handleInputChange("windowCount", value, true)}
                  className="mb-8"
                />
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e1e1e] tracking-tight leading-tight mb-8 md:mb-10">When do you need this work done?</h2>
                <RadioButtonGroup
                  name="workDone"
                  label="Select an Option"
                  labelClassName="text-base font-semibold text-gray-800"
                  options={workDoneOptions}
                  value={formData.workDone}
                  onChange={(value) => handleInputChange("workDone", value, true)}
                  className="mb-8"
                />
              </>
            )}

            {currentStep === 5 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e1e1e] tracking-tight leading-tight mb-8 md:mb-10">Who should we prepare this FREE quote for?</h2>
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              </>
            )}

            {currentStep === 6 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e1e1e] tracking-tight leading-tight mb-8 md:mb-10">Address Information</h2>
                <div className="mb-8 space-y-6">
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
              </>
            )}

            {currentStep === 7 && (
              <>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e1e1e] tracking-tight leading-tight mb-8 md:mb-10">Phone Number</h2>
                <div className="mb-8">
                  <PhoneNumberInput
                    id="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(v) => handleInputChange("phoneNumber", v)}
                    labelClassName="text-base font-semibold text-gray-800"
                    className="h-12 text-base font-normal"
                  />
                </div>
              </>
            )}

            {currentStep >= 5 && (
              <div className="mb-6 flex items-center gap-3">
                <div className="relative">
                  <Image src="/lady.png" alt="Security" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-sky-500 rounded-full p-1 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                </div>
                <p className="text-base text-gray-700 font-semibold">Your Information is safe & secure</p>
              </div>
            )}

            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-4 rounded-xl font-semibold text-base md:text-lg border-2 border-gray-300 text-gray-800 hover:border-sky-600 hover:text-sky-600 transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className={`${currentStep > 1 ? "flex-1" : "w-full"} py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  !isStepValid() || isSubmitting ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-sky-600 text-white hover:bg-sky-700 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
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
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
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
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center">
          <div className="text-sky-600 text-lg md:text-xl font-semibold">Loading...</div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  )
}
