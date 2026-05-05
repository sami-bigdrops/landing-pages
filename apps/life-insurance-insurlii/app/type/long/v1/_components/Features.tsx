"use client"

import React from 'react'
import Image from 'next/image'
import { FEATURES_CONTENT } from '@/lib/constant'

export default function Features() {
  return (
    <div className="features bg-white w-full h-full px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-10  xl:px-20 xl:py-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="features-content w-full flex flex-col items-center justify-center gap-8 md:gap-12  xl:gap-17 ">
          <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl md:max-w-[430px] xl:max-w-[540px] font-bold text-[#0F172A] text-center  font-sans " style={{ lineHeight: 1.4 }}>
            {FEATURES_CONTENT.header}
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-x-10 md:gap-y-8 lg:gap-6.5  xl:gap-14 ">
            {FEATURES_CONTENT.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center  gap-4 md:gap-6 lg:gap-8">
                <div className="flex flex-row-reverse items-start justify-start  gap-3.5  w-full">
                  <div className="flex-1 flex flex-col items-start justify-center gap-2  lg:gap-2 ">


                    <h3 className="text-base lg:text-[0.95rem] xl:text-xl font-semibold text-[#0F172A] font-sans">
                      {step.title}
                    </h3>

                    <p className="text-[0.85rem] md:text-[0.83rem] lg:text-[0.84rem] xl:text-base  text-[#374151] text-left  font-sans" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>


                  <div className="w-10 h-10 md:w-9.5 md:h-9.5 xl:w-10 xl:h-10 p-2 rounded-[10px] bg-[#E7EDF8] flex items-center justify-center">
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
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}