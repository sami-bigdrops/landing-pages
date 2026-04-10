"use client"

import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { FEATURES_CONTENT } from "@/lib/constant"
import { pageSectionInner } from "@/lib/page-layout"

export default function Features() {
    return (
        <section className="w-full bg-[#E8F0FA] py-10 md:py-11 lg:py-12">
            <div className={cn(pageSectionInner)}>
                <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                    <h2 className="text-xl text-center md:text-2xl xl:text-3xl md:max-w-[400px] lg:max-w-[330px] xl:max-w-[520px] font-bold text-[#111827]  " style={{ lineHeight: '1.3' }}>
                        {FEATURES_CONTENT.header}
                    </h2>

                    
                    <div className="flex w-full flex-col gap-8 md:flex-row md:items-stretch md:gap-8 lg:gap-10 xl:gap-14 2xl:gap-24">
                        <div className="order-1 w-full  overflow-hidden rounded-[10px]  md:order-2 md:w-1/2 md:min-w-0 ">
                            <Image
                                src={FEATURES_CONTENT.image.src}
                                alt={FEATURES_CONTENT.image.alt}
                                width={800}
                                height={560}
                                className="h-auto w-full rounded-[10px] object-cover md:h-[310px] xl:h-[363px] "
                               
                                priority
                            />
                        </div>

                        <div className="order-2 flex w-full  flex-col gap-3 md:order-1 md:w-1/2 md:min-w-0 md:justify-center md:gap-3.5 xl:gap-4">
                            {FEATURES_CONTENT.features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 p-3 rounded-[10px] bg-white xl:p-3.5 "
                               
                                >
                                    <div className="flex h-11 w-11 xl:h-13 xl:w-13 shrink-0 items-center justify-center rounded-[6px] bg-[#1F3A5F]">

                                        <Image
                                            src={feature.icon}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="h-6 w-6 xl:h-8 xl:w-8  object-contain"
                                        />
                                    </div>
                                    <p className="text-sm font-medium xl:text-[1.1rem] text-left text-[#111827] ">
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
