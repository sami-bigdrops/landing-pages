"use client"

import { useEffect, useMemo, useState, type SyntheticEvent } from "react"
import { Bike, Car } from "lucide-react"
import { SelectInput } from "@workspace/ui/components/select-input"
import { cn } from "@workspace/ui/lib/utils"
import { formOptionButtonClasses, FORM_FIELD_SELECT_INPUT_CLASSNAME } from "@/lib/form-input-styles"
import { FORM_POPULAR_CAR_MAKES, FORM_POPULAR_MOTORCYCLE_MAKES, FORM_PRIMARY_COLOR, type FormVehicleType } from "@/lib/constant"

export interface VehicleMakeOption {
  name: string
  logoUrl: string | null
}

interface VehicleMakeStepProps {
  year: string
  vehicleType: FormVehicleType
  onVehicleTypeChange: (type: FormVehicleType) => void
  value: string
  onChange: (make: string) => void
  title?: string
  showTypeToggle?: boolean
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
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gray-100 text-sm font-bold text-gray-500"
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

  if (failed) {
    return <MakeLogoFallback name={name} />
  }

  return (
    <img
      src={logoUrl}
      alt=""
      className="h-26 w-26 shrink-0 object-contain"
      loading="lazy"
      onError={handleError}
    />
  )
}

export function VehicleMakeStep({
  year,
  vehicleType,
  onVehicleTypeChange,
  value,
  onChange,
  title,
  showTypeToggle = true,
}: VehicleMakeStepProps) {
  const [makes, setMakes] = useState<VehicleMakeOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const params = new URLSearchParams({ year, type: vehicleType })
    fetch(`/api/vehicle-makes?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load makes")
        return res.json()
      })
      .then((data: VehicleMakeOption[]) => {
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

    return () => {
      cancelled = true
    }
  }, [year, vehicleType])

  const popularNames = useMemo(
    () =>
      vehicleType === "car"
        ? [...FORM_POPULAR_CAR_MAKES]
        : [...FORM_POPULAR_MOTORCYCLE_MAKES],
    [vehicleType]
  )

  const { gridMakes, otherMakes } = useMemo(() => {
    const byKey = new Map(makes.map((m) => [normalizeMakeKey(m.name), m]))
    const grid: VehicleMakeOption[] = []

    for (const popular of popularNames) {
      const match = byKey.get(normalizeMakeKey(popular))
      if (match) grid.push(match)
    }

    const gridKeys = new Set(grid.map((m) => normalizeMakeKey(m.name)))
    const other = makes.filter((m) => !gridKeys.has(normalizeMakeKey(m.name)))

    return { gridMakes: grid, otherMakes: other }
  }, [makes, popularNames])

  const otherOptions = useMemo(
    () =>
      otherMakes.map((m) => ({
        value: m.name,
        label: formatMakeLabel(m.name),
      })),
    [otherMakes]
  )
return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        {title ?? "What is your vehicle make?"}
      </h2>

      {showTypeToggle && (
        <div
          className="w-full md:max-w-lg xl:max-w-2xl mx-auto mb-6 md:mb-8 p-1.5 md:p-2 overflow-hidden border border-gray-200 rounded-xl grid grid-cols-2 gap-1.5 md:gap-3"
          role="group"
          aria-label="Vehicle type"
          style={{ borderColor: "#D1D5DB" }}
        >
          {(
            [
              { type: "car" as const, label: "Car", Icon: Car },
              { type: "motorcycle" as const, label: "Motorcycle", Icon: Bike },
            ] as const
          ).map(({ type, label, Icon }) => {
            const isSelected = vehicleType === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => onVehicleTypeChange(type)}
                className={formOptionButtonClasses(isSelected, "flex items-center justify-center gap-1.5 xl:gap-2.5 rounded-lg border px-2 xl:px-3 py-3.5 font-semibold transition-colors")}
              >
                <Icon
                  className="w-4 h-4 xl:w-6 xl:h-6 shrink-0"
                  style={{ color: FORM_PRIMARY_COLOR }}
                  strokeWidth={2}
                />
                <span className="text-sm lg:text-base xl:text-lg font-semibold leading-tight line-clamp-2" style={{ color: FORM_PRIMARY_COLOR }}>{label}</span>
              </button>
            )
          })}
        </div>
      )}


      {loading ? (
        <div className="py-12 text-center text-gray-500 font-medium">
          Loading makes...
        </div>
      ) : null}

      {!loading && error ? (
        <div className="py-8 text-center text-red-600 font-medium">{error}</div>
      ) : null}

      {!loading && !error && makes.length === 0 ? (
        <div className="py-8 text-center text-gray-500 font-medium">
          No makes found for this year.
        </div>
      ) : null}

      {!loading && !error && makes.length > 0 ? (
        <>
          {gridMakes.length > 0 ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6"
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
                    className={formOptionButtonClasses(isSelected, "flex flex-col items-center gap-2 rounded-lg border px-3 py-4 text-left transition-colors min-h-[96px]")}
                  >
                    <MakeLogo name={make.name} logoUrl={make.logoUrl || ""} />
                    <span
                      className="text-sm lg:text-base xl:text-lg font-semibold  text-center leading-tight line-clamp-2"
                      style={{ color: FORM_PRIMARY_COLOR }}
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
            />
          ) : null}
        </>
      ) : null}
    </div>
  )
}
