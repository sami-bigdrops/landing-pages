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
    id: "svc-9qcgmdnu",
    label: "Auto Insurance Quotifii",
    href: "https://autoinsurance.quotifii.com/",
  },
  home: {
    id: "svc-9wougzwg",
    label: "Home Insurance Quotifii",
    href: "https://homequotes.quotifii.com/",
  },
} as const

export type ArohaaServiceKey = keyof typeof AROHAA_SERVICES

/** Serialized for the SDK `data-services` attribute */
export const AROHAA_SERVICES_JSON = JSON.stringify(
  Object.values(AROHAA_SERVICES).map(({ id, label, href }) => ({
    id,
    label,
    href,
  }))
)

export function trackArohaa(
  event: ArohaaEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.arohaa) return
  window.arohaa(event, payload)
}

export function trackServiceClick({
  serviceKey,
  href,
}: {
  serviceKey: ArohaaServiceKey
  href?: string
}) {
  const service = AROHAA_SERVICES[serviceKey]
  trackArohaa("service_click", {
    service_id: service.id,
    service_label: service.label,
    href: href || service.href,
  })
}
