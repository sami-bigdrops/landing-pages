"use client"

import Image from "next/image"
import { FORM_SAVINGS_AMOUNT } from "@/lib/constant"

const PROGRESS_FILL = "#051850"
const PROGRESS_TRACK = "#E5E7EB"

interface FormProgressHeaderProps {
  cityName: string
  currentStep: number
  totalSteps: number
  tagline?: string
}

export function FormProgressHeader({
  cityName,
  currentStep,
  totalSteps,
  tagline,
}: FormProgressHeaderProps) {
  const safeTotal = totalSteps > 0 ? totalSteps : 1
  const safeStep = Math.max(0, Math.min(currentStep, safeTotal))
  const percentage = Math.round((safeStep / safeTotal) * 100)
  const carOffset = Math.min(Math.max(percentage, 0), 100)

  return (
    <div className="w-full mb-8  text-center ">
      <h2 className="text-sm md:text-base xl:text-lg font-semibold text-[#051850] leading-snug mb-5 xl:mb-6 px-2">
        {tagline ?? `Drivers in ${cityName} can save up to $${FORM_SAVINGS_AMOUNT} per year!`}
      </h2>

      <div
        className="relative w-full rounded-full h-2.5 xl:h-3 mb-5 xl:mb-6"
        style={{ backgroundColor: PROGRESS_TRACK }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${percentage}%`}
      >
        <div
          className="h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: PROGRESS_FILL }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300"
          style={{ left: `calc(${carOffset}% - 21px)` }}
        >
          <Image
            src="/car.svg"
            alt=""
            width={42}
            height={42}
            className="h-[42px] w-[42px]"
            priority
          />
        </div>
      </div>

      <p className="text-sm md:text-base xl:text-lg text-gray-700 font-medium">
        Progress: {percentage}%
      </p>
    </div>
  )
}
