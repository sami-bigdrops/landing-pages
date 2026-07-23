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
import { HERO_CONTENT } from "@/lib/constant"



const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const ANALYTICS_FLUSH_DELAY_MS = 300;

export default function Hero() {
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
    <div
      className="relative w-full h-full  lg:min-h-[320px] xl:min-h-[510px] 2xl:min-h-[560px]"
      style={{
        background: "linear-gradient(270deg, #F8FBFF 0%, #EEF5FF 100%)",
      }}
    >


      <div className="relative z-10 w-full h-full px-6 py-8 pb-0 md:px-8 md:pt-10 md:pb-0 lg:px-14 lg:pt-14 xl:px-23 xl:pt-22 ">
        <div className="container mx-auto max-w-[1280px] ">
          <div className="hero-content relative flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-end md:justify-between ">

            {/* Mobile */}

            <div className="left md:pb-10 lg:pb-14 xl:pb-22 flex w-full h-full md:w-[58%] flex-col items-center justify-center gap-3 md:gap-1.5 md:items-start md:justify-center ">


              {HERO_CONTENT.badge.map((badge) => (
                <div
                  key={badge.text}
                  className="md:mb-1.5 flex items-center justify-center gap-1.5 rounded-full border border-[#C9E7D8] bg-[#F2FAF6] px-4 py-2.5  xl:py-3 "
                >
                  <Image src={badge.icon} alt={badge.text} width={20} height={20}
                   className="w-4.5 h-4.5 xl:w-5 xl:h-5 object-cover"
                   />
                  <span className="text-[0.77rem] md:text-[0.77rem] xl:text-sm text-[#245C49] font-medium">{badge.text}</span>
                </div>
              ))}
         

              <div className="w-full flex flex-col items-center justify-center md:items-start  gap-2.5 xl:gap-3">
                <h1
                  className="text-2xl md:text-[1.6rem]  lg:text-3xl xl:text-5xl  md:max-w-[550px] lg:max-w-[500px] xl:max-w-[650px] font-bold text-[#17212B] text-center md:text-left  font-sans"
                  style={{
                    lineHeight: "1.3",

                  }}
                >
                  {HERO_CONTENT.headline}
                </h1>
                <p className="text-[#464F5B] text-center md:text-left font-normal font-sans text-sm  xl:text-[1.19rem]  md:max-w-[350px] lg:max-w-[430px] xl:max-w-[630px] " style={{ lineHeight: "1.6" }}>
                  {HERO_CONTENT.description}
                </p>
              </div>

              <div className="mt-2.5 md:mt-0 xl:mt-3 flex-1 w-full flex flex-col md:flex-row   justify-center items-center md:justify-center lg:items-center">
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
                          border border-[#CEDBEC]
                          bg-white
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
                        className="flex h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[#2F6FED] px-8 py-4 font-poppins text-[0.9rem] font-semibold   text-white shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-90"
                      >
                        Check My Medicare Options
                      </Button>
                    </form>




                  </div>

                  {/* Desktop */}

                  <form
                    data-arohaa-zip-form
                    onSubmit={handleSubmit}
                    className="hidden relative w-full sm:flex w-full flex-row items-start justify-start  gap-2 xl:gap-3"
                  >
                    <div className="relative w-full max-w-[145px] lg:max-w-[190px] xl:max-w-[280px] min-w-0 shrink ">
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
                          h-14 md:h-14 xl:h-17.5 pl-10 xl:pl-10.5 pr-2 text-[0.9rem] lg:text-[0.95rem] xl:text-xl font-normal font-poppins
                          rounded-[10px]
                          border border-[#CEDBEC]
                          bg-white
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
                      className="flex h-14 w-[215px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-[#2F6FED] px-4 font-poppins text-[0.85rem] font-semibold  text-white shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-90 md:h-14 lg:w-[225px] xl:h-17.5 xl:w-[300px] xl:text-lg"
                    >
                      Check My Medicare Options
                    </Button>
                  </form>


                </div>
              </div>




            </div>
            <div className="right flex w-full items-end justify-center md:absolute md:-right-7 xl:-right-13 md:bottom-0 md:w-[48%]">
              <Image
                src={HERO_CONTENT.image.src}
                alt={HERO_CONTENT.image.alt}
                width={860}
                height={1080}
                priority
                className="h-auto w-full max-w-[320px] object-contain object-bottom md:max-w-none md:w-[340px] lg:w-[400px] xl:w-[550px]"
              />
            </div>




          </div>
        </div>
      </div>





    </div>








  );
}