"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { HERO_CONTENT } from "@/lib/constant";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import HeroCards from "./HeroCards";
import HeroNotification from "./HeroNotification";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;

export default function Hero() {
  useUtmParams(30);
  const router = useRouter();

  const [zipCode, setZipCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const savedZip = getCookie(ZIP_COOKIE_NAME);
    if (savedZip) setZipCode(savedZip);

    let cancelled = false;
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const region = data?.region != null ? String(data.region).trim() : null;
        if (region) setStateName(region);
        if (!savedZip) {
          const zip = data?.zip != null ? String(data.zip).trim() : null;
          if (zip) setZipCode(zip);
        }
      })
      .catch(() => {});
    return () => { cancelled = true };
  }, []);

  const subtitleRegion = stateName || "your area";

  const handleContinue = () => {
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);

    track("zip_submission", { state: stateName || undefined, zip_code: trimmed });

    setIsRedirecting(true);
    router.push(`/form/refinance?zip=${trimmed}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue();
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <>
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_CONTENT.image.src})`,
        }}
      />
      <div className="absolute inset-0 bg-[#1C2833]/50" />

      <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-12 lg:px-10 lg:py-16 xl:px-20 xl:py-20 container mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-6 lg:gap-10 xl:gap-14 items-start md:items-center justify-between">
          <div className="flex-1 min-w-0 w-full md:max-w-none max-w-xl">
            {/* H1 — dominant, largest element */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white font-inter leading-tight tracking-tight text-center md:text-left">
              How Much Can You{" "}
              <span className="whitespace-nowrap">Cash Out?</span>
            </h1>

            {/* Subtitle — secondary, visibly smaller and lighter */}
            <p className="mt-2 text-sm sm:text-base text-white/70 font-inter font-normal text-center md:text-left">
              {HERO_CONTENT.subtitle}{" "}
              <span className="whitespace-nowrap">{subtitleRegion}</span>
            </p>

            {/* Input + CTA */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-0 w-full max-w-lg">
              <div className="w-full">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                    <Image src="/location.svg?v=2" alt="" width={20} height={20} className="w-5 h-5" />
                  </div>
                  <ZipCodeInput
                    id="hero-zipcode"
                    value={zipCode}
                    onChange={(value) => setZipCode(value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Zip Code"
                    inputClassName="
                      h-14 md:h-14.5 xl:h-16 pl-10 pr-2 text-base lg:text-lg xl:text-xl font-normal font-inter
                      rounded-[10px]
                      sm:rounded-tr-none sm:rounded-br-none
                      border border-[#941F32]
                      sm:border-r-0
                      bg-white
                      w-full
                      shadow-[0_0_15px_0_rgba(31,58,95,0.15)]
                      placeholder:text-[#888]
                      focus-visible:ring-0 focus-visible:ring-offset-0
                    "
                    containerClassName="w-full"
                  />
                </div>
              </div>
              <Button
                type="1"
                variant="default"
                onClick={handleContinue}
                disabled={isRedirecting || !zipValid}
                className="bg-[#941F32] h-14 md:h-14.5 xl:h-16 sm:w-47 lg:w-52 xl:w-66 cursor-pointer text-white font-semibold font-inter rounded-[10px] sm:rounded-tl-none sm:rounded-bl-none text-sm xl:text-lg px-6 flex items-center gap-2 transition-all duration-300 w-full max-w-md justify-center shadow-md hover:bg-[#7F1A2A] hover:shadow-lg disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {isRedirecting ? "Redirecting..." : HERO_CONTENT.ctaButton}
                {!isRedirecting && (
                  <Image src="/arrow.svg" alt="arrow icon" width={20} height={20} className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>

            {/* Features — tertiary, smallest and dimmest */}
            <ul className="mt-4 flex flex-row flex-wrap items-center gap-x-4 gap-y-1.5 justify-center md:justify-start">
              {HERO_CONTENT.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1.5 text-white/70 font-inter text-xs sm:text-sm whitespace-nowrap"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#941F32]" />
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-[320px] lg:w-[460px] xl:w-[540px] shrink-0 flex flex-col items-center md:items-end">
            <HeroCards />
          </div>
        </div>

      </div>
    </div>

    <HeroNotification />
    </>
  );
}
