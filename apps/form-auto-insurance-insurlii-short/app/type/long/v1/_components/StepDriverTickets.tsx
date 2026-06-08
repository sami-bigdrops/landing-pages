"use client"

import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"


interface StepDriverTicketsProps {
  value: string
  onChange: (v: string) => void
}

const OPTIONS = ["0", "1", "2", "3+"]

export function StepDriverTickets({ value, onChange }: StepDriverTicketsProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        How many tickets have you had in the past three (3) years?
      </h2>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
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
              className={formOptionButtonClasses(isSelected, "flex flex-col items-center justify-center gap-1 rounded-lg border px-4 py-4 lg:py-5 xl:py-6 transition-colors duration-200")}
            >
              <span
                className="text-xl md:text-xl lg:text-2xl  xl:text-2xl font-bold tabular-nums"
                style={FORM_STEP_TITLE_STYLE}
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
