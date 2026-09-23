"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import { FOOTER_CONTENT } from "@/lib/constant"
import Image from "next/image"

export default function Footer() {
  return (
    <FooterUI
      type="type-1"
      bgColor="#F4F8FF"
      logo={<Image src="/logo.svg" alt="Cheap Auto Insurance Options" width={120} height={40} className="w-40 h-auto object-contain" />}
      className="relative z-10 py-6 px-6 md:px-8 md:py-8 lg:px-10 lg:py-8 xl:px-28 xl:py-10 "
      linkRows={FOOTER_CONTENT.linkRows.map((row) => [...row])}
      linksSeparator
      linksClassName="text-[#336AC7] mt-1 underline hover:text-[#336AC7] font-medium text-[0.8rem] xl:text-base leading-none"
      linksContainerClassName="text-[#336AC7]"
      copyrightText={FOOTER_CONTENT.copyrightText}
      copyrightClassName="text-[#0E2651] mt-2 text-center font-medium text-[0.8rem] xl:text-base leading-relaxed whitespace-pre-line"
    />
  )
}
