"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepDriver2MarriedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver2Married({ value, onChange }: StepDriver2MarriedProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Is your second driver married?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Second driver marital status" />
    </div>
  )
}
