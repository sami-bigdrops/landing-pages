"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { FORM_FIELD_TEXT_INPUT_CLASSNAME } from "@/lib/form-input-styles"
import { ArrowRightIcon } from "lucide-react"

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

const inputClass = FORM_FIELD_TEXT_INPUT_CLASSNAME

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

  const handleContinue = () => {
    if (canContinue) onNext()
  }

  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Who are your drivers?
      </h2>

      <div className="flex flex-col gap-6">
        {/* Driver 1 */}
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold" style={FORM_STEP_TITLE_STYLE}>
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

        {/* Driver 2 */}
        {driverCount >= 2 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold" style={FORM_STEP_TITLE_STYLE}>
              What is your second driver&apos;s name?
            </p>
            <input
              type="text"
              value={d2FirstName}
              onChange={(e) => onD2FirstName(e.target.value)}
              placeholder="First name"
              required
              className={inputClass}
              style={FORM_STEP_TITLE_STYLE}
              aria-label="Second driver first name"
            />
            <input
              type="text"
              value={d2LastName}
              onChange={(e) => onD2LastName(e.target.value)}
              placeholder="Last name"
              required
              className={inputClass}
              style={FORM_STEP_TITLE_STYLE}
              aria-label="Second driver last name"
            />
          </div>
        )}

        {/* Driver 3 */}
        {driverCount >= 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold" style={FORM_STEP_TITLE_STYLE}>
              What is your third driver&apos;s name?
            </p>
            <input
              type="text"
              value={d3FirstName}
              onChange={(e) => onD3FirstName(e.target.value)}
              placeholder="First name"
              required
              className={inputClass}
              style={FORM_STEP_TITLE_STYLE}
              aria-label="Third driver first name"
            />
            <input
              type="text"
              value={d3LastName}
              onChange={(e) => onD3LastName(e.target.value)}
              placeholder="Last name"
              required
              className={inputClass}
              style={FORM_STEP_TITLE_STYLE}
              aria-label="Third driver last name"
            />
          </div>
        )}

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
