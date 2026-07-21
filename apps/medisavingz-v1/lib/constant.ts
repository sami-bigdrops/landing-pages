//  sections constants



export const NAVBAR_CONTENT = {
  contactPhoneLabel: "855-581-3316",
  contactPhoneHref: "tel:+18555813316",
} as const

export const HERO_CONTENT = {
  headline: "Compare Medicare Options Around Your Doctors, Prescriptions, and Budget",
  description:
    "We make it easier to compare Medicare options based on what actually affects your day-to-day life like your doctors, your medicines, your pharmacy, your monthly costs and the care you may need later.",

    badge: [
      {
        text: "Trusted by 10k+ Beneficiaries",
        icon: "/shield.svg",
      },
      
    ],
    
   
  image: {
    alt: "Seniors comparing Medicare options on a phone",
    src: "/hero-medicare.webp",
  },
  
 
  
} as const

export const RIBBON_CONTENT = {
  badges: [
    {
      icon: "/ribbon-1.svg",
      label: "Licensed Guidance",
    },
    {
      icon: "/ribbon-2.svg",
      label: "No-Pressure Review",
    },
    {
      icon: "/ribbon-3.svg",
      label: "Doctor And Prescription Check",
    },
    {
      icon: "/ribbon-4.svg",
      label: "Plan Availability Varies By Area",
    },
  ]
}




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
  ]
} as const;

export const STEPS_CONTENT = {
  header: "Find Medicare Coverage That Fits Your Everyday Needs",
  description: "Before comparing plans, we look at the care you already use, the prescriptions you take, the pharmacy you prefer and the budget you want to protect.",
  steps: [
    {
      number: 1,
      title: "Your Doctors",
      description:
        "Keep your care team in view. We help you check whether your doctors, specialists, hospitals and clinics may be included before you make a plan decision.",
      image: {
        src: "/step-1.svg",
        alt: "Your Doctors",
      },
    },
    {
      number: 2,
      title: "Your Prescriptions",
      description:
        "One uncovered medicine can change the whole picture. We help review your medication list, drug tiers, pharmacy options and estimated yearly costs.",
      image: {
        src: "/step-2.svg",
        alt: "Your Prescriptions",
      },
    },
    {
      number: 3,
      title: "Your Pharmacy",
      description:
        "Your plan and pharmacy need to work together. We help check preferred pharmacies, mail-order options and possible cost differences.",
      image: {
        src: "/step-3.svg",
        alt: "Your Pharmacy",
      },
    },
    {
      number: 4,
      title: "Your Budget",
      description:
        "A low premium is only one part of the story. We help you compare premiums, copays, deductibles, drug costs and possible out-of-pocket exposure.",
      image: {
        src: "/step-4.svg",
        alt: "Your Budget",
      },
    },
  ],
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




export const FAQ_CONTENT = {
  header: "Frequently Asked Questions",
  subheader: "Get quick answers to some of the most common questions people have when comparing Medicare coverage options.",
  faqs: [
    {
      id: 1,
      question: "Is a Medicare Advantage plan really free?",
      answer:
        "Not always. Some Medicare Advantage plans have a $0 monthly premium, but that does not mean $0 healthcare costs. You may still pay Part B premiums, copays, coinsurance, drug costs, dental limits and other out-of-pocket expenses.",
    },
    {
      id: 2,
      question: "Will my doctor be covered?",
      answer:
        "That depends on the plan. Some Medicare Advantage plans use provider networks, so your doctors, specialists, hospitals and pharmacies should be checked for authorization.",
    },
    {
      id: 3,
      question: "What happens if my medicine is not covered?",
      answer:
        "Plans can change their drug lists each year. If your medicine is not covered, you might pay full cost, require prior authorization, or switch to an alternative. Talk with your plan or professional to ensure medicine is included before choosing a plan.",
    },
    {
      id: 4,
      question: "What is the difference between Medicare Advantage and Medigap?",
      answer:
        "Medicare Advantage is an alternative way to receive Medicare coverage, often in a privately-run all-in-one health plan. It can include drug coverage, dental, vision, hearing, wellness, and more. Medigap (Medicare Supplement) helps pay for out-of-pocket costs after Medicare pays, like copays, coinsurance and deductibles.",
    },
    {
      id: 5,
      question: "Can I change Medicare plans later?",
      answer:
        "Yes. You can switch plans each year during certain periods. Timing matters because switching is only allowed at certain times. Review rules before you switch.",
    },
    {
      id: 6,
      question: "What is prior authorization?",
      answer:
        "Prior authorization means a plan may need to approve certain services, drugs or treatments before they’re covered and paid for. If your service or drug is refused without authorization, the plan may decline to cover it, so it should be checked before using.",
    },
    {
      id: 7,
      question: "Can my Medicare plan change next year?",
      answer:
        "Yes. Plans change networks, costs, covered medicines, drug formularies, pharmacy lists and extra benefits year to year. Always review your Annual Notice of Change or talk to your plan.",
    },
    {
      id: 8,
      question: "How do I avoid Medicare scams?",
      answer:
        "Only share personal information, like your Medicare ID, if you contact Medicare directly, or after verifying an agent’s credentials. Beware unsolicited calls, offers, or pressure tactics; report abuse or fraud as needed.",
    },
  ],
} as const




export const FOOTER_CONTENT = {
  linkRows: [
    [
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Terms of Use", href: "/terms-of-use" },
      { text: "Contact", href: "/contact" },
    ],
  ],

  copyrightText: "Copyright © 2026 Cheap Auto Insurance Options. All Rights Reserved.",
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
