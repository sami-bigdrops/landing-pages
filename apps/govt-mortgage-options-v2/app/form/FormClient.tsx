"use client";

import React, { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Loader2, Info } from "lucide-react";
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group";
import { TrustedForm, useUtmParams, getCookie } from "@workspace/lp-core";
import { AnnualIncomeInput } from "./_components/AnnualIncomeInput";
import PartnersModal from "./_components/PartnersModal";

const ZIP_COOKIE_NAME = "zipCode";
const FORM_DRAFT_KEY = "govt-mortgage-options-v2:form-draft:v11";

const TOTAL_STEPS = 9;

const ACCENT = "#249E45";
const ACCENT_BG = "#E8F8EE";

const INPUT_CLS =
  "w-full px-4 py-3 rounded-md border border-gray-200 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#249E45]/20 focus:border-[#249E45] transition-colors";
const LABEL_CLS = "text-sm font-medium text-gray-600 font-inter";
const STEP_HEADING_CLS = "text-xl md:text-2xl font-extrabold text-[#1C2833] font-inter leading-snug";
const STEP_LEAD_CLS = "text-sm md:text-base text-gray-500 font-inter leading-relaxed";
const STEP_SUBTEXT_CLS = "text-sm text-gray-500 font-inter leading-relaxed";
const ERROR_TEXT_CLS = "text-xs text-red-500 mt-1";
const RADIO_OPTION_CLS = "hover:!bg-[#E8F8EE] hover:!border-[#249E45]";
const RADIO_SELECTED_BG = ACCENT_BG;
const RADIO_SELECTED_BORDER = ACCENT;
const RADIO_INDICATOR = ACCENT;

const DEFAULT_EST_VAL = 515_000;
const DEFAULT_BAL_ONE = 265_000;
const DEFAULT_ANNUAL_INCOME = 85_000;

type FormDataState = {
  PROP_ZIP: string;
  EST_VAL: number;
  BAL_ONE: number;
  PROP_DESC: string;
  PROP_PURP: string;
  MTG_ONE_INT: number;
  MTG_TWO: string;
  EMPLOYMENT_STATUS: string;
  MTG_TWO_INT: number;
  BAL_TWO: number;
  ADD_CASH: number;
  LOAN_TYPE: string;
  CRED_GRADE: string;
  LOAN_PURPOSE: string;
  ANNUAL_INCOME: number;
  FHA_STATUS: string;
  VA_STATUS: string;
  FHA_BANK_FORECLOSURE: string;
  ANNUAL_VERIFIABLE_INCOME: string;
  NUM_MORTGAGE_LATES: string;
  DOB: string;
  EMAIL: string;
  FNAME: string;
  LNAME: string;
  ADDRESS: string;
  CITY: string;
  STATE: string;
  ZIP: string;
  PRI_PHON: string;
};

type FormDraft = {
  step: number;
  fd: FormDataState;
};

function getDefaultFormData(): FormDataState {
  return {
    PROP_ZIP: "",
    EST_VAL: DEFAULT_EST_VAL,
    BAL_ONE: DEFAULT_BAL_ONE,
    PROP_DESC: "",
    PROP_PURP: "",
    MTG_ONE_INT: 5.25,
    MTG_TWO: "NO",
    EMPLOYMENT_STATUS: "",
    MTG_TWO_INT: 6,
    BAL_TWO: 0,
    ADD_CASH: 0,
    LOAN_TYPE: "FIXED",
    CRED_GRADE: "",
    LOAN_PURPOSE: "",
    ANNUAL_INCOME: DEFAULT_ANNUAL_INCOME,
    FHA_STATUS: "",
    VA_STATUS: "",
    FHA_BANK_FORECLOSURE: "NO",
    ANNUAL_VERIFIABLE_INCOME: "YES",
    NUM_MORTGAGE_LATES: "NONE",
    DOB: "",
    EMAIL: "",
    FNAME: "",
    LNAME: "",
    ADDRESS: "",
    CITY: "",
    STATE: "",
    ZIP: "",
    PRI_PHON: "",
  };
}

function loadFormDraft(): FormDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(FORM_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FormDraft;
    if (!parsed || typeof parsed.step !== "number" || !parsed.fd) return null;
    return {
      step: Math.min(Math.max(Math.round(parsed.step), 1), TOTAL_STEPS),
      fd: { ...getDefaultFormData(), ...parsed.fd },
    };
  } catch {
    return null;
  }
}

function saveFormDraft(draft: FormDraft) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore quota / private mode */
  }
}

function clearFormDraft() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(FORM_DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

const PROP_DESC_OPTS = [
  { value: "SINGLE_FAM", label: "Single Family Home" },
  { value: "MULTI_FAM", label: "Multi-Family Home" },
  { value: "CONDO", label: "Condominium" },
  { value: "MOBILEHOME", label: "Mobile Home" },
];

const PROP_PURP_OPTS = [
  { value: "PRIMARY", label: "Primary residence" },
  { value: "SECONDARY", label: "Second home" },
  { value: "INVESTMENT", label: "Investment or rental" },
];

const LOAN_PURPOSE_OPTS = [
  { value: "Home improvement", label: "Home improvement" },
  { value: "Debt consolidation", label: "Debt consolidation" },
  { value: "Major purchase", label: "Major purchase" },
  { value: "Education", label: "Education" },
  { value: "Business expansion", label: "Business expansion" },
  { value: "Emergency fund", label: "Emergency fund" },
  { value: "Other", label: "Other" },
];

const CRED_GRADE_OPTS = [
  { value: "780+", label: "780+" },
  { value: "760-779", label: "760 - 779" },
  { value: "740-759", label: "740 - 759" },
  { value: "720-739", label: "720 - 739" },
  { value: "700-719", label: "700 - 719" },
  { value: "680-699", label: "680 - 699" },
  { value: "660-679", label: "660 - 679" },
  { value: "640-659", label: "640 - 659" },
  { value: "620-639", label: "620 - 639" },
  { value: "580-619", label: "580 - 619" },
];

const YES_NO_OPTS = [
  { value: "NO", label: "No" },
  { value: "YES", label: "Yes" },
];

function mapCredGradeToApi(range: string): string {
  let category = "Poor";
  if (["780+", "760-779", "740-759", "720-739"].includes(range)) category = "Excellent";
  else if (["700-719", "680-699"].includes(range)) category = "Good";
  else if (["660-679", "640-659"].includes(range)) category = "Fair";
  return `${category}(${range})`;
}

const CRED_OPTION_CLS =
  "justify-center text-center hover:!bg-[#E8F8EE] hover:!border-[#249E45] text-[#1E3A8A]";
const CRED_LABEL_CLS = "w-full items-center text-center font-semibold text-[#1E3A8A]";


function formatCurrency(value: number): string {
  if (!value) return "";
  return `$${value.toLocaleString("en-US")}`;
}

function parseCurrency(raw: string): number {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return 0;
  return Math.min(parseInt(digits, 10), 99_999_999);
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
  .pac-item:hover, .pac-item-selected { background: #E8F8EE; }
  .pac-icon {
    width: 16px; height: 16px;
    background-image: none !important;
    flex-shrink: 0;
  }
  .pac-icon::before {
    content: "";
    display: block;
    width: 14px; height: 14px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23249E45'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z'/%3E%3C/svg%3E") center/contain no-repeat;
  }
  .pac-item-query { font-weight: 600; color: #1C2833; font-size: 13px; }
  .pac-matched { color: #249E45; }
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
        className="w-full px-4 py-3 rounded-md border border-gray-200 text-sm font-inter text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#249E45]/20 focus:border-[#249E45] transition-colors bg-white"
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
              className="w-full px-3 py-2 text-sm rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#249E45]/20 focus:border-[#249E45] font-inter"
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
                    ${value === abbr ? "bg-[#E8F8EE] text-[#249E45] font-semibold" : "text-[#1C2833] hover:bg-[#E8F8EE] hover:text-[#249E45]"}`}
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
      : "border-gray-200 focus:ring-[#249E45]/20 focus:border-[#249E45]");

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
                    ${i === activeSug ? "bg-[#E8F8EE] text-[#249E45]" : "hover:bg-[#E8F8EE] hover:text-[#249E45] text-[#1C2833]"}`}
                >
                  <span className="font-semibold">{local}</span>
                  <span className={i === activeSug ? "text-[#249E45]" : "text-gray-400"}>{domain}</span>
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
        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#249E45]/15 border border-[#249E45]/50 text-[#249E45] hover:bg-[#249E45]/25 hover:border-[#249E45] transition-colors"
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
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const currentStepRef = useRef(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draftReady, setDraftReady] = useState(false);

  const addressInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

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
  }, []);

  useEffect(() => { currentStepRef.current = currentStep; }, [currentStep]);

  // ── Form state ─────────────────────────────────────────────────────────────
  const [fd, setFd] = useState<FormDataState>(getDefaultFormData);

  const update = (patch: Partial<FormDataState>) => setFd((p) => ({ ...p, ...patch }));

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const draft = loadFormDraft();
    if (draft) {
      setFd(draft.fd);
      setCurrentStep(draft.step);
      currentStepRef.current = draft.step;
    }

    const z = (getCookie(ZIP_COOKIE_NAME) ?? "").replace(/\D/g, "").slice(0, 5);
    if (z.length === 5) {
      setFd((p) => ({
        ...p,
        PROP_ZIP: p.PROP_ZIP || z,
        ZIP: p.ZIP || z,
      }));
    }

    setDraftReady(true);
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    saveFormDraft({ step: currentStep, fd });
  }, [currentStep, fd, draftReady]);

  useEffect(() => {
    if (currentStep === 8) {
      autocompleteRef.current = null;
      setTimeout(initAutocomplete, 100);
    }
  }, [currentStep, initAutocomplete]);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  function getNextStep(cur: number): number {
    return Math.min(cur + 1, TOTAL_STEPS);
  }

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
      case 2: return fd.PROP_PURP !== "";
      case 3: return fd.EST_VAL >= 50_000 && fd.BAL_ONE >= 1_000 && fd.BAL_ONE < fd.EST_VAL;
      case 4: return fd.CRED_GRADE !== "";
      case 5: return fd.LOAN_PURPOSE !== "";
      case 6: return fd.ANNUAL_INCOME >= 10_000;
      case 7: return fd.VA_STATUS !== "";
      case 8: return fd.ADDRESS.trim() !== "" && fd.CITY.trim() !== "" && fd.STATE !== "" && /^\d{5}$/.test(fd.ZIP);
      case 9: {
        const fnOk = fd.FNAME.trim().length >= 2 && /^[A-Za-z\s'.-]+$/.test(fd.FNAME.trim()) && !/^(.)\1+$/.test(fd.FNAME.trim().replace(/\s/g, "")) && !/^(test|fake|asdf|qwerty|xxxx|aaaa|bbbb|cccc|name|user|admin|none|null|n\/a)$/i.test(fd.FNAME.trim());
        const lnOk = fd.LNAME.trim().length >= 2 && /^[A-Za-z\s'.-]+$/.test(fd.LNAME.trim()) && !/^(.)\1+$/.test(fd.LNAME.trim().replace(/\s/g, "")) && !/^(test|fake|asdf|qwerty|xxxx|aaaa|bbbb|cccc|name|user|admin|none|null|n\/a)$/i.test(fd.LNAME.trim());
        return fnOk && lnOk && fd.EMAIL.includes("@") && fd.EMAIL.includes(".") && checkPhoneValidity(fd.PRI_PHON.replace(/\D/g, "")) === "";
      }
      default: return false;
    }
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleNext = async () => {
    if (!isStepValid()) return;

    if (isLastStep) {
      setIsSubmitting(true);
      try {
        const certEl = typeof document !== "undefined" && (
          (document.getElementById("xxTrustedFormCertUrl_0") as HTMLInputElement)?.value ||
          (document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement)?.value
        );
        const payload = {
          PRODUCT: "PP_REFI",
          PROP_ZIP: fd.PROP_ZIP, 
          PROP_DESC: fd.PROP_DESC, 
          PROP_PURP: fd.PROP_PURP || "PRIMARY",
          CRED_GRADE: mapCredGradeToApi(fd.CRED_GRADE),
          loanpurpose: fd.LOAN_PURPOSE,
          ANNUAL_INCOME: fd.ANNUAL_INCOME,
          EST_VAL: fd.EST_VAL, 
          BAL_ONE: fd.BAL_ONE,
          MTG_ONE_INT: fd.MTG_ONE_INT, 
          MTG_TWO: fd.MTG_TWO,
          EMPLOYMENT_STATUS: fd.EMPLOYMENT_STATUS || "EMPLOYED",
          BAL_TWO: fd.MTG_TWO === "YES" ? fd.BAL_TWO : 0,
          MTG_TWO_INT: fd.MTG_TWO === "YES" ? fd.MTG_TWO_INT : 0,
          ADD_CASH: 0,
          LOAN_TYPE: fd.LOAN_TYPE, 
          FHA_STATUS: fd.FHA_STATUS || "NO", 
          VA_STATUS: fd.VA_STATUS || "NO",
          FHA_BANK_FORECLOSURE: fd.FHA_BANK_FORECLOSURE,
          ANNUAL_VERIFIABLE_INCOME: fd.ANNUAL_VERIFIABLE_INCOME,
          NUM_MORTGAGE_LATES: fd.NUM_MORTGAGE_LATES,
          DOB: "",
          EMAIL: fd.EMAIL.trim(), 
          FNAME: fd.FNAME.trim(), 
          LNAME: fd.LNAME.trim(),
          ADDRESS: fd.ADDRESS.trim(), 
          CITY: fd.CITY.trim(), 
          STATE: fd.STATE,
          ZIP: fd.ZIP, 
          PRI_PHON: fd.PRI_PHON.replace(/\D/g, ""),
          trustedformCertUrl: certEl || "",
        };
        const res = await fetch("/api/submit-refinance", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json();
        if (result.success && result.redirectUrl) {
          clearFormDraft();
          router.push(result.redirectUrl);
        } else { alert(result.error || "Submission failed. Please try again."); setIsSubmitting(false); }
      } catch {
        alert("An error occurred. Please try again."); setIsSubmitting(false);
      }
    } else {
      setCurrentStep(getNextStep(currentStep));
    }
  };

  const clearError = (f: string) => setErrors((p) => { const n = { ...p }; delete n[f]; return n; });
  const setError = (f: string, m: string) => setErrors((p) => ({ ...p, [f]: m }));
  const validateName = (field: "FNAME" | "LNAME", value: string) => {
    const v = value.trim();
    const label = field === "FNAME" ? "First name" : "Last name";
    if (v.length < 2) { setError(field, `${label} must be at least 2 characters.`); return; }
    if (v.length > 50) { setError(field, `${label} is too long.`); return; }
    if (!/^[A-Za-z\s'.-]+$/.test(v)) { setError(field, `${label} contains invalid characters.`); return; }
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={(e) => e.preventDefault()} className="rounded-lg bg-white border border-gray-200 shadow-sm p-6 md:p-8">
        <TrustedForm />

        {/* ── 1 · PROP_DESC (auto-advance) ── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <p className={STEP_LEAD_CLS}>
                Ordinary homeowners may qualify for new programs in 2026.
              </p>
              <h2 className={STEP_HEADING_CLS}>
                Confirm your home type below
                <InfoTip text="We use your property type to match you with the best available refinancing programs in your area." />
              </h2>
            </div>
            <RadioButtonGroup
              name="propDesc"
              options={PROP_DESC_OPTS}
              value={fd.PROP_DESC}
              onChange={(v) => { update({ PROP_DESC: v }); autoAdvance(1); }}
              type="1"
              layout="column"
              optionClassName={RADIO_OPTION_CLS}
              selectedOptionBackgroundColor={RADIO_SELECTED_BG}
              selectedOptionBorderColor={RADIO_SELECTED_BORDER}
              selectedIndicatorColor={RADIO_INDICATOR}
            />
          </div>
        )}

        {/* ── 2 · PROP_PURP / PropertyUse ── */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className={STEP_HEADING_CLS}>
                How are you using this property?
              </h2>
              <p className={STEP_SUBTEXT_CLS}>
                How you use the home can affect the lenders and rates you see.
              </p>
            </div>
            <RadioButtonGroup
              name="propPurp"
              options={PROP_PURP_OPTS}
              value={fd.PROP_PURP}
              onChange={(v) => { update({ PROP_PURP: v }); autoAdvance(2); }}
              type="1"
              layout="column"
              optionClassName={RADIO_OPTION_CLS}
              selectedOptionBackgroundColor={RADIO_SELECTED_BG}
              selectedOptionBorderColor={RADIO_SELECTED_BORDER}
              selectedIndicatorColor={RADIO_INDICATOR}
            />
          </div>
        )}

        {/* ── 3 · EST_VAL + BAL_ONE ── */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className={STEP_HEADING_CLS}>Confirm your property details</h2>
              <p className={STEP_SUBTEXT_CLS}>
                Estimates are fine — we use them to match available rates.
              </p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="estVal" className={LABEL_CLS}>Estimated Property Value</label>
              <input
                id="estVal"
                value={formatCurrency(fd.EST_VAL)}
                onChange={(e) => update({ EST_VAL: parseCurrency(e.target.value) })}
                placeholder="$375,000"
                className={`${INPUT_CLS} h-12`}
                inputMode="numeric"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="balOne" className={LABEL_CLS}>Estimated Mortgage Balance</label>
              <input
                id="balOne"
                value={formatCurrency(fd.BAL_ONE)}
                onChange={(e) => update({ BAL_ONE: parseCurrency(e.target.value) })}
                placeholder="$265,000"
                className={`${INPUT_CLS} h-12`}
                inputMode="numeric"
              />
            </div>

            <div className="rounded-lg bg-[#E8F8EE] border border-[#249E45]/20 p-4 space-y-1.5">
              <p className="text-sm font-semibold text-[#249E45] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#249E45] shrink-0" />
                Complete 2–3 additional questions to view updated rates.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Note: If you abandon this form and rates rise tomorrow, you&apos;ll lose access to today&apos;s lower estimate.
              </p>
            </div>
          </div>
        )}

        {/* ── 4 · CRED_GRADE (auto-advance) ── */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className={STEP_HEADING_CLS}>
                How would you rate your credit?
                <InfoTip text="Choose your best estimate. We will not run a credit check on this step." />
              </h2>
              <p className={STEP_SUBTEXT_CLS}>This helps us find the best rates for your situation.</p>
            </div>
            <RadioButtonGroup
              name="credGrade"
              options={CRED_GRADE_OPTS}
              value={fd.CRED_GRADE}
              onChange={(v) => { update({ CRED_GRADE: v }); autoAdvance(4); }}
              type="3"
              layout="row"
              className="!grid grid-cols-2 gap-3"
              optionClassName={CRED_OPTION_CLS}
              optionLabelClassName={CRED_LABEL_CLS}
              selectedOptionBackgroundColor={RADIO_SELECTED_BG}
              selectedOptionBorderColor={RADIO_SELECTED_BORDER}
            />
          </div>
        )}

        {/* ── 5 · loanpurpose ── */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className={STEP_HEADING_CLS}>
                How are you going to use the money?
              </h2>
              <p className={STEP_SUBTEXT_CLS}>
                Select the option that best matches your goal.
              </p>
            </div>
            <RadioButtonGroup
              name="loanPurpose"
              options={LOAN_PURPOSE_OPTS}
              value={fd.LOAN_PURPOSE}
              onChange={(v) => { update({ LOAN_PURPOSE: v }); autoAdvance(5); }}
              type="1"
              layout="column"
              optionClassName={RADIO_OPTION_CLS}
              selectedOptionBackgroundColor={RADIO_SELECTED_BG}
              selectedOptionBorderColor={RADIO_SELECTED_BORDER}
              selectedIndicatorColor={RADIO_INDICATOR}
            />
          </div>
        )}

        {/* ── 6 · Annual income ── */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className={STEP_HEADING_CLS}>
                What is your annual income?
              </h2>
              <p className={STEP_SUBTEXT_CLS}>
                Include wages, bonuses, and other regular income before taxes.
              </p>
            </div>
            <AnnualIncomeInput
              value={fd.ANNUAL_INCOME}
              onChange={(v) => update({ ANNUAL_INCOME: v })}
              labelClassName={LABEL_CLS}
              inputClassName={`${INPUT_CLS} h-12`}
            />
          </div>
        )}

        {/* ── 7 · VA / military (auto-advance) ── */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className={STEP_HEADING_CLS}>
                Are you a veteran or active military?
              </h2>
            </div>
            <RadioButtonGroup
              name="vaStatus"
              options={YES_NO_OPTS}
              value={fd.VA_STATUS}
              onChange={(v) => { update({ VA_STATUS: v }); autoAdvance(7); }}
              type="1"
              layout="column"
              optionClassName={RADIO_OPTION_CLS}
              selectedOptionBackgroundColor={RADIO_SELECTED_BG}
              selectedOptionBorderColor={RADIO_SELECTED_BORDER}
              selectedIndicatorColor={RADIO_INDICATOR}
            />
          </div>
        )}

        {/* ── 8 · Address ── */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <style>{PLACES_STYLES}</style>
            <div className="space-y-2">
              <h2 className={STEP_HEADING_CLS}>Your address</h2>
              <p className={STEP_SUBTEXT_CLS}>
                Enter the property address for this refinance.
              </p>
            </div>
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

        {/* ── 9 · Contact info ── */}
        {currentStep === 9 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className={STEP_HEADING_CLS}>Almost there! Your contact information</h2>
              <p className={STEP_SUBTEXT_CLS}>
                We&apos;ll use this to send your personalized rate options.
              </p>
            </div>
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
        <div className="mt-8">
          <button
            type="button" onClick={handleNext}
            disabled={isSubmitting || !isStepValid()}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-semibold text-sm transition-all duration-200
              ${isSubmitting || !isStepValid()
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#249E45] text-white hover:bg-[#1E8A3A] shadow-md hover:shadow-lg"}`}
          >
            {isSubmitting ? (<><Loader2 size={17} className="animate-spin" /> Submitting...</>)
              : isLastStep ? "Submit Details" : "Continue"}
          </button>
        </div>
      </form>

      {currentStep === 8 && (
        <p className="text-[10px] leading-relaxed text-gray-400 font-inter mt-4 px-1">
        By clicking &quot;Continue&quot; above, I authorize GovMortgageOptions.com &{" "}
        <button
          type="button"
          onClick={() => setIsPartnerModalOpen(true)}
          className="underline hover:text-gray-600"
        >
          GovMortgageOptions.com&apos;s Partners
        </button>
        , to obtain my consumer report, credit profile, or other credit information associated with me from any consumer reporting agency for purposes of my inquiry, as well as for marketing purposes and to provide me with information and recommendations on financial products and services that may be of interest to me.
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
          credit profile to prequalify you for credit options and connect you with an appropriate partner.
        </p>
      )}

      <PartnersModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />

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
