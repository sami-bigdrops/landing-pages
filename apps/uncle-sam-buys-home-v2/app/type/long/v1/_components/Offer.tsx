"use client"

import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { OFFER_CONTENT } from "@/lib/constant"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button";

type InfoProps = {
    onGetQuoteClick?: () => void
}

export default function Info({ onGetQuoteClick }: InfoProps) {
    const router = useRouter();

    const handleGetFreeCashOffer = () => {
        router.push("/form");
    };
    return (
        <div

            className="bg-white w-full h-full px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12  xl:px-20 xl:py-18"
        >
            <div className="container mx-auto max-w-[1280px]">




                <div className="flex w-full flex-col items-center justify-center gap-6  md:gap-10 lg:gap-10 xl:gap-14">

                    <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3">
                        <h2 className="text-2xl text-center md:text-left md:text-2xl xl:text-[2.2rem]  font-bold text-#182542] text-center font-sans " style={{ lineHeight: '1.3' }}>
                            {OFFER_CONTENT.headline}
                        </h2>

                        <p className="text-sm font-normal xl:text-lg text-[#4B5563] text-center  font-sans md:max-w-[570px] lg:max-w-[550px] xl:max-w-[700px]" style={{ lineHeight: '1.6' }}>{OFFER_CONTENT.subtext}</p>
                    </div>







                    <div className="w-full flex items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
                        <div className="flex w-full  flex-col items-center gap-6 lg:gap-7 xl:gap-9 rounded-[10px] border border-[#E2E8F0] bg-[#ECF1FB] shadow-[0_0_6px_0_rgba(16,46,80,0.15)] px-5 py-6 md:py-8 md:px-12 lg:px-16 xl:px-20 xl:py-10">


                            <p className="text-center font-sans text-base  xl:text-xl font-semibold text-[#182542] ">
                                {OFFER_CONTENT.subtitle}
                            </p>
                            <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row md:gap-3.5 xl:gap-4 ">
                                <Button
                                    type="1"
                                    variant="default"
                                    onClick={handleGetFreeCashOffer}
                                    className="w-full flex h-13 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-5 py-0 font-semibold text-[0.85rem] font-inherit text-[#3E3E3F] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 md:py-3.5 md:flex-1 xl:h-18.5 xl:py-4 lg:text-sm xl:text-lg border border-[#C12026]"
                                    style={{
                                        background: "linear-gradient(0deg, rgba(193, 32, 38, 0.10) 0%, rgba(193, 32, 38, 0.10) 100%), #FFF"
                                    }}
                                >
                                    Yes
                                </Button>


                                <Button
                                    type="1"
                                    variant="default"
                                    onClick={handleGetFreeCashOffer}
                                    className="w-full flex h-13 shrink-0 cursor-pointer hover:bg-white hover:text-[#3E3E3F] items-center justify-center gap-2 rounded-[10px] px-5 py-0 font-semibold text-[0.85rem] font-inherit text-[#3E3E3F] bg-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 md:py-3.5 md:flex-1 xl:h-18.5 xl:py-4 lg:text-sm xl:text-lg border border-[#C12026] bg-white"
                                >
                                    No
                                </Button>


                            </div>
                        </div>
                    </div>


                </div>


            </div>
        </div>
    )
}
