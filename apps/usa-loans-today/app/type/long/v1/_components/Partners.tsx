"use client"

import Image from "next/image"
import { PARTNERS_CONTENT } from "@/lib/constant"

export default function Partners() {
  return (
    <div
      className="partners w-full h-full bg-[#F1F7FF] px-6 py-8 md:px-8 md:py-8 lg:px-14  xl:px-23 xl:py-12"
     
    >
      <div className="container mx-auto max-w-[1380px]">
        <div className="partners-content w-full flex flex-col items-center justify-center gap-8 md:gap-8 lg:gap-9 xl:gap-12 2xl:gap-9">
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
