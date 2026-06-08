"use client"

import * as React from "react"
import { InsurliiTrackingCapture } from "@/components/InsurliiTrackingCapture"

export function Providers({ children }: { children: React.ReactNode }) {
  return <InsurliiTrackingCapture>{children}</InsurliiTrackingCapture>
}
