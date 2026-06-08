"use client"

import { FormRadioIndicator } from "./FormRadioIndicator"
import { SelectInput } from "@workspace/ui/components/select-input"
import {
  formOptionButtonClasses,
  FORM_FIELD_SELECT_INPUT_CLASSNAME,
  FORM_SELECT_OPTION_CLASSNAME,
} from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"


interface StepDriverEducationProps {
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

export function StepDriverEducation({ value, onChange }: StepDriverEducationProps) {
  const isMoreOption = MORE_OPTIONS.some((o) => o.value === value)

  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        What is your education level?
      </h2>

      <div
        className="grid grid-cols-2 gap-4 mb-4"
        role="radiogroup"
        aria-label="Education level"
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
              className={formOptionButtonClasses(isSelected)}
            >
              <span
                className="text-sm lg:text-base xl:text-lg font-semibold leading-tight"
                style={FORM_STEP_TITLE_STYLE}
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
        optionClassName={FORM_SELECT_OPTION_CLASSNAME}
      />
    </div>
  )
}
