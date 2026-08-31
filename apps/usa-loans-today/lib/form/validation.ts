import { currencyToNumber } from "./formatters"
import { STATE_LICENSE_FORMATS } from "./constants"

export function getStep5Error(monthlyIncome: string): string | null {
  const amount = currencyToNumber(monthlyIncome)
  if (!monthlyIncome || monthlyIncome.length <= 2) return "Monthly income is required"
  if (amount < 100 || amount > 25000) return "Monthly income must be between $100 and $25,000"
  return null
}

export function getStep6Error(debtAmount: string): string | null {
  if (!debtAmount || debtAmount.length <= 2) return "Debt amount is required"
  const amount = currencyToNumber(debtAmount)
  if (amount < 0) return "Please enter a valid debt amount"
  return null
}

export function getStep7Error(nextPayDate: string): string | null {
  if (!nextPayDate) return "Next pay date is required"
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nextPayDate)) return "Please select a valid date"
  return null
}

export function getStep8Error(secondPayDate: string): string | null {
  if (!secondPayDate) return "Second pay date is required"
  if (!/^\d{4}-\d{2}-\d{2}$/.test(secondPayDate)) return "Please select a valid date"
  return null
}

export function getStep12Error(bankRoutingNumber: string): string | null {
  const digits = bankRoutingNumber.replace(/\D/g, "")
  if (digits.length !== 9) return "Bank routing number must be 9 digits"
  return null
}

export function getStep13Error(bankName: string): string | null {
  const trimmed = bankName.trim()
  if (!trimmed || trimmed.length > 255) return "Bank name must be between 1 and 255 characters"
  return null
}

export function getStep14Error(bankAccountNumber: string): string | null {
  const trimmed = bankAccountNumber.trim()
  if (!trimmed || trimmed.length < 3 || trimmed.length > 30) {
    return "Bank account number must be between 3 and 30 characters"
  }
  return null
}

export function getStep16Error(streetAddress: string, state: string): string | null {
  if (!streetAddress.trim() || streetAddress.trim().length < 2) {
    return "Please enter a valid street address"
  }
  if (!state.trim()) return "Please select a state"
  if (state.trim().toUpperCase() === "NY") return "We do not provide service in New York"
  return null
}

export function getStep19Error(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) return "Email is required"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid email address"
  return null
}

export function getStep21Error(driverLicenseState: string): string | null {
  if (!driverLicenseState) return "Please select a state"
  return null
}

export function getStep22Error(
  driverLicenseState: string,
  driverLicenseNumber: string,
  formats: Record<string, number> = STATE_LICENSE_FORMATS
): string | null {
  if (!driverLicenseState) return "Please select a driver's license state first"
  const clean = driverLicenseNumber.replace(/[^A-Za-z0-9]/g, "")
  const maxLength = formats[driverLicenseState] || 9
  if (clean.length !== maxLength) {
    return `License number must be ${maxLength} characters`
  }
  return null
}

export function getStep25Error(employer: string): string | null {
  const trimmed = employer.trim()
  if (!trimmed || trimmed.length > 255) return "Employer name must be between 1 and 255 characters"
  return null
}

export function getStep33Error(firstName: string, lastName: string): string | null {
  if (!firstName.trim()) return "First name is required"
  if (!lastName.trim()) return "Last name is required"
  return null
}

export function getStep34Error(birthdate: string): string | null {
  if (!birthdate) return "Date of birth is required"
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) return "Please select a valid birthdate"
  const birthDate = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age -= 1
  if (age < 18 || age > 100) return "Age must be between 18 and 100 years"
  return null
}
