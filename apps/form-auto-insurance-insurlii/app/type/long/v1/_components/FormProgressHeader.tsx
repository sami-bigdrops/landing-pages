"use client"

import Image from "next/image"
import { FORM_SAVINGS_AMOUNT } from "@/lib/constant"

const PROGRESS_FILL = "#051850"
const PROGRESS_TRACK = "#E5E7EB"
const CAR_ICON_SIZE_PX = 42
const CAR_ICON_HALF = CAR_ICON_SIZE_PX / 2

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
  const progressRatio = percentage / 100

  const carLeft = `calc(${CAR_ICON_HALF}px + (100% - ${CAR_ICON_SIZE_PX}px) * ${progressRatio})`

  return (
    <div className="w-full mb-8 text-center">
      <h2 className="text-sm md:text-base xl:text-lg font-semibold text-[#051850] leading-snug mb-5 xl:mb-6 px-2">
        {tagline ?? `Drivers in ${cityName} can save up to $${FORM_SAVINGS_AMOUNT} per year!`}
      </h2>

      <div
        className="relative w-full"
        style={{
          paddingLeft: CAR_ICON_HALF,
          paddingRight: CAR_ICON_HALF,
        }}
      >
        <div
          className="relative w-full overflow-hidden rounded-full h-2.5 xl:h-3"
          style={{ backgroundColor: PROGRESS_TRACK }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${percentage}%`}
        >
          <div
            className="h-2.5 xl:h-3 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%`, backgroundColor: PROGRESS_FILL }}
          />
        </div>

        <div
          className="pointer-events-none absolute top-1/2 z-10 shrink-0 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-300"
          style={{
            left: carLeft,
            width: CAR_ICON_SIZE_PX,
            height: CAR_ICON_SIZE_PX,
          }}
        >
          <Image
            src="/car.svg"
            alt=""
            width={CAR_ICON_SIZE_PX}
            height={CAR_ICON_SIZE_PX}
            className="shrink-0"
            style={{ width: CAR_ICON_SIZE_PX, height: CAR_ICON_SIZE_PX }}
            priority
          />
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-gray-700 md:text-base xl:mt-6 xl:text-lg">
        Progress: {percentage}%
      </p>
    </div>
  )
}
