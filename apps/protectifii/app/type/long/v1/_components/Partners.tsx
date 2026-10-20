"use client"

import Image from "next/image"
import { PARTNERS_CONTENT } from "@/lib/constant"

export default function Partners() {
  return (
    <div
      className="partners w-full h-full border-b border-b-[#D5D2E5] border-b-[1px] bg-[#FFF] px-6 py-8 md:px-8 md:py-8 lg:px-14  xl:px-23 xl:py-10"
    >
      <div className="container mx-auto max-w-[1280px]">
        <div className="partners-content w-full flex flex-col items-center justify-center gap-8 md:gap-8 xl:gap-14">
          
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
