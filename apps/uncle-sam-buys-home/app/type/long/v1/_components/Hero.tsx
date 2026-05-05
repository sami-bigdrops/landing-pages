
"use client"

import { useUtmParams } from "@workspace/lp-core"
import FormPage from "@/app/type/long/v1/_components/Form"
import { HERO_CONTENT } from "@/lib/constant"


export default function Hero() {
  useUtmParams(30)

  return (
    <section className="relative w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-20 xl:py-14 bg-[#ECF5F8]">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#065F8A] text-center lg:max-w-2xl xl:max-w-full font-sans leading-normal tracking-tight">
          {HERO_CONTENT.headline}
        </h1>
        <FormPage />
      </div>
    </section>
  )
}