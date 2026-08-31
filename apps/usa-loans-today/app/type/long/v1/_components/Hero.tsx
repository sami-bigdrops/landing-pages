
"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import { cn } from "@workspace/ui/lib/utils"

import Image from "next/image"
import Form from "./Form"


export default function Hero() {
    useUtmParams(30)

    return (
        <div
            className="relative flex items-center justify-center min-h-0 flex-1 w-full overflow-hidden xl:min-h-[640px] px-6 py-8 md:px-8 md:py-12 lg:px-14 lg:py-13 xl:px-23 xl:py-15"
            style={{
                backgroundImage:
                    "url('/hero-bg.webp'), linear-gradient(180deg, #1B4D82 0%, #163D6B 55%, #0F2D52 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
   
            <div className="mx-auto w-full max-w-[1300px]">
                <div className="hero-content flex w-full min-h-0 flex-col items-center justify-center gap-8 md:items-start md:justify-center md:gap-14 lg:gap-16 xl:gap-18">
                    <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="left md:w-[50%] lg:w-[52%] xl:w-[58%] flex min-w-0 flex-1 flex-col items-center justify-center gap-3 sm:gap-3.5 md:gap-4 md:items-start xl:gap-5">
                            <h1 className="w-full text-center md:text-left font-bold text-white text-3xl lg:text-4xl xl:text-5xl md:max-w-[250px] lg:max-w-[390px] xl:max-w-[480px] font-sans"
                                style={{ lineHeight: "1.3" }}

                            >
                                {HERO_CONTENT.headlineLead1} {" "}
                                <span className="text-[#FFD759]">{HERO_CONTENT.headlineLead2}</span>
                            </h1>
                            <p className="w-full text-center md:text-left font-normal text-white text-[0.85rem] xl:text-xl md:max-w-[370px] lg:max-w-[400px] xl:max-w-[540px] font-sans"
                                style={{ lineHeight: "1.6" }}

                            >
                                {HERO_CONTENT.subheadline}
                            </p>

                            <div className="mt-2 md:mt-4 xl:mt-5 flex w-full items-end justify-center md:justify-start gap-2">

                                <p className="text-[0.85rem] xl:text-[1.15rem] text-center  font-normal text-white  font-sans">
                                    {HERO_CONTENT.trustpilot.text}
                                </p>
                                <div className="w-auto h-6 xl:h-10 flex items-center justify-center">
                                    <Image
                                        src={HERO_CONTENT.trustpilot.logo.src}
                                        alt={HERO_CONTENT.trustpilot.logo.alt}
                                        width={104}
                                        height={104}
                                        className="w-full h-full object-contain"
                                    />
                                </div>


                            </div>
                        </div>
                        <div className="right mx-auto md:w-[50%] lg:w-[48%] xl:w-[42%]">
                            <Form heroOnly />
                        </div>
                    </div>
                    <div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-9  xl:gap-24 2xl:gap-10">
                            {HERO_CONTENT.valueProps.map((valueProp, idx) => (
                                <div key={idx} className="flex flex-col items-center md:justify-start md:items-start gap-4 md:gap-6 lg:gap-8">
                                    <div className="flex flex-col-reverse items-center justify-center md:justify-start md:items-start gap-4  lg:gap-5 w-full">
                                        <div className="flex-1 flex flex-col items-center md:justify-start md:items-start gap-2.5 md:gap-3 lg:gap-4 ">


                                            <h3 className="text-base xl:text-xl font-semibold text-white font-sans">
                                                {valueProp.title}
                                            </h3>

                                            <p className="text-[0.85rem]  xl:text-base   mx-auto text-white text-center md:text-left font-normal font-sans" style={{ lineHeight: 1.6 }}>
                                                {valueProp.description}
                                            </p>
                                        </div>

                                        <div className="flex-1 flex items-center justify-center md:justify-start md:items-start w-full h-full ">
                                            <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-[#4285F4] flex items-center justify-center">
                                                <Image
                                                    src={valueProp.icon}
                                                    alt={valueProp.title}
                                                    width={32}
                                                    height={32}
                                                    className="w-5.5 h-5.5 xl:w-6 xl:h-6 object-contain"
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

    )
}
