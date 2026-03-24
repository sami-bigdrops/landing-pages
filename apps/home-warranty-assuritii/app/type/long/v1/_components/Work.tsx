"use client"

import React from 'react'
import Image from 'next/image'
import { Button as ButtonUI } from "@workspace/ui/components/button"
import { COVER_CONTENT, WORK_CONTENT } from '@/lib/constant'

export default function Work() {
  return (
    <section className="w-full bg-[#E8F0FA] px-6 py-8 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-25 xl:py-16">
      <div className="container mx-auto">
        <div className="work-content w-full flex flex-col items-center justify-center  gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">

          {/* Header */}
          <div className=" flex flex-col items-center justify-center gap-3 md:gap-4 xl:gap-6 ">
            <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl md:max-w-[200px] lg:max-w-[500px] xl:max-w-[500px]  font-bold text-[#111827] text-center  font-inter" style={{ lineHeight: '1.2' }}>
              {WORK_CONTENT.header}
            </h2>

          </div>

          <div className="w-full mx-auto flex flex-col gap-7 md:gap-8 lg:gap-12 xl:gap-10 md:flex-row md:items-stretch ">
            <div className="w-full shrink-0 md:w-[48%] xl:w-[50%]">
              <Image
                src={WORK_CONTENT.workImage[0].src}
                alt={WORK_CONTENT.workImage[0].alt}
                width={800}
                height={560}
                className="h-auto w-full lg:w-[420px] xl:w-[560px] xl:h-[330px] md:h-[290px] rounded-[10px] object-cover shadow-[0_4px_24px_rgba(15,23,42,0.08)]"
                sizes="(min-width: 1024px) 32rem, 100vw"
                priority
              />
            </div>
            <div className="w-full min-w-0 flex flex-col justify-center md:w-[52%] xl:w-[50%]">
              <div className="flex flex-col">
                {WORK_CONTENT.steps.map((step, index) => (
                  <div key={step.number} className="flex gap-4 xl:gap-5 items-stretch">
                    <div className="flex w-9.5 lg:w-10 xl:w-11.5  shrink-0 flex-col items-center self-stretch md:w-[3.25rem] lg:w-[4rem] ">
                      <div
                        className="relative z-10 flex h-9.5 lg:h-10 w-9.5 lg:w-10 xl:w-11.5 xl:h-11.5 shrink-0 items-center justify-center rounded-[100px] border border-[rgba(31,58,95,0.60)] bg-white text-sm xl:text-base font-bold tracking-tight text-[#1F3A5F] "
                        aria-hidden
                      >
                        {step.number}
                      </div>
                      {index < WORK_CONTENT.steps.length - 1 ? (
                        <div
                          className="w-px flex-1 min-h-0 lg:min-h-10 shrink-0 bg-[rgba(31,58,95,0.30)]"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <div
                      className={`min-w-0 flex-1 pt-0.5 ${index < WORK_CONTENT.steps.length - 1 ? "pb-8 md:pb-10 xl:pb-18" : ""}`}
                    >
                      <h3 className="text-[0.89rem] lg:text-[0.93rem] xl:text-lg font-semibold text-[#1C2833]  font-sans" style={{ lineHeight: 1.4 }}>{step.title}</h3>
                      <p className="mt-1 xl:mt-2.5 text-[0.8rem] lg:text-[0.85rem] xl:text-base leading-relaxed text-[#374151]  font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="bottom flex flex-col items-center justify-center gap-5 xl:gap-6">
            <div className="w-full ">
              <ButtonUI
                type="1"
                variant="default"
                htmlType="submit"
                className="w-full bg-[#3498DB] text-white font-medium py-6 xl:py-7.5 rounded-[10px] text-sm xl:text-lg "
              >
                {COVER_CONTENT.callToAction.buttonText}
              </ButtonUI>
            </div>
            <div className="w-full flex items-center justify-center text-center text-[#1F3A5F] text-sm  xl:text-lg gap-1.5">
              <p className="font-medium">{COVER_CONTENT.callToAction.contactText}</p>
              <a href={COVER_CONTENT.callToAction.phoneHref} className="font-bold">{COVER_CONTENT.callToAction.phoneNumber}</a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
