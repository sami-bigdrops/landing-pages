import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@workspace/ui/lib/utils"
import type { ButtonProps } from "../model/types"
import { buttonVariants } from "../controller/button-variants"

function Button({
  type: buttonType = "1",
  variant = "default",
  size = "default",
  htmlType = "button",
  backgroundColor,
  foregroundColor,
  asChild = false,
  className,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const mergedStyle = React.useMemo(
    () => ({
      ...style,
      ...(backgroundColor != null && { backgroundColor }),
      ...(foregroundColor != null && { color: foregroundColor }),
    }),
    [style, backgroundColor, foregroundColor]
  )

  return (
    <Comp
      type={asChild ? undefined : htmlType}
      data-slot="button"
      data-type={buttonType}
      data-btn-type={buttonType === "2" ? "icon" : undefined}
      className={cn(
        buttonVariants({ variant, type: buttonType, size }),
        className
      )}
      style={mergedStyle}
      {...props}
    />
  )
}

export { Button, buttonVariants }
