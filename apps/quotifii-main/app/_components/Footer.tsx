"use client"

import Image from "next/image"
import { FOOTER_CONTENT } from "@/lib/constant"
import { buildProductRedirectUrl } from "@/lib/build-product-redirect-url"
import { AROHAA_SERVICES, trackServiceClick } from "@/lib/arohaa"

const ANALYTICS_FLUSH_DELAY_MS = 300

function getServiceKey(href: string) {
  if (href.includes("homequotes") || href.includes("home")) return "home" as const
  return "auto" as const
}

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative z-10 w-full flex flex-col items-center text-center gap-4 xl:gap-7 px-4 py-8 md:px-6 lg:px-14  xl:px-20 "
      style={{ backgroundColor: "#003599" }}
    >
      <Image
        src="/quotifii-logo.svg"
        alt="Quotifii"
        width={120}
        height={40}
        className="w-40 h-auto object-contain"
      />

      <nav
        className="flex items-center justify-center  mb-4 gap-6 xl:gap-8"
        aria-label="Insurance types"
      >
        {FOOTER_CONTENT.typelinks.map((link) => {
          const serviceKey = getServiceKey(link.href)
          const service = AROHAA_SERVICES[serviceKey]

          return (
            <a
              key={link.href}
              href={service.href}
              data-arohaa-service={service.id}
              data-arohaa-service-label={service.label}
              onClick={(e) => {
                e.preventDefault()
                const redirectUrl = buildProductRedirectUrl(service.href)
                trackServiceClick({
                  serviceKey,
                  href: redirectUrl,
                })
                window.setTimeout(() => {
                  window.location.href = redirectUrl
                }, ANALYTICS_FLUSH_DELAY_MS)
              }}
              className="text-xs xl:text-base text-white font-normal underline underline-offset-4 hover:text-white/90 transition-colors"
            >
              {link.text}
            </a>
          )
        })}
      </nav>

      <p className="text-xs xl:text-base text-white">
        {FOOTER_CONTENT.copyrightText}
      </p>

      <nav
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
        aria-label="Legal"
      >
        {FOOTER_CONTENT.links.flatMap((link, index) => {
          const items = [
            <a
              key={link.href}
              href={link.href}
              className="text-xs xl:text-base text-white/90 hover:text-white transition-colors whitespace-nowrap"
            >
              {link.text.trim()}
            </a>,
          ]
          if (index < FOOTER_CONTENT.links.length - 1) {
            items.push(
              <span
                key={`${link.href}-sep`}
                className="text-[0.65rem] xl:text-base text-white/80 select-none"
                aria-hidden
              >
                |
              </span>
            )
          }
          return items
        })}
      </nav>
    </footer>
  )
}
