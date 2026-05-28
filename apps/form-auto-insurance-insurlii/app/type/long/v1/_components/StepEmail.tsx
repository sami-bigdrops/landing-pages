"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"

interface StepEmailProps {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}

export function StepEmail({ value, onChange, onNext }: StepEmailProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) onNext()
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your email?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-colors focus:border-[#205BB9] focus:ring-2 focus:ring-[#E2F1FD]"
          style={{ color: FORM_PRIMARY_COLOR }}
          aria-label="Email address"
        />

        <button
          type="submit"
          disabled={!value.trim()}
          className="w-full rounded-lg px-6 py-3.5 text-sm lg:text-base font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: FORM_PRIMARY_COLOR }}
        >
          Continue →
        </button>
      </form>
    </div>
  )
}
