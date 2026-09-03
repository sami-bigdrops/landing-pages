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

export const FORM_STEP_NAMES: Record<number, string> = {
  1: "Name",
  2: "Email Address",
  3: "Zip Code",
  4: "Phone Number",
}

export function trackArohaa(
  event: ArohaaEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.arohaa) {
    window.arohaa(event, payload)
  }
}
