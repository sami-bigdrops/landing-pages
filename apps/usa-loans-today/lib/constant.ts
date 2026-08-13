//  sections constants

import { ArrowUpIcon } from "lucide-react"

export const HERO_CONTENT = {
  brand: "USA Loans Today",
  headlineLead1: "Find A Loan That",
  headlineLead2: "Fits Your Needs",
  subheadline:
    "Compare loan options from multiple lenders in one place. See what may be available based on your needs, budget and financial situation.",
  image: {
    src: "/hero.webp",
    alt: "Compare auto and home insurance quotes with Quotifii",
  },
  trustpilot: {
    text: "Rated 4.9/5 on",
    logo: {
      src: "/hero-trust.svg", 
      alt: "Trustpilot",
    },
  },
  valueProps: [
    {
      icon: "/feature-1.svg",
      title: "Safe & Secure",
      description: "Your information is handled securely throughout the process.",
    },
    {
      icon: "/feature-2.svg",
      title: "Multiple Lenders",
      description: "Compare options from lenders within our network.",
    },
    {
      icon: "/feature-3.svg",
      title: "Simple Process",
      description: "Answer a few questions online to get started.",
    },
    {
      icon: "/feature-4.svg",
      title: "Clear Loan Details",
      description: "Review rates, terms and repayment information before making a decision.",
    },
  ],
} as const

export const PARTNERS_CONTENT = {
  header: "We Work With Trusted Providers",

  partners: [
    { alt: "Trusted insurance partner logo", src: "/partner-1.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Trusted insurance partner logo", src: "/partner-2.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Trusted insurance partner logo", src: "/partner-3.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Trusted insurance partner logo", src: "/partner-4.svg", className: "w-16 md:w-15 lg:w-14 xl:w-19 overflow-hidden object-contain" },
    { alt: "Trusted insurance partner logo", src: "/partner-5.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "Trusted insurance partner logo", src: "/partner-6.svg", className: "w-28 md:w-28 lg:w-25 xl:w-30 overflow-hidden object-contain" },
  ],
} as const

export const STEPS_CONTENT = {
  header: "A Simpler Way to Find Insurance",
  description:
    "Tell us what you need, explore your options and select the right coverage.",
  steps: [
    {
      number: 1,
      numberText: "01",
      title: "Tell Us About Yourself",
      description: "Answer a few basic questions about your insurance needs.",
      
    },
    {
      number: 2,
      numberText: "02",
      title: "Explore Your Quotes",
      description: "Review rates and coverage options from trusted providers.",
      
    },
    {
      number: 3,
      numberText: "03",
      title: "Save More",
      description: "Choose a policy that suits your needs, lifestyle and budget.",
      
    },
  ],

  image: {
    src: "/step.webp",
    alt: "Simple three-step process to compare insurance quotes",
  },
} as const

export const COVERAGE_CONTENT = {
  header: "Find The Coverage That's Right For You",
  description:
    "Whether you need to protect your vehicle or your home, Quotifii makes it easy to explore trusted insurance options.",

  arrowIconButton: {
    src: "/auto-arrow.svg",
    alt: "Arrow Icon",
  },

  sections: [
    {
      type: "auto",
      title: "Auto Insurance",
      description:
        "Explore coverage designed to protect you, your vehicle and others on the road.",
      features: [
        {
          label: "Multi-Vehicle Savings",
          icon: "/auto-1.svg",
          iconAlt: "Multi-Vehicle Icon",
        },
        {
          label: "Collision & Comprehensive",
          icon: "/auto-2.svg",
          iconAlt: "Collision and Comprehensive Icon",
        },
        {
          label: "Multiple Provider Comparison",
          icon: "/auto-3.svg",
          iconAlt: "Provider Comparison Icon",
        },
      ],
 
      button: {
        label: "Get Auto Quotes",
        primary: true,
        href: "https://autocoverage.quotifii.com/",
        badge: {
          tag: "Popular Choice",
          tagIcon: "/fire.svg",
          tagIconAlt: "Fire Icon",
        },
      },
      image: {
        src: "/auto-in.webp",
        alt: "Compare auto insurance quotes online with Quotifii",
      },
    },
    {
      type: "home",
      title: "Home Insurance",
      description:
        "Find coverage designed to protect your property, belongings and personal liability.",
      features: [
        {
          label: "Property Protection",
          icon: "/home-1.svg",
          iconAlt: "Property Protection Icon",
        },
        {
          label: "Personal Belongings",
          icon: "/home-2.svg",
          iconAlt: "Personal Belongings Icon",
        },
        {
          label: "Liability Coverage",
          icon: "/home-3.svg",
          iconAlt: "Liability Coverage Icon",
        },
      ],
      button: {
        label: "Get Home Quotes",
        primary: true,
        href: "https://homequotes.quotifii.com/",
      },
      image: {
        src: "/home-in.webp",
        alt: "Compare home insurance quotes online with Quotifii",
      },
    },
  ],
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

  typelinks: [
    { text: "Auto Insurance", href: "https://autocoverage.quotifii.com/" },
    { text: "Home Insurance", href: "https://homequotes.quotifii.com/" },
  ],
  
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
