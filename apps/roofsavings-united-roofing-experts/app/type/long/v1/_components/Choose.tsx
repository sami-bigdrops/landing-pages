"use client"

import React from 'react'
import Image from 'next/image'
import { CHOOSE_CONTENT } from '@/lib/constant'
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

function renderDescription(text: string) {
    return text.split(/(Next-Generation Metal Roofs)/g).map((part, index) =>
        part === "Next-Generation Metal Roofs" ? (
            <span key={index} className="font-bold">
                {part}
            </span>
        ) : (
            part
        ),
    );
}

export default function Choose() {
    const router = useRouter();

    const handleCheckMyEligibility = () => {
        router.push("/form");
    };
    return (
        <div className="steps bg-white w-full h-full px-6 py-6 md:px-6 md:py-8 lg:px-14 lg:py-10  xl:px-30 xl:py-11">
            <div className="container mx-auto xl:max-w-[1170px]">
                <div className="step-content w-full flex flex-col items-center justify-center gap-5 md:gap-5 lg:gap-6 xl:gap-8 ">
                    <h2 className="mb-2 md:mb-3 text-2xl md:text-3xl xl:text-4xl md:max-w-[600px] lg:max-w-[580px] xl:max-w-[700px] font-bold  text-[#000000] text-center font-sans " style={{ lineHeight: "1.2" }}>
                        {CHOOSE_CONTENT.headline}
                    </h2>

                    <div className="w-full flex flex-col items-center justify-center gap-10 md:gap-12  xl:gap-15">
                        <div className="top flex w-full flex-col-reverse items-center gap-7 md:flex-row-reverse md:items-start md:gap-6 lg:gap-14  xl:gap-16">
                            <div className="w-full md:w-1/2 lg:w-[50%]  flex items-center justify-center md:items-start  md:h-[190px] lg:h-[210px] xl:h-[280px] ">
                                <Image
                                    src={CHOOSE_CONTENT.image.src}
                                    alt={CHOOSE_CONTENT.image.alt}
                                    width={800}
                                    height={560}
                                    className="h-full w-full  object-cover object-center "
                                    priority
                                />
                            </div>

                            <div className="flex w-full flex-col items-center justify-start gap-4 md:w-1/2 lg:w-[50%]   xl:gap-5">
                                

                                <p
                                    className="text-center font-sans text-[0.77rem] text-left font-normal text-[#000000]  xl:text-base "
                                    style={{ lineHeight: 1.6 }}
                                >
                                    {renderDescription(CHOOSE_CONTENT.description)}
                                </p>

                                <div className="w-full flex flex-col items-start justify-start gap-2">
                                    {CHOOSE_CONTENT.features.map((feature) => (
                                        <div key={feature.label} className="flex items-center justify-start gap-2">
                                            <Image src={CHOOSE_CONTENT.featureIcon.src} alt={CHOOSE_CONTENT.featureIcon.alt} width={20} height={20} 
                                            className="w-4 h-4 object-cover object-center" />
                                            <p className="text-left font-sans text-[0.77rem]  font-normal text-[#000000]  xl:text-base  " style={{ lineHeight: 1.5 }}>{feature.label}</p>
                                        </div>  
                                    ))}
                                </div>

                                
                            </div>



                        </div>
                        <div className="bottom flex w-full flex-col items-center justify-center">
                            <Image src={CHOOSE_CONTENT.bottomImage.src} alt={CHOOSE_CONTENT.bottomImage.alt} width={1000} height={1000}
                             className="w-full h-full object-cover object-center md:max-w-[650px] lg:max-w-[750px] xl:max-w-[1100px] " />
                        </div>
                    </div>


                    <div className="flex flex-col items-center justify-center gap-2.5">
                        <Button
                            type="1"
                            variant="default"
                            onClick={handleCheckMyEligibility}
                            className="w-full md:max-w-[220px] xl:max-w-[290px] flex h-15 flex-1 cursor-pointer items-center justify-center gap-2 rounded-none px-5 py-4 md:py-3.5 xl:py-5 font-semibold tracking-normal  text-sm font-inherit text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 xl:h-19.5 xl:text-lg border-[3px] border-[#BC0B31] bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)] hover:bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)]"
                        >
                            Click for Pricing!
                        </Button>

                        <p className="text-xs xl:text-base text-center text-[#000000] font-sans font-normal" style={{ lineHeight: 1.5 }}>
                        (Enter your ZIP and answer a few quick questions!)
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}