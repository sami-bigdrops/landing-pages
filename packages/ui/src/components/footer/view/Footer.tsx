import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import type { FooterProps } from "../model/types"
import { footerVariants } from "../controller/footer-variants"

function Footer({
  type = "long",
  linkHeader: _linkHeader,
  links = [],
  logo,
  description,
  copyrightText,
  disclaimer,
  bgColor,
  descriptionClassName,
  disclaimerClassName,
  className,
  ...props
}: FooterProps) {
  void _linkHeader
  const style = bgColor != null ? { backgroundColor: bgColor } : undefined

  return (
    <footer
      role="contentinfo"
      className={cn(footerVariants({ type }), className)}
      style={style}
      {...props}
    >
      <div className="flex flex-col items-center text-center gap-6">
        {logo != null && <div className="shrink-0">{logo}</div>}
        {description != null && (
          <p
            className={cn(
              "text-sm text-white/90 max-w-md leading-relaxed",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
        {links.length > 0 && (
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-white/20 pt-6 md:pt-8 flex flex-col gap-4 text-center">
        {copyrightText != null && (
          <p className="text-xs text-white/80">{copyrightText}</p>
        )}
        {disclaimer != null && (
          <p
            className={cn(
              "text-xs text-white/70 max-w-3xl mx-auto leading-relaxed",
              disclaimerClassName
            )}
          >
            {disclaimer}
          </p>
        )}
      </div>
    </footer>
  )
}

export { Footer }
