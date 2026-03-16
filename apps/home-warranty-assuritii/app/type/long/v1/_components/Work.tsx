"use client"

import React from 'react'
import Image from 'next/image'
import { WORK_CONTENT } from '@/lib/constant'

export default function Work() {
  return (
    <div className="work bg-[#E8F0FA] w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-18 xl:py-16 2xl:px-10">
      <div className="container mx-auto">
        <div className="step-content w-full flex flex-col items-center justify-center gap-6 md:gap-6 lg:gap-10 xl:gap-14">
          <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-[#111827] text-center  font-inter">
            {WORK_CONTENT.header}
          </h2>
          
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 xl:gap-9">
            {WORK_CONTENT.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="flex flex-col items-center justify-center lg:items-start xl:items-start lg:justify-start xl:justify-start gap-6.5 lg:gap-5 xl:gap-8 w-full rounded-[20px] border border-[#D8E4F1] bg-[#FFF] px-4.5 py-5 lg:px-5 lg:py-5.5 xl:p-6">
                  <div className="flex-1 flex flex-col items-start justify-start gap-2 xl:gap-3">
                    <div className="flex items-center lg:items-start xl:items-start gap-1.5 ">
                      <span className="text-base md:text-[0.95rem] lg:text-base xl:text-[1.25rem] font-semibold text-[#111827] font-inter text-left">
                        {step.number}.
                      </span>
                      <h3 className="text-base md:text-[0.95rem] lg:text-base xl:text-[1.25rem] font-semibold text-[#111827] font-inter text-left">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm  xl:text-base lg:max-w-[210px] xl:max-w-full  text-[#374151] text-left  font-inter">
                      {step.description}
                    </p>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-full h-full md:h-[160px] lg:h-[200px] xl:h-[240px] 2xl:h-[250px]">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={220}
                        height={180}
                        className="w-full h-full object-cover"
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