"use client"

import { DriverDOBStep } from "./DriverDOBStep"

interface StepDriver3DOBProps {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}

export function StepDriver3DOB({ value, onChange, onNext }: StepDriver3DOBProps) {
  return (
    <DriverDOBStep
      title="What is your third driver's birth date?"
      ariaLabel="Third driver date of birth"
      value={value}
      onChange={onChange}
      onNext={onNext}
    />
  )
}
