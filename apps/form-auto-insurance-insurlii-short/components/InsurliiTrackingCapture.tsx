"use client"

import { useInsurliiTracking } from "@/hooks/use-insurlii-tracking"

export function InsurliiTrackingCapture({
  children,
}: {
  children: React.ReactNode
}) {
  useInsurliiTracking()
  return <>{children}</>
}
