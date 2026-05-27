"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"

interface StepZipCodeProps {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}

export function StepZipCode({ value, onChange, onNext }: StepZipCodeProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.length === 5) onNext()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 5)
    onChange(digits)
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your zip code?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          placeholder="e.g. 90210"
          required
          maxLength={5}
          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-colors focus:border-[#205BB9] focus:ring-2 focus:ring-[#E2F1FD]"
          style={{ color: FORM_PRIMARY_COLOR }}
          aria-label="Zip code"
        />

        <button
          type="submit"
          disabled={value.length !== 5}
          className="w-full rounded-lg px-6 py-3.5 text-sm lg:text-base font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: FORM_PRIMARY_COLOR }}
        >
          Continue
        </button>
      </form>
    </div>
  )
}
