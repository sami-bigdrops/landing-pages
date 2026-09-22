"use client"

import React from "react"
import Image from "next/image"
import { STEPS_CONTENT } from "@/lib/constant"




export default function Steps() {
    return (
        <div className="works w-full h-full bg-white px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-23 xl:py-16">
            <div className="container mx-auto max-w-[1350px] ">
                <div className="flex w-full h-full flex-col items-center justify-center gap-8 md:gap-12 lg:gap-12 xl:gap-17 ">
                    <div className="flex w-full h-full flex-col items-center justify-center gap-2.5 xl:gap-4">
                        <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl  md:max-w-[500px]  xl:max-w-[700px] font-bold text-[#000000] text-center font-sans" style={{ lineHeight: '1.3' }}>
                            {STEPS_CONTENT.header}
                        </h2>
                        <p className="text-[#333333] text-center font-normal font-sans text-[0.85rem]  xl:text-[1.14rem]  md:max-w-[530px]  xl:max-w-[830px] " style={{ lineHeight: "1.6" }}>
                            {STEPS_CONTENT.description.before}
                            <span className="font-semibold">{STEPS_CONTENT.description.highlight}</span>
                            {STEPS_CONTENT.description.after}
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-1  md:grid-cols-4 gap-8 md:gap-7 md:gap-y-9 lg:gap-9 xl:gap-8 xl:gap-y-22">
                        {STEPS_CONTENT.steps.map((step, index) => (
                            <div
                                key={step.number}
                                className={`flex flex-col items-center gap-4 md:gap-6 lg:gap-8`}
                            >
                                <div className="w-full flex flex-col-reverse items-center justify-center gap-4  lg:gap-5 xl:gap-5">

                                    <div className="w-full flex-1 flex flex-col items-center justify-center gap-1.5 md:gap-1.5 xl:gap-2">



                                        <h3 className="text-[0.95rem] xl:text-[1.15rem]   lg:max-w-full font-semibold text-[#000000] text-center font-sans">
                                            {step.title}
                                        </h3>






                                        <p className="text-[0.83rem] font-normal xl:text-base text-[#333333] md:max-w-[290px]  xl:max-w-[250px] lg:max-w-full  mx-auto text-[#333333] text-center font-sans" style={{ lineHeight: 1.6 }}>
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center w-full h-full">
                                        <div className="flex size-17.5 items-center justify-center rounded-[20px] bg-[#EBF3FF] xl:size-20">
                                            <Image
                                                src={step.image.src}
                                                alt={step.image.alt}
                                                width={60}
                                                height={60}
                                                className="size-8.5 object-contain xl:size-10"
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
