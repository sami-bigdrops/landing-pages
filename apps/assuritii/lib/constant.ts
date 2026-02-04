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
  headline: "Avoid surprise car repair bills before they happen!",
  description: "Assuritii provides vehicle protection plans that help cover expensive mechanical breakdowns once your manufacturer's warranty ends.",
  
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
  button: "Get Your FREE Quote",
  disclaimer: "By Clicking \"Get Your Free Quote\" You Agree That Assuritii May Contact You At The Number And Email Provided With Calls, Texts, Or Prerecorded/Artificial Voice Messages About Or Products/Services. Consent Is Not A Condition Of Purchase. Message/Data Rates Apply. You Can Withdraw Consent Anytime.",
} as const

