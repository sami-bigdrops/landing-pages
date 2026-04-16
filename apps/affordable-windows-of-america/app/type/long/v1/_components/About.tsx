"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { ABOUT_CONTENT } from "@/lib/constant"



export default function About() {
  return (
    <div className="about w-full h-full  p-6 md:px-6 md:py-8 lg:px-14 lg:py-10 lg:pb-14 xl:px-20 xl:py-14 ">
      <div className="container mx-auto max-w-7xl">
        <div className="flex w-full h-full flex-col items-center justify-center gap-6 ">
          <div className="flex w-full h-full flex-col items-center justify-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10 xl:gap-14 2xl:gap-18">
          <div className="w-full shrink-0 md:w-[50%] lg:w-[50%] xl:w-[50%] ">
            <Image
              src={ABOUT_CONTENT.aboutImage.src}
              alt={ABOUT_CONTENT.aboutImage.alt}
              width={800}
              height={560}
              className="h-auto w-full  lg:w-[440px] xl:w-full xl:h-[320px] md:h-[250px]  rounded-[10px] object-cover shadow-[0_4px_24px_rgba(15,23,42,0.08)]"

              priority
            />
          </div>

          <div className="flex w-full  flex-col items-center gap-4 md:gap-6 lg:gap-7 xl:gap-10 md:w-[50%] lg:w-[50%] xl:w-[50%] md:items-start">
            <h2 className="text-xl font-bold text-[#111827] md:text-2xl md:max-w-[270px]  lg:max-w-[270px] xl:max-w-[330px] xl:text-3xl text-left" style={{ lineHeight: '1.3' }}>
              {ABOUT_CONTENT.header}
            </h2>
            <div className="w-full text-left text-sm text-[#374151] lg:text-[0.95rem] xl:text-[1.1rem]">
              <div className="flex flex-col">
                <span className="block mb-2">Many homeowners collect a few quotes and still end up paying more than they need to.</span>
                <span className="block">Same window job. Same home. Very different pricing.</span>

              </div>
              <div className="mt-4 flex flex-col">
                <span className="block">What changes the number is not always the product. It is often the markup, the sales model, and the pressure built into the quote. <strong>It is often the markup, the sales model, and the pressure built into the quote.</strong></span>

              </div>
            </div>
          </div>
          </div>
          <div className="about-info">

          </div>
        </div>
      </div>
    </div>
  );
}
