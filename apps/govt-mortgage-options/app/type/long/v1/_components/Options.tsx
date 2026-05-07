"use client";

import Image from "next/image";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;

export default function Options() {
  const router = useRouter();
  const [zipCode, setZipCode] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const savedZip = getCookie(ZIP_COOKIE_NAME);
    if (savedZip) {
      setZipCode(savedZip);
      return;
    }
    let cancelled = false;
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const zip = data?.zip != null ? String(data.zip).trim() : null;
        if (zip) setZipCode(zip);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleContinue = () => {
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);

    track("zip_submission", { zip_code: trimmed });

    setIsRedirecting(true);
    router.push(`/form/refinance?zip=${trimmed}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue();
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <section className="options container mx-auto h-full w-full bg-white px-4 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12 xl:px-20 xl:py-16">
      <div className="options-content mx-auto flex w-full flex-col items-center justify-center gap-6 md:w-[60%] md:gap-5 lg:w-[50%] xl:w-[43%] xl:gap-6">
        <div className="flex w-full flex-col items-center gap-3 md:flex-row md:gap-0 lg:max-w-[460px] xl:max-w-full">
          <div className="relative w-full">
            <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
              <Image src="/location.svg?v=2" alt="" width={20} height={20} className="h-5 w-5" />
            </span>
            <ZipCodeInput
              id="options-zipcode"
              value={zipCode}
              onChange={(value) => setZipCode(value)}
              onKeyDown={handleKeyPress}
              placeholder="Zip Code"
              inputClassName="h-14 w-full rounded-[10px] border border-[#941F32] bg-white pl-10 pr-2 font-inter text-base font-normal shadow-[0_0_15px_0_rgba(31,58,95,0.15)] placeholder:text-[#444444] focus-visible:ring-0 focus-visible:ring-offset-0 md:h-14.5 md:rounded-br-none md:rounded-tr-none md:border-r-0 lg:text-lg xl:h-16 xl:text-xl"
              containerClassName="w-full"
            />
          </div>

          <Button
            type="1"
            variant="default"
            onClick={handleContinue}
            disabled={isRedirecting || !zipValid}
            className="flex h-14 w-full max-w-md cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#941F32] px-8 py-6 font-inter text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#7F1A2A] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-90 md:h-14.5 md:w-47 md:rounded-bl-none md:rounded-tl-none md:py-5.5 lg:w-52 xl:h-16 xl:w-66 xl:text-lg"
          >
            {isRedirecting ? "Redirecting..." : "See Savings"}
            {!isRedirecting && (
              <Image src="/arrow.svg" alt="arrow icon" width={20} height={20} className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>

        <p className="flex w-full items-center justify-center gap-2 text-center font-inter text-base text-[#1C2833] lg:max-w-[460px] xl:max-w-full">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#941F32]" />
          Your savings start here!
        </p>
      </div>
    </section>
  );
}
