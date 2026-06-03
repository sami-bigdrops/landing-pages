"use client"

import { formOptionButtonClasses } from "@/lib/form-input-styles"
import {
  FORM_OPTION_LABEL_CLASSNAME,
  FORM_OPTIONS_GRID_2_CLASSNAME,
  FORM_STEP_TITLE_STYLE,
} from "@/lib/form-step-styles"
import { FormRadioIndicator } from "./FormRadioIndicator"

interface YesNoOptionsProps {
  value: boolean | null
  onChange: (v: boolean) => void
  ariaLabel: string
}

export function YesNoOptions({ value, onChange, ariaLabel }: YesNoOptionsProps) {
  return (
    <div
      className={FORM_OPTIONS_GRID_2_CLASSNAME}
      role="radiogroup"
      aria-label={ariaLabel}
    >
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
            className={formOptionButtonClasses(isSelected)}
          >
            <span className={FORM_OPTION_LABEL_CLASSNAME} style={FORM_STEP_TITLE_STYLE}>
              {label}
            </span>
            <FormRadioIndicator isSelected={isSelected} className="w-3.5 h-3.5 md:h-4.5 md:w-4.5" />
          </button>
        )
      })}
    </div>
  )
}
