"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { Button } from "@workspace/ui/components/button"
import { TrustedForm, getCookie } from "@workspace/lp-core"
import { OFFER_CONTENT } from "@/lib/constant"



// --- Google Maps Places types (minimal) ---
type GMapsPlacePrediction = {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
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

// --- Google Places Autocomplete Component ---
function AddressAutocomplete({
  value,
  city,
  state,
  onChange,
  onSelect,
  label,
  placeholder,
  labelClassName,
  className,
}: {
  value: string
  city: string
  state: string
  onChange: (v: string) => void
  onSelect: (result: AddressResult) => void
  label: string
  placeholder: string
  labelClassName?: string
  className?: string
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
    onChange(pred.structured_formatting.main_text)
    if (!placesRef.current) return
    placesRef.current.getDetails(
      { placeId: pred.place_id, fields: ["address_components"] },
      (place) => {
        if (!place?.address_components) return
        let streetNumber = ""
        let route = ""
        let parsedCity = ""
        let parsedState = ""
        let parsedZip = ""
        for (const c of place.address_components) {
          if (c.types.includes("street_number")) streetNumber = c.long_name
          if (c.types.includes("route")) route = c.long_name
          if (c.types.includes("locality")) parsedCity = c.long_name
          if (c.types.includes("sublocality_level_1") && !parsedCity) parsedCity = c.long_name
          if (c.types.includes("administrative_area_level_1")) parsedState = c.short_name
          if (c.types.includes("postal_code")) parsedZip = c.long_name
        }
        const streetAddress = streetNumber ? `${streetNumber} ${route}` : route
        onChange(streetAddress)
        onSelect({ streetAddress, city: parsedCity, state: parsedState, zipCode: parsedZip })
      }
    )
  }

  return (
    <div className="w-full relative" ref={containerRef}>
      <label className={labelClassName}>{label}</label>
      <div className="relative">
        <input
          type="text"
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
              <p className="text-xs text-[#6B7280] mt-0.5 truncate">{pred.structured_formatting.secondary_text}</p>
            </button>
          ))}
        </div>
      )}

      {city && state && (
        <p className="text-[0.7rem] xl:text-[0.8rem] mt-2 font-medium text-left text-[#1C1C1C]">
          {city}, {state}
        </p>
      )}
    </div>
  )
}

// --- Form Options ---
const HOW_SOON_TO_SELL_OPTIONS = [
  { id: "asap", label: "ASAP" },
  { id: "within_30_days", label: "Within 30 Days" },
  { id: "within_60_days", label: "Within 60 Days" },
  { id: "within_90_days", label: "Within 90 Days" },
  { id: "no_timeline", label: "No Timeline" },
] as const

const HOW_SOON_TO_SELL_TITLE = "How soon would you like to sell?"

const REPAIRS_AND_MAINTENANCE_TITLE = "What kind of repairs and maintenance does the house need?"

const SELL_HOUSE_TITLE = "Why are you selling your house?"

const REPAIRS_AND_MAINTENANCE_OPTIONS = [
  { id: "full_gut", label: "Full Gut - Everything - $$$$", Icon: "/house.svg" },
  { id: "remodel", label: "Remodel - Kitchen, Bathrooms, Roof - $$$", Icon: "/broken-home.svg" },
  { id: "cosmetic", label: "Cosmetic - Flooring, Paint - $$", Icon: "/home-renovation.svg" },
  { id: "none", label: "None - TV Commercial Ready - $", Icon: "/happy-house.svg" },
] as const

const SELL_HOUSE_FOR_CASH_OPTIONS = [
  { id: "yes", label: "Yes", Icon: "/yes.svg" },
  { id: "no", label: "No", Icon: "/no.svg" },
] as const

const SELL_HOUSE_OPTIONS = [
  { id: "structural_damage", label: "Structural/Fire/Water Damage" },
  { id: "relocating", label: "Relocating" },
  { id: "emergency", label: "Emergency Reasons" },
  { id: "divorce", label: "Divorce" },
  { id: "no_agent", label: "Sell Without Real Estate Agent" },
  { id: "foreclosure", label: "Foreclosure" },
] as const

const OFFER_CARD_SHELL =
  "flex w-full flex-col items-center gap-6 lg:gap-7 xl:gap-9 rounded-[10px] border border-[#E2E8F0] bg-[#ECF1FB] shadow-[0_0_6px_0_rgba(16,46,80,0.15)] px-5 py-6 md:py-8 md:px-12 lg:px-16 xl:px-20 xl:py-10"
const INPUT_CARD_SHELL =
  "flex w-full flex-col items-center gap-4 md:gap-5  xl:gap-6 rounded-[10px] border border-[#E2E8F0] bg-[#ECF1FB] shadow-[0_0_6px_0_rgba(16,46,80,0.15)] px-5 py-6 md:py-8 md:px-9 lg:px-9 xl:px-11 xl:py-10"
const OFFER_CARD_TITLE =
  "text-center font-sans text-base  xl:text-xl font-semibold text-[#182542]"
const OFFER_CARD_DESCRIPTION =
  "text-center font-sans text-[0.8rem]  text-[#4B5563] xl:text-[0.95rem]"
const OFFER_CHOICE_BTN =
  "w-full flex h-13 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-5 py-0 font-semibold text-[0.85rem] font-inherit text-[#3E3E3F] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 md:py-3.5 md:flex-1 xl:h-18.5 xl:py-4 lg:text-sm xl:text-lg border border-[#C12026]"

const STEP_SHELL = "mx-auto flex w-full max-w-4xl flex-col items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_WIDE = "mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_VALUE = "mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center md:gap-7 xl:gap-8"
const STEP_SHELL_FIELDS = "mx-auto flex w-full max-w-3xl flex-col gap-5 md:gap-6"
const STEP_TITLE = "text-center text-base font-medium text-[#1C1C1C] xl:text-xl"
const GRID_2 = "grid w-full grid-cols-2 gap-3 md:gap-4 xl:gap-5"
const GRID_SELL = "grid w-full grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 xl:gap-5"
const CHOICE_BTN =
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border border-[#102E50] bg-white px-3 py-5 text-center transition-colors hover:bg-[#fde9ea] md:gap-5 md:px-4 md:py-6 xl:px-6 xl:py-8"
const CHOICE_BTN_MLS =
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border border-[#102E50] bg-white px-3 py-5 text-center transition-colors hover:bg-[#fde9ea] md:gap-5 md:px-4 md:py-7 xl:px-6 xl:py-10"
const CHOICE_ICON = "h-9.5 w-9.5 shrink-0 object-contain md:h-10 md:w-10 xl:h-14 xl:w-14"
const CHOICE_LABEL = "text-[0.85rem] font-semibold leading-normal text-[#343434] xl:text-base"
const INPUT_CONTAINER = "w-full"
const INPUT_FIELD =
  "h-14 w-full min-w-0 rounded-[6px] border border-[#CCCCCF] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] shadow-none outline-none transition-[color,box-shadow] focus-visible:border-[#102E50] focus-visible:ring-[3px] focus-visible:ring-[#102E50]/25 xl:h-15 xl:text-base"
const LABEL_CLASS = "text-sm font-medium text-[#1C1C1C] xl:text-base"

type HowSoonToSellTypeId = (typeof HOW_SOON_TO_SELL_OPTIONS)[number]["id"]
type RepairsAndMaintenanceTypeId = (typeof REPAIRS_AND_MAINTENANCE_OPTIONS)[number]["id"]
type SellHouseForCashTypeId = (typeof SELL_HOUSE_FOR_CASH_OPTIONS)[number]["id"]
type SellHouseTypeId = (typeof SELL_HOUSE_OPTIONS)[number]["id"]

const HOUSE_VALUE_RANGES: { value: string; label: string }[] = [
  { value: "u100", label: "Under $100K" },
  { value: "100_150", label: "$100K to $150K" },
  { value: "150_200", label: "$150K to $200K" },
  { value: "200_250", label: "$200K to $250K" },
  { value: "250_300", label: "$250K to $300K" },
  { value: "300_350", label: "$300K to $350K" },
  { value: "350_400", label: "$350K to $400K" },
  { value: "400_450", label: "$400K to $450K" },
  { value: "450_500", label: "$450K to $500K" },
  { value: "500_550", label: "$500K to $550K" },
  { value: "550_600", label: "$550K to $600K" },
  { value: "600_700", label: "$600K to $700K" },
  { value: "700_800", label: "$700K to $800K" },
  { value: "800_900", label: "$800K to $900K" },
  { value: "900k_1m", label: "$900K to $1M" },
  { value: "1m_1_1", label: "$1M to $1.1M" },
  { value: "1_1_1_2", label: "$1.1M to $1.2M" },
  { value: "1_2_1_3", label: "$1.2M to $1.3M" },
  { value: "1_3_1_4", label: "$1.3M to $1.4M" },
  { value: "1_4_1_5", label: "$1.4M to $1.5M" },
  { value: "1_5m_plus", label: "$1.5M+" },
]

const TOTAL_STEPS = 8

const defaultFormData = {
  howSoonToSell: "asap" as HowSoonToSellTypeId,
  zipCode: "",
  sellHouseForCash: "yes" as SellHouseForCashTypeId,
  sellHouse: "structural_damage" as SellHouseTypeId,
  repairsAndMaintenance: "full_gut" as RepairsAndMaintenanceTypeId,
  houseValueRange: "500_550",
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  street_address: "",
  city: "",
  state: "",
}

type FormNavigationProps = {
  showBack?: boolean
  showNext?: boolean
  isNextDisabled?: boolean
  nextLabel?: string
  onNext: () => void
  onBack: () => void
}

function FormNavigation({
  showBack = false,
  showNext = true,
  isNextDisabled = false,
  nextLabel = "Next",
  onNext,
  onBack,
}: FormNavigationProps) {
  return (
    <nav className="flex w-full max-w-lg flex-col items-center gap-4 md:gap-5">
      {showNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="w-full md:w-45 xl:w-47 rounded-[10px] bg-[#102E50] py-3 xl:py-4 text-base font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:text-[1.05rem]"
        >
          {nextLabel}
        </button>

      ) : null}
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-1.5 text-[0.9rem] font-semibold text-[#47514F] transition-colors hover:text-[#374151] xl:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-[#47514F] lg:h-4.5 lg:w-4.5 xl:h-5 xl:w-5">
            <path d="M6.66667 4.66669C6.66667 4.86669 6.6 5.00002 6.46667 5.13335L3.13333 8.46669C2.86667 8.73335 2.46667 8.73335 2.2 8.46669C1.93333 8.20002 1.93333 7.80002 2.2 7.53335L5.53333 4.20002C5.8 3.93335 6.2 3.93335 6.46667 4.20002C6.6 4.33335 6.66667 4.46669 6.66667 4.66669Z" fill="#47514F" />
            <path d="M6.66667 11.3333C6.66667 11.5333 6.6 11.6667 6.46667 11.8C6.2 12.0667 5.8 12.0667 5.53333 11.8L2.2 8.46667C1.93333 8.2 1.93333 7.8 2.2 7.53333C2.46667 7.26667 2.86667 7.26667 3.13333 7.53333L6.46667 10.8667C6.6 11 6.66667 11.1333 6.66667 11.3333Z" fill="#47514F" />
            <path d="M14 8.00002C14 8.40002 13.7333 8.66669 13.3333 8.66669H2.66667C2.26667 8.66669 2 8.40002 2 8.00002C2 7.60002 2.26667 7.33335 2.66667 7.33335H13.3333C13.7333 7.33335 14 7.60002 14 8.00002Z" fill="#47514F" />
          </svg>
          Back
        </button>
      ) : null}
    </nav>
  )
}

function FormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(defaultFormData)
  const [houseValueIndex, setHouseValueIndex] = useState(() => {
    const idx = HOUSE_VALUE_RANGES.findIndex((r) => r.value === defaultFormData.houseValueRange)
    return idx >= 0 ? idx : 9
  })

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({})

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    if (field === "zipCode") {
      value = value.replace(/\D/g, "").slice(0, 5)
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    if (currentStep === 5) {
      return formData.street_address.trim() !== ""
    }
    if (currentStep === 6) {
      return formData.first_name.trim() !== "" && formData.last_name.trim() !== ""
    }
    if (currentStep === 7) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return formData.email.trim() !== "" && emailRegex.test(formData.email.trim())
    }
    return true
  }

  const handleNext = () => {
    if (!isStepValid() || currentStep >= TOTAL_STEPS) return
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (currentStep <= 1) return
    setCurrentStep((prev) => prev - 1)
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      if (currentStep === 5 && isStepValid()) {
        handleNext()
      } else if (currentStep === 6 && isStepValid()) {
        handleNext()
      } else if (currentStep === 7 && isStepValid()) {
        handleNext()
      }
      return
    }

    setSubmitError("")
    setFieldErrors({})

    const zip = formData.zipCode.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const email = formData.email.trim()

    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.street_address.trim() ||
      !email ||
      !emailRegex.test(email) ||
      !formData.phone_number.trim() ||
      !zip
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
      howSoonToSell: formData.howSoonToSell,
      zipCode: zip,
      sellHouseForCash: formData.sellHouseForCash,
      sellHouse: formData.sellHouse,
      repairsAndMaintenance: formData.repairsAndMaintenance,
      houseValueRange: formData.houseValueRange,
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
        window.location.href = data.redirectUrl
        return
      }

      setSubmitStatus("idle")
    } catch {
      setSubmitStatus("error")
      setSubmitError("Something went wrong. Please try again.")
    }
  }

  return (
    <section className="flex w-full min-h-[200px] flex-col items-center gap-8 md:min-h-[460px] md:gap-10 xl:min-h-[580px] xl:gap-12">


      <form
        onSubmit={handleLeadSubmit}
        noValidate
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 xl:gap-8"
      >

        <TrustedForm />

        {currentStep === 1 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section className={OFFER_CARD_SHELL}>
              <p className={OFFER_CARD_TITLE}>{OFFER_CONTENT.subtitle}</p>
              <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:gap-3.5 xl:gap-4">
                {SELL_HOUSE_FOR_CASH_OPTIONS.map(({ id, label }) => {
                  const selected = formData.sellHouseForCash === id
                  const isYes = id === "yes"

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, sellHouseForCash: id }))
                        setCurrentStep(2)
                      }}
                      aria-pressed={selected}
                      className={`${OFFER_CHOICE_BTN} ${isYes ? "" : "bg-white hover:bg-white hover:text-[#3E3E3F]"}`}
                      style={
                        isYes
                          ? {
                            background:
                              "linear-gradient(0deg, rgba(193, 32, 38, 0.10) 0%, rgba(193, 32, 38, 0.10) 100%), #FFF",
                          }
                          : undefined
                      }
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </section>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section className={OFFER_CARD_SHELL}>
              <p className={OFFER_CARD_TITLE}>{HOW_SOON_TO_SELL_TITLE}</p>
              <div className="flex w-full flex-col items-center justify-center gap-3">
                {HOW_SOON_TO_SELL_OPTIONS.map(({ id, label }) => {
                  const selected = formData.howSoonToSell === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, howSoonToSell: id }))
                        setCurrentStep(3)
                      }}
                      aria-pressed={selected}
                      className={`${OFFER_CHOICE_BTN} ${selected ? "" : "bg-white hover:bg-white hover:text-[#3E3E3F]"}`}
                      style={
                        selected
                          ? {
                            background:
                              "linear-gradient(0deg, rgba(193, 32, 38, 0.10) 0%, rgba(193, 32, 38, 0.10) 100%), #FFF",
                          }
                          : undefined
                      }
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </section>
          </div>
        ) : null}

        {currentStep === 3 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section className={OFFER_CARD_SHELL}>
              <p className={OFFER_CARD_TITLE}>{REPAIRS_AND_MAINTENANCE_TITLE}</p>
              <div className="flex w-full flex-col items-center justify-center gap-3">
                {REPAIRS_AND_MAINTENANCE_OPTIONS.map(({ id, label }) => {
                  const selected = formData.repairsAndMaintenance === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, repairsAndMaintenance: id }))
                        setCurrentStep(4)
                      }}
                      aria-pressed={selected}
                      className={`${OFFER_CHOICE_BTN} ${selected ? "" : "bg-white hover:bg-white hover:text-[#3E3E3F]"}`}
                      style={
                        selected
                          ? {
                            background:
                              "linear-gradient(0deg, rgba(193, 32, 38, 0.10) 0%, rgba(193, 32, 38, 0.10) 100%), #FFF",
                          }
                          : undefined
                      }
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </section>
          </div>
        ) : null}

        {currentStep === 4 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section className={OFFER_CARD_SHELL}>
              <p className={OFFER_CARD_TITLE}>{SELL_HOUSE_TITLE}</p>
              <div className="flex w-full flex-col items-center justify-center gap-3">
                {SELL_HOUSE_OPTIONS.map(({ id, label }) => {
                  const selected = formData.sellHouse === id

                  return (
                    <Button
                      key={id}
                      type="1"
                      variant="default"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, sellHouse: id }))
                        setCurrentStep(5)
                      }}
                      aria-pressed={selected}
                      className={`${OFFER_CHOICE_BTN} ${selected ? "" : "bg-white hover:bg-white hover:text-[#3E3E3F]"}`}
                      style={
                        selected
                          ? {
                            background:
                              "linear-gradient(0deg, rgba(193, 32, 38, 0.10) 0%, rgba(193, 32, 38, 0.10) 100%), #FFF",
                          }
                          : undefined
                      }
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </section>
          </div>
        ) : null}



        {currentStep === 5 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section className={INPUT_CARD_SHELL}>
              <div className="flex flex-col items-center justify-center gap-1.5 ">
                <p className={OFFER_CARD_TITLE}>Please Enter Your Property Address</p>
                <p className={OFFER_CARD_DESCRIPTION}>Type your address below, then select from the dropdown</p>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-7 xl:gap-8.5 ">
                <AddressAutocomplete
                  label=""
                  value={formData.street_address}
                  city={formData.city}
                  state={formData.state}
                  onChange={(v) => {
                    handleInputChange("street_address", v)
                    if (!v) {
                      handleInputChange("city", "")
                      handleInputChange("state", "")
                    }
                  }}
                  onSelect={(result) => {
                    setFormData((prev) => ({
                      ...prev,
                      street_address: result.streetAddress,
                      city: result.city,
                      state: result.state,
                      ...(result.zipCode ? { zipCode: result.zipCode } : {}),
                    }))
                  }}
                  placeholder="Property Address"
                  labelClassName="sr-only"
                  className={INPUT_FIELD}
                />
                <FormNavigation
                  showNext
                  isNextDisabled={!isStepValid()}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </div>
            </section>
          </div>
        ) : null}

        {currentStep === 6 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section className={INPUT_CARD_SHELL}>

              <p className={OFFER_CARD_TITLE}>What is your name?</p>

              <div className="mt-1 flex w-full flex-col items-center justify-center gap-6 md:gap-7 xl:gap-8.5 ">
                <div className="flex w-full flex-col gap-3">
                  <TextInput
                    id="step6FirstName"
                    containerClassName={INPUT_CONTAINER}
                    value={formData.first_name}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    placeholder="First Name"
                    className={INPUT_FIELD}
                  />
                  <TextInput
                    id="step6LastName"
                    containerClassName={INPUT_CONTAINER}
                    value={formData.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    placeholder="Last Name"
                    className={INPUT_FIELD}
                  />
                </div>
                <FormNavigation
                  showNext
                  isNextDisabled={!isStepValid()}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </div>
            </section>
          </div>
        ) : null}


        {currentStep === 7 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section className={INPUT_CARD_SHELL}>

              <p className={OFFER_CARD_TITLE}>What is your email address?</p>

              <div className="mt-1 flex w-full flex-col items-center justify-center gap-6 md:gap-7 xl:gap-8.5 ">
                <TextInput
                  id="email"
                  type="email"
                  containerClassName={INPUT_CONTAINER}
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange("email", e.target.value)
                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }))
                  }}
                  placeholder="Email"
                  className={`${INPUT_FIELD} ${fieldErrors.email ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25" : ""}`}
                />
                {fieldErrors.email ? (
                  <p className="text-xs text-red-600" role="alert">
                    {fieldErrors.email}
                  </p>
                ) : null}
                <FormNavigation
                  showNext
                  isNextDisabled={!isStepValid()}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </div>
            </section>
          </div>
        ) : null}














        {currentStep === TOTAL_STEPS ? (
          <section className={`${STEP_SHELL_FIELDS} items-center`}>
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">

              <PhoneNumberInput
                id="phoneNumber"
                label=""
                containerClassName={INPUT_CONTAINER}
                value={formData.phone_number}
                onChange={(v) => {
                  handleInputChange("phone_number", v)
                  if (fieldErrors.phone) setFieldErrors((p) => ({ ...p, phone: undefined }))
                }}
                placeholder="Enter Phone Number"
                labelClassName="sr-only"
                className={`${INPUT_FIELD} ${fieldErrors.phone ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25" : ""}`}
              />
              {fieldErrors.phone ? (
                <p className="text-xs text-red-600" role="alert">
                  {fieldErrors.phone}
                </p>
              ) : null}

              <p className="text-xs font-normal leading-relaxed text-[#343434] xl:text-[0.85rem]">
                By clicking the button below, you acknowledge, consent, and agree to our terms at the bottom of this page.
              </p>

              {submitStatus === "error" && submitError ? (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="h-13 w-full cursor-pointer rounded-[10px] bg-[#C12026] py-3 text-sm font-medium uppercase text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:h-15 xl:text-lg"
              >
                {submitStatus === "loading" ? "Submitting..." : "See My Instant Cash Offer"}
              </button>

              <p className="text-justify text-xs font-normal leading-relaxed text-[#343434] xl:text-[0.85rem]">
                By clicking &quot;SEE MY INSTANT CASH OFFER&quot; you electronically sign (pursuant to the ESIGN Act) and agree to our{" "}
                <a href="/terms-of-use" className="font-bold text-[#343434]" target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="font-bold text-[#343434]" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                . Your consent, and e-signature, is not a condition of accessing our services. You may revoke your consent at any time by emailing{" "}
                <a href="mailto:consent@unclesambuyshome.com" className="font-bold text-[#343434]">
                  consent@unclesambuyshome.com
                </a>
                .
              </p>
            </div>

            <FormNavigation showBack showNext={false} onNext={handleNext} onBack={handleBack} />
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
      <FormPage />
    </Suspense>
  )
}
