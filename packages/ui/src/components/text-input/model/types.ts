import type * as React from "react"

export interface TextInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
  label?: string
  error?: string
  hint?: string
  containerClassName?: string
  inputClassName?: string
  labelClassName?: string
  size?: "default" | "sm" | "lg"
}
