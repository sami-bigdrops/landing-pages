"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Calendar } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { formatIsoDate, isoToDisplay, parseIsoDate, partsToIso } from "@/lib/dob-format"
import { DatePickerCalendar, getDobBounds } from "./DatePickerCalendar"

interface BirthdateInputProps {
  value: string
  onChange: (iso: string) => void
  className?: string
  ariaLabel?: string
  dataArohaaField?: string
}

function formatDateInput(digits: string): string {
  const d = digits.slice(0, 8)
  let result = d.slice(0, 2)
  if (d.length > 2) result += "/" + d.slice(2, 4)
  if (d.length > 4) result += "/" + d.slice(4, 8)
  return result
}

function displayToIso(display: string): string {
  const digits = display.replace(/\D/g, "")
  if (digits.length !== 8) return ""
  const iso = partsToIso(digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8))
  return parseIsoDate(iso) ? iso : ""
}

export function BirthdateInput({
  value,
  onChange,
  className,
  ariaLabel = "Date of birth",
  dataArohaaField,
}: BirthdateInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextCursorRef = useRef<number | null>(null)
  const [display, setDisplay] = useState(() => isoToDisplay(value))
  const [calendarOpen, setCalendarOpen] = useState(false)
  const maxIso = formatIsoDate(new Date())
  const { minDate, maxDate } = getDobBounds(maxIso)

  useEffect(() => {
    if (!value) return
    setDisplay(isoToDisplay(value))
  }, [value])

  useLayoutEffect(() => {
    if (nextCursorRef.current !== null && inputRef.current) {
      inputRef.current.setSelectionRange(nextCursorRef.current, nextCursorRef.current)
      nextCursorRef.current = null
    }
  })

  useEffect(() => {
    if (!calendarOpen) return
    const handlePointerDown = (e: MouseEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) return
      setCalendarOpen(false)
    }
    document.addEventListener("mousedown", handlePointerDown)
    return () => document.removeEventListener("mousedown", handlePointerDown)
  }, [calendarOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const cursorPos = e.target.selectionStart ?? raw.length
    const digitsBeforeCursor = raw.slice(0, cursorPos).replace(/\D/g, "").length

    const digits = raw.replace(/\D/g, "")
    const formatted = formatDateInput(digits)

    let digitCount = 0
    let newPos = formatted.length
    if (digitsBeforeCursor === 0) {
      newPos = 0
    } else {
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted.charAt(i))) {
          digitCount++
          if (digitCount === digitsBeforeCursor) {
            newPos = i + 1
            break
          }
        }
      }
    }
    if (formatted.charAt(newPos) === "/") newPos++

    nextCursorRef.current = newPos
    setDisplay(formatted)
    onChange(displayToIso(formatted))
  }

  const handleCalendarSelect = (iso: string) => {
    setDisplay(isoToDisplay(iso))
    onChange(iso)
    setCalendarOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          name={dataArohaaField}
          data-arohaa-field={dataArohaaField}
          placeholder="DD/MM/YYYY"
          maxLength={10}
          value={display}
          onChange={handleChange}
          aria-label={ariaLabel}
          className={cn(className, "pr-12")}
        />
        <button
          type="button"
          onClick={() => setCalendarOpen((open) => !open)}
          className="absolute inset-y-0 right-0 z-20 flex w-11 items-center justify-center text-[#2F6FED] transition-colors hover:text-[#1E56C7]"
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
