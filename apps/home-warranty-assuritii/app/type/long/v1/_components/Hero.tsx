"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"
import Image from "next/image"



type HeroProps = {
  formPartnersPlaceholder?: boolean
}

export default function Hero({ formPartnersPlaceholder }: HeroProps = {}) {
  useUtmParams(30)

  return (
    <div
      className="bg-white w-full h-full  py-6 px-6 md:min-h-[500px] md:p-0 md:py-0 md:px-10 lg:px-16 xl:px-24 2xl:px-35   lg:min-h-[500px] xl:min-h-[600px] 2xl:min-h-[670px]"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%), url(${HERO_CONTENT.image.src}) lightgray 40% / cover no-repeat`,
      }}
    >
      <div className="container mx-auto md:max-w-none md:mx-0 md:px-0 md:w-full">
        <div className="flex flex-col gap-6 md:flex-row md:gap-0 md:items-stretch md:min-h-[600px] md:w-full lg:gap-0 xl:gap-0 2xl:gap-0">
          <div className="left flex flex-col items-center justify-center gap-4 md:w-1/2 lg:w-[60%] xl:w-[65%] md:max-w-none md:min-h-[600px] md:flex md:flex-col md:justify-end md:items-start md:gap-4 md:pb-10 ">
            <h1
              className="text-[1.8rem] lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[2.5rem] max-w-[250px] lg:max-w-[348px] xl:max-w-[435px]  text-center md:text-left font-bold text-white "
              style={{ lineHeight: "1.2" }}
            >
              {HERO_CONTENT.headline}
            </h1>
            <p
              className="text-sm  xl:text-[1.2rem] max-w-[250px] lg:max-w-[350px] xl:max-w-[430px] font-normal text-center md:text-left text-white "
              style={{ lineHeight: "1.5" }}
            >
              {HERO_CONTENT.description}
            </p>

            <div className="hidden w-full min-w-0 items-center justify-center gap-5 xl:gap-6 xl:mt-5 overflow-hidden  md:flex md:justify-start">
              <Image
                src={HERO_CONTENT.partners[0].src}
                alt={HERO_CONTENT.partners[0].alt}
                width={100}
                height={100}
                className="object-contain md:w-43 xl:w-55  h-auto min-w-0 flex-shrink"
              />
              <Image
                src={HERO_CONTENT.partners[1].src}
                alt={HERO_CONTENT.partners[1].alt}
                width={100}
                height={100}
                className="object-contain md:w-12 xl:w-16  h-auto min-w-0 flex-shrink"
              />
            </div>
          </div>

          <div className="right flex w-full flex-col items-center justify-center md:h-auto md:min-h-[600px] xl:min-h-[670px]  md:w-1/2 lg:w-[40%] xl:w-[35%]  md:items-stretch md:justify-end ">
            <div className="flex w-full min-h-0 flex-col md:h-full md:min-h-[600px] md:items-center md:justify-end">
              <Form />
            </div>
            <div className="partners mt-3 flex shrink-0 justify-center md:hidden xl:justify-start">
              {formPartnersPlaceholder ? (
                <div className="w-full min-w-0 flex items-center justify-center rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] py-3 px-3">
                  <p className="text-xs xl:text-sm text-center font-medium text-[#374151] font-sans">&lt;ENDORSEMENT / RANKING LOGOS&gt;</p>
                </div>
              ) : (
                <div className="flex w-full min-w-0 items-center justify-center gap-5 overflow-hidden sm:gap-3 lg:justify-start xl:justify-start xl:gap-4 2xl:gap-5">
                  <Image
                    src={HERO_CONTENT.partners[0].src}
                    alt={HERO_CONTENT.partners[0].alt}
                    width={100}
                    height={100}
                    className="w-45 flex-shrink object-contain sm:w-14 lg:w-16 xl:w-[4.5rem] 2xl:w-20"
                  />
                  <Image
                    src={HERO_CONTENT.partners[1].src}
                    alt={HERO_CONTENT.partners[1].alt}
                    width={100}
                    height={100}
                    className="w-16 flex-shrink object-contain sm:w-14 lg:w-16 xl:w-[4.5rem] 2xl:w-20"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}