export const SITE_BRAND = {
  name: "Gov Mortgage Options",
  description:
    "Gov Mortgage Options helps homeowners explore mortgage and refinance options. Compare rates, see if you could save, and connect with licensed professionals.",
  email: "contact@govmortgageoptions.com",
} as const

//  sections constants

export const HERO_CONTENT = {
  headline: "UPDATED HELOC RATES",
  headlineSecondary: "CHECK YOUR ZIP CODE",
  zipPlaceholder: "Please enter ZIP code",
  ctaButton: "See Savings",
  image: {
    src: "/hero-img.webp",
    alt: "Modern home",
  },
} as const

export const HERO_NOTIFICATIONS = [
  { name: "Mauri",   city: "Hudson, NY",      message: "Inquired about HELOC rates!" },
  { name: "Jake",    city: "Austin, TX",       message: "Just checked their HELOC options!" },
  { name: "Sarah",   city: "Denver, CO",       message: "Got an estimate for a HELOC!" },
  { name: "Michael", city: "Nashville, TN",    message: "Compared today's HELOC rates!" },
  { name: "Emma",    city: "Phoenix, AZ",      message: "Requested a free HELOC rate estimate!" },
  { name: "David",   city: "Charlotte, NC",    message: "Locked in a lower HELOC rate today!" },
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
  header: "Why Choose a HELOC?",
  subtitle: "These are just a few of the benefits of a home equity line of credit.",
  zipPlaceholder: "Please enter ZIP code",
  ctaButton: "See Savings",
  items: [
    {
      icon: "/why-1.svg",
      title: "Borrow only what you need",
      description:
        "A HELOC works like a credit line tied to your home. Take money out when you need it, and you only pay interest on what you actually use.",
    },
    {
      icon: "/why-2.svg",
      title: "Fund your biggest goals",
      description:
        "Put the equity you have built up toward home projects, school costs, or paying down high-interest debt. Your current mortgage stays in place.",
    },
    {
      icon: "/why-3.svg",
      title: "Cash when you need it",
      description:
        "You can take money out, pay it back, and borrow again during the draw period. That way funds are ready for surprises or projects you have planned.",
    },
    {
      icon: "/why-4.svg",
      title: "Beat credit card rates",
      description:
        "HELOC rates are usually lower than credit cards because your home backs the loan. That can help you save when you need to borrow more.",
    },
  ],
} as const

export const EXPERTS_CONTENT = {
  eyebrow: "ASK THE EXPERTS",
  header: "Is now the right time to get a HELOC?",
  zipPlaceholder: "Please enter ZIP code",
  ctaButton: "See Savings",
  items: [
    {
      name: "Rachel Donovan, CFP",
      role: "Senior Wealth Advisor, Harborline Financial",
      avatar: "/experts/rachel.jpg",
      quote:
        "Right now, a HELOC can make sense if you want flexible access to funds and can handle a variable rate. It is not the right move if you are using it to cover everyday budget gaps or discretionary spending, because that turns your home into collateral for short-term cash flow problems that can spiral out of control.",
    },
    {
      name: "Marcus Ellison",
      role: "Private Wealth Advisor, Northbridge Capital Group",
      avatar: "/experts/marcus.jpg",
      quote:
        "I always tell my clients that the best time to get a loan is before you actually need it. With HELOCs, I do not push people to time the market because they are floating-rate loans, meaning the rate will move as interest rates go up and down. With a fixed-rate mortgage, locking in at 6% versus 4.5% is a big deal. With a HELOC, timing matters less because the rate can adjust later.",
    },
    {
      name: "Lauren Pratt, CFP",
      role: "Founder and Financial Planner, ClearPath Wealth",
      avatar: "/experts/lauren.jpg",
      quote:
        "I favor a HELOC if you are a disciplined borrower. It works like a flexible tool: you can use the money when you need it, pay it down, and draw again later. That is harder to do with a traditional home equity loan. Some lenders even let you lock in a fixed rate on part of the balance if you want more predictability.",
    },
    {
      name: "Daniel Brooks",
      role: "Mortgage Strategist, Crestview Lending Advisors",
      avatar: "/experts/daniel.jpg",
      quote:
        "A HELOC is often a smarter fit than credit cards for big ticket costs like renovations or tuition. You still need a plan for repayment. If the payment only works when rates stay flat, you may want to borrow less or wait until your budget has more room.",
    },
    {
      name: "Sophia Nguyen, CFP",
      role: "Financial Planner, Riverton Wealth Partners",
      avatar: "/experts/sophia.jpg",
      quote:
        "I tell homeowners to set up a HELOC when their credit and equity look strong, even if they do not need the money today. Having the line ready means you are not scrambling later. Just avoid treating it like free cash. Only draw what you can repay comfortably.",
    },
    {
      name: "James Whitaker",
      role: "Home Equity Specialist, Summit Home Finance",
      avatar: "/experts/james.jpg",
      quote:
        "Shop more than one lender. HELOC rates, fees, and draw periods can vary a lot. A slightly lower rate or a longer interest-only window can save real money over time, especially if you plan to use the line more than once.",
    },
    {
      name: "Amy Castillo",
      role: "Consumer Finance Analyst, Lakewood Advisory Group",
      avatar: "/experts/amy.jpg",
      quote:
        "HELOCs shine when your need for cash is uneven. Think phased home projects or consolidating high interest debt over several months. If you need one lump sum and want a fixed payment, a home equity loan may feel simpler.",
    },
    {
      name: "Kevin Marshall, CFP",
      role: "Wealth Manager, Oak Street Planning",
      avatar: "/experts/kevin.jpg",
      quote:
        "Before you tap equity, run the numbers with today's rate, not the rate you hope for next year. If the payment fits now and the purpose builds value or lowers cost elsewhere, a HELOC can be a useful tool. If not, leave the equity alone.",
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

export const FORM_TCPA_TEXT =
  'By clicking "Submit Details," I electronically sign and agree that GovMortgageOptions.com may collect, use, and share my information, including my self-reported credit information, with its Partners to provide information about mortgage, home equity, refinancing, insurance, and other financial products and services. I provide my prior express written consent for GovMortgageOptions.com and the specifically identified Partners to contact me at the telephone number provided regarding these products and services, including through automated dialing systems, prerecorded or artificial voice calls, and SMS/text messages, even if my number is listed on a Do Not Call registry. Consent is not a condition of purchasing any product or service. I agree to the Terms of Use and Privacy Policy. I may revoke consent at any time by emailing consent@govmortgageoptions.com or replying STOP to a text message.'

export const FOOTER_NEWS = {
  label: "YAHOO FINANCE",
  href: "https://finance.yahoo.com/real-estate/articles/heloc-loans-making-comeback-homeowners-090108275.html",
  headline:
    "HELOC loans are making a comeback as homeowners look for new ways to borrow cash",
} as const

export const FOOTER_MARKETING_DISCLAIMER =
  "GOVMortgageOptions provides marketing services for various companies involved in mortgage refinance. The information you provide to us is provided to these companies in real time. If the information you provide to us matches the criteria they are seeking, they will contact you directly. In many cases we may deploy SMS to you to facilitate an inbound call to the service or product provider. We are paid by such providers for each consumer they contact directly and/or provide services or products. You are not charged for our services. We do not guarantee that a provider will accept your request or that their products or services will meet your needs. Their services and products may or may not be the best product or service available on the market. Completing our forms does not obligate you to purchase a service or product nor does it obligate a product or service provider to provide you with any particular service about which you may have inquired. We only accept referrals for U.S. Citizens on this Website and we specifically exclude all other countries including but not limited to Canadian and European Union Member Citizens referrals."

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
