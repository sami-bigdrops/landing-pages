//  sections constants

export const HERO_CONTENT = {
  headline: "SWITCH & SAVE ON AUTO",
  subheadline: "$443 average savings could be yours.",
  subheadlineFootnote: "*",
  image: {
    src: "/hero.webp",
    alt: "Quotifii"
  },

  badge: {
    text: "Summer Savings",
    image: {
      src: "/Sun.svg",
      alt: "Summer Savings",
    },
  },
 
  
} as const

export const PARTNERS_CONTENT = {
  header: "We Partner With Top Providers",

  partners: [
    { alt: "Partner 1", src: "/partner-1.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 2", src: "/partner-2.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 3", src: "/partner-3.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 4", src: "/partner-4.svg", className: "w-16 md:w-14 lg:w-14 xl:w-19 overflow-hidden object-contain" },
    { alt: "Partner 5", src: "/partner-5.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 6", src: "/partner-6.svg", className: "w-27 md:w-28 lg:w-25 xl:w-30 overflow-hidden object-contain" },
  ],
} as const

export const OPTIONS_CONTENT = {
  header: "A Better Rate Could Be Waiting In Your ZIP",
  description: "Tell us the basics and we’ll line up options worth a look.",

  badge: {
    text: "Summer Rates Available",
    image: {
      src: "/Dollar.svg",
      alt: "Summer Rates Available",
    },
  },

  image: {
    src: "/quokka.svg",
    alt: "Quokka Image",
  },
  
} as const



export const FEATURES_CONTENT = {
  header: "A Smarter Way To Shop For Cover",

  badge: {
    text: "Summer-Ready Coverage",
    image: {
      src: "/Sun.svg",
      alt: "Summer-Ready Coverage",
    },
  },
 
  steps: [
    {
      number: 1,
      title: "Multi-Vehicle Savings",
      description: "One household, more than one car? Bundle options in seconds and see what changes.",
      image: {
        src: "/feature-1.svg",
        alt: "Multi-Vehicle Savings",
      },
    },
    {
      number: 2,
      title: "Safe Driver Discounts",
      description: "If you drive sensibly, your rate should notice. We help you spot discounts you may qualify for.",
      image: {
        src: "/feature-2.svg",
        alt: "Safe Driver Discounts",
      },
    },
    {
      number: 3,
      title: "24/7 Roadside Assistance",
      description: "Flat tire, dead battery, surprise breakdown. Check plans that keep help a call away, day or night.",
      image: {
        src: "/feature-3.svg",
        alt: "24/7 Roadside Assistance",
      },
    },
  ],
} as const



export const FOOTER_CONTENT = {
  savingsDisclaimer:
    "*Potential savings vary by customer and may vary by state and product.",

  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Contact ", href: "/contact" },
  ],

  copyrightText: "Copyright © 2026 Quotifii. All Rights Reserved.",
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
