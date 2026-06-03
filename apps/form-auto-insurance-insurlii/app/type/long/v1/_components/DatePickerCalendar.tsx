"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { formatIsoDate, MONTH_NAMES, parseIsoDate } from "@/lib/dob-format"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const

type PanelView = "days" | "months" | "years"

const YEARS_PER_PAGE = 12

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime()
}

function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime()
}

function isMonthDisabled(year: number, month: number, minStart: Date, maxStart: Date): boolean {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  return isAfterDay(first, maxStart) || isBeforeDay(last, minStart)
}

function clampYearPageStart(start: number, minYear: number, maxYear: number): number {
  const maxStart = Math.max(minYear, maxYear - (YEARS_PER_PAGE - 1))
  return Math.min(Math.max(start, minYear), maxStart)
}

interface DatePickerCalendarProps {
  value: string
  onChange: (iso: string) => void
  minDate: Date
  maxDate: Date
}

export function DatePickerCalendar({
  value,
  onChange,
  minDate,
  maxDate,
}: DatePickerCalendarProps) {
  const selected = useMemo(() => parseIsoDate(value), [value])
  const maxStart = useMemo(() => startOfDay(maxDate), [maxDate])
  const minStart = useMemo(() => startOfDay(minDate), [minDate])
  const minYear = minStart.getFullYear()
  const maxYear = maxStart.getFullYear()

  const initialView = selected ?? maxStart
  const [viewYear, setViewYear] = useState(initialView.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialView.getMonth())
  const [panelView, setPanelView] = useState<PanelView>("days")
  const [pendingMonth, setPendingMonth] = useState<number | null>(null)
  const [yearPageStart, setYearPageStart] = useState(() =>
    clampYearPageStart(
      Math.floor(initialView.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE,
      minYear,
      maxYear
    )
  )

  useEffect(() => {
    const next = parseIsoDate(value) ?? maxStart
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
    setYearPageStart(
      clampYearPageStart(
        Math.floor(next.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE,
        minYear,
        maxYear
      )
    )
  }, [value, maxStart, minYear, maxYear])

  const canGoPrevMonth =
    viewYear > minStart.getFullYear() ||
    (viewYear === minStart.getFullYear() && viewMonth > minStart.getMonth())

  const canGoNextMonth =
    viewYear < maxStart.getFullYear() ||
    (viewYear === maxStart.getFullYear() && viewMonth < maxStart.getMonth())

  const canGoPrevYear = viewYear > minYear
  const canGoNextYear = viewYear < maxYear

  const canGoPrevYearPage = yearPageStart > minYear
  const canGoNextYearPage = yearPageStart + YEARS_PER_PAGE <= maxYear

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1)
    const startWeekday = first.getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const cells: Array<{ date: Date | null; key: string }> = []

    for (let i = 0; i < startWeekday; i++) {
      cells.push({ date: null, key: `pad-${i}` })
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day)
      cells.push({ date, key: formatIsoDate(date) })
    }
    return cells
  }, [viewMonth, viewYear])

  const yearPageYears = useMemo(
    () => Array.from({ length: YEARS_PER_PAGE }, (_, i) => yearPageStart + i),
    [yearPageStart]
  )

  const goPrevMonth = () => {
    if (!canGoPrevMonth) return
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goNextMonth = () => {
    if (!canGoNextMonth) return
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const goPrevYear = () => {
    if (!canGoPrevYear) return
    setViewYear((y) => y - 1)
  }

  const goNextYear = () => {
    if (!canGoNextYear) return
    setViewYear((y) => y + 1)
  }

  const goPrevYearPage = () => {
    if (!canGoPrevYearPage) return
    setYearPageStart((start) => clampYearPageStart(start - YEARS_PER_PAGE, minYear, maxYear))
  }

  const goNextYearPage = () => {
    if (!canGoNextYearPage) return
    setYearPageStart((start) => clampYearPageStart(start + YEARS_PER_PAGE, minYear, maxYear))
  }

  const handleSelectDay = (date: Date) => {
    const day = startOfDay(date)
    if (isBeforeDay(day, minStart) || isAfterDay(day, maxStart)) return
    onChange(formatIsoDate(day))
  }

  const openMonthPicker = () => {
    setPendingMonth(null)
    setPanelView("months")
  }

  const handleSelectMonth = (month: number) => {
    setPendingMonth(month)
    setYearPageStart(
      clampYearPageStart(
        Math.floor(viewYear / YEARS_PER_PAGE) * YEARS_PER_PAGE,
        minYear,
        maxYear
      )
    )
    setPanelView("years")
  }

  const handleSelectYear = (year: number) => {
    const month = pendingMonth ?? viewMonth
    setViewYear(year)
    setViewMonth(month)
    setPendingMonth(null)
    setPanelView("days")
  }

  const headerLabel =
    panelView === "days"
      ? `${MONTH_NAMES[viewMonth]} ${viewYear}`
      : panelView === "months"
        ? `${viewYear}`
        : pendingMonth !== null
          ? `${MONTH_NAMES[pendingMonth]}`
          : "Select year"

  const subLabel =
    panelView === "months"
      ? "Select month"
      : panelView === "years"
        ? "Select year"
        : null

  const onPrev =
    panelView === "days"
      ? goPrevMonth
      : panelView === "months"
        ? goPrevYear
        : goPrevYearPage

  const onNext =
    panelView === "days"
      ? goNextMonth
      : panelView === "months"
        ? goNextYear
        : goNextYearPage

  const canPrev =
    panelView === "days"
      ? canGoPrevMonth
      : panelView === "months"
        ? canGoPrevYear
        : canGoPrevYearPage

  const canNext =
    panelView === "days"
      ? canGoNextMonth
      : panelView === "months"
        ? canGoNextYear
        : canGoNextYearPage

  const prevLabel =
    panelView === "days"
      ? "Previous month"
      : panelView === "months"
        ? "Previous year"
        : "Previous years"

  const nextLabel =
    panelView === "days"
      ? "Next month"
      : panelView === "months"
        ? "Next year"
        : "Next years"

  return (
    <div
      className="w-full max-w-sm rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-lg"
      role="dialog"
      aria-label="Choose date"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] text-[#051850] transition-colors hover:bg-[#EBF5FF] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={prevLabel}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1 text-center">
          {panelView === "days" ? (
            <button
              type="button"
              onClick={openMonthPicker}
              className="w-full rounded-md px-2 py-1 text-base font-semibold text-[#051850] transition-colors hover:bg-[#EBF5FF]"
              aria-label="Choose month and year"
            >
              {headerLabel}
            </button>
          ) : (
            <div>
              <p className="text-base font-semibold text-[#051850]">{headerLabel}</p>
              {subLabel ? (
                <p className="text-xs font-medium text-gray-500">{subLabel}</p>
              ) : null}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] text-[#051850] transition-colors hover:bg-[#EBF5FF] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={nextLabel}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {panelView === "days" && (
        <>
          <div className="mb-1 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-1 text-center text-xs font-semibold uppercase tracking-wide text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date, key }) => {
              if (!date) {
                return <div key={key} className="aspect-square" aria-hidden />
              }

              const disabled =
                isBeforeDay(date, minStart) || isAfterDay(date, maxStart)
              const isSelected = selected ? isSameDay(date, selected) : false
              const isToday = isSameDay(date, new Date())

              return (
                <button
                  key={key}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDay(date)}
                  className={cn(
                    "aspect-square rounded-md text-sm font-medium transition-colors",
                    disabled && "cursor-not-allowed text-gray-300",
                    !disabled && !isSelected && "text-[#051850] hover:bg-[#EBF5FF]",
                    isSelected && "text-white",
                    isToday && !isSelected && !disabled && "ring-1 ring-[#7FB2F0]"
                  )}
                  style={
                    isSelected ? { backgroundColor: FORM_PRIMARY_COLOR } : undefined
                  }
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </>
      )}

      {panelView === "months" && (
        <div className="grid grid-cols-3 gap-2">
          {MONTH_SHORT.map((label, month) => {
            const disabled = isMonthDisabled(viewYear, month, minStart, maxStart)
            const isCurrent = viewMonth === month

            return (
              <button
                key={label}
                type="button"
                disabled={disabled}
                onClick={() => handleSelectMonth(month)}
                className={cn(
                  "rounded-md px-2 py-3 text-sm font-semibold transition-colors",
                  disabled && "cursor-not-allowed text-gray-300",
                  !disabled && !isCurrent && "text-[#051850] hover:bg-[#EBF5FF]",
                  isCurrent && !disabled && "text-white"
                )}
                style={
                  isCurrent && !disabled
                    ? { backgroundColor: FORM_PRIMARY_COLOR }
                    : undefined
                }
              >
                {label}
              </button>
            )
          })}
        </div>
      )}

      {panelView === "years" && (
        <div className="grid grid-cols-3 gap-2">
          {yearPageYears.map((year) => {
            const disabled = year < minYear || year > maxYear
            const isCurrent = viewYear === year

            return (
              <button
                key={year}
                type="button"
                disabled={disabled}
                onClick={() => handleSelectYear(year)}
                className={cn(
                  "rounded-md px-2 py-3 text-sm font-semibold transition-colors",
                  disabled && "cursor-not-allowed text-gray-300",
                  !disabled && !isCurrent && "text-[#051850] hover:bg-[#EBF5FF]",
                  !disabled && isCurrent && "text-white"
                )}
                style={
                  !disabled && isCurrent
                    ? { backgroundColor: FORM_PRIMARY_COLOR }
                    : undefined
                }
              >
                {year}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function getDriverDobBounds(maxIso: string): { minDate: Date; maxDate: Date } {
  const maxDate = parseIsoDate(maxIso) ?? new Date()
  const minDate = new Date(maxDate)
  minDate.setFullYear(minDate.getFullYear() - 100)
  return { minDate, maxDate }
}
