"use client"

import React from 'react'
import Image from 'next/image'
import { CHOOSE_CONTENT } from '@/lib/constant'

export default function Choose() {
  return (
    <div
      className="choose w-full h-full px-6 py-8 md:px-6 md:py-11 lg:px-14 lg:py-11  xl:px-20 xl:py-17"
      style={{
        background: "linear-gradient(0deg, rgba(15, 42, 68, 0.92) 0%, rgba(15, 42, 68, 0.92) 100%), url('/choose-bg.webp') lightgray 50% / cover no-repeat"
      }}
    >
      <div className="container mx-auto">
        <div className="choose-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-14 xl:gap-16 ">
          <h2 className="text-2xl font-bold text-[#FFFFFF] md:text-2xl  xl:text-4xl text-center font-sans" style={{ lineHeight: '1.3' }}>
            {CHOOSE_CONTENT.header}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-15  xl:gap-26 2xl:gap-32">
            {CHOOSE_CONTENT.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="flex flex-col-reverse items-center justify-center gap-4 md:gap-5 lg:gap-5 xl:gap-6 w-full">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-1.5 lg:gap-2 xl:gap-2.5">


                    <h3 className="text-[0.95rem]  lg:text-base xl:text-xl  xl:max-w-[260px] font-bold text-[#FFFFFF] text-center font-sans">
                      {step.title}
                    </h3>

                    <p className="text-[0.85rem] md:text-[0.83rem] font-normal xl:text-base md:max-w-[210px] lg:max-w-[240px] xl:max-w-[295px]  mx-auto text-[#FFFFFF] text-center font-sans" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-12 h-12 md:w-13 md:h-13  lg:w-14 lg:h-14  xl:w-17 xl:h-17">
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