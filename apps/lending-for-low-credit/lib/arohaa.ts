type ArohaaEvent =
  | "form_start"
  | "form_field_focus"
  | "form_submit"
  | "form_success"
  | "zip_submit"
  | "form_step_view"
  | "call_click"

declare global {
  interface Window {
    arohaa?: (event: ArohaaEvent, payload?: Record<string, unknown>) => void
  }
}

export const AROHAA_SUBMITTED_KEY = "arohaa_nation_one_debt_relief_submitted"
export const DEBT_AMOUNT_STORAGE_KEY = "nation_one_debt_amount"

export const FORM_STEP_NAMES: Record<number, string> = {
  1: "Debt Amount",
  2: "Full Name",
  3: "Date of Birth",
  4: "Street Address",
  5: "City",
  6: "State",
  7: "ZIP Code",
  8: "Phone Number",
  9: "Social Security Number",
  10: "Borrow Amount",
  11: "Spend Purpose",
  12: "Unsecured Debt",
  13: "Home Ownership",
  14: "Currently In Military",
  15: "Primary Income Source",
  16: "Monthly Income",
  17: "Pay Frequency",
  18: "Pay Receive Method",
  19: "Employer Name",
  20: "Credit Score",
  21: "Vehicle Ownership Status",
  22: "Home Improvement Reason",
  23: "Account Type",
  24: "Bank Name",
  25: "Routing Number",
  26: "Account Number",
}

/** Form page steps are 1–25; Arohaa step = form step + this offset (Hero is step 1). */
export const FORM_AROHAA_STEP_OFFSET = 1

export function trackArohaa(
  event: ArohaaEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.arohaa) {
    window.arohaa(event, payload)
  }
}
