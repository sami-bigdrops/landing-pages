"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_FIELD_TEXT_INPUT_CLASSNAME } from "@/lib/form-input-styles"
import { ArrowRightIcon } from "lucide-react"

interface StepDriver3DOBProps {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}

export function StepDriver3DOB({ value, onChange, onNext }: StepDriver3DOBProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value) onNext()
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your third driver&apos;s birth date?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          required
          className={FORM_FIELD_TEXT_INPUT_CLASSNAME}
          style={{ color: FORM_PRIMARY_COLOR }}
          aria-label="Third driver date of birth"
        />

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
