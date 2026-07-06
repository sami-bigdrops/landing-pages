"use client"

import { Fragment } from "react"
import Image from "next/image"
import { STEPS_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type StepsProps = {
    onGetQuoteClick?: () => void
}

export default function Steps({ onGetQuoteClick }: StepsProps) {
    return (
        <div

            className="w-full h-full bg-white px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12  xl:px-23 xl:py-18"
        >
            <div className="container mx-auto max-w-[1260px]">
                <div className="help-content w-full flex flex-col items-center justify-center gap-7 md:gap-13 lg:gap-14 xl:gap-16">
                    <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3">
                        <h2 className="text-2xl text-center md:text-left md:text-2xl xl:text-[2.2rem]  font-bold text-[#182542] text-center font-sans " style={{ lineHeight: '1.3' }}>
                            {STEPS_CONTENT.headline}
                        </h2>

                        <p className="text-sm font-normal xl:text-lg text-[#4B5563] text-center  font-sans md:max-w-[570px] lg:max-w-[620px] xl:max-w-[800px]" style={{ lineHeight: '1.6' }}>{STEPS_CONTENT.subtext}</p>
                    </div>

                    <div className="w-full grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start md:gap-x-2 md:gap-y-0 lg:gap-x-4 xl:gap-x-3">
                        {STEPS_CONTENT.steps.map((step, index) => (
                            <Fragment key={step.id}>
                                <div
                                    className="flex w-full flex-col items-center justify-start text-center gap-4.5 md:gap-5  xl:gap-4.5"
                                >
                                    <div
                                        className="w-14 h-10 shrink-0 rounded-[30px] bg-[#355A89] flex items-center justify-center"
                                        aria-hidden
                                    >
                                        <span className="text-white font-semibold text-[1.1rem] lg:text-lg ">
                                            {step.number}
                                        </span>
                                    </div>
                                    <div className="flex w-full flex-col items-center justify-start gap-2.5 lg:gap-3 xl:gap-2">
                                        <h3 className="md:min-h-[2.6rem] text-[0.95rem] xl:text-[1.1rem] lg:max-w-[150px] xl:max-w-full font-semibold text-[#182542] text-center font-sans md:flex md:items-center md:justify-center">
                                            {step.title}
                                        </h3>
                                        <p className="text-[0.83rem] font-normal xl:text-base text-[#4B5563] text-center font-sans xl:max-w-[250px] xl:mx-auto" style={{ lineHeight: 1.6 }}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                {index < STEPS_CONTENT.steps.length - 1 && (
                                    <>
                                        <div className="flex shrink-0 items-center justify-center md:hidden" aria-hidden>
                                            <Image
                                                src="/step-down.svg"
                                                alt=""
                                                width={20}
                                                height={16}
                                                className="h-4 w-5 object-contain"
                                            />
                                        </div>
                                        <div
                                            className="hidden shrink-0 items-center justify-center self-start md:flex md:pt-22 lg:pt-20"
                                            aria-hidden
                                        >
                                            <Image
                                                src="/step-right.svg"
                                                alt=""
                                                width={32}
                                                height={32}
                                                className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 object-contain"
                                            />
                                        </div>
                                    </>
                                )}
                            </Fragment>
                        ))}
                    </div>


                    <div className="w-full md:w-[235px] xl:w-[300px] mt-2.5 md:mt-0 xl:mt-1">
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


                </div>
            </div>
        </div>
    )
}
