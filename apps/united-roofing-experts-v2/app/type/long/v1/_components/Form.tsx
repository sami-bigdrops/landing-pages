"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { TrustedForm, getCookie } from "@workspace/lp-core"

// import { SubmissionLoadingScreen } from "./SubmissionLoadingScreen"
// import { parseAddressComponents, parseCityStateFromPrediction } from "@/lib/parse-place-address"

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
    // const fallbackCityState = parseCityStateFromPrediction(pred)
    const fallbackCityState = { city: "", state: "" }

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

        // const { streetNumber, route, parsedCity, parsedState, parsedZip } = parseAddressComponents(
        //   place.address_components
        // )
        // const streetAddress =
        //   (streetNumber ? `${streetNumber} ${route}`.trim() : route.trim()) || selectedMainText

        applySelection({
          streetAddress: selectedMainText,
          city: fallbackCityState.city,
          state: fallbackCityState.state,
          zipCode: "",
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

const NEEDS_WORK_OPTIONS = [
  { id: "roof_replacement", label: "Roof replacement", Icon: "/house.svg" },
  { id: "roof_repair", label: "Roof repair", Icon: "/broken-home.svg" },
  { id: "not_sure", label: "I'm not sure", Icon: "/home-renovation.svg" },

] as const

const PROPERTY_LIST_OPTIONS = [
  { id: "yes", label: "Yes", Icon: "/yes.svg" },
  { id: "no", label: "No", Icon: "/no.svg" },
] as const

const ROOF_AGE_OPTIONS = [
  { id: "less_than_10", label: "Less than 10 years", Icon: "/house.svg" },
  { id: "ten_twenty", label: "10-20 years", Icon: "/clock-with-calendar.svg" },
  { id: "more_than_20", label: "More than 20 years", Icon: "/calendar.svg" },
  { id: "not_sure", label: "I'm not sure", Icon: "/home-renovation.svg" },
] as const

const HOME_SIZE_OPTIONS = [
  { id: "under_1500", label: "Under 1500 sq. ft.", Icon: "/house.svg" },
  { id: "1500_3000", label: "1500-3000 sq. ft.", Icon: "/house.svg" },
  { id: "over_3000", label: "Over 3000 sq. ft.", Icon: "/house.svg" },
] as const

const ROOF_SHAPE_OPTIONS = [
  { id: "sloped", label: "Sloped roof", Icon: "/roof-sloped.svg" },
  { id: "flat", label: "Flat roof", Icon: "/roof-flat.svg" },
  { id: "not_sure", label: "I'm not sure", Icon: "/question-red.svg" },
] as const

const PLANNING_PROCESS_OPTIONS = [
  { id: "ready_to_hire", label: "Ready to hire", Icon: "/ready-to-hire.svg" },
  { id: "just_getting_price", label: "Just getting a price", Icon: "/just-getting-price.svg" }
] as const

const STEP_SHELL = "mx-auto flex w-full max-w-4xl flex-col items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_WIDE = "mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_VALUE = "mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center md:gap-7 xl:gap-8"
const STEP_SHELL_FIELDS = "mx-auto flex w-full max-w-3xl flex-col gap-5 md:gap-6"
const STEP_TITLE = "text-center text-base font-medium text-[#323232] xl:text-2xl md:max-w-[400px] xl:max-w-[600px]"
const GRID_2 = "grid w-full grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 xl:gap-5"
const CHOICE_GRID_BASE = "grid w-full grid-cols-2 gap-3 md:gap-4 xl:gap-5"

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
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[5px] border border-[#102E50] bg-white px-3 py-4 text-center transition-colors hover:bg-[#e6f0ff] md:gap-5 md:px-4 md:py-5 xl:px-6 xl:py-8"
const CHOICE_BTN_MLS =
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-[5px] border border-[#1776eb] bg-white px-3 py-4 text-center transition-colors hover:bg-[#e6f0ff] text-[#1776eb] md:gap-5 md:px-4 md:py-5 xl:px-6 xl:py-7"
const CHOICE_BTN_MLS_LABEL = "text-sm font-medium uppercase leading-normal text-[#1776eb] xl:text-base"
const CHOICE_ICON = "h-9.5 w-9.5 shrink-0 object-contain md:h-10 md:w-10 xl:h-14 xl:w-14"
const CHOICE_LABEL = "text-[0.85rem] font-medium leading-normal text-[#323232] xl:text-base"
const INPUT_FIELD =
  "mt-2 h-14 w-full rounded-[5px] border border-[#102E50] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] focus:border-[#102E50] focus:outline-none xl:h-15 xl:text-base"
const LABEL_CLASS = "text-sm font-medium text-[#1C1C1C] xl:text-base"
const PARTNER_LINK_CLASS =
  "inline cursor-pointer border-0 bg-transparent p-0 font-bold text-[#343434] underline"

type HomeTypeId = (typeof HOME_TYPE_OPTIONS)[number]["id"]
type PropertyTypeId = (typeof NEEDS_WORK_OPTIONS)[number]["id"]
type PropertyListTypeId = (typeof PROPERTY_LIST_OPTIONS)[number]["id"]
type RoofAgeTypeId = (typeof ROOF_AGE_OPTIONS)[number]["id"]
type HomeSizeTypeId = (typeof HOME_SIZE_OPTIONS)[number]["id"]
type RoofShapeTypeId = (typeof ROOF_SHAPE_OPTIONS)[number]["id"]
type PlanningProcessTypeId = (typeof PLANNING_PROCESS_OPTIONS)[number]["id"]


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

const TOTAL_STEPS = 13

const defaultFormData = {
  homeType: "condominium" as HomeTypeId,
  zipCode: "",
  propertyType: "roof_replacement" as PropertyTypeId,
  propertyList: "yes" as PropertyListTypeId,
  roofAge: "less_than_10" as RoofAgeTypeId,
  homeSize: "under_1500" as HomeSizeTypeId,
  roofShape: "sloped" as RoofShapeTypeId,
  planningProcess: "ready_to_hire" as PlanningProcessTypeId,
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
    <nav className="flex w-full max-w-lg flex-col items-center justify-center gap-4 md:gap-5">
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
    if (field === "zipCode") {
      setFormData((prev) => ({ ...prev, zipCode: normalizeZip(value) }))
      return
    }
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
      roofAge: formData.roofAge,
      homeSize: formData.homeSize,
      roofShape: formData.roofShape,
      planningProcess: formData.planningProcess,
      houseValueRange: formData.houseValueRange,
      firstName: formData.first_name.trim(),
      lastName: formData.last_name.trim(),
      email: formData.email.trim(),
      isHomeowner: formData.propertyList,
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
            <h3 className={STEP_TITLE}>Are you a homeowner? </h3>
            <div className={GRID_2}>
              {PROPERTY_LIST_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.propertyList === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, propertyList: id }))
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
            <h3 className={STEP_TITLE}>What do you need?</h3>
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
            <h3 className={STEP_TITLE}>How old is your roof?</h3>
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
                    <Image src={Icon} alt="" width={48} height={48} aria-hidden className={CHOICE_ICON} />
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
            <h3 className={STEP_TITLE}>What is the size of your home?</h3>
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
            <h3 className={STEP_TITLE}>What is the shape of your roof?</h3>
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
            <h3 className={STEP_TITLE}>Where are you in the planning process?</h3>
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
            data-arohaa-step-name="Attic"
          >
            <h3 className={STEP_TITLE}>Does your house have an attic? </h3>
            <div className={GRID_2}>
              {PROPERTY_LIST_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.propertyList === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, propertyList: id }))
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
            <h3 className={STEP_TITLE}>Are you aware of any active roof leaks? </h3>
            <div className={GRID_2}>
              {PROPERTY_LIST_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.propertyList === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, propertyList: id }))
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
            <h3 className={STEP_TITLE}>Do you have a metal roof currently? </h3>
            <div className={GRID_2}>
              {PROPERTY_LIST_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.propertyList === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, propertyList: id }))
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
            <h3 className={STEP_TITLE}>Does anyone in your household qualify for senior, military or first responder discounts that may be available? </h3>
            <div className={GRID_2}>
              {PROPERTY_LIST_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.propertyList === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, propertyList: id }))
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
            <h3 className={STEP_TITLE}>What is your ZIP code? </h3>
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
            <h3 className={STEP_TITLE}>Who should we prepare this FREE quote for? </h3>
            <p className="text-sm xl:text-base text-center text-gray-500">Please enter your first and last name below.</p>
            </div>
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">
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
            <h3 className={STEP_TITLE}>Where should we send your information? </h3>
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


      {/* <SubmissionLoadingScreen active={showSubmissionLoading} onComplete={handleLoadingComplete} /> */}
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
