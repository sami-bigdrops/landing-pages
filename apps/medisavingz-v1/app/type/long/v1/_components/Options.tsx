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
            style={{ background: "linear-gradient(270deg, #F8FBFF 0%, #EEF5FF 100%)" }}
            className="info w-full h-full px-6 py-8 md:px-8 md:py-8 lg:px-14 lg:py-10  xl:px-23 xl:py-14"
        >
   
            <div className="container mx-auto max-w-[1280px]">




                <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row  md:gap-6 lg:gap-10 xl:gap-10">
                    <div className="left flex flex-col items-center justify-center gap-4 xl:gap-5 md:w-[58%] lg:w-[55%] md:items-start md:justify-center ">
                        <div className="flex w-full flex-col items-center gap-2.5 md:items-start md:gap-3">
                            <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl font-bold text-[#17212B] font-sans md:text-left  lg:max-w-[430px] xl:max-w-[650px]" style={{ lineHeight: '1.3' }}>
                                {OPTIONS_CONTENT.headline}
                            </h2>

                            <p className="w-full text-[0.85rem]  xl:text-[1.18rem] font-normal text-[#464F5B] text-center font-sans md:text-left  md:max-w-[350px] lg:max-w-[400px] xl:max-w-[750px]" style={{ lineHeight: '1.6' }}>{OPTIONS_CONTENT.subtext}</p>
                        </div>

                        <div className="w-full mt-1 xl:mt-2 md:w-[235px] xl:w-[300px] ">
                            <ButtonUI
                                type="1"
                                variant="default"
                                htmlType="button"
                                onClick={() => onGetQuoteClick?.()}
                                className="w-full bg-[#2F6FED] text-white font-semibold h-14 xl:h-16 rounded-[10px] text-sm xl:text-lg  hover:bg-[#2F6FED] cursor-pointer transition-all duration-300"
                            >
                                Review My Medicare Options
                            </ButtonUI>
                       
                        </div>

                        <div className="mt-1 flex w-full flex-col items-center gap-3.5 md:gap-3 md:mt-0.5 lg:flex-row lg:flex-nowrap md:items-start md:justify-start lg:gap-y-0 xl:gap-5 ">
                            <div className="flex items-start justify-start gap-x-3.5 md:gap-x-4  xl:gap-x-5 ">
                                {OPTIONS_CONTENT.badges.slice(0, 2).map(renderBadge)}
                            </div>
                            <div className="flex items-start justify-start ">
                                {renderBadge(OPTIONS_CONTENT.badges[2])}
                            </div>
                        </div>



                    </div>

                    <div className="right w-full flex flex-col items-center justify-center md:w-[42%] lg:w-[45%]  md:h-[260px] lg:h-[260px] xl:h-[350px] ">
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
