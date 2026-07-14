//  sections constants

export const TOP_NAV_CONTENT = {
  headline: "Cheap Insurance Quotes From the Nation's Best Companies",
} as const

export const NAVBAR_CONTENT = {
  contactPhoneLabel: "855-581-3316",
  contactPhoneHref: "tel:+18555813316",
} as const

export const HERO_CONTENT = {
  headline: "Save up to 50% on Your Car Insurance.",
  description: "Compare Auto Insurance Quotes Instantly.",
} as const

export const PARTNERS_CONTENT = {
  partners: [
    { alt: "Partner 1", src: "/partner-1.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 2", src: "/partner-2.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 3", src: "/partner-3.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 4", src: "/partner-4.svg", className: "w-16 md:w-15 lg:w-14 xl:w-19 overflow-hidden object-contain" },
    { alt: "Partner 5", src: "/partner-5.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 6", src: "/partner-6.svg", className: "w-28 md:w-28 lg:w-25 xl:w-30 overflow-hidden object-contain" },
  ],
} as const

export const HELP_CONTENT = {
  header: "We've Helped Over 4 Million People Save Money on Their Insurance",
  features: [
    {
      title: "Compare Rates from #1 Top Rated Brands",

      icon: "/tick.svg",
    },
    {
      title: "100% Safe & Secure",

      icon: "/tick.svg",
    },
    {
      title: "Get Multiple Quotes for Free in Less than 3 minutes",

      icon: "/tick.svg",
    },
    {
      title: "Save up to 50% by comparing offers",

      icon: "/tick.svg",
    },
  ],

  phonePrompt: "Rather Get a Quote by Phone? Talk to an Agent",
  phone: {
    label: "855-581-3316",
    href: "tel:+18555813316",
    icon: "/help-call.svg",
  },
} as const

export const FEATURES_CONTENT = {
  headline: "Find Affordable Auto Insurance Without The Long Search",

  steps: [
    {
      id: 1,
      title: "Save More",
      description:
        "Compare quotes from multiple insurance providers and look for rates that suit your budget.",
      image: {
        src: "/feature-1.svg",
        alt: "Cash in Your Hands Fast",
      },
    },
    {
      id: 2,
      title: "Fast & Easy",
      description:
        "Share a few basic details and view personalized quote options in just a few minutes.",
      image: {
        src: "/feature-2.svg",
        alt: "Sell Completely As-Is",
      },
    },
    {
      id: 3,
      title: "Recognised Providers",
      description:
        "Review cover options from well-known insurance companies in one simple place.",
      image: {
        src: "/feature-3.svg",
        alt: "Close in as Little as 7 Days",
      },
    },
    {
      id: 4,
      title: "No Obligation",
      description:
        "Check your options freely, with no pressure to buy and no hidden commitment.",
      image: {
        src: "/feature-4.svg",
        alt: "Zero Fees or Commissions",
      },
    },
  ],
} as const

export const OPTIONS_CONTENT = {
  header: "A Better Rate Could Be Waiting In Your ZIP",
  description: "Tell us the basics and we'll line up options worth a look.",

  image: {
    src: "/quokka.webp",
    alt: "Quokka Image",
  },
} as const

export const REVIEW_CONTENT = {
  header: "Helping Drivers Find Better Rates Every Day",

  badge: [
    {
      text: "Verified",
      icon: "/tick.svg",
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
    ],
  ],

  disclaimer: [
    "Cheap Auto Insurance Options is a digital insurance comparison platform that helps consumers compare auto insurance options through its network of insurance carriers, agencies, and licensed partners across the United States. We may receive compensation from our partner providers when you are connected with their products or services. Cheap Auto Insurance Options is not affiliated with any federal, state, or government agency.",
    "The lowest advertised rates may not be available from all insurance providers or in all locations. Rates and coverage options are based on the information you provide and may vary depending on factors such as your location, driving history, age, vehicle type, coverage selections, deductibles, discounts, and other underwriting criteria. Quotes displayed or advertised are for illustrative purposes only and do not guarantee availability or eligibility.",
    "As part of our commitment to providing a quality user experience, Cheap Auto Insurance Options and its service providers may monitor, record, and retain activity on this website and its associated links for quality assurance, security, training, analytics, and service improvement purposes.",
  ],
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
