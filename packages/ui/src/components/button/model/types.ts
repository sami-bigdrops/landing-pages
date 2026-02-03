import type * as React from "react"

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

export type ButtonType = "1" | "2" | "3" | "4" | "5" | "6"
export type ButtonSize = "default" | "sm" | "lg" | "icon"

export type ButtonHtmlType = "button" | "submit" | "reset"

export interface ButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<"button">,
    "children" | "type"
  > {
  variant?: ButtonVariant
  type?: ButtonType
  htmlType?: ButtonHtmlType
  size?: ButtonSize
  backgroundColor?: string
  foregroundColor?: string
  asChild?: boolean
  children?: React.ReactNode
  className?: string
}
