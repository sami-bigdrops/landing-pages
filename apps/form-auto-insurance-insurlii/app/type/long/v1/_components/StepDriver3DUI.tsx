"use client"

import { cn } from "@workspace/ui/lib/utils"
import { FORM_PRIMARY_COLOR, FORM_SELECTED_BG, FORM_SELECTED_BORDER } from "@/lib/constant"

interface StepDriver3DUIProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver3DUI({ value, onChange }: StepDriver3DUIProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Has your third driver had a DUI conviction in the past three (3) years or need an SR-22 form?
      </h2>

      <div className="grid grid-cols-2 gap-3 md:gap-4" role="radiogroup" aria-label="Third driver DUI conviction">
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
              <span className="text-lg lg:text-xl xl:text-2xl font-bold" style={{ color: FORM_PRIMARY_COLOR }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
