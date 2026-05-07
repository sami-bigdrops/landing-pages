"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="long"
      bgColor="#F0F6FF"
      className="[&_a]:text-[#941F32] [&_a:hover]:text-[#7F1A2A] [&>div:last-child]:border-[#941F32]/20 [&>div:last-child>p]:text-[#941F32]"
      logo={<Image src="/gov-mortgage-logo.svg" alt="Govt Mortgage Options" width={120} height={40} className="w-58 h-auto object-contain" />}
      links={[...FOOTER_CONTENT.links]}
      disclaimer={FOOTER_CONTENT.disclaimer}
      disclaimerClassName="max-w-4xl font-inter"
      copyrightText={FOOTER_CONTENT.copyrightText}
    />
  )
}