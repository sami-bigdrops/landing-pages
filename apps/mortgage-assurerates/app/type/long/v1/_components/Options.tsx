"use client";

import Image from "next/image";
import { OPTIONS_CONTENT } from "@/lib/constant";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;

export default function Options() {
  const router = useRouter();
  const [zipCode, setZipCode] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleContinue = () => {
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);

    track("zip_submission", { zip_code: trimmed });

    setIsRedirecting(true);
    router.push(`/form/refinance?zip=${trimmed}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleContinue();
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div className="options bg-[#EDF2F9] w-full h-full px-4 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12 xl:px-20 xl:py-16">
      <div className="container mx-auto">
        <div className="options-content w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-6 lg:gap-10 xl:gap-14">
          <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1C2833] md:w-[40%] lg:w-[50%] xl:w-[57%]  md:max-w-[200px] lg:max-w-[300px] xl:max-w-[600px] md:text-left text-center font-inter leading-tight tracking-tight">
            {OPTIONS_CONTENT.header}
          </h2>

          <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-5  xl:gap-6 md:w-[60%] lg:w-[50%] xl:w-[43%] ">

            <div className="flex flex-col items-center md:flex-row  gap-3 md:gap-0  w-full lg:max-w-[460px] xl:max-w-full ">
              <div className="w-full">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                    <Image src="/location.svg" alt="" width={20} height={20} className="w-5 h-5 " />
                  </div>
                  <ZipCodeInput
                    id="options-zipcode"
                    value={zipCode}
                    onChange={(value) => setZipCode(value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Zip Code"
                    inputClassName="
                        h-14 md:h-14.5 xl:h-16 pl-10 pr-2 text-base lg:text-lg xl:text-xl font-normal font-inter
                        rounded-[10px] 
                        
                        md:rounded-tr-none md:rounded-br-none
                        border border-[#3498DB] 
                        md:border-r-0
                        bg-white 
                        w-full 
                        shadow-[0_0_15px_0_rgba(31,58,95,0.15)]
                      
                        placeholder:text-[#444444]
                        focus-visible:ring-0 focus-visible:ring-offset-0
                      "
                    containerClassName="w-full"
                  />
                </div>
              </div>

              <Button
                type="1"
                variant="default"
                onClick={handleContinue}
                disabled={isRedirecting || !zipValid}
                className="bg-[#3498DB] h-14 md:h-14.5 xl:h-16 md:w-47 lg:w-52 xl:w-66  cursor-pointer text-white font-semibold font-inter rounded-[10px] md:rounded-tl-none md:rounded-bl-none text-sm xl:text-lg px-8 py-6 md:py-5.5  flex items-center gap-2 transition-all duration-300 w-full max-w-md justify-center shadow-md hover:shadow-lg disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {isRedirecting ? "Redirecting..." : "Calculate My Cashout"}
                {!isRedirecting && (
                  <Image src="/arrow.svg" alt="arrow icon" width={20} height={20} className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>

            <p className="flex items-center justify-center md:justify-start gap-2 w-full lg:max-w-[460px] xl:max-w-full text-base text-[#1C2833] font-inter">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#3498DB]" />
              Your savings start here!
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
