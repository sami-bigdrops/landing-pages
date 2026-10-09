"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { INFO_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type InfoProps = {
    onGetQuoteClick?: () => void
}

export default function Info({ onGetQuoteClick }: InfoProps) {
    return (
        <div className="info w-full h-full bg-white px-6 py-12 md:px-8 md:py-12 lg:px-14  xl:px-23 xl:py-15">
            <div className="container mx-auto max-w-[1360px]">
                <div className="flex w-full flex-col items-center justify-center gap-4 text-center xl:gap-5">
                    <div className="flex size-[85px] shrink-0 items-center justify-center overflow-hidden   xl:size-[105px]">
                        <Image
                            src={INFO_CONTENT.image.src}
                            alt={INFO_CONTENT.image.alt}
                            width={96}
                            height={96}
                            className="size-full object-cover"
                            priority
                        />
                    </div>

                    <div className="flex w-full max-w-[540px] flex-col items-center gap-2.5 md:gap-3 xl:max-w-[640px]">
                        <h2
                            className="text-2xl font-bold text-[#182542] font-sans lg:text-3xl xl:text-[2.6rem]"
                            style={{ lineHeight: "1.3" }}
                        >
                            {INFO_CONTENT.headline}
                        </h2>

                        <p
                            className="w-full text-sm font-normal text-[#4B5563] font-sans xl:text-lg"
                            style={{ lineHeight: "1.6" }}
                        >
                            {INFO_CONTENT.subtext}
                        </p>
                    </div>

                    <div className="mt-1 w-full max-w-[280px] md:max-w-[220px] xl:mt-2 xl:max-w-[280px]">
                        <ButtonUI
                            type="1"
                            variant="default"
                            htmlType="button"
                            onClick={() => onGetQuoteClick?.()}
                            className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#E71E26] text-[0.95rem] font-semibold text-white shadow-[0_0_6px_0_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#E71E26] xl:h-16 xl:text-[1.2rem]"
                        >
                            Get My Cash Offer
                            <ArrowRight className="size-4.5 shrink-0 xl:size-5" aria-hidden />
                        </ButtonUI>
                    </div>
                </div>
            </div>
        </div>
    )
}
