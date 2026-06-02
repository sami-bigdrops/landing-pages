"use client"

import { FOOTER_CONTENT } from "@/lib/constant_v2"

export default function Footer() {
  return (
    <footer className="mt-auto w-full shrink-0 bg-[#F5F5F5] p-6 md:px-8 lg:px-14 xl:px-24 xl:py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center text-center gap-5">
          <div>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {FOOTER_CONTENT.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs xl:text-sm font-medium text-[#374151] underline underline-offset-2  transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs xl:text-sm text-[#374151]">
            {FOOTER_CONTENT.copyrightText}
          </p>
        </div>
      </div>
      
    </footer>
  )
}