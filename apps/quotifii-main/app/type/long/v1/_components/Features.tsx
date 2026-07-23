"use client"

import React from 'react'
import Image from 'next/image'
import { FEATURES_CONTENT } from '@/lib/constant'

export default function Features() {
  return (
    <div className="steps bg-white w-full h-full px-6 py-8 md:px-8 md:py-8 lg:px-14 lg:py-10 lg:pb-14 xl:px-23 xl:py-14">
      <div className="container mx-auto max-w-[1380px]">
        <div className="step-content w-full flex flex-col items-center justify-center gap-10 md:gap-12 lg:gap-14 xl:gap-16 ">
          <h2 className="text-[1.5rem] md:text-2xl lg:text-2xl xl:text-4xl  md:max-w-full  font-bold text-[#1A1A1A] text-center  font-sans  tracking-tight" style={{ lineHeight: 1.3 }}>
            {FEATURES_CONTENT.header}
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-9  xl:gap-24 2xl:gap-10">
            {FEATURES_CONTENT.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="flex flex-col-reverse items-center justify-center gap-4 md:gap-5 lg:gap-5 w-full">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-2.5 ">


                    <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-[#1A1A1A] font-sans">
                      {step.title}
                    </h3>

                    <p className="text-[0.85rem]  xl:text-base   mx-auto text-[#4B5563] text-center 2xl:max-w-[240px] font-sans" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-12 h-12 xl:w-14 xl:h-14">
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
        </div>

      </div>

    </div>
  )
}