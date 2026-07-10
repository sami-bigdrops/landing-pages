"use client";

import Image from "next/image";
import { OPTIONS_CONTENT } from "@/lib/constant";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const REDIRECT_BASE_URL = "https://auto.assurerates.com";
const REFERRER = "quotes.assurerates.com";
const TID = "3286";

export default function Options() {
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
    <div
      className="options bg-[#EBF4FF] w-full h-full px-6 py-6 md:px-6 md:py-8 lg:px-14 lg:py-10  xl:px-23 xl:py-14"

    >
      <div className="container mx-auto">
        <div className="options-content w-full flex flex-col md:flex-row items-center justify-center md:justify-center md:items-center gap-6 lg:gap-15 xl:gap-18 ">
          <div className=" w-full md:w-[50%] md:h-[190px]  lg:h-[220px] xl:h-[260px]  2xl:h-[290px]  flex items-center justify-center overflow-hidden rounded-[10px] ">
            <Image
              src={OPTIONS_CONTENT.image.src}
              alt={OPTIONS_CONTENT.image.alt}
              width={500}
              height={500}
              className="w-full h-full   object-cover flex items-center justify-center "
            
            />
          </div>
          <div className="w-full md:w-[50%]   flex flex-col items-center justify-center md:justify-center md:items-center gap-6 md:gap-5 lg:gap-7 xl:gap-9  ">
            <div className="flex flex-col items-center justify-center md:justify-center md:items-start gap-3 md:gap-3 lg:gap-4 xl:gap-5">
            <h2 className="text-xl lg:text-2xl xl:text-3xl  md:max-w-full  font-bold text-[#1A1A1A] text-center md:text-left lg:text-left xl:text-left 2xl:text-left font-poppins " style={{ lineHeight: "1.4" }}>
            {OPTIONS_CONTENT.header}
            </h2>
              <p className="text-sm  lg:text-base xl:text-lg text-[#4B5563] md:text-left text-center md:text-left lg:text-left xl:text-left 2xl:text-left font-poppins " style={{ lineHeight: 1.5 }}>
                {OPTIONS_CONTENT.description}
              </p>
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

                  <div className="hidden sm:flex w-full flex-row items-center justify-center md:justify-start gap-2 xl:gap-3.5">
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
                        h-14 md:h-14 xl:h-18 pl-10 xl:pl-11 pr-2 text-[0.9rem] lg:text-[1.05rem] xl:text-xl font-normal font-poppins
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
                      className="h-14 md:h-13.5 xl:h-17.5 w-[180px] md:w-[170px] lg:w-[180px] xl:w-[232px] shrink-0 rounded-[10px] cursor-pointer text-white font-medium font-poppins text-sm  xl:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md bg-[#F16601] hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed bg-[#F16601]"
                    >
                      {isRedirecting ? "Redirecting..." : <>Request My Quotes </>}
                    </Button>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
