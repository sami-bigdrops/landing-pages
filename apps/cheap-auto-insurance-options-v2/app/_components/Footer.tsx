"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="type-1"
      bgColor="#F7F9FC"
      className="relative z-10 py-4 px-6 md:px-8 md:py-6 lg:px-10 lg:py-6 xl:px-28 xl:py-8 "
      linkRows={FOOTER_CONTENT.linkRows.map((row) => [...row])}
      linksSeparator
      linksClassName="text-[#212A31] hover:text-[#212A31] font-medium text-[0.8rem] xl:text-base leading-[1.7]"
      disclaimer={FOOTER_CONTENT.disclaimer.join("\n\n")}
      disclaimerClassName="mt-3 xl:mt-4 w-full max-w-full text-left md:text-center text-[#6E6E6E] text-xs xl:text-[0.9rem] 2xl:max-w-[1300px] leading-relaxed whitespace-pre-line"
    />
  )
}
