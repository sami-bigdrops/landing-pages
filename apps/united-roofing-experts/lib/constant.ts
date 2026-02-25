//  sections constants

export const HERO_CONTENT = {
  headline: "Worried A Storm Damaged Your Roof?",
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
      className: "w-25 lg:w-30 xl:w-34 h-auto object-contain",
    },
    {
      alt: "Houzz",
      src: "/partner-2.svg",
      width: 140,
      className: "w-38 lg:w-40 xl:w-45 h-auto object-contain",
    },
    
  ],
} as const

export const RIBBON_CONTENT = {
  badges: [
    {
      icon: "/ribbon-1.svg",
      label: "250+ Google Reviews",
    },
    {
      icon: "/ribbon-2.svg",
      label: "Licensed & Insured",
    },
    {
      icon: "/ribbon-3.svg",
      label: "Local Roofing Experts",
    },
    {
      icon: "/ribbon-4.svg",
      label: "Warranty Included",
    },
  ]
}

export const RATING_CONTENT = {
  ratings: [
    {
      id: 1,
      label: "RATING:",
      value: "A+",
      logo: {
        src: "/BBB.svg",
        alt: "BBB Accredited Business",
        width: 80,
        className: "w-26 lg:w-30 xl:w-32 h-auto object-contain"
      },
    },
    {
      id: 2,
      label: "RATING:",
      value: "4.9",
      logo: {
        src: "/facebook.svg",
        alt: "Facebook",
        width: 80,
        className: "w-10 lg:w-12 xl:w-14  h-auto object-contain"
      },
    },
    {
      id: 3,
      label: "RATING:",
      value: "4.7",
      logo: {
        src: "/guild-quality.svg",
        alt: "GuildQuality",
        width: 80,
        className: "w-37 lg:w-40 xl:w-44  h-auto object-contain"
      },
    },
    {
      id: 4,
      label: "RATING:",
      value: "4.8",
      logo: {
        src: "/google-icon.svg",
        alt: "Google",
        width: 80,
        className: "w-25 lg:w-28 xl:w-30  h-auto object-contain"
      },
    },
  ],
}

const HEADING_GRADIENT = "linear-gradient(90deg, #2B96E4 0%, #275086 100%)"

export const WORKS_CONTENT = {
  header: "How It Works",
  steps: [
    {
      id: 1,
      number: "01",
      title: "Book Your Free Storm Inspection",
      description: "Enter your ZIP and pick a slot. Same week inspections in many areas.",
      image: {
        src: "/step-1.webp",
        alt: "Booking a free storm inspection on tablet"
      },
    },
    {
      id: 2,
      number: "02",
      title: "We Document Damage With Photos",
      description: "We check shingles, flashing, and soft spots, then show you what we see.",
      image: {
        src: "/step-2.webp",
        alt: "Roofers inspecting and taking notes"
      },
    },
    {
      id: 3,
      number: "03",
      title: "Get A Clear Plan And Timeline",
      description: "You get a written estimate, repair options & a simple schedule to get it sorted.",
      image: {
        src: "/step-3.webp",
        alt: "New roof installation with workers"
      },
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
  header: "Testimonials",


  testimonialImages: [
    {
      id: 1,
      testimonialImage: {
        src: "/roof-1.webp",
        alt: " roof"
      },
      
    },
    {
      id: 2,
      testimonialImage: {
        src: "/roof-2.webp",
        alt: " roof"
      },
    },
    {
      id: 3,
      testimonialImage: {
        src: "/roof-3.webp",
        alt: "roof"
      },
    }
  ],

  testimonials: [
    {
      id: 1,
      quote: "They came out the same week after our storm and showed us photos of the damage right away. Everything was explained clearly, and the crew finished on schedule. Our yard was spotless when they left.",
      customer: {
        name: "Mark Reynolds",
        status: "Plano, TX",
        image: {
          src: "/profile-1.svg",
          alt: "Mark Reynolds",
        },
      },
    },
    {
      id: 2,
      quote: "We weren’t sure if our roof needed repair or replacement. The inspection helped us understand our options, and there was zero pressure. The whole process was smooth from start to finish.",
      customer: {
        name: "Angela Morris",
        status: "Tampa, FL",
        image: {
          src: "/profile-2.svg",
          alt: "Angela Morris",
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
  copyrightText: "Copyright © 2026 United Roofing Experts. All Rights Reserved.",
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
