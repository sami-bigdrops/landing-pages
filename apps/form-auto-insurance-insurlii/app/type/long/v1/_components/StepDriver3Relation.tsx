"use client"

import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FormRadioIndicator } from "./FormRadioIndicator"

interface StepDriver3RelationProps {
  value: string
  onChange: (v: string) => void
}

const OPTIONS = ["Spouse", "Parent", "Sibling", "Child", "Grandparent", "Grandchild", "Other"]

export function StepDriver3Relation({ value, onChange }: StepDriver3RelationProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your third driver&apos;s relation to you?
      </h2>

      <div className="grid grid-cols-1 gap-3 md:gap-4" role="radiogroup" aria-label="Third driver relation">
        {OPTIONS.map((option) => {
          const isSelected = value === option
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option)}
              className={formOptionButtonClasses(isSelected, "flex items-center justify-between gap-2 rounded-lg border px-2.5 md:px-5 xl:px-6.5 py-3.5 text-left transition-colors duration-200")}
            >
              <span className="text-sm lg:text-base xl:text-lg font-semibold" style={{ color: FORM_PRIMARY_COLOR }}>
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
