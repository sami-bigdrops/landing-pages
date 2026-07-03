"use client"

import Image from "next/image"
import { INFO_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type InfoProps = {
    onGetQuoteClick?: () => void
}

export default function Info({ onGetQuoteClick }: InfoProps) {

    const renderBadge = (badge: (typeof INFO_CONTENT.badges)[number]) => (
        <div key={badge.text} className="flex items-center gap-2 ">
            <Image
                src={badge.icon}
                alt="badge icon"
                width={18}
                height={18}
                className="size-[18px] xl:size-5 shrink-0 object-contain"
            />
            <span className=" text-[0.8rem] md:text-[0.76rem] xl:text-[0.9rem] font-normal leading-tight text-[#4B5563">
                {badge.text}
            </span>
        </div>
    )

    return (
        <div

            className="info w-full h-full bg-[#F4F8FC] px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12  xl:px-23 xl:py-18"
        >
            <div className="container mx-auto max-w-[1280px]">




                <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row  md:gap-8 lg:gap-10 xl:gap-14">
                    <div className="left flex flex-col items-center justify-center gap-4 xl:gap-5 md:w-[50%] md:items-start md:justify-center ">
                        <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3">
                            <h2 className="text-2xl text-center md:text-left md:text-2xl xl:text-[2.2rem]  font-bold text-#182542] text-center font-sans " style={{ lineHeight: '1.3' }}>
                                {INFO_CONTENT.headline}
                            </h2>

                            <p className="text-sm font-normal xl:text-lg text-[#4B5563] text-center  font-sans md:max-w-[570px] lg:max-w-[620px] xl:max-w-[800px]" style={{ lineHeight: '1.6' }}>{INFO_CONTENT.subtext}</p>
                        </div>

                        <div className="w-full mt-1 md:w-[235px] xl:w-[300px] ">
                            <ButtonUI
                                type="1"
                                variant="default"
                                htmlType="button"
                                onClick={() => onGetQuoteClick?.()}
                                className="w-full bg-[#E71E26] text-white font-semibold h-14 xl:h-16 rounded-[10px] text-sm xl:text-lg shadow-[0_0_6px_0_rgba(0,0,0,0.15)] hover:bg-[#E71E26] cursor-pointer transition-all duration-300"
                            >
                                GET MY FREE CASH OFFER
                            </ButtonUI>
                        </div>

                        <div className="mt-1 flex w-full flex-col items-center gap-3.5 md:mt-1 md:flex-row md:flex-nowrap md:items-start md:justify-start md:gap-y-0 xl:gap-4.5 ">
                            <div className="flex items-start justify-start gap-x-4 xl:gap-x-5 ">
                                {INFO_CONTENT.badges.slice(0, 2).map(renderBadge)}
                            </div>
                            <div className="flex items-start justify-start ">
                                {renderBadge(INFO_CONTENT.badges[2])}
                            </div>
                        </div>



                    </div>

                    <div className="right w-full flex flex-col items-center justify-center md:w-[50%]  md:h-[210px] lg:h-[220px] xl:h-[300px] 2xl:h-[310px] ">
                        <Image
                            src={INFO_CONTENT.image.src}
                            alt={INFO_CONTENT.image.alt}
                            width={800}
                            height={560}
                            className="w-full h-full rounded-[10px] object-cover"
                            priority
                        />
                    </div>

                </div>


            </div>
        </div>
    )
}
