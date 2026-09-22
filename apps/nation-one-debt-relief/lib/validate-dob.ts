import { parseIsoDate } from "@/lib/dob-format"

export function getAge(birthDate: Date, today = new Date()): number {
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1
  }
  return age
}

export function isValidDob(iso: string): boolean {
  const birthDate = parseIsoDate(iso)
  if (!birthDate) return false
  const age = getAge(birthDate)
  return age >= 18 && age <= 100
}

export function getDobError(iso: string): string | null {
  if (!iso) return "Date of birth is required"
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "Please enter a valid date of birth"
  const birthDate = parseIsoDate(iso)
  if (!birthDate) return "Please enter a valid date of birth"
  const age = getAge(birthDate)
  if (age < 18 || age > 100) return "Age must be between 18 and 100 years"
  return null
}
