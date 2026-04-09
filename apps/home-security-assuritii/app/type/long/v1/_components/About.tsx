"use client"

import React from "react"
import Image from "next/image"
import { ABOUT_CONTENT } from "@/lib/constant"

export default function About() {
  return (
    <div className="about w-full h-full p-6 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24 xl:py-14 ">
      <div className="container mx-auto max-w-7xl ">
        <div className="flex w-full h-full flex-col items-center justify-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10 xl:gap-14 2xl:gap-18 ">
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
            <h2 className="text-xl font-bold text-[#111827] md:text-2xl md:max-w-[270px]  lg:max-w-[270px] xl:max-w-[330px] xl:text-3xl text-left" style={{ lineHeight: '1.3'}}>
              {ABOUT_CONTENT.header}
            </h2>
            <div className="w-full text-left text-sm text-[#374151] lg:text-[0.95rem] xl:text-[1.1rem]">
              <div className="flex flex-col">
                <span className="block">When you&apos;re at work.</span>
                <span className="block">On vacation.</span>
                <span className="block">Or asleep inside your own home.</span>
              </div>
              <div className="mt-4 flex flex-col">
                <span className="block">Without a security system,</span>
                <span className="block">you wouldn&apos;t even know until it&apos;s too late.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
