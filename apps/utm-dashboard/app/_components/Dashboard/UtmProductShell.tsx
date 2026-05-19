"use client"

import { useEffect, useMemo, useState } from "react"

import StatsCard from "@/app/_components/Dashboard/StatsCard"
import UtmParamsColumns from "@/app/_components/Dashboard/UtmParamsColumns"
import { useBrand } from "@/components/brand-provider"
import { getDefaultUtmProductId, getUtmProductTabsForBrand } from "@/lib/utm-products"

export default function UtmProductShell() {
  const brand = useBrand()
  const tabs = useMemo(() => getUtmProductTabsForBrand(brand.id), [brand.id])
  const [productId, setProductId] = useState(() => getDefaultUtmProductId(brand.id))

  useEffect(() => {
    setProductId(getDefaultUtmProductId(brand.id))
  }, [brand.id])

  const activeLabel = tabs.find((t) => t.id === productId)?.label ?? ""
  const showTabs = tabs.length > 1

  return (
    <>
      {showTabs ? (
        <section className="container mx-auto mt-6 px-4 xl:px-0">
          <div
            role="tablist"
            aria-label="UTM parameter scope"
            className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4"
          >
            {tabs.map((tab) => {
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
      ) : null}
      <StatsCard productId={productId} productLabel={activeLabel} />
      <UtmParamsColumns brandId={brand.id} productId={productId} />
    </>
  )
}
