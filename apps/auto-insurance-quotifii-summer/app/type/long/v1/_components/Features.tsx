"use client"

import React from 'react'
import Image from 'next/image'
import { FEATURES_CONTENT } from '@/lib/constant'

export default function Features() {
  return (
    <div className="steps bg-white w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 lg:pb-14 xl:px-20 xl:py-14">
      <div className="container mx-auto">
        <div className="step-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-14 xl:gap-16 ">
          <div className="flex flex-col items-center justify-center gap-4 xl:gap-6">
            <div
              className="flex items-center gap-2 px-3.5 py-2 xl:px-4 xl:py-2.5 rounded-[50px] border bg-[rgba(255,190,90,0.10)] border-[rgba(255,190,90,0.40)] shadow-[0_0_6px_0_rgba(0,0,0,0.04)] backdrop-blur-[2px]"
              style={{
                
                borderRadius: '50px'
              }}
            >
              <Image src={FEATURES_CONTENT.badge.image.src} alt={FEATURES_CONTENT.badge.image.alt} width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
              <p className="text-[#003599] font-semibold text-[0.82rem]  xl:text-base uppercase tracking-medium  font-sans">
                {FEATURES_CONTENT.badge.text}
              </p>
            </div>
    
            <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl max-w-[240px] md:max-w-full  font-bold text-[#1A1A1A] text-center  font-sans  tracking-normal" style={{ lineHeight: 1.3 }}>
              {FEATURES_CONTENT.header}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10  xl:gap-26 2xl:gap-32">
            {FEATURES_CONTENT.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="flex flex-col-reverse items-center justify-center gap-4 md:gap-5 lg:gap-5 w-full">
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-2.5 ">


                    <h3 className="text-base lg:text-lg xl:text-xl font-semibold text-[#1A1A1A] font-sans">
                      {step.title}
                    </h3>

                    <p className="text-sm  xl:text-base md:max-w-[210px] lg:max-w-[300px] xl:max-w-[300px] 2xl:max-w-[340px] mx-auto text-[#4B5563] text-center  font-sans" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-14 h-14 xl:w-15 xl:h-15">
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