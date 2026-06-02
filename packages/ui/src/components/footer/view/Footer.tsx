import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import type { FooterProps } from "../model/types"
import { footerVariants } from "../controller/footer-variants"

function FooterLinks({
  links,
  linksClassName,
}: {
  links: FooterProps["links"]
  linksClassName?: string
}) {
  if (links == null || links.length === 0) return null

  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className={cn(
              "text-sm text-white/80 hover:text-white transition-colors",
              linksClassName
            )}
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

function FooterCopyrightBlock({
  copyrightText,
  belowCopyright,
  belowCopyrightClassName,
  disclaimer,
  copyrightClassName,
  disclaimerClassName,
}: Pick<
  FooterProps,
  | "copyrightText"
  | "belowCopyright"
  | "belowCopyrightClassName"
  | "disclaimer"
  | "copyrightClassName"
  | "disclaimerClassName"
>) {
  return (
    <>
      {copyrightText != null && (
        <p className={cn("text-xs text-white/80", copyrightClassName)}>
          {copyrightText}
        </p>
      )}
      {belowCopyright != null && (
        <p
          className={cn(
            "text-[10px] leading-snug text-white/65 max-w-3xl mx-auto",
            belowCopyrightClassName
          )}
        >
          {belowCopyright}
        </p>
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
    </>
  )
}

function Footer({
  type = "long",
  linkHeader: _linkHeader,
  links = [],
  logo,
  description,
  copyrightText,
  belowCopyright,
  belowCopyrightClassName,
  disclaimer,
  bgColor,
  descriptionClassName,
  linksClassName,
  copyrightClassName,
  disclaimerClassName,
  className,
  ...props
}: FooterProps) {
  void _linkHeader
  const style = bgColor != null ? { backgroundColor: bgColor } : undefined

  if (type === "type-1") {
    return (
      <footer
        role="contentinfo"
        className={cn(footerVariants({ type }), className)}
        style={style}
        {...props}
      >
        <div className="flex flex-col items-center text-center gap-6 xl:gap-8">
          <div className="flex flex-col items-center text-center gap-5 xl:gap-6">
          {logo != null && <div className="shrink-0">{logo}</div>}
          {description != null && (
            <div
              className={cn(
                "w-full text-sm text-white/90 max-w-md leading-relaxed",
                descriptionClassName
              )}
            >
              {description}
            </div>
          )}
          </div>
          <div className="flex flex-col items-center text-center gap-4 xl:gap-5">
          <FooterLinks links={links} linksClassName={linksClassName} />
          <FooterCopyrightBlock
            copyrightText={copyrightText}
            belowCopyright={belowCopyright}
            belowCopyrightClassName={belowCopyrightClassName}
            disclaimer={disclaimer}
            copyrightClassName={copyrightClassName}
            disclaimerClassName={disclaimerClassName}
          />
          </div>
        </div>
      </footer>
    )
  }

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
          <div
            className={cn(
              "w-full text-sm text-white/90 max-w-md leading-relaxed",
              descriptionClassName
            )}
          >
            {description}
          </div>
        )}
        <FooterLinks links={links} linksClassName={linksClassName} />
      </div>
      <div className="border-t border-white/20 pt-6 md:pt-8 flex flex-col gap-4 text-center">
        <FooterCopyrightBlock
          copyrightText={copyrightText}
          belowCopyright={belowCopyright}
          belowCopyrightClassName={belowCopyrightClassName}
          disclaimer={disclaimer}
          copyrightClassName={copyrightClassName}
          disclaimerClassName={disclaimerClassName}
        />
      </div>
    </footer>
  )
}

export { Footer }
