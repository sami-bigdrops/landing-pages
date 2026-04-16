"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { ABOUT_CONTENT } from "@/lib/constant"



export default function About() {
  return (
    <div className="about w-full h-full bg-[#F8F9FB]  px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-10  xl:px-20 xl:py-13 ">
      <div className="container mx-auto max-w-7xl">
        <div className="flex w-full h-full flex-col items-center justify-center gap-6 md:gap-8 lg:gap-12 xl:gap-14 ">
          <div className="flex w-full h-full flex-col items-center justify-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-8 xl:gap-5 ">
            <div className="w-full shrink-0 md:w-[50%] lg:w-[50%] xl:w-[50%] flex items-center justify-center xl:justify-center ">
              <Image
                src="/about.webp"
                alt="About Image"
                width={800}
                height={560}
                className="h-auto w-full  lg:w-[390px] xl:w-[480px]   rounded-[10px] object-cover "

                priority
              />
            </div>

            <div className="flex w-full  flex-col items-center gap-4  lg:gap-6 xl:gap-7 md:w-[50%] lg:w-[50%] xl:w-[50%] md:items-start">
              <h2 className="text-2xl font-bold text-[#1A1A1A] md:text-2xl lg:max-w-[300px]  xl:max-w-[480px] xl:text-4xl text-left" style={{ lineHeight: '1.3' }}>
                {ABOUT_CONTENT.header}
              </h2>
              <div className="w-full text-left text-sm text-[#1A1A1A] lg:text-[0.9rem] xl:text-[1.1rem] ">
                <div className="flex flex-col" style={{ lineHeight: '1.7' }}>
                  <span className="block mb-3 xl:mb-4 lg:max-w-[350px] xl:max-w-[480px]">Many homeowners collect a few quotes and still end up paying more than they need to.</span>
                  <span className="block lg:max-w-[350px] xl:max-w-[480px]">Same window job. Same home. Very different pricing.</span>

                </div>
                <div className="mt-3 xl:mt-4 flex flex-col" style={{ lineHeight: '1.7' }}>
                  <span className="block lg:max-w-[350px] xl:max-w-[480px]">What changes the number is not always the product. <span className="font-semibold">It is often the markup, the sales model, and the pressure built into the quote.</span></span>

                </div>
              </div>
            </div>
          </div>
          <div className="about-info flex items-center justify-center gap-2.5 md:gap-2">
            <Image
              src={ABOUT_CONTENT.aboutbadges[0].icon}
              alt="icon"
              width={800}
              height={560}
              className="w-5.5 h-5.5 xl:w-6 xl:h-6 object-cover"

              priority
            />
            <p className="text-[0.85rem] text-[#0F2A44] font-medium lg:text-sm xl:text-[1.05rem]">
              {ABOUT_CONTENT.aboutbadges[0].text}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
