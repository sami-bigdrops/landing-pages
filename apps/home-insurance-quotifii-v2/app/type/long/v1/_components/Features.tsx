"use client"

import React from 'react'
import Image from 'next/image'
import { FEATURES_CONTENT } from '@/lib/constant'

export default function Features() {
  return (
    <div className="steps bg-white w-full h-full px-6 py-6 md:px-8 md:py-8 lg:px-14 lg:py-8  xl:px-23 xl:py-14">
      <div className="container mx-auto max-w-[1400px]">
        <div className="step-content w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-14 xl:gap-19 ">
          <h2 className="text-[1.4rem] md:text-2xl  xl:text-4xl  md:max-w-full  font-bold text-[#1A1A1A] text-center font-poppins " style={{ lineHeight: "1.4" }}>
            {FEATURES_CONTENT.header}
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8  xl:gap-8 ">
            {FEATURES_CONTENT.steps.map((step) => (
              <div key={step.number} className="w-full flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="w-full flex flex-col-reverse items-center justify-center gap-4 md:gap-5 lg:gap-5 xl:gap-6 w-full">
                  <div className="w-full flex-1 flex flex-col items-center justify-center gap-2 md:gap-2.5 ">


                    <h3 className="text-[0.95rem] md:max-w-[180px] lg:max-w-full lg:text-base xl:text-xl font-semibold text-[#1A1A1A] text-center font-poppins">
                      {step.title}
                    </h3>

                    <p className="text-[0.85rem] md:text-[0.83rem] xl:text-base md:max-w-[210px] lg:max-w-[270px] xl:max-w-[330px]  mx-auto text-[#4B5563] text-center font-poppins" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>

                  <div className="w-full flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-auto h-[100px] xl:h-[130px]">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={400}
                        height={400}
                        className="w-full h-full object-contain"
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