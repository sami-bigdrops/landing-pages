"use client"

import React from 'react'
import Image from 'next/image'
import { WORKS_CONTENT } from '@/lib/constant'
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

function renderDescription(text: string) {
  return text.split(/(FREE|ONE)/g).map((part, index) =>
    part === "FREE" || part === "ONE" ? (
      <span key={index} className="font-bold">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function Works() {
  const router = useRouter();

  const handleCheckMyEligibility = () => {
    router.push("/form");
  };
  return (
    <div className="steps bg-white w-full h-full px-6 py-6 md:px-6 md:py-8 lg:px-14 lg:py-10  xl:px-23 xl:py-11">
      <div className="container mx-auto xl:max-w-[1400px]">
        <div className="step-content w-full flex flex-col items-center justify-center gap-5 md:gap-5 lg:gap-6 xl:gap-8 ">
          <h2 className="text-2xl md:text-3xl xl:text-4xl   font-bold  text-[#000000] text-center font-sans " style={{ lineHeight: "1.3" }}>
            {WORKS_CONTENT.header}
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4  xl:gap-6">
            {WORKS_CONTENT.steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8 bg-[linear-gradient(180deg,_#111_0%,_#545454_100%)]"
              >
              
                <div className="flex flex-col-reverse items-center justify-center md:justify-start p-3.5 md:py-4 lg:py-5 lg:py-4 gap-3 xl:gap-6 w-full  ">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 ">
                    <div className="flex flex-col items-center justify-center gap-0">
                      <h3 className="text-base  lg:text-base xl:text-[1.35rem]  font-semibold text-[#FFFFFF] text-center font-sans">
                        {step.step}
                      </h3>
                      <h3 className="text-base max-w-full lg:text-base xl:text-[1.35rem]  font-semibold text-[#FFFFFF] text-center font-sans">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[0.8rem]  xl:text-base  text-[#FFFFFF] text-center font-sans font-normal" style={{ lineHeight: 1.6 }}>
                      {renderDescription(step.description)}
                    </p>
                  </div>
                  <div className="flex-1 flex items-center justify-center md:items-start ">
                    <div className="w-14 h-14  xl:w-18 xl:h-18">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
       
            <p className="text-xs xl:text-base text-center text-[#000000] font-sans font-normal" style={{ lineHeight: 1.5 }}>
              (Enter your ZIP and answer a few quick questions!)
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}