"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <div className="w-full bg-[#003599]">
      <div className="mx-auto w-full max-w-[1280px]">
        <FooterUI
          type="long"
          className="relative z-10 bg-transparent"
          logo={<Image src="/quotifii-logo.svg" alt="Quotifii" width={120} height={40} className="w-40 h-auto object-contain" />}
          description={FOOTER_CONTENT.savingsDisclaimer}
          descriptionClassName="text-xs text-white/70 max-w-3xl leading-relaxed"
          links={[...FOOTER_CONTENT.links]}
          copyrightText={FOOTER_CONTENT.copyrightText}
        />
      </div>
    </div>
  )
}