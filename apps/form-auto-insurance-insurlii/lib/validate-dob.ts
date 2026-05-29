export const DRIVER_MIN_AGE = 18

export const DRIVER_DOB_ERRORS = {
  invalid: "Please enter a valid date",
  underAge: "Driver must be 18 years old",
} as const

export type DriverDobError = (typeof DRIVER_DOB_ERRORS)[keyof typeof DRIVER_DOB_ERRORS]

function parseDateValue(value: string): Date | null {
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

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function validateDriverDOB(
  value: string,
  today: Date = new Date()
): DriverDobError | null {
  if (!value.trim()) return DRIVER_DOB_ERRORS.invalid

  const birthDate = parseDateValue(value)
  if (!birthDate) return DRIVER_DOB_ERRORS.invalid

  const todayStart = startOfDay(today)
  const birthStart = startOfDay(birthDate)

  if (birthStart > todayStart) return DRIVER_DOB_ERRORS.invalid

  const minBirthDate = new Date(todayStart)
  minBirthDate.setFullYear(minBirthDate.getFullYear() - DRIVER_MIN_AGE)

  if (birthStart > minBirthDate) return DRIVER_DOB_ERRORS.underAge

  return null
}

export function getMaxDriverDOB(today: Date = new Date()): string {
  const maxDate = startOfDay(today)
  maxDate.setFullYear(maxDate.getFullYear() - DRIVER_MIN_AGE)
  return formatDateInputValue(maxDate)
}

function formatDateInputValue(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
