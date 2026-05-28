"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"

interface StepPhoneProps {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function StepPhone({ value, onChange, onSubmit }: StepPhoneProps) {
  const digits = value.replace(/\D/g, "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatPhone(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (digits.length === 10) onSubmit()
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your phone number?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder="e.g. (555) 000-1234"
          required
          autoComplete="tel"
          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-colors focus:border-[#205BB9] focus:ring-2 focus:ring-[#E2F1FD]"
          style={{ color: FORM_PRIMARY_COLOR }}
          aria-label="Phone number"
        />

        <button
          type="submit"
          disabled={digits.length !== 10}
          className="w-full rounded-lg px-6 py-3.5 text-base font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#F97316" }}
        >
          Finish &amp; Get Quotes →
        </button>

        <p className="text-xs text-gray-500 text-center leading-relaxed">
          By clicking &ldquo;Finish &amp; Get Quotes&rdquo;, you agree to our{" "}
          <a href="/terms-of-use" className="underline hover:text-gray-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          , and consent to be contacted by our insurance partners via phone, email, or text,
          including by automated means. Consent is not required to purchase.
        </p>
      </form>
    </div>
  )
}
