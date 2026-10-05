"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"

import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { SelectInput } from "@workspace/ui/components/select-input"
import { Button } from "@workspace/ui/components/button"
import { TrustedForm, getCookie } from "@workspace/lp-core"



import { parseAddressComponents, parseCityStateFromPrediction } from "@/lib/parse-place-address"
import { lookupCityStateByZip } from "@/lib/lookup-zip"
import { isValidDob } from "@/lib/validate-dob"
import {
  AROHAA_SUBMITTED_KEY,
  DEBT_AMOUNT_STORAGE_KEY,
  FORM_AROHAA_STEP_OFFSET,
  FORM_STEP_NAMES,
  trackArohaa,
} from "@/lib/arohaa"
import { BirthdateInput } from "./BirthdateInput"

const ANALYTICS_FLUSH_DELAY_MS = 300


// --- Google Maps Places types (minimal) ---
type GMapsPlacePrediction = {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
  terms?: Array<{ offset: number; value: string }>
}

type GMapsAddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

type GMapsPlaceResult = {
  address_components?: GMapsAddressComponent[]
}

type GMapsAutocompleteService = {
  getPlacePredictions(
    req: { input: string; types: string[]; componentRestrictions: { country: string } },
    cb: (predictions: GMapsPlacePrediction[] | null, status: string) => void
  ): void
}

type GMapsPlacesService = {
  getDetails(
    req: { placeId: string; fields: string[] },
    cb: (result: GMapsPlaceResult | null, status: string) => void
  ): void
}

type GMapsWindow = {
  google?: {
    maps?: {
      places?: {
        AutocompleteService: new () => GMapsAutocompleteService
        PlacesService: new (el: HTMLElement) => GMapsPlacesService
        PlacesServiceStatus: { OK: string }
      }
    }
  }
}

type AddressResult = {
  streetAddress: string
  city: string
  state: string
  zipCode: string
}

let googleMapsLoadPromise: Promise<void> | null = null

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (googleMapsLoadPromise) return googleMapsLoadPromise
  const win = window as unknown as GMapsWindow
  if (win.google?.maps?.places) {
    googleMapsLoadPromise = Promise.resolve()
    return googleMapsLoadPromise
  }
  googleMapsLoadPromise = new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
  return googleMapsLoadPromise
}

function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5)
}

function formatSsn(digits: string | undefined | null): string {
  const d = String(digits ?? "").replace(/\D/g, "").slice(0, 9)
  if (d.length <= 3) return d
  if (d.length <= 5) return `${d.slice(0, 3)} - ${d.slice(3)}`
  return `${d.slice(0, 3)} - ${d.slice(3, 5)} - ${d.slice(5)}`
}

function normalizeSsn(value: string | undefined | null): string {
  return String(value ?? "").replace(/\D/g, "").slice(0, 9)
}

// --- Google Places Autocomplete Component ---
function AddressAutocomplete({
  value,
  city,
  state,
  zipCode,
  onChange,
  onSelect,
  label,
  placeholder,
  labelClassName,
  className,
  inputName,
  dataArohaaField,
}: {
  value: string
  city: string
  state: string
  zipCode: string
  onChange: (v: string) => void
  onSelect: (result: AddressResult) => void
  label: string
  placeholder: string
  labelClassName?: string
  className?: string
  inputName?: string
  dataArohaaField?: string
}) {
  const [predictions, setPredictions] = useState<GMapsPlacePrediction[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [mapsReady, setMapsReady] = useState(false)
  const autocompleteRef = useRef<GMapsAutocompleteService | null>(null)
  const placesRef = useRef<GMapsPlacesService | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hiddenDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
    if (!apiKey) return
    loadGoogleMaps(apiKey).then(() => {
      const win = window as unknown as GMapsWindow
      const places = win.google?.maps?.places
      if (!places) return
      autocompleteRef.current = new places.AutocompleteService()
      if (!hiddenDivRef.current) {
        hiddenDivRef.current = document.createElement("div")
      }
      placesRef.current = new places.PlacesService(hiddenDivRef.current)
      setMapsReady(true)
    })
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchPredictions = useCallback(
    (input: string) => {
      if (!autocompleteRef.current || !mapsReady) return
      setIsFetching(true)
      autocompleteRef.current.getPlacePredictions(
        {
          input,
          types: ["address"],
          componentRestrictions: { country: "us" },
        },
        (preds, status) => {
          setIsFetching(false)
          const win = window as unknown as GMapsWindow
          const OK = win.google?.maps?.places?.PlacesServiceStatus?.OK ?? "OK"
          if (status !== OK || !preds) {
            setPredictions([])
            setShowDropdown(false)
            return
          }
          setPredictions(preds)
          setShowDropdown(preds.length > 0)
        }
      )
    },
    [mapsReady]
  )

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!inputValue.trim() || inputValue.length < 3) {
      setPredictions([])
      setShowDropdown(false)
      return
    }
    debounceRef.current = setTimeout(() => fetchPredictions(inputValue), 300)
  }

  const handleSelect = (pred: GMapsPlacePrediction) => {
    setShowDropdown(false)
    setPredictions([])

    const selectedMainText = pred.structured_formatting.main_text.trim()
    const fallbackCityState = parseCityStateFromPrediction(pred)

    onChange(selectedMainText)

    const applySelection = (result: AddressResult) => {
      onChange(result.streetAddress)
      onSelect(result)
    }

    if (!placesRef.current) {
      applySelection({
        streetAddress: selectedMainText,
        city: fallbackCityState.city,
        state: fallbackCityState.state,
        zipCode: "",
      })
      return
    }

    placesRef.current.getDetails(
      { placeId: pred.place_id, fields: ["address_components"] },
      (place) => {
        if (!place?.address_components) {
          applySelection({
            streetAddress: selectedMainText,
            city: fallbackCityState.city,
            state: fallbackCityState.state,
            zipCode: "",
          })
          return
        }

        const { streetNumber, route, parsedCity, parsedState, parsedZip } = parseAddressComponents(
          place.address_components
        )
        const streetAddress =
          (streetNumber ? `${streetNumber} ${route}`.trim() : route.trim()) || selectedMainText

        applySelection({
          streetAddress,
          city: parsedCity || fallbackCityState.city,
          state: parsedState || fallbackCityState.state,
          zipCode: normalizeZip(parsedZip),
        })
      }
    )
  }

  return (
    <div className="w-full relative" ref={containerRef}>
      <label className={labelClassName}>{label}</label>
      <div className="relative">
        <input
          type="text"
          name={inputName}
          data-arohaa-field={dataArohaaField}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (predictions.length > 0) setShowDropdown(true)
          }}
          placeholder={placeholder}
          className={className}
          autoComplete="off"
        />
        {isFetching ? (
          <span className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-[#102E50] border-t-transparent animate-spin" aria-hidden />
        ) : null}
      </div>

      {showDropdown && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#102E50] rounded-[5px] shadow-lg overflow-hidden">
          {predictions.map((pred) => (
            <button
              key={pred.place_id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(pred)
              }}
              className="w-full text-left px-4 py-3 hover:bg-[#fde9ea] transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
            >
              <p className="text-sm font-medium text-[#111827] truncate">{pred.structured_formatting.main_text}</p>
              <p className="text-xs text-[#374151] mt-0.5 truncate">{pred.structured_formatting.secondary_text}</p>
            </button>
          ))}
        </div>
      )}

      {(city || state || zipCode) && (
        <p className="text-[0.7rem] xl:text-[0.8rem] mt-2 font-medium text-left text-[#1C1C1C]">
          {[city, state].filter(Boolean).join(", ")}
          {zipCode ? ` ${zipCode}` : ""}
        </p>
      )}
    </div>
  )
}

// --- Layout / field styles ---
const STEP_SHELL = "mx-auto flex w-full max-w-4xl flex-col items-center gap-4  xl:gap-4.5 "
const STEP_TITLE = "text-center text-xl md:text-2xl font-extrabold text-[#111827] xl:text-3xl mb-2 md:mb-3 xl:mb-5  md:max-w-[300px] xl:max-w-[400px]"
const INPUT_FIELD =
  "mt-2 h-14 w-full rounded-[10px] border border-[#213266] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] shadow-[0_4px_12px_0_rgba(0,0,0,0.03)] focus:border-[#102E50] focus:outline-none xl:h-15 xl:text-base text-center"

const TOTAL_STEPS = 19

const SPEND_PURPOSE_OPTIONS = [
  { label: "Auto Purchase", value: "auto_purchase" },
  { label: "Credit Card Consolidation", value: "credit_card_consolidation" },
  { label: "Debt Consolidation", value: "debt_consolidation" },
  { label: "Debt Settlement", value: "debt_settlement" },
  { label: "Education", value: "education" },
  { label: "Home Improvement", value: "home_improvement" },
  { label: "Medical", value: "medical" },
  { label: "Relocation", value: "relocation" },
  { label: "Small Business", value: "small_business" },
  { label: "Travel", value: "travel" },
  { label: "Other", value: "other" },
]

const CREDIT_SCORE_OPTIONS = [
  { id: "excellent", label: "Excellent (720+)" },
  { id: "good", label: "Good (660-719)" },
  { id: "fair", label: "Fair (600-659)" },
  { id: "poor", label: "Poor (Under 599)" },
  { id: "no_credit", label: "No Credit Established" },
] as const

const EMPLOYMENT_STATUS_OPTIONS = [
  { id: "employed", label: "Employed" },
  { id: "self_employed", label: "Self Employed" },
  { id: "social_security_or_disability", label: "Social Security Or Disability" },
  { id: "benefits", label: "Benefits" },
  { id: "unemployed", label: "Unemployed" },
] as const

const PAY_FREQUENCY_OPTIONS = [
  { id: "monthly", label: "Monthly" },
  { id: "twice_a_month", label: "Twice A Month" },
  { id: "every_other_week", label: "Every Other Week" },
  { id: "weekly", label: "Weekly" },
] as const

const YES_NO_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
] as const

const HOME_OWNERSHIP_OPTIONS = [
  { id: "own", label: "Own" },
  { id: "rent", label: "Rent" },
] as const

const VEHICLE_STATUS_OPTIONS = [
  { id: "yes_paid_off", label: "Yes - It's Paid Off" },
  { id: "yes_making_payments", label: "Yes - I'm Making Payments" },
  { id: "no", label: "No" },
] as const

const MILITARY_AFFILIATION_OPTIONS = [
  { id: "not_a_servicemember", label: "Not A Servicemember" },
  { id: "active_duty", label: "Active Duty Servicemember" },
  { id: "dependent_of_active_duty", label: "Dependent Of An Active Duty Servicemember" },
] as const

const UNSECURED_DEBT_OPTIONS = [
  { id: "none", label: "None" },
  { id: "9999_or_less", label: "$9,999 Or Less" },
  { id: "10000_to_19999", label: "$10,000 - $19,999" },
  { id: "20000_to_29999", label: "$20,000 - $29,999" },
  { id: "30000_or_more", label: "$30,000 Or More" },
] as const

const CHOICE_BTN =
  "w-full flex min-h-14 h-auto shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-4 py-3 font-semibold text-[0.85rem] font-inherit text-[#213266] whitespace-normal text-center leading-snug transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:min-h-14 md:py-3.5 xl:h-16 xl:px-5 xl:py-4 xl:text-base border border-[#AAAEC1] bg-white hover:border-[#069773] hover:bg-[#E8F6F2] hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.03)]"

const CHOICE_BTN_ACTIVE =
  "border-[#069773] bg-[#E8F6F2] shadow-[0_4px_12px_0_rgba(0,0,0,0.03)]"

const CHOICE_BACK_BTN =
  "mt-1.5 cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-[#374151] underline transition-opacity hover:opacity-80 xl:mt-2.5 xl:text-base"

const defaultFormData = {
  zipCode: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  street_address: "",
  city: "",
  state: "",
  date_of_birth: "",
  debt_amount: "",
  spend_purpose: "",
  credit_score: "",
  employment_status: "",
  pay_frequency: "",
  monthly_income: "",
  checking_account: "",
  direct_deposit: "",
  home_ownership: "",
  vehicle_status: "",
  military_affiliation: "",
  unsecured_debt: "",
  ssn: "",
}

type FormNavigationProps = {
  showBack?: boolean
  isNextDisabled?: boolean
  nextLabel?: string
  onNext: () => void
  onBack?: () => void
}

function FormNavigation({
  showBack = false,
  isNextDisabled = false,
  nextLabel = "Next",
  onNext,
  onBack,
}: FormNavigationProps) {
  return (
    <nav className="mt-1.5 flex w-full md:max-w-[190px] xl:max-w-[210px] flex-col items-center gap-4 xl:mt-2.5 xl:gap-5">
      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled}
        className="h-12 w-full cursor-pointer rounded-[10px] bg-[#069773] text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:h-[52px] xl:h-14 xl:text-base"
      >
        {nextLabel}
      </button>

      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-[#374151] underline transition-opacity hover:opacity-80 xl:text-base"
        >
          Back
        </button>
      ) : null}
    </nav>
  )
}

function FormPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(defaultFormData)

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({})
  const [showSubmissionLoading, setShowSubmissionLoading] = useState(false)
  const redirectUrlRef = useRef<string | null>(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(DEBT_AMOUNT_STORAGE_KEY) ?? ""
      if (stored) {
        setFormData((prev) => ({ ...prev, debt_amount: stored }))
      }
    } catch {
      // ignore storage failures
    }
  }, [])

  useEffect(() => {
    const arohaaStep = currentStep + FORM_AROHAA_STEP_OFFSET
    trackArohaa("form_step_view", {
      step: arohaaStep,
      step_name: FORM_STEP_NAMES[arohaaStep] ?? `Step ${arohaaStep}`,
    })
  }, [currentStep])

  const redirectToThankYou = useCallback((url: string) => {
    window.setTimeout(() => {
      window.location.href = url
    }, ANALYTICS_FLUSH_DELAY_MS)
  }, [])

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleZipChange = async (value: string) => {
    const zip = normalizeZip(value)
    if (zip.length !== 5) {
      setFormData((prev) => ({ ...prev, zipCode: zip, city: "", state: "" }))
      return
    }
    const { city, state } = await lookupCityStateByZip(zip)
    setFormData((prev) => ({
      ...prev,
      zipCode: zip,
      city,
      state: state.toUpperCase().slice(0, 2),
    }))
  }

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.debt_amount.trim() !== ""
    }
    if (currentStep === 2) {
      return formData.spend_purpose.trim() !== ""
    }
    if (currentStep === 3) {
      return formData.credit_score.trim() !== ""
    }
    if (currentStep === 4) {
      return formData.employment_status.trim() !== ""
    }
    if (currentStep === 5) {
      return formData.pay_frequency.trim() !== ""
    }
    if (currentStep === 6) {
      return formData.monthly_income.trim() !== ""
    }
    if (currentStep === 7) {
      return formData.checking_account.trim() !== ""
    }
    if (currentStep === 8) {
      return formData.direct_deposit.trim() !== ""
    }
    if (currentStep === 9) {
      return (
        normalizeZip(formData.zipCode).length === 5 &&
        formData.city.trim() !== "" &&
        formData.state.trim().length === 2
      )
    }
    if (currentStep === 10) {
      return formData.street_address.trim() !== ""
    }
    if (currentStep === 11) {
      return formData.home_ownership.trim() !== ""
    }
    if (currentStep === 12) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(formData.email.trim())
    }
    if (currentStep === 13) {
      return formData.vehicle_status.trim() !== ""
    }
    if (currentStep === 14) {
      return formData.military_affiliation.trim() !== ""
    }
    if (currentStep === 15) {
      return formData.unsecured_debt.trim() !== ""
    }
    if (currentStep === 16) {
      return formData.first_name.trim() !== "" && formData.last_name.trim() !== ""
    }
    if (currentStep === 17) {
      return isValidDob(formData.date_of_birth)
    }
    if (currentStep === 18) {
      return formData.phone_number.replace(/\D/g, "").length === 10
    }
    if (currentStep === TOTAL_STEPS) {
      return (
        normalizeSsn(formData.ssn).length === 9 &&
        formData.phone_number.replace(/\D/g, "").length === 10 &&
        formData.first_name.trim() !== "" &&
        formData.last_name.trim() !== "" &&
        formData.street_address.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.state.trim().length === 2 &&
        normalizeZip(formData.zipCode).length === 5 &&
        isValidDob(formData.date_of_birth)
      )
    }
    return true
  }

  const handleNext = () => {
    if (!isStepValid() || currentStep >= TOTAL_STEPS) return
    if (currentStep === 9) {
      trackArohaa("zip_submit", { zip: normalizeZip(formData.zipCode) })
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/")
      return
    }
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
    if (isStepValid()) {
      handleNext()
    }
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      if (isStepValid()) {
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
    const ssnDigits = normalizeSsn(formData.ssn)

    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !email ||
      !emailRegex.test(email) ||
      phoneDigits.length !== 10 ||
      ssnDigits.length !== 9 ||
      !formData.street_address.trim() ||
      !formData.city.trim() ||
      formData.state.trim().length !== 2 ||
      zip.length !== 5 ||
      !isValidDob(formData.date_of_birth)
    ) {
      setSubmitStatus("error")
      setSubmitError(
        ssnDigits.length !== 9
          ? "Please enter a valid 9-digit Social Security Number."
          : phoneDigits.length !== 10
          ? "Please enter a valid 10-digit phone number."
          : !isValidDob(formData.date_of_birth)
            ? "Please enter a valid date of birth. You must be between 18 and 100 years old."
            : !formData.street_address.trim() ||
              !formData.city.trim() ||
              formData.state.trim().length !== 2
              ? "Please enter a valid street address and ZIP code."
              : zip.length !== 5
                ? "Please enter a valid ZIP code."
                : "Please complete all required fields with valid details."
      )
      return
    }

    setSubmitStatus("loading")
    setShowSubmissionLoading(true)
    redirectUrlRef.current = null

    const form = e.currentTarget
    const certInput = form.elements.namedItem("xxTrustedFormCertUrl") as HTMLInputElement | null
    const tokenInput = form.elements.namedItem("xxTrustedFormToken") as HTMLInputElement | null

    const payload = {
      zipCode: zip,
      firstName: formData.first_name.trim(),
      lastName: formData.last_name.trim(),
      address: formData.street_address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim().toUpperCase().slice(0, 2),
      dob: formData.date_of_birth,
      debtAmount: formData.debt_amount,
      spendPurpose: formData.spend_purpose,
      creditScore: formData.credit_score,
      employmentStatus: formData.employment_status,
      payFrequency: formData.pay_frequency,
      monthlyIncome: formData.monthly_income,
      checkingAccount: formData.checking_account,
      directDeposit: formData.direct_deposit,
      homeOwnership: formData.home_ownership,
      vehicleStatus: formData.vehicle_status,
      militaryAffiliation: formData.military_affiliation,
      unsecuredDebt: formData.unsecured_debt,
      email: formData.email.trim(),
      phoneNumber: formData.phone_number.trim(),
      ssn: ssnDigits,
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
        setShowSubmissionLoading(false)
        if (fieldHint === "email" || (data as { invalidField?: string }).invalidField === "email") {
          setFieldErrors({ email: errorMsg })
          setSubmitStatus("error")
          setSubmitError(errorMsg)
        } else if (fieldHint === "phoneNumber") {
          setFieldErrors({ phone: errorMsg })
          setSubmitStatus("error")
          setSubmitError(errorMsg)
        } else {
          setSubmitStatus("error")
          setSubmitError(errorMsg)
        }
        return
      }

      if (data.success) {
        trackArohaa("form_submit")
        try {
          sessionStorage.setItem(AROHAA_SUBMITTED_KEY, "1")
        } catch {
          /* ignore */
        }
        const thankYouUrl =
          typeof data.redirectUrl === "string" && data.redirectUrl.length > 0
            ? data.redirectUrl
            : `/thankyou?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(formData.first_name.trim())}`
        redirectUrlRef.current = thankYouUrl
        redirectToThankYou(thankYouUrl)
        return
      }

      setShowSubmissionLoading(false)
      setSubmitStatus("idle")
    } catch {
      setShowSubmissionLoading(false)
      setSubmitStatus("error")
      setSubmitError("Something went wrong. Please try again.")
    }
  }

  return (
    <section className="flex w-full min-h-[360px] flex-1 flex-col items-center justify-center gap-8 md:min-h-[360px] md:gap-10 xl:min-h-[420px] xl:gap-12">


      <form
        id="lead-form"
        method="POST"
        action="/api/submit-form"
        onSubmit={handleLeadSubmit}
        onKeyDown={handleFormKeyDown}
        noValidate
        className="mx-auto flex w-full md:max-w-xl  xl:max-w-xl flex-col items-center gap-1 xl:gap-3 "
      >
        <ProgressBar
          type="8"
          className="w-full"
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          backgroundColor="#E5E7EB"
          foregroundColor="#069773"
        />
        <TrustedForm />

        {currentStep === 1 ? (
          <section
            className={STEP_SHELL}

            data-arohaa-step="2"
            data-arohaa-step-name={FORM_STEP_NAMES[2]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-6">
              <h3 className={STEP_TITLE}>How much would you like to borrow?</h3>
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col gap-4 text-center ">
                <TextInput
                  id="debtAmount"
                  name="debtAmount"
                  data-arohaa-field="debtAmount"

                  value={formData.debt_amount}
                  onChange={(e) => handleInputChange("debt_amount", e.target.value)}
                  placeholder="$ 0"

                  className={INPUT_FIELD}
                />



              </div>

            </div>

            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 2 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="3"
            data-arohaa-step-name={FORM_STEP_NAMES[3]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>How do you want to spend the money?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col gap-4 text-center"
                data-arohaa-field="spendPurpose"
              >
                <SelectInput
                  placeholder="Select"
                  options={SPEND_PURPOSE_OPTIONS}
                  value={formData.spend_purpose}
                  onChange={(selectedValue) =>
                    handleInputChange("spend_purpose", selectedValue)
                  }
                  selectClassName={INPUT_FIELD}
                />
              </div>
            </div>
            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 3 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="4"
            data-arohaa-step-name={FORM_STEP_NAMES[4]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your estimated credit score?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="creditScore"
              >
                {CREDIT_SCORE_OPTIONS.map(({ id, label }) => {
                  const selected = formData.credit_score === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, credit_score: id }))
                        setCurrentStep(4)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 4 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="5"
            data-arohaa-step-name={FORM_STEP_NAMES[5]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your employment status?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="employmentStatus"
              >
                {EMPLOYMENT_STATUS_OPTIONS.map(({ id, label }) => {
                  const selected = formData.employment_status === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, employment_status: id }))
                        setCurrentStep(5)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 5 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="6"
            data-arohaa-step-name={FORM_STEP_NAMES[6]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>How often are you paid?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="payFrequency"
              >
                {PAY_FREQUENCY_OPTIONS.map(({ id, label }) => {
                  const selected = formData.pay_frequency === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, pay_frequency: id }))
                        setCurrentStep(6)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 6 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="7"
            data-arohaa-step-name={FORM_STEP_NAMES[7]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <div className="flex flex-col items-center justify-center gap-0.5">
              <h3 className={STEP_TITLE}>What is your monthly income?</h3>
              <p className="text-center text-xs font-normal leading-relaxed text-[#374151] md:max-w-[320px] xl:max-w-[360px] xl:text-sm">
                Alimony, child support, or separate maintenance payments need not be disclosed unless you want it considered as a basis for repayment of the loan.
              </p>

              </div>
              
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col gap-2 text-center xl:gap-3.5">
                <TextInput
                  id="monthlyIncome"
                  name="monthlyIncome"
                  data-arohaa-field="monthlyIncome"
                  value={formData.monthly_income}
                  onChange={(e) => handleInputChange("monthly_income", e.target.value)}
                  placeholder="$ 0"
                  className={INPUT_FIELD}
                />
                <p className="text-center text-[0.7rem] font-normal text-[#374151] xl:text-xs">
                  You may be asked to verify your income
                </p>
              </div>
            </div>
            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 7 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="8"
            data-arohaa-step-name={FORM_STEP_NAMES[8]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>Do you have a checking account?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="checkingAccount"
              >
                {YES_NO_OPTIONS.map(({ id, label }) => {
                  const selected = formData.checking_account === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, checking_account: id }))
                        setCurrentStep(8)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 8 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="9"
            data-arohaa-step-name={FORM_STEP_NAMES[9]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>Do you have Direct Deposit?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="directDeposit"
              >
                {YES_NO_OPTIONS.map(({ id, label }) => {
                  const selected = formData.direct_deposit === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, direct_deposit: id }))
                        setCurrentStep(9)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 9 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="10"
            data-arohaa-step-name={FORM_STEP_NAMES[10]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your ZIP code?</h3>
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col gap-4 text-center">
                <ZipCodeInput
                  id="zipCode"
                  name="zipCode"
                  data-arohaa-field="zipCode"
                  value={formData.zipCode}
                  onChange={(value) => {
                    void handleZipChange(value)
                  }}
                  placeholder="XXXXX"
                  className={INPUT_FIELD}
                  containerClassName="w-full"
                />
              </div>
            </div>
            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 10 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="11"
            data-arohaa-step-name={FORM_STEP_NAMES[11]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your street address?</h3>
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col gap-4 text-center">
                <TextInput
                  id="streetAddress"
                  name="streetAddress"
                  data-arohaa-field="address"
                  value={formData.street_address}
                  onChange={(e) => handleInputChange("street_address", e.target.value)}
                  placeholder="Enter Address"
                  className={INPUT_FIELD}
                />
              </div>
            </div>
            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 11 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="12"
            data-arohaa-step-name={FORM_STEP_NAMES[12]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>Do you own or rent your home?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="homeOwnership"
              >
                {HOME_OWNERSHIP_OPTIONS.map(({ id, label }) => {
                  const selected = formData.home_ownership === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, home_ownership: id }))
                        setCurrentStep(12)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 12 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="13"
            data-arohaa-step-name={FORM_STEP_NAMES[13]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your email address?</h3>
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col gap-4 text-center">
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
                  placeholder="Enter email address"
                  className={`${INPUT_FIELD} ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {fieldErrors.email ? (
                  <p className="text-xs text-red-600" role="alert">
                    {fieldErrors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 13 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="14"
            data-arohaa-step-name={FORM_STEP_NAMES[14]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>Do you have a vehicle registered in your name?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="vehicleStatus"
              >
                {VEHICLE_STATUS_OPTIONS.map(({ id, label }) => {
                  const selected = formData.vehicle_status === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, vehicle_status: id }))
                        setCurrentStep(14)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 14 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="15"
            data-arohaa-step-name={FORM_STEP_NAMES[15]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your Military Affiliation?</h3>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="militaryAffiliation"
              >
                {MILITARY_AFFILIATION_OPTIONS.map(({ id, label }) => {
                  const selected = formData.military_affiliation === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, military_affiliation: id }))
                        setCurrentStep(15)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 15 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="16"
            data-arohaa-step-name={FORM_STEP_NAMES[16]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <div className="flex flex-col items-center justify-center gap-0.5">
                <h3 className={STEP_TITLE}>How much unsecured debt do you have?</h3>
                <p className="text-center text-xs font-normal leading-relaxed text-[#374151] md:max-w-[320px] xl:max-w-[380px] xl:text-sm">
                  Unsecured debt includes credit cards, personal loans, or medical bills.
                </p>
              </div>
              <div
                className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center justify-center gap-2.5 xl:gap-3"
                data-arohaa-field="unsecuredDebt"
              >
                {UNSECURED_DEBT_OPTIONS.map(({ id, label }) => {
                  const selected = formData.unsecured_debt === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, unsecured_debt: id }))
                        setCurrentStep(16)
                      }}
                      aria-pressed={selected}
                      className={`${CHOICE_BTN}${selected ? ` ${CHOICE_BTN_ACTIVE}` : ""}`}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <button type="button" onClick={handleBack} className={CHOICE_BACK_BTN}>
              Back
            </button>
          </section>
        ) : null}

        {currentStep === 16 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="17"
            data-arohaa-step-name={FORM_STEP_NAMES[17]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your name?</h3>
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col gap-1 text-center md:flex-row md:gap-3">
                <TextInput
                  id="firstName"
                  name="firstName"
                  data-arohaa-field="firstName"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  placeholder="First name"
                  className={INPUT_FIELD}
                  containerClassName="w-full flex-1"
                />
                <TextInput
                  id="lastName"
                  name="lastName"
                  data-arohaa-field="lastName"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  placeholder="Last name"
                  className={INPUT_FIELD}
                  containerClassName="w-full flex-1"
                />
              </div>
            </div>
            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 17 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="18"
            data-arohaa-step-name={FORM_STEP_NAMES[18]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your date of birth?</h3>
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col gap-4 text-center overflow-visible">
                <BirthdateInput
                  value={formData.date_of_birth}
                  onChange={(iso) => handleInputChange("date_of_birth", iso)}
                  className={INPUT_FIELD}
                  dataArohaaField="dob"
                />
              </div>
            </div>
            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 18 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="19"
            data-arohaa-step-name={FORM_STEP_NAMES[19]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your phone number?</h3>
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center gap-3 text-center xl:gap-4">
                <PhoneNumberInput
                  id="phoneNumber"
                  name="phoneNumber"
                  data-arohaa-field="phoneNumber"
                  value={formData.phone_number}
                  onChange={(v) => {
                    handleInputChange("phone_number", v)
                    if (fieldErrors.phone) setFieldErrors((p) => ({ ...p, phone: undefined }))
                  }}
                  placeholder="(XXX) XXX - XXXX"
                  className={`${INPUT_FIELD} ${fieldErrors.phone ? "border-red-500 focus:border-red-500" : ""}`}
                  containerClassName="w-full"
                />
                {fieldErrors.phone ? (
                  <p className="text-xs text-red-600" role="alert">
                    {fieldErrors.phone}
                  </p>
                ) : null}
                <p className="text-center text-[0.7rem] font-normal leading-relaxed text-[#374151] xl:text-xs">
                  By clicking "Next", I hereby provide my express consent to recurring communication at the telephone number provided by Lending for Low Credit and its Marketplace Partners (including parties calling on their behalf) in connection with my loan request, for other marketing purposes, and related to credit or credit-related offers, including contact through automatic dialing systems, artificial or pre-recorded voice messaging, or text message. I understand that my consent applies to these text messages and telemarketing calls even if I have subscribed to a federal, state, or company "Do Not Call" registry. Message and data rates may apply. To opt-out, please reply STOP to the received text message. My check of the preceding box shall be my electronic signature to this consent. I understand that consent is not a condition to utilize our services.{" "}
                  <Link href="/terms-of-use" className="text-[#0035D5] underline">
                    Terms of Service
                  </Link>
                  {" "} / {" "}
                  <Link href="/privacy-policy" className="text-[#0035D5] underline">
                    Privacy Policy
                  </Link>
                  {" "}apply.
                </p>
           
              </div>
            </div>
            <FormNavigation
              showBack
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === TOTAL_STEPS ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="20"
            data-arohaa-step-name={FORM_STEP_NAMES[20]}
          >
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <h3 className={STEP_TITLE}>What is your Social Security Number?</h3>
              <div className="flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center gap-3 text-center xl:gap-4">
                <div className="flex items-start gap-2 text-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="mt-0.5 w-3.5 h-3.5 shrink-0"
                    aria-hidden

                    
                  >
                    <path
                      d="M12.375 9V6.75C12.375 5.85489 12.0194 4.99645 11.3865 4.36351C10.7536 3.73058 9.89511 3.375 9 3.375C8.10489 3.375 7.24645 3.73058 6.61351 4.36351C5.98058 4.99645 5.625 5.85489 5.625 6.75V9H12.375ZM2.25 9H3.375V6.75C3.375 5.25816 3.96763 3.82742 5.02252 2.77252C6.07742 1.71763 7.50816 1.125 9 1.125C10.4918 1.125 11.9226 1.71763 12.9775 2.77252C14.0324 3.82742 14.625 5.25816 14.625 6.75V9H15.75V16.875H2.25V9Z"
                      fill="#213266"
                    />
                  </svg>
                  <p className="text-[0.7rem] font-normal leading-relaxed text-[#374151] xl:text-xs">
                    We do a soft pull which <span className="font-bold">does not</span> affect your credit score. We use 256-bit SSL technology to encrypt your data.
                  </p>
                </div>
                <TextInput
                  id="ssn"
                  name="ssn"
                  data-arohaa-field="ssn"
                  inputMode="numeric"
                  autoComplete="off"
                  value={formatSsn(formData.ssn ?? "")}
                  onChange={(e) => handleInputChange("ssn", normalizeSsn(e.target.value))}
                  placeholder="XXX - XX - XXXX"
                  className={INPUT_FIELD}
                  containerClassName="w-full"
                />
                <p className="text-left text-[0.7rem] font-normal leading-relaxed text-[#374151] xl:text-xs">
                  By providing your Social Security Number and clicking "View Offers" below, you authorize Lending for Low Credit and its Marketplace Partners to obtain your consumer credit report from contracted credit bureaus in connection with your request to explore potential lending options and to determine your eligibility for available financial products or services.
                </p>
           
                {submitStatus === "error" && submitError ? (
                  <p className="text-sm text-red-600" role="alert">
                    {submitError}
                  </p>
                ) : null}
              </div>
            </div>
            <nav className="mt-1.5 flex w-full md:max-w-[320px] xl:max-w-[380px] flex-col items-center gap-4 xl:mt-2.5 xl:gap-5">
              <button
                type="submit"
                disabled={!isStepValid() || submitStatus === "loading"}
                className="h-12 w-full cursor-pointer rounded-[10px] bg-[#069773] text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:h-[52px] xl:h-14 xl:text-base"
              >
                {submitStatus === "loading" ? "Submitting..." : "View Offers"}
              </button>
            </nav>
            <div className="mt-2 w-full md:max-w-[320px] xl:max-w-[380px] text-left text-[0.7rem] font-normal leading-relaxed text-[#374151] xl:mt-3 xl:text-xs">
              <p className="mb-2">
                By providing my Social Security Number and clicking on "View Offers" above, I consent, acknowledge, and agree to the following:
              </p>
              <ul className="list-disc space-y-2 pl-4">
                <li>
                  <Link href="/terms-of-use" className="text-[#0035D5] underline">Terms of Service</Link>
                  {", "}
                  <Link href="/privacy-policy" className="text-[#0035D5] underline">Privacy Policy</Link>
                  {", "}
                  <Link href="#" className="text-[#0035D5] underline">Credit Authorization Agreement</Link>
                  {", "}
                  <Link href="#" className="text-[#0035D5] underline">E-Consent</Link>
                  {", "}
                  <Link href="#" className="text-[#0035D5] underline">Arbitration Notice</Link>
                  {", "}
                  <Link href="#" className="text-[#0035D5] underline">Advertiser Disclosure</Link>
                  {", "}
                  <Link href="#" className="text-[#0035D5] underline">Personal Loan Notice</Link>
                  {", and the use of "}
                  <Link href="#" className="text-[#0035D5] underline">Session Replay Technology</Link>
                  {" apply."}
                </li>
                <li>
                  By continuing with the prequalification process, I understand and agree that I am authorizing Lending for Low Credit and its applicable partners to obtain a consumer report from contracted credit bureaus. This information may be used to authenticate my identity, evaluate my request, and connect me with potential financial products or services. Any credit inquiry performed during the prequalification process will be handled according to the applicable credit authorization terms.
                </li>
                <li>
                  I understand that my information may be presented to a marketplace of lenders and/or lending partners. These lenders and/or lending partners may review and verify my information to determine whether I may qualify for available loan products. I acknowledge that lenders, lending partners, and other financial service providers may share information related to my application status, approval status, and funded status as permitted.
                </li>
                <li>
                  I understand that if I am not connected with a lender or lending partner for the requested loan amount, my information may be presented to additional lenders and/or lending partners offering different loan amounts or terms. I also understand that if I am not connected with a lender, I may be presented with other financial service providers offering products related to my selected loan purpose.
                </li>
                <li>
                  I certify that all information provided is true and complete.
                </li>
              </ul>
            </div>
       
            <button
              type="button"
              onClick={handleBack}
              className="mt-2 cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-[#374151] underline transition-opacity hover:opacity-80 xl:mt-3 xl:text-base"
            >
              Back
            </button>
          </section>
        ) : null}


      </form>



      {showSubmissionLoading ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F3F6FA]/95 px-4 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-[20px] border border-[#E5E7EB] bg-white px-8 py-10 shadow-[0_20px_50px_rgba(24,37,66,0.12)]">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#C12026]" />
            <p className="text-sm font-medium text-[#142B4A] md:text-base">Submitting your request...</p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default function Form() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-white">
          <div className="text-base font-semibold text-[#102E50] md:text-lg">Loading...</div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  )
}
