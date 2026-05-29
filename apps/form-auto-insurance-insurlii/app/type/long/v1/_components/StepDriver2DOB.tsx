"use client"

import { DriverDOBStep } from "./DriverDOBStep"

interface StepDriver2DOBProps {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}

export function StepDriver2DOB({ value, onChange, onNext }: StepDriver2DOBProps) {
  return (
    <DriverDOBStep
      title="What is your second driver's birth date?"
      ariaLabel="Second driver date of birth"
      value={value}
      onChange={onChange}
      onNext={onNext}
    />
  )
}
