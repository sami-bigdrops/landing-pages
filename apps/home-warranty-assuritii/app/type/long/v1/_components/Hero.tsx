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
    <section className="relative w-full overflow-hidden px-4 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8 lg:px-16 lg:py-10 xl:px-24">
      <div
        className="absolute inset-0 scale-[1.03] bg-cover bg-center bg-no-repeat blur-[2px]"
        style={{ backgroundImage: "url('/bg-image.webp')" }}
      />
      <div className="absolute inset-0 bg-[#0F172A]/72" />

      <div className="relative z-10 container mx-auto max-w-[1180px]">
        <div className="overflow-hidden rounded-[12px] border border-[#E3ECF6] bg-white shadow-[0_8px_20px_rgba(31,58,95,0.08)] sm:rounded-[14px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[340px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[560px] xl:min-h-[600px]">
              <Image
                src={HERO_CONTENT.image.src}
                alt={HERO_CONTENT.image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 60vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.6)_58%,rgba(0,0,0,0.76)_100%)]" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-7 lg:p-9">
                <div className="max-w-[560px] space-y-2.5 sm:space-y-3 md:space-y-4">
                  <h1 className="text-[1.95rem] font-bold leading-[1.1] text-white sm:text-[2.05rem] md:text-[2.35rem] xl:text-[2.8rem]">
                    {HERO_CONTENT.headline}
                  </h1>
                  <p className="max-w-[520px] text-[0.94rem] leading-relaxed text-[#EAF4FD] md:text-base">
                    {HERO_CONTENT.description}
                  </p>
                  <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-[10px] border border-[#7DD3FC]/60 bg-[linear-gradient(90deg,#0EA5E9_0%,#2563EB_100%)] px-2.5 py-2 shadow-[0_8px_20px_rgba(37,99,235,0.38)] sm:px-3.5 md:mt-4 md:px-4 md:py-2.5">
                    <span className="inline-flex shrink-0 items-center rounded-[6px] bg-[#FDE68A] px-2 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.04em] text-[#1E3A8A] sm:text-[0.64rem]">
                      Hot
                    </span>
                    <p className="text-[0.68rem] font-bold leading-tight tracking-[0.01em] text-white sm:text-[0.74rem] md:text-sm">
                      {offerText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center bg-white p-3.5 sm:p-4 md:p-6 lg:p-5 xl:p-6">
              <Form showPartnerBadges />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}