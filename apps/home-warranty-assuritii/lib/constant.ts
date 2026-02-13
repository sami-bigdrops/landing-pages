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
  headline: " Home warranty cover, built for real life! ",
  description: "Get help with unexpected repairs for essential home systems and appliances.",
  
  partners: [
    {
      alt: "Google",
      src: "/partner-1.svg",
     
    },
    {
      alt: "2025 Top Rated Consumers",
      src: "/partner-2.svg",
      
    },
    {
      alt: "Consumer Affairs",
      src: "/partner-3.svg",
     
    },
  ],

  image: {
    alt: "Hero Image",
    src: "/hero.webp",
  },
} as const



export const FORM_CONTENT = {
  header: "Receive Your FREE Vehicle Protection Quote",
  tabs: {
    vehicleDetails: "VEHICLE DETAILS",
    personalDetails: "PERSONAL DETAILS",
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
  button: "Unlock My Car's Protection Value",
  disclaimer: "By Clicking \"Get Your Free Quote\" You Agree That Assuritii May Contact You At The Number And Email Provided With Calls, Texts, Or Prerecorded/Artificial Voice Messages About Or Products/Services. Consent Is Not A Condition Of Purchase. Message/Data Rates Apply. You Can Withdraw Consent Anytime.",
} as const


export const STEPS_CONTENT = {
  header: "Start Smart. Stay Protected.",
  steps: [
    {
      number: 1,
      title: "Check if your car qualifies",
      description: "One quick form. Instant eligibility check.",
      image: {
        src: "/step-1.svg",
        alt: "Check if your car qualifies",
      },
    },
    {
      number: 2,
      title: "See real plan prices",
      description: "Clear coverage. Clear monthly cost. No guessing.",
      image: {
        src: "/step-2.svg",
        alt: "See real plan prices",
      },
    },
    {
      number: 3,
      title: "Lock in protection",
      description: "Drive knowing repairs won't wreck your budget.",
      image: {
        src: "/step-3.svg",
        alt: "Lock in protection",
      },
    },
  ],
} as const


export const FEATURES_CONTENT = {
  header: "Car Repairs Shouldn't Drain Your Savings",
  description: "Modern Vehicles Are Expensive To Fix Once Factory Warranties End. A Single Breakdown Can Create A Bill You Didn't Plan For.",
  features: [
    {
      title: "Cars today cost more to repair",
      description: "Advanced electronics and sensors raise service bills.",
      image: {
        src: "/feature-1.svg",
        alt: "Cars today cost more to repair",
      },
    },
    {
      title: "Unexpected repair costs",
      description: "Major mechanical fixes can run into thousands without warning.",
      image: {
        src: "/feature-2.svg",
        alt: "Unexpected repair costs",
      },
    },
    {
      title: "Breakdowns disrupt daily life",
      description: "Missed work, family plans, and added stress.",
      image: {
        src: "/feature-3.svg",
        alt: "Breakdowns disrupt daily life",
      },
    },
  ],
} as const


export const IMAGE_COMPARE_CONTENT = {
  header: "Real Protection For Real Car Problems",
  description: "Coverage built for today's cars and real driving needs",
  imageOne: {
    src: "/unprotected.webp",
    alt: "Unprotected",
  },
  imageTwo: {
    src: "/protected.webp",
    alt: "Protected",
  },
} as const

export const REPAIR_COSTS_CONTENT = {
  header: "AVERAGE REPAIR COSTS",
  withoutLabel: "WITHOUT ASSURITII",
  withLabel: "WITH ASSURITII",
  totalLabel: "TOTAL FOR ALL",
  items: [
    { label: "ENGINE", cost: "$4,800" },
    { label: "TRANSMISSION", cost: "$3,200" },
    { label: "SUSPENSION", cost: "$1,750" },
  ],
  withTotalCost: "$0",
} as const

export const REVIEW_CONTENT = {
  header: "Drivers Who Chose Peace Of Mind, Drivers Who Chose Assuritii!",
  reviews: [
    {
     id: 1,
      quote: "When my transmission failed, Assuritii saved me over $2,000. The process was simple & there were no surprise charges.",
      customer: {
        name: "Linda Matthews",
        status: "Verified Customer",
        image: {
          src: "/profile-1.svg",
          alt: "Linda Matthews",
        },
      },
    },
    {
      id: 2,
      quote: "I liked that everything was explained clearly before I signed up. No confusing terms and no pressure calls at all.",
      customer: {
        name: "David Lawson",
        status: "Verified Customer",
        image: {
          src: "/profile-2.svg",
          alt: "David Lawson",
        },
      },
    },
    {
     
      id: 3,
      quote: "Paying monthly is much easier than facing a huge repair bill at once. It gave me real peace of mind while driving.",
      customer: {
        name: "Susan Roberts",
        status: "Verified Customer",
        image: {
          src: "/profile-3.svg",
          alt: "Susan Roberts",
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
      question: "Q1. Is this car insurance or something different?",
      answer: "No. This is vehicle protection, not car insurance. It helps cover unexpected mechanical repair costs after your manufacturer warranty ends, while insurance handles accidents and liability.",
    },
    {
      id: 2,
      question: "Q2. Will my car qualify if it's older or high-mileage?",
      answer: "Many vehicles qualify regardless of age or mileage. Our eligibility check will determine if your specific vehicle meets the requirements for coverage.",
    },
    {
      id: 3,
      question: "Q3. What happens if my car breaks down?",
      answer: "When your covered vehicle experiences a mechanical breakdown, simply contact our claims department. We'll help you get your vehicle repaired at a qualified service center, and your plan will cover the eligible repair costs according to your coverage terms.",
    },
    {
      id: 4,
      question: "Q4. Can I leave or change my plan later?",
      answer: "Yes, you have flexibility with your plan. You can modify or cancel your coverage according to the terms outlined in your agreement. Contact our customer service team to discuss your options.",
    },
  ],
} as const

export const FOOTER_CONTENT = {
  description: "Affordable vehicle protection for unexpected repairs.",
  linkHeader: "Company",
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © 2026 Assuritii. All Rights Reserved.",
  disclaimer:
    'A Vehicle Service Contract (VSC) is often referred to as an "auto warranty" or an "extended car warranty," but it is not a warranty. A VSC does, however, provide repair coverage for your vehicle after the manufacturer\'s car warranty expires. A VSC is a contract between you and a VSC provider or administrator that states what is a covered repair and what is not.',
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
