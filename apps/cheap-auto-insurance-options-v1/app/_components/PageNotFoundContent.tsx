"use client"

import Link from "next/link"
import { Home, SearchX } from "lucide-react"
import { NAVBAR_CONTENT } from "@/lib/constant"

export default function PageNotFoundContent() {
  return (
    <main className="relative flex min-h-[70vh] flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#EBF4FF] via-white to-[#FFF8EB] px-6 py-16 md:py-20 xl:py-24">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#0752A0]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-[#F59E0B]/15 blur-3xl"
        aria-hidden
      />

      <section className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#0752A0]/20 bg-white shadow-[0_8px_30px_rgba(16,42,67,0.08)] xl:mb-8 xl:h-24 xl:w-24">
          <SearchX
            className="h-10 w-10 text-[#0752A0] xl:h-12 xl:w-12"
            strokeWidth={1.75}
            aria-hidden
          />
        </div>

        <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B] xl:text-base">
          Error 404
        </p>
        <h1 className="mt-3 font-sans text-3xl font-extrabold text-[#102A43] md:text-4xl xl:mt-4 xl:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-[#374151] md:text-base xl:mt-5 xl:text-lg">
          We couldn&apos;t find the quote experience you were looking for. The
          link may be unavailable, or this offer is no longer active.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center xl:mt-10">
          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[6px] bg-[#F59E0B] px-6 font-sans text-sm font-bold uppercase text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-opacity hover:opacity-95 sm:w-auto xl:h-14 xl:text-base"
          >
            <Home className="h-4 w-4 xl:h-5 xl:w-5" aria-hidden />
            Back to home
          </Link>
          <a
            href={NAVBAR_CONTENT.contactPhoneHref}
            className="inline-flex h-12 w-full items-center justify-center rounded-[6px] border border-[#0752A0] bg-white px-6 font-sans text-sm font-semibold text-[#102A43] transition-colors hover:bg-[#EBF4FF] sm:w-auto xl:h-14 xl:text-base"
          >
            Call {NAVBAR_CONTENT.contactPhoneLabel}
          </a>
        </div>
      </section>
    </main>
  )
}
