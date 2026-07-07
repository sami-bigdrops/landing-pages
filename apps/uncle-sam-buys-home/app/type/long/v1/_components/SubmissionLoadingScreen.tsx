"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"

const LOADING_STEPS = [
  { message: "Reviewing your property details..." },
  { message: "Analyzing your local market..." },
  { message: "Finding the perfect match..." },
  { message: "Connecting you with a cash buyer..." },
  { message: "Finalizing your cash offer..." },
] as const

const STEP_DURATION_MS = 1400

type SubmissionLoadingScreenProps = {
  active: boolean
  onComplete: () => void
}

export function SubmissionLoadingScreen({ active, onComplete }: SubmissionLoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!active) {
      setCurrentStep(0)
      return
    }

    let cancelled = false
    let step = 0
    setCurrentStep(0)

    const advance = () => {
      if (cancelled) return

      step += 1
      if (step >= LOADING_STEPS.length) {
        onComplete()
        return
      }

      setCurrentStep(step)
      window.setTimeout(advance, STEP_DURATION_MS)
    }

    const timer = window.setTimeout(advance, STEP_DURATION_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [active, onComplete])

  if (!active) return null

  const progressStep = currentStep + 1

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F3F6FA]/95 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_50px_rgba(24,37,66,0.12)] md:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#C12026]/15" />
            <div className="absolute inset-2 animate-pulse rounded-full bg-[#C12026]/10" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#182542]">
              <Image src="/logo.svg" alt="Uncle Sam Buys Homes" width={40} height={40} className="h-9 w-auto" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-[#182542] md:text-2xl">Hang tight</h2>
          <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-[#4B5563] transition-opacity duration-300 md:text-base">
            {LOADING_STEPS[currentStep]?.message}
          </p>

          <div className="mt-6 w-full">
            <ProgressBar
              type="1"
              currentStep={progressStep}
              totalSteps={LOADING_STEPS.length}
              backgroundColor="#C1202633"
              foregroundColor="#C12026"
              className="w-full"
            />
          </div>

          <ul className="mt-6 w-full space-y-2.5 text-left">
            {LOADING_STEPS.map((step, index) => {
              const completed = index < currentStep
              const current = index === currentStep

              return (
                <li
                  key={step.message}
                  className={`flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm transition-colors duration-300 ${
                    current ? "bg-[#FDE9EA] text-[#182542]" : "text-[#6B7280]"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold ${
                      completed
                        ? "bg-[#C12026] text-white"
                        : current
                          ? "border-2 border-[#C12026] text-[#C12026]"
                          : "border border-[#D1D5DB] text-transparent"
                    }`}
                  >
                    {completed ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path
                          d="M2 5.2L4.1 7.3L8 3.2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className={current ? "font-medium" : ""}>{step.message.replace(/\.\.\.$/, "")}</span>
                </li>
              )
            })}
          </ul>

          <p className="mt-5 text-xs text-[#9CA3AF]">Please don&apos;t close this window.</p>
        </div>
      </div>
    </div>
  )
}
