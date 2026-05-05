"use client"

import React from 'react'
import Image from 'next/image'
import { WORKS_CONTENT } from '@/lib/constant'

export default function Works() {
  return (
    <div className="works bg-[#EAF2FD] w-full h-full px-6 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10  xl:px-20 xl:py-14">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="works-content w-full flex flex-col items-center justify-center gap-7 md:gap-10 lg:gap-12 xl:gap-14 ">
          <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl max-w-[200px] md:max-w-full  font-bold text-[#0F172A] text-center  font-sans " style={{ lineHeight: 1.4 }}>
            {WORKS_CONTENT.header}
          </h2>

          <div className="w-full grid grid-cols-1 items-stretch md:grid-cols-3 gap-6 md:gap-5 lg:gap-6 xl:gap-13">
            {WORKS_CONTENT.steps.map((step) => (
              <div key={step.number} className="h-full w-full">
                <div className="flex h-full flex-col-reverse items-start justify-end gap-4 w-full rounded-[25px] border border-[#C0CDEA] bg-white/50 p-6 xl:p-7 shadow-[0_0_2px_0_rgba(0,0,0,0.10)] md:gap-5 lg:gap-5 xl:gap-6">
           
           
                  <div className="flex flex-col items-start justify-center gap-2 lg:gap-2 xl:gap-2.5">


                    <h3 className="text-base md:text-[0.95rem] lg:text-base xl:text-xl font-semibold text-[#0F172A] font-sans">
                      {step.title}
                    </h3>

                    <p className="text-[0.85rem] md:text-[0.8rem] lg:text-sm xl:text-base  xl:max-w-[280px] text-[#374151] text-left  font-sans" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-start w-full">
                    <div className="w-11 h-11 xl:w-12 xl:h-12 flex items-center justify-center ">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain "
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