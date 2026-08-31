"use client"

import { useEffect, useMemo, useState } from "react"
import { Calendar } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import DatePicker from "./DatePicker"

type BirthdatePickerProps = {
  value: string
  onChange: (value: string) => void
  onEnterKeyPress?: () => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}

function isoToDisplay(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return ""
  return `${match[2]}/${match[3]}/${match[1]}`
}

function displayToIso(display: string): string {
  const digits = display.replace(/\D/g, "")
  if (digits.length !== 8) return ""
  const mm = digits.slice(0, 2)
  const dd = digits.slice(2, 4)
  const yyyy = digits.slice(4, 8)
  return `${yyyy}-${mm}-${dd}`
}

function formatDateInput(digits: string): string {
  const d = digits.slice(0, 8)
  let result = d.slice(0, 2)
  if (d.length > 2) result += "/" + d.slice(2, 4)
  if (d.length > 4) result += "/" + d.slice(4, 8)
  return result
}

export default function BirthdatePicker({
  value,
  onChange,
  onEnterKeyPress,
  placeholder = "MM/DD/YYYY",
  minDate,
  maxDate,
}: BirthdatePickerProps) {
  const [display, setDisplay] = useState(() => isoToDisplay(value))
  const [calendarOpen, setCalendarOpen] = useState(false)
  const resolvedMax = useMemo(() => maxDate ?? new Date(), [maxDate])
  const resolvedMin = useMemo(
    () => minDate ?? new Date(new Date().getFullYear() - 120, 0, 1),
    [minDate]
  )

  useEffect(() => {
    if (!value) return
    setDisplay(isoToDisplay(value))
  }, [value])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={display}
          placeholder={placeholder}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "")
            const formatted = formatDateInput(digits)
            setDisplay(formatted)
            onChange(displayToIso(formatted))
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onEnterKeyPress?.()
          }}
          className={cn(
            "h-14 w-full rounded-[6px] border border-[#CCCCCF] bg-white px-4 pr-12 text-[0.85rem] text-[#2C3E50] outline-none focus:border-[#C62828] focus:ring-[3px] focus:ring-[#C62828]/20 xl:h-15 xl:text-base",
            value ? "border-[#C62828]" : ""
          )}
        />
        <button
          type="button"
          onClick={() => setCalendarOpen((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F2D52]"
          aria-label="Open calendar"
        >
          <Calendar className="h-5 w-5" />
        </button>
      </div>
      {calendarOpen ? (
        <div className="absolute z-50 mt-2 w-full">
          <DatePicker
            value={value}
            onChange={(iso) => {
              onChange(iso)
              setDisplay(isoToDisplay(iso))
              setCalendarOpen(false)
            }}
            minDate={resolvedMin}
            maxDate={resolvedMax}
            open
            hideTrigger
            onOpenChange={setCalendarOpen}
          />
        </div>
      ) : null}
    </div>
  )
}
