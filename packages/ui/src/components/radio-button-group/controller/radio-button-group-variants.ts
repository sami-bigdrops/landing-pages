import { cva, type VariantProps } from "class-variance-authority"

const optionBase =
  "cursor-pointer transition-colors has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background"

export const radioGroupVariants = cva("flex gap-4", {
  variants: {
    type: {
      "1": "",
      "2": "",
      "3": "",
      "4": "gap-0 rounded-lg border border-input bg-muted/30 overflow-hidden",
    },
  },
  defaultVariants: {
    type: "1",
  },
})

export const radioOptionVariants = cva(optionBase, {
  variants: {
    type: {
      "1":
        "inline-flex items-center gap-2.5 rounded-md py-1.5 text-foreground hover:bg-muted/50",
      "2":
        "rounded-full border-2 border-input bg-background px-4 py-2 text-sm text-foreground hover:border-primary/50 hover:bg-muted/50",
      "3":
        "rounded-lg border-2 border-input bg-background px-4 py-2.5 text-sm text-foreground hover:border-primary/50 hover:bg-muted/50",
      "4":
        "flex-1 rounded-none border border-input border-r-0 last:border-r bg-background px-3 py-2 text-center text-sm text-foreground first:rounded-l-md last:rounded-r-md hover:bg-muted/50",
    },
  },
  defaultVariants: {
    type: "1",
  },
})

export const radioOptionCheckedVariants: Record<
  "1" | "2" | "3" | "4",
  string
> = {
  "1": "",
  "2": "border-primary bg-primary text-primary-foreground",
  "3": "border-primary bg-accent text-accent-foreground",
  "4": "border-primary bg-primary text-primary-foreground border-r border-r-primary",
}

export const radioIndicatorVariants = cva("", {
  variants: {
    type: {
      "1": "flex size-4 shrink-0 items-center justify-center",
      "2": "hidden",
      "3": "hidden",
      "4": "hidden",
    },
  },
  defaultVariants: {
    type: "1",
  },
})

export const radioIndicatorDotVariants = cva("", {
  variants: {
    type: {
      "1": "flex size-4 rounded-full border-2 border-input bg-background transition-colors",
      "2": "hidden",
      "3": "hidden",
      "4": "hidden",
    },
  },
  defaultVariants: {
    type: "1",
  },
})

export type RadioGroupVariantsProps = VariantProps<typeof radioGroupVariants>
export type RadioOptionVariantsProps = VariantProps<typeof radioOptionVariants>
