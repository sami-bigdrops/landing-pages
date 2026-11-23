"use client"

import { useMemo } from "react"

const INCOME_MIN = 10_000
const INCOME_MAX = 500_000
const INCOME_STEP = 5_000

function clampIncome(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return INCOME_MIN
  const rounded = Math.round(value / INCOME_STEP) * INCOME_STEP
  return Math.min(INCOME_MAX, Math.max(INCOME_MIN, rounded))
}

function formatDisplay(value: number): string {
  return `$${value.toLocaleString("en-US")}`
}

interface AnnualIncomeInputProps {
  value: number
  onChange: (value: number) => void
  inputClassName?: string
  labelClassName?: string
}

export function AnnualIncomeInput({
  value,
  onChange,
  inputClassName,
  labelClassName,
}: AnnualIncomeInputProps) {
  const safeValue = useMemo(() => clampIncome(value), [value])
  const pct = ((safeValue - INCOME_MIN) / (INCOME_MAX - INCOME_MIN)) * 100

  const setFromNumber = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    if (!digits) {
      onChange(INCOME_MIN)
      return
    }
    onChange(clampIncome(parseInt(digits, 10)))
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="annualIncome" className={labelClassName ?? "text-sm font-medium text-gray-600 font-inter"}>
          Annual Income
        </label>
        <input
          id="annualIncome"
          type="text"
          inputMode="numeric"
          value={formatDisplay(safeValue)}
          onChange={(e) => setFromNumber(e.target.value)}
          onBlur={() => onChange(clampIncome(safeValue))}
          placeholder="$85,000"
          className={inputClassName}
        />
      </div>

      <div className="space-y-3 px-1">
        <style>{`
          #annualIncomeSlider {
            -webkit-tap-highlight-color: transparent;
            touch-action: none;
          }
          #annualIncomeSlider::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 22px; width: 22px; border-radius: 50%;
            background: #249E45; border: 3px solid white;
            box-shadow: 0 1px 6px rgba(36,158,69,0.45); cursor: pointer;
          }
          #annualIncomeSlider::-moz-range-thumb {
            height: 22px; width: 22px; border-radius: 50%;
            background: #249E45; border: 3px solid white;
            box-shadow: 0 1px 6px rgba(36,158,69,0.45); cursor: pointer;
          }
          @media (max-width: 768px), (hover: none) {
            #annualIncomeSlider::-webkit-slider-thumb {
              height: 28px; width: 28px; border-width: 3px;
            }
            #annualIncomeSlider::-moz-range-thumb {
              height: 28px; width: 28px; border-width: 3px;
            }
          }
        `}</style>
        <input
          id="annualIncomeSlider"
          type="range"
          min={INCOME_MIN}
          max={INCOME_MAX}
          step={INCOME_STEP}
          value={safeValue}
          onChange={(e) => onChange(clampIncome(Number(e.target.value)))}
          className="h-2 w-full min-h-[44px] cursor-pointer appearance-none rounded-full outline-none accent-[#249E45] sm:min-h-0"
          style={{
            background: `linear-gradient(to right, #249E45 ${pct}%, #D8F0E0 ${pct}%)`,
          }}
        />
        <div className="flex justify-between font-inter text-[11px] text-gray-400">
          <span>${INCOME_MIN.toLocaleString("en-US")}</span>
          <span>${INCOME_MAX.toLocaleString("en-US")}+</span>
        </div>
      </div>
    </div>
  )
}
