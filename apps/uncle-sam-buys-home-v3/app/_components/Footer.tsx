"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="type-1"
      className="mt-auto"
      bgColor="#F8F9FB"
     
      linkHeader={FOOTER_CONTENT.linkHeader}
      links={[...FOOTER_CONTENT.links]}
      linksClassName="text-black hover:text-black"
      copyrightText={FOOTER_CONTENT.copyrightText}
      copyrightClassName="text-black text-left md:text-center leading-relaxed"
      disclaimer={FOOTER_CONTENT.disclaimer}
      disclaimerClassName="max-w-5xl text-left text-black"
    />
  )
}