"use client"

import React from 'react'
import Image from 'next/image'
import { ABOUT_CONTENT } from '@/lib/constant'

export default function About() {
  return (
    <div className="about w-full h-full  px-6 py-12 md:px-10 md:py-14 xl:py-12  xl:px-20 ">
      <div className="container mx-auto max-w-6xl">
        <div className="features-content w-full flex flex-col items-center justify-center  gap-6 md:gap-10 lg:gap-13 xl:gap-16 2xl:gap-25">
          <div className="left flex flex-col items-center justify-center  gap-3 md:gap-4 xl:gap-6 ">
            <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl md:max-w-[400px] lg:max-w-[500px] xl:max-w-[520px]  font-bold text-[#111827] text-center font-inter" style={{ lineHeight: '1.2' }}>
              {ABOUT_CONTENT.header}
            </h2>
            <p className="text-sm lg:text-[0.9rem] xl:text-base md:max-w-[500px] lg:max-w-[500px] xl:max-w-[580px]  text-[#374151] text-center font-inter" style={{ lineHeight: '1.6' }}>
              {ABOUT_CONTENT.description}
            </p>
          </div>

          <div className="right flex flex-col items-center justify-center gap-3 w-full  ">
            <div className="w-full  grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4.5 lg:gap-8 xl:gap-12 w-full">
              {ABOUT_CONTENT.features.map((feature) => (
                <div
                  key={feature.title}
                  className="w-full  flex flex-col items-center justify-center lg:justify-start xl:justify-start gap-3.5 xl:gap-4 "
                >
                  <div className="flex items-center justify-center lg:items-start xl:items-start  bg-[#F3F6FA] rounded-[20px] p-5.5 md:p-5 lg:p-5.5 xl:p-6.5 ">
                    <div className="w-10.5 h-10.5 lg:w-12 lg:h-12  xl:w-15 xl:h-15 flex items-center justify-center">
                      <Image
                        src={feature.image.src}
                        alt={feature.image.alt}
                        width={48}
                        height={48}
                        className="w-full h-full  object-contain object-center"
                      />
                    </div>
                  </div>


                  <h3 className="text-[0.95rem] md:text-sm  lg:text-[0.95rem] xl:text-[1.15rem] max-w-[220px] md:max-w-[200px] lg:max-w-[220px] xl:max-w-[330px] font-medium text-[#111827] text-center font-inter">
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
