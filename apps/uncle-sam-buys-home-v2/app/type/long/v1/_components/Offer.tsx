"use client"

import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { OFFER_CONTENT } from "@/lib/constant"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button";
import Form from "./Form"

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
                        <h2 className="text-2xl text-center md:text-left md:text-2xl xl:text-[2.2rem]  font-bold text-[#182542] text-center font-sans " style={{ lineHeight: '1.3' }}>
                            {OFFER_CONTENT.headline}
                        </h2>

                        <p className="text-sm font-normal xl:text-lg text-[#4B5563] text-center  font-sans md:max-w-[570px] lg:max-w-[550px] xl:max-w-[700px]" style={{ lineHeight: '1.6' }}>{OFFER_CONTENT.subtext}</p>
                    </div>







                    <div className="w-full flex items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
                       <Form />
                    </div>


                </div>


            </div>
        </div>
    )
}
