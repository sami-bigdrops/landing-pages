"use client"

import { FormRadioIndicator } from "./FormRadioIndicator"
import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"


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
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        How many miles per day do you drive with your {make} {model}?
      </h2>

      <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-label="Miles per day">
        {OPTIONS.map((option) => {
          const isSelected = value === option
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option)}
              className={formOptionButtonClasses(isSelected)}
            >
              <span
                className="text-base font-medium"
                style={FORM_STEP_TITLE_STYLE}
              >
                {option}
              </span>
              <FormRadioIndicator isSelected={isSelected} className="w-3.5 h-3.5 md:h-4.5 md:w-4.5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
