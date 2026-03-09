"use client";

import { useState, useEffect } from "react";
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://autoquote.quotifii.com";
const REFERRER = "auto.quotifii.com";
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
      .catch(() => { });
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

    const redirectUrl = `${BASE_URL}/form?${params.toString()}`;

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
        className="absolute inset-0 w-full h-full bg-black/40"
        aria-hidden
      />
      <div className="relative z-10 w-full h-full px-6 sm:px-6 lg:px-8 py-10 md:py-15 md:px-8 lg:py-20 xl:px-23 xl:py-33 2xl:py-38">
        <div className="container mx-auto ">
          <div className="hero-content w-full flex flex-col items-center justify-center md:justify-start md:items-start gap-4 md:gap-8 lg:gap-6.5 xl:gap-8 2xl:gap-9 ">
            <div className="w-full flex flex-col items-center  md:items-start gap-3 xl:gap-4">
              <h1
                className="text-[1.45rem] md:text-[1.35rem] lg:text-[1.4rem] xl:text-[1.9rem] 2xl:text-[2.1rem] font-extrabold text-white text-center md:text-left lg:text-left xl:text-left 2xl:text-left font-sans"
                style={{
                  lineHeight: "1.3",
                  textShadow: "0 1px 3px rgba(0,0,0,0.5), 0 2px 12px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.8)",
                }}
              >
                {headlineText}
              </h1>
            </div>
            <div className="flex-1 w-full flex flex-col md:flex-row  bg-[#FFFFFF] px-5 py-7 md:py-6 xl:px-8 xl:py-9   md:max-w-[450px] lg:max-w-[500px] xl:max-w-[680px] rounded-none justify-center items-center md:justify-center lg:items-center">
              <div className="w-full flex flex-col items-center md:items-start gap-4 md:gap-4 lg:gap-5 xl:gap-7  ">
                <p className="text-black font-semibold text-lg xl:text-xl  font-sans">
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
                        placeholder:text-[#444444]
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
                      className="bg-[#F16601] h-14 w-full cursor-pointer text-white font-medium font-sans rounded-[10px] text-[0.9rem] px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed"
                    >
                      {isRedirecting ? "Redirecting..." : <>Continue <ArrowRight className="w-5.5 h-5.5" /></>}
                    </Button>
                  </div>

                  {/* Desktop */}

                  <div className="hidden sm:block relative w-full">
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
                        h-14 md:h-14.5 xl:h-18 pl-10 xl:pl-11 pr-[180px] md:pr-[200px]  text-[0.9rem] lg:text-[1.05rem] xl:text-xl font-normal font-sans
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
                    <Button
                      type="1"
                      variant="default"
                      onClick={handleContinue}
                      disabled={isRedirecting || !zipValid}
                      className="absolute right-0 top-0 h-14 md:h-14.5 xl:h-18 w-[180px] md:w-[170px] lg:w-[180px] xl:w-[225px]  rounded-r-[10px] rounded-l-none cursor-pointer text-white font-medium font-sans text-sm lg:text-[0.9rem] xl:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed bg-[#F16601]"
                    >
                      {isRedirecting ? "Redirecting..." : <>Continue <ArrowRight className="w-5.5 h-5.5 xl:w-8 xl:h-8" /></>}
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
