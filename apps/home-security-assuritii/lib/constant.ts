export const COLORS_CONSTANTS = {
  white: "#FFFFFF",
  heading: "#111827",
  description: "#374151",
} as const

export const FONT = {
  inter: "Inter",
  interVariable: "--font-sans",
} as const

export const COLORS = {
  textWhite: "text-white",
  textHeading: "text-[#111827]",
  textDescription: "text-[#374151]",
  fontInter: "font-sans",
} as const



//  sections constants


export const HERO_CONTENT = {
  headline: "Your Home Isn’t As Safe As You Think",
  description:
    "Check what home security options are available in your area and get matched with trusted providers.",
  badges: [
    {
      icon: "/coin.svg",
      label: "Free",
    },
    {
      icon: "/shield.svg",
      label: "No obligation",
    },
    {
      icon: "/flash.svg",
      label: "Takes under 2 minutes",
    },
  ],
  image: {
    alt: "A hooded figure in the shadows representing home security concern",
    src: "/hero-bg.webp",
  },
} as const


export const PARTNERS_CONTENT = {
  title: "We Partner With Top Providers",
  partners: [
    {
      name: "ADT",
      logo: "/partner-1.svg",
      alt: "ADT Logo",
    },
    {
      name: "vivint.",
      logo: "/partner-2.svg",
      alt: "Vivint Logo",
    },
    {
      name: "BRINKS HOME",
      logo: "/partner-3.svg",
      alt: "Brinks Home Logo",
    },
  ],
} as const


export const ABOUT_CONTENT = {
  header: "Break-ins happen when you least expect them.",
  description:
    "When you’re at work.\nOn vacation.\nOr asleep inside your own home.\n\nWithout a security system,\nyou wouldn’t even know until it’s too\nlate.",

  aboutImage: {
    src: "/about.webp",
    alt: "About Image",
  },
} as const


export const FEATURES_CONTENT = {
  header: "How Modern Home Security Protects You",
  features: [
    {
      icon: "/feature-1.svg",
      text: "Alerts when doors or\nwindows are opened",
    },
    {
      icon: "/feature-2.svg",
      text: "Cameras that show live\nactivity",
    },
    {
      icon: "/feature-3.svg",
      text: "Motion detection inside\nyour home",
    },
    {
      icon: "/feature-4.svg",
      text: "24/7 monitoring ready to\nrespond instantly",
    },
  ],
  image: {
    src: "/feature-img.webp",
    alt: "A person using a smartphone to monitor a smart home security system",
  },
} as const


export const WORKS_CONTENT = {
  header: "How It Works",
  steps: [
    {
      id: 1,
      number: "01",
      title: "Enter your ZIP Code",
      description: "Check available providers in your area",
      image: {
        src: "/sp-1.svg",
        alt: "Enter your ZIP Code"
      },
    },
    {
      id: 2,
      number: "02",
      title: "Answer a few quick questions",
      description: "Tell us about your home and needs",
      image: {
        src: "/sp-3.svg" ,
        alt: "Answer a few quick questions"
      },
    },
    {
      id: 3,
      number: "03",
      title: "Get matched instantly",
      description: "Compare offers from trusted brands",
      image: {
        src: "/sp-2.svg",
        alt: "New roof installation with workers"
      },
    },
  ],
  callToAction: {
    buttonText: "Get Started",
    contactText: "Or give us a call",
    phoneNumber: "(1800) 123 - 4567",
    phoneHref: "tel:+18001234567",
  },
}

export const TRUST_CONTENT = {
  headline: "Get Matched with Trusted Home Security Providers",
   
  providers: [
    {
      name: "ADT",
      logo: {
        src: "/trust-1.svg",
        alt: "ADT logo",
      },
    },
    {
      name: "Vivint",
      logo: {
        src: "/trust-2.svg",
        alt: "Vivint logo",
      },
    },
    {
      name: "Brinks Home",
      logo: {
        src: "/trust-3.svg",
        alt: "Brinks Home logo",
      },
    },
  ],
  description:
    "Trusted systems with professional installation, smart monitoring, and real-time alerts.",
} as const


export const CHOOSE_CONTENT = {
  header: "Feel Safe, No Matter Where You Are",
  items: [
    {
      icon: {
        src: "/protect-1.svg",
        alt: "Eye icon",
      },
      title: "Know what’s happening at your home – even when you’re not there",
    },
    {
      icon: {
        src: "/protect-2.svg",
        alt: "Alert icon",
      },
      title: "Get alerts the moment something feels off",
    },
    {
      icon: {
        src: "/protect-3.svg",
        alt: "Shield icon",
      },
      title: "Feel safer when you’re home alone",
    },
    {
      icon: {
        src: "/protect-4.svg",
        alt: "Home icon",
      },
      title: "Protect what matters most",
    }
  ],
} as const

export const INFO_CONTENT = {
  headline: "See If Your Home Qualifies For Security Options Near You",
  subtext: "Takes less than 2 minutes. No obligation.",
  button: {
    text: "Get Your FREE Quote"
  },
  image: {
    src: "/info-img.webp", // Update with actual image asset path if different
    alt: "Family sitting on couch looking at tablet together"
  }
} as const




export const FOOTER_CONTENT = {
  description: "Affordable home security solutions to help protect what matters most.",
  linkHeader: "Company",
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © 2026 Assuritii. All Rights Reserved.",
  disclaimer:
    'Assuritii helps connect you with trusted home security providers in your area. We do not directly provide installation or monitoring services. By submitting your details, you agree to be contacted by our partners via phone, text, or email. Offers and availability may vary. Consent is not required to purchase.',
} as const


export const THANKYOU_CONTENT = {
  title: "Thank you!",
  subtitle:
    "Thank you for requesting information from Assuritii. A Customer Specialist will contact you shortly.",
  confirmationTitle:
    "A confirmation message has been sent to your email address.",
  confirmationDescription:
    "The message contains next steps and how to get your quote. Please check your spam folder if you don't see it in your inbox.",
  contactTitle: "Need help now?",
  contactPhoneLabel: "1-855-916-3700",
  contactPhoneHref: "tel:+18559163700",
} as const

export const COVER_CONTENT = {
  callToAction: {
    contactText: THANKYOU_CONTENT.contactTitle,
    phoneNumber: THANKYOU_CONTENT.contactPhoneLabel,
    phoneHref: THANKYOU_CONTENT.contactPhoneHref,
  },
} as const

export interface ThankYouType2FeatureCard {
  title: string
  bulletPoints: string[]
  icon: "shield" | "building" | "check"
}

export interface ThankYouType2Content {
  title: string
  partnerName: string
  partnerLogo: { src: string; alt: string }
  confirmationMessage: string
  /** Shown in a green notice below the main confirmation copy */
  emailConfirmationNotice?: string
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
}

export const THANKYOU_PARTNER_SLUGS = ["adt", "vivint", "brinkshome"] as const
export type ThankYouPartnerSlug = (typeof THANKYOU_PARTNER_SLUGS)[number]

export const THANKYOU_CONTENT_BY_PARTNER: Record<ThankYouPartnerSlug, ThankYouType2Content> = {
  adt: {
    title: "Thank you!",
    partnerName: "ADT",
    partnerLogo: { src: "/partner-1.svg", alt: "ADT" },
    confirmationMessage:
      "Congratulations! You have been matched with ADT. A security specialist will contact you soon with next steps for your home.",
    emailConfirmationNotice:
      "We've sent a confirmation email to your inbox. If you don't see it within a few minutes, check your spam or junk folder.",
    aboutSectionTitle: "Why homeowners choose ADT",
    featureCards: [
      {
        title: "Professional monitoring",
        icon: "shield",
        bulletPoints: [
          "24/7 monitoring centers ready to dispatch help when alarms go off",
          "Trained professionals watch over your home around the clock",
          "Fast response when seconds matter",
        ],
      },
      {
        title: "Smart home security",
        icon: "building",
        bulletPoints: [
          "Integrate cameras, sensors, and smart locks in one ecosystem",
          "Control and get alerts from your phone, wherever you are",
          "Options for professional installation and ongoing support",
        ],
      },
      {
        title: "Trusted nationwide",
        icon: "check",
        bulletPoints: [
          "A recognized name in home security with broad U.S. coverage",
          "Flexible packages to fit different homes and budgets",
          "Help choosing the right equipment for doors, windows, and interior spaces",
        ],
      },
    ],
  },
  vivint: {
    title: "Thank you!",
    partnerName: "Vivint",
    partnerLogo: { src: "/partner-2.svg", alt: "Vivint" },
    confirmationMessage:
      "Congratulations! You have been matched with Vivint. A specialist will reach out shortly to discuss smart security options for your home.",
    emailConfirmationNotice:
      "We've sent a confirmation email to your inbox. If you don't see it within a few minutes, check your spam or junk folder.",
    aboutSectionTitle: "Why homeowners choose Vivint",
    featureCards: [
      {
        title: "All-in-one smart security",
        icon: "shield",
        bulletPoints: [
          "Connected devices that work together from a single app",
          "Professional monitoring available for added peace of mind",
          "Designed for modern smart homes",
        ],
      },
      {
        title: "Pro installation and support",
        icon: "building",
        bulletPoints: [
          "Expert setup so sensors, panels, and cameras are placed correctly",
          "Support when you need to adjust settings or add devices",
          "Clear guidance on how to use your system day to day",
        ],
      },
      {
        title: "Control from anywhere",
        icon: "check",
        bulletPoints: [
          "Arm, disarm, and view activity from your phone",
          "Notifications when something needs your attention",
          "Flexible plans so you can scale protection over time",
        ],
      },
    ],
  },
  brinkshome: {
    title: "Thank you!",
    partnerName: "Brinks Home",
    partnerLogo: { src: "/partner-3.svg", alt: "Brinks Home" },
    confirmationMessage:
      "Congratulations! You have been matched with Brinks Home. A representative will contact you soon about protecting your home.",
    emailConfirmationNotice:
      "We've sent a confirmation email to your inbox. If you don't see it within a few minutes, check your spam or junk folder.",
    aboutSectionTitle: "Why homeowners choose Brinks Home",
    featureCards: [
      {
        title: "Flexible protection",
        icon: "shield",
        bulletPoints: [
          "Options for intrusion, environmental, and life-safety monitoring",
          "Choose features that match how you live",
          "Support finding the right mix of equipment and service",
        ],
      },
      {
        title: "Experienced monitoring",
        icon: "building",
        bulletPoints: [
          "Monitoring designed to help when alarms trigger",
          "Clear escalation so you know what to expect",
          "Nationwide presence trusted by many households",
        ],
      },
      {
        title: "Simple next steps",
        icon: "check",
        bulletPoints: [
          "A specialist walks you through quote and install options",
          "Straightforward answers about contracts and equipment",
          "Focus on getting your home protected without guesswork",
        ],
      },
    ],
  },
}

export function getThankYouContentForPartner(
  slug: string | null | undefined
): ThankYouType2Content | null {
  if (!slug) return null
  if (slug in THANKYOU_CONTENT_BY_PARTNER) {
    return THANKYOU_CONTENT_BY_PARTNER[slug as ThankYouPartnerSlug]
  }
  return null
}

export function isThankYouPartnerSlug(s: string): s is ThankYouPartnerSlug {
  return THANKYOU_PARTNER_SLUGS.includes(s as ThankYouPartnerSlug)
}

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = THANKYOU_CONTENT_BY_PARTNER.adt

export const REJECTED_PAGE_CONTENT = {
  title: "We couldn’t complete your submission",
  leadMessage:
    "Our verification partner wasn’t able to accept this submission. This can happen when information doesn’t pass their checks.",
  defaultDetail:
    "Please confirm your address and contact details are accurate, then try again. If you continue to see this message, try again later or use a different phone number.",
  codeMessages: {
    1013:
      "The lead was rejected by our partner. You may have submitted recently, or your details could not be verified. Please review your information and try again.",
  } as Record<number, string>,
  partnerLogo: { src: "/first-premier.png", alt: "First Premier Home Warranty" },
}
