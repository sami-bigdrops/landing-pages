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
const ANALYTICS_FLUSH_DELAY_MS = 300;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource =
      getCookie("subid1") || urlParams.get("sid") || urlParams.get("utm_source") || "";
    const utmId =
      getCookie("subid2") ||
      urlParams.get("tid") ||
      urlParams.get("uid") ||
      urlParams.get("utm_id") ||
      "";
    const utmS1 =
      getCookie("subid3") || urlParams.get("sub1") || urlParams.get("utm_s1") || "";

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
    window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, ANALYTICS_FLUSH_DELAY_MS);
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div
      className="options relative w-full h-full overflow-visible px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-20 xl:py-18"
     
    >
      <div className="container mx-auto relative max-w-[1350px]">
        <div className="options-content relative w-full flex flex-col items-center justify-center  gap-6 ">
          
          <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-7 xl:gap-9 relative z-[1]">
            <div className="flex flex-col items-center justify-center  gap-3 xl:gap-4">
              <div className="flex items-center justify-center rounded-[100px] bg-[#EBF5FB] w-[60px] h-[60px] xl:w-[75px] xl:h-[75px]">
                <Image src={OPTIONS_CONTENT.icon.src} alt={OPTIONS_CONTENT.icon.alt} width={40} height={40} className="w-10 h-10 xl:w-13 xl:h-13" />
              </div>
              <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-[#1A1A1A] mdl:max-w-full  text-center font-sans  tracking-normal" style={{ lineHeight: "1.3" }}>
                {OPTIONS_CONTENT.header}
              </h2>
              <p className="text-sm  xl:text-[1.2rem] text-[#4B5563] text-center font-sans  tracking-normal" style={{ lineHeight: "1.5" }}>
                {OPTIONS_CONTENT.description}
              </p>
            </div>
            <div className="w-full space-y-4 sm:space-y-0 lg:max-w-[490px] xl:max-w-full">
                             {/* Mobile */}

            <div className="w-full md:hidden flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-6.5 xl:gap-8 md:pb-12 lg:pb-16 xl:pb-20  ">
             

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

            

              <div className="flex-1 w-full flex flex-col md:flex-row   justify-center items-center md:justify-center lg:items-center">
                <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-4 lg:gap-5 xl:gap-6  ">




                  {/* Desktop */}

                  <form
                    data-arohaa-zip-form
                    onSubmit={handleSubmit}
                    className="hidden relative w-full sm:flex w-full flex-row items-center justify-center  gap-2 xl:gap-3"
                  >
                    <div className="relative w-full max-w-[200px] lg:max-w-[220px] xl:max-w-[290px] min-w-0 shrink ">
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
    </div>
  );
}
