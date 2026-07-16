"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertTriangle } from "lucide-react"

import { REJECTED_PAGE_CONTENT } from "@/lib/constant"

export function RejectedContent() {
  const searchParams = useSearchParams()
  const codeParam = searchParams.get("code")
  const code = codeParam ? Number.parseInt(codeParam, 10) : NaN
  const hasCode = Number.isFinite(code)
  const mapped = hasCode ? REJECTED_PAGE_CONTENT.codeMessages[code] : undefined
  const detail = mapped ?? REJECTED_PAGE_CONTENT.defaultDetail

  return (
    <main className="flex w-full flex-1 flex-col bg-gradient-to-b from-slate-100/90 via-white to-slate-50">
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
        <div className="mx-auto max-w-lg sm:max-w-xl">
          <div className="rounded-2xl border border-amber-200/90 bg-white p-6 shadow-[0_4px_24px_-4px_rgba(15,36,64,0.08)] sm:p-8 md:p-10">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <AlertTriangle className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
            </div>

            <h1 className="mt-5 text-center text-2xl font-bold tracking-tight text-[#1e3a5f] sm:mt-6 sm:text-[1.65rem] sm:leading-tight">
              {REJECTED_PAGE_CONTENT.title}
            </h1>
            <div className="mt-7 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162d4a]"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
