"use client"

import { Suspense, useEffect, useState, type FormEvent, type KeyboardEvent } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { Button } from "@workspace/ui/components/button"
import { TrustedForm, getCookie, setCookie } from "@workspace/lp-core"
// import { AddressAutocomplete } from "./AddressAutocomplete"

import { trackArohaa } from "@/lib/arohaa"

const TOTAL_STEPS = 4
const PROGRESS_ACTIVE = "#336AC7"
const PROGRESS_INACTIVE = "#E7EEF6"
const ZIP_COOKIE_NAME = "zipCode"
const ZIP_COOKIE_DAYS = 30
const ANALYTICS_FLUSH_DELAY_MS = 300
const AROHAA_SUBMITTED_KEY = "arohaa_medisavingz_submitted"

const FORM_FEATURES = [
  { icon: "/form-1.svg", label: "Energy Efficient" },
  { icon: "/form-2.svg", label: "5-Star Reviews" },
  { icon: "/form-3.svg", label: "Lifetime Warranty" },
] as const

function stepNameFor(step: number): string {
  if (step === 1) return "Where is your project?"
  if (step === 2) return "Who are we speaking with?"
  if (step === 3) return "What is your home address?"
  return "Let us know how we can reach you"
}

const defaultFormData = {
  street_address: "",
  city: "",
  state: "",
  medicareParts: "" as string,
  date_of_birth: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  zipCode: "",
}

const PAGE_TITLE =
  "text-center font-sans text-[1.4rem] font-bold text-[#0E2651] md:text-[1.6rem] lg:text-[1.7rem] xl:text-[2.1rem]"

const FORM_TITLE =
  "text-center font-sans text-[1rem] font-semibold text-[#000000] md:text-[1.1rem]  xl:text-[1.4rem]"

const INPUT_FIELD =
  "h-13.5 w-full min-w-0 rounded-[5px] border border-[#0E2651] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] placeholder:text-[0.8rem] shadow-none outline-none transition-[color,box-shadow] focus-visible:border-[#2B75FB] focus-visible:ring-[3px] focus-visible:ring-[#2B75FB]/20 xl:h-16 xl:text-base xl:placeholder:text-base"

const PRIMARY_BTN =
  "min-w-0 flex-1 basis-0 cursor-pointer rounded-[10px] bg-[#2B75FB] px-5 h-13.5 xl:h-16 text-[0.9rem] font-semibold uppercase text-white transition-all duration-300 hover:bg-[#2B75FB] disabled:cursor-not-allowed disabled:opacity-60 xl:text-lg shadow-[0_0_10px_0_rgba(31,58,95,0.10)]"

const BACK_BTN =
  "min-w-0 flex-1 basis-0 cursor-pointer rounded-[10px] bg-[#8B8F94] px-5 h-13.5 xl:h-16 text-[0.9rem] font-semibold uppercase text-white shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#8B8F94] xl:text-lg"

type FormNextButtonProps = {
  isFirstStep?: boolean
  isLastStep?: boolean
  isLoading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

function FormNextButton({
  isFirstStep = false,
  isLastStep = false,
  isLoading = false,
  disabled = false,
  onClick,
  className,
}: FormNextButtonProps) {
  const label = isLoading
    ? "Submitting..."
    : isFirstStep
      ? "START FREE QUOTE"
      : isLastStep
        ? "GET STARTED NOW"
        : "NEXT"

  return (
    <Button
      type="1"
      variant="default"
      htmlType={isLastStep ? "submit" : "button"}
      onClick={isLastStep ? undefined : onClick}
      disabled={disabled || isLoading}
      className={`${PRIMARY_BTN}${className ? ` ${className}` : ""}`}
    >
      {label}
    </Button>
  )
}

function FormBackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="1"
      variant="default"
      htmlType="button"
      onClick={onClick}
      className={BACK_BTN}
    >
      BACK
    </Button>
  )
}

function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5)
}

type FormPageProps = {
  initialZip?: string
}

function FormPage({ initialZip = "" }: FormPageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(() => ({
    ...defaultFormData,
    zipCode: normalizeZip(initialZip || getCookie("zipCode") || ""),
  }))
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({})

  useEffect(() => {
    trackArohaa("form_start")
  }, [])

  useEffect(() => {
    trackArohaa("form_step_view", {
      step: currentStep,
      step_name: stepNameFor(currentStep),
    })
  }, [currentStep])

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceSelect = (details: {
    address: string
    city: string
    state: string
    zipCode: string
  }) => {
    const zip = normalizeZip(details.zipCode)
    setFormData((prev) => ({
      ...prev,
      street_address: details.address,
      city: details.city,
      state: details.state,
      zipCode: zip || prev.zipCode,
    }))
    if (zip.length === 5) {
      setCookie(ZIP_COOKIE_NAME, zip, ZIP_COOKIE_DAYS)
    }
  }

  const isStepValid = () => {
    if (currentStep === 1) return /^\d{5}$/.test(normalizeZip(formData.zipCode))
    if (currentStep === 2) {
      return formData.first_name.trim() !== "" && formData.last_name.trim() !== ""
    }
    if (currentStep === 3) return formData.street_address.trim() !== ""
    if (currentStep === 4) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return (
        formData.first_name.trim() !== "" &&
        formData.last_name.trim() !== "" &&
        formData.email.trim() !== "" &&
        emailRegex.test(formData.email.trim()) &&
        formData.phone_number.trim() !== ""
      )
    }
    return false
  }

  const handleNext = () => {
    if (!isStepValid() || currentStep >= TOTAL_STEPS) return
    if (currentStep === 1) {
      setCookie(ZIP_COOKIE_NAME, normalizeZip(formData.zipCode), ZIP_COOKIE_DAYS)
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (currentStep <= 1) return
    setCurrentStep((prev) => prev - 1)
  }

  const handleFormKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return
    const tag = (e.target as HTMLElement).tagName
    if (tag === "TEXTAREA" || tag === "BUTTON") return

    if (currentStep === TOTAL_STEPS) {
      if (!isStepValid()) e.preventDefault()
      return
    }

    e.preventDefault()
    if (isStepValid()) handleNext()
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      if (isStepValid()) handleNext()
      return
    }

    setSubmitError("")
    setFieldErrors({})

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const email = formData.email.trim()
    const zip = normalizeZip(formData.zipCode)

    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.street_address.trim() ||
      !email ||
      !emailRegex.test(email) ||
      !formData.phone_number.trim()
    ) {
      setSubmitStatus("error")
      setSubmitError("Please complete all required fields with valid details.")
      return
    }

    setSubmitStatus("loading")

    const form = e.currentTarget
    const certInput = form.elements.namedItem("xxTrustedFormCertUrl") as HTMLInputElement | null
    const tokenInput = form.elements.namedItem("xxTrustedFormToken") as HTMLInputElement | null

    const payload = {
      firstName: formData.first_name.trim(),
      lastName: formData.last_name.trim(),
      email,
      phoneNumber: formData.phone_number.trim(),
      address: formData.street_address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      zipCode: zip,
      medicareParts: formData.medicareParts,
      dateOfBirth: formData.date_of_birth,
      // dateOfBirth: formData.date_of_birth
      //   ? isoToDisplay(formData.date_of_birth)
      //   : "",
      subid1: getCookie("subid1") ?? "",
      subid2: getCookie("subid2") ?? "",
      subid3: getCookie("subid3") ?? "",
      xxTrustedFormCertUrl: certInput?.value ?? "",
      xxTrustedFormToken: tokenInput?.value ?? "",
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as {
        error?: string
        success?: boolean
        redirectUrl?: string
        field?: string
      }

      if (!res.ok) {
        const errorMsg = typeof data.error === "string" ? data.error : "Submission failed"
        if (data.field === "email") {
          setFieldErrors({ email: errorMsg })
          setSubmitStatus("error")
          setSubmitError(errorMsg)
        } else if (data.field === "phoneNumber") {
          setFieldErrors({ phone: errorMsg })
          setSubmitStatus("error")
          setSubmitError(errorMsg)
        } else {
          setSubmitStatus("error")
          setSubmitError(errorMsg)
        }
        return
      }

      if (data.success && typeof data.redirectUrl === "string") {
        trackArohaa("form_submit")
        try {
          sessionStorage.setItem(AROHAA_SUBMITTED_KEY, "1")
        } catch {
          /* ignore */
        }
        window.setTimeout(() => {
          window.location.href = data.redirectUrl as string
        }, ANALYTICS_FLUSH_DELAY_MS)
        return
      }

      setSubmitStatus("idle")
    } catch {
      setSubmitStatus("error")
      setSubmitError("Something went wrong. Please try again.")
    }
  }

  const stepTitle =
    currentStep === 1
      ? "Where is your project?"
      : currentStep === 2
        ? "Who are we speaking with?"
        : currentStep === 3
          ? "What is your home address?"
          : "Let us know how we can reach you"

  return (
    <section className="flex w-full flex-1 flex-col border-t border-[#E5E7EB] bg-white px-6 py-10 md:px-8 md:py-14 lg:px-14 lg:py-15 xl:px-20 xl:py-20">
      <div className="container mx-auto flex w-full max-w-[900px] flex-1 flex-col items-center">
        <form
          onSubmit={handleLeadSubmit}
          onKeyDown={handleFormKeyDown}
          noValidate
          className="mx-auto flex w-full flex-1 flex-col items-center gap-7 md:gap-8 lg:gap-9.5 xl:gap-10.5"
        >
          <TrustedForm />

          <h1 className={PAGE_TITLE} style={{ lineHeight: 1.25 }}>
            Get a Free Window Replacement Quote
          </h1>

          <ProgressBar
            type="9"
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            foregroundColor={PROGRESS_ACTIVE}
            backgroundColor={PROGRESS_INACTIVE}
            className="w-full max-w-[420px] md:max-w-[480px] xl:max-w-[560px]"
          />

          <h2 className={FORM_TITLE} style={{ lineHeight: 1.3 }}>
            {stepTitle}
          </h2>

          {currentStep === 1 ? (
            <div
              className="flex w-full flex-col items-center gap-4.5 md:gap-5 xl:gap-6 max-w-[420px] md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]"
              data-arohaa-step="1"
              data-arohaa-step-name="Where is your project?"
            >
              <ZipCodeInput
                id="form-zipcode"
                name="zip"
                data-arohaa-zip
                value={formData.zipCode}
                onChange={(value) => handleInputChange("zipCode", normalizeZip(value))}
                placeholder="Zip Code"
                inputClassName={INPUT_FIELD}
                containerClassName="w-full"
              />
              <div className="flex w-full gap-3">
                <FormNextButton
                  isFirstStep
                  onClick={handleNext}
                  disabled={!isStepValid()}
                />
              </div>
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div
              className="flex w-full max-w-[420px] flex-col items-center gap-4.5 md:max-w-[420px] md:gap-5 xl:gap-6 lg:max-w-[450px] xl:max-w-[520px]"
              data-arohaa-step="2"
              data-arohaa-step-name="Who are we speaking with?"
            >

              <div className="flex w-full max-w-[420px] flex-col gap-3 md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
                <TextInput
                  id="firstName"
                  name="firstName"
                  data-arohaa-field="firstName"
                  containerClassName="w-full"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  placeholder="First Name"
                  className={INPUT_FIELD}
                />
                <TextInput
                  id="lastName"
                  name="lastName"
                  data-arohaa-field="lastName"
                  containerClassName="w-full"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  placeholder="Last Name"
                  className={INPUT_FIELD}
                />
              </div>
              <div className="flex w-full min-w-0 gap-2.5 xl:gap-3 md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
                <FormBackButton onClick={handleBack} />
                <FormNextButton onClick={handleNext} disabled={!isStepValid()} />
              </div>
            </div>

          ) : null}

          {currentStep === 3 ? (
            <div
              className="flex w-full flex-col items-center gap-4 md:gap-5 max-w-[420px]  md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]"
              data-arohaa-step="3"
              data-arohaa-step-name="What is your home address?"
            >

              {/* <AddressAutocomplete
                id="streetAddress"
                value={formData.street_address}
                // city={formData.city}
                // state={formData.state}
                // zipCode={formData.zipCode}
                onChange={(value) => handleInputChange("street_address", value)}
                onPlaceSelect={handlePlaceSelect}
                placeholder="Enter Your Street Address"
                className={INPUT_FIELD}
                // dataArohaaField="streetAddress"
              /> */}
              <TextInput
                id="streetAddress"
                name="streetAddress"
                data-arohaa-field="streetAddress"
                containerClassName="w-full"
                value={formData.street_address}
                onChange={(e) => handleInputChange("street_address", e.target.value)}
                placeholder="Street Address"
                className={INPUT_FIELD}
              />

              
              <div className="flex w-full min-w-0 gap-3 md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
                <FormBackButton onClick={handleBack} />
                <FormNextButton onClick={handleNext} disabled={!isStepValid()} />
              </div>
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div
              className="flex w-full max-w-[720px] flex-col items-center gap-4.5 md:gap-5 xl:gap-6"
              data-arohaa-step="4"
              data-arohaa-step-name="Contact Information"
            >
              <div className="flex w-full max-w-[420px] flex-col gap-3 md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
                
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  data-arohaa-field="email"
                  containerClassName="w-full"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange("email", e.target.value)
                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }))
                  }}
                  placeholder="Email Address"
                  className={`${INPUT_FIELD} ${fieldErrors.email ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25" : ""}`}
                />
                {fieldErrors.email ? (
                  <p className="text-xs text-red-600" role="alert">
                    {fieldErrors.email}
                  </p>
                ) : null}
                <PhoneNumberInput
                  id="phoneNumber"
                  name="phoneNumber"
                  data-arohaa-field="phoneNumber"
                  containerClassName="w-full"
                  value={formData.phone_number}
                  onChange={(value) => {
                    handleInputChange("phone_number", value)
                    if (fieldErrors.phone) setFieldErrors((p) => ({ ...p, phone: undefined }))
                  }}
                  placeholder="Phone Number"
                  className={`${INPUT_FIELD} ${fieldErrors.phone ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25" : ""}`}
                />
                {fieldErrors.phone ? (
                  <p className="text-xs text-red-600" role="alert">
                    {fieldErrors.phone}
                  </p>
                ) : null}
              </div>

              {submitStatus === "error" && submitError ? (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="flex w-full max-w-[420px] flex-col items-center gap-4.5 md:gap-5.5 xl:gap-6.5 md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
                <div className="flex w-full min-w-0 gap-3 md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
                  <FormBackButton onClick={handleBack} />
                  <FormNextButton
                    isLastStep
                    isLoading={submitStatus === "loading"}
                    disabled={!isStepValid()}
                  />
                </div>
                <div className="text-left text-[0.69rem] leading-relaxed text-[#333333] md:text-[0.79rem] space-y-4">
                  <p>
                    *By clicking GET STARTED NOW above, I provide my electronic signature and expressly consent to receive recurring informational and marketing calls and texts via automated telephone dialing system, artificial/prerecorded voice, SMS/MMS, and/or AI technology regarding window projects from Windowfii. Message and data rates may apply. I understand consent is not required for purchase and that I can opt-out at any time, including (for texts) by replying “STOP.”
                  </p>
                  <p>
                    By submitting this form, I also agree to receive emails about products, services, and sales, as well as third-party offers including, without limitation, from our affiliates and/or unrelated third parties.
                  </p>
                </div>
           
              </div>

              
            </div>
          ) : null}

          <div className="mt-2 flex w-full max-w-[560px] md:max-w-[420px]  xl:max-w-[540px] items-start justify-between gap-3 px-1 md:mt-6 xl:mt-10 md:gap-6  xl:gap-10">
            {FORM_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="flex flex-1 flex-col items-center gap-3 text-center xl:gap-4.5"
              >
                <Image
                  src={feature.icon}
                  alt={feature.label}
                  width={50}
                  height={50}
                  className="size-8 object-contain md:size-9 xl:size-12"
                />
                <span className="text-[0.7rem] font-semibold leading-tight text-[#333333] md:text-xs xl:text-base">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </form>
      </div>
    </section>
  )
}

type FormProps = {
  initialZip?: string
}

export default function Form({ initialZip }: FormProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-base font-semibold text-[#2F6FED] md:text-lg">Loading...</div>
        </div>
      }
    >
      <FormPage initialZip={initialZip} />
    </Suspense>
  )
}
