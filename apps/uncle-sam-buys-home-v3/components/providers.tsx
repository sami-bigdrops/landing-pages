"use client"

import * as React from "react"

import { UtmBlockGuard, BrowserPushProvider } from "@workspace/lp-core/controller"
import { PushPermissionOnLand } from "@/components/PushPermissionOnLand"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UtmBlockGuard />
      <BrowserPushProvider>
        <PushPermissionOnLand />
        {children}
      </BrowserPushProvider>
    </>
  )
}
