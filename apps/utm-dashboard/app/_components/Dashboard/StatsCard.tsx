"use client"

import { useEffect, useMemo, useState } from "react"

import MetricCard from "@/components/dashboard/MetricCard"

type ParamStatus = "active" | "blocked"

type ApiItem = {
  key: string
  value: string
  status: ParamStatus
}

export default function StatsCard() {
  const [items, setItems] = useState<ApiItem[]>([])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch("/api/utm-params", { cache: "no-store" })
        if (!response.ok) return
        const data = (await response.json()) as { items?: ApiItem[] }
        if (!cancelled) {
          setItems(data.items ?? [])
        }
      } catch (error) {
        console.error("[utm-dashboard] failed to load UTM overview", error)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const counts = useMemo(() => {
    const total = items.length
    const active = items.filter((item) => item.status === "active").length
    const blocked = items.filter((item) => item.status === "blocked").length
    const activePct = total === 0 ? 0 : (active / total) * 100
    const blockedPct = total === 0 ? 0 : (blocked / total) * 100
    return {
      total,
      active,
      blocked,
      activePct: `${activePct.toFixed(1)}%`,
      blockedPct: `${blockedPct.toFixed(1)}%`,
    }
  }, [items])

  const stats = [
    {
      title: "Total UTM Params",
      value: counts.total,
      tone: "brand" as const,
      description: "All tracked UTM parameter entries.",
      badge: "100%",
    },
    {
      title: "Active UTM Params",
      value: counts.active,
      tone: "success" as const,
      description: "Currently allowed and processing traffic.",
      badge: counts.activePct,
    },
    {
      title: "Blocked UTM Params",
      value: counts.blocked,
      tone: "danger" as const,
      description: "Disabled due to rules or policy checks.",
      badge: counts.blockedPct,
    },
  ]

  return (
    <section className="container mx-auto px-4 xl:px-0 mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[color:var(--brand-secondary)]">
          UTM Overview
        </h2>
        <p className="text-sm text-zinc-600">
          Quick health summary of your current UTM parameter status.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <MetricCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            tone={stat.tone}
            description={stat.description}
            badge={stat.badge}
          />
        ))}
      </div>
    </section>
  )
}