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

   const renderBadge = (badge: (typeof HERO_CONTENT.mobileBadges | typeof HERO_CONTENT.desktopBadges)[number]) => (
    <div key={badge.text} className="flex items-center gap-1 xl:gap-1.5">
      <Image
        src={badge.icon}
        alt="badge icon"
        width={18}
        height={18}
        className="size-[16px] xl:size-5 shrink-0 object-contain"
      />
      <span className=" text-[0.8rem] md:text-[0.75rem] xl:text-base font-normal leading-tight text-[#374151] md:text-white">
        {badge.text}
      </span>
    </div>
  )



   return (
    <div className="relative bg-[#EAF3FD] w-full h-full md:min-h-[292px] lg:min-h-[320px] xl:min-h-[510px] 2xl:min-h-[560px]">
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <Image
          src={HERO_CONTENT.image.src}
          alt={HERO_CONTENT.image.alt}
          fill
          priority
          className="object-cover object-[75%_center] lg:object-[80%_top] xl:object-[85%_top] "
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 w-full h-full px-6  py-8 md:px-8 md:py-12 md:px-8 lg:px-14 lg:py-16 xl:px-23 xl:py-24 2xl:py-28 2xl:px-25">
        <div className="container mx-auto max-w-[1400px] ">
          <div className="hero-content w-full flex flex-col items-center justify-center md:justify-start md:items-start md:gap-8 lg:gap-6.5 xl:gap-8  ">

            {/* Mobile */}

            <div className="w-full md:hidden flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-6.5 xl:gap-8 ">
              <div className="w-full flex flex-col items-center  gap-2 xl:gap-3">
                <h1
                  className="text-2xl  md:text-3xl xl:text-5xl  md:max-w-[400px] lg:max-w-[400px] xl:max-w-[600px] font-extrabold text-[#102A43] text-center  font-sans"
                  style={{
                    lineHeight: "1.3",

                  }}
                >
                  {HERO_CONTENT.headline}
                </h1>
                <p className="text-[#374151] text-center font-normal font-sans text-sm  xl:text-xl  md:max-w-full " style={{ lineHeight: "1.5" }}>
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
                          rounded-[6px]
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
                        className="flex h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[6px] bg-[#F59E0B] px-8 py-4 font-poppins text-[0.9rem] font-semibold uppercase  text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-90"
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

                  <div className="mt-1 flex w-full flex-col items-center gap-3 md:mt-1 md:flex-row md:flex-nowrap md:items-start md:justify-start md:gap-y-0 xl:gap-4.5 ">
                    <div className="flex items-start justify-start gap-x-3.5 xl:gap-x-5 ">
                      {HERO_CONTENT.mobileBadges.slice(0, 2).map(renderBadge)}
                    </div>
                    <div className="flex items-start justify-start ">
                      {renderBadge(HERO_CONTENT.mobileBadges[2])}
                    </div>
                  </div>
                </div>
              </div>
              <div className="right flex items-center justify-center w-full h-full mt-4 ">
                <Image src={HERO_CONTENT.imageMobile.src} alt={HERO_CONTENT.imageMobile.alt} width={500} height={500}
                  className="w-full h-full object-cover object-center " />
              </div>



            </div>

            {/* Desktop view */}

            <div className="w-full hidden md:flex flex-col items-center justify-center md:justify-start md:items-start md:gap-7  xl:gap-10  ">

              <div className="w-full flex flex-col items-center  md:items-start gap-2 xl:gap-4">
                <h1
                  className=" md:text-3xl  xl:text-5xl  font-extrabold text-white text-center md:text-left lg:text-left xl:text-left 2xl:text-left md:max-w-[450px] lg:max-w-[470px] xl:max-w-[650px]  font-sans"
                  style={{
                    lineHeight: "1.3",
                  }}
                >
                  {HERO_CONTENT.headline}
                </h1>
                <p
                  className="text-center md:text-left text-sm xl:text-[1.2rem] font-normal md:max-w-[350px] lg:max-w-[400px] xl:max-w-[610px]  text-white"
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
                    <div className="relative w-full max-w-[160px] lg:max-w-[165px] xl:max-w-[212px] min-w-0 shrink ">
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
                          rounded-[6px]
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
                      className="flex h-14 w-[190px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[6px] bg-[#F59E0B] px-4 font-poppins text-[0.85rem] font-bold uppercase text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-90 md:h-13.5 lg:w-[205px] xl:h-17.5 xl:w-[260px] xl:text-lg"
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

                  <div className="mt-1 flex w-full flex-col items-center gap-3 md:mt-1 lg:flex-row md:flex-nowrap md:items-start md:justify-start md:gap-y-3 xl:gap-4.5 ">
                    <div className="flex items-start justify-start gap-x-3.5 xl:gap-x-5 ">
                      {HERO_CONTENT.desktopBadges.slice(0, 2).map(renderBadge)}
                    </div>
                    <div className="flex items-start justify-start ">
                      {renderBadge(HERO_CONTENT.desktopBadges[2])}
                    </div>
                  </div>
                </div>
              </div>
            </div>





          </div>







        </div>
      </div>
    </div>
    )
  
}