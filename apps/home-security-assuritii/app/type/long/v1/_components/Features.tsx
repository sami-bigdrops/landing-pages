"use client"

import Image from "next/image"
import { FEATURES_CONTENT } from "@/lib/constant"

export default function Features() {
    return (
        <section className="w-full bg-[#E8F0FA] p-6 md:px-10 md:py-8 lg:px-16  xl:px-24 xl:py-10 ">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                    <h2 className="text-xl text-center md:text-2xl xl:text-3xl md:max-w-[400px] lg:max-w-[330px] xl:max-w-[520px] font-bold text-[#111827]  " style={{ lineHeight: '1.2' }}>
                        {FEATURES_CONTENT.header}
                    </h2>

                    
                    <div className="flex w-full flex-col gap-8 md:flex-row md:items-stretch md:gap-8 lg:gap-10 xl:gap-14">
                        <div className="order-1 w-full  overflow-hidden rounded-[10px]  md:order-2 md:w-1/2 md:min-w-0 ">
                            <Image
                                src={FEATURES_CONTENT.image.src}
                                alt={FEATURES_CONTENT.image.alt}
                                width={800}
                                height={560}
                                className="h-auto w-full rounded-[10px] object-cover md:h-[310px] xl:h-[330px] "
                               
                                priority
                            />
                        </div>

                        <div className="order-2 flex w-full  flex-col gap-3 md:order-1 md:w-1/2 md:min-w-0 md:justify-center md:gap-3.5">
                            {FEATURES_CONTENT.features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 p-3 rounded-[10px] bg-white  "
                               
                                >
                                    <div className="flex h-11 w-11 xl:h-12 xl:w-12 shrink-0 items-center justify-center rounded-[6px] bg-[#1F3A5F]">

                                        <Image
                                            src={feature.icon}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="h-6 w-6 xl:h-7 xl:w-7  object-contain"
                                        />
                                    </div>
                                    <p className="text-sm font-medium xl:text-base text-left text-[#111827] ">
                                        <span className="text-left text-[#111827] ">
                                            {feature.text}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>


                 
             

                </div>
            </div>
        </section>
    )
}
