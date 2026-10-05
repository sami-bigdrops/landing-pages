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
  2: "Borrow Amount",
  3: "Spend Purpose",
  4: "Credit Score",
  5: "Employment Status",
  6: "Pay Frequency",
  7: "Monthly Income",
  8: "Checking Account",
  9: "Direct Deposit",
  10: "ZIP Code",
  11: "Street Address",
  12: "Home Ownership",
  13: "Email Address",
  14: "Vehicle Status",
  15: "Military Affiliation",
  16: "Unsecured Debt",
  17: "Full Name",
  18: "Date of Birth",
  19: "Phone Number",
  20: "Social Security Number",
}

/** Form page steps are 1–19; Arohaa step = form step + this offset (Hero is step 1). */
export const FORM_AROHAA_STEP_OFFSET = 1

export function trackArohaa(
  event: ArohaaEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.arohaa) {
    window.arohaa(event, payload)
  }
}
