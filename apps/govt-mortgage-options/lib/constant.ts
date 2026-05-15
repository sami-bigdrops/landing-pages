export const SITE_BRAND = {
  name: "Gov Mortgage Options",
  description:
    "Gov Mortgage Options helps homeowners explore mortgage and refinance options. Compare rates, see if you could save, and connect with licensed professionals.",
  email: "contact@govmortgageoptions.com",
} as const

//  sections constants

export const HERO_CONTENT = {
  headline: "How Much Can You Cash Out?",
  subtitle: "Get a real-time equity estimate for your home in",
  ctaButton: "See Savings",
  image: {
    src: "/hero-img.webp",
    alt: "Modern home"
  },
  features: [
    { text: "Free to check" },
    { text: "No obligation" },
    { text: "No paperwork to start" },
  ],
} as const

export const HERO_NOTIFICATIONS = [
  { name: "Mauri",   city: "Hudson, NY",      message: "Inquired about current mortgage rates!" },
  { name: "Jake",    city: "Austin, TX",       message: "Just checked their refinancing options!" },
  { name: "Sarah",   city: "Denver, CO",       message: "Got an estimate for cash-out refinancing!" },
  { name: "Michael", city: "Nashville, TN",    message: "Compared today's mortgage rates!" },
  { name: "Emma",    city: "Phoenix, AZ",      message: "Requested a free rate estimate!" },
  { name: "David",   city: "Charlotte, NC",    message: "Locked in a lower mortgage rate today!" },
] as const

export const PARTNERS_CONTENT = {
  header: "We Partner with TOP Providers",

  partners: [
    { alt: "Partner 1", src: "/partner-1.svg"  },
    { alt: "Partner 2", src: "/partner-2.svg"  },
    { alt: "Partner 3", src: "/partner-3.svg"  },
    { alt: "Partner 4", src: "/partner-4.svg"  },
  ],
} as const

export const WHY_CONTENT = {
  header: "Why Refinance Your Mortgage?",
  subtitle: "A quick check can show whether refinancing could better fit your budget and goals.",
  items: [
    {
      icon: "/why-1.svg",
      title: "Lower your monthly payment",
      description: "If today's rates are better than yours, your payment may drop.",
    },
    {
      icon: "/why-2.svg",
      title: "Use your home equity",
      description: "Access equity for big needs, with a plan that keeps costs clear.",
    },
    {
      icon: "/why-3.svg",
      title: "Pay off your loan faster",
      description: "Switch to a shorter term if the numbers work for you.",
    },
    {
      icon: "/why-4.svg",
      title: "Lock in a rate you can live with",
      description: "Move to a more stable option if you want fewer surprises.",
    },
  ],
} as const

export const OPTIONS_CONTENT = {
  header: "See If Your Mortgage Could Cost Less Today",

 
  featureList: [
    {  text: "Free to check" },
    {  text: "No obligation" },
    {  text: "Your details stay private" },
  ],
} as const

export const FOOTER_AP_NEWS = {
  label: "APNEWS",
  href: "https://apnews.com/article/trump-economy-inflation-interest-rates-borrowing-6ef86392b080ca963ec633546009409b",
  headline: "Trump demands interest rates come down",
} as const

export const FOOTER_MARKETING_DISCLAIMER =
  "GovLoanOptions.com provides marketing services for various companies involved in mortgage refinance. The information you provide to us is provided to these companies in real time. If the information you provide to us matches the criteria they are seeking, they will contact you directly. In many cases we may deploy SMS to you to facilitate an inbound call to the service or product provider. We are paid by such providers for each consumer they contact directly and/or provide services or products. You are not charged for our services. We do not guarantee that a provider will accept your request or that their products or services will meet your needs. Their services and products may or may not be the best product or service available on the market. Completing our forms does not obligate you to purchase a service or product nor does it obligate a product or service provider to provide you with any particular service about which you may have inquired. We only accept referrals for U.S. Citizens on this Website and we specifically exclude all other countries including but not limited to Canadian and European Union Member Citizens referrals."

export const FOOTER_CONTENT = {
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © 2026 GovMortgageOptions.com. All Rights Reserved.",
} as const

export const THANKYOU_CONTENT = {
  title: "Thank you!",
  subtitle: `Your request has been received. A ${SITE_BRAND.name} specialist will contact you shortly about your mortgage options.`,
  confirmationTitle:
    "A confirmation message has been sent to your email address.",
  confirmationDescription:
    "The message contains next steps for your request. Please check your spam folder if you don't see it in your inbox.",
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
  subheading?: string
  confirmationMessage: string
  partnerLogo?: { src: string; alt: string }
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
  notQualifiedTitle?: string
  notQualifiedMessage?: string
}

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = {
  title: "Thank You",
  subheading: "Your mortgage application has been submitted successfully.",
  confirmationMessage:
    "We will reach you shortly. Our team of mortgage experts will contact you within 24 hours to discuss your options and answer any questions you may have. We're here to help make your homeownership dreams come true.",
  notQualifiedTitle: "We're Unable to Assist at This Time",
  notQualifiedMessage:
    "Thank you for your interest. Unfortunately, we're not able to process your request right now as your area may not be serviceable by our current network of partners. We encourage you to check back later, as our coverage is updated regularly.",
  aboutSectionTitle: "",
  featureCards: [
    {
      title: "Compare your options",
      icon: "shield",
      bulletPoints: [
        "See whether refinancing could lower your payment",
        "Explore cash-out and rate-and-term paths",
        "Free to check with no obligation",
      ],
    },
    {
      title: "Licensed professionals",
      icon: "building",
      bulletPoints: [
        "Connect with mortgage specialists in our network",
        "Get clear answers about rates and next steps",
        "Designed for U.S. homeowners",
      ],
    },
    {
      title: "Straightforward process",
      icon: "check",
      bulletPoints: [
        "Share a few details to get started",
        "We follow up within 24 hours on business days",
        "Questions? Email us anytime",
      ],
    },
  ],
}
