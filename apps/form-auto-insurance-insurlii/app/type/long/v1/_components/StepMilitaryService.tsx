"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepMilitaryServiceProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepMilitaryService({ value, onChange }: StepMilitaryServiceProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Have you or your spouse ever honorably served in the U.S. military?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Military service" />
    </div>
  )
}
