"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import { FOOTER_CONTENT } from "@/lib/constant"
import Image from "next/image"

export default function Footer() {
  return (
    <FooterUI
      type="long"
      bgColor="#215A4A"
      logo={
        <Image
          src="/footer-logo.svg"
          alt="MediSavingz"
          width={267}
          height={42}
          className="h-auto w-[180px] object-contain md:w-[200px] xl:w-[240px]"
        />
      }
      description={FOOTER_CONTENT.description}
      descriptionClassName="max-w-[420px] whitespace-pre-line text-center text-[0.85rem] font-normal leading-relaxed text-white xl:max-w-[480px] xl:text-base"
      className="relative z-10 mt-auto px-6 py-10 md:px-8 md:py-12 lg:px-14 lg:py-14 xl:px-23 xl:py-16"
      linkRows={FOOTER_CONTENT.linkRows.map((row) => [...row])}
      linksSeparator
      linksClassName="text-white hover:text-white font-normal text-[0.85rem] xl:text-base leading-none"
      linksContainerClassName="text-white"
      copyrightText={FOOTER_CONTENT.copyrightText}
      copyrightClassName="text-white/90 mt-0 text-center font-normal text-[0.75rem] xl:text-[0.9rem] leading-relaxed whitespace-pre-line max-w-[720px] xl:max-w-[860px] mx-auto"
    />
  )
}
