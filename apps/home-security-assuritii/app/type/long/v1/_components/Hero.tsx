
"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"

import Image from "next/image"


type HeroProps = {
  offerText?: string
}

const DEFAULT_OFFER = "LIMITED OFFER! : $200 OFF +2 MONTHS & FREE ROOF COVERAGE!"

export default function Hero({ offerText = DEFAULT_OFFER }: HeroProps = {}) {
  useUtmParams(30)

  return (
    <div
      className="w-full h-full p-6 md:px-10 md:py-8 lg:px-16 lg:py-10 xl:px-24"
      style={{
        backgroundImage: `url(${HERO_CONTENT.image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="container mx-auto h-full">
        <div className="hero-content h-full w-full flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between gap-6">

          <div className="left w-full md:w-[50%] lg:max-w-[60%] flex flex-col items-center justify-center md:justify-start md:items-start gap-4">
            <h1 className="text-2xl md:text-3xl  xl:text-4xl xl:max-w-[430px] text-center font-extrabold text-white md:text-left leading-relaxed " style={{ lineHeight: "1.3" }}>
              {HERO_CONTENT.headline}
            </h1>
            <p className="text-sm  xl:max-w-[440px] xl:text-base font-normal text-white  text-center md:text-left" style={{ lineHeight: "1.6" }}>
              {HERO_CONTENT.description}
            </p>

            <div className="w-full flex flex-col items-center justify-center gap-2 md:items-start md:justify-start md:gap-3 md:mt-3">
              {HERO_CONTENT.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`
                    flex items-center gap-2
                    bg-[rgba(237,242,249,0.40)]
                    rounded-[10px]
                    px-3 py-2
                    md:px-2.5
                    w-fit
                    shadow-none
                    transition
                    ${idx === 0 ? "md:w-[80px] xl:w-[85px]" : idx === 1 ? "md:w-[130px] xl:w-[150px]" : "md:w-[190px] xl:w-[220px]"}
                    w-full
                    max-w-[220px]
                   
                  `}
                  style={{
                    boxShadow: "0 4px 20px 0 rgba(0,40,104,0.15)"
                  }}
                >
                  <Image
                    src={badge.icon}
                    alt={`${badge.label} icon`}
                    width={24}
                    height={24}
                    className="w-4 h-4 xl:w-5 xl:h-5 object-contain"
                  />
                  <span className="text-white font-normal text-[0.8rem] xl:text-[0.95rem]   font-inter">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
      


          </div>
          <div className="right w-full md:w-[50%] lg:max-w-[40%] xl:max-w-sm  flex items-center bg-white p-2  rounded-[30px] shadow-[0_4px_20px_0_rgba(0,40,104,0.15)]">
     
            <Form />

          </div>
        </div>
      </div>
    </div>
  )
}