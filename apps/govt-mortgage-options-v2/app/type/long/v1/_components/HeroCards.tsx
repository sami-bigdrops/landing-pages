"use client"

import { useEffect, useState } from "react"
import { TrendingDown } from "lucide-react"

interface RateColumnProps {
  label: string
  rate: string
  apr: string
}

interface OptionCardData {
  title: string
  leftColumn: RateColumnProps
  rightColumn: RateColumnProps
}

interface MortgageRatesPayload {
  source?: string
  option1: OptionCardData
  option2: OptionCardData
  option3: OptionCardData
}

const defaultRates: MortgageRatesPayload = {
  source: "money.com",
  option1: {
    title: "Option 1",
    leftColumn: { label: "30-Yr Fixed", rate: "6.58%", apr: "6.73%" },
    rightColumn: { label: "15-Yr Fixed", rate: "5.93%", apr: "6.03%" },
  },
  option2: {
    title: "Option 2",
    leftColumn: { label: "30-Yr FHA", rate: "6.20%", apr: "6.60%" },
    rightColumn: { label: "30-Yr VA", rate: "6.33%", apr: "6.58%" },
  },
  option3: {
    title: "Option 3",
    leftColumn: { label: "30-Yr Jumbo", rate: "6.70%", apr: "6.85%" },
    rightColumn: { label: "15-Yr Jumbo", rate: "6.10%", apr: "6.25%" },
  },
}

function LockBadge() {
  return (
    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.28)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-[#F59E0B]"
        aria-hidden
      >
        <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 5a3 3 0 1 1 6 0v3H9V7Zm3 8.25a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z" />
      </svg>
    </span>
  )
}

function BlurredValue({ value, className }: { value: string; className?: string }) {
  return (
    <p className={`select-none blur-[4px] ${className ?? ""}`} aria-hidden>
      {value}
    </p>
  )
}

function EstimatedRateCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#102A43]/80 px-5 py-4 shadow-[0_4px_18px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <p className="text-center font-inter text-sm font-semibold uppercase tracking-[0.1em] text-white/75">
        Your Estimated Interest Rate
      </p>
      <div className="relative mt-3 flex min-h-11 items-center justify-center">
        <BlurredValue
          value="6.25%"
          className="font-inter text-3xl font-bold tracking-tight text-white"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <LockBadge />
        </div>
      </div>
    </div>
  )
}

function RateColumn({ label, rate, apr }: RateColumnProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <p className="font-inter text-xs font-semibold uppercase tracking-wide text-[#7dd3fc]">
        {label}
      </p>
      <div>
        <p className="mb-1 font-inter text-xs font-medium text-white/50">Rate</p>
        <BlurredValue
          value={rate}
          className="font-inter text-xl font-bold leading-none text-white"
        />
      </div>
      <div>
        <p className="mb-1 font-inter text-xs font-medium text-white/50">APR</p>
        <BlurredValue
          value={apr}
          className="font-inter text-lg font-semibold leading-none text-white/90"
        />
      </div>
    </div>
  )
}

function OptionCard({
  title,
  leftColumn,
  rightColumn,
}: {
  title: string
  leftColumn: RateColumnProps
  rightColumn: RateColumnProps
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#102A43]/80 px-4 py-3.5 shadow-[0_4px_18px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-inter text-base font-semibold text-white">{title}</p>
        <span className="inline-flex items-center gap-1 font-inter text-sm font-semibold text-[#34C759]">
          <TrendingDown className="h-3.5 w-3.5" strokeWidth={2.5} />
          Lower
        </span>
      </div>

      <div className="relative flex items-start justify-between gap-4 pr-1">
        <RateColumn {...leftColumn} />
        <RateColumn {...rightColumn} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <LockBadge />
        </div>
      </div>
    </div>
  )
}

export default function HeroCards() {
  const [rates, setRates] = useState<MortgageRatesPayload>(defaultRates)

  useEffect(() => {
    let isMounted = true

    const loadRates = async () => {
      try {
        const response = await fetch("/api/mortgage-rates", { cache: "no-store" })
        if (!response.ok) return

        const data = (await response.json()) as MortgageRatesPayload
        if (!isMounted || !data?.option1 || !data?.option2) return
        setRates({
          ...data,
          option3: data.option3 ?? defaultRates.option3,
        })
      } catch {
        // keep defaults
      }
    }

    void loadRates()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="mx-auto flex w-full flex-col gap-2.5">
      <EstimatedRateCard />
      <OptionCard
        title={rates.option1.title}
        leftColumn={rates.option1.leftColumn}
        rightColumn={rates.option1.rightColumn}
      />
      <OptionCard
        title={rates.option2.title}
        leftColumn={rates.option2.leftColumn}
        rightColumn={rates.option2.rightColumn}
      />
      <OptionCard
        title={rates.option3.title}
        leftColumn={rates.option3.leftColumn}
        rightColumn={rates.option3.rightColumn}
      />
    </div>
  )
}
