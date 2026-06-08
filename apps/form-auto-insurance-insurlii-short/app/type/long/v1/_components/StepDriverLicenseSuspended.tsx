"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepDriverLicenseSuspendedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriverLicenseSuspended({ value, onChange }: StepDriverLicenseSuspendedProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Have you had your license suspended or revoked in the past three (3) years?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="License suspended or revoked" />
    </div>
  )
}
