"use client"

import * as React from "react"

import type { BrandDefinition } from "@/lib/brand-config"

const BrandContext = React.createContext<BrandDefinition | null>(null)

export function BrandProvider({
  brand,
  children,
}: {
  brand: BrandDefinition
  children: React.ReactNode
}) {
  return (
    <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
  )
}

export function useBrand(): BrandDefinition {
  const ctx = React.useContext(BrandContext)
  if (!ctx) {
    throw new Error("useBrand must be used within BrandProvider")
  }
  return ctx
}
