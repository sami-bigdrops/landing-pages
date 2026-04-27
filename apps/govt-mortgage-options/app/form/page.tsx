"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Home, RefreshCw } from "lucide-react";

const FORM_TYPES = [
  {
    id: "refinance",
    label: "Refinancing",
    description: "Lower your rate, reduce monthly payments, or cash out your home equity.",
    icon: RefreshCw,
    href: "/form/refinance",
    color: "from-[#1e3a5f] to-[#2563eb]",
  },
  {
    id: "buy-home",
    label: "Buy a Home",
    description: "Find the best mortgage to purchase your next home.",
    icon: Home,
    href: "/form/buy-home",
    color: "from-[#0d6e4f] to-[#059669]",
  },
] as const;

function FormTypeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const zip = searchParams.get("zip") ?? "";

  const handleSelect = (href: string) => {
    const params = new URLSearchParams();
    if (zip) params.set("zip", zip);
    router.push(`${href}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C2833] font-inter">
          What are you looking to do?
        </h1>
        <p className="mt-2 text-sm text-gray-500 font-inter">
          Select an option below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FORM_TYPES.map(({ id, label, description, icon: Icon, href, color }) => (
          <button
            key={id}
            onClick={() => handleSelect(href)}
            className="group relative flex flex-col items-center text-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <div
              className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md group-hover:scale-105 transition-transform duration-200`}
            >
              <Icon className="h-6 w-6 text-white" strokeWidth={2} />
            </div>

            <h2 className="text-lg font-bold text-[#1C2833] font-inter">{label}</h2>
            <p className="mt-1.5 text-sm text-gray-500 font-inter leading-snug">{description}</p>

            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 group-hover:bg-blue-100 transition-colors">
              Get started →
            </span>
          </button>
        ))}
      </div>

      {zip && (
        <p className="mt-6 text-center text-xs text-gray-400 font-inter">
          Showing results for ZIP code <span className="font-semibold text-gray-600">{zip}</span>
        </p>
      )}
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense>
      <FormTypeSelector />
    </Suspense>
  );
}
