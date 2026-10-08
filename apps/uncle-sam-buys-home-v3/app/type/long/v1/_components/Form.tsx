"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent, type ReactNode } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react"

import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { Button } from "@workspace/ui/components/button"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group"
import { TrustedForm, getCookie, useBrowserPush } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import { trackArohaa } from "@/lib/arohaa"
import { parseAddressComponents, parseCityStateFromPrediction } from "@/lib/parse-place-address"
import { clearFormProgress, saveFormProgress } from "@/lib/form-progress"
import { lookupCityStateByZip } from "@/lib/lookup-zip"
import { PartnersDialog } from "./PartnersDialog"

const ANALYTICS_FLUSH_DELAY_MS = 300
const AROHAA_SUBMITTED_KEY = "arohaa_uncle_sam_v2_submitted"

const STEP_NAMES: Record<number, string> = {
  1: "What type of property are you selling?",
  2: "What's got you thinking about selling?",
  3: "Is the house currently listed with a realtor?",
  4: "When would you like to sell?",
  5: "Roughly where's your credit these days?",
  6: "Nice, almost there. Where's the house?",
  7: "Last step! Where should Uncle Sam send your offer?",
}



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
  leadingIcon,
  showSummary = true,
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
  leadingIcon?: ReactNode
  showSummary?: boolean
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
        { input, types: ["address"], componentRestrictions: { country: "us" } },
        (preds, status) => {
          setIsFetching(false)
          const win = window as unknown as GMapsWindow
          const OK = win.google?.maps?.places?.PlacesServiceStatus?.OK ?? "OK"
          if (status === OK && preds) {
            setPredictions(preds)
            setShowDropdown(true)
          } else {
            setPredictions([])
            setShowDropdown(false)
          }
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
      {label ? <label className={labelClassName}>{label}</label> : null}
      <div className="relative">
        {leadingIcon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#355A89]">
            {leadingIcon}
          </span>
        ) : null}
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (predictions.length > 0) setShowDropdown(true)
          }}
          placeholder={placeholder}
          data-arohaa-field="address"
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
              <p className="text-xs text-[#6B7280] mt-0.5 truncate">{pred.structured_formatting.secondary_text}</p>
            </button>
          ))}
        </div>
      )}

      {showSummary && (city || state || zipCode) ? (
        <p className="text-[0.7rem] xl:text-[0.8rem] mt-2 font-medium text-left text-[#1C1C1C]">
          {[city, state].filter(Boolean).join(", ")}
          {zipCode ? ` ${zipCode}` : ""}
        </p>
      ) : null}
    </div>
  )
}

// --- Form Options ---
const HOW_SOON_TO_SELL_OPTIONS = [
  { id: "financial_hardship", label: "Financial hardship" },
  { id: "property_needs_repairs", label: "Property needs repairs" },
  { id: "downsizing_relocating", label: "Downsizing / Relocating" },
  { id: "research_home_metrics", label: "Research home metrics" },
] as const

const PROPERTY_TYPE_TITLE = "What type of property are you selling?"
const PROPERTY_TYPE_OPTIONS = [
  { id: "single_family", label: "Single Family Home" ,Icon: "/icon-1.svg"},
  { id: "condo_townhome", label: "Condo / Townhome" ,Icon: "/icon-2.svg"},
  { id: "other", label: "Other Property Type" ,Icon: "/icon-3.svg"},
] as const

const HOW_SOON_TO_SELL_TITLE = "What's got you thinking about selling?"

const LISTED_WITH_REALTOR_TITLE = "Is the house currently listed with a realtor?"
const LISTED_WITH_REALTOR_DESCRIPTION =
  "Either answer is fine. Uncle Sam needs to know who to talk to."
const LISTED_WITH_REALTOR_OPTIONS = [
  { id: "no", label: "No" },
  { id: "yes", label: "Yes" },
] as const

const WHEN_TO_SELL_TITLE = "When would you like to sell?"
const WHEN_TO_SELL_OPTIONS = [
  { id: "asap", label: "ASAP" },
  { id: "2_3_months", label: "2–3 months" },
  { id: "6_months", label: "6 months" },
] as const

const CREDIT_SCORE_TITLE = "Roughly where's your credit these days?"
const CREDIT_SCORE_DESCRIPTION =
  "A ballpark is fine. It doesn't change Uncle Sam's cash offer."
const CREDIT_SCORE_OPTIONS = [
  { id: "excellent", label: "Excellent", description: "701 or higher" },
  { id: "good", label: "Good", description: "640–700" },
  { id: "fair", label: "Fair", description: "560–639" },
  { id: "poor", label: "Poor", description: "559 or lower" },
] as const

const ADDRESS_STEP_TITLE = "Nice, almost there. Where's the house?"
const ADDRESS_MANUAL_HELPER =
  "Enter the ZIP and Uncle Sam fills in the city and state."
const CONTACT_STEP_TITLE = "Last step! Where should Uncle Sam send your offer?"
const ADDRESS_FIELD_LABEL =
  "mb-1.5 block w-full text-left text-[0.8rem] font-semibold text-[#182542] xl:text-base"

const SELL_HOUSE_FOR_CASH_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
] as const

const OFFER_CARD_SHELL =
  "flex w-full flex-col items-center gap-6 lg:gap-7 xl:gap-9 rounded-[10px] border border-[#E2E8F0] bg-[#ECF1FB] shadow-[0_0_6px_0_rgba(16,46,80,0.15)] px-5 py-6 md:py-8 md:px-9 xl:py-10"
const INPUT_CARD_SHELL =
  "flex w-full flex-col items-center gap-4 md:gap-5  xl:gap-6 rounded-[10px] border border-[#E2E8F0] bg-[#ECF1FB] shadow-[0_0_6px_0_rgba(16,46,80,0.15)] px-5 py-6 md:py-8 md:px-9 lg:px-9 xl:px-11 xl:py-10"
const OFFER_CARD_TITLE =
  "text-center font-sans text-base  xl:text-[1.4rem] font-semibold text-[#182542]"
const OFFER_CARD_DESCRIPTION =
  "text-center font-sans text-[0.8rem] font-medium text-[#4B5563] xl:text-[0.95rem]"
const OFFER_CHOICE_BTN =
  "w-full flex h-14 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-5 py-0 font-semibold text-[0.85rem] font-inherit text-[#3E3E3F] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 md:py-3.5 md:flex-1 xl:h-18.5 xl:py-4 lg:text-sm xl:text-lg border border-[#C12026]"

const OFFER_CHOICE_LABEL_WRAP =
  "w-full px-0.5 text-center text-[0.85rem] lg:text-sm xl:text-lg font-semibold text-[#3E3E3F] whitespace-normal md:px-0  leading-snug"

const STEP_RADIO_OPTION_CLASS = [
  OFFER_CHOICE_BTN,
  "!justify-start bg-white hover:bg-[#fde9ea] hover:border-[#C12026] hover:text-[#3E3E3F] md:!flex-none md:!h-full lg:!h-auto lg:!min-h-[3.5rem] xl:!min-h-[4.5rem]",
  ...OFFER_CHOICE_LABEL_WRAP.split(/\s+/).filter(Boolean).map(
    (cls) => `[&>span:last-child]:${cls}`
  ),
  "[&>span:last-child]:!text-left",
].join(" ")

const INPUT_CONTAINER = "w-full"
const INPUT_FIELD =
  "h-14 w-full min-w-0 rounded-[10px] border border-[#CCCCCF] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] shadow-none outline-none transition-[color,box-shadow] focus-visible:border-[#102E50] focus-visible:ring-[3px] focus-visible:ring-[#102E50]/25 xl:h-15 xl:text-base"

type HowSoonToSellTypeId = (typeof HOW_SOON_TO_SELL_OPTIONS)[number]["id"] | ""
type PropertyTypeId = (typeof PROPERTY_TYPE_OPTIONS)[number]["id"] | ""
type ListedWithRealtorTypeId = (typeof LISTED_WITH_REALTOR_OPTIONS)[number]["id"] | ""
type WhenToSellTypeId = (typeof WHEN_TO_SELL_OPTIONS)[number]["id"] | ""
type CreditScoreTypeId = (typeof CREDIT_SCORE_OPTIONS)[number]["id"] | ""
type SellHouseForCashTypeId = (typeof SELL_HOUSE_FOR_CASH_OPTIONS)[number]["id"]



const TOTAL_STEPS = 7

const defaultFormData = {
  howSoonToSell: "" as HowSoonToSellTypeId,
  zipCode: "",
  propertyType: "" as PropertyTypeId,
  sellHouseForCash: "yes" as SellHouseForCashTypeId,
  whenToSell: "" as WhenToSellTypeId,
  creditScore: "" as CreditScoreTypeId,
  listedWithRealtor: "" as ListedWithRealtorTypeId,
  repairsAndMaintenance: "none",
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  street_address: "",
  city: "",
  state: "",
}

type FormNavigationProps = {
  showNext?: boolean
  isNextDisabled?: boolean
  nextLabel?: string
  showNextIcon?: boolean
  fullWidth?: boolean
  onNext: () => void
}

function FormNavigation({
  showNext = true,
  isNextDisabled = false,
  nextLabel = "Next",
  showNextIcon = false,
  fullWidth = false,
  onNext,
}: FormNavigationProps) {
  return (
    <nav className={`flex w-full flex-col items-center gap-4 md:gap-5 ${fullWidth ? "" : "max-w-lg"}`}>
      {showNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className={`${fullWidth ? "w-full" : "w-full md:w-45 xl:w-47"} inline-flex h-13 xl:h-16 items-center justify-center gap-2 rounded-[10px] bg-[#102E50] cursor-pointer py-3 xl:py-4 text-[0.9rem] font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:text-[1.1rem]`}
        >
          {nextLabel}
          {showNextIcon ? <ArrowRight className="size-4.5 xl:size-5 shrink-0" aria-hidden /> : null}
        </button>

      ) : null}

    </nav>
  )
}

const FORM_BACK_BTN_CLASS =
  "absolute left-5 top-5 md:left-6 md:top-6   xl:left-8 xl:top-6.5 gap-1 flex items-center gap-0.5 border-0 bg-transparent p-0 text-sm font-semibold text-[#355A89] cursor-pointer  xl:text-lg"

function FormBackButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <button type="button" onClick={onClick} className={FORM_BACK_BTN_CLASS}>
        <ChevronLeft className="size-5 xl:size-5.5 shrink-0" aria-hidden />
        Back
      </button>
      <div className="w-full shrink-0 pt-4 md:pt-3 lg:pt-2 xl:pt-2 " aria-hidden />
    </>
  )
}

function FormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { enablePush, reportPushEvent, setPushContext } = useBrowserPush()
  const [formData, setFormData] = useState(defaultFormData)

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({})
  const [partnersOpen, setPartnersOpen] = useState(false)
  const [addressEntryMode, setAddressEntryMode] = useState<"search" | "manual">("search")

  useEffect(() => {
    trackArohaa("form_start")
  }, [])

  useEffect(() => {
    trackArohaa("form_step_view", {
      step: currentStep,
      step_name: STEP_NAMES[currentStep] ?? `Step ${currentStep}`,
    })
    saveFormProgress(currentStep)
    setPushContext({
      step: currentStep,
      zip: formData.zipCode.trim() || undefined,
    })
  }, [currentStep, formData.zipCode, setPushContext])

  function goToStep(nextStep: number) {
    setCurrentStep(nextStep)
    saveFormProgress(nextStep)
  }

  function handleBack() {
    if (currentStep <= 1) return
    goToStep(currentStep - 1)
  }

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    if (field === "street_address") {
      setFormData((prev) => ({
        ...prev,
        street_address: value,
        ...(value.trim() === "" && addressEntryMode === "search"
          ? { city: "", state: "", zipCode: "" }
          : {}),
      }))
      return
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleZipChange = (value: string) => {
    const zip = normalizeZip(value)
    setFormData((prev) => ({ ...prev, zipCode: zip }))
    if (zip.length !== 5) return
    void lookupCityStateByZip(zip).then(({ city, state }) => {
      if (!city && !state) return
      setFormData((prev) => ({
        ...prev,
        zipCode: zip,
        ...(city ? { city } : {}),
        ...(state ? { state } : {}),
      }))
    })
  }

  const isStepValid = () => {
    if (currentStep === 6) {
      return (
        formData.street_address.trim() !== "" &&
        normalizeZip(formData.zipCode).length === 5
      )
    }
    if (currentStep === TOTAL_STEPS) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return (
        formData.first_name.trim() !== "" &&
        formData.last_name.trim() !== "" &&
        formData.email.trim() !== "" &&
        emailRegex.test(formData.email.trim()) &&
        formData.phone_number.trim() !== ""
      )
    }
    return true
  }

  const handleNext = () => {
    if (!isStepValid() || currentStep >= TOTAL_STEPS) return
    goToStep(currentStep + 1)
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
    if (currentStep === 6 && isStepValid()) {
      handleNext()
    }
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      if (currentStep === 6 && isStepValid()) {
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
      !formData.street_address.trim() ||
      !email ||
      !emailRegex.test(email) ||
      !formData.phone_number.trim() ||
      zip.length !== 5
    ) {
      setSubmitStatus("error")
      setSubmitError(
        zip.length !== 5
          ? "Please select a street address from the suggestions so we can detect your ZIP code."
          : "Please complete all required fields with valid details."
      )
      return
    }

    setSubmitStatus("loading")
    void enablePush()

    const form = e.currentTarget
    const certInput = form.elements.namedItem("xxTrustedFormCertUrl") as HTMLInputElement | null
    const tokenInput = form.elements.namedItem("xxTrustedFormToken") as HTMLInputElement | null

    const payload = {
      howSoonToSell: formData.howSoonToSell,
      zipCode: zip,
      sellHouseForCash: formData.sellHouseForCash,
      whenToSell: formData.whenToSell,
      creditScore: formData.creditScore,
      listedWithRealtor: formData.listedWithRealtor,
      repairsAndMaintenance: formData.repairsAndMaintenance,
      firstName: formData.first_name.trim(),
      lastName: formData.last_name.trim(),
      address: formData.street_address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phone_number.trim(),
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
        const fieldHint = (data as { field?: string }).field
        if (fieldHint === "email" || (data as { invalidField?: string }).invalidField === "email") {
          setFieldErrors({ email: errorMsg })
          setSubmitStatus("error")
          setSubmitError(errorMsg)
          setCurrentStep(6)
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

      if (data.success && typeof data.redirectUrl === "string") {
        trackArohaa("form_submit")
        clearFormProgress()
        void reportPushEvent("form_success", {
          step: currentStep,
          zip: zip || undefined,
        })
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

  return (
    <section className="flex w-full min-h-[220px] flex-col items-center md:min-h-[190px] xl:min-h-[250px] ">
      <div className="flex w-full flex-col items-center gap-6 xl:gap-5">
        <form
          id="lead-form"
          onSubmit={handleLeadSubmit}
          onKeyDown={handleFormKeyDown}
          noValidate
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 xl:gap-10 "
        >
          <ProgressBar
            type="8"
            className="!mb-0 w-full md:!mb-0 md:max-w-[530px] lg:max-w-[570px] xl:max-w-[720px]"
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            backgroundColor="#C1202633"
            foregroundColor="#C12026"
            
          />

          <TrustedForm />

          {currentStep === 1 ? (
            <div className="flex w-full items-center justify-center md:max-w-[530px] lg:max-w-[570px] xl:max-w-[720px]">
              <section
                className={OFFER_CARD_SHELL}
                data-arohaa-step="1"
                data-arohaa-step-name={STEP_NAMES[1]}
              >
                <p className={OFFER_CARD_TITLE}>{PROPERTY_TYPE_TITLE}</p>
                <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-3.5 xl:gap-4.5">
                  {PROPERTY_TYPE_OPTIONS.map(({ id, label, Icon }) => {
                    const selected = formData.propertyType === id

                    return (
                      <Button
                        key={id}
                        type="1"
                        variant="default"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, propertyType: id }))
                          goToStep(2)
                        }}
                        aria-pressed={selected}
                        className={`w-full flex h-auto min-h-[4.75rem] md:min-h-[4.8rem] xl:min-h-[5.9rem] shrink-0 cursor-pointer items-stretch justify-start gap-0 overflow-hidden rounded-[10px] border border-[#C12026] p-0 font-semibold text-[0.85rem] font-inherit text-[#3E3E3F] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 lg:text-sm xl:text-lg ${selected ? "" : "bg-white hover:bg-[#fde9ea] hover:text-[#3E3E3F]"}`}
                        style={
                          selected
                            ? {
                              background:
                                "linear-gradient(0deg, rgba(193, 32, 38, 0.10) 0%, rgba(193, 32, 38, 0.10) 100%), #FFF",
                            }
                            : undefined
                        }
                      >
                        <span className="flex w-[37%] md:w-[25%] xl:w-[23%] shrink-0 items-center justify-center self-stretch  pl-3">
                          <Image
                            src={Icon}
                            alt=""
                            width={120}
                            height={90}
                            className="h-15 w-auto max-h-full max-w-full object-contain md:h-16 xl:h-21"
                          />
                        </span>
                        <span className="flex flex-1 items-center px-3 py-3 text-left text-[0.85rem] md:text-sm xl:text-lg font-semibold text-[#3E3E3F] whitespace-normal leading-snug">
                          {label}
                        </span>
                      </Button>
                    )
                  })}
                </div>
              </section>
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="flex w-full items-center justify-center md:max-w-[530px] lg:max-w-[570px] xl:max-w-[720px]">
              <section
                className={`${OFFER_CARD_SHELL} relative`}
                data-arohaa-step="2"
                data-arohaa-step-name={STEP_NAMES[2]}
              >
                <FormBackButton onClick={handleBack} />
                <p className={OFFER_CARD_TITLE}>{HOW_SOON_TO_SELL_TITLE}</p>
                <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-3.5 xl:gap-4.5">
                  <RadioButtonGroup
                    name="howSoonToSell"
                    type="1"
                    layout="column"
                    value={formData.howSoonToSell}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        howSoonToSell: value as HowSoonToSellTypeId,
                      }))
                      goToStep(3)
                    }}
                    options={HOW_SOON_TO_SELL_OPTIONS.map(({ id, label }) => ({
                      value: id,
                      label,
                    }))}
                    containerClassName="w-full space-y-0"
                    className="w-full !flex-col gap-3 md:!grid md:grid-cols-2 md:gap-3.5 xl:gap-4.5"
                    optionClassName={STEP_RADIO_OPTION_CLASS}
                    selectedOptionBackgroundColor="rgba(193, 32, 38, 0.10)"
                    selectedOptionBorderColor="#C12026"
                    selectedIndicatorColor="#C12026"
                  />
                </div>
              </section>
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="flex w-full items-center justify-center md:max-w-[530px] lg:max-w-[570px] xl:max-w-[720px]">
              <section
                className={`${OFFER_CARD_SHELL} relative`}
                data-arohaa-step="3"
                data-arohaa-step-name={STEP_NAMES[3]}
              >
                <FormBackButton onClick={handleBack} />
                <p className={OFFER_CARD_TITLE}>{LISTED_WITH_REALTOR_TITLE}</p>
                <div className="flex w-full flex-col items-center justify-center gap-4 md:gap-5 xl:gap-6.5">
                  <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-3.5 xl:gap-4.5">
                    <RadioButtonGroup
                      name="listedWithRealtor"
                      type="1"
                      layout="column"
                      value={formData.listedWithRealtor}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          listedWithRealtor: value as ListedWithRealtorTypeId,
                        }))
                        goToStep(4)
                      }}
                      options={LISTED_WITH_REALTOR_OPTIONS.map(({ id, label }) => ({
                        value: id,
                        label,
                      }))}
                      containerClassName="w-full space-y-0"
                      className="w-full !flex-col gap-3 md:!grid md:grid-cols-2 md:gap-3.5 xl:gap-4.5"
                      optionClassName={STEP_RADIO_OPTION_CLASS}
                      selectedOptionBackgroundColor="rgba(193, 32, 38, 0.10)"
                      selectedOptionBorderColor="#C12026"
                      selectedIndicatorColor="#C12026"
                    />
                  </div>
                  <p className={`${OFFER_CARD_DESCRIPTION} !text-left w-full`}>
                    {LISTED_WITH_REALTOR_DESCRIPTION}
                  </p>
                </div>
              </section>
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="flex w-full items-center justify-center md:max-w-[530px] lg:max-w-[570px] xl:max-w-[720px]">
              <section
                className={`${OFFER_CARD_SHELL} relative`}
                data-arohaa-step="4"
                data-arohaa-step-name={STEP_NAMES[4]}
              >
                <FormBackButton onClick={handleBack} />
                <p className={OFFER_CARD_TITLE}>{WHEN_TO_SELL_TITLE}</p>
                <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-3.5 xl:gap-4.5">
                  <RadioButtonGroup
                    name="whenToSell"
                    type="1"
                    layout="column"
                    value={formData.whenToSell}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        whenToSell: value as WhenToSellTypeId,
                      }))
                      goToStep(5)
                    }}
                    options={WHEN_TO_SELL_OPTIONS.map(({ id, label }) => ({
                      value: id,
                      label,
                    }))}
                    containerClassName="w-full space-y-0"
                    className="w-full !flex-col gap-3 md:!grid md:grid-cols-2 md:gap-3.5 xl:gap-4.5"
                    optionClassName={STEP_RADIO_OPTION_CLASS}
                    selectedOptionBackgroundColor="rgba(193, 32, 38, 0.10)"
                    selectedOptionBorderColor="#C12026"
                    selectedIndicatorColor="#C12026"
                  />
                </div>
              </section>
            </div>
          ) : null}



          {currentStep === 5 ? (
            <div className="flex w-full items-center justify-center md:max-w-[530px] lg:max-w-[570px] xl:max-w-[720px]">
              <section
                className={`${OFFER_CARD_SHELL} relative`}
                data-arohaa-step="5"
                data-arohaa-step-name={STEP_NAMES[5]}
              >
                <FormBackButton onClick={handleBack} />
                <p className={OFFER_CARD_TITLE}>{CREDIT_SCORE_TITLE}</p>
                <div className="flex w-full flex-col items-center justify-center  gap-4 md:gap-5 xl:gap-6.5">
                  <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-3.5 xl:gap-4.5">
                    <RadioButtonGroup
                      name="creditScore"
                      type="1"
                      layout="column"
                      value={formData.creditScore}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          creditScore: value as CreditScoreTypeId,
                        }))
                        goToStep(6)
                      }}
                      options={CREDIT_SCORE_OPTIONS.map(({ id, label, description }) => ({
                        value: id,
                        label,
                        description,
                      }))}
                      containerClassName="w-full space-y-0"
                      className="w-full !flex-col gap-3 md:!grid md:grid-cols-2 md:gap-3.5 xl:gap-4.5"
                      optionClassName={`${STEP_RADIO_OPTION_CLASS} [&>span:last-child>span:last-child]:!text-[0.75rem] md:[&>span:last-child>span:last-child]:!text-[0.8rem] xl:[&>span:last-child>span:last-child]:!text-[0.9rem]`}
                      selectedOptionBackgroundColor="rgba(193, 32, 38, 0.10)"
                      selectedOptionBorderColor="#C12026"
                      selectedIndicatorColor="#C12026"
                    />
                  </div>
                  <p className={`${OFFER_CARD_DESCRIPTION} !text-left w-full`}>
                    {CREDIT_SCORE_DESCRIPTION}
                  </p>
                </div>
              </section>
            </div>
          ) : null}

          {currentStep === 6 ? (
            <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
              <section
                className={`${INPUT_CARD_SHELL} relative`}
                data-arohaa-step="6"
                data-arohaa-step-name={STEP_NAMES[6]}
              >
                <FormBackButton onClick={handleBack} />
                <p className={OFFER_CARD_TITLE}>{ADDRESS_STEP_TITLE}</p>

                {addressEntryMode === "search" ? (
                  <div className="flex w-full flex-col items-center justify-center gap-5 md:gap-6 xl:gap-7">
                    <div className="w-full">
                      <AddressAutocomplete
                        label="Property address"
                        value={formData.street_address}
                        city={formData.city}
                        state={formData.state}
                        zipCode={formData.zipCode}
                        onChange={(v) => handleInputChange("street_address", v)}
                        onSelect={(result) => {
                          setFormData((prev) => ({
                            ...prev,
                            street_address: result.streetAddress,
                            city: result.city,
                            state: result.state,
                            zipCode: result.zipCode,
                          }))
                        }}
                        placeholder="Start typing your street address"
                        labelClassName={ADDRESS_FIELD_LABEL}
                        leadingIcon={<MapPin className="size-5 xl:size-5.5 shrink-0" aria-hidden />}
                        showSummary={false}
                        className={`${INPUT_FIELD} pl-10 xl:pl-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setAddressEntryMode("manual")}
                        className="mt-6.5 xl:mt-7 border-0 bg-transparent p-0 text-left text-[0.8rem] font-semibold text-[#355A89] underline cursor-pointer xl:text-base"
                      >
                        Can&apos;t find it? Enter the address manually
                      </button>
                    </div>
                    <FormNavigation
                      showNext
                      fullWidth
                      showNextIcon
                      nextLabel="Continue"
                      isNextDisabled={!isStepValid()}
                      onNext={handleNext}
                    />
                  </div>
                ) : (
                  <div className="flex w-full flex-col items-center justify-center gap-5 md:gap-6 xl:gap-7">
                    <div className="flex w-full flex-col  gap-3 md:gap-3.5">
                      <div className="w-full">
                        <label htmlFor="manualStreet" className={ADDRESS_FIELD_LABEL}>
                          Street address
                        </label>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#355A89]">
                            <MapPin className="size-5 xl:size-5.5 shrink-0" aria-hidden />
                          </span>
                          <TextInput
                            id="manualStreet"
                            data-arohaa-field="address"
                            containerClassName={INPUT_CONTAINER}
                            value={formData.street_address}
                            onChange={(e) => handleInputChange("street_address", e.target.value)}
                            placeholder="123 Main St"
                            className={`${INPUT_FIELD} pl-10 xl:pl-11`}
                          />
                        </div>
                      </div>

                      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-3.5">
                        <div className="w-full min-w-0">
                          <label htmlFor="manualZip" className={ADDRESS_FIELD_LABEL}>
                            ZIP
                          </label>
                          <TextInput
                            id="manualZip"
                            data-arohaa-field="zipCode"
                            containerClassName={INPUT_CONTAINER}
                            value={formData.zipCode}
                            onChange={(e) => handleZipChange(e.target.value)}
                            placeholder="93950"
                            inputMode="numeric"
                            maxLength={5}
                            className={INPUT_FIELD}
                          />
                        </div>
                        <div className="w-full min-w-0">
                          <label htmlFor="manualCity" className={ADDRESS_FIELD_LABEL}>
                            City
                          </label>
                          <TextInput
                            id="manualCity"
                            data-arohaa-field="city"
                            containerClassName={INPUT_CONTAINER}
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="City"
                            className={INPUT_FIELD}
                          />
                        </div>
                        <div className="w-full min-w-0">
                          <label htmlFor="manualState" className={ADDRESS_FIELD_LABEL}>
                            State
                          </label>
                          <TextInput
                            id="manualState"
                            data-arohaa-field="state"
                            containerClassName={INPUT_CONTAINER}
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            placeholder="CA"
                            className={INPUT_FIELD}
                          />
                        </div>
                      </div>

                      <p className={`${OFFER_CARD_DESCRIPTION} !text-left w-full`}>
                        {ADDRESS_MANUAL_HELPER}
                      </p>
                      <button
                        type="button"
                        onClick={() => setAddressEntryMode("search")}
                        className="mt-2 border-0 bg-transparent p-0 text-left text-[0.8rem] font-semibold text-[#355A89] underline cursor-pointer xl:text-base"
                      >
                        Search for the address instead
                      </button>
                    </div>

                    <FormNavigation
                      showNext
                      fullWidth
                      showNextIcon
                      nextLabel="Continue"
                      isNextDisabled={!isStepValid()}
                      onNext={handleNext}
                    />
                  </div>
                )}
              </section>
            </div>
          ) : null}

          {currentStep === TOTAL_STEPS ? (
            <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
              <section
                className={`${INPUT_CARD_SHELL} relative`}
                data-arohaa-step="7"
                data-arohaa-step-name={STEP_NAMES[7]}
              >
                <FormBackButton onClick={handleBack} />
                <p className={OFFER_CARD_TITLE}>{CONTACT_STEP_TITLE}</p>

                <div className="flex w-full flex-col items-center justify-center gap-5 md:gap-6 xl:gap-7">
                  <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-3.5">
                    <div className="w-full min-w-0">
                      <label htmlFor="step7FirstName" className={ADDRESS_FIELD_LABEL}>
                        First name
                      </label>
                      <TextInput
                        id="step7FirstName"
                        data-arohaa-field="firstName"
                        containerClassName={INPUT_CONTAINER}
                        value={formData.first_name}
                        onChange={(e) => handleInputChange("first_name", e.target.value)}
                        placeholder="Jane"
                        className={INPUT_FIELD}
                      />
                    </div>
                    <div className="w-full min-w-0">
                      <label htmlFor="step7LastName" className={ADDRESS_FIELD_LABEL}>
                        Last name
                      </label>
                      <TextInput
                        id="step7LastName"
                        data-arohaa-field="lastName"
                        containerClassName={INPUT_CONTAINER}
                        value={formData.last_name}
                        onChange={(e) => handleInputChange("last_name", e.target.value)}
                        placeholder="Doe"
                        className={INPUT_FIELD}
                      />
                    </div>
                    <div className="w-full min-w-0">
                      <label htmlFor="email" className={ADDRESS_FIELD_LABEL}>
                        Email
                      </label>
                      <TextInput
                        id="email"
                        type="email"
                        data-arohaa-field="email"
                        containerClassName={INPUT_CONTAINER}
                        value={formData.email}
                        onChange={(e) => {
                          handleInputChange("email", e.target.value)
                          if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }))
                        }}
                        placeholder="jane@example.com"
                        className={`${INPUT_FIELD} ${fieldErrors.email ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25" : ""}`}
                      />
                      {fieldErrors.email ? (
                        <p className="mt-1 text-xs text-red-600" role="alert">
                          {fieldErrors.email}
                        </p>
                      ) : null}
                    </div>
                    <div className="w-full min-w-0">
                      <label htmlFor="phoneNumber" className={ADDRESS_FIELD_LABEL}>
                        Phone
                      </label>
                      <PhoneNumberInput
                        id="phoneNumber"
                        label=""
                        data-arohaa-field="phoneNumber"
                        containerClassName={INPUT_CONTAINER}
                        value={formData.phone_number}
                        onChange={(v) => {
                          handleInputChange("phone_number", v)
                          if (fieldErrors.phone) setFieldErrors((p) => ({ ...p, phone: undefined }))
                        }}
                        placeholder="(555) 555-5555"
                        labelClassName="sr-only"
                        className={`${INPUT_FIELD} ${fieldErrors.phone ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25" : ""}`}
                      />
                      {fieldErrors.phone ? (
                        <p className="mt-1 text-xs text-red-600" role="alert">
                          {fieldErrors.phone}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {submitStatus === "error" && submitError ? (
                    <p className="w-full text-sm text-red-600" role="alert">
                      {submitError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={!isStepValid() || submitStatus === "loading"}
                    className="inline-flex h-13 xl:h-16 w-full items-center justify-center gap-2 rounded-[10px] bg-[#102E50] py-3 xl:py-4 text-[0.9rem] font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:text-[1.1rem]"
                  >
                    {submitStatus === "loading" ? "Submitting..." : "Get My Cash Offer"}
                    {submitStatus !== "loading" ? (
                      <ArrowRight className="size-4.5 xl:size-5 shrink-0" aria-hidden />
                    ) : null}
                  </button>

                  <p className="w-full text-left text-[0.7rem] font-normal leading-relaxed text-[#4B5563] xl:text-[0.85rem]">
                    By clicking &quot;Get My Cash Offer&quot; you electronically sign (pursuant to the ESIGN Act) and agree: to share your information with up to{" "}
                    <button
                      type="button"
                      onClick={() => setPartnersOpen(true)}
                      className="inline cursor-pointer border-0 bg-transparent p-0 font-normal text-[#3399FF] underline"
                    >
                      2 partners
                    </button>
                    ; that you are providing your prior express written consent for those{" "}
                    <button
                      type="button"
                      onClick={() => setPartnersOpen(true)}
                      className="inline cursor-pointer border-0 bg-transparent p-0 font-normal text-[#3399FF] underline"
                    >
                      partners
                    </button>{" "}
                    to contact you at the telephone number you provided (including through an automatic telephone dialing system, pre-recorded or artificial voice, AI, SMS and MMS) even if your telephone number is listed on any state, federal or corporate Do Not Call list; you agree to our{" "}
                    <a
                      href="/terms-of-use"
                      className="font-normal text-[#3399FF] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Use
                    </a>
                    , including its{" "}
                    <a
                      href="/terms-of-use#dispute-resolution"
                      className="font-normal text-[#3399FF] underline"
                    >
                      Arbitration provision
                    </a>
                    , and{" "}
                    <a
                      href="/privacy-policy"
                      className="font-normal text-[#3399FF] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    ; and that we can use your data for marketing and analytics. Your consent, and e-signature, is not a condition of accessing our services, as you may email{" "}
                    <a
                      href="mailto:consent@unclesambuyshomes.com"
                      className="font-normal text-[#3399FF] underline"
                    >
                      consent@unclesambuyshomes.com
                    </a>{" "}
                    and you can revoke your consent at any time by emailing us.
                  </p>
                </div>
              </section>
            </div>
          ) : null}


        </form>

        <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3.5 md:gap-x-8 xl:gap-x-10 ">
          {HERO_CONTENT.badges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 xl:gap-2.5">
              <Image
                src={badge.icon}
                alt=""
                width={18}
                height={18}
                className="size-[20px] md:size-[23px]  xl:size-[28px] shrink-0 object-contain"
              />
              <span className="text-[0.8rem] md:text-[0.8rem] xl:text-[1rem] font-semibold uppercase leading-tight tracking-wide text-[#182542]">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <PartnersDialog isOpen={partnersOpen} onClose={() => setPartnersOpen(false)} />

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
      <FormPage />
    </Suspense>
  )
}
