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
import { ArrowRight } from "lucide-react";

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

  const headlineText = cityName
    ? `Let's Drop Your Rate in  ${cityName} Today!`
    : "Let's Drop Your Rate in Your Area Today!";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div
      className="relative w-full h-full"
      style={{ background: "linear-gradient(180deg, #DCEEFF 0%, #EAF3FD 100%)" }}
    >


      <div className="relative z-10 w-full h-full px-6 sm:px-6 lg:px-14 py-6 md:py-12 md:px-8 lg:py-16 xl:px-23 xl:py-22">
        <div className="container mx-auto max-w-[1300px] ">
          <div className="hero-content w-full flex flex-col items-center justify-center md:flex-row  ">
            <div className="w-full md:w-[60%] lg:w-[55%] xl:w-[50%] flex flex-col items-center justify-center md:items-start  gap-5 md:gap-6 xl:gap-9">
              <div className="w-full flex flex-col items-center md:items-start  gap-2 xl:gap-3">
                <h1
                  className="text-[1.5rem] md:text-[1.35rem] lg:text-[1.4rem] xl:text-[1.9rem] 2xl:text-[2.1rem]  font-extrabold text-[#102A43] text-center md:text-left font-sans"
                  style={{
                    lineHeight: "1.3",

                  }}
                >
                  {headlineText}
                </h1>

              </div>
              <div className="flex-1 w-full flex flex-col md:flex-row bg-[#0752A0] px-6 py-7 md:py-6 md:px-5 lg:px-6  xl:px-8 xl:py-8 md:max-w-[400px] lg:max-w-full rounded-[10px] justify-center items-center md:justify-center lg:items-center">

                <div className="w-full flex flex-col items-start  gap-4 md:gap-4 lg:gap-5 xl:gap-7  ">
                  <p className="text-[#FFFFFF] font-medium text-base xl:text-xl text-left  font-sans">
                    What is your ZIP Code?
                  </p>

                  <div className="w-full space-y-4 sm:space-y-0 lg:max-w-[490px] xl:max-w-full">
                    {/* Mobile */}
                    <form
                      data-arohaa-zip-form
                      onSubmit={handleSubmit}
                      className="block sm:hidden space-y-2 mb-0"
                    >
                      <div className="relative w-full">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                          <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-4.5 h-4.5 xl:w-6 xl:h-6 " />
                        </div>
                        <ZipCodeInput
                          id="hero-zipcode-mobile"
                          name="zip"
                          data-arohaa-zip
                          value={zipCode}
                          onChange={(value) => setZipCode(value)}
                          placeholder="90001"
                          inputClassName="
                          h-14 pl-9.5 pr-2 text-[0.9rem] font-normal font-poppins
                          rounded-[10px]
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
                        htmlType="submit"
                        data-arohaa-zip-submit
                        disabled={isRedirecting || !zipValid}
                        className="flex h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[#F59E0B] px-8 py-4 font-poppins text-sm font-semibold uppercase text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-90"
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

                    </form>

                    {/* Desktop */}

                    <form
                      data-arohaa-zip-form
                      onSubmit={handleSubmit}
                      className="hidden relative w-full sm:flex flex-row items-center justify-start  "
                    >
                      <div className="relative w-full max-w-full lg:max-w-full xl:max-w-full min-w-0 shrink ">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                          <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-5 xl:h-5 " />
                        </div>
                        <ZipCodeInput
                          id="hero-zipcode"
                          name="zip"
                          data-arohaa-zip
                          value={zipCode}
                          onChange={(value) => setZipCode(value)}
                          placeholder="90001"
                          inputClassName="
                          h-14 md:h-14 xl:h-17.5 pl-10 xl:pl-10 pr-2 text-[0.9rem] lg:text-[0.95rem] xl:text-xl font-normal font-poppins
                          rounded-tr-none rounded-br-none rounded-tl-[10px] rounded-bl-[10px]
                          
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
                        htmlType="submit"
                        data-arohaa-zip-submit
                        disabled={isRedirecting || !zipValid}
                        className="flex h-14 w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-tr-[10px] rounded-br-[10px] rounded-tl-none rounded-bl-none bg-[#F59E0B] px-4 font-poppins text-sm font-bold uppercase   text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-90 md:h-14 md:w-[205px]  xl:h-17.5 xl:w-[260px] xl:text-lg"
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
                    </form>


                  </div>
                </div>
              </div>


            </div>
            <div className="w-full md:w-[40%] lg:w-[45%] xl:w-[50%] h-full flex flex-col items-center justify-center  ">
              <Image src={HERO_CONTENT.image.src} alt={HERO_CONTENT.image.alt} width={500} height={500}
                className="w-full h-full object-contain" priority />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
