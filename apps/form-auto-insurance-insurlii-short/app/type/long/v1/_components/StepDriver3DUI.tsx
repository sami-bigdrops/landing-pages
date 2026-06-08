"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepDriver3DUIProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver3DUI({ value, onChange }: StepDriver3DUIProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Has your third driver had a DUI conviction in the past three (3) years ?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Third driver DUI conviction" />
    </div>
  )
}
