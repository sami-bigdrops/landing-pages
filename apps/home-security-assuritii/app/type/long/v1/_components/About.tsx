"use client"

import React from "react"
import Image from "next/image"
import { ABOUT_CONTENT } from "@/lib/constant"

export default function About() {
  return (
    <div className="about w-full h-full p-6 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24 xl:py-14 ">
      <div className="container mx-auto max-w-6xl ">
        <div className="flex w-full h-full flex-col items-center justify-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-12 xl:gap-45">
           <div className="w-full shrink-0 md:w-[50%] lg:w-[50%] xl:w-[50%] ">
              <Image
                src={ABOUT_CONTENT.aboutImage.src}
                alt={ABOUT_CONTENT.aboutImage.alt}
                width={800}
                height={560}
                className="h-auto w-full  lg:w-[422px] xl:w-[550px] xl:h-[330px] md:h-[270px]  rounded-[10px] object-cover shadow-[0_4px_24px_rgba(15,23,42,0.08)]"
               
                priority
              />
            </div>

          <div className="flex w-full  flex-col items-center gap-4 md:gap-6 lg:gap-11 xl:gap-10 md:w-[50%] lg:w-[50%] xl:w-[50%] md:items-start">
            <h2 className="text-xl font-bold text-[#111827] md:text-2xl lg:text-3xl lg:max-w-[200px] xl:max-w-[400px] xl:text-3xl text-left">
              {ABOUT_CONTENT.header}
            </h2>
            <p className="text-left text-sm text-[#374151] lg:text-base xl:text-[1.05rem]">
              When you’re at work. <br />On vacation. <br />
              Or asleep inside your own home. <br />

              <br />
              Without a security system, <br />
              you wouldn’t even know until it’s too late.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
