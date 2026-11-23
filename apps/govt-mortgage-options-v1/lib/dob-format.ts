export function parseIsoDate(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

/** User-facing / LeadProsper format: MM/DD/YYYY */
export function isoToDisplay(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return ""
  return `${match[2]}/${match[3]}/${match[1]}`
}

export function displayToIso(display: string): string {
  const digits = display.replace(/\D/g, "")
  if (digits.length !== 8) return ""
  const mm = digits.slice(0, 2)
  const dd = digits.slice(2, 4)
  const yyyy = digits.slice(4, 8)
  return buildIsoFromParts(mm, dd, yyyy)
}

export function partsToIso(mm: string, dd: string, yyyy: string): string {
  if (mm.length === 2 && dd.length === 2 && yyyy.length === 4) {
    return `${yyyy}-${mm}-${dd}`
  }
  return ""
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

export function isoToParts(iso: string): { mm: string; dd: string; yyyy: string } {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match?.[1] || !match[2] || !match[3]) return { mm: "", dd: "", yyyy: "" }
  return { mm: match[2], dd: match[3], yyyy: match[1] }
}

export function daysInMonth(month: number, year: number): number {
  if (month < 1 || month > 12 || year < 1) return 31
  return new Date(year, month, 0).getDate()
}

export function maxDayForMonth(mm: string, yyyy: string): number {
  const month = Number.parseInt(mm, 10)
  if (!Number.isFinite(month) || month < 1 || month > 12) return 31
  const year = Number.parseInt(yyyy, 10)
  if (Number.isFinite(year) && year > 0) return daysInMonth(month, year)
  if (month === 2) return 29
  if (month === 4 || month === 6 || month === 9 || month === 11) return 30
  return 31
}

export function monthToPadded(mm: string): string {
  const n = Number.parseInt(mm, 10)
  if (!Number.isFinite(n) || n < 1 || n > 12) return ""
  return String(n).padStart(2, "0")
}

export function dayToPadded(dd: string): string {
  const n = Number.parseInt(dd, 10)
  if (!Number.isFinite(n) || n < 1 || n > 31) return ""
  return String(n).padStart(2, "0")
}

export function buildIsoFromParts(mm: string, dd: string, yyyy: string): string {
  const iso = partsToIso(mm, dd, yyyy)
  if (!iso) return ""
  return parseIsoDate(iso) ? iso : ""
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isDateInDobRange(date: Date, minDate: Date, maxDate: Date): boolean {
  const d = startOfDay(date)
  return d.getTime() >= startOfDay(minDate).getTime() && d.getTime() <= startOfDay(maxDate).getTime()
}

/** Max = today minus 18 years. Min = today minus 100 years. */
export function getDobBounds(): { minDate: Date; maxDate: Date } {
  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setFullYear(maxDate.getFullYear() - 18)
  const minDate = new Date(today)
  minDate.setFullYear(minDate.getFullYear() - 100)
  return { minDate, maxDate }
}

export function listDaysForMonth(mm: string, yyyy: string, minDate: Date, maxDate: Date): number[] {
  const maxDay = maxDayForMonth(mm, yyyy)
  const days: number[] = []
  for (let d = 1; d <= maxDay; d++) days.push(d)
  if (!mm || mm.length !== 2) return days

  const month = Number.parseInt(mm, 10)
  if (!Number.isFinite(month)) return days

  return days.filter((day) => {
    const year = Number.parseInt(yyyy, 10)
    if (!Number.isFinite(year) || yyyy.length !== 4) return true
    return isDateInDobRange(new Date(year, month - 1, day), minDate, maxDate)
  })
}

export function listMonthsInRange(
  yyyy: string,
  minDate: Date,
  maxDate: Date
): Array<{ value: string; label: string }> {
  return MONTH_NAMES.map((label, index) => {
    const value = String(index + 1).padStart(2, "0")
    return { value, label }
  }).filter(({ value }) => {
    if (yyyy.length !== 4) return true
    const year = Number.parseInt(yyyy, 10)
    if (!Number.isFinite(year)) return true
    const month = Number.parseInt(value, 10)
    const dim = daysInMonth(month, year)
    for (let day = 1; day <= dim; day++) {
      if (isDateInDobRange(new Date(year, month - 1, day), minDate, maxDate)) return true
    }
    return false
  })
}

export function listYearsForParts(
  mm: string,
  dd: string,
  minDate: Date,
  maxDate: Date
): number[] {
  const minYear = minDate.getFullYear()
  const maxYear = maxDate.getFullYear()
  const years: number[] = []
  for (let y = maxYear; y >= minYear; y--) years.push(y)

  if (mm.length !== 2 || dd.length !== 2) return years

  const month = Number.parseInt(mm, 10)
  const day = Number.parseInt(dd, 10)
  if (!Number.isFinite(month) || !Number.isFinite(day)) return years

  return years.filter((year) =>
    isDateInDobRange(new Date(year, month - 1, day), minDate, maxDate)
  )
}
