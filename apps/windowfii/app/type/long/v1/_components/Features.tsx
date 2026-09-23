"use client"

import React from "react"
import Image from "next/image"
import { FEATURES_CONTENT } from "@/lib/constant"

function FeatureItem({
  step,
  align = "center",
}: {
  step: (typeof FEATURES_CONTENT.steps)[number]
  align?: "center" | "start"
}) {
  const isCenter = align === "center"

  return (
    <div
      className={`flex w-full flex-col gap-1.5 md:gap-1.5 xl:gap-2 ${
        isCenter ? "items-center" : "items-start"
      }`}
    >
      <div className="flex items-center justify-center mb-1.5">
        <div className="h-8.5 w-8.5 md:h-7.5 md:w-7.5 xl:h-10 xl:w-10">
          <Image
            src={step.image.src}
            alt={step.image.alt}
            width={60}
            height={60}
            className="h-full w-full object-contain"
            priority
          />
        </div>
      </div>
      <h3
        className={`text-[0.95rem] font-semibold text-[#000000] font-sans xl:text-[1.15rem] lg:max-w-full ${
          isCenter ? "text-center" : "text-left"
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`text-[0.83rem] font-normal text-[#333333] font-sans xl:text-base md:max-w-[290px] lg:max-w-full xl:max-w-[300px] ${
          isCenter ? "mx-auto text-center" : "text-left"
        }`}
        style={{ lineHeight: 1.6 }}
      >
        {step.description}
      </p>
    </div>
  )
}

export default function Features() {
  const leftSteps = FEATURES_CONTENT.steps.slice(0, 2)
  const rightSteps = FEATURES_CONTENT.steps.slice(2, 4)

  return (
    <div className="works w-full h-full bg-[#F4F8FF] px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-23 xl:py-16">
      <div className="container mx-auto max-w-[1250px] ">
        <div className="flex w-full h-full flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-16 ">
          <div className="flex w-full h-full flex-col items-center justify-center gap-2.5 xl:gap-4">
            <h2
              className="text-[1.4rem] text-center md:text-2xl xl:text-4xl md:max-w-[500px] xl:max-w-[700px] font-bold text-[#000000] text-center font-sans"
              style={{ lineHeight: "1.3" }}
            >
              {FEATURES_CONTENT.header}
            </h2>
            <p
              className="text-[#333333] text-center font-normal font-sans text-[0.85rem] xl:text-[1.14rem] md:max-w-[530px] xl:max-w-[830px]"
              style={{ lineHeight: "1.6" }}
            >
              {FEATURES_CONTENT.description}
            </p>
          </div>

          {/* Mobile: image on top, then features stacked and centered */}
          <div className="flex w-full flex-col items-center gap-8 md:hidden">
            <div className="w-full overflow-hidden rounded-[10px]">
              <Image
                src={FEATURES_CONTENT.image.src}
                alt={FEATURES_CONTENT.image.alt}
                width={800}
                height={560}
                className="h-auto w-full rounded-[10px] object-cover"
                priority
              />
            </div>
            <div className="flex w-full flex-col items-center gap-6">
              {FEATURES_CONTENT.steps.map((step) => (
                <FeatureItem key={step.number} step={step} align="center" />
              ))}
            </div>
          </div>

          {/* md / lg / xl: 2 features | image | 2 features */}
          <div className="hidden w-full md:grid md:grid-cols-[1fr_minmax(220px,1.1fr)_1fr] lg:grid-cols-[1fr_minmax(360px,1.1fr)_1fr] xl:grid-cols-[1fr_minmax(460px,1.1fr)_1fr] md:items-center md:gap-7 lg:gap-9 xl:gap-14">
     
            <div className="flex h-full flex-col justify-between gap-8 lg:gap-8 ">
              {leftSteps.map((step) => (
                <FeatureItem key={step.number} step={step} align="start" />
              ))}
            </div>

            <div className="w-full overflow-hidden rounded-[32px] ">
              <Image
                src={FEATURES_CONTENT.image.src}
                alt={FEATURES_CONTENT.image.alt}
                width={800}
                height={900}
                className="h-full min-h-[340px] w-full rounded-[32px] object-cover lg:min-h-[325px] xl:min-h-[330px] "
                priority
              />
            </div>

            <div className="flex h-full flex-col justify-between gap-8 lg:gap-8 ">
              {rightSteps.map((step) => (
                <FeatureItem key={step.number} step={step} align="start" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
