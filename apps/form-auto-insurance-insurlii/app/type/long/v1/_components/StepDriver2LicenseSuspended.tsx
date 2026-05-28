"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { YesNoOptions } from "./YesNoOptions"

interface StepDriver2LicenseSuspendedProps {
  value: boolean | null
  onChange: (v: boolean) => void
}

export function StepDriver2LicenseSuspended({ value, onChange }: StepDriver2LicenseSuspendedProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Has your second driver had their license suspended or revoked in the past three (3) years?
      </h2>

      <YesNoOptions
        value={value}
        onChange={onChange}
        ariaLabel="Second driver license suspended or revoked"
      />
    </div>
  )
}
