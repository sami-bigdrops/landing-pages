"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepDriverMarriedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriverMarried({ value, onChange }: StepDriverMarriedProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Are you married?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Marital status" />
    </div>
  )
}
