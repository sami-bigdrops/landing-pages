"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useCityFromZip } from "@/hooks/use-city-from-zip"
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
import { StepHomeowner } from "./StepHomeowner"
import { StepHomeDiscount } from "./StepHomeDiscount"
import { StepDOB } from "./StepDOB"
import { StepZipCode } from "./StepZipCode"
import { StepAddress } from "./StepAddress"
import { StepName } from "./StepName"
import { StepEmail } from "./StepEmail"
import { StepPhone } from "./StepPhone"

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
const S_HOMEOWN  = 41
const S_HM_DISC  = 42
const S_DOB      = 43
const S_ZIP      = 44
const S_ADDR     = 45
const S_NAME     = 46
const S_EMAIL    = 47
const S_PHONE    = 48

function FormPage() {
  const searchParams = useSearchParams()
  const zipFromUrl = searchParams.get("zip")
  const cityName = useCityFromZip(zipFromUrl)

  // ── Routing ──────────────────────────────────────────────────────────
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
  const [v2VehicleType, setV2VehicleType] = useState<FormVehicleType>("car")
  const [v2Make, setV2Make]             = useState("")
  const [v2Model, setV2Model]           = useState("")
  const [v2Ownership, setV2Ownership]   = useState("")
  const [v2PrimaryUse, setV2PrimaryUse] = useState("")
  const [v2Miles, setV2Miles]           = useState("")
  const [v2Coverage, setV2Coverage]     = useState("")

  // ── Vehicle 3 ────────────────────────────────────────────────────────
  const [addVehicle3, setAddVehicle3]   = useState<boolean | null>(null)
  const [v3Year, setV3Year]             = useState("")
  const [v3VehicleType, setV3VehicleType] = useState<FormVehicleType>("car")
  const [v3Make, setV3Make]             = useState("")
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
  const [d2Relation, setD2Relation]   = useState("")
  const [d2Gender, setD2Gender]       = useState("")
  const [d2Married, setD2Married]     = useState<boolean | null>(null)
  const [d2Education, setD2Education] = useState("")

  // ── Property ─────────────────────────────────────────────────────────
  const [isHomeowner, setIsHomeowner]         = useState<boolean | null>(null)
  const [wantsHomeDiscount, setWantsHomeDiscount] = useState<boolean | null>(null)

  // ── Contact ──────────────────────────────────────────────────────────
  const [dob, setDob]                   = useState("")
  const [zipCode, setZipCode]           = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [firstName, setFirstName]       = useState("")
  const [lastName, setLastName]         = useState("")
  const [email, setEmail]               = useState("")
  const [phone, setPhone]               = useState("")

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
    if (vehicleType === "car") setCurrentStep(S_V1_OWN)
  }

  // ── Vehicle 1 car-flow handlers ───────────────────────────────────────
  const handleV1Own   = (v: string) => { setV1Ownership(v);  setCurrentStep(S_V1_USE) }
  const handleV1Use   = (v: string) => { setV1PrimaryUse(v); setCurrentStep(S_V1_MILES) }
  const handleV1Miles = (v: string) => { setV1Miles(v);      setCurrentStep(S_V1_COV) }
  const handleV1Cov   = (v: string) => { setV1Coverage(v);   setCurrentStep(S_ADD_V2) }

  // ── Add vehicle 2 ─────────────────────────────────────────────────────
  const handleAddV2 = (add: boolean) => {
    setAddVehicle2(add)
    setCurrentStep(add ? S_V2_YEAR : S_HAD_INS)
  }

  // ── Vehicle 2 handlers ────────────────────────────────────────────────
  const handleV2Year = (year: string) => {
    setV2Year(year); setV2Make(""); setV2Model("")
    setCurrentStep(S_V2_MAKE)
  }
  const handleV2VehicleType = (type: FormVehicleType) => {
    setV2VehicleType(type); setV2Make(""); setV2Model("")
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
    setCurrentStep(add ? S_V3_YEAR : S_HAD_INS)
  }

  // ── Vehicle 3 handlers ────────────────────────────────────────────────
  const handleV3Year = (year: string) => {
    setV3Year(year); setV3Make(""); setV3Model("")
    setCurrentStep(S_V3_MAKE)
  }
  const handleV3VehicleType = (type: FormVehicleType) => {
    setV3VehicleType(type); setV3Make(""); setV3Model("")
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
  const handleD2Relation  = (v: string)  => { setD2Relation(v);  setCurrentStep(S_D2_GEN) }
  const handleD2Gender    = (v: string)  => { setD2Gender(v);    setCurrentStep(S_D2_MAR) }
  const handleD2Married   = (v: boolean) => { setD2Married(v);   setCurrentStep(S_D2_EDU) }
  const handleD2Education = (v: string)  => { setD2Education(v); setCurrentStep(S_HOMEOWN) }

  // ── Property handlers ─────────────────────────────────────────────────
  const handleHomeowner = (v: boolean) => {
    setIsHomeowner(v)
    setCurrentStep(v ? S_HM_DISC : S_DOB)
  }
  const handleHomeDiscount = (v: boolean) => { setWantsHomeDiscount(v); setCurrentStep(S_DOB) }

  // ── Contact handlers ──────────────────────────────────────────────────
  const handleDobNext     = () => setCurrentStep(S_ZIP)
  const handleZipNext     = () => setCurrentStep(S_ADDR)
  const handleAddrNext    = () => setCurrentStep(S_NAME)
  const handleNameNext    = () => setCurrentStep(S_EMAIL)
  const handleEmailNext   = () => setCurrentStep(S_PHONE)
  const handlePhoneSubmit = () => {
    // TODO: submit form data
  }

  return (
    <div className="min-h-screen flex-1 p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          <FormProgressHeader
            cityName={cityName}
            currentStep={currentStep}
            totalSteps={FORM_TOTAL_STEPS}
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
          {currentStep === S_V2_YEAR && (
            <VehicleYearStep value={v2Year} onChange={handleV2Year} />
          )}
          {currentStep === S_V2_MAKE && v2Year && (
            <VehicleMakeStep
              year={v2Year}
              vehicleType={v2VehicleType}
              onVehicleTypeChange={handleV2VehicleType}
              value={v2Make}
              onChange={handleV2Make}
            />
          )}
          {currentStep === S_V2_MODEL && v2Year && v2Make && (
            <VehicleModelStep
              year={v2Year}
              make={v2Make}
              vehicleType={v2VehicleType}
              value={v2Model}
              onChange={handleV2Model}
            />
          )}

          {/* ── Vehicle 2: Car flow ── */}
          {currentStep === S_V2_OWN && (
            <StepCarOwnership make={v2Make} model={v2Model} value={v2Ownership} onChange={handleV2Own} />
          )}
          {currentStep === S_V2_USE && (
            <StepCarPrimaryUse make={v2Make} model={v2Model} value={v2PrimaryUse} onChange={handleV2Use} />
          )}
          {currentStep === S_V2_MILES && (
            <StepCarMilesPerDay make={v2Make} model={v2Model} value={v2Miles} onChange={handleV2Miles} />
          )}
          {currentStep === S_V2_COV && (
            <StepCarCoverageLevel value={v2Coverage} onChange={handleV2Cov} />
          )}

          {/* ── Add vehicle 3 ── */}
          {currentStep === S_ADD_V3 && (
            <StepAddVehicle vehicleNumber={3} value={addVehicle3} onChange={handleAddV3} />
          )}

          {/* ── Vehicle 3: Year / Make / Model ── */}
          {currentStep === S_V3_YEAR && (
            <VehicleYearStep value={v3Year} onChange={handleV3Year} />
          )}
          {currentStep === S_V3_MAKE && v3Year && (
            <VehicleMakeStep
              year={v3Year}
              vehicleType={v3VehicleType}
              onVehicleTypeChange={handleV3VehicleType}
              value={v3Make}
              onChange={handleV3Make}
            />
          )}
          {currentStep === S_V3_MODEL && v3Year && v3Make && (
            <VehicleModelStep
              year={v3Year}
              make={v3Make}
              vehicleType={v3VehicleType}
              value={v3Model}
              onChange={handleV3Model}
            />
          )}

          {/* ── Vehicle 3: Car flow ── */}
          {currentStep === S_V3_OWN && (
            <StepCarOwnership make={v3Make} model={v3Model} value={v3Ownership} onChange={handleV3Own} />
          )}
          {currentStep === S_V3_USE && (
            <StepCarPrimaryUse make={v3Make} model={v3Model} value={v3PrimaryUse} onChange={handleV3Use} />
          )}
          {currentStep === S_V3_MILES && (
            <StepCarMilesPerDay make={v3Make} model={v3Model} value={v3Miles} onChange={handleV3Miles} />
          )}
          {currentStep === S_V3_COV && (
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

          {/* ── Property ── */}
          {currentStep === S_HOMEOWN && (
            <StepHomeowner value={isHomeowner} onChange={handleHomeowner} />
          )}
          {currentStep === S_HM_DISC && (
            <StepHomeDiscount value={wantsHomeDiscount} onChange={handleHomeDiscount} />
          )}

          {/* ── Contact ── */}
          {currentStep === S_DOB && (
            <StepDOB value={dob} onChange={setDob} onNext={handleDobNext} />
          )}
          {currentStep === S_ZIP && (
            <StepZipCode value={zipCode} onChange={setZipCode} onNext={handleZipNext} />
          )}
          {currentStep === S_ADDR && (
            <StepAddress value={streetAddress} onChange={setStreetAddress} onNext={handleAddrNext} />
          )}
          {currentStep === S_NAME && (
            <StepName
              firstName={firstName}
              lastName={lastName}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onNext={handleNameNext}
            />
          )}
          {currentStep === S_EMAIL && (
            <StepEmail value={email} onChange={setEmail} onNext={handleEmailNext} />
          )}
          {currentStep === S_PHONE && (
            <StepPhone value={phone} onChange={setPhone} onSubmit={handlePhoneSubmit} />
          )}
        </div>
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
