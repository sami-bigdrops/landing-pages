//  sections constants

export const HERO_CONTENT = {
  headline: "Worried a storm damaged your roof?",
  description: "Licensed, insured, and straightforward. Book a same-week inspection.",
  image: {
    src: "/hero-bg.webp",
    alt: "Roof"
  },
  
  partners: [
    {
      alt: "Angi",
      src: "/partner-1.svg",
      width: 80,
      className: "w-16 lg:w-20 xl:w-24 h-auto object-contain",
    },
    {
      alt: "Houzz",
      src: "/partner-2.svg",
      width: 140,
      className: "w-24 lg:w-28 xl:w-32 h-auto object-contain",
    },
    
  ],
} as const

const HEADING_GRADIENT = "linear-gradient(90deg, #2B96E4 0%, #275086 100%)"

export const BENEFITS_CONTENT = {
  header: "Why Energy-Saving Windows Are Worth It",
  headerParts: {
    before: "Why ",
    gradient: "Energy-Saving Windows",
    after: " Are Worth It",
  },
  headingGradient: HEADING_GRADIENT,
  windowImage: "/benefit-window.webp",
  image: {
    src: "/benefits-window.webp",
    alt: "Benefits Image",
  },
  benefitCards: [
    { title: "Lower energy bills", description: "Keep indoor temperatures steadier, so your heating and cooling do not have to work as hard.", icon: "/benefit-1.svg" },
    { title: "Quieter rooms", description: "Better seals and layered glass help cut outside noise, so your home feels calmer and more private.", icon: "/benefit-3.svg" },
    { title: "Easy to clean", description: "Tilt-in design makes both sides simple to wipe down, without ladders or awkward angles.", icon: "/benefit-2.svg" },
  ],
  benefits: [
    {
      id: 1,
      title: "Lower energy bills",
      description: "Keep indoor temperatures steadier, so your heating and cooling do not have to work as hard.",
      icon: { src: "/benefit-1.svg", alt: "Lower energy bills" },
    },
    {
      id: 2,
      title: "Easy to clean",
      description: "Tilt-in design makes both sides simple to wipe down, without ladders or awkward angles.",
      icon: { src: "/benefit-2.svg", alt: "Easy to clean" },
    },
    {
      id: 3,
      title: "Quieter rooms",
      description: "Better seals and layered glass help cut outside noise, so your home feels calmer and more private.",
      icon: { src: "/benefit-3.svg", alt: "Quieter rooms" },
    },
  ],
}

export const CHOOSE_CONTENT = {
  header: "Choose A Window Style That Fits Your Home and Budget",
  backgroundImage: "/choose-bg.png",
  image: {
    src: "/window-frame.png",
    alt: "Window Frame",
  },
  windowStyles: [
    {
      id: 1,
      title: "Awning",
      image: {
        src: "/awning.png",
        alt: "Awning",
      }
    },
    {
      id: 2,
      title: "Double Hung",
      image: {
        src: "/double-hung.png",
        alt: "Double Hung",
      }
    },
    {
      id: 3,
      title: "Bay Windows",
      image: {
        src: "/bay-windows.png",
        alt: "Bay Windows",
      }
    },
    {
      id: 4,
      title: "Double Slider",
      image: {
        src: "/double-slider.png",
        alt: "Double Slider",
      }
    }
  ]
}

export const REPLACE_CONTENT = {
  header: "3 Quick Signs It's Time to Price New Windows",
  headerParts: {
    gradient: "3 Quick Signs",
    after: "It's Time To Price New Windows"
  },
  headingGradient: HEADING_GRADIENT,
  signs: [
    {
      id: 1,
      title: "Fog, moisture, or mould",
      image: {
        src: "/replace-1.png",
        alt: "Fog, moisture, or mould",
      }
    },
    {
      id: 2,
      title: "Bills keep increasing",
      image: {
        src: "/replace-2.png",
        alt: "Bills keep increasing",
      }
    },
    {
      id: 3,
      title: "Frames that wrap or crack",
      image: {
        src: "/replace-3.png",
        alt: "Frames that wrap or crack",
      }
    },
  ]
}

export const REVIEW_CONTENT = {
  header: "What Our Customers Are Saying",
  headerParts: {
    before: "What Our",
    gradient: "Customers Are Saying",
  },
  headingGradient: HEADING_GRADIENT,
  reviews: [
    {
     id: 1,
      quote: "The installation was quick and hassle-free. My new windows make the whole house feel brighter and more comfortable.",
      customer: {
        name: "Jessica R.",
        status: "Verified Customer",
        image: {
          src: "/profile-1.svg",
          alt: "Jessica R.",
        },
      },
    },
    {
      id: 2,
      quote: "We noticed a big difference in our energy bills right away. The team was professional and left everything spotless.",
      customer: {
        name: "Mark & Emily S.",
        status: "Verified Customer",
        image: {
          src: "/profile-2.svg",
          alt: "Mark & Emily S.",
        },
      },
    },
    {
     
      id: 3,
      quote: "From the first consultation to final installation, everything was smooth. I love how quiet the house is now.",
      customer: {
        name: "Daniel P.",
        status: "Verified Customer",
        image: {
          src: "/profile-3.svg",
          alt: "Susan Roberts",
        },
      },
    },
  ],
} as const

export const TRUST_CONTENT = {
  image: {
    src: "/made-in-usa.png",
    alt: "Made in USA",
  },
  stats: [
    {
      id: 1,
      image: {
        src: "/shield.svg",
        alt: "Shield",
      },
      number: "25+",
      description: "Years of Experience",
    },
    {
      id: 2,
      image: {
        src: "/glass-window.svg",
        alt: "Shield",
      },
      number: "10,000+",
      description: "Windows Installed",
    },
    {
      id: 3,
      image: {
        src: "/home.svg",
        alt: "Home",
      },
      number: "1200+",
      description: "Happy Homeowners",
    }
  ]
}

export const FOOTER_CONTENT = {
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © 2026 Platinum Window Experts. All Rights Reserved.",
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
