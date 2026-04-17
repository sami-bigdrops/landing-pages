"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { WORKS_CONTENT } from "@/lib/constant"
import { Button } from "@workspace/ui/components/button"



export default function Works() {
  return (
    <div className="works w-full h-full bg-white px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12  xl:px-20 xl:py-16 ">
      <div className="container mx-auto ">
        <div className="flex w-full h-full flex-col items-center justify-center gap-8 md:gap-10 lg:gap-10 xl:gap-14 ">
          <div className="flex w-full h-full flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-[#1A1A1A] md:text-2xl  xl:text-4xl text-center font-sans" style={{ lineHeight: '1.3' }}>
              {WORKS_CONTENT.header}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 lg:gap-9 xl:gap-14">
            {WORKS_CONTENT.workSteps.map((workStep) => (
              <div key={workStep.number} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="w-full flex flex-col-reverse items-center justify-center px-4 py-6 gap-4 md:gap-5 lg:gap-5 xl:gap-6 w-full rounded-[20px] border border-[#0F2A44] bg-[#D5E4FB]">
           
                  <div className="w-full flex-1 flex flex-col items-center justify-center gap-2 md:gap-1.5 lg:gap-1.5 xl:gap-2">


                    <h3 className="text-[0.95rem] xl:text-[1.1rem]  md:max-w-[160px] lg:max-w-full font-semibold text-[#0F2A44] text-center font-sans">
                      {workStep.title}
                    </h3>

                    <p className="text-[0.85rem] md:text-[0.83rem] font-normal xl:text-base md:max-w-[150px]  xl:max-w-[300px] lg:max-w-full  mx-auto text-[#47494A] text-center font-sans" style={{ lineHeight: 1.6 }}>
                      {workStep.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-11 h-11 md:w-12.5 md:h-12.5 lg:w-14 lg:h-14  xl:w-18 xl:h-18">
                      <Image
                        src={workStep.image.src}
                        alt={workStep.image.alt}
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
  );
}
