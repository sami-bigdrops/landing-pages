import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import type { FooterProps } from "../model/types"
import { footerVariants } from "../controller/footer-variants"

function Footer({
  type = "long",
  linkHeader,
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
  const style = bgColor != null ? { backgroundColor: bgColor } : undefined

  return (
    <footer
      role="contentinfo"
      className={cn(footerVariants({ type }), className)}
      style={style}
      {...props}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
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
        </div>
        {linkHeader != null && links.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              {linkHeader}
            </h3>
            <ul className="flex flex-col gap-2">
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
          </div>
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
