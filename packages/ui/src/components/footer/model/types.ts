import type * as React from "react"

export type FooterType = "long"

export interface FooterLink {
  text: string
  href: string
}

export interface FooterProps
  extends Omit<React.ComponentPropsWithoutRef<"footer">, "children"> {
  type?: FooterType
  linkHeader?: string
  links?: FooterLink[]
  logo?: React.ReactNode
  description?: React.ReactNode
  copyrightText?: string
  disclaimer?: React.ReactNode
  bgColor?: string
  descriptionClassName?: string
  disclaimerClassName?: string
  className?: string
}
