"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { YesNoOptions } from "./YesNoOptions"

interface StepRentersDiscountProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepRentersDiscount({ value, onChange }: StepRentersDiscountProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Would you like to check if you qualify for renter&apos;s insurance discounts?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Renter's insurance discount" />
    </div>
  )
}
