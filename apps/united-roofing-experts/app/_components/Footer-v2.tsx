"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant_v2"

export default function Footer() {
  return (
    <FooterUI
      type="long"
      bgColor="#F5F5F5"
      logo={<Image src="V2/ure-logo.svg" alt="United Roofing Experts" width={120} height={40} className="w-40 h-auto object-contain" />}
      description={FOOTER_CONTENT.description}
      descriptionClassName="max-w-full font-sans text-[#111827] font-medium"
      links={[...FOOTER_CONTENT.links]}
      copyrightText={FOOTER_CONTENT.copyrightText}
    />
  )
}