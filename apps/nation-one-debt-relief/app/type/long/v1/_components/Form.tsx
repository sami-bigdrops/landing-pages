"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"

import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { TrustedForm, getCookie } from "@workspace/lp-core"


import PartnerLogos from "@/app/_components/PartnerLogos"
import CreditScoreNotice from "@/app/_components/CreditScoreNotice"
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

const STEP_SHELL = "mx-auto flex w-full max-w-4xl flex-col items-center gap-6 "
const STEP_SHELL_WIDE = "mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_VALUE = "mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center md:gap-7 xl:gap-8"
const STEP_SHELL_FIELDS = "mx-auto flex w-full max-w-3xl flex-col gap-5 md:gap-6"
const STEP_TITLE = "text-center text-xl  font-bold text-[#142B4A] xl:text-2xl mb-2"
const GRID_2 = "grid w-full grid-cols-2 gap-3 md:gap-4 xl:gap-5"
const GRID_SELL = "grid w-full grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 xl:gap-5"
const CHOICE_BTN =
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border border-[#102E50] bg-white px-3 py-5 text-center transition-colors hover:bg-[#fde9ea] md:gap-5 md:px-4 md:py-6 xl:px-6 xl:py-8"
const CHOICE_BTN_MLS =
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border border-[#102E50] bg-white px-3 py-5 text-center transition-colors hover:bg-[#fde9ea] md:gap-5 md:px-4 md:py-7 xl:px-6 xl:py-10"
const CHOICE_ICON = "h-9.5 w-9.5 shrink-0 object-contain md:h-10 md:w-10 xl:h-14 xl:w-14"
const CHOICE_LABEL = "text-[0.85rem] font-semibold leading-normal text-[#475467] xl:text-base"
const INPUT_FIELD =
  "mt-2 h-14 w-full rounded-[10px] border border-gray-300 bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] shadow-[0_4px_12px_0_rgba(0,0,0,0.03)] focus:border-[#102E50] focus:outline-none xl:h-15 xl:text-base"
const LABEL_CLASS = "text-sm font-medium text-[#142B4A] xl:text-base"
const PARTNER_LINK_CLASS =
  "inline cursor-pointer border-0 bg-transparent p-0 font-bold text-[#475467] underline"

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

const TOTAL_STEPS = 4

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
  isNextDisabled?: boolean
  nextLabel?: string
  onNext: () => void
  onBack?: () => void
}

function FormNavigation({
  showBack = false,
  isNextDisabled = false,
  nextLabel = "Continue",
  onNext,
  onBack,
}: FormNavigationProps) {
  return (
    <nav className="flex w-full max-w-lg flex-col gap-4.5 mt-1.5 xl:mt-2.5">
      <div className="flex w-full items-stretch gap-2.5">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-[#F9FAFB] md:h-[52px] md:w-[52px] xl:h-14 xl:w-14"
          >
     
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none" aria-hidden className="h-4 w-4 text-[#8E91A0]">
              <path d="M17.4167 8.25H3.12953L7.98145 13.1019C8.06813 13.1867 8.13713 13.2878 8.18445 13.3994C8.23178 13.5111 8.25649 13.631 8.25716 13.7522C8.25783 13.8734 8.23444 13.9936 8.18834 14.1058C8.14225 14.2179 8.07437 14.3198 7.98863 14.4055C7.90289 14.4912 7.801 14.5591 7.68885 14.6052C7.57671 14.6512 7.45653 14.6746 7.3353 14.6739C7.21406 14.6732 7.09416 14.6485 6.98254 14.6011C6.87093 14.5538 6.76981 14.4848 6.68505 14.3981L0.268388 7.98142C0.0965391 7.80952 0 7.5764 0 7.33333C0 7.09027 0.0965391 6.85715 0.268388 6.68525L6.68505 0.268584C6.77008 0.183299 6.87114 0.115664 6.9824 0.0695703C7.09366 0.0234767 7.21294 -0.000166252 7.33337 8.79926e-07C7.51464 3.95856e-05 7.69183 0.0538219 7.84254 0.154549C7.99325 0.255277 8.11071 0.398426 8.18007 0.565901C8.24944 0.733376 8.26759 0.917656 8.23223 1.09545C8.19688 1.27324 8.10961 1.43655 7.98145 1.56475L3.12953 6.41667H17.4167C17.6598 6.41667 17.893 6.51325 18.0649 6.68515C18.2368 6.85706 18.3334 7.09022 18.3334 7.33333C18.3334 7.57645 18.2368 7.80961 18.0649 7.98152C17.893 8.15342 17.6598 8.25 17.4167 8.25Z" fill="#8E91A0"/>
            </svg>
       
          </button>
        ) : null}
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="h-12 flex-1 cursor-pointer rounded-[10px] bg-[#C12026] text-sm font-semibold uppercase text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:h-[52px] xl:h-14 xl:text-base"
        >
          {nextLabel}
        </button>
      </div>
      <CreditScoreNotice />
    </nav>
  )
}

function FormPage() {
  const router = useRouter()
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

  const redirectToThankYou = useCallback((url: string) => {
    window.setTimeout(() => {
      window.location.href = url
    }, ANALYTICS_FLUSH_DELAY_MS)
  }, [])

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
    if (currentStep === 1) {
      return formData.first_name.trim() !== "" && formData.last_name.trim() !== ""
    }
    if (currentStep === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(formData.email.trim())
    }
    if (currentStep === 3) {
      return normalizeZip(formData.zipCode).length === 5
    }
    if (currentStep === TOTAL_STEPS) {
      const phoneDigits = formData.phone_number.replace(/\D/g, "")
      return phoneDigits.length === 10 && normalizeZip(formData.zipCode).length === 5
    }
    return true
  }

  const handleNext = () => {
    if (!isStepValid() || currentStep >= TOTAL_STEPS) return
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

    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !email ||
      !emailRegex.test(email) ||
      phoneDigits.length !== 10 ||
      zip.length !== 5
    ) {
      setSubmitStatus("error")
      setSubmitError(
        phoneDigits.length !== 10
          ? "Please enter a valid 10-digit phone number."
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

      if (data.success) {
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
    <section className="flex w-full min-h-[400px] flex-col items-center justify-center gap-8 md:min-h-[390px] md:gap-10 xl:min-h-[510px] xl:gap-12">
      

      <form
        id="lead-form"
        method="POST"
        action="/api/submit-form"
        onSubmit={handleLeadSubmit}
        onKeyDown={handleFormKeyDown}
        noValidate
        className="mx-auto flex w-full md:max-w-xl  xl:max-w-xl flex-col items-center gap-2 md:gap-0"
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
            <h3 className={STEP_TITLE}>What is your name?</h3>
            <div className="flex w-full max-w-lg flex-col gap-4 text-left ">
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
            data-arohaa-step="2"
            data-arohaa-step-name="Email Address"
          >
            <h3 className={STEP_TITLE}>What is your email?</h3>
            <div className="flex w-full max-w-lg flex-col gap-4 text-left">
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
            data-arohaa-step="3"
            data-arohaa-step-name="Zip Code"
          >
            <h3 className={STEP_TITLE}>What is your Zip Code?</h3>
            <div className="flex w-full max-w-lg flex-col gap-4 text-left">
              <ZipCodeInput
                id="zipCode"
                name="zipCode"
                data-arohaa-field="zipCode"
                label="Zip Code"
                value={formData.zipCode}
                onChange={(value) => handleInputChange("zipCode", value)}
                placeholder="Enter Zip Code"
                labelClassName={LABEL_CLASS}
                className={INPUT_FIELD}
                containerClassName="w-full"
              />
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
            data-arohaa-step="4"
            data-arohaa-step-name="Address and Phone"
          >
            <h3 className={STEP_TITLE}>What is your phone number?</h3>
            <div className="flex w-full max-w-lg flex-col gap-4 text-left md:gap-5">
              
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

              
              <nav className="flex w-full max-w-lg flex-col gap-4.5 mt-1.5 xl:mt-2.5">
                <div className="flex w-full items-stretch gap-2.5">
                  <button
                    type="button"
                    onClick={handleBack}
                    aria-label="Go back"
                    className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.04)] transition-colors hover:bg-[#F9FAFB] md:h-[52px] md:w-[52px] xl:h-14 xl:w-14"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none" aria-hidden className="h-4 w-4 text-[#8E91A0]">
                      <path d="M17.4167 8.25H3.12953L7.98145 13.1019C8.06813 13.1867 8.13713 13.2878 8.18445 13.3994C8.23178 13.5111 8.25649 13.631 8.25716 13.7522C8.25783 13.8734 8.23444 13.9936 8.18834 14.1058C8.14225 14.2179 8.07437 14.3198 7.98863 14.4055C7.90289 14.4912 7.801 14.5591 7.68885 14.6052C7.57671 14.6512 7.45653 14.6746 7.3353 14.6739C7.21406 14.6732 7.09416 14.6485 6.98254 14.6011C6.87093 14.5538 6.76981 14.4848 6.68505 14.3981L0.268388 7.98142C0.0965391 7.80952 0 7.5764 0 7.33333C0 7.09027 0.0965391 6.85715 0.268388 6.68525L6.68505 0.268584C6.77008 0.183299 6.87114 0.115664 6.9824 0.0695703C7.09366 0.0234767 7.21294 -0.000166252 7.33337 8.79926e-07C7.51464 3.95856e-05 7.69183 0.0538219 7.84254 0.154549C7.99325 0.255277 8.11071 0.398426 8.18007 0.565901C8.24944 0.733376 8.26759 0.917656 8.23223 1.09545C8.19688 1.27324 8.10961 1.43655 7.98145 1.56475L3.12953 6.41667H17.4167C17.6598 6.41667 17.893 6.51325 18.0649 6.68515C18.2368 6.85706 18.3334 7.09022 18.3334 7.33333C18.3334 7.57645 18.2368 7.80961 18.0649 7.98152C17.893 8.15342 17.6598 8.25 17.4167 8.25Z" fill="#8E91A0"/>
                    </svg>
                  </button>
                  <button
                    type="submit"
                    disabled={!isStepValid() || submitStatus === "loading"}
                    className="h-12 flex-1 cursor-pointer rounded-[10px] bg-[#C12026] text-sm font-semibold uppercase text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:h-[52px] xl:h-14 xl:text-base"
                  >
                    {submitStatus === "loading" ? "Submitting..." : "SUBMIT"}
                  </button>
                </div>
                
              </nav>

              <p className="text-justify text-xs font-normal leading-relaxed text-[#475467] xl:text-[0.85rem]">
                By submitting this form, I am providing Nation One Debt Relief, with express written consent to contact me regarding product offerings by SMS/text messages or by using an auto dialer (or automated means) at the phone number(s) provided and such consent is not a condition of a purchase. I further consent to initial contact outside of permissible state and federal call times if made within approximately one hour of submission. Message and data rates may apply. You can opt-out of this service at any time by replying to our last message with “STOP”. For assistance, please call any number listed on this website. I also consent and agree to Nation One Debt Relief’s{" "}
                <a href="/privacy-policy" className="underline text-[#475467]" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms-of-use" className="underline text-[#475467]" target="_blank" rel="noopener noreferrer">
                  Terms of Use
                </a>.
              </p>
         
            </div>
          </section>
        ) : null}

     
      </form>

      <PartnerLogos className="mt-3 md:mt-5 xl:mt-6" />

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
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="text-base font-semibold text-[#102E50] md:text-lg">Loading...</div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  )
}
