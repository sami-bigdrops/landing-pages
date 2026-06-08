export const EMAIL_ERROR_MESSAGE = "Please enter a valid email address"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return EMAIL_ERROR_MESSAGE
  if (!EMAIL_PATTERN.test(trimmed)) return EMAIL_ERROR_MESSAGE
  return null
}
