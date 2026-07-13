"use client"

import Image from "next/image"
import { FEATURES_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type FeaturesProps = {
    onGetQuoteClick?: () => void
}

export default function Features({ onGetQuoteClick }: FeaturesProps) {
    return (
        <div

            className="w-full h-full bg-white px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12  xl:px-23 xl:py-18"
        >
            <div className="container mx-auto max-w-[1260px]">
                <div className="help-content w-full flex flex-col items-center justify-center gap-7 md:gap-11 lg:gap-14 xl:gap-16">
                    <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3">
                        <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-[2.2rem] md:max-w-[500px] lg:max-w-[400px] xl:max-w-[600px] font-bold text-[#102A43] text-center font-sans " style={{ lineHeight: '1.3' }}>
                            {FEATURES_CONTENT.headline}
                        </h2>

                    </div>

                    <div className="w-full mt-3 md:mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:items-stretch gap-7 md:gap-y-8 lg:gap-y-10 lg:gap-x-5 xl:gap-y-10 2xl:gap-y-12">
                        {FEATURES_CONTENT.steps.map((step) => (
                            <div
                                key={step.id}
                                className="flex h-full w-full flex-row-reverse items-center gap-4  lg:gap-5 "
                            >
                                <div className="flex w-full flex-1 flex-col items-start justify-start gap-1.5 md:gap-2.5">
                                    <h3 className="text-[0.95rem] xl:text-[1.1rem] lg:max-w-full font-semibold text-[#102A43] text-left font-sans">
                                        {step.title}
                                    </h3>

                                    <p className="text-[0.83rem] font-medium xl:text-base text-[#374151] text-left font-sans xl:max-w-[300px]" style={{ lineHeight: 1.6 }}>
                                        {step.description}
                                    </p>
                                </div>

                                <div className="w-11 h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14 shrink-0 p-2 flex items-center justify-center rounded-full bg-[#0752A0] shadow-[0_0_4px_0_rgba(0,0,0,0.15)]">
                           
                                    <div className="w-5.5 h-5.5 lg:w-6 lg:h-6 xl:w-8 xl:h-8">
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


                   

                </div>
            </div>
        </div>
    )
}
