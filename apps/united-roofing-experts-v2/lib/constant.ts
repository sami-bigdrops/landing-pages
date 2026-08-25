//  sections constants

export const HERO_CONTENT = {
  headline: "What Would a New Metal Roof Cost for Your Home?",
  description: "(Answer the question below to get started!)",
  subtitle: "Are you a homeowner?",

  subheadline: "These Next-Generation Metal Roofs Look Like Shingle, Tile or Wood, but They're as Strong as Steel! And You Won't Believe How Affordable They Can Be!",


  image: {
    src: "/hero-bg.webp",
    alt: "Roof"
  },

  heroSubheadlineImage: {
    src: "/hero-sub-img.webp",
    alt: "Roof"
  }
  
 
    
  
} as const




export const FOOTER_CONTENT = {
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms and Conditions ", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © UnitedRoofingExperts.com. All Rights Reserved. UnitedRoofingExperts.com is not responsible for the offers, products or services provided by Service Providers.",
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
  confirmationEmailSentNote?: string
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
}

export const THANKYOU_REQUIRE_EMAIL_IN_PARAMS = false

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = {
  title: "Thank you!",
  partnerName: "",
  partnerLogo: { src: "", alt: "" },
  confirmationMessage:
    "Congratulations, you have been matched with \"Brand Name\" and a roofing specialist will contact you soon to schedule your free estimate.",
  confirmationEmailSentNote:
    "A confirmation email has been sent to your email address. If you don't see it in your inbox, please check your spam folder.",
  aboutSectionTitle: "",
  featureCards: [],
}
