import type * as React from "react"

export type RadioButtonGroupLayout = "row" | "column"

export type RadioButtonGroupType = "1" | "2" | "3" | "4"

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioButtonGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<"fieldset">,
    "onChange" | "children"
  > {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  type?: RadioButtonGroupType
  layout?: RadioButtonGroupLayout
  label?: string
  error?: string
  hint?: string
  containerClassName?: string
  optionClassName?: string
  optionLabelClassName?: string
  optionDescriptionClassName?: string
  labelClassName?: string
  selectedOptionBackgroundColor?: string
  selectedOptionBackground?: string
  selectedOptionBorderColor?: string
  selectedIndicatorColor?: string
}
