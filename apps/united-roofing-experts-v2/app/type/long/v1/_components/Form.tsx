"use client"

import { Suspense, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"
import { TrustedForm, getCookie } from "@workspace/lp-core"

const ANALYTICS_FLUSH_DELAY_MS = 300

function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5)
}

// --- Form Options ---

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
  { id: "just_getting_price", label: "Just getting a price", Icon: "/price.svg" }
] as const

const STEP_SHELL = "mx-auto flex w-full max-w-4xl flex-col items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_WIDE = "mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_VALUE = "mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center md:gap-7 xl:gap-8"
const STEP_SHELL_FIELDS = "mx-auto flex w-full max-w-3xl flex-col gap-5 md:gap-6"
const STEP_TITLE = "text-center text-base font-medium text-[#323232] xl:text-2xl md:max-w-[400px] xl:max-w-[600px]"
const GRID_2 = "grid w-full grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 xl:gap-5"
const CHOICE_GRID_BASE = "grid w-full grid-cols-2 gap-3 md:gap-4 xl:gap-5"

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
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-[#4B5563] px-2.5 py-1 xl:px-3 xl:py-1.5 text-xs xl:text-sm font-normal text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          This field is required.
        </span>
      </span>
    </h3>
  )
}

function getChoiceGridClass(itemCount: number) {
  switch (itemCount) {
    case 2:
      return `${CHOICE_GRID_BASE} xl:mx-auto xl:max-w-[620px] xl:grid-cols-2`
    case 3:
      return `${CHOICE_GRID_BASE} xl:mx-auto xl:max-w-[780px] md:grid-cols-3`
    case 4:
      return `${CHOICE_GRID_BASE} xl:mx-auto xl:max-w-[1040px] xl:grid-cols-4`
    default:
      return `${CHOICE_GRID_BASE} xl:mx-auto xl:max-w-[1040px] xl:grid-cols-4`
  }
}
const CHOICE_BTN =
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-start gap-1.5 rounded-[5px] border border-[#102E50] bg-white px-3 py-4 text-center transition-colors hover:bg-[#e6f0ff]  md:px-4 md:py-5 xl:px-6 xl:py-7"
const CHOICE_BTN_MLS =
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[5px] border border-[#1776eb] bg-white px-3 py-4 text-center transition-colors hover:bg-[#e6f0ff] text-[#1776eb] md:gap-5 md:px-4 md:py-5 xl:px-6 xl:py-7"
const CHOICE_BTN_MLS_LABEL = "text-sm font-medium uppercase leading-normal text-[#1776eb] xl:text-base"
const CHOICE_ICON = "h-16 w-16 shrink-0 object-contain md:h-17 md:w-17 xl:h-25 xl:w-25"
const CHOICE_LABEL = "text-[0.85rem] font-medium leading-normal text-[#323232] xl:text-[1.1rem]"
const INPUT_FIELD =
  "mt-2 h-14 w-full rounded-[5px] border border-[#102E50] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] focus:border-[#102E50] focus:outline-none xl:h-15 xl:text-base"

type YesNoId = (typeof YES_NO_OPTIONS)[number]["id"]
type PropertyTypeId = (typeof NEEDS_WORK_OPTIONS)[number]["id"]
type RoofAgeTypeId = (typeof ROOF_AGE_OPTIONS)[number]["id"]
type HomeSizeTypeId = (typeof HOME_SIZE_OPTIONS)[number]["id"]
type RoofShapeTypeId = (typeof ROOF_SHAPE_OPTIONS)[number]["id"]
type PlanningProcessTypeId = (typeof PLANNING_PROCESS_OPTIONS)[number]["id"]

const TOTAL_STEPS = 13

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
  first_name: "",
  last_name: "",
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
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(defaultFormData)

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({})

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    if (field === "zipCode") {
      setFormData((prev) => ({ ...prev, zipCode: normalizeZip(value) }))
      return
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (currentStep === 11) {
      return normalizeZip(formData.zipCode).length === 5
    }
    if (currentStep === 12) {
      return (
        formData.first_name.trim() !== "" &&
        formData.last_name.trim() !== ""
      )
    }
    if (currentStep === TOTAL_STEPS) {
      return (
        formData.email.trim() !== "" &&
        emailRegex.test(formData.email.trim())
      )
    }
    return true
  }

  const handleNext = () => {
    if (!isStepValid() || currentStep >= TOTAL_STEPS) return
    setCurrentStep((prev) => prev + 1)
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
    if ((currentStep === 11 || currentStep === 12) && isStepValid()) {
      handleNext()
    }
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      if ((currentStep === 11 || currentStep === 12) && isStepValid()) {
        handleNext()
      }
      return
    }

    setSubmitError("")
    setFieldErrors({})

    const zip = normalizeZip(formData.zipCode)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const email = formData.email.trim()

    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !email ||
      !emailRegex.test(email) ||
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
      isHomeowner: formData.isHomeowner,
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
      firstName: formData.first_name.trim(),
      lastName: formData.last_name.trim(),
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
    <section className="flex w-full  flex-col items-center justify-center gap-8 md:min-h-[460px] md:gap-10 xl:min-h-[580px] xl:gap-12">


      <form
        id="lead-form"
        method="POST"
        action="/api/submit-form"
        onSubmit={handleLeadSubmit}
        onKeyDown={handleFormKeyDown}
        noValidate
        className="mx-auto flex w-full md:max-w-xl xl:max-w-4xl flex-col items-center justify-center gap-2 xl:gap-4"
      >
        <ProgressBar
          type="8"
          className="w-full"
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          backgroundColor="#C1202633"
          foregroundColor="#C12026"
        />
        <TrustedForm />

        {currentStep === 1 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="1"
            data-arohaa-step-name="Are you a homeowner?"
          >
            <StepTitle>Are you a homeowner? </StepTitle>
            <div className={GRID_2}>
              {YES_NO_OPTIONS.map(({ id, label }) => {
                const selected = formData.isHomeowner === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, isHomeowner: id }))
                      setCurrentStep(2)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN_MLS}
                  >

                    <span className={`${CHOICE_BTN_MLS_LABEL} lg:text-base xl:text-lg`}>{label}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ) : null}

        {currentStep === 2 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="2"
            data-arohaa-step-name="What do you need?"
          >
            <StepTitle>What do you need?</StepTitle>
            <div className={getChoiceGridClass(NEEDS_WORK_OPTIONS.length)}>
              {NEEDS_WORK_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.propertyType === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, propertyType: id }))
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
          </section>
        ) : null}

        {currentStep === 3 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="3"
            data-arohaa-step-name="MLS Listing"
          >
            <StepTitle>How old is your roof?</StepTitle>
            <div className={getChoiceGridClass(ROOF_AGE_OPTIONS.length)}>
              {ROOF_AGE_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.roofAge === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, roofAge: id }))
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
          </section>
        ) : null}
        {currentStep === 4 ? (
          <section
            className={STEP_SHELL_WIDE}
            data-arohaa-step="4"
            data-arohaa-step-name="Home Size"
          >
            <StepTitle>What is the size of your home?</StepTitle>
            <div className={getChoiceGridClass(HOME_SIZE_OPTIONS.length)}>
              {HOME_SIZE_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.homeSize === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, homeSize: id }))
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
          </section>
        ) : null}

        {currentStep === 5 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="5"
            data-arohaa-step-name="Timeline"
          >
            <StepTitle>What is the shape of your roof?</StepTitle>
            <div className={getChoiceGridClass(ROOF_SHAPE_OPTIONS.length)}>
              {ROOF_SHAPE_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.roofShape === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, roofShape: id }))
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
          </section>
        ) : null}

        {currentStep === 6 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="6"
            data-arohaa-step-name="Credit Rating"
          >
            <StepTitle>Where are you in the planning process?</StepTitle>
            <div className={getChoiceGridClass(PLANNING_PROCESS_OPTIONS.length)}>
              {PLANNING_PROCESS_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.planningProcess === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, planningProcess: id }))
                      setCurrentStep(7)
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
          </section>
        ) : null}

        {currentStep === 7 ? (
          <section
            className={STEP_SHELL_VALUE}
            data-arohaa-step="7"
            data-arohaa-step-name="Attic"
          >
            <StepTitle>Does your house have an attic? </StepTitle>
            <div className={GRID_2}>
              {YES_NO_OPTIONS.map(({ id, label }) => {
                const selected = formData.hasAttic === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, hasAttic: id }))
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
          </section>
        ) : null}

        {currentStep === 8 ? (
          <section
            className={STEP_SHELL_VALUE}
            data-arohaa-step="8"
            data-arohaa-step-name="Active Roof Leaks"
          >
            <StepTitle>Are you aware of any active roof leaks? </StepTitle>
            <div className={GRID_2}>
              {YES_NO_OPTIONS.map(({ id, label }) => {
                const selected = formData.hasRoofLeaks === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, hasRoofLeaks: id }))
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
          </section>
        ) : null}

        {currentStep === 9 ? (
          <section
            className={STEP_SHELL_VALUE}
            data-arohaa-step="8"
            data-arohaa-step-name="Metal Roof"
          >
            <StepTitle>Do you have a metal roof currently? </StepTitle>
            <div className={GRID_2}>
              {YES_NO_OPTIONS.map(({ id, label }) => {
                const selected = formData.hasMetalRoof === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, hasMetalRoof: id }))
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
          </section>
        ) : null}

        {currentStep === 10 ? (
          <section
            className={STEP_SHELL_VALUE}
            data-arohaa-step="10"
            data-arohaa-step-name="Senior, Military or First Responder Discounts"
          >
            <StepTitle>Does anyone in your household qualify for senior, military or first responder discounts that may be available? </StepTitle>
            <div className={GRID_2}>
              {YES_NO_OPTIONS.map(({ id, label }) => {
                const selected = formData.qualifiesForDiscount === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, qualifiesForDiscount: id }))
                      setCurrentStep(11)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN_MLS}
                  >

                    <span className={`${CHOICE_BTN_MLS_LABEL} lg:text-base xl:text-lg`}>{label}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ) : null}

        {currentStep === 11 ? (
          <section
            className={`${STEP_SHELL_FIELDS} items-center`}
            data-arohaa-step="8"
            data-arohaa-step-name="Contact Information"
          >
            <StepTitle>What is your ZIP code? </StepTitle>
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">
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

          </section>
        ) : null}

        {currentStep === 12 ? (
          <section
            className={`${STEP_SHELL_FIELDS} items-center`}
            data-arohaa-step="8"
            data-arohaa-step-name="Contact Information"
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
            <StepTitle>Who should we prepare this FREE quote for? </StepTitle>
            <p className="text-sm xl:text-base text-center text-gray-500">Please enter your first and last name below.</p>
            </div>
            <div className="flex w-full max-w-lg flex-col gap-4 text-left md:gap-4">
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

              <FormNavigation isNextDisabled={!isStepValid()} onNext={handleNext} />

            </div>

          </section>
        ) : null}


        {currentStep === TOTAL_STEPS ? (
          <section
            className={`${STEP_SHELL_FIELDS} items-center`}
            data-arohaa-step="9"
            data-arohaa-step-name="Address and Phone"
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
            <StepTitle>Where should we send your information? </StepTitle>
            <p className="text-sm xl:text-base text-center text-gray-500">Please enter your email address below.</p>
            </div>
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">

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
          </section>
        ) : null}


      </form>
    </section>
  )
}

export default function Form() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-base font-semibold text-[#102E50] md:text-lg">Loading...</div>
        </div>
      }
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-8  ">
        <FormPage />
      </div>
    </Suspense>
  )
}
