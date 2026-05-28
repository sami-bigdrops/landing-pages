"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepDriver2MarriedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver2Married({ value, onChange }: StepDriver2MarriedProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Is your second driver married?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Second driver marital status" />
    </div>
  )
}
