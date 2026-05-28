export const DEFAULT_FALLBACK_CITY = "New York"

export const FORM_SAVINGS_AMOUNT = 610

export const FORM_TOTAL_STEPS = 68

export const FORM_YEAR_INITIAL_VISIBLE = 28

export const FORM_PRIMARY_COLOR = "#12266D"

export const FORM_LIGHT_BG = "#F5F5F5"

export const FORM_INPUT_DEFAULT_BORDER = "#E5E7EB"

export const FORM_INPUT_DEFAULT_BG = "#FFFFFF"

export const FORM_INPUT_HOVER_BORDER = "#7FB2F0"

export const FORM_INPUT_HOVER_BG = "#EBF5FF"

export const FORM_INPUT_SELECTED_BORDER = "#7FB2F0"

export const FORM_INPUT_SELECTED_BG = "#EBF5FF"

export const FORM_INPUT_RADIO_UNSELECTED_BORDER = "#D1D5DB"

export const FORM_INPUT_RADIO_SELECTED_BORDER = "#003366"

export const FORM_INPUT_RADIO_SELECTED_BG = "#003366"

export const FORM_SELECTED_BORDER = FORM_INPUT_SELECTED_BORDER

export const FORM_SELECTED_BG = "#E2F1FD"

export const FORM_POPULAR_CAR_MAKES = [
  "Buick",
  "Chevrolet",
  "Chrysler",
  "Ford",
  "GMC",
  "Honda",
  "Kia",
  "Toyota",
] as const

export const FORM_POPULAR_MOTORCYCLE_MAKES = [
  "Harley-Davidson",
  "Honda",
  "Indian",
  "Kawasaki",
  "Suzuki",
  "Triumph",
  "Yamaha",
  "BMW",
] as const

export type FormVehicleType = "car" | "motorcycle"

export const FOOTER_CONTENT = {
  
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Contact ", href: "/contact" },
  ],

  copyrightText: "Copyright © 2026 Insurlii. All Rights Reserved.",
} as const
