"use client"

import { useId, useState } from "react"
import { ArrowRightIcon, Loader2 } from "lucide-react"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import {
  FORM_FIELD_TEXT_INPUT_CLASSNAME,
  FORM_TEXT_INPUT_ERROR_CLASSNAME,
} from "@/lib/form-input-styles"
import { cn } from "@workspace/ui/lib/utils"
import { validateEmail } from "@/lib/validate-email"

interface StepEmailProps {
  value: string
  onChange: (v: string) => void
  onNext: () => void
  submitError?: string | null
}

export function StepEmail({ value, onChange, onNext, submitError }: StepEmailProps) {
  const errorId = useId()
  const [error, setError] = useState<string | null>(null)
  const displayError = submitError ?? error
  const [verifying, setVerifying] = useState(false)

  const handleChange = (nextValue: string) => {
    onChange(nextValue)
    if (error) setError(null)
  }

  const handleContinue = async () => {
    const validationError = validateEmail(value)
    if (validationError) {
      setError(validationError)
      return
    }

    setVerifying(true)
    setError(null)

    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value.trim() }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setError(data.error ?? "Could not verify this email. Please try again.")
        return
      }

      onNext()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        What is your email?
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <input
            type="email"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={verifying}
            autoComplete="email"
            className={cn(
              FORM_FIELD_TEXT_INPUT_CLASSNAME,
              displayError && FORM_TEXT_INPUT_ERROR_CLASSNAME
            )}
            style={FORM_STEP_TITLE_STYLE}
            aria-label="Email address"
            aria-invalid={displayError ? true : undefined}
            aria-describedby={displayError ? errorId : undefined}
          />
          {displayError && (
            <p id={errorId} className="text-sm font-medium text-red-600" role="alert">
              {displayError}
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={!value.trim() || verifying}
          onClick={() => void handleContinue()}
          className="w-full rounded-lg px-6 py-3.5 text-sm lg:text-base font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#F97316" }}
        >
          {verifying ? (
            <>
              <Loader2 className="w-4.5 h-4.5 inline-block animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            <>
              Continue
              <ArrowRightIcon className="w-4.5 h-4.5 xl:w-5 xl:h-5 inline-block ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
