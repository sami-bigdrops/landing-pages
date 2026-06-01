"use client";

import Image from "next/image";
import { OPTIONS_CONTENT } from "@/lib/constant";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import { useState, useEffect } from "react";
import {
  useUtmParams,
  setCookie,
  getCookie,
  QUOTIFII_EXTENDED_UTM_OPTIONS,
} from "@workspace/lp-core";
import { track } from "@vercel/analytics";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://auto-quote.insurlii.com";

export default function Options() {
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
    <div className="options bg-white w-full h-full px-4 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12  xl:px-20 xl:py-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="options-content w-full flex flex-col md:flex-row items-center justify-center md:justify-start md:items-center lg:items-start gap-6 md:gap-6 lg:gap-10 xl:gap-14">
          <div className="flex flex-col items-center justify-center  md:items-start gap-3 xl:gap-4  md:w-[50%] xl:w-[55%]">
            <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] font-bold text-[#0F172A] md:text-left text-center font-inter " style={{ lineHeight: 1.3 }}>
              {OPTIONS_CONTENT.header}
            </h2>
            <p className="text-sm lg:text-sm xl:text-[1.05rem] text-[#374151] md:max-w-[320px] lg:max-w-[380px] xl:max-w-full md:text-left text-center font-sans" style={{ lineHeight: 1.6 }}>{OPTIONS_CONTENT.description}</p>
          </div>
          <div className="flex-1 w-full min-w-0 flex flex-col md:flex-row  md:max-w-[450px] lg:max-w-full xl:max-w-full justify-center items-center md:justify-center lg:items-center md:w-[50%] xl:w-[45%]">
            <div className="w-full min-w-0 h-full flex flex-col items-center justify-center md:justify-start md:items-start gap-4 ">


              <div className="w-full h-full space-y-4 sm:space-y-0 lg:max-w-full xl:max-w-[500px]">
                {/* Mobile */}
                <div className="block sm:hidden space-y-2.5 mb-0">
                  <div className="relative w-full h-full">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                      <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5.5 h-5.5 xl:w-6 xl:h-6 " />
                    </div>
                    <ZipCodeInput
                      id="hero-zipcode-mobile"
                      value={zipCode}
                      onChange={(value) => setZipCode(value)}
                      onKeyDown={handleKeyPress}
                      placeholder="90001"
                      inputClassName="
                            h-14 pl-11 pr-2 text-[0.9rem] font-normal font-inherit
                            rounded-[10px]
                            border border-slate-300
                            bg-white
                            w-full
                            shadow-[0_0_4px_0_rgba(17,24,39,0.06)]
                            placeholder:text-[#444444]
                            placeholder:text-sm
                            focus-visible:ring-0 focus-visible:ring-offset-0
                          "
                      containerClassName="w-full"
                    />

                  </div>
                  <Button
                    type="1"
                    variant="default"
                    disabled={isRedirecting || !zipValid}
                    onClick={handleContinue}
                    className="bg-[#FF5715] h-14 w-full cursor-pointer rounded-[10px] px-8 py-4 text-[0.9rem] font-medium font-inherit text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-[#FF5715] disabled:cursor-not-allowed disabled:opacity-90 flex items-center justify-center gap-2"
                  >
                    {isRedirecting ? "Redirecting..." : <>View My Options</>}
                  </Button>


                </div>

                {/* Desktop */}

                <div className="hidden sm:block relative w-full ">
                  <div className="absolute left-3 xl:left-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                    <Image src="/location.svg" alt="location icon" width={20} height={20} className="md:w-5 md:h-5 xl:w-6 xl:h-6 " />
                  </div>
                  <ZipCodeInput
                    id="hero-zipcode"
                    value={zipCode}
                    onChange={(value) => setZipCode(value)}
                    onKeyDown={handleKeyPress}
                    placeholder="90001"
                    inputClassName="
                        w-full h-14 md:h-16 xl:h-19.5 pl-10 xl:pl-12 pr-2 text-[0.9rem] xl:text-lg font-normal font-inherit
                        rounded-[10px]
                        border border-[#CBD5E1]
                   
                        bg-white
                        w-full
                   
                        shadow-[0_0_4px_0_rgba(17,24,39,0.06)]
                   
                        placeholder:text-[#444444]
                        placeholder:text-sm  md:placeholder:text-base xl:placeholder:text-xl
                        focus-visible:ring-0 focus-visible:ring-offset-0
                      "

                    containerClassName="w-full"
                  />
                  <Button
                    type="1"
                    variant="default"
                    onClick={handleContinue}
                    disabled={isRedirecting || !zipValid}
                    className="absolute right-1.5 top-1.5 xl:top-2 xl:right-2 flex md:h-13 xl:h-15.5 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#FF5715] text-sm font-medium font-inherit text-white  transition-all duration-300 hover:bg-[#FF5715] disabled:cursor-not-allowed disabled:opacity-90 md:w-[150px] lg:w-[170px] xl:w-[200px]  xl:text-base"
                  >
                    {isRedirecting ? "Redirecting..." : <>View My Options</>}
                  </Button>

                </div>
              </div>
              <div className="w-full h-full flex  items-center justify-center lg:justify-start gap-2 md:gap-1.5">
                
                  <Image src={OPTIONS_CONTENT.badge.src} alt={OPTIONS_CONTENT.badge.alt} width={20} height={20} className="w-5.5 h-5.5 md:w-5 md:h-5 xl:w-5.5 xl:h-5.5 object-contain " />
                  <p className="text-[0.8rem]  lg:text-[0.85rem] xl:text-[1.05rem] font-medium text-[#374151] md:text-left text-left font-sans" style={{ lineHeight: 1.5 }}>{OPTIONS_CONTENT.badge.label}</p>
                
              </div>

            </div>
            
          </div>
        </div>



      </div>
    </div>
  );
}
