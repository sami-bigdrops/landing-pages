"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, Home, Loader2, Info } from "lucide-react";
import { ProgressBar } from "@workspace/ui/components/progress-bar";
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group";
import MotivationalQuote from "@/components/MotivationalQuotes";
import MortgageSlider, {
  SNAP_POINTS,
  snapToNearest,
  getAverageValue,
  formatMoney,
} from "../refinance/_components/MortgageSlider";

// ── Psychological step order ────────────────────────────────────────────────
//  Property (easy, non-threatening start)
//  1  PROP_ST + PROP_DESC     State & property type
//  2  SPEC_HOME               Have you found a home? (auto-advance)
//  3  BUY_TIMEFRAME           When buying? (auto-advance)
//  4  EST_VAL                 Estimated home value slider
//  5  DOWN_PMT                Down payment slider
//
//  Preferences & qualifications
//  6  LOAN_TYPE               (auto-advance)
//  7  CRED_GRADE              (auto-advance)
//  8  VA_STATUS               (auto-advance)
//  9  FHA_BANK_FORECLOSURE    (auto-advance)
//  10 ANNUAL_VERIFIABLE_INCOME (auto-advance)
//  11 NUM_MORTGAGE_LATES      (auto-advance)
//
//  Personal info (maximum commitment)
//  12 ADDRESS + CITY + STATE + ZIP
//  13 FNAME + LNAME + EMAIL + PRI_PHON
// ────────────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 13;
const DEFAULT_HOME_VALUE = 250_000;

const INPUT_CLS =
  "w-full px-4 py-3 rounded-md border border-gray-200 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#3498DB]/30 focus:border-[#3498DB] transition-colors";
const LABEL_CLS = "text-sm font-semibold text-[#1C2833] font-inter";
const STEP_HEADING_CLS = "text-xl md:text-2xl font-extrabold text-[#1C2833] font-inter leading-snug";
const STEP_SUBTEXT_CLS = "text-sm text-gray-500 font-inter mt-1";
const ERROR_TEXT_CLS = "text-xs text-red-500 mt-1";

const PROP_DESC_OPTS = [
  { value: "SINGLE_FAM", label: "Single Family" },
  { value: "MULTI_FAM",  label: "Multi Family" },
  { value: "CONDO",      label: "Condo" },
  { value: "TOWNHOME",   label: "Townhome" },
  { value: "MOBILEHOME", label: "Mobile Home" },
];
const SPEC_HOME_OPTS = [{ value: "YES", label: "Yes" }, { value: "NO", label: "No" }];
const BUY_TIMEFRAME_OPTS = [
  { value: "IMMEDIATELY",       label: "Immediately" },
  { value: "30_DAYS",           label: "1 to 2 Months" },
  { value: "60_DAYS",           label: "2 to 3 Months" },
  { value: "90_DAYS",           label: "3 Months or Longer" },
  { value: "NO_TIME_CONSTRAINT", label: "Not Sure" },
];
const LOAN_TYPE_OPTS = [
  { value: "FIXED",               label: "Fixed" },
  { value: "ADJUSTABLE",          label: "Adjustable" },
  { value: "FIXED_OR_ADJUSTABLE", label: "Don't Know" },
];
const CRED_GRADE_OPTS = [
  { value: "EXCELLENT", label: "Excellent (680+)" },
  { value: "GOOD",      label: "Good (640-679)" },
  { value: "FAIR",      label: "Fair (560-599)" },
  { value: "POOR",      label: "Poor (below 560)" },
];
const YES_NO_OPTS = [{ value: "YES", label: "Yes" }, { value: "NO", label: "No" }];
const LATES_OPTS = [
  { value: "NONE",        label: "None" },
  { value: "ONE",         label: "One" },
  { value: "TWO_OR_MORE", label: "Two or More" },
];

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
  if (areaCode[0] === "0" || areaCode[0] === "1") return "Invalid area code.";
  if (exchange[0] === "0" || exchange[0] === "1") return "Invalid phone number format.";
  if (/^(\d)\1{9}$/.test(digits)) return "Please enter a real phone number.";
  if (digits === "1234567890" || digits === "9876543210") return "Please enter a real phone number.";
  if (exchange === "555" && parseInt(digits.slice(6)) >= 100 && parseInt(digits.slice(6)) <= 199)
    return "Please enter a real phone number.";
  return "";
}

// ── Down payment snap points (5% increments of any home value) ──────────────
function buildDownPmtPoints(homeValue: number, minPct: number): number[] {
  const pts: number[] = [0];
  const maxDown = Math.round(homeValue * 0.9);
  const step = Math.max(5_000, Math.round(homeValue * 0.01));
  const minDown = Math.round(homeValue * (minPct / 100));
  for (let v = minDown > 0 ? minDown : step; v <= maxDown; v += step) pts.push(v);
  if (pts[pts.length - 1] !== maxDown) pts.push(maxDown);
  return pts;
}

// ── Google Places dropdown styles ───────────────────────────────────────────
const PLACES_STYLES = `
  .pac-container {
    border: 1px solid #e5e7eb; border-radius: 6px; margin-top: 4px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.10); font-family: Inter, sans-serif;
    overflow: hidden; padding: 4px 0; background: #fff; z-index: 9999;
  }
  .pac-container::after { display: none; }
  .pac-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
    font-size: 13px; color: #1C2833; cursor: pointer; border-top: none; transition: background 0.15s; }
  .pac-item:hover, .pac-item-selected { background: #eff8ff; }
  .pac-icon { width: 16px; height: 16px; background-image: none !important; flex-shrink: 0; }
  .pac-icon::before { content: ""; display: block; width: 14px; height: 14px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233498DB'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z'/%3E%3C/svg%3E") center/contain no-repeat; }
  .pac-item-query { font-weight: 600; color: #1C2833; font-size: 13px; }
  .pac-matched { color: #3498DB; }
`;

// ── Searchable State Dropdown ───────────────────────────────────────────────
const US_STATE_LABELS: Record<string, string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",
  CT:"Connecticut",DE:"Delaware",DC:"Washington D.C.",FL:"Florida",GA:"Georgia",HI:"Hawaii",
  ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",
  ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",
  MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",
  NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",
  OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",
  TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",
  WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",
};

function StateSelect({ value, onChange, label }: { value: string; onChange: (v: string) => void; label?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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

  return (
    <div ref={containerRef} className="relative">
      {label && <label className={LABEL_CLS}>{label}</label>}
      <button type="button" onClick={() => { setOpen((p) => !p); setQuery(""); }}
        className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm font-inter text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#3498DB]/30 focus:border-[#3498DB] transition-colors bg-white mt-1.5"
      >
        <span className={value ? "text-[#1C2833]" : "text-gray-400"}>
          {value ? `${US_STATE_LABELS[value] ?? value} (${value})` : "Select state"}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input ref={searchRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search state..." className="w-full px-3 py-2 text-sm rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3498DB]/30 focus:border-[#3498DB] font-inter" />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 && <li className="px-4 py-3 text-sm text-gray-400 font-inter">No results</li>}
            {filtered.map(([abbr, name]) => (
              <li key={abbr}>
                <button type="button" onClick={() => { onChange(abbr); setOpen(false); setQuery(""); }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-inter flex items-center justify-between transition-colors
                    ${value === abbr ? "bg-[#eff8ff] text-[#3498DB] font-semibold" : "text-[#1C2833] hover:bg-gray-50"}`}
                >
                  <span>{name}</span><span className="text-xs text-gray-400 font-medium">{abbr}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Email Input with domain autocomplete ────────────────────────────────────
const EMAIL_DOMAINS = ["gmail.com","yahoo.com","outlook.com","hotmail.com","icloud.com","aol.com","protonmail.com","me.com","live.com","msn.com"];

function EmailInput({ value, onChange, onBlur, error, clearError }: {
  value: string; onChange: (v: string) => void; onBlur: () => void; error?: string; clearError: () => void;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSug, setActiveSug] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const buildSuggestions = (val: string) => {
    const atIdx = val.indexOf("@");
    if (atIdx === -1) { setSuggestions([]); return; }
    const afterAt = val.slice(atIdx + 1).toLowerCase();
    const localPart = val.slice(0, atIdx + 1);
    const matched = afterAt === "" ? EMAIL_DOMAINS.map((d) => `${localPart}${d}`)
      : EMAIL_DOMAINS.filter((d) => d.startsWith(afterAt) && d !== afterAt).map((d) => `${localPart}${d}`);
    setSuggestions(matched.slice(0, 5)); setActiveSug(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveSug((p) => Math.min(p + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveSug((p) => Math.max(p - 1, 0)); }
    else if ((e.key === "Enter" || e.key === "Tab") && activeSug >= 0 && suggestions[activeSug]) {
      e.preventDefault(); onChange(suggestions[activeSug]); setSuggestions([]);
    } else if (e.key === "Escape") setSuggestions([]);
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setSuggestions([]);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const cls = "w-full px-4 py-3 rounded-md border text-sm font-inter focus:outline-none focus:ring-2 transition-colors " +
    (error ? "border-red-400 focus:border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-[#3498DB]/30 focus:border-[#3498DB]");

  return (
    <div ref={containerRef} className="relative">
      <input id="email" type="email" value={value}
        onChange={(e) => { const v = e.target.value.replace(/\s/g, ""); onChange(v); clearError(); buildSuggestions(v); }}
        onBlur={() => { setSuggestions([]); onBlur(); }}
        onKeyDown={handleKeyDown}
        placeholder="you@example.com" className={cls} autoComplete="off" />
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden py-1">
          {suggestions.map((s, i) => {
            const atIdx = s.indexOf("@");
            return (
              <li key={s}>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); onChange(s); setSuggestions([]); clearError(); }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-inter flex items-center gap-0.5 transition-colors
                    ${i === activeSug ? "bg-[#eff8ff] text-[#3498DB]" : "hover:bg-gray-50 text-[#1C2833]"}`}
                >
                  <span className="font-semibold">{s.slice(0, atIdx + 1)}</span>
                  <span className={i === activeSug ? "text-[#3498DB]" : "text-gray-400"}>{s.slice(atIdx + 1)}</span>
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

// ── InfoTip ─────────────────────────────────────────────────────────────────
function InfoTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("touchstart", close); };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex ml-1.5 align-middle"
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" onClick={() => setOpen((p) => !p)} aria-label="More information"
        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#1E3A8A]/20 border border-[#1E3A8A]/60 text-[#1E3A8A] hover:bg-[#1E3A8A]/30 hover:border-[#1E3A8A] transition-colors">
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

// ── Main form ───────────────────────────────────────────────────────────────

function BuyHomeForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const zipFromUrl = searchParams.get("zip") ?? "";

  const [currentStep, setCurrentStep] = useState(1);
  const currentStepRef = useRef(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { currentStepRef.current = currentStep; }, [currentStep]);

  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const initAutocomplete = useCallback(() => {
    if (!addressInputRef.current || autocompleteRef.current) return;
    if (typeof google === "undefined" || !google.maps?.places) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(addressInputRef.current, {
      types: ["address"], componentRestrictions: { country: "us" },
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
      setFd((p) => ({ ...p, ADDRESS: [streetNumber, route].filter(Boolean).join(" "), CITY: city, STATE: state, ZIP: zip }));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentStep === 12) { autocompleteRef.current = null; setTimeout(initAutocomplete, 100); }
  }, [currentStep, initAutocomplete]);

  // ── Form state ─────────────────────────────────────────────────────────────
  const [fd, setFd] = useState(() => {
    const estSnap = snapToNearest(DEFAULT_HOME_VALUE);
    return {
      PROP_ZIP: "", PROP_ST: "", PROP_DESC: "",
      SPEC_HOME: "YES", BUY_TIMEFRAME: "60_DAYS",
      _estSnap: estSnap, EST_VAL: getAverageValue(estSnap),
      _downPmt: Math.round(DEFAULT_HOME_VALUE * 0.2), DOWN_PMT: Math.round(DEFAULT_HOME_VALUE * 0.2),
      LOAN_TYPE: "FIXED", CRED_GRADE: "GOOD",
      VA_STATUS: "NO",
      FHA_BANK_FORECLOSURE: "NO", ANNUAL_VERIFIABLE_INCOME: "YES", NUM_MORTGAGE_LATES: "NONE",
      ADDRESS: "", CITY: "", STATE: "", ZIP: "", PRI_PHON: "",
      EMAIL: "", FNAME: "", LNAME: "",
    };
  });

  const update = (patch: Partial<typeof fd>) => setFd((p) => ({ ...p, ...patch }));

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const z = zipFromUrl.replace(/\D/g, "").slice(0, 5);
    if (z.length === 5) update({ PROP_ZIP: z, ZIP: z });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipFromUrl]);

  // Keep EST_VAL in sync
  useEffect(() => {
    update({ EST_VAL: getAverageValue(fd._estSnap) });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fd._estSnap]);

  // Down payment points
  const minDownPct = fd.VA_STATUS === "YES" ? 0 : 5;
  const downPmtPts = useMemo(() => buildDownPmtPoints(fd.EST_VAL, minDownPct), [fd.EST_VAL, minDownPct]);

  const defaultDown = useMemo(() => {
    const target = Math.round(fd.EST_VAL * 0.2);
    return downPmtPts.reduce((prev, curr) => Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev, downPmtPts[0]!);
  }, [fd.EST_VAL, downPmtPts]);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const isLastStep = currentStep === TOTAL_STEPS;

  const autoAdvance = (fromStep: number) => {
    setTimeout(() => {
      if (currentStepRef.current === fromStep) setCurrentStep(Math.min(fromStep + 1, TOTAL_STEPS));
    }, 200);
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:  return fd.PROP_ST !== "" && fd.PROP_DESC !== "";
      case 2:  return fd.SPEC_HOME !== "";
      case 3:  return fd.BUY_TIMEFRAME !== "";
      case 4:  return fd._estSnap >= 50_000;
      case 5:  return fd._downPmt >= 0 && fd._downPmt <= Math.round(fd.EST_VAL * 0.9);
      case 6:  return fd.LOAN_TYPE !== "";
      case 7:  return fd.CRED_GRADE !== "";
      case 8:  return fd.VA_STATUS !== "";
      case 9:  return fd.FHA_BANK_FORECLOSURE !== "";
      case 10: return fd.ANNUAL_VERIFIABLE_INCOME !== "";
      case 11: return fd.NUM_MORTGAGE_LATES !== "";
      case 12: return fd.ADDRESS.trim() !== "" && fd.CITY.trim() !== "" && fd.STATE !== "" && /^\d{5}$/.test(fd.ZIP);
      case 13: {
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
    if (currentStep === 5) update({ DOWN_PMT: fd._downPmt });

    if (isLastStep) {
      setIsSubmitting(true);
      try {
        const certEl = typeof document !== "undefined" && (
          (document.getElementById("xxTrustedFormCertUrl_0") as HTMLInputElement)?.value ||
          (document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement)?.value
        );
        const payload = {
          PRODUCT: "PP_NEWHOME",
          PROP_ST: fd.PROP_ST, PROP_ZIP: fd.PROP_ZIP, PROP_DESC: fd.PROP_DESC,
          SPEC_HOME: fd.SPEC_HOME, BUY_TIMEFRAME: fd.BUY_TIMEFRAME,
          EST_VAL: fd.EST_VAL, DOWN_PMT: fd.DOWN_PMT,
          LOAN_TYPE: fd.LOAN_TYPE, CRED_GRADE: fd.CRED_GRADE, VA_STATUS: fd.VA_STATUS,
          FHA_BANK_FORECLOSURE: fd.FHA_BANK_FORECLOSURE,
          ANNUAL_VERIFIABLE_INCOME: fd.ANNUAL_VERIFIABLE_INCOME,
          NUM_MORTGAGE_LATES: fd.NUM_MORTGAGE_LATES,
          EMAIL: fd.EMAIL.trim(), FNAME: fd.FNAME.trim(), LNAME: fd.LNAME.trim(),
          ADDRESS: fd.ADDRESS.trim(), CITY: fd.CITY.trim(), STATE: fd.STATE,
          ZIP: fd.ZIP, PRI_PHON: fd.PRI_PHON.replace(/\D/g, ""),
          trustedformCertUrl: certEl || "",
        };
        const res = await fetch("/api/submit-buy-home", {
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
      setCurrentStep(Math.min(currentStep + 1, TOTAL_STEPS));
    }
  };

  const handleBack = () => setCurrentStep(Math.max(currentStep - 1, 1));
  const clearError = (f: string) => setErrors((p) => { const n = { ...p }; delete n[f]; return n; });
  const setError = (f: string, m: string) => setErrors((p) => ({ ...p, [f]: m }));

  const validateName = (field: "FNAME" | "LNAME", value: string) => {
    const v = value.trim();
    const label = field === "FNAME" ? "First name" : "Last name";
    if (v.length < 2) { setError(field, `${label} must be at least 2 characters.`); return; }
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
    const msg = checkPhoneValidity(fd.PRI_PHON.replace(/\D/g, ""));
    if (msg) setError("PRI_PHON", msg); else clearError("PRI_PHON");
  };

  const downPct = fd.EST_VAL > 0 ? Math.round((fd._downPmt / fd.EST_VAL) * 100) : 0;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-3">
        <MotivationalQuote step={currentStep} formType="buy-home" />
      </div>
      <div className="mb-6">
        <ProgressBar type="1" currentStep={currentStep} totalSteps={TOTAL_STEPS}
          foregroundColor="#3498DB" backgroundColor="#dbeafe"
          icon={<Home size={18} className="text-[#3498DB]" />} />
      </div>

      {!isLastStep && (() => {
        const stepsLeft = TOTAL_STEPS - currentStep;
        const phrase = stepsLeft === 1
          ? "Complete 1 more question to view updated rates."
          : stepsLeft <= 3
            ? "Complete 2-3 additional questions to view updated rates."
            : `Complete ${stepsLeft} additional questions to view updated rates.`;
        return (
          <div className="mb-5 flex gap-2 rounded-lg border border-[#dc2626]/20 bg-[#fef2f2]/80 p-3 text-left">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 rounded-full bg-[#dc2626]" aria-hidden />
            <div>
              <p className="text-sm font-bold text-[#b91c1c]">{phrase}</p>
              <p className="mt-0.5 text-xs text-[#991b1b]/90">
                Note: If you abandon this form and rates rise tomorrow, you&apos;ll lose access to today&apos;s lower estimate.
              </p>
            </div>
          </div>
        );
      })()}

      <div className="rounded-lg bg-white border border-gray-200 shadow-sm p-6 md:p-8">

        {/* ── 1 · PROP_ST + PROP_DESC ── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              Where are you looking to buy?
              <InfoTip text="The state where the property you'd like to purchase is located." />
            </h2>
            <StateSelect label="Property state" value={fd.PROP_ST} onChange={(v) => update({ PROP_ST: v })} />
            <div className="border-t border-gray-100 pt-4 space-y-4">
              <p className={LABEL_CLS}>What type of property?</p>
              <RadioButtonGroup name="propDesc" options={PROP_DESC_OPTS} value={fd.PROP_DESC}
                onChange={(v) => update({ PROP_DESC: v })} type="1" layout="column" />
            </div>
          </div>
        )}

        {/* ── 2 · SPEC_HOME (auto-advance) ── */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              Have you found a home?
              <InfoTip text="Let us know if you've already identified a specific property or if you're still looking." />
            </h2>
            <RadioButtonGroup name="specHome" options={SPEC_HOME_OPTS} value={fd.SPEC_HOME}
              onChange={(v) => { update({ SPEC_HOME: v }); autoAdvance(2); }}
              type="1" layout="column" />
          </div>
        )}

        {/* ── 3 · BUY_TIMEFRAME (auto-advance) ── */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              When are you looking to buy?
              <InfoTip text="Your timeline helps us match you with the right loan programs and rate locks." />
            </h2>
            <RadioButtonGroup name="buyTimeframe" options={BUY_TIMEFRAME_OPTS} value={fd.BUY_TIMEFRAME}
              onChange={(v) => { update({ BUY_TIMEFRAME: v }); autoAdvance(3); }}
              type="1" layout="column" />
          </div>
        )}

        {/* ── 4 · EST_VAL ── */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              What is the estimated home value?
              <InfoTip text="Your best estimate of the purchase price or home value. Don't worry about being exact." />
            </h2>
            <MortgageSlider id="estVal" label="" value={fd._estSnap}
              onChange={(v) => update({ _estSnap: v })} />
          </div>
        )}

        {/* ── 5 · DOWN_PMT ── */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              How much can you put down?
              <InfoTip text="A larger down payment can lower your monthly payment and may help you avoid private mortgage insurance (PMI)." />
            </h2>
            <div className="flex items-baseline justify-center gap-2 py-1">
              <span className="text-[2rem] font-extrabold text-[#3498DB] font-inter leading-none">
                {formatMoney(fd._downPmt)}
              </span>
              <span className="text-sm font-semibold text-gray-400 font-inter">({downPct}%)</span>
            </div>
            <div className="px-1 py-4 sm:py-2 touch-none select-none">
              <style>{`
                #downPmt { -webkit-tap-highlight-color: transparent; touch-action: none; }
                #downPmt::-webkit-slider-thumb { -webkit-appearance:none; height:22px; width:22px; border-radius:50%;
                  background:#3498DB; border:3px solid white; box-shadow:0 1px 6px rgba(52,152,219,0.45); cursor:pointer; transition: transform 0.15s ease; }
                #downPmt::-moz-range-thumb { height:22px; width:22px; border-radius:50%;
                  background:#3498DB; border:3px solid white; box-shadow:0 1px 6px rgba(52,152,219,0.45); cursor:pointer; transition: transform 0.15s ease; }
                @media (max-width: 768px), (hover: none) {
                  #downPmt::-webkit-slider-thumb { height: 28px; width: 28px; border-width: 3px; }
                  #downPmt::-moz-range-thumb { height: 28px; width: 28px; border-width: 3px; }
                }
              `}</style>
              <input id="downPmt" type="range" min={0} max={downPmtPts.length - 1} step={1}
                value={(() => { const idx = downPmtPts.indexOf(fd._downPmt); return idx >= 0 ? idx : 0; })()}
                onChange={(e) => { const v = downPmtPts[parseInt(e.target.value, 10)] ?? 0; update({ _downPmt: v }); }}
                className="w-full h-2 min-h-[44px] sm:min-h-0 rounded-full appearance-none cursor-pointer outline-none accent-[#3498DB]"
                style={{ background: `linear-gradient(to right, #3498DB ${((downPmtPts.indexOf(fd._downPmt) >= 0 ? downPmtPts.indexOf(fd._downPmt) : 0) / Math.max(downPmtPts.length - 1, 1)) * 100}%, #dbeafe ${((downPmtPts.indexOf(fd._downPmt) >= 0 ? downPmtPts.indexOf(fd._downPmt) : 0) / Math.max(downPmtPts.length - 1, 1)) * 100}%)` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-gray-400 font-inter px-1">
              <span>{formatMoney(downPmtPts[0] ?? 0)}</span>
              <span>{formatMoney(downPmtPts[downPmtPts.length - 1] ?? 0)}</span>
            </div>
          </div>
        )}

        {/* ── 6 · LOAN_TYPE (auto-advance) ── */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              What type of interest rate do you prefer?
              <InfoTip text="Fixed rates stay the same for the life of the loan. Adjustable rates may start lower but can change over time." />
            </h2>
            <RadioButtonGroup name="loanType" options={LOAN_TYPE_OPTS} value={fd.LOAN_TYPE}
              onChange={(v) => { update({ LOAN_TYPE: v }); autoAdvance(6); }}
              type="1" layout="column" />
          </div>
        )}

        {/* ── 7 · CRED_GRADE (auto-advance) ── */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div>
              <h2 className={STEP_HEADING_CLS}>
                How would you rate your credit?
                <InfoTip text="Excellent: 680+, Good: 640-679, Fair: 560-599, Poor: below 560. We won't run a credit check." />
              </h2>
              <p className={STEP_SUBTEXT_CLS}>This helps us find the best rates for your situation.</p>
            </div>
            <RadioButtonGroup name="credGrade" options={CRED_GRADE_OPTS} value={fd.CRED_GRADE}
              onChange={(v) => { update({ CRED_GRADE: v }); autoAdvance(7); }}
              type="1" layout="column" />
          </div>
        )}

        {/* ── 8 · VA_STATUS (auto-advance) ── */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <h2 className={STEP_HEADING_CLS}>
              Are you or your spouse a servicemember or veteran?
              <InfoTip text="VA loans offer exclusive benefits including no down payment and competitive rates for eligible veterans and active-duty military." />
            </h2>
            <RadioButtonGroup name="vaStatus" options={YES_NO_OPTS} value={fd.VA_STATUS}
              onChange={(v) => { update({ VA_STATUS: v }); autoAdvance(8); }}
              type="1" layout="column" />
          </div>
        )}

        {/* ── 9 · FHA_BANK_FORECLOSURE (auto-advance) ── */}
        {currentStep === 9 && (
          <div className="space-y-6">
            <div>
              <h2 className={STEP_HEADING_CLS}>
                Have you had a bankruptcy or foreclosure in the past 3 years?
                <InfoTip text="This helps determine eligibility for certain loan programs. A past event won't necessarily disqualify you." />
              </h2>
              <p className={STEP_SUBTEXT_CLS}>This won't disqualify you -- we have options for every situation.</p>
            </div>
            <RadioButtonGroup name="fha" options={YES_NO_OPTS} value={fd.FHA_BANK_FORECLOSURE}
              onChange={(v) => { update({ FHA_BANK_FORECLOSURE: v }); autoAdvance(9); }}
              type="1" layout="column" />
          </div>
        )}

        {/* ── 10 · ANNUAL_VERIFIABLE_INCOME (auto-advance) ── */}
        {currentStep === 10 && (
          <div className="space-y-6">
            <div>
              <h2 className={STEP_HEADING_CLS}>
                Are you currently employed?
                <InfoTip text="Verifiable income helps qualify for more loan programs with better rates. Self-employment also counts." />
              </h2>
              <p className={STEP_SUBTEXT_CLS}>This helps us match you with the right programs.</p>
            </div>
            <RadioButtonGroup name="income" options={YES_NO_OPTS} value={fd.ANNUAL_VERIFIABLE_INCOME}
              onChange={(v) => { update({ ANNUAL_VERIFIABLE_INCOME: v }); autoAdvance(10); }}
              type="1" layout="column" />
          </div>
        )}

        {/* ── 11 · NUM_MORTGAGE_LATES (auto-advance) ── */}
        {currentStep === 11 && (
          <div className="space-y-6">
            <div>
              <h2 className={STEP_HEADING_CLS}>
                Any late mortgage payments in the past year?
                <InfoTip text="Recent payment history is a key factor in determining your eligibility and rate options." />
              </h2>
              <p className={STEP_SUBTEXT_CLS}>Your recent history helps determine your best options.</p>
            </div>
            <RadioButtonGroup name="lates" options={LATES_OPTS} value={fd.NUM_MORTGAGE_LATES}
              onChange={(v) => { update({ NUM_MORTGAGE_LATES: v }); autoAdvance(11); }}
              type="1" layout="column" />
          </div>
        )}

        {/* ── 12 · Address ── */}
        {currentStep === 12 && (
          <div className="space-y-6">
            <style>{PLACES_STYLES}</style>
            <h2 className={STEP_HEADING_CLS}>Your current address</h2>
            <div className="space-y-1.5">
              <label htmlFor="address" className={LABEL_CLS}>Street Address</label>
              <input ref={addressInputRef} id="address" value={fd.ADDRESS}
                onChange={(e) => update({ ADDRESS: e.target.value })}
                placeholder="Start typing your address..." className={INPUT_CLS} autoComplete="off" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div>
                <label htmlFor="city" className={LABEL_CLS}>City</label>
                <input id="city" value={fd.CITY} onChange={(e) => update({ CITY: e.target.value })} placeholder="New York" className={`${INPUT_CLS} mt-1.5`} />
              </div>
              <StateSelect label="State" value={fd.STATE} onChange={(v) => update({ STATE: v })} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="zip" className={LABEL_CLS}>ZIP Code</label>
              <input id="zip" value={fd.ZIP} onChange={(e) => update({ ZIP: e.target.value.replace(/\D/g, "").slice(0, 5) })} placeholder="ZIP Code" className={INPUT_CLS} inputMode="numeric" />
            </div>
          </div>
        )}

        {/* ── 13 · Contact info ── */}
        {currentStep === 13 && (
          <div className="space-y-5">
            <h2 className={STEP_HEADING_CLS}>Almost there! Your contact information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="fname" className={LABEL_CLS}>First Name</label>
                <input id="fname" value={fd.FNAME}
                  onChange={(e) => { update({ FNAME: e.target.value }); clearError("FNAME"); }}
                  onBlur={() => validateName("FNAME", fd.FNAME)} placeholder="John"
                  className={`${INPUT_CLS} ${errors.FNAME ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`} />
                {errors.FNAME && <p className={ERROR_TEXT_CLS}>{errors.FNAME}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lname" className={LABEL_CLS}>Last Name</label>
                <input id="lname" value={fd.LNAME}
                  onChange={(e) => { update({ LNAME: e.target.value }); clearError("LNAME"); }}
                  onBlur={() => validateName("LNAME", fd.LNAME)} placeholder="Doe"
                  className={`${INPUT_CLS} ${errors.LNAME ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`} />
                {errors.LNAME && <p className={ERROR_TEXT_CLS}>{errors.LNAME}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className={LABEL_CLS}>Email</label>
              <EmailInput value={fd.EMAIL} onChange={(v) => update({ EMAIL: v })}
                onBlur={validateEmail} error={errors.EMAIL} clearError={() => clearError("EMAIL")} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className={LABEL_CLS}>Phone Number</label>
              <input id="phone" type="tel" value={formatPhone(fd.PRI_PHON)}
                onChange={(e) => { update({ PRI_PHON: e.target.value.replace(/\D/g, "").slice(0, 10) }); clearError("PRI_PHON"); }}
                onBlur={validatePhone} placeholder="(555) 123-4567"
                className={`${INPUT_CLS} ${errors.PRI_PHON ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`} />
              {errors.PRI_PHON && <p className={ERROR_TEXT_CLS}>{errors.PRI_PHON}</p>}
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <button type="button" onClick={handleBack}
              className="flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm border-2 border-gray-200 text-gray-600 hover:border-[#3498DB] hover:text-[#3498DB] transition-all duration-200">
              <ArrowLeft size={17} /> Back
            </button>
          )}
          <button type="button" onClick={handleNext} disabled={isSubmitting || !isStepValid()}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-sm transition-all duration-200
              ${isSubmitting || !isStepValid() ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#3498DB] text-white hover:bg-[#246a99] shadow-md hover:shadow-lg"}`}>
            {isSubmitting ? (<><Loader2 size={17} className="animate-spin" /> Submitting...</>) : isLastStep ? "Submit Details" : "Continue"}
          </button>
        </div>
      </div>

      {isLastStep && (
        <p className="text-[10px] leading-relaxed text-gray-400 font-inter mt-4 px-1">
          By clicking Submit Details, you agree to: (1) our{" "}
          <a href="/terms-of-use" target="_blank" className="underline hover:text-gray-600">TERMS OF USE</a>,
          {" "}which include a Class Waiver and Mandatory Arbitration Agreement, (2) our{" "}
          <a href="/privacy-policy" target="_blank" className="underline hover:text-gray-600">PRIVACY POLICY</a>,
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

      {currentStep === 1 && (
        <div className="mt-4">
          <button type="button"
            onClick={() => router.push(fd.PROP_ZIP ? `/form/refinance?zip=${fd.PROP_ZIP}` : "/form/refinance")}
            className="w-full py-4 rounded-md font-semibold text-sm border-2 border-[#1e3a5f] text-[#1e3a5f] bg-white hover:bg-[#1e3a5f] hover:text-white transition-all duration-200">
            Looking to refinance instead?
          </button>
        </div>
      )}

      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
        strategy="lazyOnload" onLoad={initAutocomplete} />
    </div>
  );
}

export default function BuyHomePage() {
  return <Suspense><BuyHomeForm /></Suspense>;
}
