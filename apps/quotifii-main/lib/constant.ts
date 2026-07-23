//  sections constants

export const HERO_CONTENT = {
  headlineLead: "Shop Auto & Home Insurance The Easy Way",
  
  subheadline: "Explore coverage options from trusted providers and find a policy suited to your needs and budget.",
  image: {
    src: "/hero.webp",
    alt: "Hero Image"
  },

  herobuttons: [
    {
      label: "Auto",
      icon: "/auto.svg",
      iconAlt: "Auto Insurance Icon",
      arrow: "/auto-arrow.svg",
      primary: true,
      href: "https://auto-quote.quotifii.com",
    },
    {
      label: "Home",
      icon: "/home.svg",
      iconAlt: "Home Insurance Icon",
      arrow: "/home-arrow.svg",
      primary: false,
      href: "https://home.quotifii.com",
    },
  ],
 
  
} as const

export const PARTNERS_CONTENT = {
  header: "We Work With Trusted Providers",

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
  header: "A Better Rate Could Be Waiting In Your ZIP",
  description: "Tell us the basics and we’ll line up options worth a look.",

  image: {
    src: "/quokka.webp",
    alt: "Quokka Image",
  },
  
} as const

export const REVIEW_CONTENT = {
  header: "What Our Customers Say",

  badge: [
    {
      text: "Verified",
      icon: "/badge.svg",
    },
    
  ],

  reviews: [
    {
      id: 1,
      quote:
        'Quotifii helped me find suitable coverage without visiting multiple websites. The entire process felt quick and straightforward.',
      customer: {
        name: "Linda R.",
        location: "San Diego, CA",
        image: {
          src: "/profile-1.svg",
          alt: "Linda R.",
        },
      },
    },
    {
      id: 2,
      quote:
        'The steps were clear, the options were easy to review and I found a policy that worked for my budget.',
      customer: {
        name: "Marco W.",
        location: "Austin, TX",
        image: {
          src: "/profile-2.svg",
          alt: "Marco W.",
        },
      },
    },
    {
      id: 3,
      quote:
        'I explored auto and home insurance options in one place and found the right coverage without feeling pressured.',
      customer: {
        name: "Camila S.",
        location: "Edison, NJ",
        image: {
          src: "/profile-3.svg",
          alt: "Camila S.",
        },
      },
    },
  ],
} as const

export const FAQ_CONTENT = {
  header: "Frequently Asked Questions",
  faqs: [
    {
      id: 1,
      question: "Is it free to receive insurance quotes?",
      answer: "Yes. Quotifii lets you explore insurance quotes without any hidden fees or obligations.",
    },
    {
      id: 2,
      question: "How long does it take?",
      answer: "Most users can complete the initial process in just a few minutes.",
    },
    {
      id: 3,
      question: "Which insurance companies do you work with?",
      answer: "We partner with a network of trusted insurance providers offering reliable coverage and competitive rates.",
    },
    {
      id: 4,
      question: "Will requesting quotes affect my credit score?",
      answer: "No. Exploring insurance quotes through Quotifii will not affect your credit score.",
    },
    {
      id: 5,
      question: "Can I explore both auto and home insurance?",
      answer: "Yes. You can receive options for auto insurance, home insurance or both.",
    },
    {
      id: 6,
      question: "Am I required to purchase a policy?",
      answer: "No. You are free to review your options without any obligation to purchase.",
    },
  ],
} as const

export const FEATURES_CONTENT = {
  header: "Why Compare Insurance With Quotifii?",
  steps: [
    {
      number: 1,
      title: "Save Time",
      description: "View multiple insurance options in one convenient place.",
      image: {
        src: "/feature-1.svg",
        alt: "Save Time Icon",
      },
    },
    {
      number: 2,
      title: "Trusted Partners",
      description: "Access coverage options from recognized insurance companies.",
      image: {
        src: "/feature-2.svg",
        alt: "Trusted Partners Icon",
      },
    },
    {
      number: 3,
      title: "Quick & Easy",
      description: "Share a few details and receive suitable policy options.",
      image: {
        src: "/feature-3.svg",
        alt: "Quick & Easy Icon",
      },
    },
    {
      number: 4,
      title: "Find Better Rates",
      description: "Review available prices and coverage without the usual hassle.",
      image: {
        src: "/feature-4.svg",
        alt: "Find Better Rates Icon",
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
