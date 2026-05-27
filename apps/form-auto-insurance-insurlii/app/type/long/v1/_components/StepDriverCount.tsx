"use client"

import { cn } from "@workspace/ui/lib/utils"
import { FORM_PRIMARY_COLOR, FORM_SELECTED_BG, FORM_SELECTED_BORDER } from "@/lib/constant"

interface StepDriverCountProps {
  value: 1 | 2 | 3 | null
  onChange: (v: 1 | 2 | 3) => void
}

const OPTIONS = [1, 2, 3] as const

export function StepDriverCount({ value, onChange }: StepDriverCountProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        How many drivers will be on your policy?
      </h2>

      <div
        className="grid grid-cols-3 gap-3 md:gap-4 mb-4"
        role="radiogroup"
        aria-label="Number of drivers"
      >
        {OPTIONS.map((count) => {
          const isSelected = value === count
          return (
            <button
              key={count}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(count)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg border px-4 py-5 transition-colors duration-200",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BG }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="text-2xl xl:text-3xl font-bold tabular-nums"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div
        className="flex items-start gap-2 rounded-lg px-4 py-3"
        style={{ backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0" }}
      >
        <span className="text-base shrink-0" aria-hidden>◆</span>
        <p className="text-sm lg:text-base italic font-medium" style={{ color: "#065F46" }}>
          Multi-driver policies can help you save money.
        </p>
      </div>
    </div>
  )
}
