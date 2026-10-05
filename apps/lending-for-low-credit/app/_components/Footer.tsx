"use client"

import Image from "next/image"
import { Footer as FooterUI } from "@workspace/ui/components/footer"
import { FOOTER_CONTENT, SITE_BRAND } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="type-1"
      className="mt-auto shrink-0"
      bgColor="#F1F3F5"
      logo={
        <Image
          src="/logo.svg"
          alt={SITE_BRAND.name}
          width={180}
          height={56}
          className="mx-auto h-auto w-[140px] object-contain xl:w-[180px]"
        />
      }
      links={[...FOOTER_CONTENT.links]}
      linksSeparator
      linksClassName="text-[#213266] text-xs font-medium xl:text-sm"
      linksContainerClassName="text-[#213266] text-xs font-normal xl:text-sm"
      belowCopyright={FOOTER_CONTENT.copyrightText}
      belowCopyrightClassName="mx-auto text-center text-xs font-medium text-[#111827] xl:text-sm"
    />
  )
}
