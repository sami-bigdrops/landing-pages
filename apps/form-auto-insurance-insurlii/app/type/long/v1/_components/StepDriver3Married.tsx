"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepDriver3MarriedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver3Married({ value, onChange }: StepDriver3MarriedProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Is your third driver married?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Third driver marital status" />
    </div>
  )
}
