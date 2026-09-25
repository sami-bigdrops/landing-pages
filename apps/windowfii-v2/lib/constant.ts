//  sections constants



export const NAVBAR_CONTENT = {
  contactPhoneLabel: "855-581-3316",
  contactPhoneHref: "tel:+18555813316",
} as const

export const HERO_CONTENT = {
  headline: "Upgrade Your Windows. Upgrade Your Comfort.",
  description:
    "Your entire purchase 20% off¹ | Minimum purchase of 4",

  disclaimer: "*Valid in select areas. Minimum purchase may apply. Financing may be available and may vary; on approved credit; third-party lenders. Add'l charges may apply. 1-day install on select projects. Pricing subject to inspection. New purchases only; limit 1; not combinable. See Terms for full details.",
  Badges: [
    {
      icon: "/tick-mark.svg",
      text: "No pressure consultation",
    },
    {
      icon: "/tick-mark.svg",
      text: "Clear Quote Options",
    },
    {
      icon: "/tick-mark.svg",
      text: "Professional Installation",
    },
  ],
  image: {
    alt: "American home with modern replacement windows and updated exterior",
    src: "/hero-bg.webp",
  },

 
} as const


export const STEPS_CONTENT = {
  header: "Are Your Windows Causing These Problems?",
  description: {
    before: "Heat gain and heat loss through windows account for ",
    highlight: "25%–30% of residential heating and cooling energy use",
    after: ", making inefficient windows more than just an everyday inconvenience.",
  },
  steps: [
    {
      number: 1,
      title: "Uneven Temperatures",
      description:
        "Some rooms stay too hot in summer or too cold in winter.",
      image: {
        src: "/about-1.svg",
        alt: "Uneven Temperatures Icon",
      },
    },
    {
      number: 2,
      title: "Drafts & Air Leaks",
      description:
        "Feel unwanted hot or cold air around your windows?",
      image: {
        src: "/about-2.svg",
        alt: "Drafts & Air Leaks Icon",
      },
    },
    {
      number: 3,
      title: "Outside Noise",
      description:
        "Traffic, neighbours and everyday outdoor sounds finding their way inside?",
      image: {
        src: "/about-3.svg",
        alt: "Outside Noise Icon",
      },
    },
    {
      number: 4,
      title: "Difficult Windows",
      description:
        "Windows sticking, fogging up or becoming harder to open and close?",
      image: {
        src: "/about-4.svg",
        alt: "Difficult Windows Icon",
      },
    },
  ],
} as const

export const FEATURES_CONTENT = {
  header: "Upgrade Your Windows. Upgrade Your Everyday Comfort.",
  description:
    "Modern replacement windows can help improve how your home feels, performs and looks throughout the year.",
  steps: [
    {
      number: 1,
      title: "Better Energy Efficiency",
      description:
        "Help keep heated and cooled air where it belongs while reducing unwanted heat transfer through your windows.",
      image: {
        src: "/choose-1.svg",
        alt: "Energy Efficiency Icon",
      },
    },
    {
      number: 2,
      title: "Improved Comfort",
      description:
        "Reduce drafts, hot spots and temperature changes that can make certain rooms uncomfortable.",
      image: {
        src: "/choose-2.svg",
        alt: "Comfort Icon",
      },
    },
    {
      number: 3,
      title: "Reduced Outside Noise",
      description:
        "Create a quieter indoor space by reducing the amount of unwanted outdoor noise entering your home.",
      image: {
        src: "/choose-3.svg",
        alt: "Noise Reduction Icon",
      },
    },
    {
      number: 4,
      title: "Enhanced Curb Appeal",
      description:
        "Refresh the look of your home with window styles that complement its exterior and character.",
      image: {
        src: "/choose-4.svg",
        alt: "Curb Appeal Icon",
      },
    },
  ],
  image: {
    src: "/choose.webp",
    alt: "Bright living room with large modern replacement windows and natural daylight",
  },
} as const



export const OPTIONS_CONTENT = {
  header: "Ready to Replace Your Old Windows?",
  description: "Find replacement window options available in your area and get a free quote for your home.",

  badges: [
    {
      number: "25+",
      label: "Years Experience",
    },
    {
      number: "10k+",
      label: "Windows Installed",
    },
    {
      number: "4.9",
      label: "Customer Rating",
      icon: "/star.svg", // Assumes you have a star icon at this path
      iconAlt: "Star",
    },
    {
      text: "Lifetime",
      label: "Warranty",
      highlight: true, // Optional: may help distinguish for styling
    },
  ],

  image: {
    src: "/info.webp",
    alt: "Modern residential home featuring professionally installed replacement windows",
  },
  
} as const


export const REVIEW_CONTENT = {
  header: "Trusted by Homeowners Like You",
  subheader: "See what homeowners have to say about replacing old windows and improving the comfort of their homes.",
  reviews: [
    {
      id: 1,
      quote: "Our old windows made certain rooms uncomfortable year-round. After replacing them, we noticed a huge difference in temperature and overall comfort throughout our home.",
      customer: {
        name: "Sarah M.",
        time: "2 hours ago",
        image: {
          src: "/profile-1.svg",
          alt: "Windowfii customer Sarah",
        },
        verified: true,
      },
      rating: 5,
    },
    {
      id: 2,
      quote: "The entire process was simple and stress-free. The team explained our options clearly, gave us an honest quote, and completed the installation professionally.",
      customer: {
        name: "Michael R.",
        time: "6 hours ago",
        image: {
          src: "/profile-2.svg",
          alt: "Windowfii customer Michael",
        },
        verified: true,
      },
      rating: 5,
    },
    {
      id: 3,
      quote: "We replaced our aging windows and immediately noticed less outside noise and a more comfortable living space. The difference has been amazing.",
      customer: {
        name: "Jennifer K.",
        time: "1 day ago",
        image: {
          src: "/profile-3.svg",
          alt: "Windowfii customer Jennifer",
        },
        verified: true,
      },
      rating: 5,
    },
  ],
} as const



export const FOOTER_CONTENT = {
  linkRows: [
    [
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms of Use", href: "/terms-of-use" },
      { text: "Unsubscribe", href: "mailto:contact@windowfii.com?subject=Unsubscribe" },
    ],
  ],

  copyrightText: "© 2026 windowfii.com, all rights reserved",
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
