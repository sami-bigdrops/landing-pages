"use client"

import { useEffect, useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import {
  FORM_PRIMARY_COLOR,
  FORM_SELECTED_BG,
  FORM_SELECTED_BORDER,
  FORM_YEAR_INITIAL_VISIBLE,
} from "@/lib/constant"

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
    let cancelled = false

    fetch("/api/years")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load years")
        return res.json()
      })
      .then((data: { years?: VehicleYearOption[] }) => {
        if (cancelled) return
        setAllYears(Array.isArray(data.years) ? data.years : [])
        setError(null)
      })
      .catch(() => {
        if (!cancelled) setError("Unable to load vehicle years. Please try again.")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
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
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your vehicle year?
      </h2>

      <div
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
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
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg border px-2.5 md:px-5 xl:px-6.5 py-3.5 text-left transition-colors duration-200",
                !isSelected && "bg-white hover:border-gray-300"
              )}
              style={
                isSelected
                  ? {
                      borderColor: FORM_SELECTED_BORDER,
                      backgroundColor: FORM_SELECTED_BG,
                    }
                  : { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }
              }
            >
              <span
                className="text-sm md:text-lg font-semibold tabular-nums"
                style={{ color: FORM_PRIMARY_COLOR }}
              >
                {option.year}
              </span>
              <span
                className={cn(
                  "flex w-3.5 h-3.5 md:h-4.5 md:w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  !isSelected && "border-gray-300 bg-white"
                )}
                style={
                  isSelected
                    ? {
                        borderColor: FORM_SELECTED_BORDER,
                        backgroundColor: FORM_SELECTED_BORDER,
                      }
                    : undefined
                }
                aria-hidden
              >
                {isSelected ? (
                  <span className="h-2 w-2 rounded-full bg-white" />
                ) : null}
              </span>
            </button>
          )
        })}
      </div>

      {hasMoreYears ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAllYears(true)}
            className="inline-flex items-center gap-1.5 font-bold text-sm lg:text-base hover:underline"
            style={{ color: FORM_PRIMARY_COLOR }}
          >
          
            Show More Years
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
