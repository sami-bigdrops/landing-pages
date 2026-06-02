"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant_v2"

export default function Footer() {
  return (
    <FooterUI
      type="type-1"
      bgColor="#F5F5F5"
      logo={<Image src="V2/ure-logo.svg" alt="United Roofing Experts" width={120} height={40} className="w-40 xl:w-48 h-auto object-contain" />}
      description={FOOTER_CONTENT.description}
      descriptionClassName="max-w-full text-center text-sm xl:text-base font-sans text-[#111827] font-medium"
      links={[...FOOTER_CONTENT.links]}
      linksClassName="text-[#374151] text-xs xl:text-sm font-medium underline underline-offset-2 hover:text-[#374151]"
      copyrightText={FOOTER_CONTENT.copyrightText}
      copyrightClassName="text-[#374151] text-xs xl:text-sm text-center"
    />
  )
}