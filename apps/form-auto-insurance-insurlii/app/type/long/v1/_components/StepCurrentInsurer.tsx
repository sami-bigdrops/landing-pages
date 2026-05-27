"use client"

import { cn } from "@workspace/ui/lib/utils"
import { FORM_PRIMARY_COLOR, FORM_SELECTED_BG, FORM_SELECTED_BORDER } from "@/lib/constant"

interface StepCurrentInsurerProps {
  value: string
  onChange: (v: string) => void
}

const INSURERS = [
  "AAA",
  "Allstate",
  "Farm Bureau",
  "Farmers",
  "GEICO",
  "Liberty Mutual",
  "Nationwide",
  "Progressive",
  "Safeco",
  "State Farm",
  "The Hartford",
  "USAA",
  "Other",
]

export function StepCurrentInsurer({ value, onChange }: StepCurrentInsurerProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Who is your current insurer?
      </h2>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
        role="radiogroup"
        aria-label="Current insurer"
      >
        {INSURERS.map((insurer) => {
          const isSelected = value === insurer
          return (
            <button
              key={insurer}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(insurer)}
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-lg border px-3 py-4 transition-colors duration-200 min-h-[80px]",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BG }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: FORM_PRIMARY_COLOR }}
                aria-hidden
              >
                {insurer.charAt(0)}
              </span>
              <span
                className="text-xs lg:text-sm font-semibold text-center leading-tight"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {insurer}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
