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
    ? `Let's drop your rate in ${cityName} today!`
    : "Let's drop your rate in your area today!";

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
    <div className="bg-[#D8E4F1] w-full px-6 sm:px-6 lg:px-8 py-8 lg:py-15 xl:px-23 ">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-12 xl:gap-16 items-center lg:items-center">
          <div className="flex-1 w-full">
            <div className="flex flex-col items-center md:items-start gap-6 lg:gap-7 xl:gap-8 max-w-2xl mx-auto md:mx-0">
              <div className="flex flex-col items-center lg:items-start gap-3 xl:gap-4">
                <h1 className=" text-[1.3rem]  md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1C2833] text-center md:text-left font-inter " style={{ lineHeight: "1.3" }}>
                  {headlineText}
                </h1>
              </div>
              <div className="flex flex-col items-center md:flex-row  gap-3 md:gap-0  w-full lg:max-w-[460px] xl:max-w-full ">
                <div className="w-full">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                      <Image src="/location.svg" alt="" width={20} height={20} className="w-5 h-5 " />
                    </div>
                    <ZipCodeInput
                      id="hero-zipcode"
                      value={zipCode}
                      onChange={(value) => setZipCode(value)}
                      onKeyDown={handleKeyPress}
                      placeholder="90001"
                      inputClassName="
                        h-14 md:h-14.5 xl:h-16 pl-10 pr-2 text-base lg:text-lg xl:text-xl font-normal font-inter
                        rounded-[10px] 
                        
                        md:rounded-tr-none md:rounded-br-none
                        border border-[#3498DB] 
                        md:border-r-0
                        bg-white 
                        w-full 
                        shadow-[0_0_15px_0_rgba(31,58,95,0.15)]
                      
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
                  className="bg-[#3498DB] h-14 md:h-14.5 xl:h-16 md:w-47 lg:w-52 xl:w-66  cursor-pointer text-white font-semibold font-inter rounded-[10px] md:rounded-tl-none md:rounded-bl-none text-sm xl:text-lg px-8 py-6 md:py-5.5  flex items-center gap-2 transition-all duration-300 w-full max-w-md justify-center shadow-md hover:shadow-lg disabled:opacity-90 disabled:cursor-not-allowed"
                >
                  {isRedirecting ? "Redirecting..." : "Request My Quotes"}
                  {!isRedirecting && (
                    <Image src="/arrow.svg" alt="arrow icon" width={20} height={20} className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full md:w-auto md:relative">
            <div className="relative rounded-lg overflow-hidden h-full w-full md:h-[260px] lg:h-[300px] xl:h-[390px]">
              <Image
                src={HERO_CONTENT.image.src}
                alt={HERO_CONTENT.image.alt}
                width={800}
                height={600}
                className="w-full h-full object-cover hidden md:block"
                priority
              />

              <div className="md:absolute bottom-3 left-3 xl:bottom-4 xl:left-4 flex flex-col justify-center items-center md:items-start gap-2 md:gap-2 xl:gap-3 z-10">
                {HERO_CONTENT.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[#EDF2F9] rounded-[10px] px-3 md:pr-3 md:py-2 py-2  max-w-fit w-full"
                  >
                    <div className="flex items-center justify-center w-full gap-2">
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        width={20}
                        height={20}
                        className="w-4.5 h-4.5 xl:w-6 xl:h-6 flex-shrink-0 object-contain"
                      />
                      <p className="text-sm xl:text-lg font-normal text-[#1F3A5F] font-inter">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
