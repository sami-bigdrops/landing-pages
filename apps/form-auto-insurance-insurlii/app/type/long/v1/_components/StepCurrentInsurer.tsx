"use client"

import Image from "next/image"
import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"


interface StepCurrentInsurerProps {
  value: string
  onChange: (v: string) => void
}

const INSURERS = [
  { name: "AAA",            logo: "/AAA.svg" },
  { name: "Allstate",       logo: "/allstate.svg" },
  { name: "Farm Bureau",    logo: "/farmersBureau.svg" },
  { name: "Farmers",        logo: "/farmersInsurance.svg" },
  { name: "GEICO",          logo: "/geico.svg" },
  { name: "Liberty Mutual", logo: "/libertyMutual.svg" },
  { name: "Nationwide",     logo: "/nationwide.svg" },
  { name: "Progressive",    logo: "/progressive.svg" },
  { name: "Safeco",         logo: "/safeco.svg" },
  { name: "State Farm",     logo: "/stateFarm.svg" },
  { name: "The Hartford",   logo: "/theHartford.svg" },
  { name: "USAA",           logo: "/USAA.svg" },
]

export function StepCurrentInsurer({ value, onChange }: StepCurrentInsurerProps) {
  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        Who is your current insurer?
      </h2>

      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4"
          role="radiogroup"
          aria-label="Current insurer"
        >
          {INSURERS.map(({ name, logo }) => {
            const isSelected = value === name
            return (
              <button
                key={name}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChange(name)}
                className={formOptionButtonClasses(isSelected, "w-full flex flex-col items-center justify-center gap-2 md:gap-3 rounded-lg border px-3 py-5 transition-colors duration-200 min-h-[100px]")}
              >
                <div className="flex h-12 md:h-14 xl:h-16 w-full max-w-[100px] xl:max-w-[120px] shrink-0 items-center justify-center">
                  <Image
                    src={logo}
                    alt=""
                    width={100}
                    height={120}
                    className="max-h-12 md:max-h-14 xl:max-h-16 w-full object-contain"
                  />
                </div>
                <span
                  className="text-sm lg:text-base xl:text-lg font-semibold text-center leading-tight"
                  style={FORM_STEP_TITLE_STYLE}
                >
                  {name}
                </span>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          role="radio"
          aria-checked={value === "Other"}
          onClick={() => onChange("Other")}
          className={formOptionButtonClasses(value === "Other", "w-full flex  items-center justify-center  rounded-lg border px-3 py-4 transition-colors duration-200 min-h-[56px]")}
        >
          <span
            className="text-base font-medium"
            style={FORM_STEP_TITLE_STYLE}
          >
            Other
          </span>
        </button>
      </div>
    </div>
  )
}
