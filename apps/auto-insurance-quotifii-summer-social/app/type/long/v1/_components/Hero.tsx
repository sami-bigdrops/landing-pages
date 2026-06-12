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

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://form.quotifii.com";

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

  const handleContinue = () => {
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
    window.location.href = redirectUrl;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue();
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div className="relative flex min-h-0 flex-1 w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-[url('/hero-bg.webp')] bg-cover bg-no-repeat bg-[position:left_42%] md:bg-[position:72%_32%] lg:bg-[position:76%_28%] xl:bg-[position:78%_24%]"
      />
      <div
        className="absolute inset-0 w-full h-full bg-black/22"
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-h-0 w-full flex-col justify-center px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:py-8 xl:px-10 xl:py-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="hero-content flex w-full min-h-0 flex-col items-center justify-center gap-4 md:items-start md:justify-center md:gap-5 lg:gap-6 xl:gap-7">
            <div className="flex w-full flex-col items-center gap-3 md:items-start md:gap-3.5 xl:gap-4">
              <div
                className="flex items-center gap-2 px-3.5 py-2 xl:px-4 xl:py-2.5 rounded-[50px] border border-[rgba(255,190,90,0.40)] bg-[rgba(255,255,255,0.84)] backdrop-blur-[2px]"
              >

                <Image src={HERO_CONTENT.badge.image.src} alt={HERO_CONTENT.badge.image.alt} width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
                <p className="text-[#003599] font-semibold text-[0.85rem]  xl:text-base uppercase tracking-medium  font-sans">
                  {HERO_CONTENT.badge.text}
                </p>
              </div>
              <div
                className="flex flex-col items-center md:items-start gap-2.5 md:gap-3 max-w-[40rem] xl:max-w-[44rem] font-[family-name:var(--font-hero)]"
              >
                <h1
                  className="w-full text-center md:text-left font-bold text-white text-[2rem] leading-[1.12] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.85rem] xl:text-[3.125rem]"
                  style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.45)" }}
                >
                  {HERO_CONTENT.headlineLead}{" "}
                  <span className="md:whitespace-nowrap">{HERO_CONTENT.headlineEmphasis}</span>
                </h1>
                <p
                  className="w-full text-center md:text-left font-normal text-white/95 text-lg leading-snug sm:text-xl md:text-2xl xl:text-[1.75rem]"
                  style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)" }}
                >
                  {HERO_CONTENT.subheadline}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row bg-[#FFFFFF] px-4 py-5 sm:px-5 sm:py-6 md:max-w-[450px] md:py-5 lg:max-w-[500px] xl:max-w-[670px] xl:px-7 xl:py-7 rounded-none justify-center items-center md:justify-center lg:items-center">
              <div className="w-full flex flex-col items-center md:items-start gap-3 md:gap-3.5 lg:gap-4 xl:gap-5">
                <p className="text-[#1A1A1A] font-semibold text-base sm:text-lg xl:text-xl font-sans">
                  What is your ZIP Code?
                </p>

                <div className="w-full space-y-4 sm:space-y-0 lg:max-w-[490px] xl:max-w-full">
                  {/* Mobile */}
                  <div className="block sm:hidden space-y-4">
                    <div className="relative w-full">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
                      </div>
                      <ZipCodeInput
                        id="hero-zipcode-mobile"
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                        onKeyDown={handleKeyPress}
                        placeholder="90001"
                        inputClassName="
                        h-14 pl-10 pr-2 text-[0.9rem] font-normal font-sans
                        rounded-[10px]
                        border border-[#0035994D]
                        bg-white
                        w-full
                        shadow-[0_0_10px_0_rgba(0,53,153,0.15)]
                        placeholder:text-[#3A3A3A]
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
                      className="bg-[#F16601] h-14 w-full cursor-pointer text-white font-medium font-sans rounded-[10px] text-[0.9rem] px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_6px_0_rgba(0,53,153,0.20)] hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed"
                    >
                      {isRedirecting ? "Redirecting..." : <>Request My Quotes</>}
                    </Button>

                  </div>

                  {/* Desktop */}

                  <div className="hidden relative w-full sm:flex w-full flex-row items-center justify-center md:justify-start gap-2 xl:gap-3.5">
                    <div className="relative w-full max-w-[290px] lg:max-w-full min-w-0 shrink">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
                      </div>
                      <ZipCodeInput
                        id="hero-zipcode"
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                        onKeyDown={handleKeyPress}
                        placeholder="90001"
                        inputClassName="
                        h-14 md:h-14.5 xl:h-18 pl-10 xl:pl-11 pr-2 text-[0.9rem] lg:text-[1.05rem] xl:text-xl font-normal font-poppins
                        rounded-[10px]
                        border border-[#0035994D]
                        bg-white
                        w-full
                        shadow-[0_0_10px_0_rgba(0,53,153,0.15)]
                        placeholder:text-[#3A3A3A]
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
                      className="h-14 md:h-14.5 xl:h-18 w-[180px] md:w-[170px] lg:w-[178px] xl:w-[232px] shrink-0 rounded-[10px] cursor-pointer text-white font-medium font-poppins text-sm  xl:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_6px_0_rgba(0,53,153,0.20)] hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed bg-[#F16601]"
                    >
                      {isRedirecting ? "Redirecting..." : <>Request My Quotes </>}
                    </Button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
