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

export function formatIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function isoToParts(iso: string): { mm: string; dd: string; yyyy: string } {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match?.[1] || !match[2] || !match[3]) return { mm: "", dd: "", yyyy: "" }
  return { mm: match[2], dd: match[3], yyyy: match[1] }
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
