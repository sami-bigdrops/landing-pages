export const SITE_BRAND = {
  name: "Nation One Debt Relief",
  description:
    "Nation One Debt Relief is a debt relief company that helps people get out of debt.",
} as const

export const COLORS_CONSTANTS = {
  white: "#FFFFFF",
  heading: "#111827",
  description: "#374151",
} as const

export const FONT = {
  inter: "Inter",
  interVariable: "--font-sans",
} as const

export const COLORS = {
  textWhite: "text-white",
  textHeading: "text-[#111827]",
  textDescription: "text-[#374151]",
  fontInter: "font-sans",
} as const



//  sections constants


export const HERO_CONTENT = {
  headline: "Find a Smarter Way Out of Debt",
  description: "Answer a few quick questions to see what debt relief options may fit your financial situation.",
  
  partners: [
    { alt: "trustpilot", src: "/hero-1.svg", className: "w-22 md:w-22 lg:w-22 xl:w-28 overflow-hidden object-contain" },
    { alt: "bbb", src: "/hero-2.svg", className: "w-26 md:w-26 lg:w-26 xl:w-33 overflow-hidden object-contain" },
    { alt: "google", src: "/hero-3.svg", className: "w-22 md:w-22 lg:w-22 xl:w-28 overflow-hidden object-contain" },
  ],

  
} as const

export const RIBBON_CONTENT = {
  items: [
    {
      icon: "/tick.svg",
      text: "Potentially Reduce Your Debt By Up To 44%*",
    },
    {
      icon: "/tick.svg",
      text: "Programs Typically Last 24–48 Months*",
    },
    {
      icon: "/tick.svg",
      text: "Free Consultation. No Upfront Fees.",
    },
  ],
} as const


export const FEATURES_CONTENT = {
  header: "How It Works",
  steps: [
    {
      number: 1,
      title: "Tell Us About Your Debt",
      description: "Share a few details about your current debt. A specialist will reach out to understand your situation.",
      image: {
        src: "/feature-1.svg",
        alt: "Debt information icon",
      },
    },
    {
      number: 2,
      title: "Get a Plan That Fits",
      description: "Explore debt relief options shaped around your budget, financial needs and goals.",
      image: {
        src: "/feature-2.svg",
        alt: "Plan fit icon",
      },
    },
    {
      number: 3,
      title: "Take Steps Towards Debt Freedom",
      description: "Follow your personalized plan with support as you work towards reducing your debt.",
      image: {
        src: "/feature-3.svg",
        alt: "Debt freedom icon",
      },
    },
  ],
} as const



export const FOOTER_CONTENT = {
  description: SITE_BRAND.description,
  linkHeader: "Company",
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms and Conditions", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © 2026 Nation One Debt Relief. All Rights Reserved.",
  disclaimer:
    "Please note that all calls with the company may be recorded or monitored for quality assurance and training purposes. *Clients who are able to stay with the program and get all their debt settled realize approximate savings of 46% before fees, or 25% including our fees, over 24 to 48 months. All claims are based on enrolled debts. Not all debts are eligible for enrollment. Not all clients complete our program for various reasons, including their ability to save sufficient funds. Estimates based on prior results, which will vary based on specific circumstances. We do not guarantee that your debts will be lowered by a specific amount or percentage or that you will be debt-free within a specific period of time. We do not assume consumer debt, make monthly payments to creditors or provide tax, bankruptcy, accounting or legal advice or credit repair services. Not available in all states. Please contact a tax professional to discuss tax consequences of settlement. Please consult with a bankruptcy attorney for more information on bankruptcy. Depending on your state, we may be available to recommend a local tax professional and/or bankruptcy attorney. Read and understand all program materials prior to enrollment, including potential adverse impact on credit rating.",
} as const


export const THANKYOU_CONTENT = {
  title: "Expect our call soon!",
  titleFallback: "Expect our call soon!",
  subtitle:
    "A Nation One Debt Relief representative will be contacting you shortly by phone or email to go over solutions that fit your specific need",
  contactTitle: "Call or text us",
  contactPhoneLabel: "",
  contactPhoneHref: "",
  confirmationTitle: "Expect our call soon!",
  confirmationDescription:
    "A Nation One Debt Relief representative will be contacting you shortly by phone or email to go over solutions that fit your specific need",
} as const

export interface ThankYouType2FeatureCard {
  title: string
  iconSrc: string
  bulletPoints?: string[]
}

export interface ThankYouType2Content {
  title: string
  partnerName: string
  partnerLogo: { src: string; alt: string }
  confirmationMessage: string
  confirmationEmailSentNote?: string
  contactPhoneLabel?: string
  contactPhoneHref?: string
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
}

export const THANKYOU_REQUIRE_EMAIL_IN_PARAMS = true

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = {
  title: "Expect our call soon!",
  partnerName: SITE_BRAND.name,
  partnerLogo: {
    src: "/logo.svg",
    alt: `${SITE_BRAND.name} logo`,
  },
  confirmationMessage:
    "A Nation One Debt Relief representative will be contacting you shortly by phone or email to go over solutions that fit your specific need",
  aboutSectionTitle: "",
  featureCards: [
    {
      title: "Free consultation",
      iconSrc: "/thankyou-icon-1.svg",
    },
    {
      title: "See personalized options",
      iconSrc: "/thankyou-icon-2.svg",
    },
  ],
}

export const TCPA_PARTNER_NAMES = [
  "AgentAssistant",
  "Agents Corner LLC",
  "Amplify My Business",
  "AP Investments LLC",
  "Assent",
  "Astoria",
  "Benchmark CI",
  "Bill Maier",
  "Billy.com",
  "Blackstone Home Buyers LLC",
  "Boss Leads",
  "Century 21 Aadvantage Gold",
  "Chris Tellez",
  "CONSTELLATION ROOF LLC",
  "Credit.com",
  "Dane Wiseman",
  "DBK Distributions",
  "Digital Treetop",
  "Economy Properties",
  "Fairway Independent Mortgage Corporation",
  "GVG Capital",
  "GVG Holdings",
  "Home Advisor",
  "Home Buyer Team LLC",
  "Homeowner Pulse LLC",
  "Homebird",
  "HomeGo",
  "HomeLight, Inc.",
  "HomeMatch, its partners, and parties acting on their behalf",
  "homes.com",
  "Homevestors",
  "Ideal Agent",
  "ispeedtolead.com",
  "Imortgage.com",
  "Jeremy Olsher",
  "Jerimiah Taylor",
  "Jessica Gray",
  'Keller Williams Realty "The Market Place 1"',
  "Khalid Alqahtani",
  "Leadzolo LLC",
  "Lead Geeks",
  "Liberty AI",
  "Listing Advocate LLC DBA",
  "Loan Depot",
  "Local Buyer LLC",
  "Marina Nazari",
  "Mark Hufford",
  "Matt Daniell",
  "Max House Properties",
  "Michael Robinson",
  "MN Group",
  "Motivated Leads",
  "Motivated Sellers",
  "Movement Mortgage",
  "MyLuxuryHome.Co with Keller Williams Realty",
  "Need To Sell My Home Fast",
  "New Western and its affiliates and subsidiaries as identified in its Privacy Policy",
  "OfferClimb",
  "Offerpad",
  "Ojo Labs",
  "Opcity",
  "OpCity Inc.",
  "Pacific Mortgage Center",
  "Patty Hopkins",
  "Plateau Data Services, LLC",
  "PrimeStreet",
  "Property Leads",
  "Quinstreet",
  "Rapid Home Solutions",
  "Real Estate Bees",
  "Real Estate Marketplace",
  "Realtor.com",
  "Realty.com LLC",
  "Redefy",
  "Request Results",
  "Resource Marketing Corp.",
  "RVNU LLC",
  "Saygo Home Offers",
  "Sebastian Frey",
  "Sell My House Fast LLC",
  "SFR Go",
  "Smart Leads",
  "Sold.com",
  "Suited Connector, LLC",
  "Swift Homes",
  "The Home Improvement Specialist",
  "The Mitchell Group",
  "The Owner Advocate",
  "The Listing Advocate",
  "Theresa Diele",
  "THK Investments",
  "Tigfors LLC",
  "TML Realty, Inc",
  "Tony Elias",
  "Top Agent Marketing Solutions",
  "Township Mortgage Inc.",
  "True Properties",
  "Tyler Hungerford",
  "United Wholesale Mortgage",
  "Unlock",
  "Wade Warner",
  "We Buy Homes Near You LLC",
  "Wisdom Companies",
  "X5 Ventures",
  "Zillow",
  "Uncle Sam Buys Homes",
] as const

export const REJECTED_PAGE_CONTENT = {
  title: "We can't make an offer right now",
  leadMessage:
    "We weren't able to match your property with a buyer at this time.",
  defaultDetail:
    "Please double-check your details and try again later.",
  codeMessages: {
    1013:
      "This request couldn't be verified. Please review your details and try again.",
    1025:
      "No buyer was available for this property right now. Please try again later.",
  } as Record<number, string>,
  partnerLogo: { src: "/logo.svg", alt: `${SITE_BRAND.name} logo` },
}
