"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { isoToParts, partsToIso } from "@/lib/dob-format"
import {
  DatePickerCalendar,
  getDriverDobBounds,
} from "./DatePickerCalendar"

const SEGMENT_CLASS =
  "w-10 border-0 bg-transparent p-0 text-center text-base font-medium text-[#051850] placeholder:text-gray-400 outline-none focus:ring-0 md:w-12"

const YEAR_CLASS =
  "w-14 border-0 bg-transparent p-0 text-center text-base font-medium text-[#051850] placeholder:text-gray-400 outline-none focus:ring-0 md:w-16"

interface BirthdateInputProps {
  value: string
  onChange: (iso: string) => void
  maxIso: string
  ariaLabel: string
  hasError?: boolean
}

function digitsOnly(raw: string, maxLen: number): string {
  return raw.replace(/\D/g, "").slice(0, maxLen)
}

function clampMonth(mm: string): string {
  if (mm.length < 2) return mm
  const n = Number(mm)
  if (n < 1) return "01"
  if (n > 12) return "12"
  return mm.padStart(2, "0")
}

function clampDay(dd: string, mm: string, yyyy: string): string {
  if (dd.length < 2) return dd
  let maxDay = 31
  if (mm.length === 2 && yyyy.length === 4) {
    maxDay = new Date(Number(yyyy), Number(mm), 0).getDate()
  } else if (mm.length === 2) {
    maxDay = new Date(2000, Number(mm), 0).getDate()
  }
  const n = Number(dd)
  if (n < 1) return "01"
  if (n > maxDay) return String(maxDay).padStart(2, "0")
  return dd.padStart(2, "0")
}

export function BirthdateInput({
  value,
  onChange,
  maxIso,
  ariaLabel,
  hasError,
}: BirthdateInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const mmRef = useRef<HTMLInputElement>(null)
  const ddRef = useRef<HTMLInputElement>(null)
  const yyyyRef = useRef<HTMLInputElement>(null)

  const [mm, setMm] = useState("")
  const [dd, setDd] = useState("")
  const [yyyy, setYyyy] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)

  const { minDate, maxDate } = getDriverDobBounds(maxIso)

  useEffect(() => {
    const parts = isoToParts(value)
    setMm(parts.mm)
    setDd(parts.dd)
    setYyyy(parts.yyyy)
  }, [value])

  useEffect(() => {
    if (!calendarOpen) return
    const handlePointerDown = (e: MouseEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) return
      setCalendarOpen(false)
    }
    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [calendarOpen])

  const emitIso = (nextMm: string, nextDd: string, nextYyyy: string) => {
    const iso = partsToIso(nextMm, nextDd, nextYyyy)
    onChange(iso)
  }

  const handleMmChange = (raw: string) => {
    const next = digitsOnly(raw, 2)
    setMm(next)
    if (next.length === 2) ddRef.current?.focus()
    emitIso(next, dd, yyyy)
  }

  const handleDdChange = (raw: string) => {
    const next = digitsOnly(raw, 2)
    setDd(next)
    if (next.length === 2) yyyyRef.current?.focus()
    emitIso(mm, next, yyyy)
  }

  const handleYyyyChange = (raw: string) => {
    const next = digitsOnly(raw, 4)
    setYyyy(next)
    emitIso(mm, dd, next)
  }

  const handleMmBlur = () => {
    if (!mm) return
    const next = clampMonth(mm)
    setMm(next)
    emitIso(next, dd, yyyy)
  }

  const handleDdBlur = () => {
    if (!dd) return
    const next = clampDay(dd, mm, yyyy)
    setDd(next)
    emitIso(mm, next, yyyy)
  }

  const handleCalendarSelect = (iso: string) => {
    onChange(iso)
    setCalendarOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className={cn(
          "relative flex w-full items-center justify-center rounded-lg border border-[#E5E7EB] bg-white px-4 py-4.5 pr-14 transition-[border-color,box-shadow] duration-200 md:px-5",
          "hover:border-[#7FB2F0] focus-within:border-[#7FB2F0] focus-within:ring-2 focus-within:ring-[#EBF5FF]",
          hasError && "border-red-500 focus-within:border-red-500 focus-within:ring-red-100"
        )}
      >
        <div
          className="flex items-center justify-center gap-1.5 md:gap-2"
          role="group"
          aria-label={ariaLabel}
        >
          <input
            ref={mmRef}
            type="text"
            inputMode="numeric"
            autoComplete="bday-month"
            placeholder="MM"
            maxLength={2}
            value={mm}
            onChange={(e) => handleMmChange(e.target.value)}
            onBlur={handleMmBlur}
            className={SEGMENT_CLASS}
            aria-label="Month"
          />
          <span className="select-none text-base font-medium text-gray-400" aria-hidden>
            /
          </span>
          <input
            ref={ddRef}
            type="text"
            inputMode="numeric"
            autoComplete="bday-day"
            placeholder="DD"
            maxLength={2}
            value={dd}
            onChange={(e) => handleDdChange(e.target.value)}
            onBlur={handleDdBlur}
            className={SEGMENT_CLASS}
            aria-label="Day"
          />
          <span className="select-none text-base font-medium text-gray-400" aria-hidden>
            /
          </span>
          <input
            ref={yyyyRef}
            type="text"
            inputMode="numeric"
            autoComplete="bday-year"
            placeholder="YYYY"
            maxLength={4}
            value={yyyy}
            onChange={(e) => handleYyyyChange(e.target.value)}
            className={YEAR_CLASS}
            aria-label="Year"
          />
        </div>

        <button
          type="button"
          onClick={() => setCalendarOpen((open) => !open)}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-[#051850] transition-colors hover:bg-[#EBF5FF]"
          aria-label="Open calendar"
          aria-expanded={calendarOpen}
        >
          <Calendar className="h-5 w-5" />
        </button>
      </div>

      {calendarOpen ? (
        <div className="absolute left-1/2 z-50 mt-2 w-full max-w-sm -translate-x-1/2">
          <DatePickerCalendar
            key={value || "empty"}
            value={value}
            onChange={handleCalendarSelect}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      ) : null}
    </div>
  )
}
