"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_FIELD_TEXT_INPUT_CLASSNAME } from "@/lib/form-input-styles"
import { ArrowRightIcon } from "lucide-react"
import { AddressAutocomplete } from "./AddressAutocomplete"

interface StepAddressProps {
  zip: string
  onZipChange: (v: string) => void
  cityName: string
  cityState: string
  streetAddress: string
  onStreetAddressChange: (v: string) => void
  googleReady: boolean
  onNext: () => void
}

const inputClass = FORM_FIELD_TEXT_INPUT_CLASSNAME

export function StepAddress({
  zip,
  onZipChange,
  cityName,
  cityState,
  streetAddress,
  onStreetAddressChange,
  googleReady,
  onNext,
}: StepAddressProps) {
  const canContinue = zip.length === 5 && streetAddress.trim().length > 0

  const handleContinue = () => {
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

      <div className="flex flex-col gap-4">
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
          <AddressAutocomplete
            id="streetAddress"
            label="Street Address"
            value={streetAddress}
            onChange={onStreetAddressChange}
            onPlaceSelect={(details) => {
              onStreetAddressChange(details.address)
              if (details.zipCode) onZipChange(details.zipCode)
            }}
            placeholder="Start typing your address..."
            labelClassName="text-sm font-semibold"
            labelStyle={{ color: FORM_PRIMARY_COLOR }}
            className={inputClass}
            googleReady={googleReady}
          />
          {cityDisplay && (
            <p className="text-sm text-gray-500">{cityDisplay}</p>
          )}
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
