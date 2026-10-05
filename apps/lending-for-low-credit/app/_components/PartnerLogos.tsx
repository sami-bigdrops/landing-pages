"use client"

import Image from "next/image"
import { HERO_CONTENT } from "@/lib/constant"

type PartnerLogosProps = {
  className?: string
}

export default function PartnerLogos({ className = "" }: PartnerLogosProps) {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <div className="grid w-full md:max-w-[400px] xl:max-w-[550px] grid-cols-2 items-center justify-items-center gap-6 md:gap-5 md:grid-cols-3  ">
        {HERO_CONTENT.partners.map((partner, index) => (
          <div
            key={index}
            className={`flex items-center justify-center object-contain ${
              index === 2 ? "col-span-2 justify-self-center md:col-span-1" : ""
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
  )
}
