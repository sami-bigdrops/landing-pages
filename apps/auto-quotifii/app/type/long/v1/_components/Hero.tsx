"use client";

import { useState, useEffect } from "react";
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { HERO_CONTENT } from "@/lib/constant";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const REDIRECT_BASE_URL = "https://auto.assurerates.com";
const REFERRER = "quotes.assurerates.com";
const TID = "3286";

export default function Hero() {
  useUtmParams(30);

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
      .catch(() => {});
    return () => { cancelled = true };
  }, []);

  const headlineText = cityName
    ? `Let's Drop Your Rate in  ${cityName} Today!`
    : "Let's Drop Your Rate in Your Area Today!";

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

    const params = new URLSearchParams({
      zip_code: trimmed,
      referrer: REFERRER,
      tid: TID,
    });
    if (utmSource) params.set("subid", utmSource);
    if (utmId) params.set("subid2", utmId);
    if (utmS1) params.set("c1", utmS1);

    const redirectUrl = `${REDIRECT_BASE_URL}/form?${params.toString()}`;

    track("zip_submission", { state: cityName || undefined, zip_code: trimmed });

    setIsRedirecting(true);
    window.location.href = redirectUrl;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue();
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div className="relative w-full h-full md:min-h-[292px] lg:min-h-[320px] xl:min-h-[510px] 2xl:min-h-[510px]">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/hero-bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "left"
        }}
      />
      <div
        className="absolute inset-0 w-full h-full bg-black/25"
        aria-hidden
      />
      <div className="relative z-10 w-full h-full px-6 sm:px-6 lg:px-8 py-10 md:py-15 md:px-8 lg:py-22 xl:px-23 xl:py-38 2xl:py-50">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row  bg-[#FFFFFF] px-4 py-7 xl:px-6 xl:py-9 2xl:py-9.5  md:max-w-[500px] lg:max-w-[530px] xl:max-w-[790px] 2xl:max-w-[860px] rounded-none justify-center items-center md:justify-center lg:items-center">
          <div className="flex-1 w-full">
            <div className="w-full flex flex-col items-center md:items-center gap-4 md:gap-5 lg:gap-6.5 xl:gap-8 2xl:gap-9 ">
              <div className="w-full flex flex-col items-center lg:items-center xl:items-start gap-3 xl:gap-4">
                <h1 className=" text-[1.3rem] md:text-[1.25rem]  lg:text-[1.35rem] xl:text-[2rem] 2xl:text-[2.2rem] font-bold text-[#1C2833] text-center md:text-left lg:text-left xl:text-left 2xl:text-left font-sans " style={{ lineHeight: "1.3" }}>
                  {headlineText}
                </h1>
              </div>
              <div className="w-full flex flex-col items-center md:flex-row  gap-3   lg:max-w-[490px] xl:max-w-full ">
                <div className="w-full">
                  <div className="relative">
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
                        h-14 md:h-14.5 xl:h-16 pl-10 xl:pl-11 pr-2 text-[0.9rem] lg:text-[1.05rem] xl:text-xl font-normal font-sans
                        rounded-[10px] 
                        

                        border border-[#0035994D] 
                        bg-white 
                        w-full 
                        shadow-[0_0_10px_0_rgba(0,53,153,0.15)]
                      
                        placeholder:text-[#444444]
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
                  className="bg-[#F16601] h-14 md:h-14.5 xl:h-16 md:w-45 lg:w-52 xl:w-66  cursor-pointer text-white font-medium font-sans rounded-[10px]  text-sm lg:text-[0.9rem] xl:text-lg px-8 py-6 md:py-5.5  flex items-center gap-2 transition-all duration-300 w-full max-w-md justify-center shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed "
                >
                  {isRedirecting ? "Redirecting..." : "Request My Quotes"}
                  
                </Button>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      </div>
    </div>
  );
}
