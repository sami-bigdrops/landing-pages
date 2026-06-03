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
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto text-center px-4 md:px-6">
        <p className="text-base font-bold text-[#051850] leading-snug mb-3">
          {tagline ?? `Drivers in ${cityName} can save up to $${FORM_SAVINGS_AMOUNT} per year!`}
        </p>

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

        <p className="mt-3 text-base font-medium text-gray-700">
          Progress: {percentage}%
        </p>
      </div>

      <div
        className="relative left-1/2 mt-3 w-screen -translate-x-1/2 border-b border-gray-200"
        aria-hidden
      />
    </div>
  )
}
