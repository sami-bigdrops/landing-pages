"use client"

import { Suspense, useState, useRef, useEffect, useCallback, type FormEvent } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input"
import { TextInput } from "@workspace/ui/components/text-input"
import { PhoneNumberInput } from "@workspace/ui/components/phone-number-input"
import { TrustedForm, getCookie } from "@workspace/lp-core"


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


const ROOF_TYPE_OPTIONS = [
  { id: "SHINGLES", label: "Asphalt Shingles", Icon: "V2/roof-1.svg" },
  { id: "METAL", label: "Metal", Icon: "V2/roof-2.svg" },
  { id: "TILE_CLAY", label: "Tile/Clay", Icon: "V2/roof-3.svg" },
  { id: "OTHER_UNKNOWN", label: "Other/Unknown", Icon: "V2/roof-4.svg" },
] as const

const HOMEOWNER_OPTIONS = [
  { id: "yes", label: "Yes", Icon: "V2/yes.svg" },
  { id: "no", label: "No", Icon: "V2/no.svg" },
] as const



const HOME_SIZE_OPTIONS = [
  { id: "under_1500_", label: "Under 1500 sq. ft.", Icon: "V2/under.svg" },
  { id: "1500_3000_", label: "1500-3000 sq. ft.", Icon: "V2/mid.svg" },
  { id: "over_3500", label: "Over 3500 sq. ft.", Icon: "V2/over.svg" },

] as const



const STEP_SHELL = "mx-auto flex w-full max-w-4xl flex-col justify-center items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_WIDE = "mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:gap-7 xl:gap-8"
const STEP_SHELL_FIELDS = "mx-auto flex w-full max-w-3xl flex-col gap-5 md:gap-6"
const STEP_TITLE = "text-center text-base lg:text-lg font-bold text-[#111827] xl:text-[1.4rem] lg:mb-1 xl:mb-2"
const GRID_HOMEOWNER = "grid w-full grid-cols-2 gap-3 md:gap-4 xl:gap-5"
const GRID_2 = "grid w-full grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 xl:gap-5"
const GRID_SELL = "grid w-full grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:grid-cols-3 xl:gap-5"
const CHOICE_BTN =
  "flex min-h-0 w-full cursor-pointer flex-col items-center justify-start gap-4 rounded-[10px] border border-[#D1D5DB] bg-[#F8FAFC] hover:border-[#0D74BA]  hover:bg-[#EDF4FA] px-3 py-5 text-center transition-colors  md:gap-5 md:px-4 md:py-6 xl:px-6 xl:py-8"
const CHOICE_ICON = "h-10 w-10 shrink-0 object-contain lg:h-11 lg:w-11 xl:h-14 xl:w-14"
const CHOICE_LABEL = "text-[0.85rem] font-semibold leading-normal text-[#343434] xl:text-base"
const INPUT_FIELD =
  "mt-2 h-14 w-full font-bold rounded-[5px] border border-[#D1D5DB] bg-[#F9FBFD] px-4 text-sm text-[#111827] placeholder:text-[#8F8E93] focus:border-[#102E50] focus:outline-none xl:h-15 xl:text-base"
const LABEL_CLASS = "text-sm font-medium text-[#374151] text-left xl:text-base"

type HomeownerTypeId = (typeof HOMEOWNER_OPTIONS)[number]["id"]
type RoofTypeId = (typeof ROOF_TYPE_OPTIONS)[number]["id"]
type HomeSizeTypeId = (typeof HOME_SIZE_OPTIONS)[number]["id"]


const TOTAL_STEPS = 7

const defaultFormData = {
  zipCode: "",
  roofType: "SHINGLES" as RoofTypeId,
  homeSize: "under_1500_" as HomeSizeTypeId,
  homeowner: "no" as HomeownerTypeId,
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
    <nav className="flex w-full max-w-lg flex-col items-center justify-center md:flex-row-reverse md:items-center md:justify-center gap-4 md:gap-10 xl:gap-12 md:mt-4 xl:mt-6">
      {showNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="relative flex w-full md:max-w-[170px] cursor-pointer items-center justify-center rounded-[10px] bg-[#E56A2E] px-10 py-3 text-[0.9rem] xl:text-base font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:text-[1.05rem]"
        >
          <span>{nextLabel}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden
            className="absolute right-5 top-6 md:top-6.5 xl:top-7 h-3 w-3 md:w-3.5 md:h-3.5 shrink-0 -translate-y-1/2  xl:h-4 xl:w-4"
          >
            <path d="M0.916307 8.25H15.2035L10.3516 13.1019C10.2649 13.1867 10.1959 13.2878 10.1486 13.3994C10.1012 13.5111 10.0765 13.631 10.0758 13.7522C10.0752 13.8734 10.0986 13.9936 10.1447 14.1058C10.1908 14.2179 10.2586 14.3198 10.3444 14.4055C10.4301 14.4912 10.532 14.5591 10.6442 14.6052C10.7563 14.6512 10.8765 14.6746 10.9977 14.6739C11.119 14.6732 11.2389 14.6485 11.3505 14.6011C11.4621 14.5538 11.5632 14.4848 11.648 14.3981L18.0646 7.98142C18.2365 7.80952 18.333 7.5764 18.333 7.33333C18.333 7.09027 18.2365 6.85715 18.0646 6.68525L11.648 0.268584C11.5629 0.183299 11.4619 0.115664 11.3506 0.0695703C11.2393 0.0234767 11.1201 -0.000166252 10.9996 8.79926e-07C10.8184 3.95856e-05 10.6412 0.0538219 10.4905 0.154549C10.3398 0.255277 10.2223 0.398426 10.1529 0.565901C10.0836 0.733376 10.0654 0.917656 10.1008 1.09545C10.1361 1.27324 10.2234 1.43655 10.3516 1.56475L15.2035 6.41667H0.916307C0.673193 6.41667 0.440035 6.51325 0.268126 6.68515C0.0962181 6.85706 -0.000358582 7.09022 -0.000358582 7.33333C-0.000358582 7.57645 0.0962181 7.80961 0.268126 7.98152C0.440035 8.15342 0.673193 8.25 0.916307 8.25Z" fill="white" />
          </svg>
        </button>
      ) : null}
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-1.5 text-[0.9rem] font-semibold text-[#47514F] transition-colors hover:text-[#374151] xl:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none" className="h-4 w-4 text-[#475467] lg:h-4.5 lg:w-4.5 xl:h-5 xl:w-5">
            <path d="M19.2507 11.9167H4.96352L9.81543 16.7686C9.90211 16.8534 9.97111 16.9545 10.0184 17.0661C10.0658 17.1778 10.0905 17.2977 10.0911 17.4189C10.0918 17.5401 10.0684 17.6603 10.0223 17.7724C9.97623 17.8846 9.90835 17.9865 9.82261 18.0722C9.73688 18.1579 9.63498 18.2258 9.52284 18.2718C9.41069 18.3179 9.29052 18.3413 9.16928 18.3406C9.04804 18.3399 8.92814 18.3152 8.81653 18.2678C8.70491 18.2205 8.6038 18.1515 8.51904 18.0648L2.10237 11.6481C1.93052 11.4762 1.83398 11.2431 1.83398 11C1.83398 10.757 1.93052 10.5238 2.10237 10.3519L8.51904 3.93527C8.60407 3.84999 8.70512 3.78235 8.81638 3.73626C8.92764 3.69016 9.04692 3.66652 9.16735 3.66669C9.34862 3.66673 9.52581 3.72051 9.67652 3.82124C9.82723 3.92196 9.94469 4.06511 10.0141 4.23259C10.0834 4.40006 10.1016 4.58434 10.0662 4.76213C10.0309 4.93992 9.94359 5.10324 9.81543 5.23144L4.96352 10.0834H19.2507C19.4938 10.0834 19.727 10.1799 19.8989 10.3518C20.0708 10.5237 20.1674 10.7569 20.1674 11C20.1674 11.2431 20.0708 11.4763 19.8989 11.6482C19.727 11.8201 19.4938 11.9167 19.2507 11.9167Z" fill="#475467"/>
          </svg>
     
          Previous
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

  const handleInputChange = (field: keyof typeof defaultFormData, value: string) => {
    if (field === "zipCode") {
      value = value.replace(/\D/g, "").slice(0, 5)
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    if (currentStep === 2) {
      return Boolean(formData.homeSize)
    }
    if (currentStep === 3) {
      return Boolean(formData.roofType)
    }
    if (currentStep === 4) {
      return formData.zipCode.length === 5
    }
    if (currentStep === 5) {
      return formData.first_name.trim() !== "" && formData.last_name.trim() !== ""
    }
    if (currentStep === 6) {
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
      if (currentStep === 4 && isStepValid()) {
        handleNext()
      } else if (currentStep === 6 && isStepValid()) {
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
      zipCode: zip,
      roofType: formData.roofType,
      homeSize: formData.homeSize,
      isHomeowner: formData.homeowner === "yes" ? "Yes" : formData.homeowner === "no" ? "No" : "",
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
    <section className="flex w-full min-h-0 flex-1 flex-col items-center  gap-8 px-6 py-8 md:min-h-[460px] md:gap-10 md:px-6 md:py-10 lg:px-14 lg:py-10 xl:min-h-[500px] xl:gap-12 xl:px-20 xl:py-14">


      <form
        onSubmit={handleLeadSubmit}
        noValidate
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 xl:gap-8"
      >
        <ProgressBar
          type="1"
          className="w-full"
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          backgroundColor="#E56A2E33"
          foregroundColor="#E56A2E"
        />
        <TrustedForm />

        {currentStep === 1 ? (
          <section className={STEP_SHELL}>
            <h3 className={STEP_TITLE}>Are you a homeowner?</h3>
            <div className={GRID_HOMEOWNER}>
              {HOMEOWNER_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.homeowner === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, homeowner: id }))
                      setCurrentStep(2)
                    }}
                    aria-pressed={selected}
                    className={CHOICE_BTN}
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
            <FormNavigation showNext onNext={handleNext} onBack={handleBack} />
          </section>
        ) : null}

        {currentStep === 2 ? (
          <section className={STEP_SHELL_WIDE}>
            <h3 className={STEP_TITLE}>What is the size of your home?</h3>
            <div className={GRID_SELL}>
              {HOME_SIZE_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.homeSize === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, homeSize: id }))
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
            <h3 className={STEP_TITLE}>What type of roof do you have now?</h3>
            <div className={GRID_2}>
              {ROOF_TYPE_OPTIONS.map(({ id, label, Icon }) => {
                const selected = formData.roofType === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, roofType: id }))
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
            <FormNavigation showBack showNext={true} onNext={handleNext} onBack={handleBack} />
          </section>
        ) : null}

        {currentStep === 4 ? (
          <section className={`${STEP_SHELL_FIELDS} items-center text-center`}>
            <h3 className={STEP_TITLE}>What is your ZIP code?</h3>
            <ZipCodeInput
              id="zipCode"
              label="Zip Code"
              value={formData.zipCode}
              onChange={(v) => handleInputChange("zipCode", v)}
              placeholder="Enter ZIP Code"
              containerClassName="w-full max-w-lg text-left "
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
        {currentStep === 5 ? (
          <section className={`${STEP_SHELL_FIELDS} items-center`}>
            <h3 className={STEP_TITLE}>Who should we prepare this FREE quote for?</h3>
            <div className="flex w-full max-w-lg xl:max-w-xl flex-col md:flex-row gap-5 text-left md:gap-6">
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

        {currentStep === 6 ? (
          <section className={`${STEP_SHELL_FIELDS} items-center`}>
            <h3 className={STEP_TITLE}>Where should we send your information?</h3>
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">

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
            <h3 className="text-center text-base lg:text-lg md:max-w-[400px] lg:max-w-[500px] xl:max-w-[550px] font-bold text-[#111827] xl:text-[1.4rem] lg:mb-1 xl:mb-2">Before we prepare your FREE quote, we need to confirm your information and check availability in your area. It only takes a minute!</h3>
            <div className="flex w-full max-w-lg flex-col gap-5 text-left md:gap-6">

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



              {submitStatus === "error" && submitError ? (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

              {/* <button
              type="submit"
              disabled={submitStatus === "loading"}
              className="h-13 w-full cursor-pointer rounded-[10px] bg-[#C12026] py-3 text-sm font-medium uppercase text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:h-15 xl:text-lg"
            >
              {submitStatus === "loading" ? "Submitting..." : "See My Instant Cash Offer"}
            </button> */}


            </div>

            <FormNavigation showBack showNext={true} onNext={handleNext} onBack={handleBack} />
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
        <div className="flex flex-1 min-h-0 items-center justify-center bg-white">
          <div className="text-base font-semibold text-[#102E50] md:text-lg">Loading...</div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  )
}
