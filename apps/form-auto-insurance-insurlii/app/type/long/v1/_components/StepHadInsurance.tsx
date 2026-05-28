"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepHadInsuranceProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepHadInsurance({ value, onChange }: StepHadInsuranceProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Have you had insurance in the last 30 days?
      </h2>

      <YesNoOptions
        value={value}
        onChange={onChange}
        ariaLabel="Had insurance last 30 days"
      />
    </div>
  )
}
