type ArohaaEvent = "service_click"

declare global {
  interface Window {
    arohaa?: {
      (event: ArohaaEvent, payload?: Record<string, unknown>): void
      track?: (event: ArohaaEvent, payload?: Record<string, unknown>) => void
    }
  }
}

export const AROHAA_SERVICES = {
  auto: {
    id: "auto-insurance",
    label: "Auto Insurance",
  },
  home: {
    id: "home-insurance",
    label: "Home Insurance",
  },
} as const

export type ArohaaServiceKey = keyof typeof AROHAA_SERVICES

export function trackArohaa(
  event: ArohaaEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.arohaa) return
  window.arohaa(event, payload)
  window.arohaa.track?.(event, payload)
}

export function trackServiceClick({
  serviceKey,
  href,
}: {
  serviceKey: ArohaaServiceKey
  href: string
}) {
  const service = AROHAA_SERVICES[serviceKey]
  trackArohaa("service_click", {
    service_id: service.id,
    service_label: service.label,
    href,
  })
}
