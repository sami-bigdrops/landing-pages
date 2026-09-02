
"use client"

import { useRouter } from "next/navigation"
import { useUtmParams } from "@workspace/lp-core"
import PartnerLogos from "@/app/_components/PartnerLogos"
import { HERO_CONTENT } from "@/lib/constant"


export default function Hero() {
  useUtmParams(30)
  const router = useRouter()

  return (
    <div className="relative w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10 xl:px-20 xl:py-14 ">
      <div className="container mx-auto">
        <div className="hero-content flex flex-col items-center justify-center gap-10">
          <div className=" w-full flex flex-col items-center  gap-2 xl:gap-2.5">
            <h1 className="w-full text-center  font-extrabold text-[#142B4A] text-3xl lg:text-4xl xl:text-4xl  font-sans" style={{ lineHeight: "1.3" }}>
              {HERO_CONTENT.headline}
            </h1>
            <p className="text-center text-sm xl:text-lg text-center text-[#475467] font-normal md:max-w-[480px] lg:max-w-[500px] xl:max-w-[600px]" style={{ lineHeight: "1.6" }}>
              {HERO_CONTENT.description}
            </p>
          </div>
          
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/form")}
              className="h-13 w-full cursor-pointer rounded-[10px] bg-[#C12026] py-3 text-sm font-medium uppercase text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:py-3.5 xl:h-15 xl:text-lg"
            >
              Start My Free Consultation
            </button>
          </div>

          <PartnerLogos />        </div>
      </div>
    </div>
  )
}