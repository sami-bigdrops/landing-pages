"use client"

import Image from "next/image"
import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"

export default function Hero() {
  useUtmParams(30)

  return (
    <div className="hero bg-white w-full h-full p-4 md:p-6 lg:px-14 lg:py-10 xl:px-20 xl:py-14">
      <div className="container mx-auto">
        <div className="w-full hero-content flex flex-col items-center justify-center gap-4 xl:flex-row xl:justify-between xl:items-center ">
          <div className="w-full  left flex flex-row items-center justify-center xl:flex-col gap-4 xl:gap-6 xl:w-[45%]">
            <div className="flex flex-col  items-center justify-center md:items-start gap-4 w-full md:w-[50%]  lg:w-[50%] xl:w-full xl:gap-6">
              <h1 className="text-[#111827] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[550px] font-['Inter'] text-3xl lg:text-4xl xl:text-5xl text-center md:text-left font-bold">
                {HERO_CONTENT.headline}
              </h1>
              <p className="text-[#374151] md:max-w-[340px] lg:max-w-[400px] xl:max-w-[550px] font-['Inter'] text-sm lg:text-base xl:text-lg text-center md:text-left">
                {HERO_CONTENT.description}
              </p>
              <div className="partners hidden md:flex flex-row items-center justify-center gap-3 xl:gap-6 md:mt-2">
                <div className="w-[80px] h-[30px] xl:w-[110px] xl:h-[40px]">
                  <Image
                    src={HERO_CONTENT.partners[0].src}
                    alt={HERO_CONTENT.partners[0].alt}
                    width={80}
                    height={30}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="w-[50px] h-[55px] xl:w-[65px] xl:h-[70px]">
                  <Image
                    src={HERO_CONTENT.partners[1].src}
                    alt={HERO_CONTENT.partners[1].alt}
                    width={50}
                    height={50}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="w-[140px] h-[40px] xl:w-[200px] xl:h-[50px]">
                  <Image
                    src={HERO_CONTENT.partners[2].src}
                    alt={HERO_CONTENT.partners[2].alt}
                    width={140}
                    height={40}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="hidden md:flex w-full md:w-[50%] lg:w-[50%] xl:w-full h-full items-center justify-center xl:justify-start">
              <Image
                src="/hero-left.png"
                alt="Hero Left"
                width={400}
                height={300}
                className="w-[400px] h-[300px] lg:w-[500px] xl:h-[310px] object-contain"
                priority
              />
            </div>
          </div>
          <div className="right-form w-full flex items-center justify-center  xl:w-[55%] ">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}