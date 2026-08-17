"use client"

import Image from "next/image"
import { OPTIONS_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"


type OptionsProps = {
    onGetQuoteClick?: () => void
}

export default function Options({ onGetQuoteClick }: OptionsProps) {
    const renderBadge = (badge: (typeof OPTIONS_CONTENT.badges)[number]) => (
        <div key={badge.text} className="flex items-center gap-1.5 ">
            <Image
                src={badge.icon}
                alt="badge icon"
                width={18}
                height={18}
                className="size-[15px] xl:size-5 shrink-0 object-contain"
            />
            <span className=" text-[0.7rem] lg:text-[0.71rem] xl:text-[0.95rem] font-normal leading-tight text-[#464F5B]">
                {badge.text}
            </span>
        </div>
    )

    return (
        <div
            
            className="info bg-[#F2F8FF] w-full h-full px-6 py-8 md:px-8 md:py-8 lg:px-14 lg:py-10  xl:px-23 xl:py-14"
        >

            <div className="container mx-auto lg:max-w-[830px] xl:max-w-[1040px]">




                <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-10 xl:gap-10">
                    <div className="left flex flex-col items-center justify-center gap-4 xl:gap-5 md:w-[50%] lg:w-[45%] md:items-start md:justify-center ">
                        <div className="flex w-full flex-col items-center gap-2.5 md:items-start xl:gap-3">
                            <h2 className="text-2xl lg:text-3xl xl:text-4xl text-center font-bold text-[#1A1A1A] font-sans md:text-left md:max-w-[250px] lg:max-w-[430px] xl:max-w-[650px]" style={{ lineHeight: '1.3' }}>
                                {OPTIONS_CONTENT.headline}
                            </h2>

                            <p className="w-full text-sm font-medium xl:text-lg text-[#4B5563] text-center font-sans md:text-left md:max-w-[250px] lg:max-w-[350px] xl:max-w-[450px]" style={{ lineHeight: '1.6' }}>{OPTIONS_CONTENT.subtext}</p>
                        </div>

                        <div className="w-full md:w-[235px] xl:w-[300px] md:mt-2 lg:mt-2 xl:mt-4 ">
                            <ButtonUI
                                type="1"
                                variant="default"
                                htmlType="button"
                                onClick={() => onGetQuoteClick?.()}
                                className="w-full bg-[#C62828] text-white font-sans font-bold h-14 xl:h-16 rounded-[10px] text-sm xl:text-lg shadow-[0_4px_10px_0_rgba(0,0,0,0.10)] hover:bg-[#C62828] cursor-pointer transition-all duration-300"
                            >
                                CHECK LOAN OPTIONS
                            </ButtonUI>
                        </div>

                        <div className="flex items-center justify-center gap-2 font-inter text-left font-medium text-[0.77rem] text-[#486581] xl:text-[0.9rem] md:max-w-[290px] lg:max-w-[430px] xl:max-w-[650px]" style={{ lineHeight: 1.4 }}>
                            <img
                                src="/Lock.svg"
                                alt=""
                                width={18}
                                height={18}
                                className="h-4 w-4 shrink-0"
                            />
                            <span>
                                Checking your options <span className="font-bold text-[#2C3E50]">won&apos;t affect</span> your credit score.
                            </span>
                        </div>



                    </div>

                    <div className="right w-full flex flex-col items-center justify-center md:w-[50%] lg:w-[55%] xl  md:h-[250px]  md:w-[350px] lg:h-[270px] lg:w-[380px] xl:h-[350px] xl:w-[480px] ">
                        <Image
                            src={OPTIONS_CONTENT.image.src}
                            alt={OPTIONS_CONTENT.image.alt}
                            width={800}
                            height={560}
                            className="w-full h-full rounded-[10px] object-contain"
                            priority
                        />
                    </div>

                </div>


            </div>
        </div>
    )
}
