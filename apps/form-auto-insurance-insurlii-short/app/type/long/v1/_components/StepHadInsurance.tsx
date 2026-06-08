"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepHadInsuranceProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepHadInsurance({ value, onChange }: StepHadInsuranceProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Have you had insurance in the last 30 days?
      </h2>

      <YesNoOptions
        value={value}
        onChange={onChange}
        ariaLabel="Had insurance last 30 days"
      />
    </div>
  )
}
