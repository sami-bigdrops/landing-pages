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
const BASE_URL = "https://auto-quote.quotifii.com";

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
      {/* <div
        className="absolute inset-0 w-full h-full bg-black/40"
        aria-hidden
      /> */}
      <div className="relative z-10 w-full h-full px-6 sm:px-6 lg:px-8 py-10 md:py-15 md:px-8 lg:py-20 xl:px-23 xl:py-33 2xl:py-38">
        <div className="container mx-auto ">
          <div className="hero-content w-full flex flex-col items-center justify-center md:justify-start md:items-start gap-6 md:gap-6.5 lg:gap-6.5 xl:gap-8.5 ">
            <div className="w-full flex flex-col items-center  md:items-start gap-4 xl:gap-5">
              <div
                className="flex items-center gap-2 px-3.5 py-2 xl:px-4 xl:py-2.5 rounded-[50px] border border-[rgba(255,190,90,0.40)] bg-[rgba(255,255,255,0.84)] backdrop-blur-[2px]"
              >

                <Image src={HERO_CONTENT.badge.image.src} alt={HERO_CONTENT.badge.image.alt} width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
                <p className="text-[#003599] font-semibold text-[0.85rem]  xl:text-base uppercase tracking-medium  font-sans">
                  {HERO_CONTENT.badge.text}
                </p>
              </div>
              <h1
                className="text-[1.45rem] md:text-[1.35rem] lg:text-[1.45rem] xl:text-[1.9rem] 2xl:text-[2.1rem] font-extrabold text-white text-center md:text-left lg:text-left xl:text-left 2xl:text-left font-sans"
                style={{
                  lineHeight: "1.3",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.50)",

                }}
              >
                {headlineText}
              </h1>
            </div>
            <div className="flex-1 w-full flex flex-col md:flex-row  bg-[#FFFFFF] px-5 py-7 md:py-6 xl:px-7.5 xl:py-9   md:max-w-[450px] lg:max-w-[500px] xl:max-w-[670px] rounded-none justify-center items-center md:justify-center lg:items-center">
              <div className="w-full flex flex-col items-center md:items-start gap-4 md:gap-4 lg:gap-5 xl:gap-7  ">
                <p className="text-[#1A1A1A] font-semibold text-lg xl:text-xl  font-sans">
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
