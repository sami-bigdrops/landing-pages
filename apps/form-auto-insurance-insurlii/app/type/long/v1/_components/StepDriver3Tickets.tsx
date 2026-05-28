"use client"

import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"

interface StepDriver3TicketsProps {
  value: string
  onChange: (v: string) => void
}

const OPTIONS = ["0", "1", "2", "3+"]

export function StepDriver3Tickets({ value, onChange }: StepDriver3TicketsProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        How many tickets has your third driver had in the past three (3) years?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" role="radiogroup" aria-label="Third driver tickets">
        {OPTIONS.map((option) => {
          const isSelected = value === option
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option)}
              className={formOptionButtonClasses(isSelected, "flex flex-col items-center justify-center gap-1 rounded-lg border px-4 py-4 lg:py-5 xl:py-6 transition-colors duration-200")}
            >
              <span className="text-xl md:text-xl lg:text-2xl  xl:text-2xl font-bold tabular-nums" style={{ color: FORM_PRIMARY_COLOR }}>
                {option}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
