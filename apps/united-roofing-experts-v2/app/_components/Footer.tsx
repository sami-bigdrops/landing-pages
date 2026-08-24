"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="type-1"
      bgColor="#FFFFFF"
      logo={<Image src="/ure-logo.svg" alt="United Roofing Experts" width={120} height={40} className="w-40 xl:w-48 h-auto object-contain" />}
      copyrightText={FOOTER_CONTENT.copyrightText}
      copyrightClassName="text-[#000000] text-xs xl:text-sm text-center md:max-w-[400px] lg:max-w-[600px] xl:max-w-[700px] leading-relaxed"
      links={[...FOOTER_CONTENT.links]}
      linksClassName="text-[#2942FF] text-xs xl:text-sm text-center hover:text-[#2942FF]"
     
    />
  )
}