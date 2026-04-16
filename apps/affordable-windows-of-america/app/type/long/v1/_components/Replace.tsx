"use client"

import { REPLACE_CONTENT } from "@/lib/constant";
import Image from "next/image";

export default function Replace() {
    return (
        <div className="replace bg-white w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-20 xl:py-14">
      <div className="container mx-auto">
        <div className="replace-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-14 xl:gap-16">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#111827] text-center font-sans md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] leading-tight tracking-tight">
            <span
              style={{
                background: REPLACE_CONTENT.headingGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {REPLACE_CONTENT.headerParts.gradient}
            </span>
            {" "}{REPLACE_CONTENT.headerParts.after}
          </h2>
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-10 xl:gap-24">
            {REPLACE_CONTENT.signs.map((sign) => (
              <div key={sign.id} className="flex flex-col items-center justify-center gap-4">
                <Image src={sign.image.src} alt={sign.image.alt} width={200} height={200} className="w-35 md:w-30 lg:w-35 xl:w-40 object-contain object-center h-auto" />
                <p className="text-[#111827] text-center font-sans text-base xl:text-lg font-semibold tracking-tight">{sign.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
}