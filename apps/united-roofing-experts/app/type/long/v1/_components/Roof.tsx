"use client"

import { Fragment } from "react"
import { ROOF_CONTENT } from "@/lib/constant"
import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
const SECTION_STYLE = {
  backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.85), rgba(37, 99, 235, 0.85)), url(${ROOF_CONTENT.image.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}

export default function Roof() {
  return (
    <div
      className="roof w-full min-h-full px-4 pt-0 py-6 md:px-6 md:py-10 md:pt-0 lg:pt-0 xl:pt-0 2xl:pt-0 lg:px-14 lg:py-12 xl:px-20 xl:py-16"
      style={SECTION_STYLE}
    >
      <div className="container mx-auto ">

        {/* mobile view */}

        <div className="mobile-view md:hidden  flex flex-col items-center gap-8 pb-4">
          <div className="w-full">
            <div className="bg-white rounded-b-[250px]  px-6 pb-11 pt-8  shadow-lg ">
              <h2 className="text-lg md:text-[1.7rem] lg:text-3xl xl:text-4xl font-bold text-[#111827] text-center font-sans leading-tight tracking-tight" >
                {ROOF_CONTENT.header}
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center gap-7 w-full ">
            {ROOF_CONTENT.signs.map((sign) => (
              <div key={sign.id} className="flex flex-col items-center gap-2">
                <div className="w-18 h-18 rounded-full overflow-hidden  flex-shrink-0 shadow-md">
                  <Image
                    src={sign.image.src}
                    alt={sign.image.alt}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white font-sans text-sm font-medium text-center">
                  {sign.title}
                </p>
              </div>
            ))}
          </div>
          <Button
            type="1"
            variant="default"

            className="bg-[#DC2626] h-14 md:h-14.5 xl:h-17  md:w-65 lg:w-70 xl:w-83  cursor-pointer text-white font-semibold font-inter rounded-[50px] text-sm xl:text-lg px-8 py-6 md:py-5.5  flex items-center gap-2 transition-all duration-300 w-full max-w-md justify-center shadow-md hover:shadow-lg disabled:opacity-90 disabled:cursor-not-allowed"
          >
            {ROOF_CONTENT.ctaButtonText}
          </Button>
        </div>



        {/* desktop view */}
        
        <div className="desktop-view hidden md:flex md:flex-col md:items-center md:justify-center md:gap-10 lg:gap-18 xl:gap-20 ">
          <div className="relative w-full max-w-[850px] mx-auto min-h-[250px]  flex flex-col items-center">
            <div className="bg-white rounded-b-[450px] md:w-[50%] lg:w-[48%]  l mx-auto px-10 pb-20 pt-10 lg:pb-20 shadow-lg relative z-10">
              <h2 className="md:text-[1.15rem] lg:text-[1.3rem] xl:text-[1.7rem]  md:max-w-[230px] lg:max-w-[300px] xl:max-w-[500px] font-bold text-[#111827] text-center font-sans leading-tight tracking-tight mx-auto">
                {ROOF_CONTENT.header}
              </h2>
            </div>

            {ROOF_CONTENT.signs.map((sign, index) => {
              const isTopLeft = index === 0
              const isMiddleLeft = index === 1
              const isBottomCenter = index === 2
              const isMiddleRight = index === 3
              const isTopRight = index === 4
              const imagePositionClass = [
                "md:left-[20%] md:top-[10%]",
                "md:left-[28%] md:top-[44%]",
                "md:left-[50%] md:top-[60%] -translate-x-1/2",
                "md:right-[28%] md:top-[44%]",
                "md:right-[20%] md:top-[10%]",
              ][index]
              const textPositionClass = [
                "md:left-[2.5%] md:top-[20%]",
                "md:left-[9%] md:top-[55%]",
                "md:left-[50%] md:top-[94%] -translate-x-1/2",
                "md:right-[3.5%] md:top-[54%]",
                "md:right-[4%] md:top-[20%]",
              ][index]
              return (
                <Fragment key={sign.id}>
                  <div
                    className={`absolute z-20 ${imagePositionClass}`}
                  >
                    <div className="md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-20 xl:h-20 rounded-full overflow-hidden ">
                      <Image
                        src={sign.image.src}
                        alt={sign.image.alt}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span
                    className={`absolute z-20 font-sans text-white text-sm lg:text-base xl:text-lg font-medium whitespace-nowrap drop-shadow-sm ${textPositionClass}`}
                  >
                    {sign.title}
                  </span>
                </Fragment>
              )
            })}
          </div>

          <Button
            type="1"
            variant="default"

            className="bg-[#DC2626] h-14 md:h-14 xl:h-17  md:w-65  xl:w-83  cursor-pointer text-white font-semibold font-inter rounded-[50px] text-sm xl:text-lg px-8 py-6 md:py-5.5  flex items-center gap-2 transition-all duration-300 w-full max-w-md justify-center shadow-md hover:shadow-lg disabled:opacity-90 disabled:cursor-not-allowed"
          >
            {ROOF_CONTENT.ctaButtonText}
          </Button>
        </div>
      </div>
    </div>

  )

}
