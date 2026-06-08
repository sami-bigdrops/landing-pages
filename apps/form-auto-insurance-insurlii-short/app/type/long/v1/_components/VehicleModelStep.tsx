"use client"

import { useEffect, useState } from "react"
import { formOptionButtonClasses } from "@/lib/form-input-styles"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"

import { FormRadioIndicator } from "./FormRadioIndicator"

interface VehicleModelStepProps {
  year: string
  make: string
  value: string
  onChange: (model: string) => void
}

interface VehicleModelOption {
  name: string
}

export function VehicleModelStep({
  year,
  make,
  value,
  onChange,
}: VehicleModelStepProps) {
  const [models, setModels] = useState<VehicleModelOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const params = new URLSearchParams({
      year,
      make,
      type: "car",
    })

    fetch(`/api/vehicle-models?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load models")
        return res.json()
      })
      .then((data: VehicleModelOption[]) => {
        if (cancelled) return
        setModels(Array.isArray(data) ? data : [])
        setError(null)
      })
      .catch(() => {
        if (!cancelled) {
          setModels([])
          setError("Unable to load vehicle models. Please try again.")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [year, make])

  const makeLabel = make.trim().toUpperCase()

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 font-medium">Loading models...</div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-600 font-medium">{error}</div>
    )
  }

  if (models.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 font-medium">
        No models found for this make.
      </div>
    )
  }

  return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        What is the model of your {makeLabel}?
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        role="radiogroup"
        aria-label="Vehicle model"
      >
        {models.map((option) => {
          const isSelected = value === option.name

          return (
            <button
              key={option.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.name)}
              className={formOptionButtonClasses(isSelected)}
            >
              <span
                className="text-sm lg:text-base xl:text-lg font-semibold uppercase"
                style={FORM_STEP_TITLE_STYLE}
              >
                {option.name}
              </span>
              <FormRadioIndicator isSelected={isSelected} className="w-3.5 h-3.5 md:h-4.5 md:w-4.5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
