"use client"

import Image from "next/image"
import { COVERAGE_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type CoverageProps = {
    onGetQuoteClick?: () => void
}

export default function Coverage({ onGetQuoteClick }: CoverageProps) {
    return (
        <div

            className="w-full h-full bg-[#F4F8FC] px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12  xl:px-23 xl:py-18"
        >
            <div className="container mx-auto max-w-[1280px]">
                <div className="help-content w-full flex flex-col items-center justify-center gap-6 md:gap-11 lg:gap-12 xl:gap-14">
                    <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3">
                        <h2 className="text-2xl text-center md:text-left md:text-2xl xl:text-[2.2rem]  font-bold text-[#182542] text-center font-sans " style={{ lineHeight: '1.3' }}>
                            {COVERAGE_CONTENT.headline}
                        </h2>

                                <p className="text-sm font-normal xl:text-lg text-[#4B5563] text-center  font-sans md:max-w-[570px] lg:max-w-[620px] xl:max-w-[800px]" style={{ lineHeight: '1.6' }}>{COVERAGE_CONTENT.description}</p>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 md:items-stretch gap-6 md:gap-5 lg:gap-6 xl:gap-7">
                        
                    </div>


                    <div className="w-full md:w-[235px] xl:w-[300px] mt-2.5 lg:mt-0 xl:mt-1">
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
