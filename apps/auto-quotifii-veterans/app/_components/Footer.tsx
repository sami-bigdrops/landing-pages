"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="long"
      bgColor="#1F3A5F"
      logo={<Image src="/quotifii-logo.svg" alt="Auto Quotifii Veterans" width={120} height={40} className="w-40 h-auto object-contain" />}
      description={FOOTER_CONTENT.description}
      descriptionClassName="max-w-full font-inter"
      links={[...FOOTER_CONTENT.links]}
      disclaimer={FOOTER_CONTENT.disclaimer}
      disclaimerClassName="max-w-4xl font-inter"
      copyrightText={FOOTER_CONTENT.copyrightText}
    />
  )
}