"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepDriver3LicenseSuspendedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver3LicenseSuspended({ value, onChange }: StepDriver3LicenseSuspendedProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Has your third driver had their license suspended or revoked in the past three (3) years?
      </h2>

      <YesNoOptions
        value={value}
        onChange={onChange}
        ariaLabel="Third driver license suspended or revoked"
      />
    </div>
  )
}
