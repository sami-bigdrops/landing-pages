export const DEFAULT_FALLBACK_CITY = "New York"

export const FORM_SAVINGS_AMOUNT = 610

export const FORM_TOTAL_STEPS = 10

export const FORM_YEAR_INITIAL_VISIBLE = 28

export const FORM_PRIMARY_COLOR = "#12266D"

export const FORM_LIGHT_BG = "#F5F5F5"

export const FORM_SELECTED_BORDER = "#205BB9"

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
