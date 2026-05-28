"use client"

import { cn } from "@workspace/ui/lib/utils"
import { FORM_PRIMARY_COLOR, FORM_SELECTED_BG, FORM_SELECTED_BORDER } from "@/lib/constant"

interface StepDriverTicketsProps {
  value: string
  onChange: (v: string) => void
}

const OPTIONS = ["0", "1", "2", "3+"]

export function StepDriverTickets({ value, onChange }: StepDriverTicketsProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        How many tickets have you had in the past three (3) years?
      </h2>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        role="radiogroup"
        aria-label="Tickets"
      >
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
                "flex flex-col items-center justify-center gap-1 rounded-lg border px-4 py-4 lg:py-5 xl:py-6 transition-colors duration-200",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BG }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="text-xl md:text-xl lg:text-2xl  xl:text-2xl font-bold tabular-nums"
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
