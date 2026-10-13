export const SITE_BRAND = {
  name: "Lending For Low Credit",
  description:
    "Lending For Low Credit helps individuals with low credit scores find practical lending and debt relief solutions tailored to their financial needs.",
} as const




//  sections constants




export const FOOTER_CONTENT = {
  description: SITE_BRAND.description,
  linkHeader: "Company",
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © 2026 Lending for low credit. All Rights Reserved.",
  
} as const


export const THANKYOU_CONTENT = {
  title: "Expect our call soon!",
  titleFallback: "Expect our call soon!",
  subtitle:
    "A JG Wentworth representative will be contacting you shortly by phone or email to go over solutions that fit your specific need.",
  contactTitle: "Call or text us",
  contactPhoneLabel: "1-888-467-6508",
  contactPhoneHref: "tel:+18884676508",
  confirmationTitle: "Expect our call soon!",
  confirmationDescription:
    "A JG Wentworth representative will be contacting you shortly by phone or email to go over solutions that fit your specific need.",
} as const

export interface ThankYouType2FeatureCard {
  title: string
  iconSrc: string
  description?: string
  bulletPoints?: string[]
}

export interface ThankYouType2Content {
  title: string
  partnerName: string
  partnerLogo: { src: string; alt: string }
  confirmationMessage: string
  confirmationEmailSentNote?: string
  contactPhoneLabel?: string
  contactPhoneHref?: string
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
}

export const THANKYOU_REQUIRE_EMAIL_IN_PARAMS = true

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = {
  title: "Expect our call soon!",
  partnerName: "JG Wentworth",
  partnerLogo: {
    src: "/JG-Wentworth-logo.svg",
    alt: "JG Wentworth logo",
  },
  confirmationMessage:
    "A JG Wentworth representative will be contacting you shortly by phone or email to go over solutions that fit your specific need.",
  contactPhoneLabel: "1-888-467-6508",
  contactPhoneHref: "tel:+18884676508",
  aboutSectionTitle: "Why JG Wentworth",
  featureCards: [
    {
      title: "Free consultation",
      iconSrc: "/thankyou-icon-1.svg",
      description: "Talk with a specialist at no cost about your options.",
    },
    {
      title: "Personalized options",
      iconSrc: "/thankyou-icon-2.svg",
      description: "Get plans tailored to your debt and budget.",
    },
  ],
}

export const TCPA_PARTNER_NAMES = [
  "National Debt Relief",
  "JG Wentworth",
] as const

export const REJECTED_PAGE_CONTENT = {
  title: "We can't make an offer right now",
  leadMessage:
    "We weren't able to match your property with a buyer at this time.",
  defaultDetail:
    "Please double-check your details and try again later.",
  codeMessages: {
    1013:
      "This request couldn't be verified. Please review your details and try again.",
    1025:
      "No buyer was available for this property right now. Please try again later.",
  } as Record<number, string>,
  partnerLogo: { src: "/logo.svg", alt: `${SITE_BRAND.name} logo` },
}
