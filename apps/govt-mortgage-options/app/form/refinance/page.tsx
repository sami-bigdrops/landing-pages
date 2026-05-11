"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import confetti from "canvas-confetti";
import { ArrowLeft, DollarSign, Loader2, Info, Lock } from "lucide-react";
import { ProgressBar } from "@workspace/ui/components/progress-bar";
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group";
import { SelectInput } from "@workspace/ui/components/select-input";
import MotivationalQuote from "@/components/MotivationalQuotes";
import MortgageSlider, {
  SNAP_POINTS_WITH_ZERO,
  snapToNearest,
  getAverageValue,
} from "./_components/MortgageSlider";
import InterestSlider from "./_components/InterestSlider";
import { TrustedForm, useUtmParams } from "@workspace/lp-core";

// ── Psychological step order ────────────────────────────────────────────────
//  Property (easy, non-threatening start)
//  1  PROP_DESC          Property type (radio, auto-advance)
//  2  EST_VAL + BAL_ONE  Home value & mortgage balance (select inputs)
//  3  CRED_GRADE         Credit rating (radio, auto-advance)
//
//  Financial details (engaged, momentum built)
//  4  MTG_ONE_INT        Current mortgage rate slider
//  5  MTG_TWO            2nd mortgage? (radio, auto-advance)
//  6  BAL_TWO            2nd mortgage balance (conditional: MTG_TWO=YES)
//  7  MTG_TWO_INT        2nd mortgage rate (conditional: MTG_TWO=YES)
//  8  ADD_CASH           Additional cash slider (conditional: balance < EST_VAL)
//
//  Preferences & qualifications (invested, ask harder questions)
//  9  LOAN_TYPE          Loan type (radio, auto-advance)
//  10 PROP_PURP          Property purpose (radio, auto-advance)
//  11 VA_STATUS          Veteran? (radio, auto-advance)
//  12 FHA_BANK_FORECLOSURE   (radio, auto-advance)
//  13 ANNUAL_VERIFIABLE_INCOME (radio, auto-advance)
//  14 NUM_MORTGAGE_LATES (radio, auto-advance)
//
//  Personal info (last — maximum commitment)
//  15 FNAME + LNAME + EMAIL
//  16 ADDRESS + CITY + STATE + ZIP + PRI_PHON
// ────────────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 10;

const INPUT_CLS =
  "w-full px-4 py-3  rounded-md border border-gray-200 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#941F32]/20 focus:border-[#941F32] transition-colors";
const LABEL_CLS = "text-sm  font-semibold text-[#1C2833] font-inter";
const STEP_HEADING_CLS = "text-xl md:text-2xl font-extrabold text-[#1C2833] font-inter leading-snug";
const STEP_SUBTEXT_CLS = "text-sm text-gray-500 font-inter mt-1";
const ERROR_TEXT_CLS = "text-xs text-red-500 mt-1";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
  "VT", "VA", "WA", "WV", "WI", "WY",
];

const PROP_DESC_OPTS = [
  { value: "SINGLE_FAM", label: "Single Family Home" },
  { value: "MULTI_FAM", label: "Multi-Family Home" },
  { value: "CONDO", label: "Condominium" },
  { value: "MOBILEHOME", label: "Mobile Home" },
];

const EMPLOYMENT_STATUS_OPTS = [
  { value: "EMPLOYED", label: "Employed" },
  { value: "SELF_EMPLOYED", label: "Self-Employed" },
  { value: "RETIRED", label: "Retired" },
  { value: "OTHER", label: "Other" },
];



const CRED_GRADE_OPTS = [
  { value: "EXCELLENT", label: "Excellent (720+)" },
  { value: "GOOD", label: "Good (680-719)" },
  { value: "FAIR", label: "Fair (640-679)" },
  { value: "POOR", label: "Poor (639 or less)" },
];

const YES_NO_OPTS = [{ value: "YES", label: "Yes" }, { value: "NO", label: "No" }];


const PROP_VALUE_OPTS = [
  "$90,001 - $105,000", "$75,000 - $90,000", "$105,001 - $120,000", "$120,001 - $135,000",
  "$135,001 - $150,000", "$150,001 - $165,000", "$165,001 - $180,000", "$180,001 - $195,000",
  "$195,001 - $210,000", "$210,001 - $225,000", "$225,001 - $240,000", "$240,001 - $255,000",
  "$255,001 - $270,000", "$270,001 - $285,000", "$285,001 - $300,000", "$300,001 - $315,000",
  "$315,001 - $330,000", "$330,001 - $345,000", "$345,001 - $360,000", "$360,001 - $375,000",
  "$375,001 - $390,000", "$390,001 - $405,000", "$405,001 - $420,000", "$420,001 - $435,000",
  "$435,001 - $450,000", "$450,001 - $465,000", "$465,001 - $480,000", "$480,001 - $495,000",
  "$495,001 - $510,000", "$510,001 - $525,000", "$525,001 - $540,000", "$540,001 - $555,000",
  "$555,001 - $570,000", "$570,001 - $585,000", "$585,001 - $600,000", "$600,001 - $615,000",
  "$615,001 - $630,000", "$630,001 - $645,000", "$645,001 - $660,000", "$660,001 - $675,000",
  "$675,001 - $690,000", "$690,001 - $705,000", "$705,001 - $720,000", "$720,001 - $735,000",
  "$735,001 - $750,000", "$750,001 - $765,000", "$765,001 - $780,000", "$780,001 - $795,000",
  "$795,001 - $810,000", "$810,001 - $825,000", "$825,001 - $840,000", "$840,001 - $855,000",
  "$855,001 - $870,000", "$870,001 - $885,000", "$885,001 - $900,000", "$900,001 - $915,000",
  "$915,001 - $930,000", "$930,001 - $945,000", "$945,001 - $960,000", "$960,001 - $975,000",
  "$975,001 - $990,000", "$990,001 - $1,000,000",
  "$1.0M - $1.1M", "$1.11M - $1.2M", "$1.21M - $1.3M", "$1.31M - $1.4M", "$1.41M - $1.5M",
  "$1.51M - $1.6M", "$1.61M - $1.7M", "$1.71M - $1.8M", "$1.81M - $1.9M", "$1.91M - $2.0M",
  "$2.0M or more",
];

const BALANCE_OPTS = [
  "$50,000 - $59,999", "$60,000 - $79,999", "$80,000 - $89,999", "$90,000 - $99,999",
  "$100,000 - $120,000", "$120,001 - $135,000", "$135,001 - $150,000", "$150,001 - $165,000",
  "$165,001 - $180,000", "$180,001 - $195,000", "$195,001 - $210,000", "$210,001 - $225,000",
  "$225,001 - $240,000", "$240,001 - $255,000", "$255,001 - $270,000", "$270,001 - $285,000",
  "$285,001 - $300,000", "$300,001 - $315,000", "$315,001 - $330,000", "$330,001 - $345,000",
  "$345,001 - $360,000", "$360,001 - $375,000", "$375,001 - $390,000", "$390,001 - $405,000",
  "$405,001 - $420,000", "$420,001 - $435,000", "$435,001 - $450,000", "$450,001 - $465,000",
  "$465,001 - $480,000", "$480,001 - $495,000", "$495,001 - $510,000", "$510,001 - $525,000",
  "$525,001 - $540,000", "$540,001 - $555,000", "$555,001 - $570,000", "$570,001 - $585,000",
  "$585,001 - $600,000", "$600,001 - $615,000", "$615,001 - $630,000", "$630,001 - $645,000",
  "$645,001 - $660,000", "$660,001 - $675,000", "$675,001 - $690,000", "$690,001 - $705,000",
  "$705,001 - $720,000", "$720,001 - $735,000", "$735,001 - $750,000", "$750,001 - $765,000",
  "$765,001 - $780,000", "$780,001 - $795,000", "$795,001 - $810,000", "$810,001 - $825,000",
  "$825,001 - $840,000", "$840,001 - $855,000", "$855,001 - $870,000", "$870,001 - $885,000",
  "$885,001 - $900,000", "$900,001 - $915,000", "$915,001 - $930,000", "$930,001 - $945,000",
  "$945,001 - $960,000", "$960,001 - $975,000", "$975,001 - $990,000", "$990,001 - $1,000,000",
  "$1.0M - $1.1M", "$1.11M - $1.2M", "$1.21M - $1.3M", "$1.31M - $1.4M", "$1.41M - $1.5M",
  "$1.51M - $1.6M", "$1.61M - $1.7M", "$1.71M - $1.8M", "$1.81M - $1.9M", "$1.91M - $2.0M",
  "$2.0M or more",
];

function parseLabelToMidpoint(label: string): number {
  if (label.includes("or more")) {
    const m = label.match(/([\d.]+)M/);
    return m ? Math.round(parseFloat(m[1]!) * 1_000_000 * 1.05) : 2_100_000;
  }
  if (label.includes("M")) {
    const ms = [...label.matchAll(/([\d.]+)M/g)];
    if (ms.length >= 2) {
      return Math.round((parseFloat(ms[0]![1]!) + parseFloat(ms[1]![1]!)) / 2 * 1_000_000);
    }
  }
  const nums = [...label.matchAll(/[\d,]+/g)].map((m) => parseInt(m[0]!.replace(/,/g, ""), 10));
  if (nums.length >= 2) return Math.round((nums[0]! + nums[1]!) / 2);
  return 0;
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function checkPhoneValidity(digits: string): string {
  if (digits.length !== 10) return "Enter a valid 10-digit US phone number.";
  const areaCode = digits.slice(0, 3);
  const exchange = digits.slice(3, 6);
  // US area codes and exchanges cannot start with 0 or 1
  if (areaCode[0] === "0" || areaCode[0] === "1") return "Invalid area code.";
  if (exchange[0] === "0" || exchange[0] === "1") return "Invalid phone number format.";
  // Reject obviously fake repeated-digit numbers (e.g. 0000000000, 1111111111)
  if (/^(\d)\1{9}$/.test(digits)) return "Please enter a real phone number.";
  // Reject sequential patterns (1234567890, 9876543210)
  if (digits === "1234567890" || digits === "9876543210") return "Please enter a real phone number.";
  // Reject known fake/test numbers (555-0100 to 555-0199 are fictitious per NANP)
  if (exchange === "555" && parseInt(digits.slice(6)) >= 100 && parseInt(digits.slice(6)) <= 199) {
    return "Please enter a real phone number.";
  }
  return "";
}

function formatDobInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function validateDobValue(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length !== 8) {
    return "Enter DOB in MM/DD/YYYY format.";
  }

  const mm = Number(digits.slice(0, 2));
  const dd = Number(digits.slice(2, 4));
  const yyyy = Number(digits.slice(4, 8));
  const birthDate = new Date(yyyy, mm - 1, dd);
  const validDate =
    birthDate.getFullYear() === yyyy &&
    birthDate.getMonth() === mm - 1 &&
    birthDate.getDate() === dd;

  if (!validDate) return "Enter a valid date of birth.";
  if (yyyy < 1925 || yyyy > 2007) return "Year must be between 1925 and 2007";
  return "";
}

// ── Google Places dropdown global styles ───────────────────────────────────
const PLACES_STYLES = `
  .pac-container {
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    margin-top: 4px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.10);
    font-family: Inter, sans-serif;
    overflow: hidden;
    padding: 4px 0;
    background: #fff;
    z-index: 9999;
  }
  .pac-container::after { display: none; }
  .pac-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    font-size: 13px;
    color: #1C2833;
    cursor: pointer;
    border-top: none;
    transition: background 0.15s;
  }
  .pac-item:hover, .pac-item-selected { background: #fdf2f4; }
  .pac-icon {
    width: 16px; height: 16px;
    background-image: none !important;
    flex-shrink: 0;
  }
  .pac-icon::before {
    content: "";
    display: block;
    width: 14px; height: 14px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23941F32'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z'/%3E%3C/svg%3E") center/contain no-repeat;
  }
  .pac-item-query { font-weight: 600; color: #1C2833; font-size: 13px; }
  .pac-matched { color: #941F32; }
`;

// ── Searchable State Dropdown ───────────────────────────────────────────────
function StateSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const US_STATE_LABELS: Record<string, string> = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
    CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "Washington D.C.", FL: "Florida",
    GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana",
    IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine",
    MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
    MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
    NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
    OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island",
    SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
    VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  };

  const filtered = Object.entries(US_STATE_LABELS).filter(([abbr, name]) =>
    name.toLowerCase().includes(query.toLowerCase()) || abbr.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) return;
    setTimeout(() => searchRef.current?.focus(), 50);
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const selectedLabel = value ? `${US_STATE_LABELS[value] ?? value} (${value})` : "";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => { setOpen((p) => !p); setQuery(""); }}
        className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm font-inter text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#941F32]/20 focus:border-[#941F32] transition-colors bg-white"
      >
        <span className={value ? "text-[#1C2833]" : "text-gray-400"}>
          {selectedLabel || "Select state"}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search state..."
              className="w-full px-3 py-2 text-sm rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#941F32]/20 focus:border-[#941F32] font-inter"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400 font-inter">No results</li>
            )}
            {filtered.map(([abbr, name]) => (
              <li key={abbr}>
                <button
                  type="button"
                  onClick={() => { onChange(abbr); setOpen(false); setQuery(""); }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-inter flex items-center justify-between transition-colors
                    ${value === abbr ? "bg-[#fdf2f4] text-[#941F32] font-semibold" : "text-[#1C2833] hover:bg-gray-50"}`}
                >
                  <span>{name}</span>
                  <span className="text-xs text-gray-400 font-medium">{abbr}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Email input with domain autocomplete ───────────────────────────────────
const EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
  "aol.com", "protonmail.com", "me.com", "live.com", "msn.com",
];

function EmailInput({
  value, onChange, onBlur, error, clearError,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  clearError: () => void;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSug, setActiveSug] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const buildSuggestions = (val: string) => {
    const atIdx = val.indexOf("@");
    if (atIdx === -1) { setSuggestions([]); return; }
    const afterAt = val.slice(atIdx + 1).toLowerCase();
    const localPart = val.slice(0, atIdx + 1);
    const matched = afterAt === ""
      ? EMAIL_DOMAINS.map((d) => `${localPart}${d}`)
      : EMAIL_DOMAINS
        .filter((d) => d.startsWith(afterAt) && d !== afterAt)
        .map((d) => `${localPart}${d}`);
    setSuggestions(matched.slice(0, 5));
    setActiveSug(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\s/g, "");
    onChange(v);
    clearError();
    buildSuggestions(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveSug((p) => Math.min(p + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveSug((p) => Math.max(p - 1, 0)); }
    else if (e.key === "Enter" || e.key === "Tab") {
      if (activeSug >= 0 && suggestions[activeSug]) {
        e.preventDefault();
        onChange(suggestions[activeSug]);
        setSuggestions([]);
      }
    } else if (e.key === "Escape") setSuggestions([]);
  };

  const pick = (s: string) => { onChange(s); setSuggestions([]); clearError(); };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setSuggestions([]);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const INPUT_CLS_LOCAL =
    "w-full px-4 py-3 rounded-md border text-sm font-inter focus:outline-none focus:ring-2 transition-colors " +
    (error
      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
      : "border-gray-200 focus:ring-[#941F32]/20 focus:border-[#941F32]");

  return (
    <div ref={containerRef} className="relative">
      <input
        id="email" type="email" value={value}
        onChange={handleChange}
        onBlur={() => { setSuggestions([]); onBlur(); }}
        onKeyDown={handleKeyDown}
        placeholder="you@example.com"
        className={INPUT_CLS_LOCAL}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden py-1">
          {suggestions.map((s, i) => {
            const atIdx = s.indexOf("@");
            const local = s.slice(0, atIdx + 1);
            const domain = s.slice(atIdx + 1);
            return (
              <li key={s}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); pick(s); }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-inter flex items-center gap-0.5 transition-colors
                    ${i === activeSug ? "bg-[#fdf2f4] text-[#941F32]" : "hover:bg-gray-50 text-[#1C2833]"}`}
                >
                  <span className="font-semibold">{local}</span>
                  <span className={i === activeSug ? "text-[#941F32]" : "text-gray-400"}>{domain}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {error && <p className={ERROR_TEXT_CLS}>{error}</p>}
    </div>
  );
}

// ── InfoTip — hover (desktop) / tap (mobile) tooltip ───────────────────────
function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [open]);

  return (
    <span
      ref={ref}
      className="relative inline-flex ml-1.5 align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#1E3A8A]/20 border border-[#1E3A8A]/60 text-[#1E3A8A] hover:bg-[#1E3A8A]/30 hover:border-[#1E3A8A] transition-colors"
        aria-label="More information"
      >
        <Info size={12} strokeWidth={2.5} />
      </button>
      {open && (
        <span className="absolute left-0 bottom-full mb-2 w-64 max-w-[80vw] p-3 rounded-lg bg-[#1C2833] text-white text-xs leading-relaxed font-normal shadow-lg z-50">
          {text}
          <span className="absolute left-2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C2833]" />
        </span>
      )}
    </span>
  );
}

// ── Main form component ────────────────────────────────────────────────────

function RefinanceForm() {
  useUtmParams(30);
  const searchParams = useSearchParams();
  const router = useRouter();
  const zipFromUrl = searchParams.get("zip") ?? "";

  const [currentStep, setCurrentStep] = useState(1);
  const currentStepRef = useRef(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  const initAutocomplete = useCallback(() => {
    if (!addressInputRef.current || autocompleteRef.current) return;
    if (typeof google === "undefined" || !google.maps?.places) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(addressInputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["address_components", "formatted_address"],
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.address_components) return;

      let streetNumber = "", route = "", city = "", state = "", zip = "";

      for (const comp of place.address_components) {
        const type = comp.types[0];
        if (type === "street_number") streetNumber = comp.long_name;
        else if (type === "route") route = comp.short_name;
        else if (type === "locality") city = comp.long_name;
        else if (type === "sublocality_level_1" && !city) city = comp.long_name;
        else if (type === "administrative_area_level_1") state = comp.short_name;
        else if (type === "postal_code") zip = comp.long_name;
      }

      setFd((p) => ({
        ...p,
        ADDRESS: [streetNumber, route].filter(Boolean).join(" "),
        CITY: city,
        STATE: state,
        ZIP: zip,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { currentStepRef.current = currentStep; }, [currentStep]);

  // ── Form state ─────────────────────────────────────────────────────────────
  const [fd, setFd] = useState(() => {
    return {
      PROP_ZIP: "",
      _estValLabel: "$240,001 - $255,000",
      _balLabel: "$165,001 - $180,000",
      EST_VAL: 247_500,
      BAL_ONE: 172_500,
      PROP_DESC: "", PROP_PURP: "PRIMARY",
      MTG_ONE_INT: 5.25, MTG_TWO: "NO",
      EMPLOYMENT_STATUS: "",
      _bal2Snap: 50_000, MTG_TWO_INT: 6, BAL_TWO: getAverageValue(50_000),
      _cashSnap: 0, ADD_CASH: 0,
      LOAN_TYPE: "FIXED", CRED_GRADE: "",
      VA_STATUS: "NO",
      FHA_BANK_FORECLOSURE: "NO", ANNUAL_VERIFIABLE_INCOME: "YES", NUM_MORTGAGE_LATES: "NONE",
      DOB: "",
      EMAIL: "", FNAME: "", LNAME: "",
      ADDRESS: "", CITY: "", STATE: "", ZIP: "", PRI_PHON: "",
    };
  });

  const update = (patch: Partial<typeof fd>) => setFd((p) => ({ ...p, ...patch }));

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const z = zipFromUrl.replace(/\D/g, "").slice(0, 5);
    if (z.length === 5) update({ PROP_ZIP: z, ZIP: z });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipFromUrl]);

  useEffect(() => {
    if (currentStep === 9) {
      autocompleteRef.current = null;
      setTimeout(initAutocomplete, 100);
    }
  }, [currentStep, initAutocomplete]);

  useEffect(() => {
    if (currentStep !== 8 || !confettiCanvasRef.current) return;

    const fireConfetti = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    });
    const colors = ["#941F32", "#1E3A8A", "#F59E0B", "#10B981", "#FDF2F4"];
    const bursts = [
      { origin: { x: 0.05, y: 0.9 }, angle: 55, spread: 130, particleCount: 70 },
      { origin: { x: 0.25, y: 0.95 }, angle: 75, spread: 150, particleCount: 70 },
      { origin: { x: 0.5, y: 0.95 }, angle: 90, spread: 170, particleCount: 80 },
      { origin: { x: 0.75, y: 0.95 }, angle: 105, spread: 150, particleCount: 70 },
      { origin: { x: 0.95, y: 0.9 }, angle: 125, spread: 130, particleCount: 70 },
      { origin: { x: 0, y: 0.45 }, angle: 35, spread: 110, particleCount: 55 },
      { origin: { x: 1, y: 0.45 }, angle: 145, spread: 110, particleCount: 55 },
    ];
    const fire = () => {
      bursts.forEach(({ origin, angle, spread, particleCount }) => {
        fireConfetti({
          particleCount,
          angle,
          spread,
          startVelocity: 48,
          scalar: 0.9,
          ticks: 260,
          origin,
          colors,
        });
      });
    };

    fire();
    const timers = [window.setTimeout(fire, 500), window.setTimeout(fire, 1000)];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      fireConfetti.reset();
    };
  }, [currentStep]);


  // ── Computed ───────────────────────────────────────────────────────────────
  const bal2Pts = useMemo(() => SNAP_POINTS_WITH_ZERO.filter((p) => p <= 3_000_000), []);
  const bal2Avg = getAverageValue(fd._bal2Snap, bal2Pts);
  const totalBalance = fd.BAL_ONE + (fd.MTG_TWO === "YES" ? bal2Avg : 0);
  // Skip ADD_CASH when there is no room left (total balance already at or above 87.5% LTV cap)
  const addCashMax = useMemo(() => Math.max(0, Math.round(fd.EST_VAL * 0.875) - totalBalance), [fd.EST_VAL, totalBalance]);
  const noEquity = addCashMax <= 0;

  const addCashPts = useMemo(() => {
    if (addCashMax <= 0) return [0];
    const pts: number[] = [0];
    for (let v = 5_000; v <= Math.min(addCashMax, 195_000); v += 5_000) pts.push(v);
    for (let v = 200_000; v <= Math.min(addCashMax, 400_000); v += 10_000) pts.push(v);
    for (let v = 420_000; v <= Math.min(addCashMax, 1_000_000); v += 20_000) pts.push(v);
    for (let v = 1_250_000; v <= Math.min(addCashMax, 2_000_000); v += 250_000) pts.push(v);
    const last = pts[pts.length - 1]!;
    if (last < addCashMax) pts.push(addCashMax);
    return pts;
  }, [addCashMax]);

  const addCashDefault = useMemo(() => {
    const def = Math.round(fd.EST_VAL * 0.8) - totalBalance;
    return snapToNearest(Math.max(0, def), addCashPts);
  }, [fd.EST_VAL, totalBalance, addCashPts]);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  function getNextStep(cur: number): number {
    return Math.min(cur + 1, TOTAL_STEPS);
  }
  function getPrevStep(cur: number): number {
    return Math.max(cur - 1, 1);
  }

  const applicableSteps = useMemo(() => {
    return Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1);
  }, []);

  const progressCurrent = applicableSteps.indexOf(currentStep) + 1;
  const progressTotal = applicableSteps.length;
  const isLastStep = currentStep === TOTAL_STEPS;

  // ── Auto-advance helper ────────────────────────────────────────────────────
  const autoAdvance = (fromStep: number) => {
    setTimeout(() => {
      if (currentStepRef.current === fromStep) setCurrentStep(getNextStep(fromStep));
    }, 200);
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1: return fd.PROP_DESC !== "";
      case 2: return fd._estValLabel !== "" && fd._balLabel !== "";
      case 3: return fd.CRED_GRADE !== "";
      case 4: return true;
      case 5: return fd.EMPLOYMENT_STATUS !== "";
      case 6: return fd.VA_STATUS !== "";
      case 7: return fd.VA_STATUS !== "";
      case 8: return fd.DOB.replace(/\D/g, "").length === 8 && validateDobValue(fd.DOB) === "";
      case 9: return fd.ADDRESS.trim() !== "" && fd.CITY.trim() !== "" && fd.STATE !== "" && /^\d{5}$/.test(fd.ZIP);
      case 10: {
        const fnOk = fd.FNAME.trim().length >= 2 && /^[A-Za-z\s'\-\.]+$/.test(fd.FNAME.trim()) && !/^(.)\1+$/.test(fd.FNAME.trim().replace(/\s/g, "")) && !/^(test|fake|asdf|qwerty|xxxx|aaaa|bbbb|cccc|name|user|admin|none|null|n\/a)$/i.test(fd.FNAME.trim());
        const lnOk = fd.LNAME.trim().length >= 2 && /^[A-Za-z\s'\-\.]+$/.test(fd.LNAME.trim()) && !/^(.)\1+$/.test(fd.LNAME.trim().replace(/\s/g, "")) && !/^(test|fake|asdf|qwerty|xxxx|aaaa|bbbb|cccc|name|user|admin|none|null|n\/a)$/i.test(fd.LNAME.trim());
        return fnOk && lnOk && fd.EMAIL.includes("@") && fd.EMAIL.includes(".") && checkPhoneValidity(fd.PRI_PHON.replace(/\D/g, "")) === "";
      }
      default: return false;
    }
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleNext = async () => {
    if (!isStepValid()) return;

    if (currentStep === 4) update({ ADD_CASH: noEquity ? 0 : getAverageValue(fd._cashSnap, addCashPts) });

    if (isLastStep) {
      setIsSubmitting(true);
      try {
        const certEl = typeof document !== "undefined" && (
          (document.getElementById("xxTrustedFormCertUrl_0") as HTMLInputElement)?.value ||
          (document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement)?.value
        );
        const payload = {
          PRODUCT: "PP_REFI",
          PROP_ZIP: fd.PROP_ZIP, PROP_DESC: fd.PROP_DESC, PROP_PURP: fd.PROP_PURP,
          CRED_GRADE: fd.CRED_GRADE, EST_VAL: fd.EST_VAL, BAL_ONE: fd.BAL_ONE,
          MTG_ONE_INT: fd.MTG_ONE_INT, MTG_TWO: fd.MTG_TWO,
          EMPLOYMENT_STATUS: fd.EMPLOYMENT_STATUS,
          BAL_TWO: fd.MTG_TWO === "YES" ? fd.BAL_TWO : 0,
          MTG_TWO_INT: fd.MTG_TWO === "YES" ? fd.MTG_TWO_INT : 0,
          ADD_CASH: fd.ADD_CASH,
          LOAN_TYPE: fd.LOAN_TYPE, VA_STATUS: fd.VA_STATUS,
          FHA_BANK_FORECLOSURE: fd.FHA_BANK_FORECLOSURE,
          ANNUAL_VERIFIABLE_INCOME: fd.ANNUAL_VERIFIABLE_INCOME,
          NUM_MORTGAGE_LATES: fd.NUM_MORTGAGE_LATES,
          DOB: fd.DOB.trim(),
          EMAIL: fd.EMAIL.trim(), FNAME: fd.FNAME.trim(), LNAME: fd.LNAME.trim(),
          ADDRESS: fd.ADDRESS.trim(), CITY: fd.CITY.trim(), STATE: fd.STATE,
          ZIP: fd.ZIP, PRI_PHON: fd.PRI_PHON.replace(/\D/g, ""),
          trustedformCertUrl: certEl || "",
        };
        const res = await fetch("/api/submit-refinance", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success && result.redirectUrl) router.push(result.redirectUrl);
        else { alert(result.error || "Submission failed. Please try again."); setIsSubmitting(false); }
      } catch {
        alert("An error occurred. Please try again."); setIsSubmitting(false);
      }
    } else {
      setCurrentStep(getNextStep(currentStep));
    }
  };

  const handleBack = () => setCurrentStep(getPrevStep(currentStep));
  const clearError = (f: string) => setErrors((p) => { const n = { ...p }; delete n[f]; return n; });
  const setError = (f: string, m: string) => setErrors((p) => ({ ...p, [f]: m }));
  const validateName = (field: "FNAME" | "LNAME", value: string) => {
    const v = value.trim();
    const label = field === "FNAME" ? "First name" : "Last name";
    if (v.length < 2) { setError(field, `${label} must be at least 2 characters.`); return; }
    if (v.length > 50) { setError(field, `${label} is too long.`); return; }
    if (!/^[A-Za-z\s'\-\.]+$/.test(v)) { setError(field, `${label} contains invalid characters.`); return; }
    if (/^(.)\1+$/.test(v.replace(/\s/g, ""))) { setError(field, `Enter a real ${label.toLowerCase()}.`); return; }
    if (/^(test|fake|asdf|qwerty|xxxx|aaaa|bbbb|cccc|name|user|admin|none|null|n\/a)$/i.test(v)) {
      setError(field, `Enter a real ${label.toLowerCase()}.`); return;
    }
    clearError(field);
  };

  const validateEmail = () => {
    if (!fd.EMAIL.includes("@") || !fd.EMAIL.includes(".")) setError("EMAIL", "Enter a valid email");
    else clearError("EMAIL");
  };

  const validatePhone = () => {
    const digits = fd.PRI_PHON.replace(/\D/g, "");
    const msg = checkPhoneValidity(digits);
    if (msg) setError("PRI_PHON", msg);
    else clearError("PRI_PHON");
  };

  const validateDob = () => {
    const msg = validateDobValue(fd.DOB);
    if (msg) setError("DOB", msg);
    else clearError("DOB");
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto">
      {currentStep === 8 && (
        <canvas
          ref={confettiCanvasRef}
          className="pointer-events-none fixed inset-0 z-[9999] h-screen w-screen"
          aria-hidden="true"
        />
      )}

      <div className="mb-3">
        <MotivationalQuote step={currentStep} formType="refinance" />
      </div>
      <div className="mb-6">
        <ProgressBar
          type="1" currentStep={progressCurrent} totalSteps={progressTotal}
          foregroundColor="#941F32" backgroundColor="#fce7ea"
          icon={<DollarSign size={18} className="text-[#941F32]" />}
        />
      </div>

     

      <form onSubmit={(e) => e.preventDefault()} className="rounded-lg bg-white border border-gray-200 shadow-sm p-6 md:p-8">
        <TrustedForm />

        {/* ── 1 · PROP_DESC (auto-advance) ── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className={STEP_HEADING_CLS}>
                Ordinary homeowners may qualify for new programs in 2026.
                <InfoTip text="We use your property type to match you with the best available refinancing programs in your area." />
              </h2>
              <p className="text-sm font-semibold text-[#1C2833] font-inter">
                Confirm your home type below:
              </p>
            </div>
            <RadioButtonGroup
              name="propDesc"
              options={PROP_DESC_OPTS}
              value={fd.PROP_DESC}
              onChange={(v) => { update({ PROP_DESC: v }); autoAdvance(1); }}
              type="1"
              layout="column"
              selectedOptionBackgroundColor="#fdf2f4"
              selectedOptionBorderColor="#941F32"
            />
          </div>
        )}

        {/* ── 2 · EST_VAL + BAL_ONE ── */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <SelectInput
              label="Estimated Property Value:"
              options={PROP_VALUE_OPTS.map((o) => ({ value: o, label: o }))}
              value={fd._estValLabel}
              onChange={(val) => update({ _estValLabel: val, EST_VAL: parseLabelToMidpoint(val) })}
              searchable
              searchPlaceholder="Search value range..."
              selectClassName="h-12 text-sm font-inter"
            />

            <SelectInput
              label="Estimated Mortgage Balance:"
              options={BALANCE_OPTS.map((o) => ({ value: o, label: o }))}
              value={fd._balLabel}
              onChange={(val) => update({ _balLabel: val, BAL_ONE: parseLabelToMidpoint(val) })}
              searchable
              searchPlaceholder="Search balance range..."
              selectClassName="h-12 text-sm font-inter"
            />

            <div className="rounded-lg bg-[#fdf2f4] border border-[#941F32]/20 p-4 space-y-1.5">
              <p className="text-sm font-semibold text-[#941F32] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#941F32] shrink-0" />
                Complete 2–3 additional questions to view updated rates.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Note: If you abandon this form and rates rise tomorrow, you&apos;ll lose access to today&apos;s lower estimate.
              </p>
            </div>
          </div>
        )}

        {/* ── 3 · CRED_GRADE (auto-advance) ── */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className={STEP_HEADING_CLS}>
                How would you rate your credit?
                <InfoTip text="Excellent: 720+, Good: 680-719, Fair: 640-679, Poor: 639 or less. Choose your best estimate; we will not run a credit check on this step." />
              </h2>
              <p className={STEP_SUBTEXT_CLS}>This helps us find the best rates for your situation.</p>
            </div>
            <RadioButtonGroup
              name="credGrade" options={CRED_GRADE_OPTS} value={fd.CRED_GRADE}
              onChange={(v) => { update({ CRED_GRADE: v }); autoAdvance(3); }}
              type="1" layout="column"
              selectedOptionBackgroundColor="#fdf2f4"
              selectedOptionBorderColor="#941F32"
            />
          </div>
        )}

        {/* ── 4 · addCash (conditional) ── */}
        {currentStep === 4 && (

          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              Would you like to borrow additional cash?
              <InfoTip text="Additional cash you'd like beyond paying off your existing mortgage(s). Limited to keep your total loan around 87.5% of your home's value." />
            </h2>

            {noEquity ? (
              <div className="space-y-4">
                <p className="text-center text-sm font-semibold text-[#941F32]">
                  There is no equity/cash in your home to borrow
                </p>
                <p className="text-center text-xl font-extrabold text-[#1C2833]">$0 (No Cash)</p>
              </div>
            ) : (
              <MortgageSlider
                id="addCash" label="" value={fd._cashSnap || addCashDefault}
                onChange={(v) => update({ _cashSnap: v })}
                customPoints={addCashPts}
              />
            )}
          </div>





        )}

        {/* ── 5 · employmentStatus (auto-advance) ── */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className={STEP_HEADING_CLS}>
                What is your employment status?

              </h2>

            </div>
            <RadioButtonGroup
              name="employmentStatus" options={EMPLOYMENT_STATUS_OPTS} value={fd.EMPLOYMENT_STATUS}
              onChange={(v) => { update({ EMPLOYMENT_STATUS: v }); autoAdvance(5); }}
              type="1" layout="column"
              selectedOptionBackgroundColor="#fdf2f4"
              selectedOptionBorderColor="#941F32"
            />
          </div>
        )}

        {/* ── 6 · fhaStatus (conditional) ── */}
        {currentStep === 6 && (

          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              Is your mortgage FHA?
              <InfoTip text="An FHA loan is a mortgage issued by an FHA-approved lender and insured by the Federal Housing Administration (FHA). Designed for low-to-moderate income borrowers, FHA loans require a lower minimum down payment and credit scores than many conventional loans." />
         
            </h2>
            <RadioButtonGroup
              name="vaStatus" options={YES_NO_OPTS} value={fd.VA_STATUS}
              onChange={(v) => { update({ VA_STATUS: v }); autoAdvance(6); }}
              type="1" layout="column"
              selectedOptionBackgroundColor="#fdf2f4"
              selectedOptionBorderColor="#941F32"
            />
          </div>

        )}

        {/* ── 7 · vaStatus (conditional) ── */}
        {currentStep === 7 && (
          <div className="space-y-6">
          <h2 className={STEP_HEADING_CLS}>
          Are you a veteran or active military?
          </h2>
          <RadioButtonGroup
            name="vaStatus" options={YES_NO_OPTS} value={fd.VA_STATUS}
            onChange={(v) => { update({ VA_STATUS: v }); autoAdvance(7); }}
            type="1" layout="column"
            selectedOptionBackgroundColor="#fdf2f4"
            selectedOptionBorderColor="#941F32"
          />
        </div>
        )}

        {/* ── 8 · dob ── */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <div>
              <h2 className={STEP_HEADING_CLS}>
                When were you born?
              </h2>
              <p className={STEP_SUBTEXT_CLS}>
              Confirm age now — today’s rate update is ready
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="dob" className={LABEL_CLS}>Date of Birth</label>
              <input
                id="dob"
                value={fd.DOB}
                onChange={(e) => {
                  const nextDob = formatDobInput(e.target.value);
                  update({ DOB: nextDob });
                  const msg = validateDobValue(nextDob);
                  if (msg) setError("DOB", msg);
                  else clearError("DOB");
                }}
                onBlur={validateDob}
                placeholder="MM/DD/YYYY"
                className={`${INPUT_CLS} h-12 text-sm font-inter ${errors.DOB ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
                inputMode="numeric"
                maxLength={10}
              />
              {errors.DOB && <p className={ERROR_TEXT_CLS}>{errors.DOB}</p>}
            </div>

           
          </div>

          
        )}

       

       
        {/* ── 9 · Address + Phone ── */}
        {currentStep === 9 && (
          <div className="space-y-6">
            <style>{PLACES_STYLES}</style>
            <h2 className={STEP_HEADING_CLS}>
              Your address
            </h2>
            <div className="space-y-1.5">
              <label htmlFor="address" className={LABEL_CLS}>Street Address</label>
              <input
                ref={addressInputRef}
                id="address"
                value={fd.ADDRESS}
                onChange={(e) => update({ ADDRESS: e.target.value })}
                placeholder="Start typing your address..."
                className={INPUT_CLS}
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="city" className={LABEL_CLS}>City</label>
                <input id="city" value={fd.CITY} onChange={(e) => update({ CITY: e.target.value })} placeholder="New York" className={INPUT_CLS} />
              </div>
              <div className="space-y-1.5">
                <label className={LABEL_CLS}>State</label>
                <StateSelect value={fd.STATE} onChange={(v) => update({ STATE: v })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="zip" className={LABEL_CLS}>ZIP Code</label>
              <input id="zip" value={fd.ZIP} onChange={(e) => update({ ZIP: e.target.value.replace(/\D/g, "").slice(0, 5) })} placeholder="ZIP Code" className={INPUT_CLS} inputMode="numeric" />
            </div>
          </div>
        )}

        {/* ── 10 · Contact info ── */}
        {currentStep === 10 && (
          <div className="space-y-5">
            <h2 className={STEP_HEADING_CLS}>
              Almost there! Your contact information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="fname" className={LABEL_CLS}>First Name</label>
                <input
                  id="fname" value={fd.FNAME}
                  onChange={(e) => { update({ FNAME: e.target.value }); clearError("FNAME"); }}
                  onBlur={() => validateName("FNAME", fd.FNAME)}
                  placeholder="John"
                  className={`${INPUT_CLS} ${errors.FNAME ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
                />
                {errors.FNAME && <p className={ERROR_TEXT_CLS}>{errors.FNAME}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lname" className={LABEL_CLS}>Last Name</label>
                <input
                  id="lname" value={fd.LNAME}
                  onChange={(e) => { update({ LNAME: e.target.value }); clearError("LNAME"); }}
                  onBlur={() => validateName("LNAME", fd.LNAME)}
                  placeholder="Doe"
                  className={`${INPUT_CLS} ${errors.LNAME ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
                />
                {errors.LNAME && <p className={ERROR_TEXT_CLS}>{errors.LNAME}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className={LABEL_CLS}>Email</label>
              <EmailInput
                value={fd.EMAIL}
                onChange={(v) => update({ EMAIL: v })}
                onBlur={validateEmail}
                error={errors.EMAIL}
                clearError={() => clearError("EMAIL")}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className={LABEL_CLS}>Phone Number</label>
              <input
                id="phone" type="tel"
                value={formatPhone(fd.PRI_PHON)}
                onChange={(e) => { update({ PRI_PHON: e.target.value.replace(/\D/g, "").slice(0, 10) }); clearError("PRI_PHON"); }}
                onBlur={validatePhone}
                placeholder="(555) 123-4567"
                className={`${INPUT_CLS} ${errors.PRI_PHON ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
              />
              {errors.PRI_PHON && <p className={ERROR_TEXT_CLS}>{errors.PRI_PHON}</p>}
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <button
              type="button" onClick={handleBack}
              className="flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm border-2 border-gray-200 text-gray-600 hover:border-[#941F32] hover:text-[#941F32] transition-all duration-200"
            >
              <ArrowLeft size={17} /> Back
            </button>
          )}
          <button
            type="button" onClick={handleNext}
            disabled={isSubmitting || !isStepValid()}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-sm transition-all duration-200
              ${isSubmitting || !isStepValid()
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#941F32] text-white hover:bg-[#7F1A2A] shadow-md hover:shadow-lg"}`}
          >
            {isSubmitting ? (<><Loader2 size={17} className="animate-spin" /> Submitting...</>)
              : isLastStep ? "Submit Details" : "Continue"}
          </button>
        </div>
      </form>

      {currentStep === 8 && (
        <p className="text-[10px] leading-relaxed text-gray-400 font-inter mt-4 px-1">
        By clicking "Continue" above, I authorize LendingTree & <a href="#" target="_blank" className="underline hover:text-gray-600">LendingTree's Partners</a>, to obtain my consumer report, credit profile, or other credit information associated with me from any consumer reporting agency for purposes of my inquiry, as well as for marketing purposes and to provide me with information and recommendations on financial products and services that may be of interest to me.
        </p>
      )}

      {isLastStep && (
        <p className="text-[10px] leading-relaxed text-gray-400 font-inter mt-4 px-1">
          By clicking Submit Details, you agree to: (1) our{" "}
          <a href="#" target="_blank" className="underline hover:text-gray-600">TERMS OF USE</a>,
          {" "}which include a Class Waiver and Mandatory Arbitration Agreement, (2) our{" "}
          <a href="#" target="_blank" className="underline hover:text-gray-600">PRIVACY POLICY</a>,
          {" "}and (3) receive notices and other COMMUNICATIONS ELECTRONICALLY. By clicking Submit Details, you: (a) provide your
          express written consent and binding signature under the ESIGN Act for Leadpoint, Inc. dba SecureRights, a Delaware
          corporation, to share your information with up to four (4) of its PREMIER PARTNERS and/or third parties acting on their
          behalf to contact you via telephone, mobile device (including SMS and MMS) and/or email, including but not limited to
          texts or calls made using an automated telephone dialing system, AI-generated voice and text messages, or pre-recorded
          or artificial voice messages, regarding financial services or other offers related to homeownership; (b) understand that
          your consent is valid even if your telephone number is currently listed on any state, federal, local or corporate Do Not
          Call list; (c) represent that you are the wireless subscriber or customary user of the wireless number(s) provided with
          authority to consent; (d) understand your consent is not required in order to obtain any good or service; (e) represent
          that you have received and reviewed the MORTGAGE BROKER DISCLOSURES for your state; and (f) provide your consent under
          the Fair Credit Reporting Act for SecureRights and/or its PREMIER PARTNERS to obtain information from your personal
          credit profile to prequalify you for credit options and connect you with an appropriate partner. You may choose to speak
          with an individual service provider by dialing{" "}
          <a href="tel:8443263442" className="underline hover:text-gray-600">(844) 326-3442</a>.
          {" "}Leadpoint, Inc. NMLS 3175.
        </p>
      )}

      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onLoad={initAutocomplete}
      />
    </div>
  );
}

export default function RefinancePage() {
  return <Suspense><RefinanceForm /></Suspense>;
}
