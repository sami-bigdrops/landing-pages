"use client"

import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"
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
      <h2 className={`${FORM_STEP_TITLE_CLASSNAME} mb-3`} style={FORM_STEP_TITLE_STYLE}>
        Add {ordinal} vehicle?
      </h2>
      <p className="text-center text-base font-medium text-gray-500 mb-6 md:mb-8">
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
