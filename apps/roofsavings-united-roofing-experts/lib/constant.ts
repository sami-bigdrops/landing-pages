//  sections constants

export const HERO_CONTENT = {
  headline: "What Would a New Metal Roof Cost for Your Home?",
  description: "(Answer the question below to get started!)",
  subtitle: "Are you a homeowner?",
  image: {
    src: "/hero-bg.webp",
    alt: "Roof"
  },

  heroImage: {
    src: "/hero.webp",
    alt: "Roof"
  }
  
 
    
  
} as const

export const WORKS_CONTENT = {
  header: "Here's How It Works...",
  steps: [
    {
      number: 1,
      step: "Step 1:",
      title: "Get Started Online",
      description: "It only takes a minute to check availability in your area and schedule your FREE estimate.",

      image: {
        src: "/works-1.svg",
        alt: "Multi-Vehicle Savings",
      },
    },
    {
      number: 2,
      step: "Step 2:",
      title: "Free Estimate",
      description: "One of our friendly Metal Roofing Experts will inspect your roof, take measurements and give you a FREE, no-obligation estimate. Next-day appointments may be available!",
      image: {
        src: "/works-2.svg",
        alt: "Free Estimate",
      },
    },
    {
      number: 3,
      step: "Step 3:",
      title: "Installation",
      description: "Our expert installation teams can completely replace your roof (including clean-up!) in as little as ONE day.",
      image: {
        src: "/works-3.svg",
        alt: "Installation",
      },
    },
    {
      number: 4,
      step: "Step 4:",
      title: "Peace of Mind",
      description: "We offer some of the longest-lasting and most durable roofing products on the market. Our products are virtually maintenance-free and backed by transferrable limited lifetime warranties.",
      image: {
        src: "/works-4.svg",
        alt: "Peace of Mind",
      },
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





export const OPTIONS_CONTENT = {
  header: "Ready for Your Free Roof Inspection?",
  description: "Same week availability in most areas.",
  buttonText: "Book a FREE Roof Inspection",
 
  
} as const



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

  reviewImages: [
    {
      id: 1,
      testimonialImage: {
        src: "/quote.svg",
        alt: "Google Review"
      },
    },
    {
      id: 2,
      testimonialImage: {
        src: "/google-review.svg",
        alt: "Quote"
      },
    },
    
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

export const ROOF_CONTENT = { 
  header: "COMMON SIGNS YOUR ROOF MAY NEED ATTENTION",
  ctaButtonText: "Book a FREE Roof Inspection",
  image: {
    src: "/roof-bg.webp",
    alt: "Roof",
  },
  signs: [
    {
      id: 1,
      title: "Curled Shingles",
      image: {
        src: "/roofing-1.webp",
        alt: "Curled shingles on roof",
      },
    },
    {
      id: 2,
      title: "Cracked Shingles",
      image: {
        src: "/roofing-2.webp",
        alt: "Cracked shingles",
      },
    },
    {
      id: 3,
      title: "Moss growth",
      image: {
        src: "/roofing-3.webp",
        alt: "Moss growth on shingles",
      },
    },
    {
      id: 4,
      title: "Granules in the Gutters",
      image: {
        src: "/roofing-4.webp",
        alt: "Granules in the gutters",
      },
    },
    {
      id: 5,
      title: "Insects in attic",
      image: {
        src: "/roofing-5.webp",
        alt: "Insects in attic",
      },
    },
  ],
} as const

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
  confirmationEmailSentNote?: string
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
}

export const THANKYOU_REQUIRE_EMAIL_IN_PARAMS = false

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = {
  title: "Thank you!",
  partnerName: "",
  partnerLogo: { src: "", alt: "" },
  confirmationMessage:
    "Congratulations, you have been matched with \"Brand Name\" and a roofing specialist will contact you soon to schedule your free estimate.",
  confirmationEmailSentNote:
    "A confirmation email has been sent to your email address. If you don't see it in your inbox, please check your spam folder.",
  aboutSectionTitle: "",
  featureCards: [],
}
