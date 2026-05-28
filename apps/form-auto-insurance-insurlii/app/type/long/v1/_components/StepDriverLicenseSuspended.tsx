"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepDriverLicenseSuspendedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriverLicenseSuspended({ value, onChange }: StepDriverLicenseSuspendedProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Have you had your license suspended or revoked in the past three (3) years?
      </h2>

      <YesNoOptions value={value} onChange={onChange} ariaLabel="License suspended or revoked" />
    </div>
  )
}
