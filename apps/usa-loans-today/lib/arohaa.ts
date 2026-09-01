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

export const AROHAA_SUBMITTED_KEY = "arohaa_usa_loans_today_submitted"

export const FORM_STEP_NAMES: Record<number, string> = {
  1: "Spending Purpose",
  2: "Credit Score",
  3: "Employment Status",
  4: "Payment Frequency",
  5: "Monthly Income",
  6: "Debt Amount",
  7: "Next Pay Date",
  8: "Second Pay Date",
  9: "Checking Account",
  10: "Direct Deposit",
  11: "Bank Account Duration",
  12: "Bank Routing Number",
  13: "Bank Name",
  14: "Bank Account Number",
  15: "Zip Code",
  16: "Street Address",
  17: "Home Ownership",
  18: "Address Duration",
  19: "Email Address",
  20: "Vehicle Status",
  21: "Driver License State",
  22: "Driver License Number",
  23: "Military Member",
  24: "Unsecured Debt Amount",
  25: "Employer",
  26: "Employer Duration",
  27: "Occupation",
  28: "Monthly Housing Payment",
  29: "Bankruptcy Filed",
  30: "Bankruptcy Chapter",
  31: "Bankruptcy Status",
  32: "Bankruptcy Discharged",
  33: "Name",
  34: "Date Of Birth",
  35: "Home Phone Number",
  36: "Work Phone Number",
  37: "Cell Phone Number",
  38: "Social Security Number",
}

export function trackArohaa(
  event: ArohaaEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.arohaa) {
    window.arohaa(event, payload)
  }
}
