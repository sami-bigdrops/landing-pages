//  sections constants



export const NAVBAR_CONTENT = {
  contactPhoneLabel: "855-581-3316",
  contactPhoneHref: "tel:+18555813316",
} as const

export const HERO_CONTENT = {
  headline: "Upgrade Your Windows. Upgrade Your Comfort.",
  description:
    "Your entire purchase 20% off¹ | Minimum purchase of 4",

  disclaimer: "*Valid in select areas. Minimum purchase may apply. Financing may be available and may vary; on approved credit; third-party lenders. Add'l charges may apply. 1-day install on select projects. Pricing subject to inspection. New purchases only; limit 1; not combinable. See Terms for full details.",
  Badges: [
    {
      icon: "/tick-mark.svg",
      text: "No pressure consultation",
    },
    {
      icon: "/tick-mark.svg",
      text: "Clear Quote Options",
    },
    {
      icon: "/tick-mark.svg",
      text: "Professional Installation",
    },
  ],
  image: {
    alt: "American home with modern replacement windows and updated exterior",
    src: "/hero-bg.webp",
  },

 
} as const






export const FOOTER_CONTENT = {
  linkRows: [
    [
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms of Use", href: "/terms-of-use" },
    ],
  ],

  copyrightText: "© 2026 windowfii.com, all rights reserved",
} as const

 

export const THANKYOU_CONTENT = {
  title: "Thank you!",
  subtitle:
    "Your request has been received. A vehicle protection specialist will contact you shortly with your quote.",
  confirmationTitle:
    "A confirmation message has been sent to your email address.",
  confirmationDescription:
    "The message contains next steps and how to get your quote. Please check your spam folder if you don't see it in your inbox.",
  contactTitle: "For immediate assistance",
  contactPhoneLabel: "(1800) 123 - 4567",
  contactPhoneHref: "tel:+18001234567",
} as const

export const THANKYOU_PAGE = {
  title: "Thank you!",
  message:
    "We've received your information. We will contact you soon.",
} as const

