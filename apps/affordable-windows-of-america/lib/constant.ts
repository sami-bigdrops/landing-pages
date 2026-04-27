


export const HERO_CONTENT = {
  headline: "New Windows Without the Big Price Tag",
  description: "Check what homeowners in your area are paying and get a fast quote from local installers.",

  image: {

    src: "/hero-bg.webp",
    alt: "Windows"
  },


} as const

export const FORM_CONTENT = {
  badges: [
    {
      icon: "/form-1.svg",
      text: "Free Quote",
    },
    {
      icon: "/form-2.svg",
      text: "No Pressure",
    },
    {
      icon: "/form-3.svg",
      text: "Quick 2-Minute Check",
    },
  ],
} as const

export const ABOUT_CONTENT = {
  header: "The price gap is bigger than most people expect",

  aboutImage: {
    src: "/about.webp",
    alt: "About Image",
  },

  aboutbadges: [
    {
      icon: "/money.svg",
      text: "That is why checking a fair local price first matters.",
    },
   
  ],
} as const


export const WORKS_CONTENT = {
  header: "How It Works",

  workSteps: [
    {
      number: 1,
      title: "Start with your ZIP Code",
      description: "We check window quote availability in your area.",
      image: {
        src: "/work-1.svg",
        alt: "Start with your ZIP Code",
      },
    },
    {
      number: 2,
      title: "Tell us about your home",
      description: "Share a few quick details about your windows and project.",
      image: {
        src: "/work-2.svg",
        alt: "Tell us about your home",
      },
    },
    {
      number: 3,
      title: "See what fits your budget",
      description: "Review local options and choose the quote that feels right.",
      image: {
        src: "/work-3.svg",
        alt: "See what fits your budget",
      },
    },
  ],
 

  worksbadges: [
    {
      icon: "/work-clock.svg",
      text: "Quick check. No pressure. Takes under 2 minutes.",
    },
   
  ],
} as const

export const CHOOSE_CONTENT = {
  header: "Why Budget-Smart Homeowners Start Here",
  steps: [
    {
      number: 1,
      title: "Fair quotes from the start",
      description: "Know what your window project should really cost before the sales talk begins.",
      image: {
        src: "/choose-1.svg",
        alt: "Fair quotes from the start",
      },
    },
    {
      number: 2,
      title: "Local installers near you",
      description: "Get connected with professionals in your area who know the market and pricing.",
      image: {
        src: "/choose-2.svg",
        alt: "Local installers near you",
      },
    },
    {
      number: 3,
      title: "No pushy sales routine",
      description: "Look through your options, take your time, and move ahead only when it feels right.",
      image: {
        src: "/choose-3.svg",
        alt: "No pushy sales routine",
      },
    },
  ],
} as const

export const COST_CONTENT = {
  header: "What Should New Windows Cost in Your Area?",

  aboutImage: {
    src: "/cost.webp",
    alt: "About Image",
  },

  aboutbadges: [
    {
      icon: "/money.svg",
      text: "Check the price first. Then decide what makes sense.",
    },
   
  ],
} as const

export const OPTIONS_CONTENT = {
  header: "See What Fair Window Pricing Looks Like Near You",
  description: "Start with your ZIP Code and get a quick quote check from local installers.",


  optionsbadges: [
    {
      icon: "/option-1.svg",
      text: "Free estimate",
    },
    {
      icon: "/option-2.svg",
      text: "No pressure",
    },
    {
      icon: "/option-3.svg",
      text: "Fast local quote check",
    },
  ],

 
  
} as const




export const FOOTER_CONTENT = {
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Contact ", href: "/contact" },
  ],
  description: "We connect homeowners with local window providers",
  copyrightText: "Copyright © 2026 Affordable Windows of America. All Rights Reserved.",
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
