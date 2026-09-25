"use client"

import Image from "next/image"
import { useUtmParams, QUOTIFII_EXTENDED_UTM_OPTIONS } from "@workspace/lp-core"

import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"
import Navbar from "@/app/_components/Navbar"

export default function Hero() {
  useUtmParams(QUOTIFII_EXTENDED_UTM_OPTIONS)

  return (
    <div
      className="relative w-full h-full md:min-h-[292px] lg:min-h-[320px] xl:min-h-[510px] 2xl:min-h-[580px]"
      style={{
        backgroundImage: `url('${HERO_CONTENT.image.src}')`,
        backgroundPosition: "85% top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 bg-white w-full h-full md:max-w-[650px]  xl:max-w-[720px] mx-auto ">
        <div className="container ">
          <div className="hero-content w-full flex flex-col items-center justify-center  gap-2  ">
            <div className="hidden md:block">
              <Navbar />
            </div>

            <div className="w-full flex flex-col items-center justify-center  gap-6 md:gap-5 xl:gap-6  pb-4 md:pt-0 xl:pb-6 ">
              <div className=" w-full flex flex-col items-center  gap-2  border-none">
                <Image
                  src="/hero-img.webp"
                  alt="Hero image"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-none   md:h-[310px]  xl:h-[350px]"
                  priority
                />

                <p
                  className="text-[#000000] text-center font-bold font-sans uppercase text-[0.93rem] lg:text-[1rem] xl:text-[1.1rem] font-bold  px-6 tracking-wide"
                  style={{ lineHeight: "1.5" }}
                >
                  {HERO_CONTENT.description}
                </p>
              </div>

              <div className="w-full flex flex-col items-center justify-center border-none px-6  py-5 ">
                <Form />
              </div>

              <div className="w-full flex flex-col items-center justify-center px-6  ">
                <p
                  className="text-[#808080] text-center font-normal font-sans text-xs  text-justify  xl:text-sm font-normal  "
                  style={{ lineHeight: "1.5" }}
                >
                  {HERO_CONTENT.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
