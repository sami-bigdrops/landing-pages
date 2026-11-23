"use client"

import * as React from "react"

import { UtmBlockGuard } from "@workspace/lp-core/controller"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UtmBlockGuard />
      {children}
    </>
  )
}
