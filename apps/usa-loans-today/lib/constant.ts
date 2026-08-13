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



export const WORKS_CONTENT = {
  header: "How It Works",
  description:
    "Finding loan options doesn’t need to take hours.",
  steps: [
    {
      number: 1,
      numberText: "1",
      title: "Tell Us What You Need",
      description: "Share a few basic details about the loan you’re looking for.",
    },
    {
      number: 2,
      numberText: "2",
      title: "See Available Options",
      description: "We’ll check for lenders and loan options that may match your needs.",
    },
    {
      number: 3,
      numberText: "3",
      title: "Compare Before You Decide",
      description: "Look at the rates, terms and costs before choosing what works for you.",
    },
  ],

  image: {
    src: "/work.webp",
    alt: "How it works illustration - person reviewing loan options on phone",
  },
} as const

export const COMPARE_CONTENT = {
  header: "Know What You’re Comparing",
  description:
    "Before choosing a loan, take a look at the details that can affect how much you pay.",
  compareList: [
    {
      title: "Annual Percentage Rate (APR)",
      icon: "/compare-right.svg",
      alt: "List of loan details",
    },
    {
      title: "Loan Amount",
      icon: "/compare-right.svg",
      alt: "List of loan details",
    },
    {
      title: "Monthly Payments",
      icon: "/compare-right.svg",
      alt: "List of loan details",
    },
    {
      title: "Repayment Terms",
      icon: "/compare-right.svg",
      alt: "List of loan details",
    },
    {
      title: "Fees & Charges",
      icon: "/compare-right.svg",
      alt: "List of loan details",
    },
    {
      title: "Total Cost of Borrowing",
      icon: "/compare-right.svg",
      alt: "List of loan details",
    },
  ],
  
  image: {
    src: "/compare.webp",
    alt: "Couple comparing loan options on laptop",
  },
  button: {
    label: "CHECK LOAN OPTIONS",
    variant: "primary", // Custom, for styling as red
  },
} as const

export const OPTIONS_CONTENT = {
  headline: "Ready To Explore Medicare Options In Your Area?",
  subtext: "We will help you compare available Medicare options with a calmer, clearer review - so you can make a decision that fits your health, your money and your peace of mind.",
  
  badges: [
    {
      icon: "/option-1.svg",
      text: "Licensed Guidance",
    },
    {
      icon: "/option-2.svg",
      text: "No-pressure review",
    },
    {
      icon: "/option-3.svg",
      text: "Plans Available By ZIP Code",
    },
  ],

  image: {
    src: "/option.webp", // Update with actual image asset path if different
    alt: "Family sitting on couch looking at tablet together"
  }
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
