"use client"

import React from "react"
import { Button as ButtonUI } from "@workspace/ui/components/button"
import Image from "next/image"
import { COVER_CONTENT } from "@/lib/constant"

type CoverProps = {
  onGetQuoteClick?: () => void
  phoneNumber?: string
  phoneHref?: string
}

export default function Cover({ onGetQuoteClick, phoneNumber, phoneHref }: CoverProps) {
  const displayPhone = phoneNumber ?? COVER_CONTENT.callToAction.phoneNumber
  const displayPhoneHref = phoneHref ?? COVER_CONTENT.callToAction.phoneHref
    return (
        <div className="cover w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10 xl:px-18 xl:py-14 2xl:px-10  ">
            <div className="container mx-auto">
                <div className="cover-content w-full flex flex-col items-center justify-center  gap-10 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">
                    <div className=" flex flex-col items-center justify-center gap-3 md:gap-4 xl:gap-6 ">
                        <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl md:max-w-[200px] lg:max-w-[500px] xl:max-w-[500px]  font-bold text-[#111827] text-center  font-inter" style={{ lineHeight: '1.2' }}>
                            {COVER_CONTENT.header}
                        </h2>

                    </div>

                    <div className="cover-content-inner w-full flex flex-col  justify-center md:flex-row  ">
                        <div className="left w-full flex flex-col items-center justify-center md:justify-start gap-10  xl:gap-14 bg-[#F3F6FA] rounded-t-[20px] md:rounded-bl-[20px] md:rounded-tr-none p-4 py-6.5 xl:py-8.5 ">
                            <h3 className="text-base lg:text-[1.05rem] xl:text-[1.3rem] font-semibold text-[#111827] text-center font-inter" style={{ lineHeight: '1.2' }}>
                                {COVER_CONTENT.homeSystems.header}
                            </h3>
                            <div className="w-full  grid grid-cols-2 justify-items-start gap-7  lg:gap-y-7.5  xl:gap-y-10 w-full">
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
                        <div className="right w-full flex flex-col items-center justify-center xl:justify-start gap-10 md:gap-9.5 lg:gap-11 xl:gap-14 bg-[#1F3A5F] rounded-b-[20px] md:rounded-tr-[20px] md:rounded-l-none p-4 py-6.5 xl:py-8.5 ">
                            <h3 className="text-base lg:text-[1.05rem] xl:text-[1.3rem] font-semibold text-[#FFFFFF] text-center  font-inter" style={{ lineHeight: '1.2' }}>
                                {COVER_CONTENT.appliances.header}
                            </h3>
                            <div className="w-full grid grid-cols-2  gap-7 md:gap-y-11.5 lg:gap-y-13.5 xl:gap-y-17 ">
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


                                        <h3 className="text-[0.83rem] text-[#FFFFFF]  lg:text-[0.87rem] xl:text-[1.1rem]  font-normal text-[#111827] text-center font-inter">
                                            {item.title}
                                        </h3>


                                    </div>
                                ))}

                            </div>
                            <p className="text-sm text-[#FFFFFF] font-normal mt-2 md:mt-0  xl:text-[1.1rem] italic text-center font-inter">
                                 {COVER_CONTENT.appliances.additionalText}
                            </p>
                        </div>

                    </div>

                    <div className="bottom flex flex-col items-center justify-center gap-5 xl:gap-6">
                        <div className="w-full ">
                            <ButtonUI
                                type="1"
                                variant="default"
                                htmlType="button"
                                onClick={onGetQuoteClick}
                                className="w-full bg-[#3498DB] text-white font-medium py-7 xl:py-7.5 rounded-[10px] text-sm lg:text-[0.95rem] xl:text-lg cursor-pointer"
                            >
                                {COVER_CONTENT.callToAction.buttonText}
                            </ButtonUI>
                        </div>
                        <div className="w-full flex items-center justify-center text-center text-[#1F3A5F] text-sm lg:text-[0.95rem]  xl:text-lg gap-1.5">
                            <p className="font-medium">{COVER_CONTENT.callToAction.contactText}</p>
                            <a href={displayPhoneHref} className="font-bold">{displayPhone}</a>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}