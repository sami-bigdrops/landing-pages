import Image from "next/image"

import { PARTNERS_CONTENT } from "@/lib/constant"

type PartnerName = (typeof PARTNERS_CONTENT.partners)[number]["name"]

const PARTNER_LOGO_FRAME: Record<PartnerName, string> = {
  "ADT":
    "flex h-9 w-auto md:h-20 md:w-20 shrink-0 items-center justify-center ",
  "vivint.":
    "flex h-4 w-auto md:h-20 md:w-20 shrink-0 items-center justify-center ",
  "BRINKS HOME":
    "flex h-3 w-auto md:h-20 md:w-20 shrink-0 items-center justify-center ",
}

export default function Partners() {
  return (
    <section className="w-full bg-[#F3F4F6] px-4 py-8 sm:px-6 md:px-8 md:py-10 lg:px-12 lg:py-12 xl:px-20 xl:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-14 xl:gap-20 ">
        <h2 className="w-full text-center font-sans text-base font-semibold leading-snug tracking-tight text-[#1F2937] md:w-auto md:max-w-[min(100%,17rem)] md:shrink-0 md:text-left lg:text-lg xl:text-xl">
          {PARTNERS_CONTENT.title}
        </h2>

        <div
          className="flex w-full max-w-md flex-row flex-nowrap items-center justify-center md gap-5 sm:gap-6 md:w-auto md:max-w-none md:gap-6 lg:gap-8 xl:gap-10"
          aria-label="Partner logos"
          role="list"
        >
          {PARTNERS_CONTENT.partners.map((partner) => (
            <div key={partner.name} className={PARTNER_LOGO_FRAME[partner.name]} role="listitem">
              <Image
                src={partner.logo}
                alt={partner.alt}
                width={220}
                height={88}
                unoptimized
                className="h-full w-auto max-h-full max-w-full object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
