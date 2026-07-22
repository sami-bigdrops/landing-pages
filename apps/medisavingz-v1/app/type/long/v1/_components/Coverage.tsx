"use client"

import Image from "next/image"
import { COVERAGE_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type CoverageProps = {
    onGetQuoteClick?: () => void
}

export default function Coverage({ onGetQuoteClick }: CoverageProps) {
    return (
        <div className="w-full h-full bg-[#F3F8FF]  px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-23 xl:py-16">
            <div className="container mx-auto max-w-[1280px]">
                <div className="help-content w-full flex flex-col items-center justify-center gap-6 md:gap-11 lg:gap-12 xl:gap-15">
                    <div className="flex flex-col items-center justify-center gap-2.5 lg:gap-3">

                        {COVERAGE_CONTENT.badge.map((badge) => (
                            <div
                                key={badge.text}
                                className="flex items-center justify-center gap-1.5 rounded-full border border-[#C9E7D8] bg-[#F2FAF6] px-4 py-2.5  xl:py-3 "
                            >
                                <Image src={badge.icon} alt={badge.text} width={20} height={20}
                                    className="w-4.5 h-4.5 xl:w-5 xl:h-5 object-cover"
                                />
                                <span className="text-[0.77rem] md:text-[0.77rem] xl:text-sm text-[#245C49] font-medium">{badge.text}</span>
                            </div>
                        ))}


                        <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3">
                            <h2
                                className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl  md:max-w-[350px]  xl:max-w-[550px] font-bold text-[#17212B] text-center font-sans"
                                style={{ lineHeight: "1.3" }}
                            >
                                {COVERAGE_CONTENT.headline}
                            </h2>
                            <p
                                className="text-[#464F5B] text-center font-normal font-sans text-[0.85rem]  xl:text-[1.18rem]  md:max-w-[530px]  xl:max-w-[790px]"
                                style={{ lineHeight: "1.6" }}
                            >
                                {COVERAGE_CONTENT.description}
                            </p>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 md:items-stretch gap-5 lg:gap-6 xl:gap-7">
                        {COVERAGE_CONTENT.cards.map((card) => (
                            <div
                                key={card.id}
                                className={`flex h-full w-full flex-col gap-4 xl:gap-5 rounded-[10px] bg-white p-5 md:p-5.5 xl:p-7 shadow-[0_0_2px_0_rgba(0,0,0,0.10)] ${
                                    card.badge
                                        ? "border border-[#84A999]"
                                        : "border border-[#CBD5E1]"
                                }`}
                            >
                       
                                <div className="flex w-full flex-col-reverse items-start justify-start gap-2 md:flex-row md:items-center md:justify-between">
                                    <h3 className="text-[1.05rem] xl:text-[1.32rem] font-semibold text-[#0F172A] font-sans">
                                        {card.title}
                                    </h3>
                                    {card.badge && (
                                        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#1F7A63] px-3 py-1.5  xl:px-3.5 xl:py-2">
                                            <Image
                                                src={card.badge.icon}
                                                alt="badge"
                                                width={14}
                                                height={14}
                                                className="h-3.5 w-3.5 xl:h-4 xl:w-4 object-contain"
                                            />
                                            <span className="whitespace-nowrap text-[0.72rem] md:text-[0.71rem] xl:text-[0.85rem] font-medium text-white font-sans">
                                                {card.badge.text}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <p className="text-[0.82rem] xl:text-[0.99rem] font-semibold text-[#2E7D5B]  font-sans">
                                        Best For
                                    </p>
                                    <p
                                        className="text-[0.83rem] xl:text-[1rem] font-medium text-[#374151] font-sans"
                                        style={{ lineHeight: 1.6 }}
                                    >
                                        {card.bestFor}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2.5">
                                    <p className="text-[0.82rem] xl:text-[0.99rem] font-semibold text-[#2E7D5B]  font-sans">
                                        Key Benefits
                                    </p>
                                    <ul className="flex flex-col gap-2 xl:gap-2.5">
                                        {card.keyBenefits.map((benefit) => (
                                            <li key={benefit} className="flex items-center gap-2">
                                                <Image
                                                    src="/tick.svg"
                                                    alt=""
                                                    width={18}
                                                    height={18}
                                                    className=" h-4 w-4 xl:h-5 xl:w-5 shrink-0 object-contain"
                                                />
                                                <span
                                                    className="text-[0.83rem] xl:text-[1rem] font-normal text-[#464F5B] font-sans"
                                                    style={{ lineHeight: 1.5 }}
                                                >
                                                    {benefit}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-2.5">
                                    <p className="text-[0.82rem] xl:text-[0.99rem] font-semibold text-[#2E7D5B]  font-sans">
                                        Considerations
                                    </p>
                                    <ul className="flex flex-col gap-2 xl:gap-2.5">
                                        {card.considerations.map((item) => (
                                            <li key={item} className="flex items-center gap-2">
                                                <Image
                                                    src="/bullet.svg"
                                                    alt=""
                                                    width={18}
                                                    height={18}
                                                    className=" h-4 w-4 xl:h-5.5 xl:w-5.5 shrink-0 object-contain"
                                                />
                                                <span
                                                    className="text-[0.83rem] xl:text-[1rem] font-normal text-[#464F5B] font-sans"
                                                    style={{ lineHeight: 1.5 }}
                                                >
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-2 flex w-full flex-col items-center justify-center gap-3 md:gap-4 xl:gap-6">
                        <div className="flex flex-col items-center gap-2 xl:gap-3 text-center">
                            <h3 className="text-[1.3rem] md:text-xl xl:text-3xl font-extrabold text-[#17212B] font-sans">
                                {COVERAGE_CONTENT.cta.title}
                            </h3>
                            <p
                                className="text-[0.85rem]  xl:text-[1.14rem]  font-normal text-[#4B5563] font-sans md:max-w-[500px] lg:max-w-[500px] xl:max-w-[630px]"
                                style={{ lineHeight: 1.6 }}
                            >
                                {COVERAGE_CONTENT.cta.description}
                            </p>
                        </div>
                        <div className="w-full md:w-[260px] xl:w-[300px] mt-1">
                            <ButtonUI
                                type="1"
                                variant="default"
                                htmlType="button"
                                onClick={() => onGetQuoteClick?.()}
                                className="w-full bg-[#2f6fed] text-white font-semibold h-14 xl:h-16 rounded-[10px] text-sm xl:text-lg shadow-[0_0_6px_0_rgba(0,0,0,0.15)] hover:bg-[#2f6fed] cursor-pointer transition-all duration-300"
                            >
                                Check My Medicare Options
                            </ButtonUI>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
