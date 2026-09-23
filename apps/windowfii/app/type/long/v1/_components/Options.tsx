
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useUtmParams,
  setCookie,
  QUOTIFII_EXTENDED_UTM_OPTIONS,
} from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { OPTIONS_CONTENT } from "@/lib/constant"



const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const ANALYTICS_FLUSH_DELAY_MS = 300;






export default function Options() {

  useUtmParams(QUOTIFII_EXTENDED_UTM_OPTIONS);
  const router = useRouter();

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
    track("zip_submission", { state: cityName || undefined, zip_code: trimmed });
    setIsRedirecting(true);
    window.setTimeout(() => {
      router.push("/form");
    }, ANALYTICS_FLUSH_DELAY_MS);
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div className="options relative w-full h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={OPTIONS_CONTENT.image.src}
          alt={OPTIONS_CONTENT.image.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 w-full h-full px-6 py-8 md:px-8 md:py-12 lg:px-14 lg:py-13 xl:px-23 xl:py-18">
        <div className="mx-auto w-full max-w-[1350px]">
          <div className="options-content flex w-full flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:gap-14 xl:gap-20">
            <div className="flex w-full flex-col items-center justify-center gap-6 md:w-[50%] md:items-start xl:gap-9 ">
              <div className="flex w-full flex-col items-center justify-center gap-2.5 md:items-start lg:gap-3 xl:gap-4">
                <h2
                  className="max-w-[500px] text-center font-sans text-[1.4rem] font-bold text-white md:text-left md:text-2xl md:max-w-[300px] lg:max-w-[380px] xl:max-w-[500px] xl:text-4xl"
                  style={{ lineHeight: "1.3" }}
                >
                  {OPTIONS_CONTENT.header}
                </h2>
                <p
                  className="max-w-[530px] text-center font-sans text-[0.85rem] font-normal text-white md:text-left md:max-w-[300px] lg:max-w-[400px] xl:max-w-[540px] xl:text-[1.14rem]"
                  style={{ lineHeight: "1.6" }}
                >
                  {OPTIONS_CONTENT.description}
                </p>
              </div>
              {/* Mobile */}

              <div className="w-full md:hidden flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-6.5 xl:gap-8 ">


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
                         h-14 pl-9.5 pr-2 text-[0.9rem] font-normal font-sans
                         rounded-[10px]
                         border border-[#CEDBEC]
                         bg-[#FFF]
                         w-full
                         shadow-[0_0_2px_0_rgba(23,33,43,0.06)]
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
                          className="flex h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[#2B75FB] px-8 py-4 font-sans text-[0.9rem] font-medium uppercase  text-white shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#2B75FB] disabled:cursor-not-allowed disabled:opacity-90"
                        >
                          {isRedirecting ? (
                            "Redirecting..."
                          ) : (
                            <>
                              Get My Free Quote
                              <ArrowRight className="size-4.5" />
                            </>
                          )}
                        </Button>
                      </form>




                    </div>


                  </div>
                </div>




              </div>

              {/* Desktop view */}

              <div className="w-full hidden md:flex flex-col items-center justify-center md:justify-start md:items-start md:gap-7  xl:gap-10  ">



                <div className="flex-1 w-full flex flex-col md:flex-row   justify-center items-center md:justify-center lg:items-center">
                  <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-7 lg:gap-7 xl:gap-10  ">




                    {/* Desktop  view*/}

                    <form
                      data-arohaa-zip-form
                      onSubmit={handleSubmit}
                      className="hidden relative w-full sm:flex w-full flex-row items-start justify-start  gap-2.5 xl:gap-3"
                    >
                      <div className="relative w-full max-w-[175px]  lg:max-w-[195px] xl:max-w-[270px] min-w-0 shrink ">
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
                         h-14 md:h-13.5 xl:h-17.5 pl-10 xl:pl-10.5 pr-2 text-[0.9rem] lg:text-[0.95rem] xl:text-xl font-normal font-sans
                         rounded-[10px]
                         border border-[#CEDBEC]
                         bg-[#FFF]
                         w-full
                         shadow-[0_0_2px_0_rgba(23,33,43,0.06)]
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
                        className="flex h-14 w-[200px] shrink-0 cursor-pointer items-center justify-center gap-1.5 xl:gap-2 rounded-[10px] bg-[#2B75FB] px-4 font-sans text-[0.85rem] font-medium uppercase text-white shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#2B75FB] disabled:cursor-not-allowed disabled:opacity-90 md:h-13.5 lg:w-[200px] xl:h-17.5 xl:w-[270px] xl:text-lg"
                      >
                        {isRedirecting ? (
                          "Redirecting..."
                        ) : (
                          <>
                            Get My Free Quote
                            <ArrowRight className="size-4.5 xl:size-5.5" />
                          </>
                        )}
                      </Button>
                    </form>


                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[42%] lg:w-[40%]  ">
            <div className="grid w-full grid-cols-2 gap-4 md:gap-4.5 lg:gap-5.5 xl:gap-8">
              {OPTIONS_CONTENT.badges.map((badge) => {
                const value = "number" in badge ? badge.number : badge.text;
                const showStar = "icon" in badge && Boolean(badge.icon);

                return (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center justify-center gap-2.5 rounded-[10px] font-normal border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.08)] px-3.5 py-4.5 text-center backdrop-blur-[2px] md:rounded-[10px]  xl:gap-3 xl:rounded-[10px] xl:px-4 xl:py-6.5"
                  >

                    <div className="flex items-center justify-center gap-1 ">
                      <span className="font-sans text-2xl font-semibold leading-none text-[#54A5FB]  lg:text-[1.7rem] xl:text-[2.3rem]">
                        {value}
                      </span>
                      {showStar ? (
                        <Image
                          src={badge.icon}
                          alt={"iconAlt" in badge ? badge.iconAlt : "Star"}
                          width={22}
                          height={22}
                          className="size-6 object-contain  xl:size-7"
                        />
                      ) : null}
                    </div>
                    <span className="font-sans text-[0.79rem] lg:text-[0.83rem] font-normal text-white  xl:text-[1.1rem]">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          </div>

          
        </div>
      </div>
    </div>

  );
}
