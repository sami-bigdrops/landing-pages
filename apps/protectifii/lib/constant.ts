//  sections constants

export const HERO_CONTENT = {
  headline: "*Save Up To $900 A Year On Auto Insurance.",
  description:
    "Why pay more than you need to? Compare quotes from multiple insurers and find coverage that fits your needs and budget.",

  badge: [
    {
      icon: "/hero-1.svg",
    },
    {
      text: "Free to compare",
      icon: "/hero-2.svg",
    },
    {
      text: "No obligation",
      icon: "/hero-3.svg",
    },
  ],
    
   
  image: {
    alt: "Protectifii",
    src: "/hero.webp",
  },
  
 
  
} as const

export const PARTNERS_CONTENT = {
  

  partners: [
    { alt: "progressive", src: "/partner-5.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "nationwide", src: "/partner-1.svg", className: "w-30 md:w-28 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "allstate", src: "/partner-2.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "liberty mutual", src: "/partner-3.svg", className: "w-30 md:w-25 lg:w-33 xl:w-46 overflow-hidden object-contain" },
    { alt: "root insurance", src: "/partner-4.svg", className: "w-16 md:w-14 lg:w-14 xl:w-19 overflow-hidden object-contain" },
    { alt: "the general", src: "/partner-6.svg", className: "w-27 md:w-28 lg:w-25 xl:w-30 overflow-hidden object-contain" },
  ],
} as const

export const OPTIONS_CONTENT = {
  header: "Your Next Auto Insurance Quote Could Save You Hundreds.",
  description: "Enter your ZIP code, compare available rates and see how much you could save on your auto insurance.",


  
} as const

export const REVIEW_CONTENT = {
  header: "What Our Customers Say",

  reviews: [
    {
      id: 1,
      quote:
        '“I was looking for a better auto insurance rate and wanted to compare my options. Protectifii made the process feel simple and straightforward.”',
      customer: {
        name: "Alex M.",
        location: "Austin, TX",
        image: {
          src: "/profile-1.svg",
          alt: "Alex M.",
        },
      },
    },
    {
      id: 2,
      quote:
        '“I appreciated being able to explore different coverage options in one place instead of having to figure everything out on my own.”',
      customer: {
        name: "Jordan T.",
        location: "San Diego, CA",
        image: {
          src: "/profile-2.svg",
          alt: "Jordan T.",
        },
      },
    },
    {
      id: 3,
      quote:
        '“The experience was easy to follow, and I liked having the chance to look into my options without feeling pressured to make a decision.”',
      customer: {
        name: "Taylor R.",
        location: "Chicago, IL",
        image: {
          src: "/profile-3.svg",
          alt: "Taylor R.",
        },
      },
    },
  ],
} as const

export const FEATURES_CONTENT = {
  header: "Better Coverage. More Ways To Save.",
  steps: [
    {
      number: 1,
      title: "Multi-Vehicle Discounts",
      description: "More than one car? Explore insurance options that could help you save when you cover multiple vehicles under one policy.",
      image: {
        src: "/feature-1.svg",
        alt: "Multi-Vehicle Discounts",
      },
    },
    {
      number: 2,
      title: "Safe Driver Discounts",
      description: "Your good driving record could mean lower premiums. Compare insurers that may reward you for driving safely.",
      image: {
        src: "/feature-2.svg",
        alt: "Safe Driver Discounts",
      },
    },
    {
      number: 3,
      title: "Roadside Assistance",
      description: "Flat tyres, unexpected breakdowns or dead batteries? Explore coverage options that include roadside assistance when you need it.",
      image: {
        src: "/feature-3.svg",
        alt: "Roadside Assistance",
      },
    },
  ],
} as const



export const FOOTER_CONTENT = {
  
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Contact Us", href: "/contact" },
  ],

  copyrightText: "Copyright © 2026 Protectifii. All Rights Reserved.",
  disclaimerText: "*Savings estimates are based on initial quotes from customers who requested insurance quotes through our website. Your actual savings may differ based on your state, personal circumstances, coverage choices, and insurance provider. Individual results are not guaranteed.",
} as const

export const THANKYOU_CONTENT = {
  title: "Thank you!",
  subtitle:
    "Your request has been received. A licensed auto insurance specialist will reach out to you soon with your personalized quotes.",
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
