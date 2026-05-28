"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepDriver2DUIProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver2DUI({ value, onChange }: StepDriver2DUIProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Has your second driver had a DUI conviction in the past three (3) years or need an SR-22 form?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Second driver DUI conviction" />
    </div>
  )
}
