"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepHomeDiscountProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepHomeDiscount({ value, onChange }: StepHomeDiscountProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Would you like to check if you qualify for home insurance discounts?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Home insurance discount" />
    </div>
  )
}
