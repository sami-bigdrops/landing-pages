"use client"

import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"
import { FORM_FIELD_TEXT_INPUT_CLASSNAME } from "@/lib/form-input-styles"
import { ArrowRightIcon } from "lucide-react"

interface StepDriverNamesProps {
  d1FirstName: string
  d1LastName: string
  onD1FirstName: (v: string) => void
  onD1LastName: (v: string) => void
  onNext: () => void
}

const inputClass = FORM_FIELD_TEXT_INPUT_CLASSNAME

export function StepDriverNames({
  d1FirstName,
  d1LastName,
  onD1FirstName,
  onD1LastName,
  onNext,
}: StepDriverNamesProps) {
  const canContinue = d1FirstName.trim() && d1LastName.trim()

  const handleContinue = () => {
    if (canContinue) onNext()
  }

  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        What is your name?
      </h2>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={d1FirstName}
            onChange={(e) => onD1FirstName(e.target.value)}
            placeholder="First name"
            required
            autoComplete="given-name"
            className={inputClass}
            style={FORM_STEP_TITLE_STYLE}
            aria-label="First name"
          />
          <input
            type="text"
            value={d1LastName}
            onChange={(e) => onD1LastName(e.target.value)}
            placeholder="Last name"
            required
            autoComplete="family-name"
            className={inputClass}
            style={FORM_STEP_TITLE_STYLE}
            aria-label="Last name"
          />
        </div>

        <button
          type="button"
          disabled={!canContinue}
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
