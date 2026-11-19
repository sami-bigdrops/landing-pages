"use client"

import Image from "next/image"
import { PARTNERS_CONTENT, TOP_NAV_CONTENT } from "@/lib/constant"

export default function Partners() {
  return (
    <div
      className="partners w-full h-full "
      
    >
      <div className="container mx-auto">
        <div className="partners-content w-full flex flex-col items-center justify-center gap-6 ">
          <h2 className="md:hidden w-full whitespace-nowrap text-center text-[13px] font-semibold text-[#102A43] font-sans tracking-tight" style={{ lineHeight: "1.4" }}>
            {TOP_NAV_CONTENT.headline}
          </h2>

          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-2 md:grid-cols-5 w-full gap-8 md:gap-8 lg:gap-9 xl:gap-14">
              {PARTNERS_CONTENT.partners.map((partner, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center object-contain${
                    index === PARTNERS_CONTENT.partners.length - 1
                      ? " col-span-2 md:col-span-1"
                      : ""
                  }`}
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
