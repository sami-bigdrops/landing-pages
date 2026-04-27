"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="long"
      bgColor="#F8F9FB"
      className="[&_a]:text-gray-700 [&_a:hover]:text-gray-700 [&>div:last-child]:border-gray-700/40 [&>div:last-child>p:first-child]:text-gray-700"
      logo={<Image src="/awa-logo.svg" alt="Affordable Windows of America" width={120} height={40} className="w-40 h-auto object-contain" />}
      description={FOOTER_CONTENT.description}
      descriptionClassName="max-w-full font-inter text-gray-700"
      links={[...FOOTER_CONTENT.links]}
      copyrightText={FOOTER_CONTENT.copyrightText}
    />
  )
}