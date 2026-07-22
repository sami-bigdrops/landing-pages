import { cva, type VariantProps } from "class-variance-authority"

export const progressBarVariants = cva(
  "mb-8 md:mb-12 w-full min-w-0 flex flex-col",
  {
    variants: {
      type: {
        "1": "gap-0",
        "2": "gap-0",
        "3": "gap-0",
        "4": "gap-0",
        "5": "gap-0",
        "6": "gap-0 items-center justify-between",
        "7": "gap-0 !mb-0 md:!mb-0",
        "8": "gap-0",
        "9": "gap-0 !mb-0 md:!mb-0 items-center",
      },
    },
    defaultVariants: {
      type: "1",
    },
  }
)

export type ProgressBarVariantsProps = VariantProps<typeof progressBarVariants>
