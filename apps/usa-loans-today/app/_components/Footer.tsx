import Image from "next/image"
import { Footer as FooterComponent } from "@workspace/ui/components/footer"
import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  return (
    <FooterComponent
      type="type-1"
      bgColor="#0F2D52"
      logo={
        <Image
          src={FOOTER_CONTENT.logo}
          alt="USA Loans Today"
          width={132}
          height={60}
          className="h-auto w-[110px] xl:w-[132px]"
        />
      }
      links={[...FOOTER_CONTENT.links]}
      linksSeparator
      copyrightText={FOOTER_CONTENT.disclaimer}
      belowCopyright={FOOTER_CONTENT.copyrightText}
      className="px-4 py-8 text-center text-white lg:px-8 lg:py-9"
      linksClassName="justify-center text-sm text-white/90 hover:text-white xl:text-base"
      copyrightClassName="mx-auto max-w-4xl text-center text-xs leading-relaxed text-white/80 xl:text-sm"
      belowCopyrightClassName="mx-auto max-w-5xl text-center text-xs leading-relaxed text-white/80 xl:text-sm"
    />
  )
}
