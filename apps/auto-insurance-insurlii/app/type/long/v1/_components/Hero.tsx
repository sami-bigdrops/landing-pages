"use client";

import { useState, useEffect } from "react";
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT } from "@/lib/constant";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://auto-quote.quotifii.com";

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
    ? `Compare Auto Insurance in   ${cityName} `
    : "Compare Auto Insurance in Your Area";

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
    <div className="relative w-full h-full bg-[#1D4ED8] md:min-h-[292px] lg:min-h-[335px] xl:min-h-[490px] px-6 py-8 lg:px-8  md:px-8 lg:py-10 lg:pt-14 xl:px-23 xl:py-23 xl:pt-27  overflow-hidden ">

      <div className="relative z-10 w-full h-full ">
        <div className="container mx-auto ">
          <div className="hero-content w-full flex flex-col items-center justify-center  md:flex-row md:justify-between md:items-center gap-6 md:gap-8 lg:gap-6.5 xl:gap-8 2xl:gap-9 ">
            <div className="flex flex-col items-center md:items-start md:justify-center  gap-6 md:gap-7 lg:gap-8 xl:gap-12 md:w-[50%]">
              <div className="w-full flex flex-col items-center  md:items-start md:justify-center gap-2.5 xl:gap-4">
                <h1
                  className="text-[1.5rem] md:text-[1.8rem] lg:text-3xl xl:text-4xl lg:max-w-[370px] xl:max-w-[450px] font-extrabold text-[#FFFFFF] text-center md:text-left lg:text-left xl:text-left 2xl:text-left font-sans"
                  style={{
                    lineHeight: "1.4",
                  }}
                >
                  {headlineText}
                </h1>
                <p className="text-sm lg:text-base xl:text-lg text-[#FFFFFF] font-normal text-center md:text-left" style={{ lineHeight: "1.6" }}>{HERO_CONTENT.description}</p>
              </div>
              <div className="flex-1 w-full min-w-0 flex flex-col md:flex-row  md:max-w-[450px] lg:max-w-[460px] xl:max-w-[560px] justify-center items-center md:justify-center lg:items-center">
                <div className="w-full min-w-0 h-full flex flex-col items-center justify-center md:justify-start md:items-start gap-6 md:gap-5.5 xl:gap-6 ">


                  <div className="w-full h-full space-y-4 sm:space-y-0 lg:max-w-[380px] xl:max-w-[450px]">
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
                      className="absolute right-1.5 top-1.5 xl:top-2 xl:right-2 flex md:h-13 xl:h-15.5 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#FF5715] text-sm font-medium font-inherit text-white  transition-all duration-300 hover:bg-[#DD2525] disabled:cursor-not-allowed disabled:opacity-90 md:w-[160px] xl:w-[190px]  xl:text-base"
                    >
                      {isRedirecting ? "Redirecting..." : <>View My Options</>}
                    </Button>
               
                  </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="flex-1 w-full relative md:w-[50%] md:justify-end">
              {/* For mobile and tablet, single image. For lg+, overlapping images */}
              <div className=" rounded-lg overflow-hidden  flex justify-center items-center lg:absolute lg:-top-27 lg:-right-3 xl:-top-39 xl:-right-1 md:justify-end h-full w-[190px] md:w-[180px] mx-auto  lg:h-[260px] xl:h-[380px] xl:w-[200px] lg:justify-end lg:mx-0 lg:block lg:bg-transparent lg:overflow-visible">
                <Image
                  src={HERO_CONTENT.image1.src}
                  alt={HERO_CONTENT.image1.alt}
                  width={340}
                  height={355}
                  className="w-full h-full relative object-contain flex justify-center z-10 items-center md:justify-end"
                  priority
                />
                {/* Overlapping phone image for lg and up */}
                <div className="hidden lg:block absolute top-33 xl:top-50 -translate-y-1/2 right-26 xl:right-30 w-[340px] h-[300px] xl:w-[480px] xl:h-[420px] overflow-hidden">
                  <Image
                    src="/hero-2.webp"
                    alt="hero-2"
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>
     
            </div>
          </div>
        </div>
      </div>
    
  );
}
