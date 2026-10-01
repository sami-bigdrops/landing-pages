"use client"

import React from 'react'
import Image from 'next/image'
import { FEATURES_CONTENT } from '@/lib/constant'

export default function Features() {
  return (
    <div className="steps bg-white w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10  xl:px-23 xl:py-16">
      <div className="container mx-auto max-w-[1280px]">
        <div className="step-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-19 ">
          <h2 className="text-2xl lg:text-2xl xl:text-3xl  md:max-w-full  font-bold text-[#142B4A] text-center font-sans " style={{ lineHeight: "1.4" }}>
            {FEATURES_CONTENT.header}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-8  xl:gap-26 ">
            {FEATURES_CONTENT.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="flex flex-col-reverse items-center justify-center gap-4 md:gap-5 lg:gap-5 xl:gap-6 w-full">
                  <div className="w-full flex flex-col items-center justify-center gap-2 md:gap-2.5 ">


                    <h3 className="text-[0.95rem] lg:text-base xl:text-xl  font-semibold text-[#142B4A] text-center font-sans">
                      {step.title}
                    </h3>

                    <p className="text-[0.85rem] md:text-[0.83rem] xl:text-base xl:max-w-[300px]  mx-auto text-[#475467] text-center font-sans" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-12 h-12 lg:w-13 lg:h-13  xl:w-16 xl:h-16">
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