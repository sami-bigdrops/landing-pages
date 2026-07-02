"use client"

import Image from "next/image"
import { WORKS_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type WorksProps = {
    onGetQuoteClick?: () => void
}

export default function Works({ onGetQuoteClick }: WorksProps) {
    return (
        <div

            className="w-full h-full bg-[#F4F8FC] px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12  xl:px-23 xl:py-18"
        >
            <div className="container mx-auto max-w-[1260px]">
                <div className="help-content w-full flex flex-col items-center justify-center gap-7 md:gap-11 lg:gap-14 xl:gap-16">
                    <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3">
                        <h2 className="text-2xl text-center md:text-left md:text-2xl xl:text-[2.2rem]  font-bold text-#182542] text-center font-sans " style={{ lineHeight: '1.3' }}>
                            {WORKS_CONTENT.headline}
                        </h2>

                        <p className="text-sm font-normal xl:text-lg text-[#4B5563] text-center  font-sans md:max-w-[570px] lg:max-w-[620px] xl:max-w-[800px]" style={{ lineHeight: '1.6' }}>{WORKS_CONTENT.subtext}</p>
                    </div>

                    <div className="w-full mt-3 md:mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:items-stretch gap-7 md:gap-y-8 lg:gap-y-10 lg:gap-x-5 xl:gap-y-10 2xl:gap-y-12">
                        {WORKS_CONTENT.steps.map((step) => (
                            <div
                                key={step.id}
                                className="flex h-full w-full flex-row-reverse items-start gap-4  lg:gap-5 "
                            >
                                <div className="flex w-full flex-1 flex-col items-start justify-start gap-3 md:gap-2.5">
                                    <h3 className="text-[0.95rem] xl:text-[1.1rem] lg:max-w-full font-semibold text-[#182542] text-left font-sans">
                                        {step.title}
                                    </h3>

                                    <p className="text-[0.83rem] font-normal xl:text-base text-[#4B5563] text-left font-sans xl:max-w-[300px]" style={{ lineHeight: 1.6 }}>
                                        {step.description}
                                    </p>
                                </div>

                                <div className="w-12 h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 shrink-0 p-2 flex items-center justify-center rounded-[15px] bg-[#D4A84F] shadow-[0_0_4px_0_rgba(0,0,0,0.15)]">
                           
                                    <div className="w-6 h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8">
                                        <Image
                                            src={step.image.src}
                                            alt={step.image.alt}
                                            width={60}
                                            height={60}
                                            className="w-full h-full object-contain"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="w-full md:w-[235px] xl:w-[300px] mt-2.5 md:mt-0 xl:mt-1">
                        <ButtonUI
                            type="1"
                            variant="default"
                            htmlType="button"
                            onClick={() => onGetQuoteClick?.()}
                            className="w-full bg-[#E71E26] text-white font-semibold h-14 xl:h-16 rounded-[10px] text-sm xl:text-lg shadow-[0_0_6px_0_rgba(0,0,0,0.15)] hover:bg-[#E71E26] cursor-pointer transition-all duration-300"
                        >
                            GET MY FREE CASH OFFER
                        </ButtonUI>
                    </div>


                </div>
            </div>
        </div>
    )
}
