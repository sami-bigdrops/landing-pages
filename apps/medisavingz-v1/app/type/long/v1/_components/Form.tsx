"use client"

import { Suspense, useState, type FormEvent, type KeyboardEvent } from "react"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { Button } from "@workspace/ui/components/button"
import { TrustedForm, getCookie } from "@workspace/lp-core"

const TOTAL_STEPS = 4
const PROGRESS_TEAL = "#09A1A6"

const MEDICARE_PARTS_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "not_sure", label: "Not Sure" },
] as const

type MedicarePartsId = (typeof MEDICARE_PARTS_OPTIONS)[number]["id"] | ""

const defaultFormData = {
  street_address: "",
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
  "h-13.5 xl:h w-full min-w-0 rounded-[5px] border border-[#102E50] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] placeholder:text-[0.8rem] xl:placeholder:text-base shadow-none outline-none transition-[color,box-shadow] focus-visible:border-[#2F6FED] focus-visible:ring-[3px] focus-visible:ring-[#2F6FED]/20 xl:h-16 xl:text-base"

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
  const [showDobTip, setShowDobTip] = useState(true)

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    if (currentStep === 1) return formData.street_address.trim() !== ""
    if (currentStep === 2) return formData.medicareParts !== ""
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
    setCurrentStep(3)
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
      zipCode: zip,
      medicareParts: formData.medicareParts,
      dateOfBirth: formData.date_of_birth.trim(),
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
      ? "What is your Street Address?"
      : currentStep === 2
        ? "Do you have Medicare Parts A & B?"
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
            <div className="flex w-full flex-col items-center gap-4 md:gap-5  max-w-[420px]  md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
              <TextInput
                id="streetAddress"
                containerClassName="w-full"
                value={formData.street_address}
                onChange={(e) => handleInputChange("street_address", e.target.value)}
                placeholder="Enter Your Street Address"
                className={INPUT_FIELD}
                
              />
              <FormNextButton onClick={handleNext} disabled={!isStepValid()} />
            </div>
          ) : null}

          {currentStep === 2 ? (
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

          {currentStep === 3 ? (
            <div className="flex w-full flex-col items-center gap-4 md:gap-5 max-w-[420px]  md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
              <div className="relative w-full overflow-visible">
                <TextInput
                  id="dateOfBirth"
                  containerClassName="w-full overflow-visible"
                  value={formData.date_of_birth}
                  onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                  placeholder="Date of Birth"
                  className={`${INPUT_FIELD} pr-11`}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-3">
                  {showDobTip ? (
                    <div
                      role="tooltip"
                      className="pointer-events-none absolute bottom-[calc(100%+10px)] right-0 z-30 w-max max-w-[220px] rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-left text-[0.75rem] font-normal text-[#4B5563] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                    >
                      Optional for MA and Part D plans
                      <span
                        className="absolute -bottom-1.5 right-3 size-3 rotate-45 border-b border-r border-[#E5E7EB] bg-white"
                        aria-hidden
                      />
                    </div>
                  ) : null}
                  <button
                    type="button"
                    aria-label="Date of birth info"
                    onClick={() => setShowDobTip((prev) => !prev)}
                    onMouseEnter={() => setShowDobTip(true)}
                    className="pointer-events-auto flex h-6 w-6 shrink-0 items-center justify-center overflow-visible"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="block h-5 w-5 shrink-0 overflow-visible"
                      aria-hidden
                    >
                      <path
                        d="M11.1618 0.0283627C8.12792 0.23743 5.28693 1.59193 3.21441 3.81745C1.1419 6.04297 -0.00716131 8.97309 3.35852e-05 12.0142C3.35852e-05 15.193 1.26282 18.2417 3.5106 20.4894C5.75838 22.7372 8.80701 24 11.9859 24C15.1647 24 18.2133 22.7372 20.4611 20.4894C22.7089 18.2417 23.9717 15.193 23.9717 12.0142C23.9756 10.3684 23.6405 8.7394 22.9873 7.22877C22.3341 5.71813 21.3767 4.35821 20.175 3.23374C18.9732 2.10927 17.5527 1.24436 16.002 0.692886C14.4514 0.141415 12.8037 -0.0847914 11.1618 0.0283627ZM10.7873 4.82269H13.1844V7.21985H10.7873V4.82269ZM9.58869 9.61702H13.1844V18.0071H15.5816V19.2057H8.39011V18.0071H10.7873V10.8156H8.39011L9.58869 9.61702Z"
                        fill="#0094F0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <FormNextButton onClick={handleNext} />
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="flex w-full flex-col items-center gap-4 md:gap-5  max-w-[420px]  md:max-w-[340px] lg:max-w-[375px] xl:max-w-[450px]">
              <div className="flex w-full flex-col gap-4">
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

              <FormNextButton
                isLastStep
                isLoading={submitStatus === "loading"}
                disabled={!isStepValid()}
              />
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
