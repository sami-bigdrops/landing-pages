"use client"

import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { FormRadioIndicator } from "./FormRadioIndicator"

interface StepDriver3OccupationProps {
  value: string
  onChange: (v: string) => void
}

const OPTIONS = [
  "Employed Worker / Professional",
  "Retired",
  "Manager / Supervisor",
  "Self Employed",
  "Business Owner",
  "Student",
  "Stay at Home Parent",
  "Not Currently Working",
]

export function StepDriver3Occupation({ value, onChange }: StepDriver3OccupationProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        What is your third driver&apos;s occupation?
      </h2>

      <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-label="Third driver occupation">
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
              <span className="text-base font-medium" style={FORM_STEP_TITLE_STYLE}>
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
