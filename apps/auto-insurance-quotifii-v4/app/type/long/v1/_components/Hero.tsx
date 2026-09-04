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
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT } from "@/lib/constant"



const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://quote.cheapautoinsuranceoptions.com";
const ANALYTICS_FLUSH_DELAY_MS = 300;

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

 



   return (
    <div className="relative  w-full h-full md:min-h-[292px] lg:min-h-[320px] xl:min-h-[510px] 2xl:min-h-[530px] overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-8  lg:right-18 xl:right-24 2xl:right-72 z-[1] hidden md:flex items-end justify-end">
        <Image
          src={HERO_CONTENT.image.src}
          alt={HERO_CONTENT.image.alt}
          width={500}
          height={500}
          priority
          className="w-[300px] h-auto lg:w-[340px] xl:w-[490px] 2xl:w-[520px] object-contain object-bottom"
        />
      </div>

      <div className="relative z-10 w-full h-full px-6  py-8 pb-0 md:px-8 md:py-12 md:px-8 lg:px-14 lg:py-17 xl:px-23 xl:py-26 ">
        <div className="container mx-auto max-w-[1350px] ">
          <div className="hero-content w-full flex flex-col-reverse items-center justify-center md:flex-col md:items-start md:justify-start gap-10 md:gap-8 lg:gap-6.5 xl:gap-8  ">

            <div className="w-full h-full flex items-center justify-center md:hidden">
              <Image
                src={HERO_CONTENT.image.src}
                alt={HERO_CONTENT.image.alt}
                width={500}
                height={500}
                className="w-full h-auto object-contain object-bottom"
              />
            </div>

            {/* Mobile */}

            <div className="w-full md:hidden flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-6.5 xl:gap-8 md:pb-12 lg:pb-16 xl:pb-20  ">
              <div className="w-full flex flex-col items-center  gap-2 xl:gap-3">
                <h1
                  className="text-2xl  md:text-3xl xl:text-5xl  md:max-w-[400px] lg:max-w-[400px] xl:max-w-[600px] font-extrabold text-[#1A1A1A] text-center  font-sans"
                  style={{
                    lineHeight: "1.3",

                  }}
                >
                  {HERO_CONTENT.headline} {" "}
                  <span className="text-[#003599]">{HERO_CONTENT.headline2}</span>
                </h1>
                <p className="text-[#4B5563] text-center font-normal font-sans text-sm  xl:text-xl  md:max-w-full " style={{ lineHeight: "1.5" }}>
                  {HERO_CONTENT.description}
                </p>
              </div>

              <div className="flex-1 w-full flex flex-col md:flex-row   justify-center items-center md:justify-center lg:items-center">
                <div className="w-full flex flex-col items-center justify-center gap-3.5 md:gap-4 lg:gap-5 xl:gap-7  ">


                  <div className="w-full space-y-4 sm:space-y-0  xl:max-w-full">
                    {/* Mobile */}
                    <form
                      data-arohaa-zip-form
                      onSubmit={handleSubmit}
                      className="block sm:hidden space-y-2.5"
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
                          border border-[rgba(0,53,153,0.30)]
                          bg-white
                          w-full
                          shadow-[0_0_10px_0_rgba(0,53,153,0.15)]
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
                        className="flex h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[#F16601] px-8 py-4 font-poppins text-[0.9rem] font-semibold  text-white shadow-[0_0_6px_0_rgba(0,53,153,0.20)] transition-all duration-300 hover:bg-[#F16601] disabled:cursor-not-allowed disabled:opacity-90"
                      >
                        {isRedirecting ? (
                          "Redirecting..."
                        ) : (
                          <>
                            Request My Quotes
                           
                          </>
                        )}
                      </Button>
                    </form>




                  </div>

                  
                </div>
              </div>
              



            </div>

            {/* Desktop view */}

            <div className="w-full hidden md:flex flex-col items-center justify-center  md:gap-7  xl:gap-10  ">

              <div className="w-full flex flex-col items-center  md:items-start gap-2 lg:gap-3 xl:gap-4">
                <h1
                  className=" md:text-3xl  xl:text-5xl  font-extrabold text-[#1A1A1A] text-center md:text-left lg:text-left xl:text-left 2xl:text-left md:max-w-[400px] lg:max-w-[470px] xl:max-w-[700px]  font-sans"
                  style={{
                    lineHeight: "1.3",
                  }}
                >
                  {HERO_CONTENT.headline} {" "}
                  <span className="text-[#003599]">{HERO_CONTENT.headline2}</span>
                </h1>
                <p
                  className="text-center md:text-left text-sm xl:text-[1.2rem] font-normal md:max-w-[350px] lg:max-w-[430px] xl:max-w-[610px]  text-[#4B5563]"
                  style={{ lineHeight: "1.6" }}
                >
                 {HERO_CONTENT.description}
                </p>
              </div>

              <div className="flex-1 w-full flex flex-col md:flex-row   justify-center items-center md:justify-center lg:items-center">
                <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-4 lg:gap-5 xl:gap-6  ">




                  {/* Desktop */}

                  <form
                    data-arohaa-zip-form
                    onSubmit={handleSubmit}
                    className="hidden relative w-full sm:flex w-full flex-row items-start justify-start  gap-2 xl:gap-3"
                  >
                    <div className="relative w-full max-w-[180px] lg:max-w-[240px] xl:max-w-[370px] min-w-0 shrink ">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-5.5 xl:h-5.5 " />
                      </div>
                      <ZipCodeInput
                        id="hero-zipcode"
                        name="zip"
                        data-arohaa-zip
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                        placeholder="90001"
                        inputClassName="
                          h-14 md:h-13.5 xl:h-17.5 pl-10 xl:pl-10.5 pr-2 text-[0.9rem] lg:text-[0.95rem] xl:text-xl font-normal font-poppins
                          rounded-[10px]
                          border border-[rgba(0,53,153,0.30)]
                          bg-white
                          w-full
                          shadow-[0_0_10px_0_rgba(0,53,153,0.15)]
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
                      className="flex h-14 w-[175px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[#F16601] px-4 font-poppins text-[0.85rem] font-semibold  text-white shadow-[0_0_6px_0_rgba(0,53,153,0.20)] transition-all duration-300 hover:bg-[#F16601] disabled:cursor-not-allowed disabled:opacity-90 md:h-13.5 lg:w-[180px] xl:h-17.5 xl:w-[235px] xl:text-lg"
                    >
                      {isRedirecting ? (
                        "Redirecting..."
                      ) : (
                        <>
                          Request My Quotes
                        
                        </>
                      )}
                    </Button>
                  </form>

                  
                </div>
              </div>
            </div>





          </div>







        </div>
      </div>
    </div>
    )
  
}