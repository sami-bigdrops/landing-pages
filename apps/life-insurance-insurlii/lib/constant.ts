//  sections constants

export const HERO_CONTENT = {
  headline: "Life Insurance Built Around Your Legacy",
  description: "Explore life insurance options shaped around estate planning, wealth transfer, family protection, and long-term financial security.",
  

  image: {
    src: "/hero.webp",
    alt: "Insurlii Life Insurance"
  },
 
  
  
} as const

export const BADGE_CONTENT = {
 
  badges: [
    {
      number: 1,
      title: "Estate-Aware Planning",
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

export const FAQ_CONTENT = {
  header: "Frequently Asked Questions",
  faqs: [
    {
      question: "Can this work with trusts?",
      answer:
        "Yes. Life insurance is often structured alongside trusts as part of broader estate planning. A specialist can help you understand which approach may suit your goals.",
    },
    {
      question: "Is permanent life more relevant here?",
      answer: "Permanent life insurance may suit people looking at long-term protection, estate planning, or wealth transfer. The right fit depends on your age, assets, family needs, and financial priorities.",
    },
    {
      question: "Is this only about replacing income?",
      answer: "No. Life insurance can also support estate liquidity, inheritance planning, business succession, and long-term family protection.",
    },
    {
      question: "How is this different from standard policies?",
      answer: "This approach looks at your broader financial picture first. Coverage is reviewed through the lens of estate planning, family goals, ownership structure, and long-term protection.",
    },
  ],
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
      description: "Tell us about your situation, your goals, and the people or assets you want to protect.",
      image: {
        src: "/works-1.svg",
        alt: "Share a Few Details",
      },
    },
    {
      number: 2,
      title: "Review Tailored Options",
      description: "Explore life insurance coverage shaped around your financial needs and long-term plans.",
      image: {
        src: "/works-2.svg",
        alt: "Review Tailored Options",
      },
    },
    {
      number: 3,
      title: "Speak With a Specialist",
      description: "Get clear guidance when needed, with no pressure and no rushed decisions.",
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
      description: "Creates funds that may help cover estate obligations without disrupting long-term assets.",
      image: {
        src: "/feature-1.svg",
        alt: "Share a Few Details",
      },
    },
    {
      number: 2,
      title: "Wealth Transfer",
      description: "Helps protect wealth distribution plans with structure, clarity, and future-focused planning.",
      image: {
        src: "/feature-2.svg",
        alt: "Review Tailored Options",
      },
    },
    {
      number: 3,
      title: "Family Continuity",
      description: "Supports spouses, children, and future generations through planned financial protection.",
      image: {
        src: "/feature-3.svg",
        alt: "Speak With a Specialist",
      },
    },
    {
      number: 4,
      title: "Business Succession",
      description: "Gives business owners a smoother path for transition, ownership planning, and continuity.",
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
