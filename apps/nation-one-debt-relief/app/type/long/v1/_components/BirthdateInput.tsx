"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import {
  MONTH_NAMES,
  buildIsoFromParts,
  dayToPadded,
  isoToParts,
  listDaysForMonth,
  listMonthsInRange,
  listYearsForParts,
  maxDayForMonth,
  monthToPadded,
} from "@/lib/dob-format"
import { getDobBounds } from "./DatePickerCalendar"

interface BirthdateInputProps {
  value: string
  onChange: (iso: string) => void
  className?: string
  label?: string
  labelClassName?: string
  ariaLabel?: string
  dataArohaaField?: string
  hasError?: boolean
}

type Segment = "month" | "day" | "year"

interface SegmentConfig {
  id: Segment
  label: string
  placeholder: string
  autoComplete: "bday-month" | "bday-day" | "bday-year"
  maxLength: number
  inputMode: "numeric" | "text"
}

const SEGMENTS: SegmentConfig[] = [
  { id: "month", label: "Month", placeholder: "Month", autoComplete: "bday-month", maxLength: 2, inputMode: "numeric" },
  { id: "day", label: "Day", placeholder: "DD", autoComplete: "bday-day", maxLength: 2, inputMode: "numeric" },
  { id: "year", label: "Year", placeholder: "YYYY", autoComplete: "bday-year", maxLength: 4, inputMode: "numeric" },
]

function clampDayForMonth(mm: string, dd: string, yyyy: string): string {
  if (!dd) return dd
  const max = maxDayForMonth(mm, yyyy)
  const n = Number.parseInt(dd, 10)
  if (!Number.isFinite(n)) return dd
  if (n > max) return String(max).padStart(2, "0")
  return dd.length === 2 ? dayToPadded(dd) || dd : dd
}

export function BirthdateInput({
  value,
  onChange,
  className,
  label,
  labelClassName,
  ariaLabel = "Date of birth",
  dataArohaaField,
  hasError,
}: BirthdateInputProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRefs = useRef<Record<Segment, HTMLInputElement | null>>({
    month: null,
    day: null,
    year: null,
  })
  const listId = useId()
  const { minDate, maxDate } = useMemo(() => getDobBounds(), [])

  const [parts, setParts] = useState(() => isoToParts(value))
  const [openSegment, setOpenSegment] = useState<Segment | null>(null)
  const [monthEditing, setMonthEditing] = useState(false)

  useEffect(() => {
    setParts(isoToParts(value))
  }, [value])

  useEffect(() => {
    if (openSegment === null) return
    const handlePointerDown = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return
      setOpenSegment(null)
      setMonthEditing(false)
    }
    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [openSegment])

  const emitChange = useCallback(
    (next: { mm: string; dd: string; yyyy: string }) => {
      const mm = next.mm.length === 2 ? monthToPadded(next.mm) || next.mm : next.mm
      const dd = next.dd.length === 2 ? dayToPadded(next.dd) || next.dd : next.dd
      const yyyy = next.yyyy
      onChange(buildIsoFromParts(mm, dd, yyyy))
    },
    [onChange]
  )

  const updateParts = useCallback(
    (patch: Partial<{ mm: string; dd: string; yyyy: string }>, focusNext?: Segment) => {
      setParts((prev) => {
        let mm = patch.mm !== undefined ? patch.mm : prev.mm
        let dd = patch.dd !== undefined ? patch.dd : prev.dd
        let yyyy = patch.yyyy !== undefined ? patch.yyyy : prev.yyyy

        if (patch.mm !== undefined || patch.yyyy !== undefined) {
          dd = clampDayForMonth(mm, dd, yyyy)
        }

        const next = { mm, dd, yyyy }
        emitChange(next)
        return next
      })

      if (focusNext) {
        requestAnimationFrame(() => {
          inputRefs.current[focusNext]?.focus()
          inputRefs.current[focusNext]?.select()
        })
      }
    },
    [emitChange]
  )

  const focusSegment = (segment: Segment) => {
    requestAnimationFrame(() => {
      inputRefs.current[segment]?.focus()
    })
  }

  const trimPrevious = (segment: Segment) => {
    if (segment === "day") {
      const trimmed = parts.mm.slice(0, -1)
      updateParts({ mm: trimmed })
      focusSegment("month")
      setMonthEditing(true)
      return
    }
    if (segment === "year") {
      const trimmed = parts.dd.slice(0, -1)
      updateParts({ dd: trimmed })
      focusSegment("day")
    }
  }

  const handleMonthInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 2)
    if (digits.length === 0) {
      updateParts({ mm: "" })
      return
    }

    if (digits.length === 1) {
      const n = Number.parseInt(digits, 10)
      if (n >= 2 && n <= 9) {
        updateParts({ mm: `0${n}` }, "day")
        setMonthEditing(false)
        setOpenSegment(null)
        return
      }
      updateParts({ mm: digits })
      return
    }

    const n = Number.parseInt(digits, 10)
    if (n >= 1 && n <= 12) {
      const padded = monthToPadded(digits)
      updateParts({ mm: padded }, "day")
      setMonthEditing(false)
      setOpenSegment(null)
      return
    }

    updateParts({ mm: digits.slice(0, 1) })
  }

  const handleDayInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 2)
    if (digits.length === 0) {
      updateParts({ dd: "" })
      return
    }

    const max = maxDayForMonth(parts.mm, parts.yyyy)

    if (digits.length === 1) {
      const n = Number.parseInt(digits, 10)
      if (n * 10 > max && n <= max) {
        updateParts({ dd: `0${n}` }, "year")
        setOpenSegment(null)
        return
      }
      updateParts({ dd: digits })
      return
    }

    const n = Number.parseInt(digits, 10)
    if (n >= 1 && n <= max) {
      updateParts({ dd: dayToPadded(digits) }, "year")
      setOpenSegment(null)
      return
    }

    updateParts({ dd: digits.slice(0, 1) })
  }

  const handleYearInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 4)
    updateParts({ yyyy: digits })
    if (digits.length === 4) {
      setOpenSegment(null)
    }
  }

  const handleKeyDown = (segment: Segment, e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    if (e.key === "Backspace" && input.value === "") {
      e.preventDefault()
      trimPrevious(segment)
      return
    }
    if (e.key === "ArrowLeft" && input.selectionStart === 0 && segment !== "month") {
      e.preventDefault()
      focusSegment(segment === "year" ? "day" : "month")
    }
    if (e.key === "ArrowRight" && input.selectionStart === input.value.length && segment !== "year") {
      e.preventDefault()
      focusSegment(segment === "month" ? "day" : "year")
    }
    if (e.key === "Escape") {
      setOpenSegment(null)
      setMonthEditing(false)
    }
  }

  const monthOptions = useMemo(
    () => listMonthsInRange(parts.yyyy, minDate, maxDate),
    [parts.yyyy, minDate, maxDate]
  )

  const dayOptions = useMemo(
    () => listDaysForMonth(parts.mm, parts.yyyy, minDate, maxDate),
    [parts.mm, parts.yyyy, minDate, maxDate]
  )

  const yearOptions = useMemo(
    () => listYearsForParts(parts.mm, parts.dd, minDate, maxDate),
    [parts.mm, parts.dd, minDate, maxDate]
  )

  const segmentValue = (segment: Segment): string => {
    if (segment === "month") {
      if (monthEditing || openSegment === "month") return parts.mm
      const padded = monthToPadded(parts.mm)
      if (padded) return MONTH_NAMES[Number.parseInt(padded, 10) - 1] ?? parts.mm
      return parts.mm
    }
    if (segment === "day") return parts.dd
    return parts.yyyy
  }

  const selectFromDropdown = (segment: Segment, selected: string) => {
    if (segment === "month") {
      updateParts({ mm: selected }, "day")
      setMonthEditing(false)
    } else if (segment === "day") {
      updateParts({ dd: selected }, "year")
    } else {
      updateParts({ yyyy: selected })
    }
    setOpenSegment(null)
  }

  const dropdownOptions = (segment: Segment): Array<{ value: string; label: string }> => {
    if (segment === "month") return monthOptions
    if (segment === "day") {
      return dayOptions.map((d) => ({
        value: String(d).padStart(2, "0"),
        label: String(d),
      }))
    }
    return yearOptions.map((y) => ({ value: String(y), label: String(y) }))
  }

  const fieldShell =
    "relative flex min-w-0 flex-1 flex-col gap-1.5"
  const inputShell =
    "relative flex h-14 w-full items-center rounded-[10px] border border-gray-300 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.03)] focus-within:border-[#102E50] xl:h-15"
  const inputBase =
    "min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#111827] placeholder:text-[#8F8E93] focus:outline-none xl:text-base"

  return (
    <div ref={rootRef} className="relative w-full" role="group" aria-label={ariaLabel}>
      {label ? <label className={labelClassName}>{label}</label> : null}

      {dataArohaaField ? (
        <input type="hidden" name={dataArohaaField} data-arohaa-field={dataArohaaField} value={value} readOnly />
      ) : null}

      <div className={cn("mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-3", className?.includes("mt-") && "mt-0")}>
        {SEGMENTS.map((seg) => {
          const options = dropdownOptions(seg.id)
          const isOpen = openSegment === seg.id
          const displayValue = segmentValue(seg.id)
          const selectedValue =
            seg.id === "month"
              ? monthToPadded(parts.mm)
              : seg.id === "day"
                ? dayToPadded(parts.dd)
                : parts.yyyy

          return (
            <div key={seg.id} className={fieldShell}>
              <span className="text-xs font-medium text-[#475467] sm:text-sm">{seg.label}</span>
              <div
                className={cn(
                  inputShell,
                  hasError && "border-red-500 focus-within:border-red-500",
                  className && !className.includes("h-") ? undefined : className
                )}
              >
                <input
                  ref={(el) => {
                    inputRefs.current[seg.id] = el
                  }}
                  type="text"
                  inputMode={seg.inputMode}
                  autoComplete={seg.autoComplete}
                  placeholder={seg.placeholder}
                  maxLength={seg.id === "month" && !monthEditing && parts.mm ? undefined : seg.maxLength}
                  value={displayValue}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? `${listId}-${seg.id}` : undefined}
                  aria-haspopup="listbox"
                  aria-label={`${ariaLabel} ${seg.label}`}
                  className={cn(inputBase, seg.id === "month" && !monthEditing && parts.mm ? "truncate" : "")}
                  onFocus={() => {
                    if (seg.id === "month") setMonthEditing(true)
                    setOpenSegment(seg.id)
                  }}
                  onChange={(e) => {
                    if (seg.id === "month") handleMonthInput(e.target.value)
                    else if (seg.id === "day") handleDayInput(e.target.value)
                    else handleYearInput(e.target.value)
                  }}
                  onKeyDown={(e) => handleKeyDown(seg.id, e)}
                  onBlur={() => {
                    window.setTimeout(() => {
                      if (rootRef.current?.contains(document.activeElement)) return
                      if (seg.id === "month") {
                        setMonthEditing(false)
                        if (parts.mm.length === 1) {
                          const padded = monthToPadded(parts.mm)
                          if (padded) updateParts({ mm: padded })
                        }
                      } else if (seg.id === "day" && parts.dd.length === 1) {
                        const padded = dayToPadded(parts.dd)
                        if (padded) updateParts({ dd: padded })
                      }
                    }, 0)
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={`Open ${seg.label} list`}
                  className="flex h-full shrink-0 items-center justify-center px-2.5 text-[#142B4A] transition-colors hover:text-[#C12026]"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setOpenSegment((cur) => (cur === seg.id ? null : seg.id))
                    if (seg.id === "month") setMonthEditing(true)
                    focusSegment(seg.id)
                  }}
                >
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                </button>

                {isOpen && options.length > 0 ? (
                  <ul
                    id={`${listId}-${seg.id}`}
                    role="listbox"
                    aria-label={`${seg.label} options`}
                    className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-80 overflow-y-auto rounded-[10px] border border-[#E5E7EB] bg-white py-1 shadow-lg sm:max-h-96"
                  >
                    {options.map((opt) => {
                      const isSelected = opt.value === selectedValue
                      return (
                        <li key={opt.value} role="presentation">
                          <button
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            className={cn(
                              "flex w-full px-3 py-2.5 text-left text-sm transition-colors",
                              isSelected
                                ? "bg-[#C12026] font-medium text-white"
                                : "text-[#051850] hover:bg-[#EBF5FF]"
                            )}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => selectFromDropdown(seg.id, opt.value)}
                          >
                            {opt.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
