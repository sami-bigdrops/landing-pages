"use client"

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react"
import Script from "next/script"
import { TrustedForm } from "@workspace/lp-core"
import { useSearchParams } from "next/navigation"
import { useCityFromZip } from "@/hooks/use-city-from-zip"
import { useFormStepHistory } from "@/hooks/use-form-step-history"
import { useInsurliiTracking } from "@/hooks/use-insurlii-tracking"
import { buildFormSubmitPayload } from "@/lib/form-submit-payload"
import { normalizeTrackingZip } from "@/lib/tracking-params"
import { FORM_TOTAL_STEPS } from "@/lib/constant"
import { FORM_SECTION_BG } from "@/lib/constant"
import { FormProgressHeader } from "./FormProgressHeader"
import { VehicleMakeStep } from "./VehicleMakeStep"
import { VehicleModelStep } from "./VehicleModelStep"
import { VehicleYearStep } from "./VehicleYearStep"
import { StepAddVehicle } from "./StepAddVehicle"
import { StepHadInsurance } from "./StepHadInsurance"
import { StepCurrentInsurer } from "./StepCurrentInsurer"
import { StepYearsInsured } from "./StepYearsInsured"
import { StepDriverGender } from "./StepDriverGender"
import { StepDriverMarried } from "./StepDriverMarried"
import { StepDriverAccidents } from "./StepDriverAccidents"
import { StepDriverDUI } from "./StepDriverDUI"
import { StepHomeowner } from "./StepHomeowner"
import { StepHomeDiscount } from "./StepHomeDiscount"
import { StepDOB } from "./StepDOB"
import { StepAddress } from "./StepAddress"
import { StepEmail } from "./StepEmail"
import { StepPhone } from "./StepPhone"
import { StepMilitaryService } from "./StepMilitaryService"
import { StepDriverNames } from "./StepDriverNames"
import { StepLoading } from "./StepLoading"
import { StepResults } from "./StepResults"

// ── Step number constants ────────────────────────────────────────────
const S_YEAR      = 1
const S_MAKE      = 2
const S_MODEL     = 3
const S_ADD_V2    = 4
const S_V2_YEAR   = 5
const S_V2_MAKE   = 6
const S_V2_MODEL  = 7
const S_HAD_INS   = 8
const S_CUR_INS   = 9
const S_YRS_INS   = 10
const S_HOMEOWN   = 11
const S_HM_DISC   = 12
const S_DOB       = 13
const S_D1_GEN    = 14
const S_D1_MAR    = 15
const S_D1_ACC    = 16
const S_D1_DUI    = 17
const S_DRV_NAMES = 18
const S_MILITARY  = 19
const S_ADDR      = 20
const S_EMAIL     = 21
const S_PHONE     = 22
const S_LOADING   = 23
const S_RESULTS   = 24

function FormPage() {
  const searchParams = useSearchParams()
  const zipFromUrl = searchParams.get("zip")
  const tracking = useInsurliiTracking()

  const initialZip = normalizeTrackingZip(
    zipFromUrl ?? tracking.zip
  )

  const [zip, setZip] = useState(initialZip)
  const { city: cityName, state: cityState } = useCityFromZip(zip)

  useEffect(() => {
    const resolved = normalizeTrackingZip(zipFromUrl ?? tracking.zip)
    if (resolved.length === 5) {
      setZip(resolved)
    }
  }, [zipFromUrl, tracking.zip])

  // ── Routing ──────────────────────────────────────────────────────────
  const formRef = useRef<HTMLFormElement>(null)
  const trustedFormRef = useRef({ certUrl: "", token: "" })
  const [currentStep, goToStep] = useFormStepHistory(S_YEAR)

  // ── Vehicle 1 ────────────────────────────────────────────────────────
  const [vehicleYear, setVehicleYear]   = useState("")
  const [vehicleMake, setVehicleMake]   = useState("")
  const [vehicleModel, setVehicleModel] = useState("")

  // ── Vehicle 2 ────────────────────────────────────────────────────────
  const [addVehicle2, setAddVehicle2] = useState<boolean | null>(null)
  const [v2Year, setV2Year]           = useState("")
  const [v2Make, setV2Make]           = useState("")
  const [v2Model, setV2Model]         = useState("")

  // ── Insurance ────────────────────────────────────────────────────────
  const [hadInsurance, setHadInsurance]     = useState<boolean | null>(null)
  const [currentInsurer, setCurrentInsurer] = useState("")
  const [yearsInsured, setYearsInsured]     = useState("")

  // ── Property ─────────────────────────────────────────────────────────
  const [isHomeowner, setIsHomeowner]             = useState<boolean | null>(null)
  const [wantsHomeDiscount, setWantsHomeDiscount] = useState<boolean | null>(null)

  // ── Driver 1 ─────────────────────────────────────────────────────────
  const [d1Gender, setD1Gender]     = useState("")
  const [d1Married, setD1Married]   = useState<boolean | null>(null)
  const [d1Accidents, setD1Accidents] = useState("")
  const [d1DUI, setD1DUI]           = useState<boolean | null>(null)

  // ── Driver name ───────────────────────────────────────────────────────
  const [d1FirstName, setD1FirstName] = useState("")
  const [d1LastName, setD1LastName]   = useState("")

  // ── Discount ─────────────────────────────────────────────────────────
  const [servedMilitary, setServedMilitary] = useState<boolean | null>(null)

  // ── Contact ──────────────────────────────────────────────────────────
  const [dob, setDob]                     = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [email, setEmail]                 = useState("")
  const [phone, setPhone]                 = useState("")
  const [googlePlacesReady, setGooglePlacesReady] = useState(false)
  const [emailSubmitError, setEmailSubmitError]   = useState<string | null>(null)

  const googlePlacesApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

  // ── Vehicle 1 handlers ───────────────────────────────────────────────
  const handleYearChange = (year: string) => {
    setVehicleYear(year)
    setVehicleMake("")
    setVehicleModel("")
    goToStep(S_MAKE)
  }

  const handleMakeChange = (make: string) => {
    setVehicleMake(make)
    setVehicleModel("")
    goToStep(S_MODEL)
  }

  const handleModelChange = (model: string) => {
    setVehicleModel(model)
    goToStep(S_ADD_V2)
  }

  // ── Add vehicle 2 ─────────────────────────────────────────────────────
  const handleAddV2 = (add: boolean) => {
    setAddVehicle2(add)
    if (!add) {
      setV2Year(""); setV2Make(""); setV2Model("")
    }
    goToStep(add ? S_V2_YEAR : S_HAD_INS)
  }

  // ── Vehicle 2 handlers ────────────────────────────────────────────────
  const handleV2Year  = (year: string)  => { setV2Year(year); setV2Make(""); setV2Model(""); goToStep(S_V2_MAKE) }
  const handleV2Make  = (make: string)  => { setV2Make(make); setV2Model(""); goToStep(S_V2_MODEL) }
  const handleV2Model = (model: string) => { setV2Model(model); goToStep(S_HAD_INS) }

  // ── Insurance handlers ────────────────────────────────────────────────
  const handleHadInsurance   = (had: boolean) => { setHadInsurance(had); goToStep(had ? S_CUR_INS : S_HOMEOWN) }
  const handleCurrentInsurer = (ins: string)  => { setCurrentInsurer(ins); goToStep(S_YRS_INS) }
  const handleYearsInsured   = (v: string)    => { setYearsInsured(v); goToStep(S_HOMEOWN) }

  // ── Property handlers ─────────────────────────────────────────────────
  const handleHomeowner = (v: boolean) => {
    setIsHomeowner(v)
    goToStep(v ? S_HM_DISC : S_DOB)
  }
  const handleHomeDiscount = (v: boolean) => { setWantsHomeDiscount(v); goToStep(S_DOB) }

  // ── DOB → Driver questions ─────────────────────────────────────────────
  const handleDobNext = () => goToStep(S_D1_GEN)

  // ── Driver 1 handlers ─────────────────────────────────────────────────
  const handleD1Gender    = (v: string)  => { setD1Gender(v);    goToStep(S_D1_MAR) }
  const handleD1Married   = (v: boolean) => { setD1Married(v);   goToStep(S_D1_ACC) }
  const handleD1Accidents = (v: string)  => { setD1Accidents(v); goToStep(S_D1_DUI) }
  const handleD1DUI       = (v: boolean) => { setD1DUI(v);       goToStep(S_DRV_NAMES) }

  // ── Driver name → Military → Address ──────────────────────────────────
  const handleDriverNamesNext = () => goToStep(S_MILITARY)
  const handleMilitary        = (v: boolean) => { setServedMilitary(v); goToStep(S_ADDR) }

  // ── Contact handlers ──────────────────────────────────────────────────
  const handleAddrNext  = () => goToStep(S_EMAIL)
  const handleEmailNext = () => {
    setEmailSubmitError(null)
    goToStep(S_PHONE)
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handlePhoneSubmit = async () => {
    const form = formRef.current
    const certInput = form?.elements.namedItem(
      "xxTrustedFormCertUrl"
    ) as HTMLInputElement | null
    const tokenInput = form?.elements.namedItem(
      "xxTrustedFormToken"
    ) as HTMLInputElement | null

    trustedFormRef.current = {
      certUrl: certInput?.value ?? "",
      token: tokenInput?.value ?? "",
    }

    const payload = buildFormSubmitPayload({
      zip,
      email: email.trim(),
      phone: phone.trim(),
      streetAddress: streetAddress.trim(),
      dob: dob.trim(),
      city: cityName.trim(),
      state: cityState.trim(),
      d1FirstName,
      d1LastName,
      vehicleYear,
      vehicleType: "car",
      vehicleMake,
      vehicleModel,
      addVehicle2,
      v2Year,
      v2Make,
      v2VehicleType: "car",
      v2Model,
      hadInsurance,
      currentInsurer,
      yearsInsured,
      d1Gender,
      d1Married,
      d1Accidents,
      d1DUI,
      isHomeowner,
      wantsHomeDiscount,
      servedMilitary,
      xxTrustedFormCertUrl: trustedFormRef.current.certUrl,
      xxTrustedFormToken: trustedFormRef.current.token,
    })

    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => ({}))) as {
      error?: string
      invalidField?: "email"
      field?: "phoneNumber"
      success?: boolean
      redirectUrl?: string
    }

    if (!res.ok) {
      const message = data.error ?? "Submission failed. Please try again."
      if (data.invalidField === "email") {
        setEmailSubmitError(message)
        goToStep(S_EMAIL)
        return
      }
      if (data.field === "phoneNumber") {
        throw new Error(message)
      }
      throw new Error(message)
    }

    if (data.success && data.redirectUrl) {
      window.location.href = data.redirectUrl
      return
    }

    goToStep(S_LOADING)
  }

  const vehicleCount = 1 + (addVehicle2 === true ? 1 : 0)

  // ── Post-form screens (full-page takeover) ────────────────────────────
  if (currentStep === S_LOADING) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <StepLoading
          firstName={d1FirstName || "there"}
          cityName={cityName}
          onComplete={() => goToStep(S_RESULTS)}
        />
      </div>
    )
  }

  if (currentStep === S_RESULTS) {
    return (
      <StepResults
        firstName={d1FirstName || "there"}
        cityName={cityName}
        cityState={cityState}
        vehicleCount={vehicleCount}
        driverCount={1}
      />
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {googlePlacesApiKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${googlePlacesApiKey}&libraries=places`}
          strategy="lazyOnload"
          onLoad={() => setGooglePlacesReady(true)}
        />
      )}
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="flex min-h-0 flex-1 flex-col"
        noValidate
      >
        <TrustedForm />
        <div className="w-full bg-white pt-3">
          <FormProgressHeader
            cityName={cityName}
            currentStep={currentStep}
            totalSteps={FORM_TOTAL_STEPS}
            tagline={currentStep === S_EMAIL && d1FirstName ? `${d1FirstName}, you're almost done!` : undefined}
          />
        </div>

        <div
          className="flex-1 w-full py-4"
          style={{ backgroundColor: FORM_SECTION_BG }}
        >
          <div className="w-full max-w-4xl mx-auto px-4 md:px-6">

          {/* ── Vehicle 1: Year / Make / Model ── */}
          {currentStep === S_YEAR && (
            <VehicleYearStep value={vehicleYear} onChange={handleYearChange} />
          )}
          {currentStep === S_MAKE && vehicleYear && (
            <VehicleMakeStep
              year={vehicleYear}
              value={vehicleMake}
              onChange={handleMakeChange}
            />
          )}
          {currentStep === S_MODEL && vehicleYear && vehicleMake && (
            <VehicleModelStep
              year={vehicleYear}
              make={vehicleMake}
              value={vehicleModel}
              onChange={handleModelChange}
            />
          )}

          {/* ── Add vehicle 2 ── */}
          {currentStep === S_ADD_V2 && (
            <StepAddVehicle vehicleNumber={2} value={addVehicle2} onChange={handleAddV2} />
          )}

          {/* ── Vehicle 2: Year / Make / Model ── */}
          {addVehicle2 === true && currentStep === S_V2_YEAR && (
            <VehicleYearStep value={v2Year} onChange={handleV2Year} />
          )}
          {addVehicle2 === true && currentStep === S_V2_MAKE && v2Year && (
            <VehicleMakeStep
              year={v2Year}
              title="What make is your second vehicle?"
              value={v2Make}
              onChange={handleV2Make}
            />
          )}
          {addVehicle2 === true && currentStep === S_V2_MODEL && v2Year && v2Make && (
            <VehicleModelStep
              year={v2Year}
              make={v2Make}
              value={v2Model}
              onChange={handleV2Model}
            />
          )}

          {/* ── Insurance ── */}
          {currentStep === S_HAD_INS && (
            <StepHadInsurance value={hadInsurance} onChange={handleHadInsurance} />
          )}
          {currentStep === S_CUR_INS && (
            <StepCurrentInsurer value={currentInsurer} onChange={handleCurrentInsurer} />
          )}
          {currentStep === S_YRS_INS && (
            <StepYearsInsured value={yearsInsured} onChange={handleYearsInsured} />
          )}

          {/* ── Property ── */}
          {currentStep === S_HOMEOWN && (
            <StepHomeowner value={isHomeowner} onChange={handleHomeowner} />
          )}
          {currentStep === S_HM_DISC && (
            <StepHomeDiscount value={wantsHomeDiscount} onChange={handleHomeDiscount} />
          )}

          {/* ── Date of birth ── */}
          {currentStep === S_DOB && (
            <StepDOB value={dob} onChange={setDob} onNext={handleDobNext} />
          )}

          {/* ── Driver 1 ── */}
          {currentStep === S_D1_GEN && (
            <StepDriverGender value={d1Gender} onChange={handleD1Gender} />
          )}
          {currentStep === S_D1_MAR && (
            <StepDriverMarried value={d1Married} onChange={handleD1Married} />
          )}
          {currentStep === S_D1_ACC && (
            <StepDriverAccidents value={d1Accidents} onChange={handleD1Accidents} />
          )}
          {currentStep === S_D1_DUI && (
            <StepDriverDUI value={d1DUI} onChange={handleD1DUI} />
          )}

          {/* ── Driver name ── */}
          {currentStep === S_DRV_NAMES && (
            <StepDriverNames
              d1FirstName={d1FirstName}
              d1LastName={d1LastName}
              onD1FirstName={setD1FirstName}
              onD1LastName={setD1LastName}
              onNext={handleDriverNamesNext}
            />
          )}

          {/* ── Military ── */}
          {currentStep === S_MILITARY && (
            <StepMilitaryService value={servedMilitary} onChange={handleMilitary} />
          )}

          {/* ── Contact ── */}
          {currentStep === S_ADDR && (
            <StepAddress
              zip={zip}
              onZipChange={setZip}
              cityName={cityName}
              cityState={cityState}
              streetAddress={streetAddress}
              onStreetAddressChange={setStreetAddress}
              googleReady={googlePlacesReady}
              onNext={handleAddrNext}
            />
          )}
          {currentStep === S_EMAIL && (
            <StepEmail
              value={email}
              onChange={(v) => {
                setEmail(v)
                if (emailSubmitError) setEmailSubmitError(null)
              }}
              onNext={handleEmailNext}
              submitError={emailSubmitError}
            />
          )}
          {currentStep === S_PHONE && (
            <StepPhone
              value={phone}
              onChange={setPhone}
              onSubmit={handlePhoneSubmit}
            />
          )}

          </div>
        </div>
      </form>
    </div>
  )
}

export default function FormPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-1 items-center justify-center">
          <div className="text-sky-600 text-lg md:text-xl font-semibold">Loading...</div>
        </div>
      }
    >
      <FormPage />
    </Suspense>
  )
}
