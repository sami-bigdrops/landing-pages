import type * as React from "react"

export type FooterType = "long" | "type-1"

export interface FooterLink {
  text: string
  href: string
}

export interface FooterProps
  extends Omit<React.ComponentPropsWithoutRef<"footer">, "children"> {
  type?: FooterType
  linkHeader?: string
  links?: FooterLink[]
  linkRows?: FooterLink[][]
  linksSeparator?: boolean
  logo?: React.ReactNode
  description?: React.ReactNode
  copyrightText?: string
  belowCopyright?: React.ReactNode
  belowCopyrightClassName?: string
  disclaimer?: React.ReactNode
  bgColor?: string
  descriptionClassName?: string
  linksClassName?: string
  linksContainerClassName?: string
  copyrightClassName?: string
  disclaimerClassName?: string
  className?: string
}
