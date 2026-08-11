"use client"

import Image from "next/image"
import { COVER_CONTENT } from "@/lib/constant"








export default function Steps() {
    return (
        <div className="coverage w-full h-full bg-[#E5F2FF] rounded-[10px] px-6 py-8 md:px-8 md:py-9 lg:px-14 lg:py-12 lg:pb-14 xl:px-23 xl:py-14">
            <div className="container mx-auto max-w-[1400px]">
                <div className="coverage-content w-full flex flex-col items-center justify-center gap-6 md:gap-12 lg:gap-14 xl:gap-16">
                    <div className="flex flex-col items-center justify-center gap-2.5 xl:gap-3">
                        <h2
                            className="text-[1.4rem] md:text-2xl  xl:text-4xl font-bold text-[#1A1A1A] text-center font-poppins tracking-tight"
                            style={{ lineHeight: 1.3 }}
                        >
                            {COVER_CONTENT.header}
                        </h2>
                       
                    </div>

                    <div className="w-full flex flex-col-reverse items-center justify-center md:flex-row-reverse gap-8 lg:gap-16 xl:gap-22">



                        <div className="left w-full grid grid-cols-1 gap-6 md:gap-4 lg:gap-6 xl:gap-9 md:w-[50%] lg:w-[50%] xl:w-[50%] ">
                            {COVER_CONTENT.items.map((item) => (
                                <div key={item.title} className="flex flex-col items-center md:items-start md:justify-start gap-4 md:gap-6 lg:gap-8">
                                    <div className="flex flex-row-reverse items-center justify-start gap-4  lg:gap-5 w-full">
                                        <div className="flex-1 flex flex-col items-start justify-start gap-1 ">


                                            <h3 className="text-base  xl:text-xl text-left font-semibold text-[#1A1A1A] font-poppins">
                                                {item.title}
                                            </h3>

                                            <p className="text-[0.85rem]  xl:text-base  text-left text-[#4B5563] font-poppins" style={{ lineHeight: 1.6 }}>
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center">
                                          <Image
                                            src={item.image.src}
                                            alt={item.image.alt}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover"
                                          />
                                          
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="right w-full h-full  flex items-center justify-center md:w-[50%] lg:w-[50%] xl:w-[50%]">
                            <Image
                                src={COVER_CONTENT.image.src}
                                alt={COVER_CONTENT.image.alt}
                                width={500}
                                height={500}
                                className="w-full h-full rounded-[10px] md:h-[280px] lg:h-[270px] xl:h-[350px] object-cover"
                                priority
                            />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}