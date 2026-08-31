export function formatCurrency(digits: string): string {
  const clean = digits.replace(/\D/g, "")
  if (!clean) return ""
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function formatIsoDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function parseIsoDate(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null
  const [y, m, d] = iso.split("-").map(Number)
  const date = new Date(y!, m! - 1, d!)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m! - 1 ||
    date.getDate() !== d
  ) {
    return null
  }
  return date
}

export function formatDisplayDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(6)}`
}

export function formatSSN(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 9)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return digits
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
}

export function formatRoutingNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 9)
  if (digits.length === 0) return ""
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function currencyToNumber(value: string): number {
  const clean = value.replace(/[^0-9.]/g, "")
  return parseFloat(clean) || 0
}
