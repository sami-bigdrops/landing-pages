"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import { cn } from "@workspace/ui/lib/utils"
import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant"
import { pageSectionInner } from "@/lib/page-layout"

export default function Footer() {
  return (
    <div className="w-full bg-[#0F2440]">
      <FooterUI
        type="long"
        bgColor="transparent"
        className={cn(pageSectionInner, "!px-0 !py-8 md:!py-10 lg:!py-12 xl:!py-14 bg-transparent")}
        logo={<Image src="/assuritii-white.svg" alt="Assuritii" width={120} height={40} className="w-28 h-auto object-contain" />}
        description={FOOTER_CONTENT.description}
        descriptionClassName="max-w-3/4"
        linkHeader={FOOTER_CONTENT.linkHeader}
        links={[...FOOTER_CONTENT.links]}
        copyrightText={FOOTER_CONTENT.copyrightText}
        disclaimer={FOOTER_CONTENT.disclaimer}
        disclaimerClassName="max-w-5xl"
      />
    </div>
  )
}