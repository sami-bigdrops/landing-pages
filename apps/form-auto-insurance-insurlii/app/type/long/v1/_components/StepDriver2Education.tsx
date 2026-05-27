"use client"

import { cn } from "@workspace/ui/lib/utils"
import { SelectInput } from "@workspace/ui/components/select-input"
import { FORM_PRIMARY_COLOR, FORM_SELECTED_BG, FORM_SELECTED_BORDER } from "@/lib/constant"

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
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg border px-2.5 md:px-4 py-3.5 text-left transition-colors duration-200",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BG }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="text-sm font-semibold leading-tight"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {option}
              </span>
              <span
                className={cn(
                  "flex w-3.5 h-3.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  !isSelected && "border-gray-300 bg-white"
                )}
                style={
                  isSelected
                    ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BORDER }
                    : undefined
                }
                aria-hidden
              >
                {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
            </button>
          )
        })}
      </div>

      <SelectInput
        placeholder="Select Education Level"
        options={MORE_OPTIONS}
        value={isMoreOption ? value : ""}
        onChange={onChange}
        className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-3 xl:px-6 xl:py-4 h-12 xl:h-16 text-sm lg:text-base xl:text-lg shadow-none"
        selectClassName="text-[#12266D] text-sm lg:text-base xl:text-lg font-medium"
      />
    </div>
  )
}
