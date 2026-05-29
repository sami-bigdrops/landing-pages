import { cn } from "@workspace/ui/lib/utils"

export const FORM_TEXT_INPUT_CLASSNAME =
  "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-colors duration-200 hover:border-[#7FB2F0] hover:bg-[#EBF5FF] focus:border-[#7FB2F0] focus:bg-[#EBF5FF] focus:ring-2 focus:ring-[#EBF5FF]"

export const FORM_TEXT_INPUT_ERROR_CLASSNAME =
  "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-colors duration-200 hover:border-[#7FB2F0] hover:bg-[#EBF5FF] focus:border-[#7FB2F0] focus:bg-[#EBF5FF] focus:ring-2 focus:ring-[#EBF5FF] border-red-500 focus:border-red-500 focus:ring-red-100"

export const FORM_DOB_TEXT_INPUT_CLASSNAME =
  "w-full rounded-lg border border-[#E5E7EB] bg-white px-5 py-4.5 text-sm lg:text-base xl:text-lg font-medium outline-none transition-[border-color,box-shadow] duration-200 hover:border-[#7FB2F0] focus:border-[#7FB2F0] focus:ring-2 focus:ring-[#EBF5FF]"

export const FORM_SELECT_INPUT_CLASSNAME =
  "rounded-lg border border-[#E5E7EB] bg-white px-3 py-3 xl:px-6 xl:py-4 h-12 xl:h-16 text-sm lg:text-base xl:text-lg shadow-none transition-colors duration-200 hover:border-[#7FB2F0] hover:bg-[#EBF5FF] focus-within:border-[#7FB2F0] focus-within:bg-[#EBF5FF]"

export const FORM_FIELD_TEXT_INPUT_CLASSNAME =
  "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-[border-color,box-shadow] duration-200 hover:border-[#7FB2F0] focus:border-[#7FB2F0] focus:ring-2 focus:ring-[#EBF5FF]"

export const FORM_FIELD_SELECT_INPUT_CLASSNAME =
  "rounded-lg border border-[#E5E7EB] bg-white px-3 py-3 xl:px-6 xl:py-4 h-12 xl:h-16 text-sm lg:text-base xl:text-lg shadow-none transition-[border-color,box-shadow] duration-200 hover:border-[#7FB2F0] focus-within:border-[#7FB2F0] focus-within:ring-2 focus-within:ring-[#EBF5FF]"

export function formOptionButtonClasses(isSelected: boolean, className?: string) {
  return cn(
    "rounded-lg border transition-colors duration-200",
    isSelected
      ? "border-[#205BB9] bg-[#C8DEFF]"
      : "border-[#E5E7EB] bg-white hover:border-[#7FB2F0] hover:bg-[#EBF5FF]",
    className
  )
}

export function formRadioIndicatorClasses(isSelected: boolean, className?: string) {
  return cn(
    "flex shrink-0 items-center justify-center rounded-full border-2 transition-colors",
    isSelected ? "border-[#003366] bg-[#003366]" : "border-[#D1D5DB] bg-white",
    className
  )
}
