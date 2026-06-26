"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import {
  filterAllowedUtmParams,
  getUtmParamLabel,
  getUtmProductTabsForBrand,
} from "@/lib/utm-products"

type UTMParam = {
  key: string
  value: string
}
type ParamStatus = "active" | "blocked"
type ModalFilter = "all" | ParamStatus
type CardFilter = "all" | "source" | "s1"

type EditableParam = {
  key: string
  value: string
  status: ParamStatus
}

const PARAM_GROUPS = [
  { key: "utm_source", label: "Source", description: "utm_source" },
  { key: "utm_s1", label: "S1", description: "utm_s1" },
] as const

function sortParamsByKeyThenValue<T extends { key: string; value: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const byKey = a.key.localeCompare(b.key)
    if (byKey !== 0) return byKey
    return a.value.localeCompare(b.value, undefined, { sensitivity: "base" })
  })
}

function buildEditableParams(active: UTMParam[], blocked: UTMParam[]): EditableParam[] {
  return sortParamsByKeyThenValue([
    ...active.map((item) => ({ ...item, status: "active" as const })),
    ...blocked.map((item) => ({ ...item, status: "blocked" as const })),
  ])
}

function splitByStatus(items: EditableParam[]) {
  return {
    active: items
      .filter((item) => item.status === "active")
      .map((item) => ({ key: item.key, value: item.value })),
    blocked: items
      .filter((item) => item.status === "blocked")
      .map((item) => ({ key: item.key, value: item.value })),
  }
}

function ParamsPanel({
  title,
  items,
  tone,
  headerActions,
  emptyMessage,
}: {
  title: string
  items: UTMParam[]
  tone: "danger" | "success"
  headerActions?: React.ReactNode
  emptyMessage: string
}) {
  const toneStyles =
    tone === "danger"
      ? {
          border: "border-rose-200/70",
          header: "bg-gradient-to-r from-rose-50/90 to-transparent",
          badge: "bg-rose-100 text-rose-700 ring-1 ring-rose-200/80",
          title: "text-rose-700",
          subtitle: "text-rose-700/70",
          rowBorder: "border-rose-100",
          rowBg: "bg-white hover:bg-rose-50/40",
          typeBadge: "bg-rose-100/90 text-rose-800 ring-1 ring-rose-200/60",
          valueText: "text-rose-900",
        }
      : {
          border: "border-teal-200/70",
          header: "bg-gradient-to-r from-teal-50/80 to-transparent",
          badge: "bg-teal-100 text-teal-700 ring-1 ring-teal-200/80",
          title: "text-teal-700",
          subtitle: "text-teal-700/70",
          rowBorder: "border-teal-100",
          rowBg: "bg-white hover:bg-teal-50/40",
          typeBadge: "bg-teal-100/90 text-teal-800 ring-1 ring-teal-200/60",
          valueText: "text-teal-900",
        }

  const sorted = sortParamsByKeyThenValue(items)
  const byKey = new Map<string, UTMParam[]>()
  for (const row of sorted) {
    const list = byKey.get(row.key) ?? []
    list.push(row)
    byKey.set(row.key, list)
  }

  return (
    <section
      className={`flex flex-col rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${toneStyles.border}`}
    >
      <div className={`rounded-t-2xl px-4 py-3 sm:px-5 sm:py-3.5 ${toneStyles.header}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className={`text-base font-semibold sm:text-lg ${toneStyles.title}`}>{title}</h3>
            <p className={`text-xs ${toneStyles.subtitle}`}>
              {tone === "success" ? "Allowed traffic parameters" : "Filtered out by rules"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {headerActions}
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ${toneStyles.badge}`}
            >
              {items.length} {items.length === 1 ? "param" : "params"}
            </span>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="border-t border-zinc-100 px-4 py-10 text-center sm:px-5">
          <p className="text-sm text-zinc-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="border-t border-zinc-100">
          <div className="hidden grid-cols-[minmax(0,7rem)_1fr] gap-0 border-b border-zinc-200 bg-zinc-50/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:grid sm:px-5">
            <span>Type</span>
            <span>Value</span>
          </div>
          <div className="divide-y divide-zinc-100">
            {PARAM_GROUPS.map((group) => {
              const rows = byKey.get(group.key) ?? []
              if (rows.length === 0) return null
              return (
                <div key={group.key} className="border-b border-zinc-100 last:border-b-0">
                  <div className="bg-zinc-50/50 px-4 py-2 text-xs font-semibold text-zinc-600 sm:px-5">
                    {group.label}{" "}
                    <span className="font-normal text-zinc-400">({group.description})</span>
                    <span className="ml-2 tabular-nums text-zinc-500">{rows.length}</span>
                  </div>
                  <ul className="divide-y divide-zinc-100">
                    {rows.map((item) => (
                      <li
                        key={`${item.key}:${item.value}`}
                        className={`grid grid-cols-1 gap-1 px-4 py-2.5 sm:grid-cols-[minmax(0,7rem)_1fr] sm:items-center sm:gap-4 sm:px-5 ${toneStyles.rowBg}`}
                      >
                        <div className="flex sm:hidden">
                          <span
                            className={`inline-flex w-fit max-w-full rounded-md px-2 py-0.5 text-xs font-semibold ${toneStyles.typeBadge}`}
                          >
                            {group.label}
                          </span>
                        </div>
                        <span
                          className={`hidden text-xs font-semibold sm:inline ${toneStyles.typeBadge} rounded-md px-2 py-1 text-center`}
                        >
                          {group.label}
                        </span>
                        <span
                          className={`min-w-0 break-all text-sm font-medium ${toneStyles.valueText}`}
                          title={item.value}
                        >
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

type Props = {
  brandId: string
  productId: string
}

export default function UtmParamsColumns({ brandId, productId }: Props) {
  const [activeItems, setActiveItems] = useState<UTMParam[]>([])
  const [blockedItems, setBlockedItems] = useState<UTMParam[]>([])
  const [cardFilter, setCardFilter] = useState<CardFilter>("all")

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ModalFilter>("all")
  const [draftItems, setDraftItems] = useState<EditableParam[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [addBlockedType, setAddBlockedType] = useState<"utm_source" | "utm_s1">("utm_source")
  const [addBlockedValue, setAddBlockedValue] = useState("")
  const [isAddingBlocked, setIsAddingBlocked] = useState(false)
  const [addBlockedError, setAddBlockedError] = useState("")
  const [isAddBlockedOpen, setIsAddBlockedOpen] = useState(false)

  const draftCounts = useMemo(
    () => ({
      all: draftItems.length,
      active: draftItems.filter((item) => item.status === "active").length,
      blocked: draftItems.filter((item) => item.status === "blocked").length,
    }),
    [draftItems]
  )

  const filteredDraftItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return draftItems.filter((item) => {
      const statusMatch = statusFilter === "all" || item.status === statusFilter
      const searchMatch =
        !q ||
        item.value.toLowerCase().includes(q) ||
        getUtmParamLabel(item.key).toLowerCase().includes(q)
      return statusMatch && searchMatch
    })
  }, [draftItems, searchQuery, statusFilter])

  const filteredActiveItems = useMemo(() => {
    if (cardFilter === "all") return activeItems
    if (cardFilter === "source") {
      return activeItems.filter((item) => item.key === "utm_source")
    }
    return activeItems.filter((item) => item.key === "utm_s1")
  }, [activeItems, cardFilter])

  const filteredBlockedItems = useMemo(() => {
    if (cardFilter === "all") return blockedItems
    if (cardFilter === "source") {
      return blockedItems.filter((item) => item.key === "utm_source")
    }
    return blockedItems.filter((item) => item.key === "utm_s1")
  }, [blockedItems, cardFilter])

  const productLabel =
    getUtmProductTabsForBrand(brandId).find((t) => t.id === productId)?.label ?? ""

  const loadParams = useCallback(async () => {
    try {
      const qs = new URLSearchParams({ productId })
      const response = await fetch(`/api/utm-params?${qs.toString()}`, { cache: "no-store" })
      if (!response.ok) return
      const data = (await response.json()) as {
        items?: Array<{ key: string; value: string; status: ParamStatus }>
      }
      if (!data.items) return
      const visible = filterAllowedUtmParams(data.items)
      const active = sortParamsByKeyThenValue(
        visible
          .filter((item) => item.status === "active")
          .map((item) => ({ key: item.key, value: item.value }))
      )
      const blocked = sortParamsByKeyThenValue(
        visible
          .filter((item) => item.status === "blocked")
          .map((item) => ({ key: item.key, value: item.value }))
      )
      setActiveItems(active)
      setBlockedItems(blocked)
    } catch (error) {
      console.error("[utm-dashboard] failed to load UTM params", error)
    }
  }, [productId])

  useEffect(() => {
    void loadParams()
  }, [loadParams])

  useEffect(() => {
    setIsEditOpen(false)
    setIsAddBlockedOpen(false)
  }, [productId])

  const openEditModal = () => {
    setDraftItems(buildEditableParams(activeItems, blockedItems))
    setSearchQuery("")
    setStatusFilter("all")
    setIsEditOpen(true)
  }

  const closeEditModal = () => {
    setIsEditOpen(false)
    setSearchQuery("")
    setStatusFilter("all")
  }

  const updateStatus = (key: string, value: string, status: ParamStatus) => {
    setDraftItems((prev) =>
      prev.map((item) =>
        item.key === key && item.value === value ? { ...item, status } : item
      )
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await fetch("/api/utm-params", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, items: draftItems }),
      })
      const next = splitByStatus(draftItems)
      setActiveItems(next.active)
      setBlockedItems(next.blocked)
      closeEditModal()
    } catch (error) {
      console.error("[utm-dashboard] failed to save UTM params", error)
    } finally {
      setIsSaving(false)
    }
  }

  const addBlockedParam = async (): Promise<boolean> => {
    setAddBlockedError("")
    const value = addBlockedValue.trim()
    if (!value) {
      setAddBlockedError("Please enter a value.")
      return false
    }
    setIsAddingBlocked(true)
    try {
      const response = await fetch("/api/utm-params", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          items: [{ key: addBlockedType, value, status: "blocked" as const }],
        }),
      })
      if (!response.ok) {
        setAddBlockedError("Failed to add blocked param.")
        return false
      }
      setAddBlockedValue("")
      await loadParams()
      return true
    } catch {
      setAddBlockedError("Failed to add blocked param.")
      return false
    } finally {
      setIsAddingBlocked(false)
    }
  }

  const openAddBlockedModal = () => {
    setAddBlockedError("")
    setAddBlockedValue("")
    setAddBlockedType("utm_source")
    setIsAddBlockedOpen(true)
  }

  const closeAddBlockedModal = () => {
    if (isAddingBlocked) return
    setIsAddBlockedOpen(false)
    setAddBlockedError("")
  }

  useEffect(() => {
    if (!isEditOpen && !isAddBlockedOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isEditOpen, isAddBlockedOpen])

  return (
    <section className="container mx-auto mt-6 px-4 xl:px-0">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[color:var(--brand-secondary)]">
            UTM Params Status
          </h2>
          <p className="text-sm text-zinc-600">
            <span className="font-medium text-zinc-800">{productLabel}</span>
            {" — "}
            active params on the left, blocked on the right.
          </p>
        </div>
        <Button
          type="1"
          variant="outline"
          size="sm"
          className="min-w-20 border-[color:var(--brand-primary)]/30 px-4 text-sm font-medium text-[color:var(--brand-secondary)] hover:bg-[color:var(--brand-primary)]/10"
          onClick={openEditModal}
        >
          Edit
        </Button>
      </div>
      <div
        className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
        role="group"
        aria-label="Filter UTM list by parameter type"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Filter
        </span>
        <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCardFilter("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            cardFilter === "all"
              ? "border-zinc-300 bg-zinc-100 text-zinc-900"
              : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setCardFilter("source")}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            cardFilter === "source"
              ? "border-zinc-300 bg-zinc-100 text-zinc-900"
              : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
          }`}
        >
          Source
        </button>
        <button
          type="button"
          onClick={() => setCardFilter("s1")}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            cardFilter === "s1"
              ? "border-zinc-300 bg-zinc-100 text-zinc-900"
              : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
          }`}
        >
          S1
        </button>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ParamsPanel
          title="Active UTM Params"
          items={filteredActiveItems}
          tone="success"
          emptyMessage="No active UTM parameters for this filter. Traffic with new source or S1 values will appear here once recorded."
        />
        <ParamsPanel
          title="Blocked UTM Params"
          items={filteredBlockedItems}
          tone="danger"
          emptyMessage="No blocked UTM parameters. Add blocked values manually or mark entries as blocked in Edit."
          headerActions={
            <button
              type="button"
              onClick={openAddBlockedModal}
              className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
            >
              Add Manually
            </button>
          }
        />
      </div>

      {isEditOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
            <div className="border-b border-zinc-200 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-[color:var(--brand-secondary)]">
                  Edit UTM Params
                </h3>
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700">
                  {draftCounts.all} total
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600">
                Search by value or type (Source / S1) and set each item as Active or Blocked.
              </p>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by value or type..."
                className="mt-3 h-10 bg-white"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setStatusFilter("all")}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    statusFilter === "all"
                      ? "border-zinc-300 bg-zinc-100 text-zinc-900"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  All ({draftCounts.all})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("active")}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    statusFilter === "active"
                      ? "border-teal-200 bg-teal-100 text-teal-700"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  Active ({draftCounts.active})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("blocked")}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    statusFilter === "blocked"
                      ? "border-rose-200 bg-rose-100 text-rose-700"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  Blocked ({draftCounts.blocked})
                </button>
              </div>
            </div>

            <div className="h-[55vh] space-y-2 overflow-y-auto px-5 py-4">
              {filteredDraftItems.map((item) => (
                <div
                  key={`${item.key}:${item.value}`}
                  className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{item.value}</p>
                    <p className="text-xs text-zinc-500">{getUtmParamLabel(item.key)}</p>
                  </div>
                  <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => updateStatus(item.key, item.value, "active")}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                        item.status === "active"
                          ? "bg-teal-100 text-teal-700"
                          : "text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStatus(item.key, item.value, "blocked")}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                        item.status === "blocked"
                          ? "bg-rose-100 text-rose-700"
                          : "text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      Blocked
                    </button>
                  </div>
                </div>
              ))}
              {filteredDraftItems.length === 0 ? (
                <p className="py-6 text-center text-sm text-zinc-500">
                  No UTM params found for this search.
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-zinc-200 px-5 py-4">
              <Button
                type="1"
                variant="ghost"
                size="sm"
                className="px-4 text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                onClick={closeEditModal}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="1"
                variant="default"
                size="sm"
                className="px-5 text-sm font-semibold bg-[color:var(--brand-primary)] text-white hover:bg-[color:var(--brand-primary)]/90"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {isAddBlockedOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
            <div className="border-b border-zinc-200 px-5 py-4">
              <h3 className="text-lg font-semibold text-[color:var(--brand-secondary)]">
                Add Blocked UTM Param
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Choose type and enter the value you want to block.
              </p>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div className="flex gap-4 text-sm text-zinc-700">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="add-blocked-key"
                    checked={addBlockedType === "utm_source"}
                    onChange={() => setAddBlockedType("utm_source")}
                  />
                  Source
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="add-blocked-key"
                    checked={addBlockedType === "utm_s1"}
                    onChange={() => setAddBlockedType("utm_s1")}
                  />
                  S1
                </label>
              </div>

              <input
                value={addBlockedValue}
                onChange={(e) => setAddBlockedValue(e.target.value)}
                placeholder="Enter value to block"
                className="h-10 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none focus:border-rose-300"
              />

              {addBlockedError ? <p className="text-sm text-rose-600">{addBlockedError}</p> : null}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-zinc-200 px-5 py-4">
              <Button type="1" variant="ghost" size="sm" onClick={closeAddBlockedModal}>
                Cancel
              </Button>
              <Button
                type="1"
                variant="default"
                size="sm"
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={async () => {
                  const ok = await addBlockedParam()
                  if (ok) {
                    setIsAddBlockedOpen(false)
                  }
                }}
                disabled={isAddingBlocked}
              >
                {isAddingBlocked ? "Adding..." : "Add"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
