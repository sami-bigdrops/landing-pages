"use client"

import { Fragment } from "react"
import { STEPS_CONTENT } from "@/lib/constant"
import Image from "next/image"

export default function Steps() {
  const { sectionTitle, steps, stepNote } = STEPS_CONTENT

  const iconBoxClass =
    "flex h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-14 xl:w-14 shrink-0 items-center justify-center rounded-[6px] bg-[#FF7A00] "
  const iconImgClass = "h-5 w-5  object-contain lg:h-6 lg:w-6 xl:h-8 xl:w-8  "
  const titleClass =
    "text-[0.89rem] font-semibold text-[#1C2833] lg:text-[0.93rem] xl:text-xl"
  const descClass =
    "mt-1 xl:mt-3 text-[0.8rem] leading-relaxed text-[#374151] md:max-w-[210px] xl:max-w-[220px] lg:text-[0.85rem]  xl:text-base"

  return (
    <div className="font-inter w-full bg-[#F8FAFC] p-6 md:px-8 md:py-10 lg:py-12 xl:py-15 lg:px-8 xl:px-23">
      <div className="container mx-auto">
        <div className="steps-content flex w-full flex-col items-center justify-center gap-10 md:gap-12 lg:gap-14 xl:gap-20">
          <h2
            className="text-center text-2xl font-bold text-[#111827]  md:text-2xl lg:text-2xl  xl:text-3xl"
            style={{ lineHeight: "1.2" }}
          >
            {sectionTitle}
          </h2>

          {/* Mobile */}
          <div className="mx-auto w-full md:hidden">
            <div className="flex w-full flex-col">
              <div className="flex flex-col">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-stretch gap-8">
                    <div className="flex w-9.5 shrink-0 flex-col items-center self-stretch md:w-[3.25rem] lg:w-[4rem] xl:w-11.5">
                      <div
                        className="relative z-10 flex h-8 w-8 px-5 py-0.5 shrink-0 items-center justify-center rounded-[18px] border border-[#FDB813] bg-white text-sm font-bold tracking-tight text-[#1F3A5F]"
                        aria-hidden
                      >
                        {step.id}
                      </div>
                      {index < steps.length - 1 ? (
                        <div
                          className="min-h-0 w-px flex-1 shrink-0 bg-[#EB8901] lg:min-h-10"
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <div
                      className={`min-w-0 flex-1 pt-0.5 ${index < steps.length - 1 ? "pb-8 md:pb-10 xl:pb-18" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={iconBoxClass}>
                          <Image
                            src={step.icon}
                            alt=""
                            width={40}
                            height={40}
                            className={iconImgClass}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className={titleClass} style={{ lineHeight: 1.4 }}>
                            {step.title}
                          </h3>
                          <p className={descClass}>{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Desktop */}

          <div className="mx-auto hidden w-full max-w-5xl md:block">
            <div className="grid grid-cols-3 gap-6 lg:gap-8 xl:gap-25">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className={iconBoxClass}>
                    <Image
                      src={step.icon}
                      alt=""
                      width={40}
                      height={40}
                      className={iconImgClass}
                    />
                  </div>
                  <h3
                    className={`${titleClass} mt-4 lg:mt-5 xl:mt-6`}
                    style={{ lineHeight: 1.4 }}
                  >
                    {step.title}
                  </h3>
                  <p className={descClass}>{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex w-full max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto items-center justify-center md:mt-10 lg:mt-10 xl:mt-12">
              {steps.map((step, index) => (
                <Fragment key={`strip-${step.id}`}>
                  <div
                    className="relative z-10 flex h-9.5 w-9.5 xl:h-12 xl:w-12 shrink-0 items-center justify-center rounded-[20px] xl:rounded-[25px] px-5.5 py-0.5 xl:px-7.5 xl:py-0.5 border border-[#FDB813] bg-white text-sm lg:text-[0.9rem] xl:text-lg font-bold tracking-tight text-[#1F3A5F] lg:h-10 lg:w-10 xl:text-base"
                    aria-hidden
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 ? (
                    <div
                      className="h-[0.5px] min-w-0 flex-1 self-center bg-[#EB8901]"
                      aria-hidden
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="flex w-full items-start gap-2 md:justify-center md:text-center">
            <Image
              src="/info.svg"
              alt="Info"
              width={12}
              height={12}
              className="h-5.5 w-5.5 object-contain"
            />
            <p className="text-[0.8rem] lg:text-[0.85rem] xl:text-base text-[#4B5563]" style={{ lineHeight: 1.5 }}>
              {stepNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
