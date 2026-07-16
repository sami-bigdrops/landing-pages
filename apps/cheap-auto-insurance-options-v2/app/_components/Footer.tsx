"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import { FOOTER_CONTENT } from "@/lib/constant"
import Image from "next/image"

export default function Footer() {
  return (
    <FooterUI
      type="type-1"
      bgColor="#F7F9FC"
      logo={<Image src="/logo.svg" alt="Cheap Auto Insurance Options" width={120} height={40} className="w-40 h-auto object-contain" />}
      className="relative z-10 py-4 px-6 md:px-8 md:py-6 lg:px-10 lg:py-6 xl:px-28 xl:py-8 "
      linkRows={FOOTER_CONTENT.linkRows.map((row) => [...row])}
      linksSeparator
      linksClassName="text-[#212A31] hover:text-[#212A31] font-medium text-[0.8rem] xl:text-base leading-[1.7]"
       copyrightText={FOOTER_CONTENT.copyrightText}
      copyrightClassName="text-[#102A43] text-center text-xs xl:text-base   leading-relaxed whitespace-pre-line"
    />
  )
}
