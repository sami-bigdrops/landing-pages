"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepDriverDUIProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriverDUI({ value, onChange }: StepDriverDUIProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Have you had a DUI conviction in the past three (3) years or need an SR-22 form?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="DUI conviction" />
    </div>
  )
}
