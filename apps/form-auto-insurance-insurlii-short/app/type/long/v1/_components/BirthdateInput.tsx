"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Calendar } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { partsToIso } from "@/lib/dob-format"
import { DatePickerCalendar, getDriverDobBounds } from "./DatePickerCalendar"

interface BirthdateInputProps {
  value: string
  onChange: (iso: string) => void
  maxIso: string
  ariaLabel: string
  hasError?: boolean
}

function formatDateInput(digits: string): string {
  const d = digits.slice(0, 8)
  let result = d.slice(0, 2)
  if (d.length > 2) result += "/" + d.slice(2, 4)
  if (d.length > 4) result += "/" + d.slice(4, 8)
  return result
}

function isoToDisplay(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return ""
  return `${match[2]}/${match[3]}/${match[1]}`
}

function displayToIso(display: string): string {
  const digits = display.replace(/\D/g, "")
  if (digits.length !== 8) return ""
  return partsToIso(digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8))
}

export function BirthdateInput({
  value,
  onChange,
  maxIso,
  ariaLabel,
  hasError,
}: BirthdateInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextCursorRef = useRef<number | null>(null)
  const [display, setDisplay] = useState(() => isoToDisplay(value))
  const [calendarOpen, setCalendarOpen] = useState(false)
  const { minDate, maxDate } = getDriverDobBounds(maxIso)

  // Sync display when an external complete date arrives (e.g. form hydration)
  useEffect(() => {
    if (!value) return
    setDisplay(isoToDisplay(value))
  }, [value])

  // Restore cursor position after React re-renders the controlled input
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

    // Find cursor position in formatted string by counting digits
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
    // Auto-advance cursor past slash so user doesn't have to type it
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
    <div ref={wrapperRef} className="relative">
      <div
        className={cn(
          "relative flex w-full items-center rounded-lg border border-[#E5E7EB] bg-white px-4 py-4.5 pr-14 transition-[border-color,box-shadow] duration-200 md:px-5",
          "hover:border-[#7FB2F0] focus-within:border-[#7FB2F0] focus-within:ring-2 focus-within:ring-[#EBF5FF]",
          hasError && "border-red-500 focus-within:border-red-500 focus-within:ring-red-100"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          placeholder="MM/DD/YYYY"
          maxLength={10}
          value={display}
          onChange={handleChange}
          className="w-full border-0 bg-transparent p-0 text-center text-base font-medium text-[#051850] placeholder:text-gray-400 outline-none focus:ring-0"
          aria-label={ariaLabel}
        />
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
