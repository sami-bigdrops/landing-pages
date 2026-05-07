"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TrendingDown } from "lucide-react";

interface RateColumnProps {
  label: string;
  rate: string;
  apr: string;
}

interface OptionCardData {
  title: string;
  leftColumn: RateColumnProps;
  rightColumn: RateColumnProps;
}

interface MortgageRatesPayload {
  source?: string;
  option1: OptionCardData;
  option2: OptionCardData;
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
};

function RateColumn({ label, rate, apr }: RateColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#3498DB]">
        {label}
      </p>
      <div>
        <p className="text-[10px] text-gray-400 font-medium mb-0.5">Rate</p>
        <p className="text-base font-bold text-gray-800 leading-none">
          {rate}
        </p>
      </div>
      <div>
        <p className="text-[10px] text-gray-400 font-medium mb-0.5">APR</p>
        <p className="text-sm font-semibold text-gray-600 leading-none">
          {apr}
        </p>
      </div>
    </div>
  );
}

function OptionCard({
  title,
  option,
  leftColumn,
  rightColumn,
  source,
}: {
  title: string;
  option: "1" | "2";
  leftColumn: RateColumnProps;
  rightColumn: RateColumnProps;
  source?: string;
}) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-gray-100 overflow-hidden">
      <div
        className={`flex items-center justify-between px-4 py-2.5 ${
          option === "1"
            ? "bg-gradient-to-r from-[#1e3a5f] to-[#2563a8]"
            : "bg-gradient-to-r from-[#2563a8] to-[#3498DB]"
        }`}
      >
        <p className="text-sm font-bold text-white tracking-wide">{title}</p>
        <span className="flex items-center gap-1 bg-emerald-400/20 text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-full">
          <TrendingDown className="h-3 w-3" strokeWidth={2.5} />
          Lower
        </span>
      </div>

      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <RateColumn
          label={leftColumn.label}
          rate={leftColumn.rate}
          apr={leftColumn.apr}
        />

        <RateColumn
          label={rightColumn.label}
          rate={rightColumn.rate}
          apr={rightColumn.apr}
        />
      </div>

      <div className="px-4 pb-3 flex items-center gap-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-[#3498DB]" />
        <p className="text-[11px] text-gray-400 font-medium">
          Source: {source ?? "fallback"}
        </p>
      </div>
    </div>
  );
}

export default function HeroCards() {
  const [rates, setRates] = useState<MortgageRatesPayload>(defaultRates);

  useEffect(() => {
    let isMounted = true;

    const loadRates = async () => {
      try {
        const response = await fetch("/api/mortgage-rates", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as MortgageRatesPayload;
        if (!isMounted || !data?.option1 || !data?.option2) return;
        setRates(data);
      } catch {
        // keep default values on failure
      }
    };

    void loadRates();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full md:w-auto md:self-center bg-gradient-to-br from-[#1e3a5f] to-[#2563a8] rounded-2xl px-8 py-4 text-white shadow-[0_4px_24px_rgba(30,58,95,0.4)]">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 text-center mb-3">
          Your Estimated Interest Rate
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Rate</p>
            <p className="text-2xl font-extrabold blur-sm select-none tracking-tight">6.25%</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="ring-4 ring-white/20 rounded-full shrink-0">
            <Image src="/lock.svg" alt="locked" width={44} height={44} />
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">APR</p>
            <p className="text-2xl font-extrabold blur-sm select-none tracking-tight">6.49%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <OptionCard
          title={rates.option1.title}
          option="1"
          leftColumn={rates.option1.leftColumn}
          rightColumn={rates.option1.rightColumn}
          source={rates.source}
        />
        <OptionCard
          title={rates.option2.title}
          option="2"
          leftColumn={rates.option2.leftColumn}
          rightColumn={rates.option2.rightColumn}
          source={rates.source}
        />
      </div>
    </div>
  );
}
