import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-md",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 rounded-md",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground rounded-md border-input",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 rounded-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
      },
      type: {
        "1": "h-9 px-4 py-2 has-[>svg]:px-3",
        "2": "size-9 p-0 [&>svg]:size-4 rounded-md",
        "3": "h-9 px-4 py-2 has-[>svg]:px-3 rounded-full",
        "4": "h-9 w-9 p-0 [&>svg]:size-4 rounded-none",
        "5": "h-auto px-0 py-0 min-h-0 underline-offset-4 hover:underline rounded-none",
        "6": "min-h-9 px-0 py-0",
      },
      size: {
        default: "",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 text-xs [&.size-9]:size-8 [&[data-btn-type=icon]]:size-8",
        lg: "h-10 px-6 has-[>svg]:px-4 text-base [&.size-9]:size-10 [&[data-btn-type=icon]]:size-10",
        icon: "size-9 p-0 [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      type: "1",
      size: "default",
    },
  }
)

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>
