"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="type-1"
      bgColor="#191443"
      className="relative z-10 py-8 px-6 md:px-8 md:py-10 lg:px-10 lg:py-10 xl:px-28 xl:py-12"
      logo={<Image src="/footer.svg" alt="Protectifii" width={120} height={40} className="w-40 xl:w-50 h-auto object-contain" />}
      links={[...FOOTER_CONTENT.links]}
      linksClassName="text-white mt-1 underline hover:text-white font-normal text-[0.78rem] xl:text-[0.95rem] leading-none"
      linksContainerClassName="text-white"
      copyrightText={FOOTER_CONTENT.copyrightText}
      copyrightClassName="text-white mt-4 text-center font-normal text-xs xl:text-sm leading-relaxed whitespace-pre-line"
      disclaimer={FOOTER_CONTENT.disclaimerText}
      disclaimerClassName="text-white/90 text-center font-normal text-xs xl:text-sm leading-relaxed whitespace-pre-line xl:max-w-5xl"
    />
  )
}