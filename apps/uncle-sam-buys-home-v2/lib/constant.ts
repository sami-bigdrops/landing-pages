export const SITE_BRAND = {
  name: "Uncle Sam Buys Homes",
  description:
    "Sell your house fast for a fair cash offer. Request a no-obligation instant cash offer from Uncle Sam Buys Homes—no repairs, fees, or long delays.",
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
  headline1: "Life Happens.",
  headline2: "We Buy Houses",
  headline3: "No Matter the Reason.",
  description:
    "Whether you're facing a divorce, job loss, foreclosure, or just need to move fast -- we're here to help, not judge. Get a fair cash offer on your terms, on your timeline.",
    badges: [
      {
        icon: "/hero-1.svg",
        text: "No Repairs Needed",
      },
      {
        icon: "/hero-2.svg",
        text: "Zero Fees",
      },
      {
        icon: "/hero-3.svg",
        text: "100% Confidential",
      },
    ],
  image: {
    alt: "A couple in a modern kitchen discussing their home",
    src: "/hero.webp",
  },
} as const

export const OFFER_CONTENT = {
  headline: "Get Your Free Cash Offer",
  subtext: "Tell us about your property. We'll review it and send you a fair, no-obligation cash offer -- usually within 24 hours.",
  subtitle: "Do you want to sell your house for cash?",
  
} as const


export const HELP_CONTENT = {
  headline: "We Help Homeowners in Every Situation",
  subtext: "No matter what brought you here, we've seen it before -- and we have a solution. There's no situation too complicated for a cash sale.",
  steps: [
    {
      id: 1,
      title: "Divorce or Separation",
      description:
        "Selling quickly and fairly can help both parties move forward without the stress of a prolonged listing process.",
      image: {
        src: "/help-1.svg",
        alt: "Divorce or Separation",
      },
    },
    {
      id: 2,
      title: "Financial Hardship or Debt",
      description:
        "Mounting bills, missed payments, or overwhelming debt -- a fast cash sale can give you the breathing room you need.",
      image: {
        src: "/help-2.svg",
        alt: "Financial Hardship or Debt",
      },
    },
    {
      id: 3,
      title: "Relocating for Work or Family",
      description:
        "Don't let a house tie you down when life is calling you somewhere else. We can close on your schedule.",
      image: {
        src: "/help-3.svg",
        alt: "Relocating for Work or Family",
      },
    },
    {
      id: 4,
      title: "Foreclosure or Pre-Foreclosure",
      description:
        "We can move fast enough to help you avoid foreclosure and protect your credit -- before it's too late.",
      image: {
        src: "/help-4.svg",
        alt: "Foreclosure or Pre-Foreclosure",
      },
    },
    {
      id: 5,
      title: "Inherited Property",
      description:
        "Inherited a house you don't want to manage or maintain? We make it simple to convert it to cash quickly.",
      image: {
        src: "/help-5.svg",
        alt: "Inherited Property",
      },
    },
    {
      id: 6,
      title: "Property Needs Major Repairs",
      description:
        "We buy houses as-is -- no matter the condition. You don't need to fix a single thing before selling.",
      image: {
        src: "/help-6.svg",
        alt: "Property Needs Major Repairs",
      },
    },
    {
      id: 7,
      title: "Job Loss or Income Change",
      description:
        "A sudden change in income can make a mortgage unmanageable. A cash sale gives you options and stability.",
      image: {
        src: "/help-7.svg",
        alt: "Job Loss or Income Change",
      },
    },
    {
      id: 8,
      title: "Downsizing or Life Change",
      description:
        "Empty nesters, retirees, or anyone ready for a simpler life -- we make it easy to sell and move on.",
      image: {
        src: "/help-8.svg",
        alt: "Downsizing or Life Change",
      },
    },
    {
      id: 9,
      title: "Tired Landlord",
      description:
        "Done dealing with tenants, repairs, and vacancies? Sell your rental property fast for cash -- occupied or vacant.",
      image: {
        src: "/help-9.svg",
        alt: "Tired Landlord",
      },
    },
  ],
  
} as const

export const WORKS_CONTENT = {
  headline: "What You Get When You Work With Us",
  subtext:
    "No matter what brought you here, we've seen it before — and we have a solution. There's no situation too complicated for a cash sale.",
  steps: [
    {
      id: 1,
      title: "Cash in Your Hands Fast",
      description:
        "No waiting on bank financing or buyer approvals. You get paid in cash, period.",
      image: {
        src: "/work-1.svg",
        alt: "Cash in Your Hands Fast",
      },
    },
    {
      id: 2,
      title: "Sell Completely As-Is",
      description:
        "Don’t spend a dollar on repairs, cleaning, or staging. We take it exactly as it is.",
      image: {
        src: "/work-2.svg",
        alt: "Sell Completely As-Is",
      },
    },
    {
      id: 3,
      title: "Close in as Little as 7 Days",
      description:
        "When time matters, we move fast. Or take more time if you need it — it’s your call.",
      image: {
        src: "/work-3.svg",
        alt: "Close in as Little as 7 Days",
      },
    },
    {
      id: 4,
      title: "Zero Fees or Commissions",
      description:
        "No agent fees. No closing costs charged to you. The offer you get is what you keep.",
      image: {
        src: "/work-4.svg",
        alt: "Zero Fees or Commissions",
      },
    },
    {
      id: 5,
      title: "100% Private & Confidential",
      description:
        "No open houses, no strangers walking through your home. The whole process is discreet.",
      image: {
        src: "/work-5.svg",
        alt: "100% Private & Confidential",
      },
    },
    {
      id: 6,
      title: "We Handle All the Paperwork",
      description:
        "Our team manages every detail of the transaction so you don’t have to worry about a thing.",
      image: {
        src: "/work-6.svg",
        alt: "We Handle All the Paperwork",
      },
    },
  ],
} as const;


export const STEPS_CONTENT = {
  headline: "Simple. Fast. Stress-Free.",
  subtext:
    "We've designed our process to be as easy as possible -- especially when life is already complicated enough.",
  steps: [
    {
      id: 1,
      number: "01",
      title: "Tell Us About Your Home",
      description: "Fill out the short form. It takes less than 2 minutes and there's zero obligation.",
    },
    {
      id: 2,
      number: "02",
      title: "Receive a Fair Cash Offer",
      description: "We review your property and deliver a no-obligation cash offer within 24 hours.",
    },
    {
      id: 3,
      number: "03",
      title: "Choose Your Closing Date",
      description: "Accept on your terms. We close on your timeline — as fast as 7 days if needed.",
    },
    {
      id: 4,
      number: "04",
      title: "Walk Away With Cash",
      description: "We handle all the paperwork. You get paid and get your fresh start.",
    },
  ],
} as const;

export const REVIEW_CONTENT = {
  header: "Real Homeowners. Real Situations. Real Results.",
  subheader: "Here's what homeowners in difficult situations had to say after working with Liz.",
  rating: {
    value: 4.2,
    scale: 5,
    reviewCount: 4519,
    reviewText: "4.2 / 5",
    reviewSubtext: "4,519 Verified Reviews",
    image: {
      src: "/google-review.svg", // Make sure this path matches your Google logo asset
      alt: "Google"
    }
  },
  reviews: [
    {
      id: 1,
      quote: "The process was incredibly easy from start to finish. We received a fair cash offer within a day and closed much faster than we expected.",
      customer: {
        name: "Sarah M.",
        location: "Dallas, TX",
        image: {
          src: "/review-1.svg",
          alt: "Sarah K.",
        }
      }
    },
    {
      id: 2,
      quote: "I needed to sell my house quickly after relocating for work. Uncle Sam Buys Home made everything simple, and there were no hidden surprises.",
      customer: {
        name: "James R.",
        location: "Phoenix, AZ",
        image: {
          src: "/review-2.svg",
          alt: "James R.",
        }
      }
    },
    {
      id: 3,
      quote: "Selling through a traditional realtor wasn’t the right option for me. I appreciated the straightforward process and excellent communication throughout.",
      customer: {
        name: "Linda T.",
        location: "Orlando, FL",
        image: {
          src: "/review-3.svg",
          alt: "Linda T.",
        }
      }
    },
  ],
} as const


export const INFO_CONTENT = {
  headline: "Whatever Your Situation -- There Is a Way Forward.",
  subtext: "You don't have to figure this out alone. Get a free, no-obligation cash offer and let us help you take the next step -- on your terms, at your pace.",
  
  badges: [
    {
      icon: "/hero-1.svg",
      text: "No Repairs Needed",
    },
    {
      icon: "/hero-2.svg",
      text: "Zero Fees",
    },
    {
      icon: "/hero-3.svg",
      text: "100% Confidential",
    },
  ],

  image: {
    src: "/info.webp", // Update with actual image asset path if different
    alt: "Family sitting on couch looking at tablet together"
  }
} as const





export const FOOTER_CONTENT = {
  description: SITE_BRAND.description,
  linkHeader: "Company",
  links: [
    { text: "TERMS OF USE", href: "/terms-of-use" },
    { text: "PRIVACY POLICY", href: "/privacy-policy" },
    { text: "DO NOT SELL MY INFO", href: "/do-not-sell-my-info" },
    { text: "OPT OUT", href: "/opt-out" },
    
  ],
  copyrightText: "Copyright © 2026 Uncle Sam Buys Home. All Rights Reserved.",
  disclaimer:
    "Uncle Sam Buys Home is a marketing platform that connects homeowners with companies involved in real estate transactions. The information you submit on this website is shared in real time with our network of partner companies. If your details match what a partner is looking for, they may contact you directly. In some cases, we may use SMS to help connect you with a provider or facilitate a call. We may receive compensation from these providers when they contact you or offer their services. You are not charged for using our platform. We do not guarantee that you will receive an offer, that any provider will accept your request, or that their services will meet your specific needs. The products or services offered may not always be the best available in the market. Submitting your information does not obligate you to purchase any service or product, and it does not obligate any provider to offer you a service. This website is intended for U.S. citizens only. We do not accept submissions from individuals outside the United States, including Canada and countries in the European Union.",
} as const


export const THANKYOU_CONTENT = {
  title: "Thank you!",
  subtitle:
    "Thank you for connecting with Uncle Sam Buys Homes. A specialist will contact you shortly about your property.",
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
  /** Shown in a green notice below the main confirmation copy */
  emailConfirmationNotice?: string
  aboutSectionTitle: string
  featureCards: ThankYouType2FeatureCard[]
}

export const THANKYOU_TYPE2_CONTENT: ThankYouType2Content = {
  title: "Thank you!",
  partnerName: SITE_BRAND.name,
  partnerLogo: { src: "/logo.svg", alt: `${SITE_BRAND.name} logo` },
  confirmationMessage:
    "We received your information. A member of our team will reach out soon to discuss a potential cash offer for your home.",
  emailConfirmationNotice:
    "We've sent a confirmation email to your inbox. If you don't see it within a few minutes, check your spam or junk folder.",
  aboutSectionTitle: `Why homeowners choose ${SITE_BRAND.name}`,
  featureCards: [
    {
      title: "Speed and simplicity",
      icon: "shield",
      bulletPoints: [
        "Share a few details online instead of juggling endless back-and-forth before you know if there is interest.",
        "Explore a path designed for homeowners who want clarity without a long listing process.",
        "Get routed to buyers who are actively looking for properties like yours.",
      ],
    },
    {
      title: "Sell as-is conversations",
      icon: "building",
      bulletPoints: [
        "Many investors buy with repair needs in mind—ask questions early so expectations stay clear.",
        "Compare a cash-style timeline with what a traditional sale might require for prep and showings.",
        "Understand options before you commit to staging, repairs, or open houses.",
      ],
    },
    {
      title: "No pressure next steps",
      icon: "check",
      bulletPoints: [
        "Submitting the form does not lock you into an agreement.",
        "You choose whether to continue after you hear what is possible for your address and situation.",
        "Our goal is to make the first step easy so you can decide what fits your goals.",
      ],
    },
  ],
}

export const REJECTED_PAGE_CONTENT = {
  title: "We couldn’t complete your submission",
  leadMessage:
    "Our verification partner wasn’t able to accept this submission. This can happen when information doesn’t pass their checks.",
  defaultDetail:
    "Please confirm your address and contact details are accurate, then try again. If you continue to see this message, try again later or use a different phone number.",
  codeMessages: {
    1013:
      "The lead was rejected by our partner. You may have submitted recently, or your details could not be verified. Please review your information and try again.",
  } as Record<number, string>,
  partnerLogo: { src: "/logo.svg", alt: `${SITE_BRAND.name} logo` },
}
