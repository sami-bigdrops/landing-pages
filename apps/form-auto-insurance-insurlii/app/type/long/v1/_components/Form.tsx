"use client"

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react"
import Script from "next/script"
import { TrustedForm } from "@workspace/lp-core"
import { useSearchParams } from "next/navigation"
import { useCityFromZip } from "@/hooks/use-city-from-zip"
import { useInsurliiTracking } from "@/hooks/use-insurlii-tracking"
import { buildFormSubmitPayload } from "@/lib/form-submit-payload"
import { normalizeTrackingZip } from "@/lib/tracking-params"
import { FORM_TOTAL_STEPS, type FormVehicleType } from "@/lib/constant"
import { FormProgressHeader } from "./FormProgressHeader"
import { VehicleMakeStep } from "./VehicleMakeStep"
import { VehicleModelStep } from "./VehicleModelStep"
import { VehicleYearStep } from "./VehicleYearStep"
import { StepCarOwnership } from "./StepCarOwnership"
import { StepCarPrimaryUse } from "./StepCarPrimaryUse"
import { StepCarMilesPerDay } from "./StepCarMilesPerDay"
import { StepCarCoverageLevel } from "./StepCarCoverageLevel"
import { StepAddVehicle } from "./StepAddVehicle"
import { StepHadInsurance } from "./StepHadInsurance"
import { StepCurrentInsurer } from "./StepCurrentInsurer"
import { StepYearsInsured } from "./StepYearsInsured"
import { StepDriverCount } from "./StepDriverCount"
import { StepDriverGender } from "./StepDriverGender"
import { StepDriverMarried } from "./StepDriverMarried"
import { StepDriverEducation } from "./StepDriverEducation"
import { StepDriverOccupation } from "./StepDriverOccupation"
import { StepDriverCreditScore } from "./StepDriverCreditScore"
import { StepDriverAccidents } from "./StepDriverAccidents"
import { StepDriverTickets } from "./StepDriverTickets"
import { StepDriverDUI } from "./StepDriverDUI"
import { StepDriverLicenseSuspended } from "./StepDriverLicenseSuspended"
import { StepDriver2Relation } from "./StepDriver2Relation"
import { StepDriver2Gender } from "./StepDriver2Gender"
import { StepDriver2Married } from "./StepDriver2Married"
import { StepDriver2Education } from "./StepDriver2Education"
import { StepDriver2Occupation } from "./StepDriver2Occupation"
import { StepDriver2Accidents } from "./StepDriver2Accidents"
import { StepDriver2Tickets } from "./StepDriver2Tickets"
import { StepDriver2DUI } from "./StepDriver2DUI"
import { StepDriver2LicenseSuspended } from "./StepDriver2LicenseSuspended"
import { StepDriver3Relation } from "./StepDriver3Relation"
import { StepDriver3Gender } from "./StepDriver3Gender"
import { StepDriver3Married } from "./StepDriver3Married"
import { StepDriver3Education } from "./StepDriver3Education"
import { StepDriver3Occupation } from "./StepDriver3Occupation"
import { StepDriver3Accidents } from "./StepDriver3Accidents"
import { StepDriver3Tickets } from "./StepDriver3Tickets"
import { StepDriver3DUI } from "./StepDriver3DUI"
import { StepDriver3LicenseSuspended } from "./StepDriver3LicenseSuspended"
import { StepDriver2DOB } from "./StepDriver2DOB"
import { StepDriver3DOB } from "./StepDriver3DOB"
import { StepHomeowner } from "./StepHomeowner"
import { StepHomeDiscount } from "./StepHomeDiscount"
import { StepDOB } from "./StepDOB"
import { StepAddress } from "./StepAddress"
import { StepEmail } from "./StepEmail"
import { StepPhone } from "./StepPhone"
import { StepRentersDiscount } from "./StepRentersDiscount"
import { StepMilitaryService } from "./StepMilitaryService"
import { StepHelpGoal } from "./StepHelpGoal"
import { StepAARP } from "./StepAARP"
import { StepDriverNames } from "./StepDriverNames"
import { StepLoading } from "./StepLoading"
import { StepResults } from "./StepResults"

// ── Step number constants ────────────────────────────────────────────
const S_YEAR      = 1
const S_MAKE      = 2
const S_MODEL     = 3   // vehicle 1
const S_V1_OWN   = 4
const S_V1_USE   = 5
const S_V1_MILES = 6
const S_V1_COV   = 7
const S_ADD_V2   = 8
const S_V2_YEAR  = 9
const S_V2_MAKE  = 10
const S_V2_MODEL = 11
const S_V2_OWN   = 12
const S_V2_USE   = 13
const S_V2_MILES = 14
const S_V2_COV   = 15
const S_ADD_V3   = 16
const S_V3_YEAR  = 17
const S_V3_MAKE  = 18
const S_V3_MODEL = 19
const S_V3_OWN   = 20
const S_V3_USE   = 21
const S_V3_MILES = 22
const S_V3_COV   = 23
const S_HAD_INS  = 24
const S_CUR_INS  = 25
const S_YRS_INS  = 26
const S_DRV_CNT  = 27
const S_D1_GEN   = 28
const S_D1_MAR   = 29
const S_D1_EDU   = 30
const S_D1_OCC   = 31
const S_D1_CRD   = 32
const S_D1_ACC   = 33
const S_D1_TKT   = 34
const S_D1_DUI   = 35
const S_D1_SUS   = 36
const S_D2_REL   = 37
const S_D2_GEN   = 38
const S_D2_MAR   = 39
const S_D2_EDU   = 40
const S_D2_OCC   = 41
const S_D2_ACC   = 43
const S_D2_TKT   = 44
const S_D2_DUI   = 45
const S_D2_SUS   = 46
const S_D2_DOB   = 47
const S_D3_REL   = 48
const S_D3_GEN   = 49
const S_D3_MAR   = 50
const S_D3_EDU   = 51
const S_D3_OCC   = 52
const S_D3_ACC   = 53
const S_D3_TKT   = 54
const S_D3_DUI   = 55
const S_D3_SUS   = 56
const S_D3_DOB   = 57
const S_HOMEOWN   = 58
const S_HM_DISC   = 59
const S_RNT_DISC  = 60
const S_MILITARY  = 61
const S_HELP      = 62
const S_DOB       = 63
const S_AARP      = 64
const S_DRV_NAMES = 65
const S_ADDR      = 66
const S_EMAIL     = 67
const S_PHONE     = 68
const S_LOADING   = 69
const S_RESULTS   = 70

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
  const [currentStep, setCurrentStep] = useState(S_YEAR)

  // ── Vehicle 1 ────────────────────────────────────────────────────────
  const [vehicleYear, setVehicleYear]   = useState("")
  const [vehicleType, setVehicleType]   = useState<FormVehicleType>("car")
  const [vehicleMake, setVehicleMake]   = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [v1Ownership, setV1Ownership]   = useState("")
  const [v1PrimaryUse, setV1PrimaryUse] = useState("")
  const [v1Miles, setV1Miles]           = useState("")
  const [v1Coverage, setV1Coverage]     = useState("")

  // ── Vehicle 2 ────────────────────────────────────────────────────────
  const [addVehicle2, setAddVehicle2]   = useState<boolean | null>(null)
  const [v2Year, setV2Year]             = useState("")
  const [v2Make, setV2Make]             = useState("")
  const [v2VehicleType, setV2VehicleType] = useState<FormVehicleType>("car")
  const [v2Model, setV2Model]           = useState("")
  const [v2Ownership, setV2Ownership]   = useState("")
  const [v2PrimaryUse, setV2PrimaryUse] = useState("")
  const [v2Miles, setV2Miles]           = useState("")
  const [v2Coverage, setV2Coverage]     = useState("")

  // ── Vehicle 3 ────────────────────────────────────────────────────────
  const [addVehicle3, setAddVehicle3]   = useState<boolean | null>(null)
  const [v3Year, setV3Year]             = useState("")
  const [v3Make, setV3Make]             = useState("")
  const [v3VehicleType, setV3VehicleType] = useState<FormVehicleType>("car")
  const [v3Model, setV3Model]           = useState("")
  const [v3Ownership, setV3Ownership]   = useState("")
  const [v3PrimaryUse, setV3PrimaryUse] = useState("")
  const [v3Miles, setV3Miles]           = useState("")
  const [v3Coverage, setV3Coverage]     = useState("")

  // ── Insurance ────────────────────────────────────────────────────────
  const [hadInsurance, setHadInsurance]     = useState<boolean | null>(null)
  const [currentInsurer, setCurrentInsurer] = useState("")
  const [yearsInsured, setYearsInsured]     = useState("")

  // ── Drivers ──────────────────────────────────────────────────────────
  const [driverCount, setDriverCount]       = useState<1 | 2 | 3>(1)
  const [d1Gender, setD1Gender]             = useState("")
  const [d1Married, setD1Married]           = useState<boolean | null>(null)
  const [d1Education, setD1Education]       = useState("")
  const [d1Occupation, setD1Occupation]     = useState("")
  const [d1CreditScore, setD1CreditScore]   = useState("")
  const [d1Accidents, setD1Accidents]       = useState("")
  const [d1Tickets, setD1Tickets]           = useState("")
  const [d1DUI, setD1DUI]                   = useState<boolean | null>(null)
  const [d1Suspended, setD1Suspended]       = useState<boolean | null>(null)

  // ── Driver 2 ─────────────────────────────────────────────────────────
  const [d2Relation, setD2Relation]       = useState("")
  const [d2Gender, setD2Gender]           = useState("")
  const [d2Married, setD2Married]         = useState<boolean | null>(null)
  const [d2Education, setD2Education]     = useState("")
  const [d2Occupation, setD2Occupation]   = useState("")
  const [d2Accidents, setD2Accidents]     = useState("")
  const [d2Tickets, setD2Tickets]         = useState("")
  const [d2DUI, setD2DUI]                 = useState<boolean | null>(null)
  const [d2Suspended, setD2Suspended]     = useState<boolean | null>(null)
  const [d2DOB, setD2DOB]                 = useState("")

  // ── Driver 3 ─────────────────────────────────────────────────────────
  const [d3Relation, setD3Relation]       = useState("")
  const [d3Gender, setD3Gender]           = useState("")
  const [d3Married, setD3Married]         = useState<boolean | null>(null)
  const [d3Education, setD3Education]     = useState("")
  const [d3Occupation, setD3Occupation]   = useState("")
  const [d3Accidents, setD3Accidents]     = useState("")
  const [d3Tickets, setD3Tickets]         = useState("")
  const [d3DUI, setD3DUI]                 = useState<boolean | null>(null)
  const [d3Suspended, setD3Suspended]     = useState<boolean | null>(null)
  const [d3DOB, setD3DOB]                 = useState("")

  // ── Property ─────────────────────────────────────────────────────────
  const [isHomeowner, setIsHomeowner]         = useState<boolean | null>(null)
  const [wantsHomeDiscount, setWantsHomeDiscount] = useState<boolean | null>(null)

  // ── Discount / Goal ──────────────────────────────────────────────────
  const [wantsRentersDiscount, setWantsRentersDiscount] = useState<boolean | null>(null)
  const [servedMilitary, setServedMilitary]             = useState<boolean | null>(null)
  const [helpGoal, setHelpGoal]                         = useState("")
  const [belongsToAARP, setBelongsToAARP]               = useState<boolean | null>(null)

  // ── Driver names ──────────────────────────────────────────────────────
  const [d1FirstName, setD1FirstName]   = useState("")
  const [d1LastName, setD1LastName]     = useState("")
  const [d2FirstName, setD2FirstName]   = useState("")
  const [d2LastName, setD2LastName]     = useState("")
  const [d3FirstName, setD3FirstName]   = useState("")
  const [d3LastName, setD3LastName]     = useState("")

  // ── Contact ──────────────────────────────────────────────────────────
  const [dob, setDob]                     = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [email, setEmail]                 = useState("")
  const [phone, setPhone]                 = useState("")
  const [googlePlacesReady, setGooglePlacesReady] = useState(false)
  const [emailSubmitError, setEmailSubmitError] = useState<string | null>(null)

  const googlePlacesApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

  // ── Vehicle 1 handlers (steps 1-3 routing unchanged) ─────────────────
  const handleYearChange = (year: string) => {
    setVehicleYear(year)
    setVehicleMake("")
    setVehicleModel("")
    setCurrentStep(S_MAKE)
  }

  const handleVehicleTypeChange = (type: FormVehicleType) => {
    setVehicleType(type)
    setVehicleMake("")
    setVehicleModel("")
  }

  const handleMakeChange = (make: string) => {
    setVehicleMake(make)
    setVehicleModel("")
    setCurrentStep(S_MODEL)
  }

  const handleModelChange = (model: string) => {
    setVehicleModel(model)
    setCurrentStep(S_V1_OWN)
  }

  // ── Vehicle 1 car-flow handlers ───────────────────────────────────────
  const handleV1Own   = (v: string) => { setV1Ownership(v);  setCurrentStep(S_V1_USE) }
  const handleV1Use   = (v: string) => { setV1PrimaryUse(v); setCurrentStep(S_V1_MILES) }
  const handleV1Miles = (v: string) => { setV1Miles(v);      setCurrentStep(S_V1_COV) }
  const handleV1Cov   = (v: string) => { setV1Coverage(v);   setCurrentStep(S_ADD_V2) }

  // ── Add vehicle 2 ─────────────────────────────────────────────────────
  const handleAddV2 = (add: boolean) => {
    setAddVehicle2(add)
    if (add) {
      setV2VehicleType(vehicleType)
    } else {
      setV2Year(""); setV2Make(""); setV2Model("")
      setV2Ownership(""); setV2PrimaryUse(""); setV2Miles(""); setV2Coverage("")
      setAddVehicle3(null)
      setV3Year(""); setV3Make(""); setV3Model("")
      setV3Ownership(""); setV3PrimaryUse(""); setV3Miles(""); setV3Coverage("")
    }
    setCurrentStep(add ? S_V2_YEAR : S_HAD_INS)
  }

  // ── Vehicle 2 handlers ────────────────────────────────────────────────
  const handleV2VehicleTypeChange = (type: FormVehicleType) => {
    setV2VehicleType(type); setV2Make(""); setV2Model("")
  }

  const handleV2Year = (year: string) => {
    setV2Year(year); setV2Make(""); setV2Model("")
    setCurrentStep(S_V2_MAKE)
  }
  const handleV2Make  = (make: string)  => { setV2Make(make);  setV2Model(""); setCurrentStep(S_V2_MODEL) }
  const handleV2Model = (model: string) => { setV2Model(model); setCurrentStep(S_V2_OWN) }
  const handleV2Own   = (v: string) => { setV2Ownership(v);  setCurrentStep(S_V2_USE) }
  const handleV2Use   = (v: string) => { setV2PrimaryUse(v); setCurrentStep(S_V2_MILES) }
  const handleV2Miles = (v: string) => { setV2Miles(v);      setCurrentStep(S_V2_COV) }
  const handleV2Cov   = (v: string) => { setV2Coverage(v);   setCurrentStep(S_ADD_V3) }

  // ── Add vehicle 3 ─────────────────────────────────────────────────────
  const handleAddV3 = (add: boolean) => {
    setAddVehicle3(add)
    if (add) {
      setV3VehicleType(vehicleType)
    } else {
      setV3Year(""); setV3Make(""); setV3Model("")
      setV3Ownership(""); setV3PrimaryUse(""); setV3Miles(""); setV3Coverage("")
    }
    setCurrentStep(add ? S_V3_YEAR : S_HAD_INS)
  }

  // ── Vehicle 3 handlers ────────────────────────────────────────────────
  const handleV3VehicleTypeChange = (type: FormVehicleType) => {
    setV3VehicleType(type); setV3Make(""); setV3Model("")
  }

  const handleV3Year = (year: string) => {
    setV3Year(year); setV3Make(""); setV3Model("")
    setCurrentStep(S_V3_MAKE)
  }
  const handleV3Make  = (make: string)  => { setV3Make(make);  setV3Model(""); setCurrentStep(S_V3_MODEL) }
  const handleV3Model = (model: string) => { setV3Model(model); setCurrentStep(S_V3_OWN) }
  const handleV3Own   = (v: string) => { setV3Ownership(v);  setCurrentStep(S_V3_USE) }
  const handleV3Use   = (v: string) => { setV3PrimaryUse(v); setCurrentStep(S_V3_MILES) }
  const handleV3Miles = (v: string) => { setV3Miles(v);      setCurrentStep(S_V3_COV) }
  const handleV3Cov   = (v: string) => { setV3Coverage(v);   setCurrentStep(S_HAD_INS) }

  // ── Insurance handlers ────────────────────────────────────────────────
  const handleHadInsurance = (had: boolean) => {
    setHadInsurance(had)
    setCurrentStep(had ? S_CUR_INS : S_DRV_CNT)
  }
  const handleCurrentInsurer = (ins: string) => { setCurrentInsurer(ins); setCurrentStep(S_YRS_INS) }
  const handleYearsInsured   = (v: string)   => { setYearsInsured(v);     setCurrentStep(S_DRV_CNT) }

  // ── Driver handlers ───────────────────────────────────────────────────
  const handleDriverCount = (count: 1 | 2 | 3) => { setDriverCount(count); setCurrentStep(S_D1_GEN) }
  const handleD1Gender    = (v: string)  => { setD1Gender(v);     setCurrentStep(S_D1_MAR) }
  const handleD1Married   = (v: boolean) => { setD1Married(v);    setCurrentStep(S_D1_EDU) }
  const handleD1Education = (v: string)  => { setD1Education(v);  setCurrentStep(S_D1_OCC) }
  const handleD1Occupation = (v: string) => { setD1Occupation(v); setCurrentStep(S_D1_CRD) }
  const handleD1Credit    = (v: string)  => { setD1CreditScore(v); setCurrentStep(S_D1_ACC) }
  const handleD1Accidents = (v: string)  => { setD1Accidents(v);  setCurrentStep(S_D1_TKT) }
  const handleD1Tickets   = (v: string)  => { setD1Tickets(v);    setCurrentStep(S_D1_DUI) }
  const handleD1DUI       = (v: boolean) => { setD1DUI(v);        setCurrentStep(S_D1_SUS) }
  const handleD1Suspended = (v: boolean) => {
    setD1Suspended(v)
    setCurrentStep(driverCount >= 2 ? S_D2_REL : S_HOMEOWN)
  }

  // ── Driver 2 handlers ─────────────────────────────────────────────────
  const handleD2Relation   = (v: string)  => { setD2Relation(v);   setCurrentStep(S_D2_GEN) }
  const handleD2Gender     = (v: string)  => { setD2Gender(v);     setCurrentStep(S_D2_MAR) }
  const handleD2Married    = (v: boolean) => { setD2Married(v);    setCurrentStep(S_D2_EDU) }
  const handleD2Education  = (v: string)  => { setD2Education(v);  setCurrentStep(S_D2_OCC) }
  const handleD2Occupation = (v: string)  => { setD2Occupation(v); setCurrentStep(S_D2_ACC) }
  const handleD2Accidents  = (v: string)  => { setD2Accidents(v);  setCurrentStep(S_D2_TKT) }
  const handleD2Tickets    = (v: string)  => { setD2Tickets(v);    setCurrentStep(S_D2_DUI) }
  const handleD2DUI        = (v: boolean) => { setD2DUI(v);        setCurrentStep(S_D2_SUS) }
  const handleD2Suspended  = (v: boolean) => { setD2Suspended(v);  setCurrentStep(S_D2_DOB) }
  const handleD2DOBNext    = ()           => { setCurrentStep(driverCount >= 3 ? S_D3_REL : S_HOMEOWN) }

  // ── Driver 3 handlers ─────────────────────────────────────────────────
  const handleD3Relation   = (v: string)  => { setD3Relation(v);   setCurrentStep(S_D3_GEN) }
  const handleD3Gender     = (v: string)  => { setD3Gender(v);     setCurrentStep(S_D3_MAR) }
  const handleD3Married    = (v: boolean) => { setD3Married(v);    setCurrentStep(S_D3_EDU) }
  const handleD3Education  = (v: string)  => { setD3Education(v);  setCurrentStep(S_D3_OCC) }
  const handleD3Occupation = (v: string)  => { setD3Occupation(v); setCurrentStep(S_D3_ACC) }
  const handleD3Accidents  = (v: string)  => { setD3Accidents(v);  setCurrentStep(S_D3_TKT) }
  const handleD3Tickets    = (v: string)  => { setD3Tickets(v);    setCurrentStep(S_D3_DUI) }
  const handleD3DUI        = (v: boolean) => { setD3DUI(v);        setCurrentStep(S_D3_SUS) }
  const handleD3Suspended  = (v: boolean) => { setD3Suspended(v);  setCurrentStep(S_D3_DOB) }
  const handleD3DOBNext    = ()           => { setCurrentStep(S_HOMEOWN) }

  // ── Property handlers ─────────────────────────────────────────────────
  const handleHomeowner = (v: boolean) => {
    setIsHomeowner(v)
    setCurrentStep(v ? S_HM_DISC : S_RNT_DISC)
  }
  const handleHomeDiscount    = (v: boolean) => { setWantsHomeDiscount(v);    setCurrentStep(S_MILITARY) }
  const handleRentersDiscount = (v: boolean) => { setWantsRentersDiscount(v); setCurrentStep(S_MILITARY) }
  const handleMilitary        = (v: boolean) => { setServedMilitary(v);       setCurrentStep(S_HELP) }
  const handleHelp            = (v: string)  => { setHelpGoal(v);             setCurrentStep(S_DOB) }

  // ── Contact handlers ──────────────────────────────────────────────────
  const handleDobNext          = () => setCurrentStep(S_AARP)
  const handleAARP             = (v: boolean) => { setBelongsToAARP(v); setCurrentStep(S_DRV_NAMES) }
  const handleDriverNamesNext  = () => setCurrentStep(S_ADDR)
  const handleAddrNext         = () => setCurrentStep(S_EMAIL)
  const handleEmailNext = () => {
    setEmailSubmitError(null)
    setCurrentStep(S_PHONE)
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
      d2FirstName,
      d2LastName,
      d3FirstName,
      d3LastName,
      vehicleYear,
      vehicleType,
      vehicleMake,
      vehicleModel,
      v1Ownership,
      v1PrimaryUse,
      v1Miles,
      v1Coverage,
      addVehicle2,
      v2Year,
      v2Make,
      v2VehicleType,
      v2Model,
      v2Ownership,
      v2PrimaryUse,
      v2Miles,
      v2Coverage,
      addVehicle3,
      v3Year,
      v3Make,
      v3VehicleType,
      v3Model,
      v3Ownership,
      v3PrimaryUse,
      v3Miles,
      v3Coverage,
      hadInsurance,
      currentInsurer,
      yearsInsured,
      driverCount,
      d1Gender,
      d1Married,
      d1Education,
      d1Occupation,
      d1CreditScore,
      d1Accidents,
      d1Tickets,
      d1DUI,
      d1Suspended,
      d2Relation,
      d2Gender,
      d2Married,
      d2Education,
      d2Occupation,
      d2Accidents,
      d2Tickets,
      d2DUI,
      d2Suspended,
      d2DOB,
      d3Relation,
      d3Gender,
      d3Married,
      d3Education,
      d3Occupation,
      d3Accidents,
      d3Tickets,
      d3DUI,
      d3Suspended,
      d3DOB,
      isHomeowner,
      wantsHomeDiscount,
      wantsRentersDiscount,
      servedMilitary,
      helpGoal,
      belongsToAARP,
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
        setCurrentStep(S_EMAIL)
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

    setCurrentStep(S_LOADING)
  }

  const vehicleCount = 1 + (addVehicle2 === true ? 1 : 0) + (addVehicle3 === true ? 1 : 0)

  // ── Post-form screens (full-page takeover) ────────────────────────────
  if (currentStep === S_LOADING) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <StepLoading
          firstName={d1FirstName || "there"}
          cityName={cityName}
          onComplete={() => setCurrentStep(S_RESULTS)}
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
        driverCount={driverCount}
      />
    )
  }

  return (
    <div className="min-h-screen flex-1 p-6">
      {googlePlacesApiKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${googlePlacesApiKey}&libraries=places`}
          strategy="lazyOnload"
          onLoad={() => setGooglePlacesReady(true)}
        />
      )}
      <div className="w-full max-w-4xl mx-auto">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <TrustedForm />
          <FormProgressHeader
            cityName={cityName}
            currentStep={currentStep}
            totalSteps={FORM_TOTAL_STEPS}
            tagline={currentStep === S_EMAIL && d1FirstName ? `${d1FirstName}, you're almost done!` : undefined}
          />

          {/* ── Vehicle 1: Year / Make / Model (existing steps 1-3) ── */}
          {currentStep === S_YEAR && (
            <VehicleYearStep value={vehicleYear} onChange={handleYearChange} />
          )}

          {currentStep === S_MAKE && vehicleYear && (
            <VehicleMakeStep
              year={vehicleYear}
              vehicleType={vehicleType}
              onVehicleTypeChange={handleVehicleTypeChange}
              value={vehicleMake}
              onChange={handleMakeChange}
            />
          )}

          {currentStep === S_MODEL && vehicleYear && vehicleMake && (
            <VehicleModelStep
              year={vehicleYear}
              make={vehicleMake}
              vehicleType={vehicleType}
              value={vehicleModel}
              onChange={handleModelChange}
            />
          )}

          {/* ── Vehicle 1: Car flow ── */}
          {currentStep === S_V1_OWN && (
            <StepCarOwnership make={vehicleMake} model={vehicleModel} value={v1Ownership} onChange={handleV1Own} />
          )}
          {currentStep === S_V1_USE && (
            <StepCarPrimaryUse make={vehicleMake} model={vehicleModel} value={v1PrimaryUse} onChange={handleV1Use} />
          )}
          {currentStep === S_V1_MILES && (
            <StepCarMilesPerDay make={vehicleMake} model={vehicleModel} value={v1Miles} onChange={handleV1Miles} />
          )}
          {currentStep === S_V1_COV && (
            <StepCarCoverageLevel value={v1Coverage} onChange={handleV1Cov} />
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
              vehicleType={v2VehicleType}
              onVehicleTypeChange={handleV2VehicleTypeChange}
              showTypeToggle={false}
              value={v2Make}
              onChange={handleV2Make}
            />
          )}
          {addVehicle2 === true && currentStep === S_V2_MODEL && v2Year && v2Make && (
            <VehicleModelStep
              year={v2Year}
              make={v2Make}
              vehicleType={v2VehicleType}
              value={v2Model}
              onChange={handleV2Model}
            />
          )}

          {/* ── Vehicle 2: Car flow ── */}
          {addVehicle2 === true && currentStep === S_V2_OWN && (
            <StepCarOwnership make={v2Make} model={v2Model} value={v2Ownership} onChange={handleV2Own} />
          )}
          {addVehicle2 === true && currentStep === S_V2_USE && (
            <StepCarPrimaryUse make={v2Make} model={v2Model} value={v2PrimaryUse} onChange={handleV2Use} />
          )}
          {addVehicle2 === true && currentStep === S_V2_MILES && (
            <StepCarMilesPerDay make={v2Make} model={v2Model} value={v2Miles} onChange={handleV2Miles} />
          )}
          {addVehicle2 === true && currentStep === S_V2_COV && (
            <StepCarCoverageLevel value={v2Coverage} onChange={handleV2Cov} />
          )}

          {/* ── Add vehicle 3 (only shown when V2 was added) ── */}
          {addVehicle2 === true && currentStep === S_ADD_V3 && (
            <StepAddVehicle vehicleNumber={3} value={addVehicle3} onChange={handleAddV3} />
          )}

          {/* ── Vehicle 3: Year / Make / Model ── */}
          {addVehicle2 === true && addVehicle3 === true && currentStep === S_V3_YEAR && (
            <VehicleYearStep value={v3Year} onChange={handleV3Year} />
          )}
          {addVehicle2 === true && addVehicle3 === true && currentStep === S_V3_MAKE && v3Year && (
            <VehicleMakeStep
              year={v3Year}
              title="What make is your third vehicle?"
              vehicleType={v3VehicleType}
              onVehicleTypeChange={handleV3VehicleTypeChange}
              showTypeToggle={false}
              value={v3Make}
              onChange={handleV3Make}
            />
          )}
          {addVehicle2 === true && addVehicle3 === true && currentStep === S_V3_MODEL && v3Year && v3Make && (
            <VehicleModelStep
              year={v3Year}
              make={v3Make}
              vehicleType={v3VehicleType}
              value={v3Model}
              onChange={handleV3Model}
            />
          )}

          {/* ── Vehicle 3: Car flow ── */}
          {addVehicle2 === true && addVehicle3 === true && currentStep === S_V3_OWN && (
            <StepCarOwnership make={v3Make} model={v3Model} value={v3Ownership} onChange={handleV3Own} />
          )}
          {addVehicle2 === true && addVehicle3 === true && currentStep === S_V3_USE && (
            <StepCarPrimaryUse make={v3Make} model={v3Model} value={v3PrimaryUse} onChange={handleV3Use} />
          )}
          {addVehicle2 === true && addVehicle3 === true && currentStep === S_V3_MILES && (
            <StepCarMilesPerDay make={v3Make} model={v3Model} value={v3Miles} onChange={handleV3Miles} />
          )}
          {addVehicle2 === true && addVehicle3 === true && currentStep === S_V3_COV && (
            <StepCarCoverageLevel value={v3Coverage} onChange={handleV3Cov} />
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

          {/* ── Driver 1 ── */}
          {currentStep === S_DRV_CNT && (
            <StepDriverCount value={driverCount} onChange={handleDriverCount} />
          )}
          {currentStep === S_D1_GEN && (
            <StepDriverGender value={d1Gender} onChange={handleD1Gender} />
          )}
          {currentStep === S_D1_MAR && (
            <StepDriverMarried value={d1Married} onChange={handleD1Married} />
          )}
          {currentStep === S_D1_EDU && (
            <StepDriverEducation value={d1Education} onChange={handleD1Education} />
          )}
          {currentStep === S_D1_OCC && (
            <StepDriverOccupation value={d1Occupation} onChange={handleD1Occupation} />
          )}
          {currentStep === S_D1_CRD && (
            <StepDriverCreditScore value={d1CreditScore} onChange={handleD1Credit} />
          )}
          {currentStep === S_D1_ACC && (
            <StepDriverAccidents value={d1Accidents} onChange={handleD1Accidents} />
          )}
          {currentStep === S_D1_TKT && (
            <StepDriverTickets value={d1Tickets} onChange={handleD1Tickets} />
          )}
          {currentStep === S_D1_DUI && (
            <StepDriverDUI value={d1DUI} onChange={handleD1DUI} />
          )}
          {currentStep === S_D1_SUS && (
            <StepDriverLicenseSuspended value={d1Suspended} onChange={handleD1Suspended} />
          )}

          {/* ── Driver 2 (conditional on driverCount >= 2) ── */}
          {currentStep === S_D2_REL && (
            <StepDriver2Relation value={d2Relation} onChange={handleD2Relation} />
          )}
          {currentStep === S_D2_GEN && (
            <StepDriver2Gender value={d2Gender} onChange={handleD2Gender} />
          )}
          {currentStep === S_D2_MAR && (
            <StepDriver2Married value={d2Married} onChange={handleD2Married} />
          )}
          {currentStep === S_D2_EDU && (
            <StepDriver2Education value={d2Education} onChange={handleD2Education} />
          )}
          {currentStep === S_D2_OCC && (
            <StepDriver2Occupation value={d2Occupation} onChange={handleD2Occupation} />
          )}
          {currentStep === S_D2_ACC && (
            <StepDriver2Accidents value={d2Accidents} onChange={handleD2Accidents} />
          )}
          {currentStep === S_D2_TKT && (
            <StepDriver2Tickets value={d2Tickets} onChange={handleD2Tickets} />
          )}
          {currentStep === S_D2_DUI && (
            <StepDriver2DUI value={d2DUI} onChange={handleD2DUI} />
          )}
          {currentStep === S_D2_SUS && (
            <StepDriver2LicenseSuspended value={d2Suspended} onChange={handleD2Suspended} />
          )}
          {currentStep === S_D2_DOB && (
            <StepDriver2DOB value={d2DOB} onChange={setD2DOB} onNext={handleD2DOBNext} />
          )}

          {/* ── Driver 3 (conditional on driverCount === 3) ── */}
          {driverCount >= 3 && currentStep === S_D3_REL && (
            <StepDriver3Relation value={d3Relation} onChange={handleD3Relation} />
          )}
          {driverCount >= 3 && currentStep === S_D3_GEN && (
            <StepDriver3Gender value={d3Gender} onChange={handleD3Gender} />
          )}
          {driverCount >= 3 && currentStep === S_D3_MAR && (
            <StepDriver3Married value={d3Married} onChange={handleD3Married} />
          )}
          {driverCount >= 3 && currentStep === S_D3_EDU && (
            <StepDriver3Education value={d3Education} onChange={handleD3Education} />
          )}
          {driverCount >= 3 && currentStep === S_D3_OCC && (
            <StepDriver3Occupation value={d3Occupation} onChange={handleD3Occupation} />
          )}
          {driverCount >= 3 && currentStep === S_D3_ACC && (
            <StepDriver3Accidents value={d3Accidents} onChange={handleD3Accidents} />
          )}
          {driverCount >= 3 && currentStep === S_D3_TKT && (
            <StepDriver3Tickets value={d3Tickets} onChange={handleD3Tickets} />
          )}
          {driverCount >= 3 && currentStep === S_D3_DUI && (
            <StepDriver3DUI value={d3DUI} onChange={handleD3DUI} />
          )}
          {driverCount >= 3 && currentStep === S_D3_SUS && (
            <StepDriver3LicenseSuspended value={d3Suspended} onChange={handleD3Suspended} />
          )}
          {driverCount >= 3 && currentStep === S_D3_DOB && (
            <StepDriver3DOB value={d3DOB} onChange={setD3DOB} onNext={handleD3DOBNext} />
          )}

          {/* ── Property ── */}
          {currentStep === S_HOMEOWN && (
            <StepHomeowner value={isHomeowner} onChange={handleHomeowner} />
          )}
          {currentStep === S_HM_DISC && (
            <StepHomeDiscount value={wantsHomeDiscount} onChange={handleHomeDiscount} />
          )}
          {currentStep === S_RNT_DISC && (
            <StepRentersDiscount value={wantsRentersDiscount} onChange={handleRentersDiscount} />
          )}

          {/* ── Post-homeowner questions ── */}
          {currentStep === S_MILITARY && (
            <StepMilitaryService value={servedMilitary} onChange={handleMilitary} />
          )}
          {currentStep === S_HELP && (
            <StepHelpGoal value={helpGoal} onChange={handleHelp} />
          )}

          {/* ── Contact ── */}
          {currentStep === S_DOB && (
            <StepDOB value={dob} onChange={setDob} onNext={handleDobNext} />
          )}
          {currentStep === S_AARP && (
            <StepAARP value={belongsToAARP} onChange={handleAARP} />
          )}
          {currentStep === S_DRV_NAMES && (
            <StepDriverNames
              driverCount={driverCount}
              d1FirstName={d1FirstName}
              d1LastName={d1LastName}
              onD1FirstName={setD1FirstName}
              onD1LastName={setD1LastName}
              d2FirstName={d2FirstName}
              d2LastName={d2LastName}
              onD2FirstName={setD2FirstName}
              onD2LastName={setD2LastName}
              d3FirstName={d3FirstName}
              d3LastName={d3LastName}
              onD3FirstName={setD3FirstName}
              onD3LastName={setD3LastName}
              onNext={handleDriverNamesNext}
            />
          )}
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
        </form>
      </div>
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
