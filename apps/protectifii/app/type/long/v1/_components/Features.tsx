import Image from "next/image"
import { FEATURES_CONTENT } from "@/lib/constant"

export default function Features() {
  return (
    <div className="steps bg-white w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-20 xl:py-16">
      <div className="container mx-auto max-w-[1280px]">
        <div className="step-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-14 ">
          <h2
            className="w-full text-2xl md:text-2xl xl:text-3xl   font-extrabold text-[#191443] text-center  font-sans  tracking-normal"
            style={{ lineHeight: 1.3 }}
          >
            {FEATURES_CONTENT.header}
          </h2>

          <div className="grid w-full grid-cols-1 items-stretch gap-8 md:grid-cols-3 md:gap-6 xl:gap-8">
            {FEATURES_CONTENT.steps.map((step) => (
              <div key={step.number} className="flex h-full flex-col items-center">
                <div className="flex h-full w-full flex-col-reverse items-center gap-4.5 rounded-[20px] border border-[#D5D2E5] bg-[#F5F5F8] p-5.5 xl:p-6.6 md:gap-5 lg:gap-5">
                  <div className="flex flex-1 flex-col items-center justify-start gap-1.5 xl:gap-2">
                    <h3 className="text-center font-sans text-base font-bold text-[#191443] md:max-w-[150px] lg:max-w-full  xl:text-[1.2rem]">
                      {step.title}
                    </h3>
                    <p
                      className="mx-auto text-center font-sans text-[0.85rem] text-[#4B4B57] lg:max-w-[300px] xl:max-w-full xl:text-base "
                      style={{ lineHeight: 1.6 }}
                    >
                      {step.description}
                    </p>
                  </div>

                  <div className="flex w-full shrink-0 items-center justify-center">
                    <div className="flex h-13.5 w-13.5 items-center justify-center rounded-full border border-[#FFB300] bg-white p-3 xl:h-15 xl:w-15 xl:p-3.5">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={60}
                        height={60}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
