"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { FORM_FIELD_TEXT_INPUT_CLASSNAME } from "@/lib/form-input-styles"
import { ArrowRightIcon } from "lucide-react"

interface StepNameProps {
  firstName: string
  lastName: string
  onFirstNameChange: (v: string) => void
  onLastNameChange: (v: string) => void
  onNext: () => void
}

export function StepName({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onNext,
}: StepNameProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (firstName.trim() && lastName.trim()) onNext()
  }

  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        What is your name?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          placeholder="First name"
          required
          autoComplete="given-name"
          className={FORM_FIELD_TEXT_INPUT_CLASSNAME}
          style={FORM_STEP_TITLE_STYLE}
          aria-label="First name"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          placeholder="Last name"
          required
          autoComplete="family-name"
          className={FORM_FIELD_TEXT_INPUT_CLASSNAME}
          style={FORM_STEP_TITLE_STYLE}
          aria-label="Last name"
        />

        <button
          type="submit"
          disabled={!firstName.trim() || !lastName.trim()}
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
