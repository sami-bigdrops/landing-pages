"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { TrustedForm, getCookie } from "@workspace/lp-core"
import CashOfferCard from "./Card"
import { PartnersDialog } from "./PartnersDialog"
import { SubmissionLoadingScreen } from "./SubmissionLoadingScreen"
import { parseAddressComponents, parseCityStateFromPrediction } from "@/lib/parse-place-address"

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
              <p className="text-xs text-[#6B7280] mt-0.5 truncate">{pred.structured_formatting.secondary_text}</p>
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
const PARTNER_LINK_CLASS =
  "inline cursor-pointer border-0 bg-transparent p-0 font-bold text-[#343434] underline"

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

const TOTAL_STEPS = 9

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
    <nav className="flex w-full max-w-lg flex-col items-center gap-4 md:gap-5">
      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled}
        className="w-full rounded-[10px] bg-[#C12026] py-3 text-base font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:text-[1.05rem]"
      >
        {nextLabel}
      </button>
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
  const [partnersOpen, setPartnersOpen] = useState(false)
  const [showSubmissionLoading, setShowSubmissionLoading] = useState(false)
  const redirectUrlRef = useRef<string | null>(null)
  const apiReadyRef = useRef(false)
  const animationReadyRef = useRef(false)

  const tryRedirect = useCallback(() => {
    if (apiReadyRef.current && animationReadyRef.current && redirectUrlRef.current) {
      const url = redirectUrlRef.current
      window.setTimeout(() => {
        window.location.href = url
      }, ANALYTICS_FLUSH_DELAY_MS)
    }
  }, [])

  const handleLoadingComplete = useCallback(() => {
    animationReadyRef.current = true
    tryRedirect()
  }, [tryRedirect])

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    if (field === "street_address") {
      setFormData((prev) => ({
        ...prev,
        street_address: value,
        ...(value.trim() === "" ? { city: "", state: "", zipCode: "" } : {}),
      }))
      return
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    if (currentStep === 7) {
      return formData.houseValueRange.trim() !== ""
    }
    if (currentStep === 8) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return (
        formData.first_name.trim() !== "" &&
        formData.last_name.trim() !== "" &&
        formData.email.trim() !== "" &&
        emailRegex.test(formData.email.trim())
      )
    }
    if (currentStep === TOTAL_STEPS) {
      return (
        formData.street_address.trim() !== "" &&
        formData.phone_number.trim() !== "" &&
        normalizeZip(formData.zipCode).length === 5
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
    if ((currentStep === 7 || currentStep === 8) && isStepValid()) {
      handleNext()
    }
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      if ((currentStep === 7 || currentStep === 8) && isStepValid()) {
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
    setShowSubmissionLoading(true)
    redirectUrlRef.current = null
    apiReadyRef.current = false
    animationReadyRef.current = false

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

      if (data.success && typeof data.redirectUrl === "string") {
        redirectUrlRef.current = data.redirectUrl
        apiReadyRef.current = true
        tryRedirect()
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
    <section className="flex w-full min-h-[400px] flex-col items-center gap-8 md:min-h-[460px] md:gap-10 xl:min-h-[580px] xl:gap-12">
      <h2 className="max-w-5xl text-center text-xl font-bold text-[#182542] lg:text-2xl xl:text-3xl">
        Need to Sell Quickly? Uncle Sam Buys Homes — Get a Cash Offer for Your Home Today!
      </h2>

      <form
        id="lead-form"
        method="POST"
        action="/api/submit-form"
        onSubmit={handleLeadSubmit}
        onKeyDown={handleFormKeyDown}
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
          <section
            className={STEP_SHELL}
            data-arohaa-step="1"
            data-arohaa-step-name="Confirm Your Home Type"
          >
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
          <section
            className={STEP_SHELL}
            data-arohaa-step="2"
            data-arohaa-step-name="Tell Us About Your Property"
          >
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
                      setCurrentStep(3)
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

        {currentStep === 3 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="3"
            data-arohaa-step-name="MLS Listing"
          >
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
                      setCurrentStep(4)
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
          </section>
        ) : null}
        {currentStep === 4 ? (
          <section
            className={STEP_SHELL_WIDE}
            data-arohaa-step="4"
            data-arohaa-step-name="Why Do You Want To Sell"
          >
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
                      setCurrentStep(5)
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

        {currentStep === 5 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="5"
            data-arohaa-step-name="Timeline"
          >
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
          </section>
        ) : null}

        {currentStep === 6 ? (
          <section
            className={STEP_SHELL}
            data-arohaa-step="6"
            data-arohaa-step-name="Credit Rating"
          >
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
          </section>
        ) : null}

        {currentStep === 7 ? (
          <section
            className={STEP_SHELL_VALUE}
            data-arohaa-step="7"
            data-arohaa-step-name="Estimate House Value"
          >
            <h3 className={STEP_TITLE}>Estimate House Value</h3>
            <p className="text-xl font-medium text-[#182542] md:text-2xl xl:text-3xl">
              {HOUSE_VALUE_RANGES[houseValueIndex]?.label ?? ""}
            </p>
            <input
              type="range"
              name="houseValueRange"
              data-arohaa-field="houseValueRange"
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
            <FormNavigation isNextDisabled={!isStepValid()} onNext={handleNext} />
          </section>
        ) : null}

        {currentStep === 8 ? (
          <section
            className={`${STEP_SHELL_FIELDS} items-center`}
            data-arohaa-step="8"
            data-arohaa-step-name="Contact Information"
          >
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">
              <TextInput
                id="step6FirstName"
                name="firstName"
                data-arohaa-field="firstName"
                label="First Name"
                value={formData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                placeholder="Enter First Name"
                labelClassName={LABEL_CLASS}
                className={INPUT_FIELD}
              />
              <TextInput
                id="step6LastName"
                name="lastName"
                data-arohaa-field="lastName"
                label="Last Name"
                value={formData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                placeholder="Enter Last Name"
                labelClassName={LABEL_CLASS}
                className={INPUT_FIELD}
              />
              <TextInput
                id="email"
                name="email"
                data-arohaa-field="email"
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
            <FormNavigation isNextDisabled={!isStepValid()} onNext={handleNext} />
          </section>
        ) : null}

        {currentStep === TOTAL_STEPS ? (
          <section
            className={`${STEP_SHELL_FIELDS} items-center`}
            data-arohaa-step="9"
            data-arohaa-step-name="Address and Phone"
          >
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">
              <AddressAutocomplete
                label="Street Address"
                inputName="address"
                dataArohaaField="address"
                value={formData.street_address}
                city={formData.city}
                state={formData.state}
                zipCode={formData.zipCode}
                onChange={(v) => {
                  handleInputChange("street_address", v)
                }}
                onSelect={(result) => {
                  setFormData((prev) => ({
                    ...prev,
                    street_address: result.streetAddress,
                    city: result.city,
                    state: result.state,
                    zipCode: result.zipCode,
                  }))
                }}
                placeholder="Enter Street Address"
                labelClassName={LABEL_CLASS}
                className={INPUT_FIELD}
              />
              <PhoneNumberInput
                id="phoneNumber"
                name="phoneNumber"
                data-arohaa-field="phoneNumber"
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
                {submitStatus === "loading" ? "Submitting..." : "See My Instant Cash Offer"}
              </button>

              <p className="text-justify text-xs font-normal leading-relaxed text-[#343434] xl:text-[0.85rem]">
                By clicking &quot;SEE MY INSTANT CASH OFFER&quot; you electronically sign (pursuant to the ESIGN Act) and agree: to share your information with up to{" "}
                <button
                  type="button"
                  onClick={() => setPartnersOpen(true)}
                  className={PARTNER_LINK_CLASS}
                >
                  2 partners
                </button>
                ; that you are providing your prior express written consent for those{" "}
                <button
                  type="button"
                  onClick={() => setPartnersOpen(true)}
                  className={PARTNER_LINK_CLASS}
                >
                  partners
                </button>{" "}
                to contact you at the telephone number you provided (including through an automatic telephone dialing system, pre-recorded or artificial voice, AI, SMS and MMS) even if your telephone number is listed on any state, federal or corporate Do Not Call list; you agree to our{" "}
                <a href="/terms-of-use" className="font-bold text-[#343434]" target="_blank" rel="noopener noreferrer">
                  Terms of Use
                </a>
                , including its{" "}
                <a
                  href="/terms-of-use#dispute-resolution"
                  className="font-bold text-[#343434]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Arbitration provision
                </a>
                , and{" "}
                <a href="/privacy-policy" className="font-bold text-[#343434]" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                ; and that we can use your data for marketing and analytics. Your consent, and e-signature, is not a condition of accessing our services, as you may email{" "}
                <a href="mailto:consent@unclesambuyshomes.com" className="font-bold text-[#343434]">
                  consent@unclesambuyshomes.com
                </a>{" "}
                and you can revoke your consent at any time by emailing us.
              </p>
            </div>
          </section>
        ) : null}

        <CashOfferCard />
      </form>

      <PartnersDialog isOpen={partnersOpen} onClose={() => setPartnersOpen(false)} />
      <SubmissionLoadingScreen active={showSubmissionLoading} onComplete={handleLoadingComplete} />
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
