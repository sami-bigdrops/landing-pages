"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertTriangle } from "lucide-react"

import { REJECTED_PAGE_CONTENT } from "@/lib/constant"
import {
  getSafeHttpRedirectUrl,
  LEADPROSPER_REDIRECT_DELAY_MS,
  LEADPROSPER_REDIRECT_STORAGE_KEY,
} from "@/lib/leadprosper"

const REDIRECT_SECONDS = Math.round(LEADPROSPER_REDIRECT_DELAY_MS / 1000)

export function RejectedContent() {
  const searchParams = useSearchParams()
  const codeParam = searchParams.get("code")
  const code = codeParam ? Number.parseInt(codeParam, 10) : NaN
  const hasCode = Number.isFinite(code)
  const mapped = hasCode ? REJECTED_PAGE_CONTENT.codeMessages[code] : undefined
  const detail = mapped ?? REJECTED_PAGE_CONTENT.defaultDetail

  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    let stored = ""
    try {
      stored = sessionStorage.getItem(LEADPROSPER_REDIRECT_STORAGE_KEY) ?? ""
    } catch {
      return
    }

    const safeUrl = getSafeHttpRedirectUrl(stored)
    if (!safeUrl) {
      try {
        sessionStorage.removeItem(LEADPROSPER_REDIRECT_STORAGE_KEY)
      } catch {
        /* ignore */
      }
      return
    }

    setRedirectUrl(safeUrl)
  }, [])

  useEffect(() => {
    if (!redirectUrl) return

    setSecondsLeft(REDIRECT_SECONDS)
    const startedAt = Date.now()

    const interval = window.setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000)
      const remaining = Math.max(REDIRECT_SECONDS - elapsedSeconds, 0)
      setSecondsLeft(remaining)

      if (remaining <= 0) {
        window.clearInterval(interval)
        try {
          sessionStorage.removeItem(LEADPROSPER_REDIRECT_STORAGE_KEY)
        } catch {
          /* ignore */
        }
        window.location.assign(redirectUrl)
      }
    }, 250)

    return () => window.clearInterval(interval)
  }, [redirectUrl])

  const secondLabel = secondsLeft === 1 ? "second" : "seconds"

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

            <p className="mt-4 text-center text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
              {detail}
            </p>

            {redirectUrl ? (
              <p
                className="mt-5 text-center text-sm font-medium text-[#1e3a5f] sm:text-base"
                aria-live="polite"
              >
                {REJECTED_PAGE_CONTENT.redirectCountdownLabel}{" "}
                <span className="tabular-nums font-bold">{secondsLeft}</span>{" "}
                {secondLabel}
              </p>
            ) : null}

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
