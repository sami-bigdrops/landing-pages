"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"

interface StepDriverNamesProps {
  driverCount: 1 | 2 | 3
  d1FirstName: string
  d1LastName: string
  onD1FirstName: (v: string) => void
  onD1LastName: (v: string) => void
  d2FirstName: string
  d2LastName: string
  onD2FirstName: (v: string) => void
  onD2LastName: (v: string) => void
  d3FirstName: string
  d3LastName: string
  onD3FirstName: (v: string) => void
  onD3LastName: (v: string) => void
  onNext: () => void
}

const inputClass =
  "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-colors focus:border-[#205BB9] focus:ring-2 focus:ring-[#E2F1FD]"

export function StepDriverNames({
  driverCount,
  d1FirstName,
  d1LastName,
  onD1FirstName,
  onD1LastName,
  d2FirstName,
  d2LastName,
  onD2FirstName,
  onD2LastName,
  d3FirstName,
  d3LastName,
  onD3FirstName,
  onD3LastName,
  onNext,
}: StepDriverNamesProps) {
  const d1Valid = d1FirstName.trim() && d1LastName.trim()
  const d2Valid = driverCount < 2 || (d2FirstName.trim() && d2LastName.trim())
  const d3Valid = driverCount < 3 || (d3FirstName.trim() && d3LastName.trim())
  const canContinue = d1Valid && d2Valid && d3Valid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canContinue) onNext()
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Who are your drivers?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Driver 1 */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold" style={{ color: FORM_PRIMARY_COLOR }}>
            What is your name?
          </p>
          <input
            type="text"
            value={d1FirstName}
            onChange={(e) => onD1FirstName(e.target.value)}
            placeholder="First name"
            required
            autoComplete="given-name"
            className={inputClass}
            style={{ color: FORM_PRIMARY_COLOR }}
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
            style={{ color: FORM_PRIMARY_COLOR }}
            aria-label="Last name"
          />
        </div>

        {/* Driver 2 */}
        {driverCount >= 2 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold" style={{ color: FORM_PRIMARY_COLOR }}>
              What is your second driver&apos;s name?
            </p>
            <input
              type="text"
              value={d2FirstName}
              onChange={(e) => onD2FirstName(e.target.value)}
              placeholder="First name"
              required
              className={inputClass}
              style={{ color: FORM_PRIMARY_COLOR }}
              aria-label="Second driver first name"
            />
            <input
              type="text"
              value={d2LastName}
              onChange={(e) => onD2LastName(e.target.value)}
              placeholder="Last name"
              required
              className={inputClass}
              style={{ color: FORM_PRIMARY_COLOR }}
              aria-label="Second driver last name"
            />
          </div>
        )}

        {/* Driver 3 */}
        {driverCount >= 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold" style={{ color: FORM_PRIMARY_COLOR }}>
              What is your third driver&apos;s name?
            </p>
            <input
              type="text"
              value={d3FirstName}
              onChange={(e) => onD3FirstName(e.target.value)}
              placeholder="First name"
              required
              className={inputClass}
              style={{ color: FORM_PRIMARY_COLOR }}
              aria-label="Third driver first name"
            />
            <input
              type="text"
              value={d3LastName}
              onChange={(e) => onD3LastName(e.target.value)}
              placeholder="Last name"
              required
              className={inputClass}
              style={{ color: FORM_PRIMARY_COLOR }}
              aria-label="Third driver last name"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!canContinue}
          className="w-full rounded-lg px-6 py-3.5 text-sm lg:text-base font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: FORM_PRIMARY_COLOR }}
        >
          Continue
        </button>
      </form>
    </div>
  )
}
