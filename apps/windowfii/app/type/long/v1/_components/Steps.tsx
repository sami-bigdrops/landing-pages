"use client"

import React from "react"
import Image from "next/image"
import { STEPS_CONTENT } from "@/lib/constant"




export default function Steps() {
    return (
        <div className="works w-full h-full bg-[#F7F9FC] px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-23 xl:py-16">
            <div className="container mx-auto max-w-[1400px] ">
                <div className="flex w-full h-full flex-col items-center justify-center gap-8 md:gap-12 lg:gap-12 xl:gap-14 ">
                    <div className="flex w-full h-full flex-col items-center justify-center">
                        <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl max-w-[200px] md:max-w-full font-bold text-[#102A43] text-center font-sans" style={{ lineHeight: '1.3' }}>
                            {STEPS_CONTENT.header}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-7 md:gap-y-12 lg:gap-9 xl:gap-20 xl:gap-y-25">
                        {STEPS_CONTENT.steps.map((step, index) => (
                            <div
                                key={step.number}
                                className={`flex flex-col items-center gap-4 md:gap-6 lg:gap-8 ${index === STEPS_CONTENT.steps.length - 1
                                    ? "md:col-span-2 md:max-w-[50%] md:mx-auto lg:col-span-1 lg:max-w-full"
                                    : ""
                                    }`}
                            >
                                <div className="w-full flex flex-col-reverse items-center justify-center gap-4 md:gap-5 lg:gap-5 xl:gap-6">

                                    <div className="w-full flex-1 flex flex-col items-center justify-center gap-2 md:gap-1.5 lg:gap-1.5 xl:gap-2">

                                        <div className="flex items-center justify-center gap-1 md:gap-1.5 xl:gap-2">
                                            <p className="text-[0.95rem] xl:text-[1.1rem] ] text-[#0752A0] font-extrabold  font-sans" >
                                                {step.numberText}
                                            </p>
                                            <h3 className="text-[0.95rem] xl:text-[1.15rem]   lg:max-w-full font-semibold text-[#102A43] text-center font-sans">
                                                {step.title}
                                            </h3>


                                        </div>

                                        

                                        <p className="text-[0.83rem] font-medium xl:text-base text-[#374151]  xl:max-w-[300px] lg:max-w-full  mx-auto text-[#47494A] text-center font-sans" style={{ lineHeight: 1.6 }}>
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center w-full h-full">
                                        <div className="w-24 h-24  xl:w-25 xl:h-25">
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
    );
}
