"use client"

import React from "react"
import Image from "next/image"
import { Features_CONTENT } from "@/lib/constant_v2"




export default function Features() {
  return (
    <div className="works w-full h-full bg-white px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12  xl:px-20 xl:py-16 ">
      <div className="container mx-auto ">
        <div className="flex w-full h-full flex-col items-center justify-center gap-8 md:gap-10 lg:gap-10 xl:gap-14 ">
          <div className="flex w-full h-full flex-col items-center justify-center gap-2.5 md:gap-3">
            <h2 className="text-2xl font-bold text-[#1A1A1A] md:text-2xl  xl:text-4xl text-center font-sans" style={{ lineHeight: '1.3' }}>
              {Features_CONTENT.header}
            </h2>

            <p className="text-[#475467] text-center font-sans text-[0.85rem] lg:text-sm xl:text-base font-normal  md:max-w-[550px] xl:max-w-[730px]" style={{ lineHeight: "1.6" }}>
              {Features_CONTENT.description}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-9 xl:gap-14">
            {Features_CONTENT.featuresSteps.map((featureStep) => (
              <div key={featureStep.number} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="w-full flex flex-col-reverse items-center justify-center px-4 py-6 gap-4 md:gap-5 lg:gap-5 xl:gap-6 w-full rounded-[20px] border border-[#0F2A44] bg-[#D5E4FB]">
           
                  <div className="w-full flex-1 flex flex-col items-center justify-center gap-2 md:gap-1.5 lg:gap-1.5 xl:gap-2">


                    <h3 className="text-[0.95rem] xl:text-[1.1rem]  md:max-w-[160px] lg:max-w-full font-semibold text-[#0F2A44] text-center font-sans">
                      {featureStep.title}
                    </h3>

                    <p className="text-[0.85rem] md:text-[0.83rem] font-normal xl:text-base md:max-w-[150px]  xl:max-w-[300px] lg:max-w-full  mx-auto text-[#47494A] text-center font-sans" style={{ lineHeight: 1.6 }}>
                      {featureStep.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-full h-full md:h-[150px] lg:h-[180px] xl:h-[200px]">
                      <Image
                        src={featureStep.image.src}
                        alt={featureStep.image.alt}
                        width={60}
                        height={60}
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
  );
}
