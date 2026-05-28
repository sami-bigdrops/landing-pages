"use client"

import { cn } from "@workspace/ui/lib/utils"
import { FORM_PRIMARY_COLOR, FORM_SELECTED_BG, FORM_SELECTED_BORDER } from "@/lib/constant"

interface StepDriver2TicketsProps {
  value: string
  onChange: (v: string) => void
}

const OPTIONS = ["0", "1", "2", "3+"]

export function StepDriver2Tickets({ value, onChange }: StepDriver2TicketsProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        How many tickets has your second driver had in the past three (3) years?
      </h2>

      <div className="grid grid-cols-4 gap-3 md:gap-4" role="radiogroup" aria-label="Second driver tickets">
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
                "flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-5 transition-colors duration-200",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BG }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="text-2xl xl:text-3xl font-bold tabular-nums"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {option}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
