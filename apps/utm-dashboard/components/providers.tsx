"use client"

import * as React from "react"

import { BrandProvider } from "@/components/brand-provider"
import type { BrandDefinition } from "@/lib/brand-config"

export function Providers({
  brand,
  children,
}: {
  brand: BrandDefinition
  children: React.ReactNode
}) {
  return <BrandProvider brand={brand}>{children}</BrandProvider>
}
