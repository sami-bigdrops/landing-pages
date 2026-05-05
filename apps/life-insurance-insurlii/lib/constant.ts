//  sections constants

export const HERO_CONTENT = {
  headline: "Life Insurance Designed Around Your Legacy",
  description: "Explore coverage shaped around estate planning, wealth transfer, and long-term family protection.",
  

  image: {
    src: "/hero.webp",
    alt: "Insurlii Life Insurance"
  },
 
  
  
} as const

export const BADGE_CONTENT = {
 
  badges: [
    {
      number: 1,
      title: "Estate-aware planning",
      image: {
        src: "/badge-1.svg",
        alt: "Estate-aware planning Icon"
      }
    },
    {
      number: 2,
      title: "Tailored Coverage",
      image: {
        src: "/badge-2.svg",
        alt: "Tailored Coverage Icon"
      }
    },
    {
      number: 3,
      title: "Private Guidance",
      image: {
        src: "/badge-3.svg",
        alt: "Prompt Guidance Icon"
      }
    },
  ]
} as const





export const OPTIONS_CONTENT = {
  header: "Explore Life Insurance Built Around Your Needs",
  
  image: {
    src: "/option.webp",
    alt: "Option Image"
  },

 badge : {
  label: "Tailored options. Clear next steps.",
  src: "/shield.svg",
  alt: "Badge",
 },
  
} as const



export const WORKS_CONTENT = {
  header: "How It Works",
  steps: [
    {
      number: 1,
      title: "Share a Few Details",
      description: "Tell us about your situation and what you’d like to plan for.",
      image: {
        src: "/works-1.svg",
        alt: "Share a Few Details",
      },
    },
    {
      number: 2,
      title: "Review Tailored Options",
      description: "Explore coverage structured around your needs and long-term goals.",
      image: {
        src: "/works-2.svg",
        alt: "Review Tailored Options",
      },
    },
    {
      number: 3,
      title: "Speak With a Specialist",
      description: "Get guidance if needed - no pressure, just clarity.",
      image: {
        src: "/works-3.svg",
        alt: "Speak With a Specialist",
      },
    },
  ],
} as const

export const FEATURES_CONTENT = {
  header: "Why Life Insurance Matters Beyond Income Protection",
  steps: [
    {
      number: 1,
      title: "Estate Liquidity",
      description: "Provides liquidity to cover estate obligations without disrupting long-term assets.",
      image: {
        src: "/feature-1.svg",
        alt: "Share a Few Details",
      },
    },
    {
      number: 2,
      title: "Wealth Transfer",
      description: "Helps transfer wealth efficiently while maintaining control and structure.",
      image: {
        src: "/feature-2.svg",
        alt: "Review Tailored Options",
      },
    },
    {
      number: 3,
      title: "Family Continuity",
      description: "Supports long-term financial stability for future generations.",
      image: {
        src: "/feature-3.svg",
        alt: "Speak With a Specialist",
      },
    },
    {
      number: 4,
      title: "Business Succession",
      description: "Ensures smoother transitions for business ownership and continuity.",
      image: {
        src: "/feature-4.svg",
        alt: "Legacy Preservation",
      },
    },
  ],
} as const



export const FOOTER_CONTENT = {
  
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Contact ", href: "/contact" },
  ],

  copyrightText: "Copyright © 2026 Insurlii. All Rights Reserved.",
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
