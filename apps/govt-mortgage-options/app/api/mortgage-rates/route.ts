import { NextResponse } from "next/server";

interface RatePair {
  label: string;
  rate: string;
  apr: string;
}

interface MortgageRatesResponse {
  updatedAt: string;
  source: string;
  option1: {
    title: string;
    leftColumn: RatePair;
    rightColumn: RatePair;
  };
  option2: {
    title: string;
    leftColumn: RatePair;
    rightColumn: RatePair;
  };
}

const FALLBACK: MortgageRatesResponse = {
  updatedAt: new Date().toISOString(),
  source: "money.com (cached)",
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

function pct(val: string) {
  const n = val.replace(/[^\d.]/g, "");
  return n ? `${n}%` : val;
}

interface ParsedRate {
  rate: string;
  apr: string;
}

function parseMoneyRateTable(
  text: string,
): Record<string, ParsedRate> | null {
  const pattern =
    /(\d{2}-Year\s+(?:Fixed|FHA|VA|Jumbo))\s+(?:Most Popular|Lower Credit|Military|High Balance|Shorter Term)\s+Rate\s+(\d+\.\d+)%\s*APR\s+(\d+\.\d+)%/gi;

  const results: Record<string, ParsedRate> = {};
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const key = match[1]!.replace(/\s+/g, " ").trim();
    results[key] = { rate: pct(match[2]!), apr: pct(match[3]!) };
  }

  return Object.keys(results).length >= 4 ? results : null;
}

async function fetchMoneyRates(): Promise<MortgageRatesResponse | null> {
  const res = await fetch("https://money.com/current-mortgage-rates/", {
    next: { revalidate: 86400 },
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; mortgage-rates-bot/1.0)",
    },
  });
  if (!res.ok) return null;

  const html = await res.text();
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;|&mdash;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const table = parseMoneyRateTable(text);
  if (!table) return null;

  const thirtyFixed = table["30-Year Fixed"];
  const fifteenFixed = table["15-Year Fixed"];
  const thirtyFha = table["30-Year FHA"];
  const thirtyVa = table["30-Year VA"];

  if (!thirtyFixed || !fifteenFixed || !thirtyFha || !thirtyVa) return null;

  return {
    updatedAt: new Date().toISOString(),
    source: "money.com",
    option1: {
      title: "Option 1",
      leftColumn: { label: "30-Yr Fixed", rate: thirtyFixed.rate, apr: thirtyFixed.apr },
      rightColumn: { label: "15-Yr Fixed", rate: fifteenFixed.rate, apr: fifteenFixed.apr },
    },
    option2: {
      title: "Option 2",
      leftColumn: { label: "30-Yr FHA", rate: thirtyFha.rate, apr: thirtyFha.apr },
      rightColumn: { label: "30-Yr VA", rate: thirtyVa.rate, apr: thirtyVa.apr },
    },
  };
}

const CACHE_HEADER = { "Cache-Control": "s-maxage=86400, stale-while-revalidate=43200" };

export async function GET() {
  try {
    const rates = await fetchMoneyRates();
    if (rates) {
      return NextResponse.json(rates, { headers: CACHE_HEADER });
    }
    return NextResponse.json(FALLBACK, { headers: CACHE_HEADER });
  } catch {
    return NextResponse.json(FALLBACK, { headers: CACHE_HEADER });
  }
}
