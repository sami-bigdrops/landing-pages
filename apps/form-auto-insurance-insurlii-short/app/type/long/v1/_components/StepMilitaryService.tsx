"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepMilitaryServiceProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepMilitaryService({ value, onChange }: StepMilitaryServiceProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Have you or your spouse ever honorably served in the U.S. military?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Military service" />
    </div>
  )
}
