"use client"

import Image from "next/image"
import { WORKS_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type WorksProps = {
    onGetQuoteClick?: () => void
}


export default function Works({ onGetQuoteClick }: WorksProps) {
    return (
        <div className="coverage w-full h-full bg-white px-6 py-8 md:px-8 md:py-9 lg:px-14 lg:py-12 lg:pb-14 xl:px-23 xl:py-14">
            <div className="container mx-auto max-w-[1380px]">
                <div className="coverage-content w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-14 xl:gap-16 lg:max-w-[830px] xl:max-w-[1040px] mx-auto">
                    <div className="flex flex-col items-center justify-center gap-2.5 xl:gap-3">
                        <h2
                            className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#1A1A1A] text-center font-sans tracking-tight"
                            style={{ lineHeight: 1.3 }}
                        >
                            {WORKS_CONTENT.header}
                        </h2>
                        <p
                            className="text-sm font-normal xl:text-lg mx-auto text-[#4B5563] text-center font-sans md:max-w-[520px] lg:max-w-[600px] xl:max-w-[480px]"
                            style={{ lineHeight: 1.6 }}
                        >
                            {WORKS_CONTENT.description}
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center md:flex-row-reverse gap-6 md:gap-10 lg:gap-5 xl:gap-6">



                        <div className="left w-full grid grid-cols-1 gap-9 md:gap-8 xl:gap-9 md:w-[50%] lg:w-[48%] xl:w-[50%] ">
                            {WORKS_CONTENT.steps.map((step) => (
                                <div key={step.number} className="flex flex-col items-center md:items-start md:justify-start gap-4 md:gap-6 lg:gap-8">
                                    <div className="flex flex-row-reverse items-start justify-start md:items-start md:justify-start gap-4  lg:gap-5 w-full">
                                        <div className="flex-1 flex flex-col items-start md:items-start justify-start gap-2 xl:gap-2.5 ">


                                            <h3 className="text-base  xl:text-xl text-left font-bold text-[#1A1A1A] font-sans">
                                                {step.title}
                                            </h3>

                                            <p className="text-[0.85rem]  xl:text-base font-medium   text-left text-[#486581]  xl:max-w-[380px] font-sans" style={{ lineHeight: 1.6 }}>
                                                {step.description}
                                            </p>
                                        </div>

                                        <div
                                            className="w-9 h-9 xl:w-10 xl:h-10 shrink-0 rounded-full bg-[#3B82F6] flex items-center justify-center"
                                            aria-hidden
                                        >
                                            <span className="text-white font-semibold text-[1.1rem] xl:text-lg ">
                                                {step.numberText}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden md:block right w-full h-full  flex items-center justify-center md:w-[50%] lg:w-[50%] xl:w-[50%]">
                            <Image
                                src={WORKS_CONTENT.image.src}
                                alt={WORKS_CONTENT.image.alt}
                                width={500}
                                height={500}
                                className="w-full h-full lg:w-[350px]  xl:w-[430px] object-cover"
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