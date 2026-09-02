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
  headline: "Find Your Debt Relief Options Today",
  description: "Answer a few simple questions to see what solutions may be available for your financial situation.",
  
  partners: [
    { alt: "trustpilot", src: "/hero-1.svg", className: "w-22 md:w-22 lg:w-22 xl:w-28 overflow-hidden object-contain" },
    { alt: "bbb", src: "/hero-2.svg", className: "w-26 md:w-26 lg:w-26 xl:w-33 overflow-hidden object-contain" },
    { alt: "google", src: "/hero-3.svg", className: "w-22 md:w-22 lg:w-22 xl:w-28 overflow-hidden object-contain" },
  ],

  
} as const



export const FORM_CONTENT = {
  header: "Get Your Free Cash Offer on Your Home",
  tabs: {
    vehicleDetails: "PROPERTY DETAILS",
    personalDetails: "YOUR CONTACT INFO",
  },
  fields: {
    carYear: {
      label: "Car Year",
      placeholder: "Select Year",
    },
    carMake: {
      label: "Car Make",
      placeholder: "Select Make",
    },
    carModel: {
      label: "Car Model",
      placeholder: "Select Model",
    },
    currentMileage: {
      label: "Current Mileage",
      placeholder: "Enter Mileage",
    },
    firstName: {
      label: "First Name",
      placeholder: "Enter First Name",
    },
    lastName: {
      label: "Last Name",
      placeholder: "Enter Last Name",
    },
    email: {
      label: "Email",
      placeholder: "Enter Email",
    },
    phoneNumber: {
      label: "Phone Number",
      placeholder: "(123) 4567-890",
    },
    zipCode: {
      label: "Zip Code",
      placeholder: "Enter Zip Code",
    },
  },
  button: "See My Cash Offer",
  disclaimer:
    'By clicking "See My Cash Offer" you agree that Uncle Sam Buys Homes may contact you at the phone number and email you provided about your request and related services. Consent is not a condition of purchase. Message and data rates may apply. You can withdraw consent anytime.',
} as const

export const WORK_CONTENT = {
  header: "How It Works",
  steps: [
    {
      number: "01",
      title: "Tell us about your property",
      description: "Share your address, timeline, and a few details so we can understand your situation.",
    },
    {
      number: "02",
      title: "Get a cash offer path",
      description: "We review your information and connect you with buyers interested in homes like yours.",
    },
    {
      number: "03",
      title: "Move forward on your terms",
      description: "If there is a fit, you can explore a no-obligation cash offer without listing fees or repairs.",
    },
  ],
  workImage: [
    {
      src: "/step-3.webp",
      alt: "Couple in a modern kitchen discussing their home",
    },
  ],
} as const

export const ABOUT_CONTENT = {
  header: "Why sell your home for cash?",
  description:
    "Uncle Sam Buys Homes helps homeowners explore a faster sale without open houses, agent commissions, or months of uncertainty.",
  features: [
    {
      title: "Skip the traditional listing grind",
      image: {
        src: "/about-1.svg",
        alt: "Homeowners reviewing a simpler sale option",
      },
    },
    {
      title: "Talk timelines that fit your move",
      image: {
        src: "/about-2.svg",
        alt: "Planning a move on your schedule",
      },
    },
    {
      title: "Understand your options in plain language",
      image: {
        src: "/about-3.svg",
        alt: "Clear next steps for selling your home",
      },
    },
  ],
} as const


export const FEATURES_CONTENT = {
  header: "Questions worth asking any buyer",
  features: [
    {
      title: "How is the offer price determined?",
      image: {
        src: "/feature-icon.svg",
        alt: "Offer price discussion",
      },
    },
    {
      title: "What fees or deductions apply at closing?",
      image: {
        src: "/feature-icon.svg",
        alt: "Closing costs and fees",
      },
    },
    {
      title: "What inspections or walkthroughs are required?",
      image: {
        src: "/feature-icon.svg",
        alt: "Property inspection timeline",
      },
    },
    {
      title: "Can you choose your closing date?",
      image: {
        src: "/feature-icon.svg",
        alt: "Choosing a closing date",
      },
    },
  ],
} as const

export const COVER_CONTENT = {
  header: "What's Covered",
  homeSystems: {
    header: "HOME SYSTEMS",
    items: [
      {
        title: "Heating And Air Conditioning Systems",
        image: {
          src: "/home-1.svg",
          alt: "Heating And Air Conditioning Systems",
        },
      },
      {
        title: "Plumbing Systems And Accessories",
        image: {
          src: "/home-2.svg",
          alt: "Plumbing Systems And Accessories",
        },
      },
      {
        title: "Electrical Systems And Accessories",
        image: {
          src: "/home-3.svg",
          alt: "Electrical Systems And Accessories",
        },
      },
      {
        title: "Maintenance Services",
        image: {
          src: "/home-4.svg",
          alt: "Maintenance Services",
        },
      },
    ],
  },
  appliances: {
    header: "APPLIANCES",
    items: [
      {
        title: "Refrigerator",
        image: {
          src: "/appliances-1.svg",
          alt: "Refrigerator",
        },
      },
      {
        title: "Oven",
        image: {
          src: "/appliances-2.svg",
          alt: "Oven",
        },
      },
      {
        title: "Washer / Dryer",
        image: {
          src: "/appliances-3.svg",
          alt: "Washer / Dryer",
        },
      },
      {
        title: "Water Heater",
        image: {
          src: "/appliances-4.svg",
          alt: "Water Heater",
        },
      },
    ],
    additionalText: "And More...",
  },
  callToAction: {
    buttonText: "Call for help with your request",
    contactText: "Or give us a call",
    phoneNumber: "1-855-916-3700",
    phoneHref: "tel:+18559163700",
  },
} as const





export const REVIEW_CONTENT = {
  header: "See What Our Customers Have To Say",
  rating: {
    
    image: {
      src: "/review.svg",
      alt: "Google Review Rating",
    },
    reviewText:"Based on 1,500+ reviews",
  },


  reviews: [
    {
     id: 1,
      quote:
        "We needed to move quickly for a job relocation. The process was straightforward, and we avoided months of showings while we figured out our next step.",
      customer: {
        name: "Sarah Matthews",
        status: "Dallas, TX",
        image: {
          src: "/profile-1.svg",
          alt: "Sarah Matthews",
        },
      },
    },
    {
      id: 2,
      quote:
        "Inherited a property that needed work. We wanted clarity on options without committing to a long listing. Getting a cash path explained upfront made the decision easier.",
      customer: {
        name: "David Martinez",
        status: "Orlando, FL",
        image: {
          src: "/profile-2.svg",
          alt: "David Martinez",
        },
      },
    },
    {
     
      id: 3,
      quote:
        "We were behind on payments and stressed about timelines. Having someone walk through a simple next step—without pressure—helped us breathe again.",
      customer: {
        name: "Monica Patel",
        status: "Phoenix, AZ",
        image: {
          src: "/profile-3.svg",
          alt: "Monica Patel",
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
      question: "What is a cash offer on my home?",
      answer:
        "It is a buyer’s proposal to purchase your property for an agreed price, often with a simpler timeline and fewer traditional sale steps than a retail listing.",
    },
    {
      id: 2,
      question: "Does requesting an offer cost anything?",
      answer:
        "Submitting your information through Uncle Sam Buys Homes does not charge you a fee. Any offer or agreement would come from the buyer you choose to work with.",
    },
    {
      id: 3,
      question: "Do I have to make repairs first?",
      answer:
        "Many cash paths focus on buying as-is. Specific expectations depend on the buyer and your property, which is why we collect a few details up front.",
    },
    {
      id: 4,
      question: "Am I obligated if I submit the form?",
      answer:
        "No. Sharing your information helps us route you to interested buyers. You decide whether to move forward after you learn more.",
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
