"use client"

import React from 'react'
import Image from 'next/image'
import { ABOUT_CONTENT } from '@/lib/constant'

export default function About() {
  return (
    <section className="w-full bg-white px-6 py-12 md:px-10 md:py-14 lg:px-16 lg:py-16 xl:px-20 xl:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16 xl:gap-20">

          {/* Left */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 md:gap-5 xl:gap-6 md:w-[45%] lg:w-[42%] xl:w-[40%] shrink-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF5FB] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3498DB]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3498DB]">Home Warranty</span>
            </div>
            <h2 className="text-2xl md:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] font-bold text-[#111827] leading-[1.25]">
              {ABOUT_CONTENT.header}
            </h2>
            <p className="text-sm lg:text-[0.95rem] xl:text-[1rem] text-[#4B5563] leading-[1.7] max-w-[380px]">
              {ABOUT_CONTENT.description}
            </p>
          </div>

          {/* Right */}
          <div className="w-full md:flex-1 flex flex-col gap-3 xl:gap-4">
            {ABOUT_CONTENT.features.map((feature, i) => (
              <div
                key={feature.title}
                className="group flex items-center gap-4 xl:gap-5 rounded-2xl border border-[#E9EEF5] bg-[#F7FAFD] px-5 py-4 xl:px-6 xl:py-5 transition-all duration-200 hover:border-[#3498DB]/30 hover:bg-[#EBF5FB] hover:shadow-[0_4px_18px_0_rgba(52,152,219,0.09)]"
              >
                <div className="shrink-0 flex h-11 w-11 xl:h-12 xl:w-12 items-center justify-center rounded-xl bg-white shadow-[0_2px_8px_0_rgba(31,58,95,0.08)] group-hover:shadow-[0_4px_12px_0_rgba(52,152,219,0.14)] transition-shadow duration-200">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    width={28}
                    height={28}
                    className="w-6 h-6 xl:w-7 xl:h-7 object-contain"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-[#3498DB]">
                    {`0${i + 1}`}
                  </span>
                  <p className="text-[0.9375rem] xl:text-[1rem] font-semibold text-[#111827] leading-snug">
                    {feature.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
