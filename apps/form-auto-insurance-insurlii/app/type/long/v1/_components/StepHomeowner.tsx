"use client"

import { FormRadioIndicator } from "./FormRadioIndicator"
import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"


interface StepHomeownerProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

const OPTIONS = [
  { value: true, label: "Yes, I own my home" },
  { value: false, label: "No, I do not own my home" },
] as const

export function StepHomeowner({ value, onChange }: StepHomeownerProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Are you a homeowner?
      </h2>

      <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-label="Homeowner status">
        {OPTIONS.map(({ value: optVal, label }) => {
          const isSelected = value === optVal
          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(optVal)}
              className={formOptionButtonClasses(isSelected)}
            >
              <span
                className="text-base font-medium"
                style={FORM_STEP_TITLE_STYLE}
              >
                {label}
              </span>
              <FormRadioIndicator isSelected={isSelected} className="w-3.5 h-3.5 md:h-4.5 md:w-4.5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
