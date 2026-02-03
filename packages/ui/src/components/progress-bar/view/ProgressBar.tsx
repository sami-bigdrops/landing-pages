import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import type { ProgressBarProps } from "../model/types"
import { progressBarVariants } from "../controller/progress-bar-variants"

function getPercentage(currentStep: number, totalSteps: number): number {
  if (totalSteps <= 0) return 0
  const step = Math.max(0, Math.min(currentStep, totalSteps))
  return (step / totalSteps) * 100
}

const DEFAULT_BG = "#e5e7eb"
const DEFAULT_FG: Record<"1" | "2" | "3" | "4" | "5" | "6", string> = {
  "1": "#3498DB",
  "2": "#43C590",
  "3": "#6b7280",
  "4": "#8b5cf6",
  "5": "#0ea5e9",
  "6": "#4CAF50",
}

function getDefaultForeground(type: ProgressBarProps["type"]): string {
  return (type && DEFAULT_FG[type]) ?? DEFAULT_FG["1"]
}

function ProgressBar({
  type = "1",
  currentStep,
  totalSteps,
  stepLabels,
  backgroundColor = DEFAULT_BG,
  foregroundColor,
  icon,
  topSlot,
  className,
}: ProgressBarProps) {
  const fg = foregroundColor ?? getDefaultForeground(type)
  const percentage = getPercentage(currentStep, totalSteps)
  const steps = type === "6" ? (stepLabels?.length ?? totalSteps) : totalSteps
  const labels =
    type === "6" && stepLabels?.length
      ? stepLabels
      : Array.from({ length: steps }, (_, i) => `Step ${i + 1}`)

  return (
    <div
      className={cn(progressBarVariants({ type }), className)}
      role="progressbar"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${Math.round(percentage)}%`}
    >
      {type === "1" && (
        <>
          {topSlot != null ? (
            <div className="flex items-center justify-center mb-4">
              {topSlot}
            </div>
          ) : null}
          <div
            className="relative w-full rounded-full h-3"
            style={{ backgroundColor }}
          >
            <div
              className="h-3 rounded-full transition-all duration-300 relative"
              style={{ width: `${percentage}%`, backgroundColor: fg }}
            />
            {icon != null ? (
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 z-10"
                style={{ left: `calc(${percentage}% - 18px)` }}
              >
                <div
                  className="bg-white rounded-full p-2 shadow-lg border-2 flex items-center justify-center"
                  style={{ borderColor: fg }}
                >
                  {icon}
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-center mt-3">
            <span
              className="text-sm md:text-base font-semibold"
              style={{ color: fg }}
            >
              {Math.round(percentage)}% Complete
            </span>
          </div>
        </>
      )}
      {type === "2" && (
        <div
          className="relative w-full rounded-full h-8"
          style={{ backgroundColor }}
        >
          <div
            className="h-8 rounded-full transition-all duration-300 relative flex items-center justify-end pr-2"
            style={{ width: `${percentage}%`, backgroundColor: fg }}
          >
            <span className="text-sm font-semibold text-white whitespace-nowrap">
              <span className="md:hidden">{Math.round(percentage)}%</span>
              <span className="hidden md:inline">
                {Math.round(percentage)}% Complete
              </span>
            </span>
          </div>
        </div>
      )}
      {type === "3" && (
        <div className="flex items-center gap-3">
          <div
            className="relative flex-1 rounded-full h-2 overflow-hidden"
            style={{ backgroundColor }}
          >
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%`, backgroundColor: fg }}
            />
          </div>
          <span
            className="text-xs font-medium tabular-nums shrink-0 w-10"
            style={{ color: fg }}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      {type === "4" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 w-full">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className="h-3 flex-1 rounded-sm transition-all duration-300 first:rounded-l-md last:rounded-r-md"
                style={{
                  backgroundColor: i < currentStep ? fg : backgroundColor,
                }}
              />
            ))}
          </div>
          <span
            className="text-xs font-medium text-center tabular-nums"
            style={{ color: fg }}
          >
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      )}
      {type === "5" && (
        <>
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-sm font-semibold tabular-nums"
              style={{ color: fg }}
            >
              {Math.round(percentage)}% Complete
            </span>
          </div>
          <div
            className="relative w-full rounded-full h-4 overflow-hidden"
            style={{ backgroundColor }}
          >
            <div
              className="h-4 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%`, backgroundColor: fg }}
            />
          </div>
        </>
      )}
      {type === "6" && (
        <div className="flex w-full items-start justify-between gap-0">
          {Array.from({ length: steps }, (_, i) => {
            const stepNumber = i + 1
            const completed = currentStep > stepNumber
            const active = currentStep === stepNumber
            const upcoming = currentStep < stepNumber
            const lineSolid = currentStep >= stepNumber
            return (
              <React.Fragment key={i}>
                {i > 0 ? (
                  <div
                    className="flex-1 min-w-[24px] h-0.5 -mt-5 mx-1 self-center border-t-2 shrink-0 transition-colors duration-300"
                    style={{
                      borderColor: lineSolid ? fg : backgroundColor,
                      borderStyle: lineSolid ? "solid" : "dashed",
                    }}
                  />
                ) : null}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="flex size-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300"
                    style={{
                      backgroundColor: completed || active ? fg : "transparent",
                      color: completed || active ? "#fff" : fg,
                      borderWidth: active || upcoming ? 2 : 0,
                      borderStyle: active || upcoming ? "solid" : "none",
                      borderColor: fg,
                    }}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className="mt-2 text-center text-sm font-medium max-w-[120px]"
                    style={{
                      color: active
                        ? "#1e293b"
                        : completed
                          ? "#64748b"
                          : "#94a3b8",
                    }}
                  >
                    {labels[i]}
                  </span>
                </div>
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { ProgressBar }
