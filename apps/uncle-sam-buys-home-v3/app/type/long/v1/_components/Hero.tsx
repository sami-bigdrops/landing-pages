"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import Form from "./Form"

type HeroProps = {
  onGetQuoteClick?: () => void
}

export default function Hero({ onGetQuoteClick }: HeroProps) {
  useUtmParams(30)

  return (
    <div
      className="w-full h-full bg-white   px-6 sm:px-6 lg:px-14 py-4 pb-6 md:pb-8 lg:pb-10 xl:pb-12   md:px-8 lg:py-6 xl:px-23 xl:py-10">
      <div className="container mx-auto xl:max-w-[1280px]">
        <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-between ">
          <div className=" flex w-full h-full flex-col items-center justify-center gap-8 ">
            <div className="flex flex-col items-center justify-center md:justify-start md:items-start gap-2.5 xl:gap-3">
              <h1 className="flex flex-col items-center gap-0 text-center text-3xl  lg:text-4xl xl:text-5xl md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] mx-auto  font-bold text-[#182542]  ">
                <span>{HERO_CONTENT.headline}</span>
               
              </h1>
              <p className="text-center text-sm xl:text-lg text-center text-[#182542] font-normal max-w-[240px] md:max-w-[280px] lg:max-w-[330px] xl:max-w-[330px] mx-auto " style={{ lineHeight: "1.6" }}>
                {HERO_CONTENT.description}
              </p>
            </div>

            <div className="w-full flex items-center justify-center md:max-w-[550px] lg:max-w-[590px] xl:max-w-[720px]">
                       <Form />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
