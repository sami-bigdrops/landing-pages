"use client"

import { FOOTER_CONTENT } from "@/lib/constant"

export default function Footer() {
  const links = FOOTER_CONTENT.linkRows[0] ?? []

  return (
    <footer
      role="contentinfo"
      className="relative z-10 w-full bg-[#F4F8FF] px-4 py-3 md:px-6 md:py-3.5 lg:px-8 border-none"
    >
      <div className="flex w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs xl:text-sm leading-relaxed text-white ">
        <span className="text-[#0E2651] font-medium">{FOOTER_CONTENT.copyrightText}</span>
        {links.map((link) => (
          <span key={link.href} className="inline-flex items-center gap-x-1.5">
            <span aria-hidden className="text-[#0E2651] font-medium">|</span>
            <a
              href={link.href}
              className="whitespace-nowrap text-[#0E2651] transition-colors font-medium"
            >
              {link.text}
            </a>
          </span>
        ))}
      </div>
    </footer>
  )
}
