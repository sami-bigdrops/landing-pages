"use client"

import React from 'react'
import Image from 'next/image'
import { FEATURES_CONTENT } from '@/lib/constant'

export default function Features() {
  return (
    <div className="steps bg-[#F5F7FA] w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10  xl:px-20 xl:py-14">
      <div className="container mx-auto">
        <div className="step-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-14 xl:gap-16 ">
          <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl max-w-[200px] md:max-w-full  font-bold text-[#0F172A] text-center  font-sans " style={{ lineHeight: 1.4 }}>
            {FEATURES_CONTENT.header}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8  xl:gap-18 2xl:gap-28">
            {FEATURES_CONTENT.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center  gap-4 md:gap-6 lg:gap-8">
                <div className="flex flex-col-reverse items-center justify-center  gap-4 md:gap-5 lg:gap-5 xl:gap-6 w-full">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2  lg:gap-2 ">


                    <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-[#0F172A] font-sans">
                      {step.title}
                    </h3>

                    <p className="text-[0.85rem] md:text-[0.83rem] lg:text-sm xl:text-base md:max-w-[210px] lg:max-w-[300px] xl:max-w-[360px] mx-auto text-[#374151] text-center  font-sans" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center md:items-start w-full h-full">
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