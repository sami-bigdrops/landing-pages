"use client"

import { useState } from "react"

import StatsCard from "@/app/_components/Dashboard/StatsCard"
import UtmParamsColumns from "@/app/_components/Dashboard/UtmParamsColumns"
import { DEFAULT_UTM_PRODUCT_ID, UTM_PRODUCT_TABS } from "@/lib/utm-products"
import type { UtmProductId } from "@/lib/utm-products"

export default function UtmProductShell() {
  const [productId, setProductId] = useState<UtmProductId>(DEFAULT_UTM_PRODUCT_ID)

  const activeLabel = UTM_PRODUCT_TABS.find((t) => t.id === productId)?.label ?? ""

  return (
    <>
      <section className="container mx-auto mt-6 px-4 xl:px-0">
        <div
          role="tablist"
          aria-label="UTM parameter scope"
          className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4"
        >
          {UTM_PRODUCT_TABS.map((tab) => {
            const selected = productId === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setProductId(tab.id)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-[color:var(--brand-primary)] bg-[color:var(--brand-primary)]/10 text-[color:var(--brand-secondary)] shadow-sm"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </section>
      <StatsCard productId={productId} productLabel={activeLabel} />
      <UtmParamsColumns productId={productId} />
    </>
  )
}
