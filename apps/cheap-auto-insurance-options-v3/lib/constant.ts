//  sections constants

export const HERO_CONTENT = {
  headline: "Let's drop your rate in {city_name} today!",
  image: {
    src: "/hero.webp",
    alt: "Cheap Auto Insurance Options"
  },
 
  
} as const

export const PARTNERS_CONTENT = {
  header: "Get quotes and offers from popular insurance companies",

  partners: [
    { alt: "Partner 1", src: "/partner-1.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 2", src: "/partner-2.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 3", src: "/partner-3.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 4", src: "/partner-4.svg", className: "w-16 md:w-15 lg:w-14 xl:w-19 overflow-hidden object-contain" },
    { alt: "Partner 5", src: "/partner-5.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 6", src: "/partner-6.svg", className: "w-28 md:w-28 lg:w-25 xl:w-30 overflow-hidden object-contain" },
  ],
} as const



export const REVIEW_CONTENT = {
  header: "Helping Drivers Find Better Rates Every Day",

  badge: [
    {
      text: "Verified",
      icon: "/badge.svg",
    },
  ],

  reviews: [
    {
      id: 1,
      quote:
        "Comparing quotes was much easier than calling different insurance companies one by one. I found a plan that fit my monthly budget in just a few minutes.",
      customer: {
        name: "Sarah M.",
        location: "Phoenix, AZ",
        image: {
          src: "/profile-1.svg",
          alt: "Sarah M.",
        },
      },
    },
    {
      id: 2,
      quote:
        "The process was quick and simple. I could review different cover options in one place and choose the one that worked best for my family.",
      customer: {
        name: "Michael R.",
        location: "Dallas, TX",
        image: {
          src: "/profile-2.svg",
          alt: "Michael R.",
        },
      },
    },
    {
      id: 3,
      quote:
        "I liked being able to compare auto insurance quotes without feeling pressured. It saved me time and helped me find a better rate.",
      customer: {
        name: "Jessica L.",
        location: "Orlando, FL",
        image: {
          src: "/profile-3.svg",
          alt: "Jessica L.",
        },
      },
    },
  ],
} as const





export const FOOTER_CONTENT = {
  linkRows: [
    [
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms of Use", href: "/terms-of-use" },
      { text: "Contact ", href: "/contact" },
    ],
  ],

  copyrightText: "Copyright © 2026 Cheap Auto Insurance Options. All Rights Reserved.",
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
