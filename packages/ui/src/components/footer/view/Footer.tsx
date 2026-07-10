import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import type { FooterLink, FooterProps } from "../model/types"
import { footerVariants } from "../controller/footer-variants"

function FooterLinks({
  links,
  linkRows,
  linksClassName,
  linksSeparator,
  linksContainerClassName,
}: {
  links: FooterProps["links"]
  linkRows?: FooterProps["linkRows"]
  linksClassName?: string
  linksSeparator?: boolean
  linksContainerClassName?: string
}) {
  const rows =
    linkRows ?? (links != null && links.length > 0 ? [links] : null)

  if (rows == null || rows.length === 0) return null

  const renderLinkItems = (rowLinks: FooterLink[]) =>
    rowLinks.map((link, index) => (
      <li key={link.href} className="flex items-center">
        <a
          href={link.href}
          className={cn(
            "text-sm text-white/80 hover:text-white transition-colors",
            linksClassName
          )}
        >
          {link.text}
        </a>
        {linksSeparator === true && index < rowLinks.length - 1 && (
          <span
            className={cn(
              "mx-3 text-sm text-white/80 select-none",
              linksClassName
            )}
            aria-hidden
          >
            |
          </span>
        )}
      </li>
    ))

  const hasMultipleRows = rows.length > 1
  const flatLinks = rows.flat()

  return (
    <div className={cn("w-full", linksContainerClassName)}>
      {hasMultipleRows ? (
        <>
          <ul className="flex flex-wrap items-center justify-start gap-y-1 md:hidden">
            {renderLinkItems(flatLinks)}
          </ul>
          <div className="hidden w-full flex-col items-center gap-2 md:flex">
            {rows.map((row, rowIndex) => (
              <ul
                key={rowIndex}
                className="flex flex-wrap items-center justify-center gap-y-1"
              >
                {renderLinkItems(row)}
              </ul>
            ))}
          </div>
        </>
      ) : (
        <ul className="flex flex-wrap items-center justify-start gap-y-1 md:justify-center">
          {renderLinkItems(rows[0] ?? [])}
        </ul>
      )}
    </div>
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
  linkRows,
  linksSeparator,
  logo,
  description,
  copyrightText,
  belowCopyright,
  belowCopyrightClassName,
  disclaimer,
  bgColor,
  descriptionClassName,
  linksClassName,
  linksContainerClassName,
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
          <div className="flex w-full flex-col items-start gap-4 text-left md:items-center md:text-center xl:gap-5">
          <FooterLinks
            links={links}
            linkRows={linkRows}
            linksClassName={linksClassName}
            linksSeparator={linksSeparator}
            linksContainerClassName={linksContainerClassName}
          />
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
        <FooterLinks
          links={links}
          linkRows={linkRows}
          linksClassName={linksClassName}
          linksSeparator={linksSeparator}
          linksContainerClassName={linksContainerClassName}
        />
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
