"use client"

import Image from "next/image"
import { COVERAGE_CONTENT } from "@/lib/constant"
import { Button } from "@workspace/ui/components/button"

type CoverageSection = (typeof COVERAGE_CONTENT.sections)[number]

function PopularBadge({
  badge,
  variant,
}: {
  badge: { tag: string; tagIcon: string; tagIconAlt: string }
  variant: "outline" | "pill"
}) {
  if (variant === "outline") {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#F16601] bg-white px-3 py-1.5 md:py-2">
 
        <Image
          src={badge.tagIcon}
          alt={badge.tagIconAlt}
          width={14}
          height={14}
          className="w-4 h-4 xl:w-5 xl:h-5 object-cover"
        />
        <span className="text-[0.77rem] md:text-[0.77rem] xl:text-sm text-[#F16600] font-medium md:font-normal">{badge.tag}</span>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 md:text-[0.75rem] xl:text-sm font-medium text-[#F16601] xl:px-3 ">
      <Image
        src={badge.tagIcon}
        alt={badge.tagIconAlt}
        width={12}
        height={12}
        className="w-3 h-3 xl:w-4 xl:h-4 object-cover shrink-0"
      />
      {badge.tag}
    </span>
  )
}

function CoverageCard({ section }: { section: CoverageSection }) {
  const badge = "badge" in section.button ? section.button.badge : null

  const ctaButton = (className: string) => (
    <Button
      type="1"
      variant="default"
      htmlType="button"
      onClick={() => {
        window.location.href = section.button.href
      }}
      className={`flex h-14 md:h-14.5 xl:h-18  cursor-pointer font-medium font-poppins text-sm xl:text-lg px-4 xl:px-4.5  w-full shrink-0 cursor-pointer items-center justify-between gap-2 rounded-[10px] bg-[#F16601]  text-white shadow-[0_0_6px_0_rgba(0,53,153,0.20)] transition-all duration-300 hover:bg-[#F16601]  ${className}`}
    >
      <span className="flex min-w-0 items-center gap-2.5 xl:gap-3">
        {section.button.label}
        {badge ? (
          <span className="hidden md:inline-flex">
            <PopularBadge badge={badge} variant="pill" />
          </span>
        ) : null}
      </span>
      <Image
        src={COVERAGE_CONTENT.arrowIconButton.src}
        alt={COVERAGE_CONTENT.arrowIconButton.alt}
        width={20}
        height={20}
        className="h-5 w-5 xl:h-6.5 xl:w-6.5  shrink-0 "
      />
    </Button>
  )

  return (
    <div className="flex h-full w-full flex-col md:justify-between gap-3 rounded-[15px] border border-[#E7EDF5] bg-white p-5.5 shadow-[2px_2px_15px_0_rgba(1,41,133,0.06)] md:gap-0 md:p-6 xl:p-7 lg:gap-6  xl:gap-7 ">
      {badge ? (
        <div className="md:hidden">
          <PopularBadge badge={badge} variant="outline" />
        </div>
      ) : null}

      <div className="flex w-full flex-col gap-5 md:flex-row md:items-center md:gap-6 lg:gap-6 xl:gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-5 lg:gap-5 xl:gap-6">
          <div className="flex flex-col gap-2 xl:gap-2.5">
            <h3 className="text-[1.15rem] xl:text-[1.32rem] font-semibold text-[#1A1A1A] font-sans ">
              {section.title}
            </h3>
            <p
              className="text-[0.85rem]  xl:text-base  font-normal text-[#4B5563] font-sans "
              style={{ lineHeight: 1.6 }}
            >
              {section.description}
            </p>
          </div>

          <ul className="flex flex-col gap-2.5 xl:gap-3">
            {section.features.map((feature) => (
              <li key={feature.label} className="flex items-center gap-2 ">
                <Image
                  src={feature.icon}
                  alt={feature.iconAlt}
                  width={22}
                  height={22}
                  className="h-6.5 w-6.5 xl:h-7 xl:w-7 shrink-0  object-contain"
                />
                <span className="text-[0.85rem]  xl:text-base  font-medium text-[#4B5563] font-sans ">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>

          {ctaButton("lg:hidden mt-1 ")}
        </div>

        <div className="hidden shrink-0 items-center justify-center md:flex md:w-[45%] md:max-w-[290px] lg:w-[45%] xl:w-[44%] ">
          <Image
            src={section.image.src}
            alt={section.image.alt}
            width={360}
            height={320}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>

      {ctaButton("hidden lg:flex")}

      <div className="mt-1 flex w-full items-center justify-center md:hidden">
        <Image
          src={section.image.src}
          alt={section.image.alt}
          width={320}
          height={280}
          className="h-auto w-full  object-cover"
          priority
        />
      </div>
    </div>
  )
}

export default function Coverage() {
  return (
    <div className="coverage w-full h-full bg-[#F1F7FF] px-6 py-8 md:px-8 md:py-9 lg:px-14 lg:py-12 lg:pb-14 xl:px-23 xl:py-16">
      <div className="container mx-auto max-w-[1380px]">
        <div className="coverage-content w-full flex flex-col items-center justify-center gap-8 md:gap-11 lg:gap-12 xl:gap-15">
          <div className="flex flex-col items-center justify-center gap-2.5 xl:gap-3">
            <h2
              className="text-[1.5rem] md:text-2xl lg:text-2xl xl:text-4xl font-bold text-[#1A1A1A] text-center font-sans tracking-tight"
              style={{ lineHeight: 1.3 }}
            >
              {COVERAGE_CONTENT.header}
            </h2>
            <p
              className="text-sm font-normal xl:text-lg mx-auto text-[#4B5563] text-center font-sans md:max-w-[520px] lg:max-w-[600px] xl:max-w-[780px]"
              style={{ lineHeight: 1.6 }}
            >
              {COVERAGE_CONTENT.description}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-7">
            {COVERAGE_CONTENT.sections.map((section) => (
              <CoverageCard key={section.type} section={section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
