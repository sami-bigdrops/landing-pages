"use client"

import Image from "next/image"
import { INFO_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type InfoProps = {
  onGetQuoteClick?: () => void
}

export default function Info({ onGetQuoteClick }: InfoProps) {
    return (
        <div
            id="info-section"
            className="info w-full bg-white  p-6 md:px-10 md:py-8 lg:px-16 lg:py-10 xl:px-24  xl:py-12"
        >
            <div className="container mx-auto ">
                



                    <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row  md:gap-8 lg:gap-10 xl:gap-14">
                        <div className="left flex flex-col items-center justify-center gap-4 xl:gap-5 md:w-[50%] md:items-start md:justify-center ">
                            <h2 className="text-xl text-center md:text-left md:text-2xl xl:text-3xl xl:max-w-[450px] font-bold text-[#111827] text-center font-sans ">
                                {INFO_CONTENT.headline}
                            </h2>

                            <p className="text-sm font-normal xl:text-lg text-[#111827] text-center md:text-left font-sans ">{INFO_CONTENT.subtext}</p>

                            <div className="w-full mt-1 xl:mt-2 md:max-w-[200px] xl:max-w-[250px] ">
                                <ButtonUI
                                    type="1"
                                    variant="default"
                                    htmlType="button"
                                    onClick={() => onGetQuoteClick?.()}
                                    className="w-full bg-[#3498DB] text-white font-medium py-6 xl:py-7.5 rounded-[10px] text-sm xl:text-lg "
                                >
                                   Get Your FREE Quote
                                </ButtonUI>
                            </div>



                        </div>

                        <div className="right w-full flex flex-col items-center justify-center md:w-[50%]  md:h-[210px] lg:h-[220px] xl:h-[300px] 2xl:h-[310px] ">
                            <Image
                                src={INFO_CONTENT.image.src}
                                alt={INFO_CONTENT.image.alt}
                                width={800}
                                height={560}
                                className="w-full h-full rounded-[10px] object-cover"
                                priority
                            />
                        </div>
                  
                    </div>


                </div>
        </div>
    )
}
