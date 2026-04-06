"use client";

import { useState, useEffect } from "react";
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HERO_CONTENT } from "@/lib/constant";
import { fontPoppins } from "@/app/fonts";
// import { track } from "@workspace/lp-core";

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

  const router = useRouter();
  const handleCheckMyEligibility = () => {
    router.push("/form");
  };

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

    // track("zip_submission", { state: cityName || undefined, zip_code: trimmed });

    setIsRedirecting(true);
    window.location.href = redirectUrl;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue();
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div className="relative w-full h-full ">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/hero-bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center "
        }}
      />
      {/* <div
        className="absolute inset-0 w-full h-full bg-black/40"
        aria-hidden
      /> */}
      <div className="relative z-10 w-full h-[550px] md:h-[420px] lg:h-[420px] xl:h-[550px] 2xl:h-[650px] px-6 pb-0 sm:px-6 lg:px-8 py-10 lg:pt-13 xl:pt-20 2xl:pt-26   md:px-8 xl:px-23 2xl:pb-0 ">
        <div className="container mx-auto ">
          <div className="hero-content w-full flex flex-col items-center justify-center gap-6 md:gap-7 lg:gap-6.5 xl:gap-8 2xl:gap-9 ">
            <div className="w-full flex flex-col items-center justify-center gap-4 xl:gap-5">
              <div
                className="inline-flex items-center gap-2 p-2 rounded-[20px] border border-[#FDB813] bg-[rgba(255,255,255,0.8)]"
              >
                <Image
                  src={HERO_CONTENT.icon}
                  alt="icon"
                  width={20}
                  height={20}
                  className="w-4 h-4 xl:w-4.5 xl:h-4.5 text-[#F9A825]"
                  priority
                />
                <p className="text-center text-xs font-normal text-[#222D38] xl:text-[0.9rem]">
                  {HERO_CONTENT.topDescription}
                </p>
              </div>
              <h1
                className={`${fontPoppins.className} text-[1.35rem] font-bold text-center md:text-[1.5rem]  lg:text-[1.65rem]  xl:text-[2rem] `}
                style={{ lineHeight: "1.4" }}
              >
                <span className="text-[#1F2937]">Solar In </span>
                <span className="text-[#FF7A00]">{cityName || "Your Area"}</span>
                <span className="text-[#1F2937]"> </span>
                <span className="text-[#FF7A00]">?</span> <br />
                <span className="text-[#1F2937]"> Check if you qualify for $0 down.</span>
              </h1>
              <p className="text-center text-sm xl:text-base font-normal text-[#4B5563]" style={{ lineHeight: "1.5" }}>{HERO_CONTENT.description}</p>
            </div>
            <div className="flex-1 w-full  h-full">
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-4 lg:gap-5 xl:gap-7  ">
                

                <div className="w-full h-full space-y-4 sm:space-y-0 lg:max-w-[490px] xl:max-w-full">
                  {/* Mobile */}
                  <div className="block sm:hidden space-y-2">
                    <div className="relative w-full h-full">
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/home-location.svg" alt="location icon" width={20} height={20} className="w-6 h-6 xl:w-6 xl:h-6 " />
                      </div>
                      <ZipCodeInput
                        id="hero-zipcode-mobile"
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                        onKeyDown={handleKeyPress}
                        placeholder="90001"
                        inputClassName="
                          h-14 pl-13 pr-2 text-[0.9rem] font-normal font-inherit
                          rounded-[6px]
                        
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
                      onClick={handleCheckMyEligibility}
                      className="bg-[#0D9488] h-14 w-full cursor-pointer rounded-[6px] px-8 py-4 text-[0.9rem] font-medium font-inherit text-white shadow-md transition-all duration-300 hover:bg-[#F16601] disabled:cursor-not-allowed disabled:opacity-90 flex items-center justify-center gap-2"
                    >
                      {isRedirecting ? "Redirecting..." : <>Check My Eligibility </>}
                    </Button>
                  </div>

                  {/* Desktop */}

                  <div className="hidden sm:block relative w-full md:max-w-[380px] xl:max-w-[430px] mx-auto">
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                      <Image src="/home-location.svg" alt="location icon" width={20} height={20} className="md:w-5 md:h-5 xl:w-6 xl:h-6 " />
                    </div>
                    <ZipCodeInput
                      id="hero-zipcode"
                      value={zipCode}
                      onChange={(value) => setZipCode(value)}
                      onKeyDown={handleKeyPress}
                      placeholder="90001"
                      inputClassName="
                        h-14 md:h-14.5 xl:h-18 pl-13 pr-2 text-[0.9rem] xl:text-lg font-normal font-inherit
                        rounded-[6px]
                        border border-[#D1D5DB]
                        bg-white
                        w-full
                        shadow-[0_0_10px_0_rgba(0,0,0,0.15)]
                        placeholder:text-[#444444]
                        placeholder:text-sm xl:placeholder:text-lg
                        focus-visible:ring-0 focus-visible:ring-offset-0
                      "
                      containerClassName="w-full"
                    />
                    <Button
                      type="1"
                      variant="default"
                      onClick={handleCheckMyEligibility}
                      disabled={isRedirecting || !zipValid}
                      className="absolute right-2 top-2 xl:top-3 xl:right-2.5 flex md:h-10.5 xl:h-12   cursor-pointer items-center justify-center gap-2 rounded-[6px]  bg-[#0D9488] text-sm font-medium font-inherit text-white shadow-md transition-all duration-300 hover:bg-[#F16601] disabled:cursor-not-allowed disabled:opacity-90  md:w-[165px] xl:w-[185px]   lg:text-[0.9rem] xl:text-base"
                    >
                      {isRedirecting ? "Redirecting..." : <>Check My Eligibility </>}
                    </Button>
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
