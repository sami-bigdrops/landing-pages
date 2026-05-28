"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { ArrowRightIcon } from "lucide-react"

interface StepAddressProps {
  zip: string
  onZipChange: (v: string) => void
  cityName: string
  cityState: string
  streetAddress: string
  onStreetAddressChange: (v: string) => void
  onNext: () => void
}

const inputClass =
  "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-colors focus:border-[#205BB9] focus:ring-2 focus:ring-[#E2F1FD]"

export function StepAddress({
  zip,
  onZipChange,
  cityName,
  cityState,
  streetAddress,
  onStreetAddressChange,
  onNext,
}: StepAddressProps) {
  const canContinue = zip.length === 5 && streetAddress.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canContinue) onNext()
  }

  const cityDisplay = [cityName, cityState].filter(Boolean).join(", ") + (zip.length === 5 ? ` ${zip}` : "")

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your street address?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" style={{ color: FORM_PRIMARY_COLOR }}>
            ZIP Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={zip}
            onChange={(e) => onZipChange(e.target.value.replace(/\D/g, "").slice(0, 5))}
            placeholder="10001"
            maxLength={5}
            required
            className={inputClass}
            style={{ color: FORM_PRIMARY_COLOR }}
            aria-label="ZIP Code"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" style={{ color: FORM_PRIMARY_COLOR }}>
            Street Address
          </label>
          <input
            type="text"
            value={streetAddress}
            onChange={(e) => onStreetAddressChange(e.target.value)}
            placeholder="e.g. 3 Main Street"
            required
            autoComplete="street-address"
            className={inputClass}
            style={{ color: FORM_PRIMARY_COLOR }}
            aria-label="Street address"
          />
          {cityDisplay && (
            <p className="text-sm text-gray-500">{cityDisplay}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canContinue}
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
