"use client"

import { STEPS_CONTENT } from "@/lib/constant"

type StepsProps = {
    onGetQuoteClick?: () => void
}

export default function Steps(_props: StepsProps) {
    return (
        <div className="w-full h-full bg-[#102E50] border-b-6 border-[#E71E26] xl:border-b-7 px-6 py-8 md:px-8 md:py-8 lg:px-14 xl:px-23 xl:py-12">
            <div className="container mx-auto max-w-[1360px]">
                <div className="grid w-full grid-cols-1 items-start gap-7 text-left md:grid-cols-3 md:gap-6 lg:gap-10 xl:gap-18">
                    {STEPS_CONTENT.steps.map((step) => (
                        <div
                            key={step.id}
                            className="flex w-full flex-col items-start justify-start gap-2 md:gap-3 xl:gap-3.5"
                        >
                            <h3
                                className="text-2xl font-bold text-white font-sans xl:text-[2.4rem]"
                                style={{ lineHeight: "1.3" }}
                            >
                                {step.title}
                            </h3>
                            <p
                                className="text-sm font-normal text-white font-sans xl:text-lg"
                                style={{ lineHeight: "1.6" }}
                            >
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
