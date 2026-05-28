"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepAARPProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepAARP({ value, onChange }: StepAARPProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Do you belong to AARP?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="AARP membership" />
    </div>
  )
}
