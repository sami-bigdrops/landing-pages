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

export function trackArohaa(
  event: ArohaaEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.arohaa) {
    window.arohaa(event, payload)
  }
}
