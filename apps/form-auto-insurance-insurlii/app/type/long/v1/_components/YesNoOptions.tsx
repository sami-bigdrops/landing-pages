"use client"

import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"

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
            className={formOptionButtonClasses(isSelected, "flex flex-col items-center justify-center gap-2 rounded-lg border px-2 py-4 md:py-5 xl:py-6 transition-colors duration-200")}
          >
            <span
              className="text-base md:text-lg lg:text-xl xl:text-xl font-semibold"
              style={{ color: FORM_PRIMARY_COLOR }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
