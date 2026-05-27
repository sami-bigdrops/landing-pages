"use client"

import React from "react"
import Image from "next/image"
import { Features_CONTENT } from "@/lib/constant_v2"




export default function Features() {
  return (
    <div className="features w-full h-full bg-white px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12  xl:px-20 xl:py-16 ">
      <div className="container mx-auto ">
        <div className="flex w-full h-full flex-col items-center justify-center gap-6 md:gap-10 lg:gap-10 xl:gap-14 ">
          <div className="flex w-full h-full flex-col items-center justify-center gap-2.5 md:gap-3 xl:gap-4">
            <h2 className="text-[1.4rem] font-extrabold text-[#111827] md:text-[1.6rem]   xl:text-4xl text-center font-sans" style={{ lineHeight: '1.3' }}>
              {Features_CONTENT.header}
            </h2>

            <p className="text-[#475467] text-center font-sans text-[0.8rem] md:text-[0.83rem] lg:text-[0.85rem] xl:text-lg font-medium  md:max-w-[550px] xl:max-w-[730px]" style={{ lineHeight: "1.6" }}>
              {Features_CONTENT.description}
            </p>
          </div>

          <div className="w-full md:max-w-[680px] lg:max-w-[880px] xl:max-w-[1300px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 ">
            {Features_CONTENT.featuresSteps.map((featureStep) => (
              <div key={featureStep.number} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                <div className="w-full flex flex-col-reverse items-center justify-center p-3.5 xl:p-4 gap-4  xl:gap-6 rounded-[10px] border border-[#D6E3F0] bg-[rgba(255,255,255,0.70)]">
           
           
                  <div className="w-full flex-1 flex flex-col items-center justify-center gap-1.5 md:gap-1.5 lg:gap-1.5 xl:gap-2">


                    <h3 className="text-[0.95rem] xl:text-[1.1rem]   font-bold text-[#111827] text-center font-sans">
                      {featureStep.title}
                    </h3>

                    <p className="text-[0.8rem]  font-normal xl:text-base   mx-auto text-[#475467] text-center font-sans" style={{ lineHeight: 1.6 }}>
                      {featureStep.description}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div className="w-full h-full md:h-[150px] lg:h-[160px] xl:h-[200px] overflow-hidden ">
                      <Image
                        src={featureStep.image.src}
                        alt={featureStep.image.alt}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover rounded-[10px]"
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
