"use client"

import { cn } from "@workspace/ui/lib/utils"
import { FORM_PRIMARY_COLOR, FORM_SELECTED_BG, FORM_SELECTED_BORDER } from "@/lib/constant"

interface StepCarMilesPerDayProps {
  make: string
  model: string
  value: string
  onChange: (v: string) => void
}

const OPTIONS = ["Less than 15", "15-30", "30-40", "40-55", "More than 55"]

export function StepCarMilesPerDay({ make, model, value, onChange }: StepCarMilesPerDayProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        How many miles per day do you drive with your {make} {model}?
      </h2>

      <div className="grid grid-cols-1 gap-3 md:gap-4" role="radiogroup" aria-label="Miles per day">
        {OPTIONS.map((option) => {
          const isSelected = value === option
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option)}
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg border px-2.5 md:px-5 xl:px-6.5 py-3.5 text-left transition-colors duration-200",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BG }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="text-sm lg:text-base xl:text-lg font-semibold"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {option}
              </span>
              <span
                className={cn(
                  "flex w-3.5 h-3.5 md:h-4.5 md:w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  !isSelected && "border-gray-300 bg-white"
                )}
                style={
                  isSelected
                    ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BORDER }
                    : undefined
                }
                aria-hidden
              >
                {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
