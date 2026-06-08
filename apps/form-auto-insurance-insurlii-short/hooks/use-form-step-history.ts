"use client"

import { useCallback, useEffect, useState } from "react"

export const FORM_HISTORY_STEP_KEY = "formStep"

const MIN_FORM_STEP = 1
const MAX_FORM_STEP = 70

export function isValidFormHistoryStep(step: unknown): step is number {
  return (
    typeof step === "number" &&
    Number.isInteger(step) &&
    step >= MIN_FORM_STEP &&
    step <= MAX_FORM_STEP
  )
}

function readStepFromHistoryState(state: unknown): number | null {
  if (!state || typeof state !== "object") return null
  const step = (state as Record<string, unknown>)[FORM_HISTORY_STEP_KEY]
  return isValidFormHistoryStep(step) ? step : null
}

function scrollFormToTop() {
  window.scrollTo({ top: 0, behavior: "auto" })
}

export function useFormStepHistory(initialStep: number) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  useEffect(() => {
    const fromState = readStepFromHistoryState(window.history.state)
    if (fromState !== null) {
      setCurrentStep(fromState)
    } else {
      window.history.replaceState(
        { ...window.history.state, [FORM_HISTORY_STEP_KEY]: initialStep },
        "",
        window.location.href
      )
    }

    const onPopState = (event: PopStateEvent) => {
      const step = readStepFromHistoryState(event.state)
      if (step !== null) {
        setCurrentStep(step)
        scrollFormToTop()
      }
    }

    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [initialStep])

  const goToStep = useCallback((step: number) => {
    if (!isValidFormHistoryStep(step)) return
    setCurrentStep(step)
    window.history.pushState(
      { ...window.history.state, [FORM_HISTORY_STEP_KEY]: step },
      "",
      window.location.href
    )
    scrollFormToTop()
  }, [])

  return [currentStep, goToStep] as const
}
