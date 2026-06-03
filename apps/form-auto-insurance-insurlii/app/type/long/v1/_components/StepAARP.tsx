"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepAARPProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepAARP({ value, onChange }: StepAARPProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Do you belong to AARP?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="AARP membership" />
    </div>
  )
}
