"use client"

import React from 'react'
import Image from 'next/image'
import { FEATURES_CONTENT } from '@/lib/constant'

export default function Features() {
  return (
    <div className="features bg-[#E8F0FA] w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-18 xl:py-16 2xl:px-10 ">
      <div className="container mx-auto">
        <div className="features-content w-full flex flex-col items-center justify-center md:flex-row  md:justify-between gap-6 md:gap-10 lg:gap-14 xl:gap-14">
          <div className="left flex flex-col items-center justify-center md:items-start gap-3 md:gap-4 xl:gap-6 md:w-[35%] xl:w-[45%] ">
            <h2 className="text-2xl lg:text-3xl xl:text-[2.6rem] lg:max-w-[250px] xl:text-4xl xl:max-w-[500px] font-bold text-[#111827] text-center md:text-left font-inter" style={{ lineHeight: '1.2' }}>
              {FEATURES_CONTENT.header}
            </h2>
            
          </div>

          <div className="right flex flex-col items-center justify-center gap-3 w-full md:w-[65%] xl:w-[55%] ">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-4 xl:gap-5  w-full">
              {FEATURES_CONTENT.features.map((feature) => (
                <div 
                  key={feature.title} 
                  className="w-full  flex items-center justify-start lg:justify-start xl:justify-start gap-3 md:gap-3  bg-[#FFF] rounded-[20px]  p-5 md:px-5.5 md:py-4 lg:py-5 xl:px-6.5 xl:py-5.5"
                >
                  <div className=" flex items-center justify-center">
                    <div className="w-5.5 h-5.5 xl:w-6.5 xl:h-6.5 flex items-center justify-center">
                      <Image
                        src={feature.image.src}
                        alt={feature.image.alt}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                    <h3 className="text-[1rem] md:text-[0.95rem]  lg:text-[1.05rem] xl:text-[1.25rem] font-medium text-[#111827] text-left font-inter">
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