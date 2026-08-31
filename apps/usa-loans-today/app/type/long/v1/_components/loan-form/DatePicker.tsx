"use client"

import { useEffect, useMemo, useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { formatIsoDate, parseIsoDate } from "@/lib/form/formatters"

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

type DatePickerProps = {
  value: string
  onChange: (value: string) => void
  onEnterKeyPress?: () => void
  placeholder?: string
  className?: string
  minDate?: Date
  maxDate?: Date
  open?: boolean
  onOpenChange?: (open: boolean) => void
  hideTrigger?: boolean
}

export default function DatePicker({
  value,
  onChange,
  onEnterKeyPress,
  placeholder = "Select a date...",
  className,
  minDate,
  maxDate,
  open: openProp,
  onOpenChange,
  hideTrigger = false,
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = openProp ?? internalOpen
  const setOpen = (next: boolean) => {
    onOpenChange?.(next)
    if (openProp === undefined) setInternalOpen(next)
  }
  const selected = useMemo(() => parseIsoDate(value), [value])
  const minStart = useMemo(() => startOfDay(minDate ?? new Date(1900, 0, 1)), [minDate])
  const maxStart = useMemo(
    () => startOfDay(maxDate ?? new Date(2100, 11, 31)),
    [maxDate]
  )
  const initial = selected ?? (minDate ? startOfDay(minDate) : startOfDay(new Date()))
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  useEffect(() => {
    if (!selected) return
    setViewYear(selected.getFullYear())
    setViewMonth(selected.getMonth())
  }, [selected])

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1)
    const startWeekday = first.getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const cells: Array<{ date: Date | null; key: string }> = []
    for (let i = 0; i < startWeekday; i++) cells.push({ date: null, key: `pad-${i}` })
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day)
      cells.push({ date, key: formatIsoDate(date) })
    }
    return cells
  }, [viewMonth, viewYear])

  const display = selected
    ? `${String(selected.getMonth() + 1).padStart(2, "0")}/${String(selected.getDate()).padStart(2, "0")}/${selected.getFullYear()}`
    : ""

  const canPrev =
    viewYear > minStart.getFullYear() ||
    (viewYear === minStart.getFullYear() && viewMonth > minStart.getMonth())
  const canNext =
    viewYear < maxStart.getFullYear() ||
    (viewYear === maxStart.getFullYear() && viewMonth < maxStart.getMonth())

  return (
    <div className={cn("relative w-full", className)}>
      {!hideTrigger ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value) onEnterKeyPress?.()
          }}
          className={cn(
            "flex h-14 w-full items-center justify-between rounded-[6px] border border-[#CCCCCF] bg-white px-4 text-left text-[0.85rem] text-[#2C3E50] xl:h-15 xl:text-base",
            value ? "border-[#C62828]" : ""
          )}
        >
          <span className={display ? "" : "text-[#2C3E50]/70"}>{display || placeholder}</span>
          <Calendar className="h-5 w-5 text-[#0F2D52]" />
        </button>
      ) : null}

      {open ? (
        <div className={cn(
          "z-50 w-full rounded-[10px] border border-[#E2E8F0] bg-white p-3 shadow-lg",
          hideTrigger ? "relative mt-0" : "absolute mt-2"
        )}>
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => {
                if (viewMonth === 0) {
                  setViewMonth(11)
                  setViewYear((y) => y - 1)
                } else setViewMonth((m) => m - 1)
              }}
              className="rounded p-1 disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <p className="font-semibold text-[#0F2D52]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </p>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => {
                if (viewMonth === 11) {
                  setViewMonth(0)
                  setViewYear((y) => y + 1)
                } else setViewMonth((m) => m + 1)
              }}
              className="rounded p-1 disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-medium text-[#4B5563]">
            {WEEKDAYS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date, key }) => {
              if (!date) return <div key={key} />
              const disabled =
                startOfDay(date).getTime() < minStart.getTime() ||
                startOfDay(date).getTime() > maxStart.getTime()
              const active = selected ? isSameDay(date, selected) : false
              return (
                <button
                  key={key}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(formatIsoDate(date))
                    setOpen(false)
                  }}
                  className={cn(
                    "h-9 rounded text-sm",
                    active ? "bg-[#C62828] text-white" : "hover:bg-[#F4F8FF]",
                    disabled && "cursor-not-allowed opacity-30"
                  )}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
