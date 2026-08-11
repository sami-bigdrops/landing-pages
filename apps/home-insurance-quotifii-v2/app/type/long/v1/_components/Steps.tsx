"use client"

import Image from "next/image"
import { COVER_CONTENT } from "@/lib/constant"








export default function Steps() {
    return (
        <div className="coverage w-full h-full bg-white px-6 py-8 md:px-8 md:py-9 lg:px-14 lg:py-12 lg:pb-14 xl:px-23 xl:py-14">
            <div className="container mx-auto max-w-[1380px]">
                <div className="coverage-content w-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-14 xl:gap-16">
                    <div className="flex flex-col items-center justify-center gap-2.5 xl:gap-3">
                        <h2
                            className="text-[1.5rem] md:text-2xl lg:text-2xl xl:text-4xl font-bold text-[#1A1A1A] text-center font-sans tracking-tight"
                            style={{ lineHeight: 1.3 }}
                        >
                            {COVER_CONTENT.header}
                        </h2>
                       
                    </div>

                    <div className="w-full flex flex-col items-center justify-center md:flex-row-reverse gap-6 lg:gap-12 xl:gap-6">



                        <div className="left w-full grid grid-cols-1 gap-9 md:gap-8 xl:gap-9 md:w-[50%] lg:w-[48%] xl:w-[50%] ">
                            {COVER_CONTENT.items.map((item) => (
                                <div key={item.title} className="flex flex-col items-center md:items-start md:justify-start gap-4 md:gap-6 lg:gap-8">
                                    <div className="flex flex-col-reverse items-center justify-center md:items-start md:justify-start gap-4  lg:gap-5 w-full">
                                        <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-2 md:gap-2.5 ">


                                            <h3 className="text-base  xl:text-xl md:text-left text-center font-semibold text-[#1A1A1A] font-sans">
                                                {item.title}
                                            </h3>

                                            <p className="text-[0.85rem]  xl:text-base   mx-auto md:text-left text-center text-[#4B5563] text-center  font-sans" style={{ lineHeight: 1.6 }}>
                                                {item.description}
                                            </p>
                                        </div>

                                        <div
                                            className="w-10 h-10 xl:w-11 xl:h-11 shrink-0 rounded-full bg-[#003599] flex items-center justify-center"
                                            aria-hidden
                                        >
                                            <span className="text-white font-semibold text-[1.1rem] xl:text-lg ">
                                               
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="right w-full h-full  flex items-center justify-center md:w-[50%] lg:w-[52%] xl:w-[50%]">
                            <Image
                                src={COVER_CONTENT.image.src}
                                alt={COVER_CONTENT.image.alt}
                                width={500}
                                height={500}
                                className="w-full h-full lg:w-[430px] xl:w-[540px] object-cover"
                                priority
                            />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}