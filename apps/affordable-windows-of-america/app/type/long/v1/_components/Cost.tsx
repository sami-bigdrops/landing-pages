"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { COST_CONTENT } from "@/lib/constant"



export default function Cost() {
  return (
    <div className="about w-full h-full bg-[#F8F9FB]  px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-10  xl:px-20 xl:py-13 ">
      <div className="container mx-auto max-w-7xl">
        <div className="flex w-full h-full flex-col items-center justify-center gap-6 md:gap-10 lg:gap-10 xl:gap-14 ">
          <div className="flex w-full h-full flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] md:text-2xl  xl:text-4xl text-center" style={{ lineHeight: '1.3' }}>
                {COST_CONTENT.header}
              </h2>
          </div>
          <div className="flex w-full h-full flex-col items-center justify-center gap-6 md:flex-row md:items-center md:justify-center lg:gap-8 ">
            <div className="w-full shrink-0 md:w-[50%] lg:w-[50%] xl:w-[50%] flex items-center justify-center xl:justify-center ">
              <Image
                src="/cost-img.webp"
                alt="Cost Image"
                width={800}
                height={560}
                className="h-auto w-full md:h-[240px] md:w-[320px]   lg:w-[410px] lg:h-[260px] xl:w-[540px] xl:h-[310px]  rounded-none object-cover "

                priority
              />
            </div>

            <div className="flex w-full  flex-col items-center gap-4  lg:gap-6 xl:gap-7 md:w-[50%] lg:w-[50%] xl:w-[50%] md:items-start">
              
              <div className="w-full text-left text-sm text-[#1A1A1A] lg:text-[0.9rem] xl:text-[1.1rem] ">
                <div className="flex flex-col" style={{ lineHeight: '1.7' }}>
                  <span className="block mb-3 xl:mb-4.5 lg:max-w-[350px] xl:max-w-[480px]">Window prices can vary a lot depending on the size of the job, the window style, the frame material, and the installation work involved.</span>
                  <span className="block lg:max-w-[350px] xl:max-w-[480px]">That is exactly why so many homeowners feel unsure. One company gives a high quote, another gives a lower one, and it is hard to tell what is fair.</span>

                </div>
                <div className="mt-3 xl:mt-4.5  flex flex-col" style={{ lineHeight: '1.7' }}>
                  <span className="block lg:max-w-[350px] xl:max-w-[480px] mb-2">The goal here is simple:</span>
                  <span className="block lg:max-w-[350px] xl:max-w-[480px] font-semibold">Help you see realistic local pricing before you commit to anything.</span>

                </div>
              </div>
            </div>
          </div>
          <div className="about-info flex items-center justify-center gap-2.5 md:gap-2">
            <Image
              src={COST_CONTENT.aboutbadges[0].icon}
              alt="icon"
              width={800}
              height={560}
              className="w-5.5 h-5.5 xl:w-6 xl:h-6 object-cover"

              priority
            />
            <p className="text-[0.85rem] text-[#0F2A44] font-medium lg:text-sm xl:text-[1.05rem]">
              {COST_CONTENT.aboutbadges[0].text}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
