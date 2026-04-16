"use client"

import { TRUST_CONTENT } from "@/lib/constant";
import Image from "next/image";

export default function Trust() {
  return (
    <div className="trust bg-white w-full h-full px-4 py-8">
      <div className="container mx-auto">
        <div className="trust-content w-full flex flex-col xl:flex-row items-center justify-between gap-5 md:gap-8 lg:gap-10 xl:gap-16">
          <Image
            src={TRUST_CONTENT.image.src}
            alt={TRUST_CONTENT.image.alt}
            width={200}
            height={200}
            className="w-35 md:w-40 lg:w-45 xl:w-50 object-contain object-center h-auto"
          />
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-5 md:gap-8 lg:gap-10 xl:gap-16">
            {TRUST_CONTENT.stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col xl:flex-row items-center justify-center gap-2"
              >
                <Image
                  src={stat.image.src}
                  alt={stat.image.alt}
                  width={40}
                  height={40}
                  className="w-10 object-contain object-center h-auto"
                />
                <p className="text-[#111827] text-center font-sans text-base xl:text-xl font-bold">
                  {stat.number}
                </p>
                <p className="text-[#111827] text-center font-sans text-base xl:text-xl font-medium">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
