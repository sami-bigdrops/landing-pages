"use client"

import Image from "next/image"
import { PARTNERS_CONTENT } from "@/lib/constant"

export default function Partners() {
  return (
    <div
      className="partners bg-white w-full h-full px-6 py-6 md:px-8 md:py-6 lg:px-14 lg:py-8 xl:px-23 xl:py-9"
     
    >
      <div className="container mx-auto max-w-[1250px]">
        <div className="partners-content w-full flex flex-col items-center justify-center gap-8 md:gap-8 xl:gap-9">
          <h2 className="text-base xl:text-xl font-medium text-[#1A1A1A] text-center font-poppins leading-tight tracking-tight" style={{
            lineHeight: "1.5",
          }}>
            {PARTNERS_CONTENT.header}
          </h2>

          <div className="w-full flex justify-center items-center">
            <div className="grid w-full max-w-full grid-cols-2 justify-items-center gap-8 md:flex md:min-w-0 md:flex-nowrap md:items-center md:justify-between md:gap-0 lg:gap-0 xl:gap-0">
              {PARTNERS_CONTENT.partners.map((partner, index) => (
                <div
                  key={index}
                  className={
                    index === PARTNERS_CONTENT.partners.length - 1
                      ? "col-span-2 flex w-full min-w-0 shrink justify-center items-center object-contain md:col-auto md:w-auto"
                      : "flex min-w-0 shrink justify-center items-center object-contain"
                  }
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
