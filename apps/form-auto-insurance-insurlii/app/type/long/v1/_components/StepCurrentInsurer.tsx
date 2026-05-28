"use client"

import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"

interface StepCurrentInsurerProps {
  value: string
  onChange: (v: string) => void
}

const INSURERS = [
  { name: "AAA",           logo: "https://logo.clearbit.com/aaa.com" },
  { name: "Allstate",      logo: "https://logo.clearbit.com/allstate.com" },
  { name: "Farm Bureau",   logo: "https://logo.clearbit.com/fbfs.com" },
  { name: "Farmers",       logo: "https://logo.clearbit.com/farmers.com" },
  { name: "GEICO",         logo: "https://logo.clearbit.com/geico.com" },
  { name: "Liberty Mutual",logo: "https://logo.clearbit.com/libertymutual.com" },
  { name: "Nationwide",    logo: "https://logo.clearbit.com/nationwide.com" },
  { name: "Progressive",   logo: "https://logo.clearbit.com/progressive.com" },
  { name: "Safeco",        logo: "https://logo.clearbit.com/safeco.com" },
  { name: "State Farm",    logo: "https://logo.clearbit.com/statefarm.com" },
  { name: "The Hartford",  logo: "https://logo.clearbit.com/thehartford.com" },
  { name: "USAA",          logo: "https://logo.clearbit.com/usaa.com" },
]

export function StepCurrentInsurer({ value, onChange }: StepCurrentInsurerProps) {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        Who is your current insurer?
      </h2>

      <div className="grid grid-cols-3 gap-3 md:gap-4" role="radiogroup" aria-label="Current insurer">
        {INSURERS.map(({ name, logo }) => {
          const isSelected = value === name
          return (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(name)}
              className={formOptionButtonClasses(isSelected, "flex flex-col items-center justify-center gap-2 rounded-lg border px-3 py-5 transition-colors duration-200 min-h-[100px]")}
            >
              <img
                src={logo}
                alt={name}
                className="h-10 w-auto max-w-[100px] object-contain"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = "none"
                }}
              />
              <span
                className="text-[0.7rem] md:text-sm lg:text-base xl:text-lg font-semibold text-center leading-tight"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {name}
              </span>
            </button>
          )
        })}

        {/* Other — full width */}
        <button
          type="button"
          role="radio"
          aria-checked={value === "Other"}
          onClick={() => onChange("Other")}
          className={formOptionButtonClasses(value === "Other", "col-span-3 flex items-center justify-center rounded-lg border px-3 py-4 transition-colors duration-200 min-h-[56px]")}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: FORM_PRIMARY_COLOR }}
          >
            Other
          </span>
        </button>
      </div>
    </div>
  )
}
