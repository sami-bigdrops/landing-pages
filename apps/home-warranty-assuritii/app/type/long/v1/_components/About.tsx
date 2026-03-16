"use client"

import React from 'react'
import Image from 'next/image'
import { ABOUT_CONTENT } from '@/lib/constant'

export default function About() {
  return (
    <div className="about w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10 xl:px-18 xl:py-14">
      <div className="container mx-auto ">
        <div className="features-content w-full flex flex-col items-center justify-center md:flex-row  md:justify-between lg:justify-between xl:justify-between gap-6 md:gap-10 lg:gap-13 xl:gap-16 2xl:gap-25">
          <div className="left flex flex-col items-center justify-center   md:items-start gap-3 md:gap-4 xl:gap-6 lg:w-[50%] xl:w-[58%] ">
            <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl md:max-w-[200px] lg:max-w-[300px] xl:max-w-[350px]  font-bold text-[#111827] text-center md:text-left font-inter" style={{ lineHeight: '1.2' }}>
              {ABOUT_CONTENT.header}
            </h2>
            <p className="text-sm lg:text-[0.9rem] xl:text-[1.18rem] md:max-w-[550px] lg:max-w-[500px] xl:max-w-[500px] md:text-left text-[#374151] text-center font-inter" style={{ lineHeight: '1.6' }}>
              {ABOUT_CONTENT.description}
            </p>
          </div>

          <div className="right flex flex-col items-center justify-center gap-3 w-full lg:w-[50%] xl:w-[42%] ">
            <div className="w-full xl:max-w-[550px] grid grid-cols-1 gap-4 md:gap-4.5 lg:gap-5 xl:gap-6 w-full">
              {ABOUT_CONTENT.features.map((feature) => (
                <div
                  key={feature.title}
                  className="w-full  flex items-center justify-center lg:justify-start xl:justify-start gap-3.5 md:gap-3  bg-[#F3F6FA] rounded-[20px]  p-5 md:px-5.5 md:py-4.5 xl:px-6.5 xl:py-5.5"
                >
                  <div className="flex items-center justify-center lg:items-start xl:items-start">
                    <div className="w-7 h-7 xl:w-8 xl:h-8 flex items-center justify-center">
                      <Image
                        src={feature.image.src}
                        alt={feature.image.alt}
                        width={48}
                        height={48}
                        className="w-full h-full  object-contain object-center"
                      />
                    </div>
                  </div>


                  <h3 className="text-[0.9rem] md:text-[0.9rem] lg:text-base xl:text-[1.2rem] md:max-w-[240px] lg:max-w-full  font-medium text-[#111827] text-left font-inter">
                    {feature.title}
                  </h3>


                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}