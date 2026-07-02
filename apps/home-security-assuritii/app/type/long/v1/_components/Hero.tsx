
"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"
import { pageSectionInner } from "@/lib/page-layout"
import { cn } from "@workspace/ui/lib/utils"

import Image from "next/image"


export default function Hero() {
  useUtmParams(30)

  return (
    <div className="relative w-full overflow-hidden py-8 md:py-10 lg:py-12">
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-no-repeat bg-[position:left_30%]",
          "md:bg-[position:left_48%_center]",
          "lg:bg-[position:left_32%_center]",
          "xl:bg-[position:30%_center]",
        )}
        style={{
          backgroundImage: `url(${HERO_CONTENT.image.src})`,
        }}
        aria-hidden
      />
      <div className={cn(pageSectionInner, "relative z-10")}>
        <div className="flex w-full flex-col items-stretch justify-center gap-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:gap-12 xl:gap-14">
          <div className="left flex min-w-0 flex-1 flex-col items-center justify-center gap-4 md:items-start md:justify-center md:gap-5 lg:gap-6">
            <h1 className="max-w-3xl text-center text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:max-w-4xl sm:text-4xl md:text-left md:text-4xl lg:max-w-[36rem] lg:text-5xl xl:max-w-[42rem]">
              {HERO_CONTENT.headline}
            </h1>
            <p className="max-w-xl text-center text-base font-normal leading-relaxed text-white/90 sm:text-lg md:text-left md:text-lg lg:text-xl">
              {HERO_CONTENT.description}
            </p>

            <div className="mt-1 flex w-full flex-col items-center justify-center gap-2.5 md:mt-0 md:items-start md:justify-start md:gap-3">
              {HERO_CONTENT.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex w-full max-w-[240px] items-center gap-2.5 rounded-[10px] bg-[rgba(237,242,249,0.40)] px-3 py-2.5 shadow-none transition sm:max-w-[260px] md:w-fit md:max-w-none",
                    idx === 0 && "md:min-w-[5.5rem]",
                    idx === 1 && "md:min-w-[8.5rem]",
                    idx === 2 && "md:min-w-[12rem]",
                  )}
                  style={{
                    boxShadow: "0 4px 20px 0 rgba(0,40,104,0.15)",
                  }}
                >
                  <Image
                    src={badge.icon}
                    alt={`${badge.label} icon`}
                    width={24}
                    height={24}
                    className="h-4 w-4 shrink-0 object-contain sm:h-5 sm:w-5"
                  />
                  <span className="text-left text-xs font-medium text-white sm:text-sm">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="right flex w-full shrink-0 items-center rounded-[30px] bg-white p-2 shadow-[0_4px_20px_0_rgba(0,40,104,0.15)] md:max-w-[min(100%,24rem)] lg:max-w-[26rem] xl:max-w-sm">
            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}
