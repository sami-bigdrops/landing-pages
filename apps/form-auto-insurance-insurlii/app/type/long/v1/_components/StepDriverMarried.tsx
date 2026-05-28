"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepDriverMarriedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriverMarried({ value, onChange }: StepDriverMarriedProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Are you married?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="Marital status" />
    </div>
  )
}
