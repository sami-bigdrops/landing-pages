"use client";

import { useState, useEffect } from "react";
import {
  useUtmParams,
  setCookie,
  getCookie,
  QUOTIFII_EXTENDED_UTM_OPTIONS,
} from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { HERO_CONTENT } from "@/lib/constant";
import Partners from "./Partners";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://quote.cheapautoinsuranceoptions.com";
const ANALYTICS_FLUSH_DELAY_MS = 300;

function QuoteArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-4 shrink-0  xl:size-5"
      aria-hidden
    >
      <path
        d="M8 4.16669L15.5 11.8062L8 19.4442"
        stroke="#102A43"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  useUtmParams(QUOTIFII_EXTENDED_UTM_OPTIONS);

  const [zipCode, setZipCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const city = data?.city != null ? String(data.city).trim() : null;
        const zip = data?.zip != null ? String(data.zip).replace(/\D/g, "").slice(0, 5) : null;
        if (city) setCityName(city);
        if (zip && zip.length === 5) {
          setZipCode((prev) => (prev === "" ? zip : prev));
        }
      })
      .catch(() => { });
    return () => { cancelled = true };
  }, []);



  const handleSubmit = () => {
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);

    const utmSource = getCookie("subid1") || "";
    const utmId = getCookie("subid2") || "";
    const utmS1 = getCookie("subid3") || "";

    const params = new URLSearchParams();
    params.set("tid", utmId);
    params.set("uid", utmId);
    params.set("sid", utmSource);
    params.set("sub1", utmS1);
    params.set("zip", trimmed);

    const redirectUrl = `${BASE_URL}/?${params.toString()}`;

    track("zip_submission", { state: cityName || undefined, zip_code: trimmed });

    setIsRedirecting(true);
    window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, ANALYTICS_FLUSH_DELAY_MS);
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };
  const handleContinue = () => {
    handleSubmit();
  };

  return (
    <div className="relative w-full h-full ">


      <div className="relative z-10 w-full h-full px-6 sm:px-6 lg:px-14 py-6 md:py-6 md:px-8 lg:py-7 xl:px-28 xl:py-12">
        <div className="container mx-auto max-w-[1300px] ">
          <div className="hero-content w-full flex flex-col items-center justify-center  gap-5 md:gap-10 xl:gap-11 ">
            <div className="w-full flex flex-col items-center justify-center  gap-5 md:gap-7 xl:gap-9">
              <div className="w-full flex flex-col items-center  gap-2 xl:gap-3">
                <h1
                  className="text-[1.5rem]   md:text-3xl xl:text-5xl max-w-[240px] md:max-w-[400px] lg:max-w-[400px] xl:max-w-[600px] font-extrabold text-[#102A43] text-center  font-sans"
                  style={{
                    lineHeight: "1.3",

                  }}
                >
                  {HERO_CONTENT.headline}
                </h1>
                <p className="text-[#374151] text-center font-normal font-sans text-sm  xl:text-xl max-w-[180px] md:max-w-full">
                  {HERO_CONTENT.description}
                </p>
              </div>
              <div className="flex-1 w-full flex flex-col md:flex-row   justify-center items-center md:justify-center lg:items-center">
                <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-4 lg:gap-5 xl:gap-7  ">


                  <div className="w-full space-y-4 sm:space-y-0  xl:max-w-full">
                    {/* Mobile */}
                    <div className="block sm:hidden space-y-3">
                      <div className="relative w-full">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                          <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-4.5 h-4.5 xl:w-6 xl:h-6 " />
                        </div>
                        <ZipCodeInput
                          id="hero-zipcode-mobile"
                          value={zipCode}
                          onChange={(value) => setZipCode(value)}
                          onKeyDown={handleKeyPress}
                          placeholder="90001"
                          inputClassName="
                          h-14 pl-9.5 pr-2 text-[0.9rem] font-normal font-poppins
                          rounded-[6px]
                          border border-[#0752A0]
                          bg-white
                          w-full
                          shadow-[0_0_10px_0_rgba(31,58,95,0.10)]
                          placeholder:text-[#102A43]
                          focus-visible:ring-0 focus-visible:ring-offset-0
                        "
                          containerClassName="w-full"
                        />

                      </div>
                      <Button
                        type="1"
                        variant="default"
                        onClick={handleContinue}
                        disabled={isRedirecting || !zipValid}
                        className="flex h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[6px] bg-[#F59E0B] px-8 py-4 font-poppins text-[0.9rem] font-semibold uppercase  text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-90"
                      >
                        {isRedirecting ? (
                          "Redirecting..."
                        ) : (
                          <>
                            Get My Free Quote
                            <QuoteArrowIcon />
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Desktop */}

                    <div className="hidden relative w-full sm:flex w-full flex-row items-center justify-center  gap-2.5 xl:gap-3.5">
                      <div className="relative w-full max-w-[160px] lg:max-w-[165px] xl:max-w-[210px] min-w-0 shrink ">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                          <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-5.5 xl:h-5.5 " />
                        </div>
                        <ZipCodeInput
                          id="hero-zipcode"
                          value={zipCode}
                          onChange={(value) => setZipCode(value)}
                          onKeyDown={handleKeyPress}
                          placeholder="90001"
                          inputClassName="
                          h-14 md:h-14 xl:h-17.5 pl-10 xl:pl-10.5 pr-2 text-[0.9rem] lg:text-[0.95rem] xl:text-xl font-normal font-poppins
                          rounded-[6px]
                          border border-[#0752A0]
                          bg-white
                          w-full
                          shadow-[0_0_10px_0_rgba(31,58,95,0.10)]
                          placeholder:text-[#102A43]
                          focus-visible:ring-0 focus-visible:ring-offset-0
                        "
                          containerClassName="w-full"
                        />

                      </div>
                      <Button
                        type="1"
                        variant="default"
                        onClick={handleContinue}
                        disabled={isRedirecting || !zipValid}
                        className="flex h-14 w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[6px] bg-[#F59E0B] px-4 font-poppins text-sm font-bold uppercase   text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-90 md:h-14 md:w-[205px]  xl:h-17.5 xl:w-[260px] xl:text-lg"
                      >
                        {isRedirecting ? (
                          "Redirecting..."
                        ) : (
                          <>
                            Get My Free Quote
                            <QuoteArrowIcon />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <Partners />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
