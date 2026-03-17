"use client"

import React from 'react'
import Image from 'next/image'
import { WORK_CONTENT } from '@/lib/constant'

const STEP_COLORS: { accent: string; badge: string; connector: string }[] = [
  { accent: "#3498DB", badge: "bg-[#EBF5FB] text-[#3498DB]", connector: "bg-[#3498DB]/20" },
  { accent: "#1F3A5F", badge: "bg-[#EBF0F8] text-[#1F3A5F]", connector: "bg-[#1F3A5F]/20" },
  { accent: "#2ECC71", badge: "bg-[#E8F8F0] text-[#27AE60]", connector: "bg-[#2ECC71]/20" },
]

const DEFAULT_STEP_COLOR: { accent: string; badge: string; connector: string } = { accent: "#3498DB", badge: "bg-[#EBF5FB] text-[#3498DB]", connector: "bg-[#3498DB]/20" }

export default function Work() {
  return (
    <section className="w-full bg-[#F0F5FB] px-6 py-12 md:px-10 md:py-14 lg:px-16 lg:py-16 xl:px-20 xl:py-20">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 md:mb-12 xl:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF5FB] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3498DB]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3498DB]">Simple Process</span>
          </div>
          <h2 className="text-2xl lg:text-[1.65rem] xl:text-[1.85rem] font-bold text-[#111827]" style={{ lineHeight: "1.25" }}>
            {WORK_CONTENT.header}
          </h2>
          <p className="text-sm lg:text-[0.95rem] text-[#4B5563] max-w-md" style={{ lineHeight: "1.7" }}>
            Getting your home protected is quick and easy — just three steps.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {WORK_CONTENT.steps.map((step, i) => {
            const color = STEP_COLORS[Math.min(i, STEP_COLORS.length - 1)] ?? DEFAULT_STEP_COLOR
            return (
              <div
                key={step.number}
                className="group flex flex-col rounded-2xl bg-white border border-[#E4EBF5] overflow-hidden shadow-[0_2px_12px_0_rgba(31,58,95,0.06)] hover:shadow-[0_8px_28px_0_rgba(31,58,95,0.12)] transition-shadow duration-200"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden h-[200px] md:h-[160px] lg:h-[150px] xl:h-[160px] 2xl:h-[170px]">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  {/* Step badge over image */}
                  <div
                    className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                    style={{ backgroundColor: color.accent }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 px-5 py-5 xl:px-6 xl:py-6 flex-1">
                  <span className={`self-start text-[0.65rem] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${color.badge}`}>
                    Step {step.number}
                  </span>
                  <h3 className="text-[1rem] xl:text-[1.0625rem] font-bold text-[#111827]" style={{ lineHeight: "1.3" }}>
                    {step.title}
                  </h3>
                  <p className="text-[0.875rem] xl:text-[0.9375rem] text-[#4B5563]" style={{ lineHeight: "1.65" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
