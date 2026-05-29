"use client"

import { DriverDOBStep } from "./DriverDOBStep"

interface StepDOBProps {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}

export function StepDOB({ value, onChange, onNext }: StepDOBProps) {
  return (
    <DriverDOBStep
      title="What is your date of birth?"
      ariaLabel="Date of birth"
      value={value}
      onChange={onChange}
      onNext={onNext}
    />
  )
}
