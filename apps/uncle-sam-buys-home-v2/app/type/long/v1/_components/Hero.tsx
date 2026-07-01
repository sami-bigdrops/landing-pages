
"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

import Image from "next/image"


type HeroProps = {
  onGetQuoteClick?: () => void
}



export default function Hero({ onGetQuoteClick }: HeroProps) {
  useUtmParams(30)

  const renderBadge = (badge: (typeof HERO_CONTENT.badges)[number]) => (
    <div key={badge.text} className="flex items-center gap-2 ">
      <Image
        src={badge.icon}
        alt="badge icon"
        width={18}
        height={18}
        className="size-[18px] xl:size-5 shrink-0 object-contain"
      />
      <span className=" text-[0.8rem] md:text-[0.76rem] xl:text-[0.9rem] font-normal leading-tight text-white">
        {badge.text}
      </span>
    </div>
  )

  return (
    <div
      className="w-full h-full bg-[#355A89]   px-6 sm:px-6 lg:px-14 py-8 md:py-10 md:px-8 lg:py-10 xl:px-23 xl:py-18">
      <div className="container mx-auto xl:max-w-[1280px]">
        <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row md:items-center md:justify-between ">
          <div className="left flex w-full h-full md:w-[58%] flex-col items-center justify-center gap-4 md:items-start md:justify-center">
            <div className="flex flex-col items-center justify-center md:justify-start md:items-start gap-2.5">
              <h1 className="flex flex-col items-center gap-0 text-center text-[1.4rem] md:text-[1.55rem] lg:text-[1.75rem] xl:text-[2.3rem] font-bold text-white md:items-start md:text-left ">
                <span>{HERO_CONTENT.headline1}</span>
                <span className="text-[1.45rem] md:text-[1.65rem] lg:text-[1.85rem] xl:text-[2.55rem]">{HERO_CONTENT.headline2}</span>
                <span className="text-[1.5rem] md:text-[1.7rem] lg:text-[1.9rem] xl:text-[2.75rem]">{HERO_CONTENT.headline3}</span>
              </h1>
              <p className="text-center text-sm xl:text-lg text-center text-[#ECF1F8] font-normal md:text-left lg:max-w-[450px] xl:max-w-[550px] " style={{ lineHeight: "1.6" }}>
                {HERO_CONTENT.description}
              </p>
            </div>

            <div className="w-full md:w-[235px] xl:w-[300px] mt-2.5 xl:mt-5">
              <ButtonUI
                type="1"
                variant="default"
                htmlType="button"
                onClick={() => onGetQuoteClick?.()}
                className="w-full bg-[#E71E26] text-white font-semibold h-14 xl:h-16 rounded-[10px] text-sm xl:text-lg shadow-[0_0_6px_0_rgba(0,0,0,0.15)]"
              >
                GET MY FREE CASH OFFER
              </ButtonUI>
            </div>
       

            <div className="mt-1 flex w-full flex-col items-center gap-3.5 md:mt-1 md:flex-row md:flex-nowrap md:items-start md:justify-start md:gap-y-0 xl:gap-4.5 ">
              <div className="flex items-start justify-start gap-x-4 xl:gap-x-5 ">
                {HERO_CONTENT.badges.slice(0, 2).map(renderBadge)}
              </div>
              <div className="flex items-start justify-start ">
                {renderBadge(HERO_CONTENT.badges[2])}
              </div>
            </div>
          </div>
          <div className="right flex items-center justify-center w-full h-full md:w-[42%]">
            <Image src={HERO_CONTENT.image.src} alt={HERO_CONTENT.image.alt} width={500} height={500}
              className="w-[250px] md:w-[300px] lg:w-[330px] xl:w-[430px] h-auto object-contain object-center" />
          </div>
        </div>
      </div>
    </div>
  )
}
