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
  2: "Name",
  3: "Email Address",
  4: "Address",
  5: "Date of Birth",
  6: "Phone Number",
}

/** Form page steps are 1–5; Arohaa step = form step + this offset (Hero is step 1). */
export const FORM_AROHAA_STEP_OFFSET = 1

export function trackArohaa(
  event: ArohaaEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.arohaa) {
    window.arohaa(event, payload)
  }
}
