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
    <div className="steps bg-white w-full h-full px-6 py-10 md:px-15 md:py-10 lg:px-32 lg:py-12  xl:px-35 xl:py-16"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.77)), url(${ROOF_TYPE_CONTENT.backgroundImage.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="container mx-auto xl:max-w-[1150px]">
        <div className="step-content w-full flex flex-col items-center justify-center gap-10 xl:gap-12  ">
          <div className="flex flex-col items-center justify-center gap-4 xl:gap-5">
            <h2 className="text-2xl md:text-3xl xl:text-4xl   font-bold  text-[#FFFFFF] text-center font-sans " style={{ lineHeight: "1.3" }}>
              {ROOF_TYPE_CONTENT.headline}
            </h2>
            <p className="text-center font-sans text-[0.77rem] font-normal text-white xl:text-base md:max-w-[580px] lg:max-w-[700px] xl:max-w-[950px] " style={{ lineHeight: 1.6 }}>
              {renderDescription(ROOF_TYPE_CONTENT.description)}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-y-10 lg:gap-x-3">
            {ROOF_TYPE_CONTENT.signs.map((sign, index) => (
              <div
                key={sign.id}
                className={`flex flex-col items-center justify-center gap-2 ${
                  index === 5
                    ? "xl:col-start-2"
                    : index === 6
                      ? "xl:col-start-3"
                      : index === 7
                        ? "xl:col-start-4"
                        : ""
                }`}
              >
                <Image src={sign.image.src} alt={sign.image.alt} width={500} height={500} 
                className="w-30 h-25 lg:w-35 lg:h-26 xl:w-42 xl:h-30 object-cover object-center" priority />
                <p className="text-center font-sans text-[0.77rem] lg:text-[0.79rem] font-normal text-white  xl:text-[1.03rem]  " style={{ lineHeight: 1.6 }}>{sign.title}</p>
              </div>
            ))}
            
          </div>
    

          <div className="flex flex-col items-center justify-center gap-2.5 ">
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