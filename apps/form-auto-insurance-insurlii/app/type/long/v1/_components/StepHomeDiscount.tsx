"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepHomeDiscountProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepHomeDiscount({ value, onChange }: StepHomeDiscountProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Would you like to check if you qualify for home insurance discounts?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Home insurance discount" />
    </div>
  )
}
