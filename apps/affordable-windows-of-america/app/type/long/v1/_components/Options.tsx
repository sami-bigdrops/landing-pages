"use client";

import Image from "next/image";
import { COST_CONTENT, OPTIONS_CONTENT } from "@/lib/constant";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import { useState, useEffect } from "react";
import { setCookie } from "@workspace/lp-core";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;

export default function Options() {
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

  const handleContinue = () => {
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);

    setIsRedirecting(true);
    router.push(`/form`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue();
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div
      className="options bg-[#D5E4FB] w-full h-full px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12  xl:px-20 xl:py-15"

    >
      <div className="container mx-auto">
        <div className="options-content w-full flex flex-col md:flex-row items-center justify-center md:justify-center md:items-center gap-6 lg:gap-15 xl:gap-20 ">

          <div className="w-full   flex flex-col items-center justify-center md:justify-center md:items-center gap-7 lg:gap-8 xl:gap-10  ">
            <div className="flex flex-col items-center justify-center gap-3 md:gap-2.5 xl:gap-3">
              <h2 className="text-2xl font-bold text-[#1A1A1A] md:text-2xl  xl:text-4xl text-center " style={{ lineHeight: "1.3" }}>
                {OPTIONS_CONTENT.header}
              </h2>
              <p className="text-sm  lg:text-[0.9rem] xl:text-lg text-[#1A1A1A]  text-center font-sans " style={{ lineHeight: 1.6 }}>
                {OPTIONS_CONTENT.description}
              </p>
            </div>

            <div className="flex-1 w-full min-w-0 flex flex-col md:flex-row  md:max-w-[450px] lg:max-w-[460px] xl:max-w-[560px]  justify-center items-center md:justify-center lg:items-center">
              <div className="w-full min-w-0 h-full flex flex-col items-center justify-center md:justify-start md:items-start gap-6 md:gap-5 xl:gap-7 ">


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
                      {isRedirecting ? "Redirecting..." : <>Get My Window Price </>}
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
                      {isRedirecting ? "Redirecting..." : <>Get My Window Price </>}
                    </Button>

                  </div>
                </div>
                <div className=" grid w-auto min-w-0 grid-cols-2 justify-items-center gap-x-2 gap-y-3.5 sm:gap-x-3 sm:gap-y-3.5 md:flex md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-x-6 md:gap-y-0 lg:gap-x-6 xl:gap-x-8 ">
                  {OPTIONS_CONTENT.optionsbadges.map((badge, index) => (
                    <div
                      key={badge.text}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 justify-self-center md:flex-1 md:basis-0 md:justify-center ${index === 2 ? "col-span-2" : ""
                        }`}
                    >
                      <div className="flex size-[22px] xl:size-5.5 shrink-0 items-center justify-center rounded-[6px] bg-[#0F2A44]">
                 
                        <Image
                          src={badge.icon}
                          alt=""
                          width={22}
                          height={22}
                          className="size-3.5 xl:size-4 object-contain object-center "
                        />
                      </div>
                      <span className="min-w-0 text-left font-sans text-[0.83rem] font-normal leading-tight text-[#1A1A1A] md:text-[0.83rem] md:leading-snug lg:text-[0.85rem] xl:text-[1.08rem] md:whitespace-nowrap">
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
