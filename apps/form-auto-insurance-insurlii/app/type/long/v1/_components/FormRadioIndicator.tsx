import { formRadioIndicatorClasses } from "@/lib/form-input-styles"

interface FormRadioIndicatorProps {
  isSelected: boolean
  className?: string
}

export function FormRadioIndicator({ isSelected, className }: FormRadioIndicatorProps) {
  return (
    <span className={formRadioIndicatorClasses(isSelected, className)} aria-hidden>
      {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
    </span>
  )
}
