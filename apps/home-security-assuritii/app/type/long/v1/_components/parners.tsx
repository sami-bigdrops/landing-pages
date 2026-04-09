import Image from "next/image"

import { PARTNERS_CONTENT } from "@/lib/constant"

type PartnerName = (typeof PARTNERS_CONTENT.partners)[number]["name"]

const PARTNER_LOGO_FRAME: Record<PartnerName, string> = {
  "ADT":
    "flex h-8 md:h-11 xl:h-13 w-auto  md:w-auto shrink-0 items-center justify-center",
  "vivint.":
    "flex h-5 md:h-6 xl:h-9 w-auto  md:w-auto shrink-0 items-center justify-center",
  "BRINKS HOME":
    "flex h-3.5 md:h-4 xl:h-6 w-auto  md:w-auto shrink-0 items-center justify-center",
}

export default function Partners() {
  return (
    <section className="w-full bg-[#F3F4F6] p-6 md:px-8  lg:px-12  xl:px-20 xl:py-8 lg:px-16  xl:px-24">
      <div className="mx-auto flex w-full xl:max-w-5xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-14 xl:gap-55 ">
        <h2 className="w-full text-center font-sans text-sm xl:text-lg font-semibold  text-[#1F2937] md:w-auto md:max-w-[min(100%,17rem)] md:shrink-0 md:text-left ">
          {PARTNERS_CONTENT.title}
        </h2>

        <div
          className="flex w-full max-w-md flex-row flex-nowrap items-center justify-center gap-5 sm:gap-6 md:w-auto md:max-w-none md:gap-10 lg:gap-14 xl:gap-16"
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
