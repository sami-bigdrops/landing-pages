"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react"

import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { Button } from "@workspace/ui/components/button"
import { TrustedForm, getCookie } from "@workspace/lp-core"
import { OFFER_CONTENT } from "@/lib/constant"
import { trackArohaa } from "@/lib/arohaa"
import { parseAddressComponents, parseCityStateFromPrediction } from "@/lib/parse-place-address"
import { PartnersDialog } from "./PartnersDialog"

const ANALYTICS_FLUSH_DELAY_MS = 300
const AROHAA_SUBMITTED_KEY = "arohaa_uncle_sam_v2_submitted"

const STEP_NAMES: Record<number, string> = {
  1: "Sell House For Cash",
  2: "How Soon To Sell",
  3: "Repairs And Maintenance",
  4: "Why Selling",
  5: "Property Address",
  6: "Name And Email",
  7: "Phone Number",
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
  { id: "full_gut", label: "Full Gut - Everything - $$$$" },
  { id: "remodel", label: "Remodel - Kitchen, Bathrooms, Roof - $$$" },
  { id: "cosmetic", label: "Cosmetic - Flooring, Paint - $$" },
  { id: "none", label: "None - TV Commercial Ready - $" },
] as const

const SELL_HOUSE_FOR_CASH_OPTIONS = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
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
  "text-center font-sans text-base  xl:text-[1.4rem] font-semibold text-[#182542]"
const OFFER_CARD_DESCRIPTION =
  "text-center font-sans text-[0.8rem]  text-[#4B5563] xl:text-[0.95rem]"
const OFFER_CHOICE_BTN =
  "w-full flex h-14 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-5 py-0 font-semibold text-[0.85rem] font-inherit text-[#3E3E3F] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 md:py-3.5 md:flex-1 xl:h-18.5 xl:py-4 lg:text-sm xl:text-lg border border-[#C12026]"

const OFFER_CHOICE_LABEL_WRAP =
  "w-full px-0.5 text-center text-[0.85rem] lg:text-sm xl:text-lg font-semibold text-[#3E3E3F] whitespace-normal md:px-0  leading-snug"

const INPUT_CONTAINER = "w-full"
const INPUT_FIELD =
  "h-14 w-full min-w-0 rounded-[6px] border border-[#CCCCCF] bg-white px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] shadow-none outline-none transition-[color,box-shadow] focus-visible:border-[#102E50] focus-visible:ring-[3px] focus-visible:ring-[#102E50]/25 xl:h-15 xl:text-base"

type HowSoonToSellTypeId = (typeof HOW_SOON_TO_SELL_OPTIONS)[number]["id"] | ""
type RepairsAndMaintenanceTypeId = (typeof REPAIRS_AND_MAINTENANCE_OPTIONS)[number]["id"] | ""
type SellHouseForCashTypeId = (typeof SELL_HOUSE_FOR_CASH_OPTIONS)[number]["id"]
type SellHouseTypeId = (typeof SELL_HOUSE_OPTIONS)[number]["id"] | ""



const TOTAL_STEPS = 7

const defaultFormData = {
  howSoonToSell: "" as HowSoonToSellTypeId,
  zipCode: "",
  sellHouseForCash: "yes" as SellHouseForCashTypeId,
  sellHouse: "" as SellHouseTypeId,
  repairsAndMaintenance: "" as RepairsAndMaintenanceTypeId,
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
  onNext: () => void
}

function FormNavigation({
  showNext = true,
  isNextDisabled = false,
  nextLabel = "Next",
  onNext,
}: FormNavigationProps) {
  return (
    <nav className="flex w-full max-w-lg flex-col items-center gap-4 md:gap-5">
      {showNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="w-full md:w-45 xl:w-47 rounded-[10px] bg-[#102E50] cursor-pointer py-3 xl:py-4 text-base font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:text-[1.05rem]"
        >
          {nextLabel}
        </button>

      ) : null}
      
    </nav>
  )
}

function FormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(defaultFormData)

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({})
  const [partnersOpen, setPartnersOpen] = useState(false)

  useEffect(() => {
    trackArohaa("form_start")
  }, [])

  useEffect(() => {
    trackArohaa("form_step_view", {
      step: currentStep,
      step_name: STEP_NAMES[currentStep] ?? `Step ${currentStep}`,
    })
  }, [currentStep])

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
    if (currentStep === 5) {
      return (
        formData.street_address.trim() !== "" &&
        normalizeZip(formData.zipCode).length === 5
      )
    }
    if (currentStep === 6) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return (
        formData.first_name.trim() !== "" &&
        formData.last_name.trim() !== "" &&
        formData.email.trim() !== "" &&
        emailRegex.test(formData.email.trim())
      )
    }
    if (currentStep === TOTAL_STEPS) {
      return formData.phone_number.trim() !== ""
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
    if ((currentStep === 5 || currentStep === 6) && isStepValid()) {
      handleNext()
    }
  }

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      if ((currentStep === 5 || currentStep === 6) && isStepValid()) {
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

    const form = e.currentTarget
    const certInput = form.elements.namedItem("xxTrustedFormCertUrl") as HTMLInputElement | null
    const tokenInput = form.elements.namedItem("xxTrustedFormToken") as HTMLInputElement | null

    const payload = {
      howSoonToSell: formData.howSoonToSell,
      zipCode: zip,
      sellHouseForCash: formData.sellHouseForCash,
      sellHouse: formData.sellHouse,
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
    <section className="flex w-full min-h-[220px] flex-col items-center gap-8 md:min-h-[190px] md:gap-10 xl:min-h-[250px] xl:gap-12">


      <form
        id="lead-form"
        onSubmit={handleLeadSubmit}
        onKeyDown={handleFormKeyDown}
        noValidate
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 xl:gap-8"
      >

        <TrustedForm />

        {currentStep === 1 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section
              className={OFFER_CARD_SHELL}
              data-arohaa-step="1"
              data-arohaa-step-name={STEP_NAMES[1]}
            >
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
                      className={`${OFFER_CHOICE_BTN} ${isYes ? "" : "bg-white hover:bg-[#fde9ea] hover:text-[#3E3E3F]"}`}
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
            <section
              className={OFFER_CARD_SHELL}
              data-arohaa-step="2"
              data-arohaa-step-name={STEP_NAMES[2]}
            >
              <p className={OFFER_CARD_TITLE}>{HOW_SOON_TO_SELL_TITLE}</p>
              <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-3.5 xl:gap-4.5">
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
                      className={`${OFFER_CHOICE_BTN} ${selected ? "" : "bg-white hover:bg-[#fde9ea] hover:text-[#3E3E3F]"}`}
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
            <section
              className={OFFER_CARD_SHELL}
              data-arohaa-step="3"
              data-arohaa-step-name={STEP_NAMES[3]}
            >
              <p className={OFFER_CARD_TITLE}>{REPAIRS_AND_MAINTENANCE_TITLE}</p>
              <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-3.5 xl:gap-4.5">
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
                      className={`${OFFER_CHOICE_BTN} ${selected ? "" : "bg-white hover:bg-[#fde9ea] hover:text-[#3E3E3F]"}`}
                      style={
                        selected
                          ? {
                            background:
                              "linear-gradient(0deg, rgba(193, 32, 38, 0.10) 0%, rgba(193, 32, 38, 0.10) 100%), #FFF",
                          }
                          : undefined
                      }
                    >
                      <span className={OFFER_CHOICE_LABEL_WRAP}>{label}</span>
                    </Button>
                  )
                })}
              </div>
            </section>
          </div>
        ) : null}

        {currentStep === 4 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section
              className={OFFER_CARD_SHELL}
              data-arohaa-step="4"
              data-arohaa-step-name={STEP_NAMES[4]}
            >
              <p className={OFFER_CARD_TITLE}>{SELL_HOUSE_TITLE}</p>
              <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-3.5 xl:gap-4.5">
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
                      className={`${OFFER_CHOICE_BTN} ${selected ? "" : "bg-white hover:bg-[#fde9ea] hover:text-[#3E3E3F]"}`}
                      style={
                        selected
                          ? {
                            background:
                              "linear-gradient(0deg, rgba(193, 32, 38, 0.10) 0%, rgba(193, 32, 38, 0.10) 100%), #FFF",
                          }
                          : undefined
                      }
                    >
                      <span className={OFFER_CHOICE_LABEL_WRAP}>{label}</span>
                    </Button>
                  )
                })}
              </div>
            </section>
          </div>
        ) : null}



        {currentStep === 5 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section
              className={INPUT_CARD_SHELL}
              data-arohaa-step="5"
              data-arohaa-step-name={STEP_NAMES[5]}
            >
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
                  placeholder="Property Address"
                  labelClassName="sr-only"
                  className={INPUT_FIELD}
                />
                <FormNavigation
                  showNext
                  isNextDisabled={!isStepValid()}
                  onNext={handleNext}
                />
              </div>
            </section>
          </div>
        ) : null}

        {currentStep === 6 ? (
          <div className="flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section
              className={INPUT_CARD_SHELL}
              data-arohaa-step="6"
              data-arohaa-step-name={STEP_NAMES[6]}
            >

              <p className={OFFER_CARD_TITLE}>What is your name and email?</p>

              <div className="mt-1 flex w-full flex-col items-center justify-center gap-6 md:gap-7 xl:gap-8.5 ">
                <div className="flex w-full flex-col gap-3">
                  <TextInput
                    id="step6FirstName"
                    data-arohaa-field="firstName"
                    containerClassName={INPUT_CONTAINER}
                    value={formData.first_name}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    placeholder="First Name"
                    className={INPUT_FIELD}
                  />
                  <TextInput
                    id="step6LastName"
                    data-arohaa-field="lastName"
                    containerClassName={INPUT_CONTAINER}
                    value={formData.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    placeholder="Last Name"
                    className={INPUT_FIELD}
                  />
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
                    placeholder="Email"
                    className={`${INPUT_FIELD} ${fieldErrors.email ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25" : ""}`}
                  />
                  {fieldErrors.email ? (
                    <p className="text-xs text-red-600" role="alert">
                      {fieldErrors.email}
                    </p>
                  ) : null}
                </div>
                <FormNavigation
                  showNext
                  isNextDisabled={!isStepValid()}
                  onNext={handleNext}
                />
              </div>
            </section>
          </div>
        ) : null}

        {currentStep === TOTAL_STEPS ? (

          <div className="mt-1 flex w-full items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
            <section
              className={INPUT_CARD_SHELL}
              data-arohaa-step="7"
              data-arohaa-step-name={STEP_NAMES[7]}
            >

              <p className={OFFER_CARD_TITLE}>Final Step - What is your phone number?</p>

              <div className="mt-1 flex w-full flex-col items-center justify-center gap-6 md:gap-7 xl:gap-8.5 ">
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
                  placeholder="Phone Number"
                  labelClassName="sr-only"
                  className={`${INPUT_FIELD} ${fieldErrors.phone ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25" : ""}`}
                />
                {fieldErrors.phone ? (
                  <p className="text-xs text-red-600" role="alert">
                    {fieldErrors.phone}
                  </p>
                ) : null}


                <p className="text-justify text-[0.7rem] font-normal leading-relaxed text-[#4B5563] xl:text-[0.85rem]">
                  By clicking &quot;SEE MY INSTANT CASH OFFER&quot; you electronically sign (pursuant to the ESIGN Act) and agree: to share your information with up to{" "}
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
           

                {submitStatus === "error" && submitError ? (
                  <p className="text-sm text-red-600" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!isStepValid() || submitStatus === "loading"}
                  className="w-full md:w-60 xl:w-70 rounded-[10px] bg-[#102E50] py-3 xl:py-4 text-sm font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:text-[1.05rem]"
                >
                  {submitStatus === "loading" ? "Submitting..." : "SEE MY INSTANT CASH OFFER"}
                </button>
              </div>
         
            </section>
          </div>

        ) : null}


      </form>

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
