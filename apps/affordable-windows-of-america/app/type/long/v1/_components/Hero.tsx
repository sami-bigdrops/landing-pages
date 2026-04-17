"use client";

import { useState, useEffect } from "react";
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { FORM_CONTENT, HERO_CONTENT } from "@/lib/constant";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://autoquote.quotifii.com";

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

    setIsRedirecting(true);
    window.location.href = redirectUrl;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue();
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div className="relative w-full h-full md:min-h-[280px] lg:min-h-[320px] xl:min-h-[480px]  px-6 sm:px-6 lg:px-14 py-10 md:py-12 md:px-8 lg:py-16 xl:px-23 xl:py-25 "
    style={{
      backgroundImage: "url('/hero-bg.webp')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      
      {/* <div
        className="absolute inset-0 w-full h-full bg-black/10"
        aria-hidden
      /> */}
      <div className="relative z-10 w-full h-full ">
        <div className="container mx-auto ">
          <div className="hero-content w-full flex flex-col items-center justify-center md:justify-start md:items-start gap-6 md:gap-8 lg:gap-6.5 xl:gap-8 2xl:gap-9 ">
            <div className="w-full flex flex-col items-center  md:items-start gap-3 xl:gap-4">
              <h1
                className="text-3xl md:text-4xl lg:text-[2.5rem] xl:text-5xl  font-extrabold text-white text-center md:text-left lg:text-left xl:text-left 2xl:text-left md:max-w-[450px] lg:max-w-[470px] xl:max-w-[600px] 2xl:max-w-[700px] font-sans"
                style={{
                  lineHeight: "1.3",
                }}
              >
                {HERO_CONTENT.headline}
              </h1>
              <p className="text-center md:text-left text-sm xl:text-lg font-normal md:max-w-[450px] lg:max-w-[450px] xl:max-w-[600px]  text-white" style={{ lineHeight: "1.6" }}>{HERO_CONTENT.description}</p>
            </div>
            <div className="flex-1 w-full min-w-0 flex flex-col md:flex-row p-4 md:p-3 xl:p-3.5 md:max-w-[450px] lg:max-w-[460px] xl:max-w-[560px] rounded-[10px] bg-[#0F2A44] justify-center items-center md:justify-center lg:items-center">
              <div className="w-full min-w-0 h-full flex flex-col items-center justify-center md:justify-start md:items-start gap-6 md:gap-5.5 xl:gap-6 ">
         

                <div className="w-full h-full space-y-4 sm:space-y-0 lg:max-w-[490px] xl:max-w-full">
                  {/* Mobile */}
                  <div className="block sm:hidden space-y-3 mb-0">
                    <div className="relative w-full h-full">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/form-location.svg" alt="location icon" width={20} height={20} className="w-5.5 h-5.5 xl:w-6 xl:h-6 " />
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
                          border border-[#BBB]
                          bg-white
                          w-full
                          shadow-[0_0_10px_0_rgba(0,0,0,0.15)]
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
                      className="bg-[#DD2525] h-14 w-full cursor-pointer uppercase rounded-[6px] px-8 py-4 text-[0.9rem] font-medium font-inherit text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-[#DD2525] disabled:cursor-not-allowed disabled:opacity-90 flex items-center justify-center gap-2"
                    >
                      {isRedirecting ? "Redirecting..." : <>See My Window Price </>}
                    </Button>
               
                  </div>

                  {/* Desktop */}

                  <div className="hidden sm:block relative w-full ">
                    <div className="absolute left-3 xl:left-4 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                      <Image src="/form-location.svg" alt="location icon" width={20} height={20} className="md:w-5 md:h-5 xl:w-6 xl:h-6 " />
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
                        border border-[#BBB]
                        bg-white
                        w-full
                        shadow-[0_0_10px_0_rgba(0,0,0,0.15)]
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
                      className="absolute right-1.5 top-1.5 xl:top-2 xl:right-2 uppercase flex md:h-13 xl:h-15.5 cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#DD2525] text-sm font-medium font-inherit text-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-[#DD2525] disabled:cursor-not-allowed disabled:opacity-90 md:w-[200px] xl:w-[235px]  xl:text-base"
                    >
                      {isRedirecting ? "Redirecting..." : <>See My Window Price </>}
                    </Button>
               
                  </div>
                </div>
                <div className=" grid w-auto min-w-0 grid-cols-2 justify-items-center gap-x-2 gap-y-3.5 sm:gap-x-3 sm:gap-y-3.5 md:flex md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-x-5 md:gap-y-0 lg:gap-x-5 xl:gap-x-7 ">
                  {FORM_CONTENT.badges.map((badge, index) => (
                    <div
                      key={badge.text}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 justify-self-center md:flex-1 md:basis-0 md:justify-center ${
                        index === 2 ? "col-span-2" : ""
                      }`}
                    >
                      <div className="flex size-[22px] shrink-0 items-center justify-center rounded-[6px] bg-white/80 ">
                        <Image
                          src={badge.icon}
                          alt="badge icon"
                          width={22}
                          height={22}
                          className="size-3.5 object-contain object-center "
                        />
                      </div>
                      <span className="min-w-0 text-left font-sans text-[0.83rem] font-normal leading-tight text-white md:text-[0.83rem] md:leading-snug lg:text-[0.85rem] xl:text-[1rem] md:whitespace-nowrap">
                        {badge.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
