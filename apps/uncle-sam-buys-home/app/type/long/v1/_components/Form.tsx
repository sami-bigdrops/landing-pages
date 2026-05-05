"use client"

import { useState } from "react"
import { Building2, Heart, Home, Map, Users } from "lucide-react"
import { ProgressBar } from "@workspace/ui/components/progress-bar"

const ACCENT = "#44BF7C"

function SingleFamilyIcon({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className ?? ""}`}>
      <Heart className="mb-0.5 h-5 w-5 stroke-current" strokeWidth={2} aria-hidden />
      <Users className="h-9 w-9 stroke-current" strokeWidth={1.75} aria-hidden />
    </div>
  )
}

const HOME_TYPE_OPTIONS = [
  {
    id: "single_family",
    label: "Single Family Home",
    Icon: SingleFamilyIcon,
  },
  {
    id: "condominium",
    label: "Condominium / Townhome",
    Icon: Building2,
  },
  {
    id: "mobile",
    label: "Mobile / Manufactured Home",
    Icon: Home,
  },
  {
    id: "vacant_land",
    label: "Vacant Land",
    Icon: Map,
  },
] as const

type HomeTypeId = (typeof HOME_TYPE_OPTIONS)[number]["id"]

export default function Form() {
  const currentStep = 1
  const totalSteps = 4
  const [homeType, setHomeType] = useState<HomeTypeId>("condominium")

  return (
    <div className="w-full max-w-2xl rounded-xl bg-[#ECF5F8] px-4 py-6 md:px-6 md:py-8">
      <div className="flex w-full flex-col gap-6">
        <ProgressBar
          type="5"
          currentStep={currentStep}
          totalSteps={totalSteps}
          backgroundColor="#8CD6AB"
          foregroundColor={ACCENT}
        />

        <div>
          <h2 className="text-center text-lg font-bold text-[#111827] md:text-xl">
            Confirm Your Home Type
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4">
            {HOME_TYPE_OPTIONS.map(({ id, label, Icon }) => {
              const selected = homeType === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setHomeType(id)}
                  aria-pressed={selected}
                  className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 px-3 py-5 text-center transition-colors md:px-4 md:py-6 ${
                    selected
                      ? "border-transparent bg-[#44BF7C] text-white"
                      : "border-[#44BF7C] bg-white text-[#111827]"
                  }`}
                >
                  {id === "single_family" ? (
                    <SingleFamilyIcon
                      className={`h-12 w-12 shrink-0 md:h-14 md:w-14 ${selected ? "text-white" : "text-[#44BF7C]"}`}
                    />
                  ) : (
                    <Icon
                      className={`h-12 w-12 shrink-0 md:h-14 md:w-14 ${selected ? "text-white" : "text-[#44BF7C]"}`}
                      strokeWidth={1.75}
                    />
                  )}
                  <span
                    className={`text-sm font-bold leading-tight md:text-[0.95rem] ${
                      selected ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
