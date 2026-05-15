"use client"

import { Footer as FooterUI } from "@workspace/ui/components/footer"
import Image from "next/image"
import {
  FOOTER_AP_NEWS,
  FOOTER_CONTENT,
  FOOTER_MARKETING_DISCLAIMER,
  SITE_BRAND,
} from "@/lib/constant"

const footerLinkClass =
  "font-semibold underline underline-offset-2 decoration-[#941F32]/50 hover:decoration-[#941F32]"

export default function Footer() {
  return (
    <FooterUI
      type="long"
      bgColor="#F0F6FF"
      className="[&_a]:text-[#941F32] [&_a:hover]:text-[#7F1A2A] [&>div:last-child]:border-[#941F32]/20 [&>div:last-child>p]:text-[#941F32]/90"
      logo={
        <Image
          src="/gov-mortgage-logo.svg"
          alt={SITE_BRAND.name}
          width={120}
          height={40}
          className="w-58 h-auto object-contain"
        />
      }
      description={
        <>
          <span className="mb-3 block">
            *{" "}
            <a
              href={FOOTER_AP_NEWS.href}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              {FOOTER_AP_NEWS.label}
            </a>{" "}
            {FOOTER_AP_NEWS.headline}
          </span>
          {FOOTER_MARKETING_DISCLAIMER}
        </>
      }
      descriptionClassName="max-w-5xl mx-auto text-center text-xs leading-relaxed text-[#941F32]/90 font-inter"
      links={[...FOOTER_CONTENT.links]}
      copyrightText={FOOTER_CONTENT.copyrightText}
    />
  )
}
