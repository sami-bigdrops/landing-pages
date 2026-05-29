"use client"

import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FormRadioIndicator } from "./FormRadioIndicator"

interface YesNoOptionsProps {
  value: boolean | null
  onChange: (v: boolean) => void
  ariaLabel: string
}

export function YesNoOptions({ value, onChange, ariaLabel }: YesNoOptionsProps) {
  return (
    <div
      className="grid grid-cols-2 gap-3 md:gap-4 lg:max-w-2xl xl:max-w-3xl mx-auto"
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
            className={formOptionButtonClasses(isSelected, "flex items-center justify-between gap-2 rounded-lg border px-2.5 md:px-5 xl:px-6.5 py-3.5 transition-colors duration-200")}
          >
            <span
              className="text-sm lg:text-base xl:text-lg font-semibold"
              style={{ color: FORM_PRIMARY_COLOR }}
            >
              {label}
            </span>
            <FormRadioIndicator isSelected={isSelected} className="w-3.5 h-3.5 md:h-4.5 md:w-4.5" />
          </button>
        )
      })}
    </div>
  )
}
