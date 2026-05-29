"use client"

import { useId, useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_DOB_TEXT_INPUT_CLASSNAME, FORM_TEXT_INPUT_ERROR_CLASSNAME } from "@/lib/form-input-styles"
import { cn } from "@workspace/ui/lib/utils"
import { getMaxDriverDOB, validateDriverDOB } from "@/lib/validate-dob"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateDriverDOB(value)
    if (validationError) {
      setError(validationError)
      return
    }
    onNext()
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <input
            type="date"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            max={maxDob}
            required
            className={cn(
              FORM_DOB_TEXT_INPUT_CLASSNAME,
              error && FORM_TEXT_INPUT_ERROR_CLASSNAME
            )}
            style={{ color: FORM_PRIMARY_COLOR }}
            aria-label={ariaLabel}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
          {error && (
            <p id={errorId} className="text-sm  font-medium text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!value}
          className="w-full rounded-lg px-6 py-3.5 text-sm lg:text-base font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#F97316" }}
        >
          Continue
          <ArrowRightIcon className="w-4.5 h-4.5 xl:w-5 xl:h-5 inline-block ml-2" />
        </button>
      </form>
    </div>
  )
}
