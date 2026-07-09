"use client"

import * as React from "react"

import { UtmBlockGuard } from "@workspace/lp-core/controller"
import { InsurliiTrackingCapture } from "@/components/InsurliiTrackingCapture"

export function Providers({ children }: { children: React.ReactNode }) {
  return <InsurliiTrackingCapture>{children}</InsurliiTrackingCapture>
}
