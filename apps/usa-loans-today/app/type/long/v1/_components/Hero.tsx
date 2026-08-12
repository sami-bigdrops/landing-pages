
"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import { cn } from "@workspace/ui/lib/utils"

import Image from "next/image"
import Form from "./Form"


export default function Hero() {
    useUtmParams(30)

    return (
        <div className="relative flex items-center  bg-blue-500 justify-center min-h-0 flex-1 w-full overflow-hidden xl:min-h-[660px] 2xl:min-h-[660px]">
            {/* <div
                className="absolute inset-0 w-full h-full bg-[url('/hero-bg.webp')] bg-cover bg-no-repeat bg-[position:left_42%] md:bg-[position:52%_32%] lg:bg-[position:38%_28%] xl:bg-[position:48%_24%] 2xl:bg-[position:top_68%_right_38%]"
                role="img"

            /> */}

            <div className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center p-4 py-6 md:px-8 md:py-12 lg:px-14 lg:py-18 xl:px-23 xl:py-25">
                <div className="mx-auto w-full max-w-[1380px]">
                    <div className="hero-content flex w-full min-h-0 flex-col items-center justify-center gap-4 md:items-start md:justify-center md:gap-5 lg:gap-6 xl:gap-7">
                        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="left flex min-w-0 flex-1 flex-col items-center justify-end gap-3 sm:gap-3.5 md:gap-4 lg:items-start lg:gap-6">
                                <h1 className="w-full text-center md:text-left font-bold text-[#1A1A1A] text-[1.5rem] md:text-[1.6rem] lg:text-[1.7rem] xl:text-4xl md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]"
                                    style={{ lineHeight: "1.3" }}

                                >
                                    {HERO_CONTENT.headlineLead}
                                </h1>
                                <p className="w-full text-center md:text-left font-normal text-[#4B5563] text-sm xl:text-xl md:max-w-[370px] lg:max-w-[400px] xl:max-w-[540px]"
                                    style={{ lineHeight: "1.6" }}

                                >
                                    {HERO_CONTENT.subheadline}
                                </p>

                                <div className="flex w-full items-center justify-center md:justify-start">
                                    <div className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#002868] px-3 py-1.5 xl:gap-2 xl:px-3.5 xl:py-2">
                                        <span className="whitespace-nowrap text-[0.8rem] font-medium text-white xl:text-[0.95rem]">
                                            {HERO_CONTENT.trustpilot.text}
                                        </span>
                                        <Image
                                            src={HERO_CONTENT.trustpilot.logo.src}
                                            alt={HERO_CONTENT.trustpilot.logo.alt}
                                            width={120}
                                            height={24}
                                            className="h-4 w-auto xl:h-5"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="right mx-auto ">
                                <Form />
                            </div>
                        </div>
                        <div>
                            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-9  xl:gap-24 2xl:gap-10">
                                {HERO_CONTENT.valueProps.map((valueProp, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
                                        <div className="flex flex-col-reverse items-center justify-center gap-4 md:gap-5 lg:gap-5 w-full">
                                            <div className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-2.5 ">


                                                <h3 className="text-base xl:text-xl font-semibold text-[#1A1A1A] font-sans">
                                                    {valueProp.title}
                                                </h3>

                                                <p className="text-[0.85rem]  xl:text-base   mx-auto text-[#4B5563] text-center 2xl:max-w-[240px] font-sans" style={{ lineHeight: 1.6 }}>
                                                    {valueProp.description}
                                                </p>
                                            </div>

                                            <div className="flex-1 flex items-center justify-center w-full h-full">
                                                <div className="w-12 h-12 xl:w-14 xl:h-14">
                                                    <Image
                                                        src={valueProp.icon}
                                                        alt={valueProp.title}
                                                        width={60}
                                                        height={60}
                                                        className="w-full h-full object-contain"
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
            </div>
        </div>

    )
}
