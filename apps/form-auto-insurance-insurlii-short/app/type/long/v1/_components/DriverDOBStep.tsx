"use client"

import { useId, useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"
import { getMaxDriverDOB, validateDriverDOB } from "@/lib/validate-dob"
import { BirthdateInput } from "./BirthdateInput"

interface DriverDOBStepProps {
  title: string
  ariaLabel: string
  value: string
  onChange: (v: string) => void
  onNext: () => void
}

export function DriverDOBStep({
  title,
  ariaLabel,
  value,
  onChange,
  onNext,
}: DriverDOBStepProps) {
  const errorId = useId()
  const [error, setError] = useState<string | null>(null)
  const maxDob = getMaxDriverDOB()

  const handleChange = (nextValue: string) => {
    onChange(nextValue)
    if (error) setError(null)
  }

  const handleContinue = () => {
    const validationError = validateDriverDOB(value)
    if (validationError) {
      setError(validationError)
      return
    }
    onNext()
  }

  const isComplete = /^\d{4}-\d{2}-\d{2}$/.test(value)

  return (
    <div>
      <h2 className={FORM_STEP_TITLE_CLASSNAME} style={FORM_STEP_TITLE_STYLE}>
        {title}
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <BirthdateInput
            value={value}
            onChange={handleChange}
            maxIso={maxDob}
            ariaLabel={ariaLabel}
            hasError={!!error}
          />
          {error && (
            <p id={errorId} className="text-center text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={!isComplete}
          onClick={handleContinue}
          className="w-full rounded-lg px-6 py-3.5 text-sm lg:text-base font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#F97316" }}
        >
          Continue
          <ArrowRightIcon className="w-4.5 h-4.5 xl:w-5 xl:h-5 inline-block ml-2" />
        </button>
      </div>
    </div>
  )
}
