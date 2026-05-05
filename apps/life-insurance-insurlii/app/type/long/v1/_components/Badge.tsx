"use client"

import Image from "next/image"
import { BADGE_CONTENT } from "@/lib/constant"

export default function Badge() {
  return (
    <div
      className="badge w-full h-full bg-[#0F294C] px-6 py-6 md:px-6  lg:px-14 lg:py-7 xl:px-23 xl:py-8"
      
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="badge-content w-full flex flex-wrap items-center justify-center gap-y-8 md:flex-nowrap md:justify-between md:gap-14 lg:gap-32 xl:gap-40">
          {BADGE_CONTENT.badges.map((badge, index) => (
            <div
              key={badge.number}
              className={`flex flex-col items-center justify-center gap-2 xl:gap-2.5 md:flex-1 md:flex-row md:justify-center  ${
                index === 0 ? "w-full" : "w-1/2"
              }`}
            >
              <Image
                src={badge.image.src}
                alt={badge.image.alt}
                width={24}
                height={24}
                className="h-5 w-5 md:h-4.5 md:w-4.5 lg:h-5 lg:w-5 xl:h-5.5 xl:w-5.5 object-contain"
                priority
              />
              <p className="text-center text-sm lg:text-base xl:text-lg font-normal text-[#E5E7EB] md:text-left ">
                {badge.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
