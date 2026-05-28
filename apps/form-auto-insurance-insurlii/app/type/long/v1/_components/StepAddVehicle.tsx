"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepAddVehicleProps {
  vehicleNumber: 2 | 3
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepAddVehicle({ vehicleNumber, value, onChange }: StepAddVehicleProps) {
  const ordinal = vehicleNumber === 2 ? "second" : "third"

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-3"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Add {ordinal} vehicle?
      </h2>
      <p className="text-center text-sm lg:text-base font-medium text-gray-500 mb-8 md:mb-10">
        Save an additional 20%
      </p>

      <YesNoOptions
        value={value}
        onChange={onChange}
        ariaLabel={`Add ${ordinal} vehicle`}
      />
    </div>
  )
}
