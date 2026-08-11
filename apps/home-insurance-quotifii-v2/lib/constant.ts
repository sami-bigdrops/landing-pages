//  sections constants

export const HERO_CONTENT = {
  
  image: {
    src: "/hero.webp",
    alt: "Quotifii"
  },

  features: [
    { text: "Rated 4.8 by homeowners", image: "/hero-feature-1.svg", alt: "Star icon" },
    { text: "Secure & no spam", image: "/hero-feature-2.svg", alt: "Lock icon" },
  ],
 
  
} as const

export const PARTNERS_CONTENT = {
  header: "We Partner With Top Home Insurance Providers",

  partners: [
    { alt: "Partner 1", src: "/partner-1.svg", className: "w-30 md:w-26 lg:w-33 xl:w-45 overflow-hidden object-contain" },
    { alt: "Partner 2", src: "/partner-2.svg", className: "w-30 md:w-26 lg:w-33 xl:w-45 overflow-hidden object-contain" },
    { alt: "Partner 3", src: "/partner-3.svg", className: "w-30 md:w-27 lg:w-34 xl:w-44 overflow-hidden object-contain" },
    { alt: "Partner 4", src: "/partner-4.svg", className: "w-28 md:w-26 lg:w-30 xl:w-40 overflow-hidden object-contain" },
    { alt: "Partner 5", src: "/partner-5.svg", className: "w-28 md:w-25 lg:w-30 xl:w-41 overflow-hidden object-contain" },

  ],
} as const

export const OPTIONS_CONTENT = {
  header: "A Better Home Insurance Plan Could Be Waiting in Your ZIP",
  description: "Tell us a few details and compare top options instantly",

  image: {
    src: "/option.webp",
    alt: "Quokka Image",
  },
  
} as const

export const REVIEW_CONTENT = {
  header: "What Our Customers Say",
  
  reviews: [
    {
     id: 1,
      quote: "I didn’t expect it to be this simple. I answered a few questions, compared options, and ended up switching to a better rate the same day. Having an agent walk me through everything really helped.",
      customer: {
        name: "Amanda Reynolds",
        location: "San Diego, CA",
        image: {
          src: "/profile-1.svg",
          alt: "Amanda Reynolds",
        },
      },
    },
    {
      id: 2,
      quote: "I liked that I could see different quotes in one place instead of jumping between websites. The process was quick, and I felt confident about the coverage I chose.",
      customer: {
        name: "Jason M.",
        location: "Austin, TX",
        image: {
          src: "/profile-2.svg",
          alt: "Jason M.",
        },
      },
    },
    {
     
      id: 3,
      quote: "I was paying way more than I should have. Quotifii helped me find a more affordable option in minutes, and the agent explained everything clearly. Super easy experience.",
      customer: {
        name: "Priya S",
        location: "Edison, NJ",
        image: {
          src: "/profile-3.svg",
          alt: "Priya S",
        },
      },
    },
  ],
} as const

export const FEATURES_CONTENT = {
  header: "Why Choose Quotifii For Home Insurance",
  steps: [
    {
      number: 1,
      title: "Complete Home Coverage",
      description: "Protect your home structure, belongings, and more in one plan.",
      image: {
        src: "/feature-1.svg",
        alt: "Complete Home Coverage icon",
      },
    },
    {
      number: 2,
      title: "Protection from Unexpected Damage",
      description: "Stay covered against fire, theft, weather damage, and more.",
      image: {
        src: "/feature-2.svg",
        alt: "Protection from Unexpected Damage icon",
      },
    },
    {
      number: 3,
      title: "Fast & Hassle-Free Claims",
      description: "Get quick support when you need it most.",
      image: {
        src: "/feature-3.svg",
        alt: "Fast & Hassle-Free Claims icon",
      },
    },
  ],
} as const

export const COVER_CONTENT = {
  header: "What Does Home Insurance Typically Cover?",

  image: {
    src: "/coverage.webp",
    alt: "Cover All icon",
  },
  items: [
    {
      title: "Rebuilding costs",
      description: "Covers damage to your home structure",
      image: {
        src: "/cover-1.svg",
        alt: "Rebuilding costs",
      },
    },
    {
      title: "Personal belongings",
      description: "Protects furniture, electronics, and valuables",
      image: {
        src: "/cover-2.svg",
        alt: "Personal belongings",
      },
    },
    {
      title: "Liability protection",
      description: "Covers accidents and legal responsibilities",
      image: {
        src: "/cover-3.svg",
        alt: "Liability protection",
      },
    },
    {
      title: "Living Expenses",
      description: "Pays for temporary stay if needed",
      image: {
        src: "/cover-4.svg",
        alt: "Living Expenses",
      },
    },
  ],
} as const




export const FOOTER_CONTENT = {
  description: "The Smart Way to Shop For Insurance.",
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Contact ", href: "/contact" },
  ],
  disclaimer:
  'For quality control purposes, your activity on this site may be monitored or recorded by Quotifii or its service providers.',
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
