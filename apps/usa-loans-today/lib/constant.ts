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
  headline: "Ready to See Your Loan Options?",
  subtext: "Answer a few questions and see what loan options may be available to you.",
  
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
  header: "Real Experiences From People Looking for Loan Options",

  trustpilot: {
    text: "Rated 4.9/5 on",
    logo: {
      src: "/review-trust.svg", 
      alt: "Trustpilot",
    },
  },

  

  reviews: [
    {
      id: 1,
      date: "Aug 2026",
      quote:
        '“Easy to use and I could see my options without spending hours searching.”',
      customer: {
        name: "Sarah M.",
        location: "Personal Loan",
        image: {
          src: "/profile-1.svg",
          alt: "Sarah M.",
        },
      },
    },
    {
      id: 2,
      date: "Jun 2026",
      quote:
        '“I liked being able to compare everything before deciding.”',
      customer: {
        name: "Michael R.",
        location: "Debt Consolidation",
        image: {
          src: "/profile-2.svg",
          alt: "Michael R.",
        },
      },
    },
    {
      id: 3,
      date: "Mar 2026",
      quote:
        '“The whole process was clear and didn’t take long.”',
      customer: {
        name: "David L.",
        location: "Business Loan",
        image: {
          src: "/profile-3.svg",
          alt: "David L.",
        },
      },
    },
  ],
  
} as const

export const FAQ_CONTENT = {
  header: "Frequently Asked Questions",
  subtitle: "Everything you need to know before exploring your loan options.",
  faqs: [
    {
      id: 1,
      question: "Will checking my loan options affect my credit score?",
      answer:
        "Checking initial options may involve a soft credit check, which does not affect your credit score. A lender may carry out a hard credit check if you continue with an application.",
    },
    {
      id: 2,
      question: "Can I see options from more than one lender?",
      answer:
        "Yes. Depending on your details, you may be able to review options from lenders in our network.",
    },
    {
      id: 3,
      question: "How long does it take?",
      answer:
        "The initial form only takes a few minutes. Approval and funding times depend on the lender.",
    },
    {
      id: 4,
      question: "What types of loans can I compare?",
      answer:
        "Available options may include personal loans, auto loans, mortgages, debt consolidation loans, business loans and other types of financing.",
    },
    {
      id: 5,
      question: "Are there any fees?",
      answer:
        "Fees depend on the lender and loan. Check the full loan terms before accepting an offer.",
    },
    {
      id: 6,
      question: "How are my options selected?",
      answer:
        "Your details, requested loan amount and lender requirements are used to identify possible matches.",
    },
    {
      id: 7,
      question: "Is my information secure?",
      answer:
        "We use security measures designed to protect the information you submit.",
    },
    {
      id: 8,
      question: "How soon can I get the money?",
      answer:
        "It depends on the lender, approval process and your bank. Some lenders may fund approved loans quickly, while others may take longer.",
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



export const NEED_CONTENT = {
  header: "Loans For Different Needs",
  description:
    "Whatever you’re planning or dealing with, you can explore loan options that fit different situations.",
  needs: [
    {
      title: "Personal Loans",
      description:
        "For everyday expenses, larger purchases or other personal needs.",
      image: {
        src: "/need-1.svg",
        alt: "Personal Loans",
      },
      circleColor: "#FFD759",
    },
    {
      title: "Debt Consolidation",
      description:
        "See options that may help you combine eligible debts into one payment.",
      image: {
        src: "/need-2.svg",
        alt: "Debt Consolidation",
      },
      circleColor: "#3B82F6",
    },
    {
      title: "Mortgage Loans",
      description:
        "Explore financing options for buying or refinancing a home.",
      image: {
        src: "/need-3.svg",
        alt: "Mortgage Loans",
      },
      circleColor: "#04DA8D",
    },
    {
      title: "Auto Loans",
      description: "Find financing options for a new or used car.",
      image: {
        src: "/need-4.svg",
        alt: "Auto Loans",
      },
      circleColor: "#3B82F6",
    },
    {
      title: "Home Improvement",
      description:
        "Explore loans for repairs, upgrades and renovation projects.",
      image: {
        src: "/need-5.svg",
        alt: "Home Improvement",
      },
      circleColor: "#04DA8D",
    },
    {
      title: "Business Loans",
      description: "See funding options for eligible business expenses.",
      image: {
        src: "/need-6.svg",
        alt: "Business Loans",
      },
      circleColor: "#FFD759",
    },
    {
      title: "Student Loans",
      description: "Explore financing options for eligible education costs.",
      image: {
        src: "/need-7.svg",
        alt: "Student Loans",
      },
      circleColor: "#04DA8D",
    },
    {
      title: "Emergency Expenses",
      description: "Find options for unexpected bills and urgent expenses.",
      image: {
        src: "/need-8.svg",
        alt: "Emergency Expenses",
      },
      circleColor: "#FFD759",
    },
  ],
} as const

export const FOOTER_CONTENT = {
  logo: "/footer-logo.svg",
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms and Conditions", href: "/terms-of-use" },
  ],
  disclaimer:
    "USA Loans Today is not a lender. We connect consumers with third-party lenders and lending partners. Rates, terms, loan amounts and approval depend on the lender and your eligibility. Completing the form does not guarantee approval or funding.",
  copyrightText: "Copyright © 2026 USA Loans Today. All Rights Reserved.",
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
