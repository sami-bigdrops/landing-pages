"use client"

import { useMemo } from "react"

const PROP_VAL_MIN = 50_000
const PROP_VAL_MAX = 2_000_000
const PROP_VAL_STEP = 5_000

function clampPropertyValue(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return PROP_VAL_MIN
  const rounded = Math.round(value / PROP_VAL_STEP) * PROP_VAL_STEP
  return Math.min(PROP_VAL_MAX, Math.max(PROP_VAL_MIN, rounded))
}

function formatDisplay(value: number): string {
  return value.toLocaleString("en-US")
}

interface PropertyValueInputProps {
  value: number
  onChange: (value: number) => void
  inputClassName?: string
}

export function PropertyValueInput({
  value,
  onChange,
  inputClassName,
}: PropertyValueInputProps) {
  const safeValue = useMemo(() => clampPropertyValue(value), [value])
  const pct = ((safeValue - PROP_VAL_MIN) / (PROP_VAL_MAX - PROP_VAL_MIN)) * 100

  const setFromNumber = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    if (!digits) {
      onChange(PROP_VAL_MIN)
      return
    }
    onChange(clampPropertyValue(parseInt(digits, 10)))
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="propertyValue" className="text-sm font-medium text-gray-600 font-inter">
          Estimated property value
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-inter text-sm text-gray-400">
            $
          </span>
          <input
            id="propertyValue"
            type="text"
            inputMode="numeric"
            value={formatDisplay(safeValue)}
            onChange={(e) => setFromNumber(e.target.value)}
            onBlur={() => onChange(clampPropertyValue(safeValue))}
            className={`${inputClassName ?? ""} !pl-8`}
          />
        </div>
      </div>

      <div className="space-y-3 px-1">
        <style>{`
          #propertyValueSlider {
            -webkit-tap-highlight-color: transparent;
            touch-action: none;
          }
          #propertyValueSlider::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 22px; width: 22px; border-radius: 50%;
            background: #249E45; border: 3px solid white;
            box-shadow: 0 1px 6px rgba(36,158,69,0.45); cursor: pointer;
          }
          #propertyValueSlider::-moz-range-thumb {
            height: 22px; width: 22px; border-radius: 50%;
            background: #249E45; border: 3px solid white;
            box-shadow: 0 1px 6px rgba(36,158,69,0.45); cursor: pointer;
          }
        `}</style>
        <input
          id="propertyValueSlider"
          type="range"
          min={PROP_VAL_MIN}
          max={PROP_VAL_MAX}
          step={PROP_VAL_STEP}
          value={safeValue}
          onChange={(e) => onChange(clampPropertyValue(Number(e.target.value)))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none accent-[#249E45]"
          style={{
            background: `linear-gradient(to right, #249E45 ${pct}%, #D8F0E0 ${pct}%)`,
          }}
        />
        <div className="flex justify-between font-inter text-[11px] text-gray-400">
          <span>${PROP_VAL_MIN.toLocaleString("en-US")}</span>
          <span>${PROP_VAL_MAX.toLocaleString("en-US")}</span>
        </div>
      </div>
    </div>
  )
}

export { PROP_VAL_MIN, PROP_VAL_MAX, clampPropertyValue }
