"use client"

import { cn } from "@workspace/ui/lib/utils"
import { FORM_PRIMARY_COLOR, FORM_SELECTED_BG, FORM_SELECTED_BORDER } from "@/lib/constant"

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

      <div className="grid grid-cols-2 gap-3 md:gap-4" role="radiogroup" aria-label={`Add ${ordinal} vehicle`}>
        {([true, false] as const).map((bool) => {
          const label = bool ? "Yes" : "No"
          const isSelected = value === bool
          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(bool)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-lg border px-4 py-6 transition-colors duration-200",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BG }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="text-lg lg:text-xl xl:text-2xl font-bold"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
