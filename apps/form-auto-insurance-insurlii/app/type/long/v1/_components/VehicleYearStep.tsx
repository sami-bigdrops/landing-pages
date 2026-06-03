"use client"

import { useEffect, useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { formOptionButtonClasses } from "@/lib/form-input-styles"
import {
  FORM_OPTION_LABEL_CLASSNAME,
  FORM_OPTIONS_GRID_4_CLASSNAME,
  FORM_SHOW_MORE_LINK_CLASSNAME,
  FORM_STEP_TITLE_CLASSNAME,
  FORM_STEP_TITLE_STYLE,
} from "@/lib/form-step-styles"
import { FORM_YEAR_INITIAL_VISIBLE } from "@/lib/constant"
import { FormRadioIndicator } from "./FormRadioIndicator"

export interface VehicleYearOption {
  id: number
  year: number
}

interface VehicleYearStepProps {
  value: string
  onChange: (year: string) => void
}

export function VehicleYearStep({ value, onChange }: VehicleYearStepProps) {
  const [allYears, setAllYears] = useState<VehicleYearOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAllYears, setShowAllYears] = useState(false)

  useEffect(() => {
    let unmounted = false
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 20_000)

    setLoading(true)
    setError(null)

    fetch("/api/years", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load years")
        return res.json()
      })
      .then((data: { years?: VehicleYearOption[] }) => {
        if (unmounted) return
        setAllYears(Array.isArray(data.years) ? data.years : [])
        setError(null)
      })
      .catch((err: unknown) => {
        if (unmounted) return
        const isAbort = err instanceof DOMException && err.name === "AbortError"
        setError(
          isAbort
            ? "Loading years is taking too long. Please refresh and try again."
            : "Unable to load vehicle years. Please try again."
        )
      })
      .finally(() => {
        window.clearTimeout(timeoutId)
        setLoading(false)
      })

    return () => {
      unmounted = true
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  const { visibleYears, hasMoreYears } = useMemo(() => {
    if (showAllYears || allYears.length <= FORM_YEAR_INITIAL_VISIBLE) {
      return { visibleYears: allYears, hasMoreYears: false }
    }
    return {
      visibleYears: allYears.slice(0, FORM_YEAR_INITIAL_VISIBLE),
      hasMoreYears: true,
    }
  }, [allYears, showAllYears])

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 font-medium">Loading years...</div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-600 font-medium">{error}</div>
    )
  }

  if (allYears.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 font-medium">
        No vehicle years available.
      </div>
    )
  }

  return (
    <div>
      <h2 className={FORM_STEP_TITLE_CLASSNAME} style={FORM_STEP_TITLE_STYLE}>
        What is your vehicle year?
      </h2>

      <div
        className={FORM_OPTIONS_GRID_4_CLASSNAME}
        role="radiogroup"
        aria-label="Vehicle year"
      >
        {visibleYears.map((option) => {
          const yearValue = String(option.year)
          const isSelected = value === yearValue

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(yearValue)}
              className={formOptionButtonClasses(isSelected)}
            >
              <span className={FORM_OPTION_LABEL_CLASSNAME} style={FORM_STEP_TITLE_STYLE}>
                {option.year}
              </span>
              <FormRadioIndicator isSelected={isSelected} className="w-3.5 h-3.5 md:h-4.5 md:w-4.5" />
            </button>
          )
        })}
      </div>

      {hasMoreYears ? (
        <div className="mt-6 pb-6 text-center md:pb-8">
          <button
            type="button"
            onClick={() => setShowAllYears(true)}
            className={FORM_SHOW_MORE_LINK_CLASSNAME}
            style={FORM_STEP_TITLE_STYLE}
          >
          
            Show More Years
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
