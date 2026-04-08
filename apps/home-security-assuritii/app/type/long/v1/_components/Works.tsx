import Image from "next/image"
import { WORKS_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

export default function Works({ onGetQuoteClick }: { onGetQuoteClick: () => void }) {
  return (
    <div className="works w-full bg-white  p-6 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24 2xl:px-64 xl:py-14">
      <div className="container mx-auto ">
        <div className="works-content w-full flex flex-col items-center justify-center gap-6 md:gap-10 lg:gap-12 xl:gap-14">
          <h2 className="text-xl text-center md:text-2xl xl:text-3xl font-bold text-[#111827] text-center font-sans ">
            {WORKS_CONTENT.header}
          </h2>

          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-8 lg:gap-10 xl:gap-14">
            {WORKS_CONTENT.steps.map((step) => (
              <div
                key={step.id}
                className="w-full flex flex-col items-center md:items-start text-center gap-4.5 md:gap-5 xl:gap-6"
              >
                <div className="relative w-full rounded-[10px] overflow-hidden xl:max-w-[400px] xl:h-[260px]">
                  <div
                    className="absolute top-3 left-3 md:top-2.5 md:left-2.5 xl:top-3 xl:left-3 z-10 w-9 h-9 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10.5 xl:h-10.5 rounded-[80px] bg-[#1F3A5F]  flex items-center justify-center "
                    aria-hidden
                  >
                    <span className="text-white font-medium text-[0.9rem] md:text-xs lg:text-base xl:text-lg ">
                      {step.number}
                    </span>
                  </div>
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    width={800}
                    height={500}
                    className="w-full h-auto md:h-[190px] lg:h-[190px] xl:h-[250px] rounded-[10px] object-cover"
                  />
                </div>
                <div className="flex flex-col items-center justify-center md:items-start gap-2">
                  <h3 className="text-base md:text-left md:text-sm lg:text-base xl:text-lg  font-semibold text-[#111827] font-sans leading-tight ">
                    {step.title}
                  </h3>
                  <p className="text-[#374151] text-[0.8rem] md:text-left xl:text-[0.95rem] xl:max-w-[350px]  leading-relaxed ">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bottom flex flex-col items-center justify-center gap-5 xl:gap-6">
            <div className="w-full ">
              <ButtonUI
                type="1"
                variant="default"
                htmlType="button"
                onClick={onGetQuoteClick}
                className="w-full bg-[#3498DB] text-white font-medium py-6 xl:py-7.5 rounded-[10px] text-sm xl:text-lg "
              >
                Get Your FREE Quote
              </ButtonUI>
            </div>
            <div className="w-full flex items-center justify-center text-center text-[#1F3A5F] text-sm  xl:text-lg gap-1.5">
              <p className="font-medium">{WORKS_CONTENT.callToAction.contactText}</p>
              <a href={WORKS_CONTENT.callToAction.phoneHref} className="font-bold">{WORKS_CONTENT.callToAction.phoneNumber}</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
