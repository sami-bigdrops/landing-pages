"use client"

import Image from "next/image"
import { WHY_CONTENT } from "@/lib/constant"

export default function WhyRefinance() {
  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-14 lg:py-14 xl:px-23 xl:py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C2833] font-inter leading-tight tracking-tight">
            {WHY_CONTENT.header}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 font-inter">
            {WHY_CONTENT.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-10">
          {WHY_CONTENT.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#EDF2F9] shrink-0">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1C2833] font-inter leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-gray-500 font-inter leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
