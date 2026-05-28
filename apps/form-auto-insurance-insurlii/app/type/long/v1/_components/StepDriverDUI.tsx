"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepDriverDUIProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriverDUI({ value, onChange }: StepDriverDUIProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Have you had a DUI conviction in the past three (3) years or need an SR-22 form?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="DUI conviction" />
    </div>
  )
}
