"use client"

import Image from "next/image"
import { PARTNERS_CONTENT } from "@/lib/constant"

export default function Partners() {
  return (
    <div
      className="partners w-full shrink-0 px-4 py-4 md:px-6 md:py-5 lg:px-14 xl:px-23 xl:py-6"
      style={{ background: "rgba(255, 247, 236, 0.80)" }}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="partners-content flex w-full flex-col items-center justify-center gap-4 md:gap-5 xl:gap-6">
          <h2 className="text-base lg:text-lg xl:text-xl font-semibold text-[#1A1A1A] text-center font-sans leading-tight tracking-normal">
            {PARTNERS_CONTENT.header}
          </h2>

          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-5 lg:gap-6 xl:gap-8">
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
