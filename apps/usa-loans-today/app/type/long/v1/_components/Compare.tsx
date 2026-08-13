"use client"

import Image from "next/image"
import { COMPARE_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type CompareProps = {
    onGetQuoteClick?: () => void
}


export default function Compare({ onGetQuoteClick }: CompareProps) {
    return (
        <div className="coverage w-full h-full bg-white px-6 py-8 md:px-8 md:py-9 lg:px-14 lg:py-12 lg:pb-14 xl:px-23 xl:py-14">
            <div className="container mx-auto max-w-[1380px]">
                <div className="coverage-content w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-14 xl:gap-16 lg:max-w-[870px] xl:max-w-[1170px] mx-auto">
                    <div className="flex flex-col items-center justify-center gap-2.5 xl:gap-3">
                        <h2
                            className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#1A1A1A] text-center font-sans tracking-tight"
                            style={{ lineHeight: 1.3 }}
                        >
                            {COMPARE_CONTENT.header}
                        </h2>
                        <p
                            className="text-sm font-normal xl:text-lg mx-auto text-[#4B5563] text-center font-sans "
                            style={{ lineHeight: 1.6 }}
                        >
                            {COMPARE_CONTENT.description}
                        </p>
                    </div>

                    <div className="w-full flex flex-col-reverse items-center justify-center md:flex-row-reverse gap-7 md:gap-10 lg:gap-5 xl:gap-6">



                        <div className="left w-full grid grid-cols-1 gap-4 xl:gap-6 md:w-[50%] lg:w-[48%] xl:w-[50%] ">
                            {COMPARE_CONTENT.compareList.map((compare) => (
                                <div key={compare.title} className="flex flex-col items-center md:items-start md:justify-start gap-5 md:gap-6 lg:gap-8">
                                    <div className="flex flex-row items-center justify-start gap-3.5   w-full">
                                        <div className=" shrink-0 flex items-center justify-center">
                                            <Image
                                                src={compare.icon}
                                                alt={compare.alt}
                                                width={28}
                                                height={28}
                                                className="w-4.5 h-4.5 xl:w-6 xl:h-6 object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col items-start justify-start gap-2 xl:gap-2.5">
                                            <h3 className="text-sm lg:text-base xl:text-xl text-left font-bold text-[#1A1A1A] font-sans">
                                                {compare.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className=" right w-full h-full  flex items-center justify-center md:w-[50%] lg:w-[50%] xl:w-[50%]">
                            <Image
                                src={COMPARE_CONTENT.image.src}
                                alt={COMPARE_CONTENT.image.alt}
                                width={500}
                                height={500}
                                className="w-full h-full  lg:w-[350px]  xl:w-[430px] object-cover"
                                priority
                            />

                        </div>

                    </div>

                    <div className="w-full md:w-[235px] xl:w-[300px] lg:mt-2 xl:mt-4 ">
                        <ButtonUI
                            type="1"
                            variant="default"
                            htmlType="button"
                            onClick={() => onGetQuoteClick?.()}
                            className="w-full bg-[#C62828] text-white font-semibold h-14 xl:h-16 rounded-[10px] text-sm xl:text-lg shadow-[0_4px_10px_0_rgba(0,0,0,0.10)] hover:bg-[#C62828] cursor-pointer transition-all duration-300"
                        >
                            CHECK LOAN OPTIONS
                        </ButtonUI>
                    </div>
               
                </div>
            </div>
        </div>
    )
}