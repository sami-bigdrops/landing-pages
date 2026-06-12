"use client"

import React from 'react'
import Image from 'next/image'
import { ROOF_TYPE_CONTENT } from '@/lib/constant'
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

function renderDescription(text: string) {
  return text.split(/(FREE)/g).map((part, index) =>
    part === "FREE" ? (
      <span key={index} className="font-bold">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function RoofType() {
  const router = useRouter();

  const handleCheckMyEligibility = () => {
    router.push("/form");
  };
  return (
    <div className="steps bg-white w-full h-full px-6 py-6 md:px-6 md:py-8 lg:px-14 lg:py-10  xl:px-23 xl:py-11"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.77)), url(${ROOF_TYPE_CONTENT.backgroundImage.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="container mx-auto xl:max-w-[1400px]">
        <div className="step-content w-full flex flex-col items-center justify-center gap-5 md:gap-5 lg:gap-6 xl:gap-8 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl md:text-3xl xl:text-4xl   font-bold  text-[#FFFFFF] text-center font-sans " style={{ lineHeight: "1.3" }}>
              {ROOF_TYPE_CONTENT.headline}
            </h2>
            <p className="text-center font-sans text-sm text-center font-normal text-[#FFFFFF]  xl:text-lg md:max-w-[440px] lg:max-w-[440px] xl:max-w-[550px] " style={{ lineHeight: 1.6 }}>
              {renderDescription(ROOF_TYPE_CONTENT.description)}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4  xl:gap-6">
            
          </div>
    

          <div className="flex flex-col items-center justify-center gap-2.5 mt-2 xl:mt-4">
            <Button
              type="1"
              variant="default"
              onClick={handleCheckMyEligibility}
              className="w-full md:max-w-[220px] xl:max-w-[290px] flex h-15 flex-1 cursor-pointer items-center justify-center gap-2 rounded-none px-5 py-4 md:py-3.5 xl:py-5 font-semibold tracking-normal  text-sm font-inherit text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 xl:h-19.5 xl:text-lg border-[3px] border-[#BC0B31] bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)] hover:bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)]"
            >
              Click for Pricing!
            </Button>
       
            <p className="text-xs xl:text-base text-center text-[#FFFFFF] font-sans font-normal" style={{ lineHeight: 1.5 }}>
              (Enter your ZIP and answer a few quick questions!)
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}