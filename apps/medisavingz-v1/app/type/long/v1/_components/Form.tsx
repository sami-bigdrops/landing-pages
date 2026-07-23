"use client"

import { Suspense, useState, type FormEvent, type KeyboardEvent } from "react"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { Button } from "@workspace/ui/components/button"
import { TrustedForm, getCookie, setCookie } from "@workspace/lp-core"
import { AddressAutocomplete } from "./AddressAutocomplete"
import { BirthdateInput } from "./BirthdateInput"
import { isoToDisplay } from "@/lib/dob-format"

const TOTAL_STEPS = 4
const PROGRESS_TEAL = "#09A1A6"
const ZIP_COOKIE_NAME = "zipCode"
const ZIP_COOKIE_DAYS = 30

const MEDICARE_PARTS_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "not_sure", label: "Not Sure" },
] as const

type MedicarePartsId = (typeof MEDICARE_PARTS_OPTIONS)[number]["id"] | ""

const defaultFormData = {
  street_address: "",
  city: "",
  state: "",
  medicareParts: "" as MedicarePartsId,
  date_of_birth: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  zipCode: "",
}

const FORM_TITLE =
  "text-center font-sans text-[1.25rem] font-bold text-[#17212B] md:text-[1.4rem] lg:text-[1.5rem] xl:text-[1.8rem]"

const INPUT_FIELD =
  "h-13.5 w-full min-w-0 rounded-[5px] border border-[#102E50] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] placeholder:text-[0.8rem] shadow-none outline-none transition-[color,box-shadow] focus-visible:border-[#2F6FED] focus-visible:ring-[3px] focus-visible:ring-[#2F6FED]/20 xl:h-16 xl:text-base xl:placeholder:text-base"

const CHOICE_BTN =
  "w-full flex h-14 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#2F6FED] bg-white px-5 py-0 font-sans text-sm font-semibold text-[#17212B] transition-all duration-300 hover:bg-[#F3F6FE] disabled:cursor-not-allowed disabled:opacity-90 md:h-14 xl:h-17 xl:text-lg"

const PRIMARY_BTN =
  "w-full cursor-pointer rounded-[10px] bg-[#2F6FED] px-5 h-14 xl:h-16 text-[0.95rem] font-semibold text-white transition-all duration-300 hover:bg-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-60 xl:text-lg"

type FormNextButtonProps = {
  isLastStep?: boolean
  isLoading?: boolean
  disabled?: boolean
  onClick?: () => void
}

function FormNextButton({
  isLastStep = false,
  isLoading = false,
  disabled = false,
  onClick,
}: FormNextButtonProps) {
  const label = isLoading
    ? "Submitting..."
    : isLastStep
      ? "Agree, Review Plans"
      : "Next"

  return (
    <Button
      type="1"
      variant="default"
      htmlType={isLastStep ? "submit" : "button"}
      onClick={isLastStep ? undefined : onClick}
      disabled={disabled || isLoading}
      className={PRIMARY_BTN}
    >
      {label}
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
    if (currentStep === 1) return formData.medicareParts !== ""
    if (currentStep === 2) return formData.street_address.trim() !== ""
    if (currentStep === 3) return true
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
    setCurrentStep((prev) => prev + 1)
  }

  const handleMedicareSelect = (id: MedicarePartsId) => {
    setFormData((prev) => ({ ...prev, medicareParts: id }))
    setCurrentStep(2)
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
      dateOfBirth: formData.date_of_birth
        ? isoToDisplay(formData.date_of_birth)
        : "",
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
        window.location.href = data.redirectUrl
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
      ? "Do you have Medicare Parts A & B?"
      : currentStep === 2
        ? "What is your Street Address?"
        : currentStep === 3
          ? "What is your birthday?"
          : "Last Step!"

  return (
    <section className="flex w-full flex-1 flex-col border-t border-[#E5E7EB] bg-white px-6 py-10 md:px-8 md:py-14 lg:px-14 lg:py-16 xl:px-20 xl:py-22">
      <div className="container mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center">
        <form
          onSubmit={handleLeadSubmit}
          onKeyDown={handleFormKeyDown}
          noValidate
          className="mx-auto flex w-full flex-1 flex-col items-center gap-8 md:gap-9 lg:gap-10 xl:gap-12"
        >
          <TrustedForm />

          <h2 className={FORM_TITLE} style={{ lineHeight: 1.3 }}>
            {stepTitle}
          </h2>

          <ProgressBar
            type="9"
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            foregroundColor={PROGRESS_TEAL}
            className="w-full"
          />

          {currentStep === 1 ? (
            <div className="flex w-full flex-col items-center gap-3 md:gap-3.5 xl:gap-4  max-w-[420px]  md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
              {MEDICARE_PARTS_OPTIONS.map(({ id, label }) => {
                const selected = formData.medicareParts === id
                return (
                  <Button
                    key={id}
                    type="1"
                    variant="default"
                    htmlType="button"
                    onClick={() => handleMedicareSelect(id)}
                    aria-pressed={selected}
                    className={`${CHOICE_BTN} ${selected ? "bg-[#F3F6FE]" : ""}`}
                  >
                    {label}
                  </Button>
                )
              })}
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="flex w-full max-w-[420px] flex-col items-center gap-4 md:max-w-[420px] md:gap-5 lg:max-w-[450px] xl:max-w-[520px]">
              <AddressAutocomplete
                id="streetAddress"
                value={formData.street_address}
                city={formData.city}
                state={formData.state}
                zipCode={formData.zipCode}
                onChange={(value) => handleInputChange("street_address", value)}
                onPlaceSelect={handlePlaceSelect}
                placeholder="Enter Your Street Address"
                className={INPUT_FIELD}
              />
              <FormNextButton onClick={handleNext} disabled={!isStepValid()} />
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="flex w-full flex-col items-center gap-4 md:gap-5 max-w-[420px]  md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
              <div className="flex w-full flex-col items-center gap-2">
                <BirthdateInput
                  value={formData.date_of_birth}
                  onChange={(iso) => handleInputChange("date_of_birth", iso)}
                  className={INPUT_FIELD}
                />
                <p className="text-center text-xs text-[#6B7280]">
                  Optional for MA and Part D plans
                </p>
              </div>
              <FormNextButton onClick={handleNext} />
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="flex w-full max-w-[720px] flex-col items-center gap-4 md:gap-5">
              <div className="flex w-full max-w-[420px] flex-col gap-4 md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
                <TextInput
                  id="firstName"
                  containerClassName="w-full"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  placeholder="First Name"
                  className={INPUT_FIELD}
                />
                <TextInput
                  id="lastName"
                  containerClassName="w-full"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  placeholder="Last Name"
                  className={INPUT_FIELD}
                />
                <TextInput
                  id="email"
                  type="email"
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

              <div className="flex w-full max-w-[420px] flex-col items-center gap-4 md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
                <FormNextButton
                  isLastStep
                  isLoading={submitStatus === "loading"}
                  disabled={!isStepValid()}
                />
                <p className="text-center text-[0.7rem] leading-relaxed text-[#6B7280] md:text-xs">
                  By clicking &quot;Agree, Review Plans,&quot; you agree to the consents below
                  the button, including your consent to be contacted and your authorization
                  for the use and disclosure of your health information. No obligation to
                  enroll.
                </p>
              </div>

              <div className="w-full rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4 text-left text-[0.7rem] leading-relaxed text-[#4B5563] md:px-5 md:py-5 md:text-xs">
                <p className="mb-3 font-semibold text-[#17212B]">
                  We value and protect your privacy.
                </p>
                <p className="mb-3">
                  When you click &quot;Agree, Review Plans&quot; above, you agree to the
                  following: I provide my express written consent, via electronic
                  signature, to receive marketing communications, including calls, texts,
                  SMS, and emails related to Medicare Advantage Plans, Medicare Supplement
                  Insurance, Prescription Drug Plans, Final Expense policies, Financial
                  Planning, Identity Protection &amp; Cyber Security, Health &amp;
                  Wellness, Financial Services, Life Insurance, Pet Insurance, Travel
                  Insurance, Lifestyle &amp; Recreation, Food &amp; Grocery, Transportation
                  &amp; Auto, Aging in Place, Technology Support, Education &amp;
                  Navigation Services, and Caregiver Services and related products (like
                  Dental, Vision, Hearing, Cancer, Heart Attack, Stroke, Accident, and
                  Hospital Indemnity Coverage) from MediSavingz, its marketing partners,
                  and their licensed sales agents/representatives. I understand that calls,
                  texts (SMS/MMS), and emails may be sent by MediSavingz or its third-party
                  partners to the contact information I provide. These communications may
                  use automated technology (automatic telephone dialing system (ATDS),
                  prerecorded or artificial voice, recorded lines, interactive voice
                  response (IVR), and/or AI technology) and may be delivered even if my
                  number is on a Do Not Call registry and outside of regular business
                  hours. This telemarketing consent is valid for 90 days.
                </p>
                <p className="mb-3">
                  <span className="font-semibold text-[#17212B]">HIPAA Authorization:</span>{" "}
                  I authorize MediSavingz to use and share my contact and insurance-related
                  information to contact me about the additional products and services
                  listed above. I also authorize MediSavingz, its licensed agents,
                  affiliates, and listed partners to contact me, and I understand that these
                  third-party partners, insurance carriers, and service providers may
                  receive my information for this purpose, including to market non-Medicare
                  and non-health-related products or services that may interest me as
                  described{" "}
                  <a
                    href="/hippa-authorization"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#2F6FED] underline underline-offset-2"
                  >
                    here
                  </a>
                  . This HIPAA authorization is valid for 12 months unless I revoke it
                  earlier. I understand that this authorization does not affect my Medicare
                  eligibility, enrollment, or benefits, and that information disclosed may
                  no longer be protected by HIPAA if received by entities not subject to
                  HIPAA Rules.
                </p>
                <p>
                  Message and data rates may apply. This consent is voluntary and not
                  required for purchasing any product or service. Consent to be contacted by
                  MediSavingz and/or HIPAA authorization can be withdrawn at any time by
                  emailing{" "}
                  <a
                    href="mailto:contact@medisavingz.com"
                    className="font-semibold text-[#2F6FED] underline underline-offset-2"
                  >
                    contact@medisavingz.com
                  </a>
                  . I agree to conduct this transaction electronically and in compliance
                  with the E-Sign Act. I consent to and accept all terms outlined in the{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#2F6FED] underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                  ,{" "}
                  <a
                    href="/terms-of-use"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#2F6FED] underline underline-offset-2"
                  >
                    Terms of Service
                  </a>
                  , including its arbitration clause as well as the site visit recording by
                  TrustedForm.
                </p>
              </div>
            </div>
          ) : null}
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
