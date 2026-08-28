"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { HELP_CONTENT } from "@/lib/constant"

const HIGHLIGHT = "4 Million"

function HelpHeader({ className }: { className?: string }) {
    const [before, after] = HELP_CONTENT.header.split(HIGHLIGHT)

    return (
        <h2 className={className}>
            {before}
            <span className="text-[#FFB300]">{HIGHLIGHT}</span>
            {after}
        </h2>
    )
}

export default function Help() {
    return (
        <section className="w-full bg-[#0752A0] px-6 lg:px-14 py-8 md:py-10 md:px-8 lg:py-12 xl:px-28 xl:py-16">
            <div className="container mx-auto max-w-[1300px]">
                <div className="help-content w-full flex flex-col items-center justify-center gap-7 md:gap-12 xl:gap-16 ">
                    <div className="w-full flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-12 lg:gap-16 xl:gap-24">
                        <div className="w-full flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between ">
                            <HelpHeader className="md:w-[53%] lg:w-[55%] text-[1.4rem] md:text-[1.55rem] lg:text-2xl xl:text-4xl md:text-left md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] font-bold text-white text-center  font-sans leading-[1.35]"  />

                            <ul className="flex w-full  flex-col justify-center items-start gap-3 xl:gap-3.5 md:w-[47%] lg:w-[45%] ">
                                {HELP_CONTENT.features.map((feature) => (
                                    <li key={feature.title} className="flex items-center justify-start gap-2.5">
                                        <Image
                                            src={feature.icon}
                                            alt=""
                                            width={20}
                                            height={15}
                                            className=" h-auto w-4 xl:w-5 shrink-0"
                                            aria-hidden
                                        />
                                        <span className="font-sans text-[0.85rem]  xl:text-lg font-normal leading-snug text-white " style={{ lineHeight: 1.5 }}>
                                            {feature.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        
                    </div>
                </div>


            </div>
        </section>
    )
}
