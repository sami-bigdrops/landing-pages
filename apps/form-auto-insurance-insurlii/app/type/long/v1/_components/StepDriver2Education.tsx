"use client"

import { FormRadioIndicator } from "./FormRadioIndicator"
import { SelectInput } from "@workspace/ui/components/select-input"
import { formOptionButtonClasses, FORM_FIELD_SELECT_INPUT_CLASSNAME } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"

interface StepDriver2EducationProps {
  value: string
  onChange: (v: string) => void
}

const GRID_OPTIONS = [
  "Some/No High School",
  "High School Diploma",
  "GED",
  "Some College",
  "Associate Degree",
  "Bachelors Degree",
]

const MORE_OPTIONS = [
  { value: "Masters Degree", label: "Masters Degree" },
  { value: "Professional Degree", label: "Professional Degree" },
  { value: "Doctoral Degree / PhD", label: "Doctoral Degree / PhD" },
]

export function StepDriver2Education({ value, onChange }: StepDriver2EducationProps) {
  const isMoreOption = MORE_OPTIONS.some((o) => o.value === value)

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your second driver&apos;s education level?
      </h2>

      <div
        className="grid grid-cols-2 gap-3 md:gap-4 mb-4"
        role="radiogroup"
        aria-label="Second driver education level"
      >
        {GRID_OPTIONS.map((option) => {
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
              <span
                className="text-sm lg:text-base xl:text-lg font-semibold leading-tight"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {option}
              </span>
              <FormRadioIndicator isSelected={isSelected} className="w-3.5 h-3.5 md:h-4.5 md:w-4.5" />
            </button>
          )
        })}
      </div>

      <SelectInput
        placeholder="Select Education Level"
        options={MORE_OPTIONS}
        value={isMoreOption ? value : ""}
        onChange={onChange}
        className={FORM_FIELD_SELECT_INPUT_CLASSNAME}
        selectClassName="text-[#12266D] text-sm lg:text-base xl:text-lg font-medium"
      />
    </div>
  )
}
