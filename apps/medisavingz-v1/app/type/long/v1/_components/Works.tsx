"use client"

import Image from "next/image"
import { WORKS_CONTENT } from "@/lib/constant"

export default function Works() {
  return (
    <section className="w-full overflow-hidden bg-[#F5FBF7] px-6 py-12 md:px-8 md:py-14 lg:px-14 lg:pb-0 lg:pt-16 xl:px-23 xl:pt-[72px]">
      <div className="container mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:grid-rows-[auto_auto] lg:items-stretch lg:gap-x-14 lg:gap-y-12 xl:gap-x-[72px] xl:gap-y-14">
          <h2
            className="max-w-[280px] justify-self-center text-center font-sans text-[1.45rem] font-bold text-[#17212B] lg:max-w-[360px] lg:justify-self-start lg:text-left lg:text-[2rem] xl:max-w-[420px] xl:text-[2.5rem]"
            style={{ lineHeight: "1.22" }}
          >
            <span className="lg:hidden">{WORKS_CONTENT.headline}</span>
            <span className="hidden lg:inline">
              Guidance Designed
              <br />
              Around Your
              <br />
              Healthcare Needs
            </span>
          </h2>

          <div className="flex flex-col gap-4 lg:pt-1 xl:gap-[18px]">
            {WORKS_CONTENT.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-center font-sans text-[0.9rem] font-normal text-[#525F66] lg:text-left lg:text-[0.95rem] xl:text-[1.05rem]"
                style={{ lineHeight: "1.65" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="hidden items-end self-end lg:flex lg:pr-3 xl:pr-4">
            <Image
              src={WORKS_CONTENT.image.src}
              alt={WORKS_CONTENT.image.alt}
              width={1124}
              height={800}
              className="block h-auto w-full object-contain object-left-bottom"
              priority
            />
          </div>

          <div className="w-full self-start">
            <div className="grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2 lg:gap-4 xl:gap-[18px]">
              {WORKS_CONTENT.cards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col gap-1.5 rounded-[12px] border border-[#E5E7EB] bg-white px-5 py-5 xl:gap-2 xl:px-6 xl:py-5"
                >
                  <h3 className="font-sans text-[1.35rem] font-bold leading-none text-[#0B5C3A] xl:text-[1.55rem]">
                    {card.title}
                  </h3>
                  <p
                    className="font-sans text-[0.82rem] font-normal text-[#5B6570] xl:text-[0.9rem]"
                    style={{ lineHeight: "1.5" }}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
