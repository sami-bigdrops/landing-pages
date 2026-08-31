"use client"

import { Suspense, useEffect, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { TrustedForm, getCookie, setCookie } from "@workspace/lp-core"
import { AddressAutocomplete } from "./AddressAutocomplete"

const ANALYTICS_FLUSH_DELAY_MS = 300

function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5)
}

const NEEDS_WORK_OPTIONS = [
  { id: "roof_replacement", label: "Roof replacement", Icon: "/need-1.svg" },
  { id: "roof_repair", label: "Roof repair", Icon: "/need-2.svg" },
  { id: "not_sure", label: "I'm not sure", Icon: "/need-3.svg" },
] as const

const YES_NO_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
] as const

const ROOF_AGE_OPTIONS = [
  { id: "less_than_10", label: "Less than 10 years", Icon: "/need-1.svg" },
  { id: "ten_twenty", label: "10-20 years", Icon: "/need-1.svg" },
  { id: "more_than_20", label: "More than 20 years", Icon: "/need-1.svg" },
  { id: "not_sure", label: "I'm not sure", Icon: "/need-3.svg" },
] as const

const HOME_SIZE_OPTIONS = [
  { id: "under_1500", label: "Under 1500 sq. ft.", Icon: "/house.svg" },
  { id: "1500_3000", label: "1500-3000 sq. ft.", Icon: "/house.svg" },
  { id: "over_3000", label: "Over 3000 sq. ft.", Icon: "/house.svg" },
] as const

const ROOF_SHAPE_OPTIONS = [
  { id: "sloped", label: "Sloped roof", Icon: "/home.svg" },
  { id: "flat", label: "Flat roof", Icon: "/box.svg" },
  { id: "not_sure", label: "I'm not sure", Icon: "/need-3.svg" },
] as const

const PLANNING_PROCESS_OPTIONS = [
  { id: "ready_to_hire", label: "Ready to hire", Icon: "/handshake.svg" },
  { id: "just_getting_price", label: "Just getting a price", Icon: "/price.svg" },
] as const

const STEP_TITLE =
  "text-center text-base font-medium leading-snug text-[#323232] xl:text-2xl xl:leading-snug"
const GRID_2 = "mx-auto grid w-full max-w-md grid-cols-2 gap-3 md:max-w-lg md:gap-4 xl:gap-5"
const CHOICE_GRID_BASE = "mx-auto grid w-full grid-cols-2 gap-3 md:gap-4 xl:gap-5"
const STEP_HEADER =
  "flex h-[7.5rem] w-full shrink-0 flex-col items-center justify-center gap-1.5 md:h-[8rem] xl:h-[8.5rem]"
const STEP_BODY =
  "flex h-[26rem] w-full shrink-0 flex-col items-center justify-start overflow-visible md:h-[28rem] xl:h-[30rem]"

function StepTitle({ children }: { children: ReactNode }) {
  const label = typeof children === "string" ? children.trimEnd() : children

  return (
    <h3 className={STEP_TITLE}>
      {label}
      <span className="group relative ml-0.5 inline-block">
        <span
          className="cursor-help text-base font-semibold leading-none text-[#E11D2E] xl:text-2xl"
          aria-hidden
        >
          *
        </span>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-[#4B5563] px-2.5 py-1 text-xs font-normal text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 xl:px-3 xl:py-1.5 xl:text-sm"
        >
          This field is required.
        </span>
      </span>
    </h3>
  )
}

function StepFrame({
  step,
  stepName,
  title,
  subtitle,
  children,
}: {
  step: string
  stepName: string
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      className="mx-auto flex w-full max-w-4xl shrink-0 flex-col"
      data-arohaa-step={step}
      data-arohaa-step-name={stepName}
    >
      <div className={STEP_HEADER}>
        <StepTitle>{title}</StepTitle>
        {subtitle ? (
          <p className="text-center text-sm text-gray-500 xl:text-base">{subtitle}</p>
        ) : null}
      </div>
      <div className={STEP_BODY}>{children}</div>
    </section>
  )
}

function getChoiceGridClass(itemCount: number) {
  switch (itemCount) {
    case 2:
      return `${CHOICE_GRID_BASE} max-w-xl md:max-w-2xl xl:grid-cols-2`
    case 3:
      return `${CHOICE_GRID_BASE} max-w-3xl md:grid-cols-3`
    case 4:
      return `${CHOICE_GRID_BASE} max-w-4xl md:grid-cols-4`
    default:
      return `${CHOICE_GRID_BASE} max-w-4xl md:grid-cols-4`
  }
}

const CHOICE_BTN =
  "flex h-full min-h-[9.5rem] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[5px] border border-[#102E50] bg-white px-3 py-4 text-center transition-colors hover:bg-[#e6f0ff] md:min-h-[10.5rem] md:px-4 md:py-5 xl:min-h-[12rem] xl:px-6 xl:py-6"
const CHOICE_BTN_MLS =
  "flex w-full cursor-pointer items-center justify-center rounded-[5px] border border-[#1776eb] bg-white px-4 py-4 text-center transition-colors hover:bg-[#e6f0ff] text-[#1776eb] md:px-5 md:py-5 xl:px-6 xl:py-5.5"
const CHOICE_BTN_MLS_LABEL = "text-sm font-medium uppercase leading-normal text-[#1776eb] xl:text-base"
const CHOICE_ICON = "h-14 w-14 shrink-0 object-contain md:h-16 md:w-16 xl:h-20 xl:w-20"
const CHOICE_LABEL = "text-[0.85rem] font-medium leading-normal text-[#323232] xl:text-[1.1rem]"
const INPUT_FIELD =
  "h-14 w-full rounded-[5px] border border-[#102E50] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] focus:border-[#102E50] focus:outline-none xl:h-15 xl:text-base"
const FIELDS_STACK = "mx-auto flex w-full max-w-lg flex-col gap-4 md:gap-5"

type YesNoId = (typeof YES_NO_OPTIONS)[number]["id"]
type PropertyTypeId = (typeof NEEDS_WORK_OPTIONS)[number]["id"]
type RoofAgeTypeId = (typeof ROOF_AGE_OPTIONS)[number]["id"]
type HomeSizeTypeId = (typeof HOME_SIZE_OPTIONS)[number]["id"]
type RoofShapeTypeId = (typeof ROOF_SHAPE_OPTIONS)[number]["id"]
type PlanningProcessTypeId = (typeof PLANNING_PROCESS_OPTIONS)[number]["id"]

const BASE_STEPS = 12

const defaultFormData = {
  isHomeowner: "yes" as YesNoId,
  propertyType: "roof_replacement" as PropertyTypeId,
  roofAge: "less_than_10" as RoofAgeTypeId,
  homeSize: "under_1500" as HomeSizeTypeId,
  roofShape: "sloped" as RoofShapeTypeId,
  planningProcess: "ready_to_hire" as PlanningProcessTypeId,
  hasAttic: "yes" as YesNoId,
  hasRoofLeaks: "yes" as YesNoId,
  hasMetalRoof: "yes" as YesNoId,
  qualifiesForDiscount: "yes" as YesNoId,
  zipCode: "",
  address: "",
  city: "",
  state: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
}

type FormNavigationProps = {
  isNextDisabled?: boolean
  nextLabel?: string
  onNext: () => void
}

function FormNavigation({
  isNextDisabled = false,
  nextLabel = "Next",
  onNext,
}: FormNavigationProps) {
  return (
    <nav className="flex w-full max-w-lg flex-col items-center justify-center gap-4 md:gap-5">
      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled}
        className="w-full rounded-[10px] bg-[#C12026] py-3 text-base font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:py-4 xl:text-[1.05rem]"
      >
        {nextLabel}
      </button>
    </nav>
  )
}

function FormPage() {
  const [askHomeowner, setAskHomeowner] = useState(true)
  const [currentStep, setCurrentStep] = useState<number | null>(null)
  const [formData, setFormData] = useState(defaultFormData)

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({})

  useEffect(() => {
    const homeownerCookie = getCookie("isHomeowner")
    const hasHomeownerCookie = homeownerCookie === "yes" || homeownerCookie === "no"
    setAskHomeowner(!hasHomeownerCookie)
    setFormData((prev) => ({
      ...prev,
      isHomeowner: (homeownerCookie === "no" ? "no" : "yes") as YesNoId,
    }))
    setCurrentStep(hasHomeownerCookie ? 1 : 0)
  }, [])

  const progressCurrent =
    currentStep === null ? 1 : askHomeowner ? currentStep + 1 : currentStep
  const progressTotal = askHomeowner ? BASE_STEPS + 1 : BASE_STEPS

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    if (field === "zipCode") {
      setFormData((prev) => ({ ...prev, zipCode: normalizeZip(value) }))
      return
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (currentStep === 10) {
      return normalizeZip(formData.zipCode).length === 5
    }
    if (currentStep === 11) {
      return (
        formData.address.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.state.trim() !== ""
      )
    }
    if (currentStep === BASE_STEPS) {
      const phoneDigits = formData.phone_number.replace(/\D/g, "")
      return (
        formData.first_name.trim() !== "" &&
        formData.last_name.trim() !== "" &&
        phoneDigits.length === 10 &&
        formData.email.trim() !== "" &&
        emailRegex.test(formData.email.trim())
      )
    }
    return true
  }

  const handleNext = () => {
    if (currentStep === null || !isStepValid() || currentStep >= BASE_STEPS) return
    setCurrentStep((prev) => (prev === null ? prev : prev + 1))
  }

  const handleFormKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (currentStep === null) return
    if (e.key !== "Enter") return
    const tag = (e.target as HTMLElement).tagName
    if (tag === "TEXTAREA" || tag === "BUTTON") return

    if (currentStep === BASE_STEPS) {
      if (!isStepValid()) e.preventDefault()
      return
    }

    e.preventDefault()
    if ((currentStep === 10 || currentStep === 11) && isStepValid()) {
      handleNext()
    }
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep === null) return
    if (currentStep !== BASE_STEPS) {
      if ((currentStep === 10 || currentStep === 11) && isStepValid()) {
        handleNext()
      }
      return
    }

    setSubmitError("")
    setFieldErrors({})

    const zip = normalizeZip(formData.zipCode)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const email = formData.email.trim()
    const phoneDigits = formData.phone_number.replace(/\D/g, "")

    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !email ||
      !emailRegex.test(email) ||
      phoneDigits.length !== 10 ||
      zip.length !== 5
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
      isHomeowner: getCookie("isHomeowner") || formData.isHomeowner,
      propertyType: formData.propertyType,
      roofAge: formData.roofAge,
      homeSize: formData.homeSize,
      roofShape: formData.roofShape,
      planningProcess: formData.planningProcess,
      hasAttic: formData.hasAttic,
      hasRoofLeaks: formData.hasRoofLeaks,
      hasMetalRoof: formData.hasMetalRoof,
      qualifiesForDiscount: formData.qualifiesForDiscount,
      zipCode: zip,
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      firstName: formData.first_name.trim(),
      lastName: formData.last_name.trim(),
      phoneNumber: phoneDigits,
      email: formData.email.trim(),
      subid1: getCookie("subid1") ?? "",
      subid2: getCookie("subid2") ?? "",
      subid3: getCookie("subid3") ?? "",
      xxTrustedFormCertUrl: certInput?.value ?? "",
      xxTrustedFormToken: tokenInput?.value ?? "",
    }

    try {
      console.log("[submit-form] Form data submitted:", payload)
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
        leadProsper?: {
          received: boolean
          status?: string
          reason?: string
        }
      }

      if (data.leadProsper) {
        const { received, status, reason } = data.leadProsper
        if (received) {
          console.log(`[submit-form] LeadProsper status: RECEIVED${status ? ` (${status})` : ""}`)
        } else {
          console.log(
            `[submit-form] LeadProsper status: NOT RECEIVED${reason ? ` — ${reason}` : ""}${status ? ` (${status})` : ""}`
          )
        }
      }

      if (!res.ok) {
        const errorMsg = typeof data.error === "string" ? data.error : "Submission failed"
        const fieldHint = (data as { field?: string }).field
        if (fieldHint === "email" || (data as { invalidField?: string }).invalidField === "email") {
          setFieldErrors({ email: errorMsg })
          setSubmitStatus("error")
          setSubmitError(errorMsg)
        } else {
          setSubmitStatus("error")
          setSubmitError(errorMsg)
        }
        return
      }

      if (data.success && typeof data.redirectUrl === "string") {
        window.setTimeout(() => {
          window.location.href = data.redirectUrl!
        }, ANALYTICS_FLUSH_DELAY_MS)
        return
      }

      setSubmitStatus("idle")
    } catch {
      setSubmitStatus("error")
      setSubmitError("Something went wrong. Please try again.")
    }
  }

  return (
    <section className="flex h-full min-h-0 w-full flex-col">
      <form
        id="lead-form"
        method="POST"
        action="/api/submit-form"
        onSubmit={handleLeadSubmit}
        onKeyDown={handleFormKeyDown}
        noValidate
        className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col"
      >
        <div className="w-full shrink-0 pb-6 md:pb-8 xl:pb-10">
          <ProgressBar
            type="8"
            className="w-full"
            currentStep={progressCurrent}
            totalSteps={progressTotal}
            backgroundColor="#C1202633"
            foregroundColor="#C12026"
          />
        </div>
        <TrustedForm />

        <div className="flex min-h-0 w-full flex-1 flex-col justify-start md:justify-center">
          {currentStep === null ? (
            <div className="flex h-full min-h-[12rem] w-full items-center justify-center">
              <div className="text-base font-semibold text-[#102E50] md:text-lg">Loading...</div>
            </div>
          ) : null}

          {currentStep === 0 ? (
            <StepFrame step="0" stepName="Are you a homeowner?" title="Are you a homeowner?">
              <div className={GRID_2}>
                {YES_NO_OPTIONS.map(({ id, label }) => {
                  const selected = formData.isHomeowner === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setCookie("isHomeowner", id)
                        setFormData((prev) => ({ ...prev, isHomeowner: id }))
                        setCurrentStep(1)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN_MLS}
                    >
                      <span className={`${CHOICE_BTN_MLS_LABEL} lg:text-base xl:text-lg`}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 1 ? (
            <StepFrame step="1" stepName="What do you need?" title="What do you need?">
              <div className={getChoiceGridClass(NEEDS_WORK_OPTIONS.length)}>
                {NEEDS_WORK_OPTIONS.map(({ id, label, Icon }) => {
                  const selected = formData.propertyType === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, propertyType: id }))
                        setCurrentStep(2)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN}
                    >
                      <Image src={Icon} alt="" width={80} height={80} aria-hidden className={CHOICE_ICON} />
                      <span className={CHOICE_LABEL}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 2 ? (
            <StepFrame step="2" stepName="Roof Age" title="How old is your roof?">
              <div className={getChoiceGridClass(ROOF_AGE_OPTIONS.length)}>
                {ROOF_AGE_OPTIONS.map(({ id, label, Icon }) => {
                  const selected = formData.roofAge === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, roofAge: id }))
                        setCurrentStep(3)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN}
                    >
                      <Image src={Icon} alt="" width={80} height={80} aria-hidden className={CHOICE_ICON} />
                      <span className={CHOICE_LABEL}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 3 ? (
            <StepFrame step="3" stepName="Home Size" title="What is the size of your home?">
              <div className={getChoiceGridClass(HOME_SIZE_OPTIONS.length)}>
                {HOME_SIZE_OPTIONS.map(({ id, label, Icon }) => {
                  const selected = formData.homeSize === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, homeSize: id }))
                        setCurrentStep(4)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN}
                    >
                      <Image src={Icon} alt="" width={80} height={80} aria-hidden className={CHOICE_ICON} />
                      <span className={CHOICE_LABEL}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 4 ? (
            <StepFrame step="4" stepName="Roof Shape" title="What is the shape of your roof?">
              <div className={getChoiceGridClass(ROOF_SHAPE_OPTIONS.length)}>
                {ROOF_SHAPE_OPTIONS.map(({ id, label, Icon }) => {
                  const selected = formData.roofShape === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, roofShape: id }))
                        setCurrentStep(5)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN}
                    >
                      <Image src={Icon} alt="" width={80} height={80} aria-hidden className={CHOICE_ICON} />
                      <span className={CHOICE_LABEL}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 5 ? (
            <StepFrame
              step="5"
              stepName="Planning Process"
              title="Where are you in the planning process?"
            >
              <div className={getChoiceGridClass(PLANNING_PROCESS_OPTIONS.length)}>
                {PLANNING_PROCESS_OPTIONS.map(({ id, label, Icon }) => {
                  const selected = formData.planningProcess === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, planningProcess: id }))
                        setCurrentStep(6)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN}
                    >
                      <Image src={Icon} alt="" width={80} height={80} aria-hidden className={CHOICE_ICON} />
                      <span className={CHOICE_LABEL}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 6 ? (
            <StepFrame step="6" stepName="Attic" title="Does your house have an attic?">
              <div className={GRID_2}>
                {YES_NO_OPTIONS.map(({ id, label }) => {
                  const selected = formData.hasAttic === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, hasAttic: id }))
                        setCurrentStep(7)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN_MLS}
                    >
                      <span className={`${CHOICE_BTN_MLS_LABEL} lg:text-base xl:text-lg`}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 7 ? (
            <StepFrame
              step="7"
              stepName="Active Roof Leaks"
              title="Are you aware of any active roof leaks?"
            >
              <div className={GRID_2}>
                {YES_NO_OPTIONS.map(({ id, label }) => {
                  const selected = formData.hasRoofLeaks === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, hasRoofLeaks: id }))
                        setCurrentStep(8)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN_MLS}
                    >
                      <span className={`${CHOICE_BTN_MLS_LABEL} lg:text-base xl:text-lg`}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 8 ? (
            <StepFrame
              step="8"
              stepName="Metal Roof"
              title="Do you have a metal roof currently?"
            >
              <div className={GRID_2}>
                {YES_NO_OPTIONS.map(({ id, label }) => {
                  const selected = formData.hasMetalRoof === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, hasMetalRoof: id }))
                        setCurrentStep(9)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN_MLS}
                    >
                      <span className={`${CHOICE_BTN_MLS_LABEL} lg:text-base xl:text-lg`}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 9 ? (
            <StepFrame
              step="9"
              stepName="Senior, Military or First Responder Discounts"
              title="Does anyone in your household qualify for senior, military or first responder discounts that may be available?"
            >
              <div className={GRID_2}>
                {YES_NO_OPTIONS.map(({ id, label }) => {
                  const selected = formData.qualifiesForDiscount === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, qualifiesForDiscount: id }))
                        setCurrentStep(10)
                      }}
                      aria-pressed={selected}
                      className={CHOICE_BTN_MLS}
                    >
                      <span className={`${CHOICE_BTN_MLS_LABEL} lg:text-base xl:text-lg`}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 10 ? (
            <StepFrame step="10" stepName="ZIP Code" title="What is your ZIP code?">
              <div className={FIELDS_STACK}>
                <TextInput
                  id="zipCode"
                  name="zipCode"
                  data-arohaa-field="zipCode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  pattern="\d{5}"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="Enter ZIP Code"
                  className={INPUT_FIELD}
                />
                <FormNavigation isNextDisabled={!isStepValid()} onNext={handleNext} />
              </div>
            </StepFrame>
          ) : null}

          {currentStep === 11 ? (
            <StepFrame
              step="11"
              stepName="Address"
              title="What is your street address?"
              subtitle="Start typing your address and select it from the list."
            >
              <div className={`${FIELDS_STACK} overflow-visible`}>
                <AddressAutocomplete
                  id="address"
                  label={null}
                  value={formData.address}
                  onChange={(value) => handleInputChange("address", value)}
                  onPlaceSelect={(details) => {
                    setFormData((prev) => ({
                      ...prev,
                      address: details.address,
                      city: details.city,
                      state: details.state,
                      ...(details.zipCode ? { zipCode: details.zipCode } : {}),
                    }))
                  }}
                  placeholder="Address"
                  className={INPUT_FIELD}
                />
                {formData.city || formData.state ? (
                  <p className="text-center text-sm text-gray-500 xl:text-base">
                    {[formData.city, formData.state].filter(Boolean).join(", ")}
                    {formData.zipCode ? ` ${formData.zipCode}` : ""}
                  </p>
                ) : null}
                <FormNavigation isNextDisabled={!isStepValid()} onNext={handleNext} />
              </div>
            </StepFrame>
          ) : null}

          {currentStep === BASE_STEPS ? (
            <StepFrame
              step="12"
              stepName="Contact Information"
              title="Who should we prepare this FREE quote for?"
              subtitle="Please enter your contact details below."
            >
              <div className={`${FIELDS_STACK} overflow-y-auto`}>
                <TextInput
                  id="firstName"
                  name="firstName"
                  data-arohaa-field="firstName"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  placeholder="Enter First Name"
                  className={INPUT_FIELD}
                />
                <TextInput
                  id="lastName"
                  name="lastName"
                  data-arohaa-field="lastName"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  placeholder="Enter Last Name"
                  className={INPUT_FIELD}
                />
                <PhoneNumberInput
                  id="phoneNumber"
                  name="phoneNumber"
                  data-arohaa-field="phoneNumber"
                  label={null}
                  value={formData.phone_number}
                  onChange={(value) => handleInputChange("phone_number", value)}
                  className={INPUT_FIELD}
                />
                <TextInput
                  id="email"
                  name="email"
                  data-arohaa-field="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange("email", e.target.value)
                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }))
                  }}
                  placeholder="Enter Email Address"
                  className={`${INPUT_FIELD} ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {fieldErrors.email ? (
                  <p className="text-xs text-red-600" role="alert">
                    {fieldErrors.email}
                  </p>
                ) : null}
                {submitStatus === "error" && submitError ? (
                  <p className="text-sm text-red-600" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={!isStepValid() || submitStatus === "loading"}
                  className="h-13 w-full cursor-pointer rounded-[10px] bg-[#C12026] py-3 text-sm font-medium uppercase text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:h-15 xl:text-lg"
                >
                  {submitStatus === "loading" ? "Submitting..." : "submit"}
                </button>
              </div>
            </StepFrame>
          ) : null}
        </div>
      </form>
    </section>
  )
}

export default function Form() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-0 w-full flex-1 items-center justify-center bg-white">
          <div className="text-base font-semibold text-[#102E50] md:text-lg">Loading...</div>
        </div>
      }
    >
      <div className="flex h-full min-h-0 w-full flex-1 flex-col px-5 py-6 sm:px-6 md:px-8 md:py-8 xl:px-10 xl:py-10">
        <FormPage />
      </div>
    </Suspense>
  )
}
