
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
    <div className="relative w-full overflow-hidden bg-[#EDF2F9] lg:bg-transparent lg:py-14 lg:min-h-[32rem] xl:min-h-[34rem]">
      <div
        className={cn(
          "absolute inset-0 z-0 hidden bg-cover bg-no-repeat lg:block",
          "bg-[position:left_32%_center] xl:bg-[position:30%_center]",
        )}
        style={{
          backgroundImage: `url(${HERO_CONTENT.image.src})`,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] hidden bg-black/45 lg:block" aria-hidden />

      <div className="relative z-10 w-full lg:hidden">
        <Image
          src={HERO_CONTENT.image.src}
          alt={HERO_CONTENT.image.alt}
          width={1200}
          height={800}
          priority
          className="h-auto w-full object-contain"
        />
      </div>

      <div
        className={cn(
          pageSectionInner,
          "relative z-10 flex flex-col gap-8 pb-8 pt-6 sm:pt-8 md:pb-10 md:pt-10",
          "lg:min-h-[inherit] lg:justify-end lg:pb-8 lg:pt-0",
        )}
      >
        <div className="flex w-full flex-col items-stretch justify-end gap-6 sm:gap-7 md:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 xl:gap-14">
          <div className="left flex min-w-0 flex-1 flex-col items-center justify-end gap-3 sm:gap-3.5 md:gap-4 lg:items-start lg:gap-6">
            <h1
              className={cn(
                "mx-auto text-center text-[1.625rem] font-extrabold leading-[1.2] tracking-tight text-[#111827]",
                "sm:max-w-[22rem] sm:text-[1.875rem] sm:leading-[1.18]",
                "md:max-w-[28rem] md:text-[2rem] md:leading-[1.2]",
                "lg:mx-0 lg:max-w-[36rem] lg:text-left lg:text-5xl lg:leading-[1.12] lg:text-white xl:max-w-[42rem]",
              )}
            >
              {HERO_CONTENT.headline}
            </h1>
            <p
              className={cn(
                "mx-auto max-w-[18rem] text-center text-sm font-normal leading-relaxed text-[#374151]",
                "sm:max-w-[20rem] sm:text-[0.9375rem] sm:leading-relaxed",
                "md:max-w-[26rem] md:text-base md:leading-relaxed",
                "lg:mx-0 lg:max-w-xl lg:text-left lg:text-xl lg:text-white/90",
              )}
            >
              {HERO_CONTENT.description}
            </p>

            <div className="hidden w-full flex-col items-start justify-start gap-3 lg:flex">
              {HERO_CONTENT.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex w-fit items-center gap-2.5 rounded-[10px] bg-[rgba(237,242,249,0.40)] px-3 py-2.5 shadow-none transition",
                    idx === 0 && "min-w-[5.5rem]",
                    idx === 1 && "min-w-[8.5rem]",
                    idx === 2 && "min-w-[12rem]",
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
                    className="h-5 w-5 shrink-0 object-contain"
                  />
                  <span className="text-left text-sm font-medium text-white">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="right mx-auto flex w-full max-w-[min(100%,28rem)] shrink-0 items-center rounded-[30px] bg-white p-2 shadow-[0_4px_20px_0_rgba(0,40,104,0.15)] lg:mx-0 lg:max-w-[26rem] xl:max-w-sm">
            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}
