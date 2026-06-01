"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import { BRAND_NAME, FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <div className="w-full bg-[#051850]">
      <div className="mx-auto w-full max-w-[1280px]">
        <FooterUI
          type="long"
          className="relative z-10 bg-transparent"
          logo={<Image src="/footer-logo.svg" alt={BRAND_NAME} width={120} height={40} className="w-40 h-auto object-contain" />}
          links={[...FOOTER_CONTENT.links]}
          copyrightText={FOOTER_CONTENT.copyrightText}
        />
      </div>
    </div>
  )
}
