export const BRAND_NAME = "Insurlii"

export const BRAND_FULL_NAME = "Insurlii Auto Insurance"

export const BRAND_DOMAIN = "Insurlii.com"

export const BRAND_DESCRIPTION =
  "Insurlii helps drivers compare auto insurance quotes from trusted carriers in minutes. Find competitive rates, explore coverage options, and connect with licensed partners across all 50 states."

export const BRAND_METADATA_TITLE = "Insurlii Auto Insurance - Compare Quotes & Save"

export const BRAND_METADATA_TITLE_TEMPLATE = "%s | Insurlii Auto Insurance"

export const BRAND_FORM_PAGE_TITLE = "Get Your Auto Insurance Quote"

export const BRAND_TCPA_DISCLAIMER =
  "By submitting this form, I agree to the Insurlii Terms of Use and Privacy Policy. I authorize Insurlii and its partners to send me marketing text messages or phone calls at the number provided, including those made with an autodialer. Standard message and data rates may apply. Message frequency varies. Opt-out anytime by replying STOP or using the unsubscribe link."

export const BRAND_LEGAL_FOOTER =
  "Insurlii.com is a digital insurance comparison engine, providing real-time rates and insurance services in all 50 states through its relationships with carrier and agency partners."

export const BRAND_PARTNERS_MODAL_TITLE = "Insurlii Insurance Partners"

export const DEFAULT_FALLBACK_CITY = "New York"

export const FORM_SAVINGS_AMOUNT = 610

export const FORM_TOTAL_STEPS = 68

export const FORM_YEAR_INITIAL_VISIBLE = 28

export const FORM_PRIMARY_COLOR = "#12266D"

export const FORM_LIGHT_BG = "#FFFFFF"

export const FORM_SECTION_BG = "#F9F9FB"

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
    { text: "Contact", href: "/contact" },
    { text: "Do Not Sell My Info", href: "/opt-out" },
  ],

  copyrightText: `Copyright © 2026 ${BRAND_NAME}. All Rights Reserved.`,
} as const

export const THANKYOU_PAGE = {
  title: "Thank you!",
  message:
    "We've received your information. A licensed insurance specialist may contact you shortly with quote options tailored to your needs.",
} as const
