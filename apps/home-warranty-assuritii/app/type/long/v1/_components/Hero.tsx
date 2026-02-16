"use client"

import { useUtmParams } from "@workspace/lp-core"
import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"



export default function Hero() {
  useUtmParams(30)

  return (
    <div className="bg-white w-full h-full">
      
      <div className="w-full h-full flex flex-col md:flex-row  ">
        <div
          className="relative  w-full md:w-[55%] xl:w-[60%] 2xl:w-[57%]  min-h-[100px] lg:min-h-[600px] xl:min-h-[750px] 2xl:min-h-[820px]  flex flex-col justify-end  md:py-10 pt-50    "
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.10) 77.75%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 32.16%, rgba(0, 0, 0, 0.40) 69.82%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url(${HERO_CONTENT.image.src}) lightgray top / cover no-repeat`
           
          }}
        >
          <div className="relative z-10 space-y-4 max-w-2xl w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10 xl:px-18 xl:py-14 flex flex-col items-center justify-end">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl xl:max-w-[600px] font-bold text-white drop-shadow-lg" style={{ lineHeight: "1.2" }}>
              {HERO_CONTENT.headline}
            </h1>
            <p className="text-base lg:text-lg xl:text-xl font-normal text-white drop-shadow-md max-w-xl" style={{ lineHeight: "1.5" }}>
              {HERO_CONTENT.description}
            </p>
          </div>
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] 2xl:w-[43%]  bg-[#E8F0FA] flex flex-col items-center justify-center py-8 px-6  lg:px-8 lg:py-10 lg:pt-12 lg:pr-12 xl:pt-12 xl:pl-14 xl:pr-20 xl:pb-14 2xl:pl-25 2xl:pr-37">
          <Form />
        </div>
      </div>
    </div>
  );
}