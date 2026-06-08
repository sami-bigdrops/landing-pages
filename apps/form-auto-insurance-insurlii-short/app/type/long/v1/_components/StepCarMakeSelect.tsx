"use client"

import { useEffect, useMemo, useState, type SyntheticEvent } from "react"
import { SelectInput } from "@workspace/ui/components/select-input"
import {
  formOptionButtonClasses,
  FORM_FIELD_SELECT_INPUT_CLASSNAME,
  FORM_SELECT_OPTION_CLASSNAME,
  FORM_SELECT_SEARCH_CLASSNAME,
} from "@/lib/form-input-styles"
import { FORM_POPULAR_CAR_MAKES, FORM_PRIMARY_COLOR } from "@/lib/constant"
import { FORM_STEP_TITLE_CLASSNAME, FORM_STEP_TITLE_STYLE } from "@/lib/form-step-styles"


interface MakeOption {
  name: string
  logoUrl: string | null
}

interface StepCarMakeSelectProps {
  year: string
  title: string
  value: string
  onChange: (make: string) => void
}

function normalizeMakeKey(name: string) {
  return name.trim().toLowerCase()
}

function formatMakeLabel(name: string) {
  return name
    .split(/\s+/)
    .map((word) => {
      if (word.length <= 3 && word === word.toUpperCase()) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(" ")
}

function MakeLogoFallback({ name }: { name: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-500"
      aria-hidden
    >
      {name.charAt(0)}
    </span>
  )
}

function MakeLogo({ name, logoUrl }: { name: string; logoUrl: string }) {
  const [failed, setFailed] = useState(false)

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null
    setFailed(true)
  }

  if (failed) return <MakeLogoFallback name={name} />

  return (
    <img
      src={logoUrl}
      alt=""
      className="h-8 w-8 shrink-0 object-contain"
      loading="lazy"
      onError={handleError}
    />
  )
}

export function StepCarMakeSelect({ year, title, value, onChange }: StepCarMakeSelectProps) {
  const [makes, setMakes] = useState<MakeOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const params = new URLSearchParams({ year, type: "car" })
    fetch(`/api/vehicle-makes?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load makes")
        return res.json()
      })
      .then((data: MakeOption[]) => {
        if (cancelled) return
        setMakes(Array.isArray(data) ? data : [])
        setError(null)
      })
      .catch(() => {
        if (!cancelled) {
          setMakes([])
          setError("Unable to load vehicle makes. Please try again.")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [year])

  const { gridMakes, otherMakes } = useMemo(() => {
    const byKey = new Map(makes.map((m) => [normalizeMakeKey(m.name), m]))
    const grid: MakeOption[] = []

    for (const popular of FORM_POPULAR_CAR_MAKES) {
      const match = byKey.get(normalizeMakeKey(popular))
      if (match) grid.push(match)
    }

    const gridKeys = new Set(grid.map((m) => normalizeMakeKey(m.name)))
    const other = makes.filter((m) => !gridKeys.has(normalizeMakeKey(m.name)))

    return { gridMakes: grid, otherMakes: other }
  }, [makes])

  const otherOptions = useMemo(
    () => otherMakes.map((m) => ({ value: m.name, label: formatMakeLabel(m.name) })),
    [otherMakes]
  )
return (
    <div>
      <h2
        className={FORM_STEP_TITLE_CLASSNAME}
        style={FORM_STEP_TITLE_STYLE}
      >
        {title}
      </h2>

      {loading ? (
        <div className="py-12 text-center text-gray-500 font-medium">Loading makes...</div>
      ) : null}

      {!loading && error ? (
        <div className="py-8 text-center text-red-600 font-medium">{error}</div>
      ) : null}

      {!loading && !error && makes.length === 0 ? (
        <div className="py-8 text-center text-gray-500 font-medium">No makes found for this year.</div>
      ) : null}

      {!loading && !error && makes.length > 0 ? (
        <>
          {gridMakes.length > 0 ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
              role="radiogroup"
              aria-label="Popular vehicle makes"
            >
              {gridMakes.map((make) => {
                const isSelected = value === make.name
                return (
                  <button
                    key={make.name}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => onChange(make.name)}
                    className={formOptionButtonClasses(isSelected, "flex flex-col items-center gap-2 rounded-lg border px-3 py-3 text-left transition-colors min-h-[56px]")}
                  >
                    <MakeLogo name={make.name} logoUrl={make.logoUrl || ""} />
                    <span
                      className="text-sm lg:text-base xl:text-lg font-semibold text-center leading-tight line-clamp-2"
                      style={FORM_STEP_TITLE_STYLE}
                    >
                      {formatMakeLabel(make.name)}
                    </span>
                  </button>
                )
              })}
            </div>
          ) : null}

          {otherOptions.length > 0 ? (
            <SelectInput
              placeholder="Select other make"
              options={otherOptions}
              value={value && otherOptions.some((o) => o.value === value) ? value : ""}
              onChange={onChange}
              searchable
              searchPlaceholder="Search makes..."
              className={FORM_FIELD_SELECT_INPUT_CLASSNAME}
              selectClassName="text-[#12266D] text-sm lg:text-base xl:text-lg font-medium"
              optionClassName={FORM_SELECT_OPTION_CLASSNAME}
              searchClassName={FORM_SELECT_SEARCH_CLASSNAME}
            />
          ) : null}
        </>
      ) : null}
    </div>
  )
}
