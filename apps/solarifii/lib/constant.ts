//  sections constants

export const HERO_CONTENT = {
  headline: "You Won't Believe How Affordable New Windows Can Be!",
  description: "Enter your ZIP Code to see local solar offers and the next step for your home.",
  topDescription: "Quick 2-minute eligibility check",
  icon: "/zap.svg",
  image: {

    src: "/hero-bg.png",
    alt: "Windows"
  },

} as const



export const STEPS_CONTENT = {
  sectionTitle: "How the Solar Eligibility Check Works",
  steps: [
    {
      id: "01",
      title: "Enter Your ZIP Code",
      description: "Check solar availability in your area.",
      icon: "/location.svg",
    },
    {
      id: "02",
      title: "Answer a Few Questions",
      description: "Tell us about your home and electricity bill.",
      icon: "/step-2.svg",
    },
    {
      id: "03",
      title: "Get Matched With Providers",
      description: "See solar offers available near you.",
      icon: "/step-3.svg",
    },
  ],
  stepNote: "Eligibility and offers vary by location and home details",
  stepImage: {
    src: "/info.svg",
    alt: "Step Image",
  },
} as const 





export const FOOTER_CONTENT = {
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
    { text: "Do Not Sell My Info", href: "/do-not-sell-my-info" },
  ],
  copyrightText: "Copyright © 2026 Solarifii.com.  All Rights Reserved.",
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
