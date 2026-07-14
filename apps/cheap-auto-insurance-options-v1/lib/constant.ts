//  sections constants

export const TOP_NAV_CONTENT = {
  headline: "Fast Insurance Quotes From the Nation’s Best Companies",
} as const

export const NAVBAR_CONTENT = {
  contactPhoneLabel: "855-581-3316",
  contactPhoneHref: "tel:+18555813316",
} as const

export const HERO_CONTENT = {
  headline: "Save up to 50% on Your Car Insurance.",
  description: "Compare Auto Insurance Quotes Instantly.",



} as const

export const PARTNERS_CONTENT = {
  header: "Fast Insurance Quotes From the Nation’s Best Companies",

  partners: [
    { alt: "Partner 1", src: "/partner-1.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 2", src: "/partner-2.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 3", src: "/partner-3.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 4", src: "/partner-4.svg", className: "w-16 md:w-15 lg:w-14 xl:w-19 overflow-hidden object-contain" },
    { alt: "Partner 5", src: "/partner-5.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 6", src: "/partner-6.svg", className: "w-28 md:w-28 lg:w-25 xl:w-30 overflow-hidden object-contain" },
  ],
} as const

export const HELP_CONTENT = {
  header: "We’ve Helped Over 4 Million People Save Money on Their Insurance Since 2004",
  features: [
    {
      title: "Compare Rates from #1 Top Rated Brands",

      icon: "/tick.svg",
    },
    {
      title: "100% Safe & Secure",

      icon: "/tick.svg",
    },
    {
      title: "Get Multiple Quotes for Free in Less than 3 minutes",

      icon: "/tick.svg",
    },
    {
      title: "Save up to 50% by comparing offers",

      icon: "/tick.svg",
    },
  ],

  phonePrompt: "Rather Get a Quote by Phone? Talk to an Agent",
  phone: {
    label: "855-581-3316",
    href: "tel:+18555813316",
    icon: "/help-call.svg",

  },

} as const






export const FOOTER_CONTENT = {

  linkRows: [
    [
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms of Use", href: "/terms-of-use" },
    ],
  ],

  disclaimer: [
    "Cheap Auto Insurance Options is a digital insurance comparison platform that helps consumers compare auto insurance options through its network of insurance carriers, agencies, and licensed partners across the United States. We may receive compensation from our partner providers when you are connected with their products or services. Cheap Auto Insurance Options is not affiliated with any federal, state, or government agency.",
    "The lowest advertised rates may not be available from all insurance providers or in all locations. Rates and coverage options are based on the information you provide and may vary depending on factors such as your location, driving history, age, vehicle type, coverage selections, deductibles, discounts, and other underwriting criteria. Quotes displayed or advertised are for illustrative purposes only and do not guarantee availability or eligibility.",
    "As part of our commitment to providing a quality user experience, Cheap Auto Insurance Options and its service providers may monitor, record, and retain activity on this website and its associated links for quality assurance, security, training, analytics, and service improvement purposes.",
  ],
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
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
}

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = {
  title: "Thank you!",
  partnerName: "Renewal By Andersen",
  partnerLogo: { src: "/rba.avif", alt: "RENEWAL by ANDERSEN" },
  confirmationMessage:
    "Congratulations! You have been matched with one of our partners, Renewal By Andersen. The Customer Specialist will be contacting you soon!",
  aboutSectionTitle: "About Renewal by Andersen",
  featureCards: [
    {
      title: "Trusted Excellence",
      icon: "shield",
      bulletPoints: [
        "Division of Andersen Corporation",
        "Decades of craftsmanship",
        "Nationwide reliability",
      ],
    },
    {
      title: "Custom Solutions",
      icon: "building",
      bulletPoints: [
        "Custom-made windows & doors",
        "Energy efficient design",
        "Enhanced curb appeal",
      ],
    },
    {
      title: "Premium Service",
      icon: "check",
      bulletPoints: [
        "Full-service approach",
        "Premium materials",
        "Industry-leading warranties",
      ],
    },
  ],
}
