"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepDriver3DUIProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver3DUI({ value, onChange }: StepDriver3DUIProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Has your third driver had a DUI conviction in the past three (3) years ?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Third driver DUI conviction" />
    </div>
  )
}
