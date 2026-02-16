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


export const WORK_CONTENT = {
  header: "How It Works",
  steps: [
    {
      number: 1,
      title: "Tell us what broke",
      description: "Open a request in minutes and share the issue and your address.",
      image: {
        src: "/step-1.webp",
        alt: "Check if your car qualifies",
      },
    },
    {
      number: 2,
      title: "We book the right help",
      description: "A local, qualified technician is assigned and your visit is scheduled.",
      image: {
        src: "/step-2.webp",
        alt: "See real plan prices",
      },
    },
    {
      number: 3,
      title: "You get it fixed",
      description: "If it’s covered, the repair or replacement is handled under your plan.",
      image: {
        src: "/step-3.webp",
        alt: "Lock in protection",
      },
    },
  ],
} as const

export const ABOUT_CONTENT = {
  header: "So, what does a home warranty actually do?",
  description: "A home warranty helps when everyday home systems or appliances stop working from normal wear and tear.",
  features: [
    {
      title: "Helps cover home systems and appliances",
     
      image: {
        src: "/about-1.svg",
        alt: "Cars today cost more to repair",
      },
    },
    {
      title: "Works alongside homeowners insurance",
      image: {
        src: "/about-2.svg",
        alt: "Unexpected repair costs",
      },
    },
    {
      title: "Simple member support when things break",
      image: {
        src: "/about-3.svg",
        alt: "Breakdowns disrupt daily life",
      },
    },
  ],
} as const


export const FEATURES_CONTENT = {
  header: "What's Not Covered in Home Warranty",
  features: [
    {
      title: "Pre-existing conditions",
      image: {
        src: "/cross.svg",
        alt: "Cars today cost more to repair",
      },
    },
    {
      title: "Cosmetic damage",
      image: {
        src: "/cross.svg",
        alt: "Unexpected repair costs",
      },
    },
    {
      title: "Improper maintenance",
      image: {
        src: "/cross.svg",
        alt: "Breakdowns disrupt daily life",
      },
    },
    {
      title: "Items not listed in plan",
      image: {
        src: "/cross.svg",
        alt: "Items not listed in plan",
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
    buttonText: "Get Your FREE Quote",
    contactText: "Or give us a call",
    phoneNumber: "1-800-388-1918",
    phoneHref: "tel:+18003881918",
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
      quote: "Our AC stopped working unexpectedly, and I was worried about the cost. Submitting a request was easy, and a technician was scheduled quickly. It really helped us avoid a big repair bill.",
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
      quote: "As a new homeowner, I wasn’t sure what to expect when our refrigerator broke down. Everything was explained clearly, and the repair process was simple from start to finish",
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
      quote: "Having coverage made a stressful situation much easier. Our water heater needed repairs, and the whole experience was smooth and straightforward.",
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
      question: "Q1. What does a home warranty help cover?",
      answer: "No. This is vehicle protection, not car insurance. It helps cover unexpected mechanical repair costs after your manufacturer warranty ends, while insurance handles accidents and liability.",
    },
    {
      id: 2,
      question: "Q2. What do I pay when I request service?",
      answer: "Many vehicles qualify regardless of age or mileage. Our eligibility check will determine if your specific vehicle meets the requirements for coverage.",
    },
    {
      id: 3,
      question: "Q3. Is this the same as homeowners insurance?",
      answer: "When your covered vehicle experiences a mechanical breakdown, simply contact our claims department. We'll help you get your vehicle repaired at a qualified service center, and your plan will cover the eligible repair costs according to your coverage terms.",
    },
    {
      id: 4,
      question: "Q4. Can I cancel or change my plan later?",
      answer: "Yes, you have flexibility with your plan. You can modify or cancel your coverage according to the terms outlined in your agreement. Contact our customer service team to discuss your options.",
    },
  ],
} as const

export const FOOTER_CONTENT = {
  description: "Affordable coverage for unexpected home repairs.",
  linkHeader: "Company",
  links: [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms of Use", href: "/terms-of-use" },
  ],
  copyrightText: "Copyright © 2026 Assuritii. All Rights Reserved.",
  disclaimer:
    'Assuritii reserves the right to offer cash back in lieu of repair or replacement in the amount of Assuritii actual cost (which at times may be less than retail) to repair or replace any covered system, component or appliance. In the event that Assuritii makes such payment, Assuritii will provide written notification of the basis for the amount of the payment. First Month Free with purchase of any single payment home warranty plan. The product being offered is a service contract and is separate and distinct from any product or service warranty which may be provided by the home builder or manufacturer. View our Privacy Policy.',
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
