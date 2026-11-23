"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import {
  FOOTER_CONTENT,
  FOOTER_MARKETING_DISCLAIMER,
  FOOTER_NEWS,
} from "@/lib/constant"

const footerLinkClass =
  "font-semibold text-[#1e3a5f] underline underline-offset-2 decoration-[#1e3a5f]/40 hover:text-[#152C4B] hover:decoration-[#152C4B]"

type FooterProps = {
  showMarketingDisclaimer?: boolean
}

export default function Footer({ showMarketingDisclaimer = true }: FooterProps) {
  return (
    <FooterUI
      type="long"
      bgColor="#FFFFFF"
      className="border-t border-[#E5E7EB] [&_a]:text-[#1e3a5f] [&_a:hover]:text-[#152C4B] [&>div:last-child]:border-t-0 [&>div:last-child>p]:text-[#6B7280]"
      description={
        showMarketingDisclaimer ? (
          <>
            <span className="mb-3 block">
              *{" "}
              <a
                href={FOOTER_NEWS.href}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClass}
              >
                {FOOTER_NEWS.label}
              </a>{" "}
              {FOOTER_NEWS.headline}
            </span>
            {FOOTER_MARKETING_DISCLAIMER}
          </>
        ) : undefined
      }
      descriptionClassName="max-w-5xl mx-auto text-center text-xs leading-relaxed text-[#6B7280] font-inter"
      links={[...FOOTER_CONTENT.links]}
      linksClassName="text-[#1e3a5f] hover:text-[#152C4B] font-medium text-sm"
      copyrightText={FOOTER_CONTENT.copyrightText}
      copyrightClassName="text-[#6B7280]"
    />
  )
}
