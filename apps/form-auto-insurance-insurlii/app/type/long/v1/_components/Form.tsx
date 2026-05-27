"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useCityFromZip } from "@/hooks/use-city-from-zip"
import { FORM_TOTAL_STEPS, type FormVehicleType } from "@/lib/constant"
import { FormProgressHeader } from "./FormProgressHeader"
import { VehicleMakeStep } from "./VehicleMakeStep"
import { VehicleModelStep } from "./VehicleModelStep"
import { VehicleYearStep } from "./VehicleYearStep"

function FormPage() {
  const searchParams = useSearchParams()
  const zipFromUrl = searchParams.get("zip")
  const cityName = useCityFromZip(zipFromUrl)
  const [currentStep, setCurrentStep] = useState(1)
  const [vehicleYear, setVehicleYear] = useState("")
  const [vehicleType, setVehicleType] = useState<FormVehicleType>("car")
  const [vehicleMake, setVehicleMake] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")

  const handleYearChange = (year: string) => {
    setVehicleYear(year)
    setVehicleMake("")
    setVehicleModel("")
    setCurrentStep(2)
  }

  const handleVehicleTypeChange = (type: FormVehicleType) => {
    setVehicleType(type)
    setVehicleMake("")
    setVehicleModel("")
  }

  const handleMakeChange = (make: string) => {
    setVehicleMake(make)
    setVehicleModel("")
    setCurrentStep(3)
  }

  return (
    <div className="min-h-screen flex-1 p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          <FormProgressHeader
            cityName={cityName}
            currentStep={currentStep}
            totalSteps={FORM_TOTAL_STEPS}
          />

          {currentStep === 1 && (
            <VehicleYearStep value={vehicleYear} onChange={handleYearChange} />
          )}

          {currentStep === 2 && vehicleYear && (
            <VehicleMakeStep
              year={vehicleYear}
              vehicleType={vehicleType}
              onVehicleTypeChange={handleVehicleTypeChange}
              value={vehicleMake}
              onChange={handleMakeChange}
            />
          )}

          {currentStep === 3 && vehicleYear && vehicleMake && (
            <VehicleModelStep
              year={vehicleYear}
              make={vehicleMake}
              vehicleType={vehicleType}
              value={vehicleModel}
              onChange={setVehicleModel}
            />
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
