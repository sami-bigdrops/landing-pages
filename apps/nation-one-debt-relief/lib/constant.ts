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
  headline: "Need Cash Fast? Get an Instant Cash Offer with Uncle Sam Buys Homes Today!",
  
  partners: [
    
    {
      alt: "Consumer Affairs",
      src: "/partner-3.svg",
      
      
    },
    {
      alt: "2025 Top Rated Consumers",
      src: "/partner-2.svg",
     
    },
  ],

  // image: {
  //   alt: "Hero Image",
  //   src: "/family.webp",
  // },
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
    { text: "Terms of Use", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © 2026 UncleSamBuysHomes.com. All Rights Reserved.",
  disclaimer:
    "Uncle Sam Buys Homes is a marketing platform that connects homeowners with companies involved in real estate transactions. The information you submit on this website is shared in real time with our network of partner companies. If your details match what a partner is looking for, they may contact you directly. In some cases, we may use SMS to help connect you with a provider or facilitate a call. We may receive compensation from these providers when they contact you or offer their services. You are not charged for using our platform. We do not guarantee that you will receive an offer, that any provider will accept your request, or that their services will meet your specific needs. The products or services offered may not always be the best available in the market. Submitting your information does not obligate you to purchase any service or product, and it does not obligate any provider to offer you a service. This website is intended for U.S. citizens only. We do not accept submissions from individuals outside the United States, including Canada and countries in the European Union.",
} as const


export const THANKYOU_CONTENT = {
  title: "Thanks for your inquiry, {first_name}!",
  titleFallback: "Thanks for your inquiry!",
  subtitle:
    "We're glad you're here.\nWe've matched you with PrimeStreet.\nYou can rest assured that here at PrimeStreet, we will match you with the best agent in your area for your needs, free of cost! No hassle, just great service!\n\nOne of our Customer Advocates will be reaching out to you soon to help you with your home needs or feel free to reach out to us first by calling or texting us at +14696208367.",
  contactTitle: "Call or text us",
  contactPhoneLabel: "+14696208367",
  contactPhoneHref: "tel:+14696208367",
  confirmationTitle:
    "A confirmation message has been sent to your email address.",
  confirmationDescription:
    "The message contains next steps for your cash-offer request. Please check your spam folder if you don't see it in your inbox.",
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
  contactPhoneLabel?: string
  contactPhoneHref?: string
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
}

export const THANKYOU_REQUIRE_EMAIL_IN_PARAMS = true

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = {
  title: "Thanks for your inquiry!",
  partnerName: "PrimeStreet",
  partnerLogo: {
    src: "/PrimeStreetLogo.svg",
    alt: "PrimeStreet logo",
  },
  confirmationMessage:
    "We're glad you're here.\nWe've matched you with PrimeStreet.\nYou can rest assured that here at PrimeStreet, we will match you with the best agent in your area for your needs, free of cost! No hassle, just great service!\n\nOne of our Customer Advocates will be reaching out to you soon to help you with your home needs or feel free to reach out to us first by calling or texting us at +14696208367.",
  contactPhoneLabel: "+14696208367",
  contactPhoneHref: "tel:+14696208367",
  aboutSectionTitle: "",
  featureCards: [],
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
