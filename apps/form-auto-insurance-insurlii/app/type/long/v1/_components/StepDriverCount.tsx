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
        className="grid grid-cols-3 gap-3 md:gap-4 mb-4 lg:mb-6 "
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
                "flex flex-col items-center justify-center gap-1 rounded-lg border px-4 py-4 lg:py-5 xl:py-6 transition-colors duration-200",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? { borderColor: FORM_SELECTED_BORDER, backgroundColor: FORM_SELECTED_BG }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="text-xl md:text-xl lg:text-2xl  xl:text-2xl font-bold tabular-nums"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div
        className="flex items-start justify-center   gap-2 rounded-lg px-4 py-3 lg:py-4 xl:py-5"
        style={{ backgroundColor: "#ECFDF5", border: "1px solid #A7F3D0" }}
      >
        <span className="text-base shrink-0" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" fill="#A7F3D0" />
            <path d="M10 6.5V13.5M10 13.5c-1 0-2-.67-2-1.5s.9-1.5 2-1.5 2-.67 2-1.5-.9-1.5-2-1.5M10 13.5v1" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="10" r="8.25" stroke="#047857" strokeWidth="0.5"/>
          </svg>
        </span>
   
        <p className="text-sm lg:text-base font-semibold text-center" style={{ color: "#065F46" }}>
          Multi-driver policies can help you save money.
        </p>
      </div>
    </div>
  )
}
