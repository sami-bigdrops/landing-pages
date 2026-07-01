"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { TrustedForm, getCookie } from "@workspace/lp-core"
import CashOfferCard from "./Card.js"


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
const HOME_TYPE_OPTIONS = [
  { id: "single_family", label: "Single Family Home", Icon: "/family.svg" },
  { id: "condominium", label: "Condominium / Townhome", Icon: "/mall.svg" },
  { id: "mobile", label: "Mobile / Manufactured Home", Icon: "/car.svg" },
  { id: "vacant_land", label: "Vacant Land", Icon: "/land.svg" },
] as const

const PROPERTY_TYPE_OPTIONS = [
  { id: "needs_work", label: "Needs Work", Icon: "/house.svg" },
  { id: "fair", label: "Fair", Icon: "/broken-home.svg" },
  { id: "good", label: "Good", Icon: "/home-renovation.svg" },
  { id: "excellent", label: "Excellent", Icon: "/happy-house.svg" },
] as const

const PROPERTY_LIST_OPTIONS = [
  { id: "yes", label: "Yes", Icon: "/yes.svg" },
  { id: "no", label: "No", Icon: "/no.svg" },
] as const

const SELL_OPTIONS = [
  { id: "late", label: "Behind on Mortgage Payments", Icon: "/mortgage.svg" },
  { id: "job", label: "Job / Income Loss", Icon: "/briefcase.svg" },
  { id: "cash", label: "Need to Access Cash", Icon: "/cash.svg" },
  { id: "repairs", label: "Property Needs Repairs", Icon: "/house-repair.svg" },
  { id: "move", label: "Downsizing / Relocating", Icon: "/property-exchange.svg" },
  { id: "metrics", label: "Research Home Metrics", Icon: "/house-price.svg" }
] as const

const MONEY_OPTIONS = [
  { id: "asap", label: "ASAP", Icon: "/coming-soon.svg" },
  { id: "2_3_months", label: "2-3 Months", Icon: "/calendar-charge.svg" },
  { id: "6_months", label: "6 Months", Icon: "/clock-with-calendar.svg" },
  { id: "no_rush", label: "I Am In No Rush", Icon: "/calendar.svg" }
] as const

const CREDIT_OPTIONS = [
  { id: "poor", label: "Poor (559 Or Less)", Icon: "/poor.svg" },
  { id: "fair", label: "Fair (560–639)", Icon: "/fair.svg" },
  { id: "good", label: "Good (640–700)", Icon: "/good.svg" },
  { id: "excellent", label: "Excellent (701+)", Icon: "/excellant.svg" }
] as const

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
const INPUT_FIELD =
  "mt-2 h-14 w-full rounded-[5px] border border-[#102E50] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] focus:border-[#102E50] focus:outline-none xl:h-15 xl:text-base"
const LABEL_CLASS = "text-sm font-medium text-[#1C1C1C] xl:text-base"

type HomeTypeId = (typeof HOME_TYPE_OPTIONS)[number]["id"]
type PropertyTypeId = (typeof PROPERTY_TYPE_OPTIONS)[number]["id"]
type PropertyListTypeId = (typeof PROPERTY_LIST_OPTIONS)[number]["id"]
type SellTypeId = (typeof SELL_OPTIONS)[number]["id"]
type MoneyTypeId = (typeof MONEY_OPTIONS)[number]["id"]
type CreditTypeId = (typeof CREDIT_OPTIONS)[number]["id"]

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

const TOTAL_STEPS = 10

const defaultFormData = {
  homeType: "condominium" as HomeTypeId,
  zipCode: "",
  propertyType: "needs_work" as PropertyTypeId,
  propertyList: "yes" as PropertyListTypeId,
  sell: "late" as SellTypeId,
  money: "asap" as MoneyTypeId,
  credit: "poor" as CreditTypeId,
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
          className="w-full rounded-[10px] bg-[#C12026] py-3 text-base font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:text-[1.05rem]"
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
    if (currentStep === 2) {
      return formData.zipCode.length === 5
    }
    if (currentStep === 9) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return (
        formData.first_name.trim() !== "" &&
        formData.last_name.trim() !== "" &&
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

  const handleBack = () => {
    if (currentStep <= 1) return
    setCurrentStep((prev) => prev - 1)
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      if (currentStep === 2 && isStepValid()) {
        handleNext()
      } else if (currentStep === 9 && isStepValid()) {
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
      homeType: formData.homeType,
      zipCode: zip,
      propertyType: formData.propertyType,
      propertyList: formData.propertyList,
      sell: formData.sell,
      money: formData.money,
      credit: formData.credit,
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
    <section className="flex w-full min-h-[400px] flex-col items-center gap-8 md:min-h-[460px] md:gap-10 xl:min-h-[580px] xl:gap-12">
      <h2 className="max-w-5xl text-center text-xl font-bold text-[#182542] lg:text-2xl xl:text-3xl">
        Need to Sell Quickly? Uncle Sam Buys Homes — Get a Cash Offer for Your Home Today!
      </h2>

      <form
        onSubmit={handleLeadSubmit}
        noValidate
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 xl:gap-8"
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
          <section className={STEP_SHELL}>
            <h3 className={STEP_TITLE}>Confirm Your Home Type</h3>
            <div className={GRID_2}>
              {HOME_TYPE_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.homeType === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, homeType: id }))
                      setCurrentStep(2)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN}
                  >
                    <Image src={Icon} alt="" width={48} height={48} aria-hidden className={CHOICE_ICON} />
                    <span className={CHOICE_LABEL}>{label}</span>
                  </button>
                )
              })}
            </div>
          </section>
        ) : null}

        {currentStep === 2 ? (
          <section className={`${STEP_SHELL_FIELDS} items-center text-center`}>
            <ZipCodeInput
              id="zipCode"
              label="Zip Code"
              value={formData.zipCode}
              onChange={(v) => handleInputChange("zipCode", v)}
              placeholder="Please Enter Zip Code"
              containerClassName="w-full max-w-lg"
              labelClassName={LABEL_CLASS}
              className={INPUT_FIELD}
            />
            <FormNavigation
              showBack
              showNext
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 3 ? (
          <section className={STEP_SHELL}>
            <h3 className={STEP_TITLE}>Tell Us About Your Property!</h3>
            <div className={GRID_2}>
              {PROPERTY_TYPE_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.propertyType === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, propertyType: id }))
                      setCurrentStep(4)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN}
                  >
                    <Image src={Icon} alt="" width={48} height={48} aria-hidden className={CHOICE_ICON} />
                    <span className={CHOICE_LABEL}>{label}</span>
                  </button>
                )
              })}
            </div>
            <FormNavigation showBack showNext={false} onNext={handleNext} onBack={handleBack} />
          </section>
        ) : null}

        {currentStep === 4 ? (
          <section className={STEP_SHELL}>
            <h3 className={STEP_TITLE}>Is Your House Already Listed on the MLS?</h3>
            <div className={GRID_2}>
              {PROPERTY_LIST_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.propertyList === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, propertyList: id }))
                      setCurrentStep(5)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN_MLS}
                  >
                    <Image
                      src={Icon}
                      alt=""
                      width={48}
                      height={48}
                      aria-hidden
                      className="h-5 w-5 shrink-0 object-contain xl:h-7 xl:w-7"
                    />
                    <span className={`${CHOICE_LABEL} lg:text-base xl:text-lg`}>{label}</span>
                  </button>
                )
              })}
            </div>
            <FormNavigation showBack showNext={false} onNext={handleNext} onBack={handleBack} />
          </section>
        ) : null}
        {currentStep === 5 ? (
          <section className={STEP_SHELL_WIDE}>
            <h3 className={STEP_TITLE}>Why Do You Want To Sell?</h3>
            <div className={GRID_SELL}>
              {SELL_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.sell === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, sell: id }))
                      setCurrentStep(6)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN}
                  >
                    <Image src={Icon} alt="" width={48} height={48} aria-hidden className={CHOICE_ICON} />
                    <span className={CHOICE_LABEL}>{label}</span>
                  </button>
                )
              })}
            </div>
            <FormNavigation showBack showNext={false} onNext={handleNext} onBack={handleBack} />
          </section>
        ) : null}

        {currentStep === 6 ? (
          <section className={STEP_SHELL}>
            <h3 className={STEP_TITLE}>How Soon Do You Want Your Money?</h3>
            <div className={GRID_2}>
              {MONEY_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.money === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, money: id }))
                      setCurrentStep(7)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN}
                  >
                    <Image src={Icon} alt="" width={48} height={48} aria-hidden className={CHOICE_ICON} />
                    <span className={CHOICE_LABEL}>{label}</span>
                  </button>
                )
              })}
            </div>
            <FormNavigation showBack showNext={false} onNext={handleNext} onBack={handleBack} />
          </section>
        ) : null}

        {currentStep === 7 ? (
          <section className={STEP_SHELL}>
            <h3 className={STEP_TITLE}>How Would You Rate Your Credit?</h3>
            <div className={GRID_2}>
              {CREDIT_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.credit === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, credit: id }))
                      setCurrentStep(8)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN}
                  >
                    <Image src={Icon} alt="" width={48} height={48} aria-hidden className={CHOICE_ICON} />
                    <span className={CHOICE_LABEL}>{label}</span>
                  </button>
                )
              })}
            </div>
            <FormNavigation showBack showNext={false} onNext={handleNext} onBack={handleBack} />
          </section>
        ) : null}

        {currentStep === 8 ? (
          <section className={STEP_SHELL_VALUE}>
            <h3 className={STEP_TITLE}>Estimate House Value</h3>
            <p className="text-xl font-medium text-[#182542] md:text-2xl xl:text-3xl">
              {HOUSE_VALUE_RANGES[houseValueIndex]?.label ?? ""}
            </p>
            <input
              type="range"
              min={0}
              max={HOUSE_VALUE_RANGES.length - 1}
              step={1}
              value={houseValueIndex}
              aria-label="Estimated house value range"
              onChange={(e) => {
                const idx = Number(e.target.value)
                setHouseValueIndex(idx)
                const v = HOUSE_VALUE_RANGES[idx]?.value ?? ""
                setFormData((prev) => ({ ...prev, houseValueRange: v }))
              }}
              className="h-2 w-full max-w-4xl cursor-pointer appearance-none rounded-full bg-[#E5E7EB] accent-[#182542] xl:h-2.5 [&::-moz-range-thumb]:size-5.5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-[#182542] [&::-moz-range-thumb]:bg-white xl:[&::-moz-range-thumb]:size-7 xl:[&::-moz-range-thumb]:border-3.5 [&::-webkit-slider-thumb]:size-5.5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-[#182542] [&::-webkit-slider-thumb]:bg-white xl:[&::-webkit-slider-thumb]:size-7 xl:[&::-webkit-slider-thumb]:border-3.5"
              style={{
                background:
                  HOUSE_VALUE_RANGES.length <= 1
                    ? "#102E50"
                    : `linear-gradient(to right, #102E50 0%, #102E50 ${(houseValueIndex / (HOUSE_VALUE_RANGES.length - 1)) * 100}%, #E5E7EB ${(houseValueIndex / (HOUSE_VALUE_RANGES.length - 1)) * 100}%, #E5E7EB 100%)`,
              }}
            />
            <div className="flex w-full max-w-4xl justify-between text-xs font-medium text-[#343434] xl:text-sm">
              <span>Under $100K</span>
              <span>$1.5M+</span>
            </div>
            <FormNavigation
              showBack
              showNext
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === 9 ? (
          <section className={`${STEP_SHELL_FIELDS} items-center`}>
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">
              <TextInput
                id="step6FirstName"
                label="First Name"
                value={formData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                placeholder="Enter First Name"
                labelClassName={LABEL_CLASS}
                className={INPUT_FIELD}
              />
              <TextInput
                id="step6LastName"
                label="Last Name"
                value={formData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                placeholder="Enter Last Name"
                labelClassName={LABEL_CLASS}
                className={INPUT_FIELD}
              />
              <TextInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  handleInputChange("email", e.target.value)
                  if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }))
                }}
                placeholder="Enter Email Address"
                labelClassName={LABEL_CLASS}
                className={`${INPUT_FIELD} ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
              />
              {fieldErrors.email ? (
                <p className="text-xs text-red-600" role="alert">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>
            <FormNavigation
              showBack
              showNext
              isNextDisabled={!isStepValid()}
              onNext={handleNext}
              onBack={handleBack}
            />
          </section>
        ) : null}

        {currentStep === TOTAL_STEPS ? (
          <section className={`${STEP_SHELL_FIELDS} items-center`}>
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">
              <AddressAutocomplete
                label="Street Address"
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
                placeholder="Enter Street Address"
                labelClassName={LABEL_CLASS}
                className={INPUT_FIELD}
              />
              <PhoneNumberInput
                id="phoneNumber"
                label="Phone Number"
                value={formData.phone_number}
                onChange={(v) => {
                  handleInputChange("phone_number", v)
                  if (fieldErrors.phone) setFieldErrors((p) => ({ ...p, phone: undefined }))
                }}
                placeholder="Enter Phone Number"
                labelClassName={LABEL_CLASS}
                className={`${INPUT_FIELD} ${fieldErrors.phone ? "border-red-500 focus:border-red-500" : ""}`}
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

        <CashOfferCard />
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
