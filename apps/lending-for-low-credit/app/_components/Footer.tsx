"use client"

import Image from "next/image"
import { Footer as FooterUI } from "@workspace/ui/components/footer"
import { FOOTER_CONTENT, SITE_BRAND } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterUI
      type="long"
      bgColor="#0F2D52"
      logo={
        <Image
          src="/footer.svg"
          alt={SITE_BRAND.name}
          width={180}
          height={56}
          className="mx-auto h-auto w-[140px] object-contain xl:w-[180px]"
        />
      }
      links={[...FOOTER_CONTENT.links]}
      linksSeparator
      linksClassName="text-white hover:text-white"
      linksContainerClassName="text-white"
      copyrightText={FOOTER_CONTENT.disclaimer}
      copyrightClassName="mx-auto max-w-7xl text-center text-xs leading-relaxed font-normal text-white xl:text-sm"
      belowCopyright={FOOTER_CONTENT.copyrightText}
      belowCopyrightClassName="mx-auto text-center text-xs font-normal text-white xl:text-sm"
    />
  )
}
