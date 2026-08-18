"use client"

import Image from "next/image"
import { NEED_CONTENT } from "@/lib/constant"

const cardOrderClasses = [
    "order-1",
    "order-2",
    "order-3",
    "order-5 lg:order-4",
    "order-6 lg:order-5",
    "order-4 lg:order-6",
    "order-8 md:order-7",
    "order-7 md:order-8",
] as const

export default function Needs() {
    return (
        <div className="coverage w-full h-full bg-[#F2F8FF] px-6 py-8 md:px-8 md:py-9 lg:px-14 lg:py-12 lg:pb-14 xl:px-23 xl:py-14">
            <div className="container mx-auto max-w-[1300px]">
                <div className="coverage-content w-full flex flex-col items-center justify-center gap-8 md:gap-12  xl:gap-14 xl:max-w-[1175px] mx-auto">
                    <div className="flex flex-col items-center justify-center gap-2.5 xl:gap-3">
                        <h2
                            className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#1A1A1A] text-center font-sans tracking-tight"
                            style={{ lineHeight: 1.3 }}
                        >
                            {NEED_CONTENT.header}
                        </h2>
                        <p
                            className="text-sm font-medium xl:text-lg mx-auto text-[#4B5563] text-center font-sans md:max-w-[600px] lg:max-w-full"
                            style={{ lineHeight: 1.6 }}
                        >
                            {NEED_CONTENT.description}
                        </p>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4 lg:grid-cols-6 lg:gap-5 xl:gap-7">
                        {NEED_CONTENT.needs.map((need, index) => (
                            <article
                                key={need.title}
                                className={`relative h-full overflow-hidden rounded-[10px] border border-[#CEDBEC] bg-white px-5 py-5 xl:px-6 xl:py-7 shadow-[0_0_10px_0_rgba(44,62,80,0.06)]  lg:col-span-2  ${index === 6 ? "lg:col-start-2" : ""} ${cardOrderClasses[index]}`}
                            >
                                <div className="flex flex-col justify-center items-start relative z-10 max-w-[65%] md:max-w-[57%] lg:max-w-[58%]">
                                    <h3 className="text-sm font-semibold text-[#1A1A1A] xl:text-lg">
                                        {need.title}
                                    </h3>
                                    <p className="mt-2 text-xs font-normal leading-[1.55] text-[#486581] xl:text-[0.95rem] md:max-w-[150px] xl:max-w-[290px]">
                                        {need.description}
                                    </p>
                                </div>
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute -bottom-[67px] -right-[55px] size-[162px] rounded-full md:size-[170px] md:-bottom-[70px] xl:size-[185px]"
                                    style={{ backgroundColor: need.circleColor }}
                                />
                                <Image
                                    src={need.image.src}
                                    alt={need.image.alt}
                                    width={300}
                                    height={300}
                                    className="absolute bottom-0 right-0 z-[1] h-[90px] w-[90px] object-contain object-bottom-right md:h-[112px] md:w-[112px] lg:h-[114px] lg:w-[114px] xl:h-[138px] xl:w-[138px]"
                                />
                            </article>
                        ))}
                    </div>

                    
               
                </div>
            </div>
        </div>
    )
}