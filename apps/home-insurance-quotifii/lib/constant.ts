//  sections constants

export const HERO_CONTENT = {
  headline: "See Veteran Friendly Auto Rates in Your <City Name>",
  image: {
    src: "/hero.webp",
    alt: "Veterans in military uniform"
  },
  features: [
    { text: "Curated insurance matches", image: "/hero-1.svg", alt: "flag icon" },
    { text: "Trusted savings, made simple", image: "/hero-2.svg", alt: "money icon" },
    { text: "+5 million matches delivered", image: "/hero-3.svg", alt: "user icon" },
  ],
  
} as const

export const PARTNERS_CONTENT = {
  header: "We Work With Top-Rated Insurance Partners Nationwide",

  partners: [
    { alt: "Partner 1", src: "/partner-1.svg"  },
    { alt: "Partner 2", src: "/partner-2.svg"  },
    { alt: "Partner 3", src: "/partner-3.svg"  },
    { alt: "Partner 4", src: "/partner-4.svg"  },
    { alt: "Partner 5", src: "/partner-5.svg"  },
    { alt: "Partner 6", src: "/partner-6.svg"  },
  ],
} as const

export const OPTIONS_CONTENT = {
  header: "Ready To See Options That Fit You?",

 
  featureList: [
    {  text: "Free to check" },
    {  text: "No obligation" },
    {  text: "Your details stay private" },
  ],
} as const

export const REVIEW_CONTENT = {
  header: "Hear From Veterans Who Found a Better Fit",
  verifiedBadge: {
    src: "/review-vector.svg",
    alt: "Verified",
    label: "Verified Customer",
  },
  reviews: [
    {
     id: 1,
      quote: "Quick and straightforward. I could compare options in one place and didn't feel pressured to buy right away.",
      customer: {
        name: "JMark Keeling",
        location: "Army Veteran, Texas",
        status: "Verified Customer",
        image: {
          src: "/profile-1.svg",
          alt: "Jessica R.",
        },
      },
    },
    {
      id: 2,
      quote: "The steps were clear, and I knew what information I needed before starting. It saved me time calling around",
      customer: {
        name: "Beth Sawayn",
        location: "Navy Veteran, Florida",
        status: "Verified Customer",
        image: {
          src: "/profile-2.svg",
          alt: "Mark & Emily S.",
        },
      },
    },
    {
     
      id: 3,
      quote: "Helpful to see different coverage choices side by side. Made it easier to pick something that fit my budget.",
      customer: {
        name: "Jimmie Hills Jr.",
        location: "Marine Veteran, Ohio",
        status: "Verified Customer",
        image: {
          src: "/profile-3.svg",
          alt: "Susan Roberts",
        },
      },
    },
  ],
} as const

export const FEATURES_CONTENT = {
  header: "A Smarter Way To Shop For Coverage",
  steps: [
    {
      number: 1,
      title: "Multi-Vehicle Savings",
      description: "One household, more than one car? Bundle options in seconds and see what changes.",
      image: {
        src: "/feature-1.svg",
        alt: "Multi-Vehicle Savings",
      },
    },
    {
      number: 2,
      title: "Safe Driver Discounts",
      description: "If you drive sensibly, your rate should notice. We help you spot discounts you may qualify for.",
      image: {
        src: "/feature-2.svg",
        alt: "Safe Driver Discounts",
      },
    },
    {
      number: 3,
      title: "24/7 Roadside Assistance",
      description: "Flat tire, dead battery, surprise breakdown. Check plans that keep help a call away, day or night.",
      image: {
        src: "/feature-3.svg",
        alt: "24/7 Roadside Assistance",
      },
    },
  ],
} as const

export const FOOTER_CONTENT = {
  description: "The Smart Way to Shop For Insurance.",
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Contact ", href: "/contact" },
  ],
  disclaimer:
  'For quality control purposes, your activity on this site may be monitored or recorded by Quotifii or its service providers.',
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
