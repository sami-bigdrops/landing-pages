"use client"

import React from "react"
import { Button as ButtonUI } from "@workspace/ui/components/button"
import Image from "next/image"
import { COVER_CONTENT, FEATURES_CONTENT } from "@/lib/constant"

type CoverProps = {
  onGetQuoteClick?: () => void
  phoneNumber?: string
  phoneHref?: string
}

export default function Cover({ onGetQuoteClick }: CoverProps) {
    return (
        <div className="cover w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10 xl:px-24 xl:py-14 2xl:px-10  ">
            <div className="container mx-auto">
                <div className="cover-content w-full flex flex-col items-center justify-center  gap-6 md:gap-8 lg:gap-12 xl:gap-14 2xl:gap-16">
                    <div className=" flex flex-col items-center justify-center gap-3 md:gap-4 xl:gap-6 ">
                        <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl md:max-w-[200px] lg:max-w-[500px] xl:max-w-[500px]  font-bold text-[#111827] text-center  font-inter" style={{ lineHeight: '1.2' }}>
                            {COVER_CONTENT.header}
                        </h2>

                    </div>

                    <div className="cover-content-inner w-full flex flex-col  justify-center lg:max-w-[800px] xl:max-w-[1100px] 2xl:max-w-[1300px] ">
                        <div className="left w-full flex flex-col items-center justify-center md:justify-start gap-10  xl:gap-14 bg-[#F3F6FA] rounded-t-[20px] p-4 py-6.5 xl:py-8.5 ">
                            <h3 className="text-base lg:text-[1.05rem] xl:text-[1.3rem] font-semibold text-[#111827] text-center font-inter" style={{ lineHeight: '1.2' }}>
                                {COVER_CONTENT.homeSystems.header}
                            </h3>
                            <div className="w-full  grid grid-cols-2 md:grid-cols-4 justify-items-start gap-7 xl:gap-0 w-full">
                                {COVER_CONTENT.homeSystems.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full  flex flex-col items-center justify-start gap-2 lg:gap-4 xl:gap-4.5  "
                                    >
                                        <div className="flex items-center justify-center lg:items-start xl:items-start">
                                            <div className="w-13 h-13  xl:w-15 xl:h-15 flex items-center justify-center">
                                                <Image
                                                    src={item.image.src}
                                                    alt={item.image.alt}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full  object-contain object-center"
                                                />
                                            </div>
                                        </div>


                                        <h3 className="text-[0.83rem] lg:text-[0.87rem] xl:text-[1.1rem] md:max-w-[138px]  lg:max-w-[145px] xl:max-w-[183px] font-normal text-[#111827] text-center font-inter">
                                            {item.title}
                                        </h3>


                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="right w-full flex flex-col items-center justify-center xl:justify-start gap-10 md:gap-9.5 lg:gap-11 xl:gap-14 bg-[#F3F6FA] rounded-b-[20px] p-4 py-5 xl:py-8.5 ">
                            <h3 className="text-base lg:text-[1.05rem] xl:text-[1.3rem] font-semibold text-[#111827] text-center  font-inter" style={{ lineHeight: '1.2' }}>
                                {COVER_CONTENT.appliances.header}
                            </h3>
                            <div className="w-full grid grid-cols-2 md:grid-cols-4  gap-7 xl:gap-0 ">
                                {COVER_CONTENT.appliances.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full  flex flex-col items-center justify-start gap-2.5 lg:gap-3 xl:gap-4.5  "
                                    >
                                        <div className="flex items-center justify-center lg:items-start xl:items-start">
                                            <div className="w-13 h-13  xl:w-15 xl:h-15 flex items-center justify-center">
                                                <Image
                                                    src={item.image.src}
                                                    alt={item.image.alt}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full  object-contain object-center"
                                                />
                                            </div>
                                        </div>


                                        <h3 className="text-[0.83rem] text-[#374151]  lg:text-[0.87rem] xl:text-[1.1rem]  font-normal text-[#111827] text-center font-inter">
                                            {item.title}
                                        </h3>


                                    </div>
                                ))}

                            </div>
                            <p className="text-sm text-[#111827] font-normal mt-2 md:mt-0  xl:text-[1.1rem] italic text-center font-inter">
                                 {COVER_CONTENT.appliances.additionalText}
                            </p>
                        </div>

                    </div>

                    <div className="bottom w-full flex flex-col items-start justify-center md:flex-row md:items-start gap-4">
                        <div className="flex items-center justify-start md:w-[50%] lg:w-[50%] xl:w-[35%] gap-2">
                            <Image
                                src={FEATURES_CONTENT.features[0].image.src}
                                alt={FEATURES_CONTENT.features[0].image.alt}
                                width={24}
                                height={24}
                                className="h-4 w-4 md:w-5 md:h-5 object-contain"
                            />
                            <h3 className="text-[0.8rem] md:text-[0.9rem] lg:text-[0.95rem] xl:text-[1.2rem] font-semibold text-[#1F2937] text-left">
                                {FEATURES_CONTENT.header}
                            </h3>
                        </div>
                        <div className="w-full flex flex-col items-start justify-center md:w-[50%] lg:w-[45%] xl:w-[65%] md:grid md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3 xl:gap-0  ">
                            {FEATURES_CONTENT.features.map((item, index) => (
                                <p key={item.title} className="text-[#374151] text-[0.75rem] md:text-[0.8rem] xl:text-[0.95rem] 2xl:text-base font-medium text-center md:text-left xl:text-center">
                                    {index + 1}. {item.title}
                                </p>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}