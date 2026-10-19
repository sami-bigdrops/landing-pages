"use client"

import Image from "next/image"
import { PARTNERS_CONTENT } from "@/lib/constant"

export default function Partners() {
  return (
    <div
      className="partners w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-23 xl:py-14"
      style={{
        background: "linear-gradient(180deg, #EBF4FF 0%, #FFF 64.52%)"
      }}
    >
      <div className="container mx-auto">
        <div className="partners-content w-full flex flex-col items-center justify-center gap-8 md:gap-8 xl:gap-14">
          <h2 className="text-base lg:text-lg xl:text-xl font-semibold text-[#1A1A1A] text-center font-sans leading-tight tracking-tight">
            {PARTNERS_CONTENT.header}
          </h2>

          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-2  md:grid-cols-6 gap-8 md:gap-8 lg:gap-9 xl:gap-14 ">
              {PARTNERS_CONTENT.partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center object-contain"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={80}
                    height={60}
                    className={partner.className}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
