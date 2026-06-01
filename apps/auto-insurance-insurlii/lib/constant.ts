//  sections constants

export const HERO_CONTENT = {
  headline: "Let's drop your rate in {city_name} today!",
  description: "See real options from top providers near you.",
  

  image1: {
    src: "/hero.webp",
    alt: "Insurlii Auto Insurance"
  },
  image2: {
    src: "/hero-2.webp",
    alt: "Insurlii Auto Insurance"
  },
  
  
} as const

export const PARTNERS_CONTENT = {
  header: "COMPARE RATES FROM TOP INSURANCE COMPANIES",

  partners: [
    { alt: "Partner 1", src: "/partner-1.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 2", src: "/partner-2.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 3", src: "/partner-3.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 4", src: "/partner-4.svg", className: "w-16 md:w-15 lg:w-14 xl:w-19 overflow-hidden object-contain" },
    { alt: "Partner 5", src: "/partner-5.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Partner 6", src: "/partner-6.svg", className: "w-28 md:w-28 lg:w-25 xl:w-30 overflow-hidden object-contain" },
  ],
} as const

export const OPTIONS_CONTENT = {
  header: "Compare Your Auto Insurance Options Today",
  description: "Explore policies designed around your vehicle, usage, and protection.",

 badge : {
  label: "Tailored options. Clear next steps. No generic quote flow.",
  src: "/shield.svg",
  alt: "Badge",
 },
  
} as const

export const REVIEW_CONTENT = {
  header: "What Our Customers Say",
  
  reviews: [
    {
     id: 1,
      quote: "Most sites just show prices. This helped me understand what coverage actually included - clear and straightforward.",
      customer: {
        name: "Michael R.",
        location: "Austin, TX",
        image: {
          src: "/profile-1.svg",
          alt: "Michael R.",
        },
      },
    },
    {
      id: 2,
      quote: "I needed better repair standards and liability coverage. Comparing options side by side made it easy.",
      customer: {
        name: "Sarah L.",
        location: "San Diego, CA",
        image: {
          src: "/profile-2.svg",
          alt: "Sarah L.",
        },
      },
    },
    {
     
      id: 3,
      quote: "Didn’t feel like a typical quote flow. I could review options at my own pace - no pressure.",
      customer: {
        name: "Daniel K.",
        location: "Chicago, IL",
        image: {
          src: "/profile-3.svg",
          alt: "Daniel K.",
        },
      },
    },
  ],
} as const

export const FEATURES_CONTENT = {
  header: "How It Works",
  steps: [
    {
      number: 1,
      title: "Share a Few Details",
      description: "Tell us about your vehicle and coverage preferences.",
      image: {
        src: "/feature-1.svg",
        alt: "Share a Few Details",
      },
    },
    {
      number: 2,
      title: "Review Tailored Options",
      description: "Explore coverage designed around your needs - not generic policies.",
      image: {
        src: "/feature-2.svg",
        alt: "Review Tailored Options",
      },
    },
    {
      number: 3,
      title: "Speak With a Specialist",
      description: "Get clarity and guidance before making a decision.",
      image: {
        src: "/feature-3.svg",
        alt: "Speak With a Specialist",
      },
    },
  ],
} as const



export const FOOTER_CONTENT = {
  
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Contact", href: "/contact" },
    { text: "Do Not Sell My Info", href: "/opt-out" },
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
