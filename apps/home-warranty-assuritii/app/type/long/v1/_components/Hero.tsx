"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"



type HeroProps = {
  formPartnersPlaceholder?: boolean
}

export default function Hero({ formPartnersPlaceholder }: HeroProps = {}) {
  useUtmParams(30)

  return (
    <div className="bg-white w-full">
      <div className="w-full flex flex-col md:flex-row md:h-[70vh] md:min-h-[480px]">
        {/* Image + headline – hidden on mobile, shown on md+ */}
        <div
          className="hidden md:flex relative w-full md:w-[55%] xl:w-[60%] 2xl:w-[57%] min-h-0 flex-col justify-end md:py-10"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.10) 77.75%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 32.16%, rgba(0, 0, 0, 0.40) 69.82%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url(${HERO_CONTENT.image.src}) lightgray top / cover no-repeat`
          }}
        >
          <div className="relative z-10 space-y-3 max-w-2xl w-full h-full px-8 py-8 lg:px-14 lg:py-8 xl:px-18 xl:py-10 flex flex-col items-start justify-end">
            <h1 className="text-[1.8rem] lg:text-[2rem] xl:text-[2.3rem] 2xl:text-[2.4rem] xl:max-w-[600px] font-bold text-white drop-shadow-lg" style={{ lineHeight: "1.2" }}>
              {HERO_CONTENT.headline}
            </h1>
            <p className="text-[0.95rem] lg:text-base xl:text-[1.1rem] font-normal text-white drop-shadow-md max-w-xl" style={{ lineHeight: "1.5" }}>
              {HERO_CONTENT.description}
            </p>
          </div>
        </div>

        {/* Form column – full page on mobile, right pane on md+ */}

        {/* Mobile only */}
        <div className="md:hidden flex flex-col w-full">
          {/* Image band with headline */}
          <div
            className="relative w-full flex flex-col items-center justify-end px-5 pt-10 pb-8 sm:px-6 sm:pb-10"
            style={{
              minHeight: "62vw",
              background: `linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.60) 100%), url(${HERO_CONTENT.image.src}) lightgray 50% 20% / cover no-repeat`
            }}
          >
            <div className="w-full text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg" style={{ lineHeight: "1.2" }}>
                {HERO_CONTENT.headline}
              </h1>
              <p className="text-sm font-normal text-white/90 drop-shadow-md" style={{ lineHeight: "1.5" }}>
                {HERO_CONTENT.description}
              </p>
            </div>
          </div>
          {/* Form on clean background */}
          <div className="w-full bg-[#E8F0FA] px-5 py-6 sm:px-6 sm:py-7">
            <Form partnersPlaceholder={formPartnersPlaceholder} />
          </div>
        </div>

        {/* md+ only: solid background column */}
        <div className="hidden md:flex w-full md:w-[45%] xl:w-[40%] 2xl:w-[43%] min-h-0 bg-[#E8F0FA] flex-col items-center justify-center py-6 px-6 lg:py-6 lg:px-6 xl:py-6 xl:px-8 2xl:px-10">
          <Form partnersPlaceholder={formPartnersPlaceholder} />
        </div>
      </div>
    </div>
  );
}