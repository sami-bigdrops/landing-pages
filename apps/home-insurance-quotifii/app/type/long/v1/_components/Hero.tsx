"use client";

import { useState, useEffect } from "react";
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { HERO_CONTENT } from "@/lib/constant";


const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://home.quotifii.com";

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
    ? `Protect Your Home & Save on Insurance in   ${cityName} `
    : "Protect Your Home & Save on Insurance in Your Area";

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
        className="absolute inset-0 w-full h-full bg-[position:center]  lg:bg-[position:right_center]"
        style={{
          backgroundImage: "url('/hero-bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          
        }} 
      />
      <div
        className="absolute inset-0 w-full h-full bg-black/40"
        aria-hidden
      />
      <div className="relative z-10 w-full h-full px-6 sm:px-6 lg:px-8 py-10 md:py-15 md:px-8 lg:py-20 xl:px-23 xl:py-28 2xl:py-35">
        <div className="container mx-auto ">
          <div className="hero-content w-full flex flex-col items-center justify-center md:justify-start md:items-start gap-6 md:gap-8 lg:gap-6.5 xl:gap-8 2xl:gap-9 ">

            <div className="flex-1 w-full flex flex-col md:flex-row  bg-[#FFFFFF] px-5 py-7 md:py-6 xl:px-8 xl:py-9   md:max-w-[450px] lg:max-w-[500px] xl:max-w-[690px] 2xl:max-w-[750px] rounded-none justify-center items-center md:justify-center lg:items-center">
              <div className="w-full flex flex-col items-center md:items-start gap-4 md:gap-4 lg:gap-6 xl:gap-9  ">

                <div className="w-full">
                  <h1
                    className="text-[1.35rem] md:text-[1.45rem] lg:text-[1.4rem] xl:text-[1.9rem] 2xl:text-[2.1rem] max-w-full font-bold text-[#1A1A1A] text-center md:text-left lg:text-left xl:text-left 2xl:text-left font-poppins"
                    style={{
                      lineHeight: "1.4",
                    }}
                  >
                    {headlineText}
                  </h1>
                </div>


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
                        h-14 pl-10 pr-2 text-[0.9rem] font-normal font-poppins
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
                      className="bg-[#F16601] h-14 w-full cursor-pointer text-white font-medium font-poppins rounded-[10px] text-[0.9rem] px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed"
                    >
                      {isRedirecting ? "Redirecting..." : <>Request My Quotes </>}
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
                      className="h-14 md:h-14.5 xl:h-18 w-[180px] md:w-[170px] lg:w-[180px] xl:w-[232px] shrink-0 rounded-[10px] cursor-pointer text-white font-medium font-poppins text-sm  xl:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed bg-[#F16601]"
                    >
                      {isRedirecting ? "Redirecting..." : <>Request My Quotes </>}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-2">
              {HERO_CONTENT.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-2">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={20}
                    height={20}
                    className="w-5 h-5 xl:w-5.5 xl:h-5.5"
                  />
                  <p className="text-sm  xl:text-lg font-normal text-white text-center font-poppins">
                    {feature.text}
                  </p>
                  {/* Render vertical divider only between features, only on md+ screens */}
                  {index !== HERO_CONTENT.features.length - 1 && (
                    <span className="hidden md:inline-block h-5 xl:h-6 border-l border-white mx-1" aria-hidden="true"></span>
                  )}
                </div>
              ))}
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}
