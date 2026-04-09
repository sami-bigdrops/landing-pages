import Image from "next/image"
import { TRUST_CONTENT } from "@/lib/constant"

export default function Trust() {
  const [adt, vivint, brinks] = TRUST_CONTENT.providers

  return (
    <section className="w-full bg-[#1F3A5F] p-6 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24  xl:py-14">
      <div className="container mx-auto ">
        <div className="works-content w-full flex flex-col items-center justify-center gap-10 md:gap-10 lg:gap-12 xl:gap-14">
          <h2 className="text-xl text-center text-white md:text-2xl xl:text-3xl font-bold text-center font-sans">
            
          {TRUST_CONTENT.headline}
          </h2>

          <div className="flex w-full flex-col md:flex-row md:items-center md:justify-center gap-8 md:gap-12 xl:gap-16 xl:mt-3">
            <div className="flex  items-center justify-center gap-x-10 gap-y-6 md:gap-x-13 xl:gap-x-16">
              <Image
                src={adt.logo.src}
                alt={adt.logo.alt}
                width={140}
                height={56}
                className="h-11 w-auto max-w-[9rem] object-contain md:max-w-[10rem] md:h-12 lg:max-w-[11rem] lg:h-13 xl:max-w-[13rem] xl:h-15  "
              />
              <Image
                src={vivint.logo.src}
                alt={vivint.logo.alt}
                width={160}
                height={56}
                className="h-9 w-auto max-w-[10rem] object-contain md:max-w-[11rem] md:h-10 lg:max-w-[12rem] lg:h-11 xl:max-w-[15rem] xl:h-12  "
              />
            </div>
            <div className="flex justify-center">
              <Image
                src={brinks.logo.src}
                alt={brinks.logo.alt}
                width={200}
                height={56}
                className="h-9 w-auto max-w-[11rem] object-contain md:max-w-[12rem] md:h-10 lg:max-w-[13rem] lg:h-11 xl:max-w-[16rem] xl:h-12  "
              />
            </div>
          </div>

          <p className="text-white text-center text-sm font-normal xl:text-lg">
            {TRUST_CONTENT.description}
          </p>
        </div>
      </div>
    </section>
  )
}
