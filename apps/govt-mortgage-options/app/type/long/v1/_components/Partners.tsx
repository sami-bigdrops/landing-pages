"use client"

import Image from "next/image"
import { PARTNERS_CONTENT } from "@/lib/constant"

export default function Partners() {
  return (
    <div
      className="partners w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-23 xl:py-14"
    >
      <div className="container mx-auto">
        <div className="partners-content w-full flex flex-col items-center justify-center gap-6 md:gap-8 xl:gap-14">
          <h2 className="text-base lg:text-lg xl:text-2xl font-bold text-[#1C2833] text-center font-inter leading-tight tracking-tight">
            {PARTNERS_CONTENT.header}
          </h2>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {PARTNERS_CONTENT.partners.map((partner, index) => (
              <div
                key={index}
                className="flex justify-center items-center"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={160}
                  height={60}
                  className="w-full max-w-[120px] md:max-w-[140px] xl:max-w-[180px] h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
