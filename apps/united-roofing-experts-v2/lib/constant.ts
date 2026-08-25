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

export const WORKS_CONTENT = {
  header: "Here's How It Works...",
  steps: [
    {
      number: 1,
      step: "Step 1:",
      title: "Get Started Online",
      description: "It only takes a minute to check availability in your area and schedule your FREE estimate.",

      image: {
        src: "/works-1.svg",
        alt: "Multi-Vehicle Savings",
      },
    },
    {
      number: 2,
      step: "Step 2:",
      title: "Free Estimate",
      description: "One of our friendly Metal Roofing Experts will inspect your roof, take measurements and give you a FREE, no-obligation estimate. Next-day appointments may be available!",
      image: {
        src: "/works-2.svg",
        alt: "Free Estimate",
      },
    },
    {
      number: 3,
      step: "Step 3:",
      title: "Installation",
      description: "Our expert installation teams can completely replace your roof (including clean-up!) in as little as ONE day.",
      image: {
        src: "/works-3.svg",
        alt: "Installation",
      },
    },
    {
      number: 4,
      step: "Step 4:",
      title: "Peace of Mind",
      description: "We offer some of the longest-lasting and most durable roofing products on the market. Our products are virtually maintenance-free and backed by transferrable limited lifetime warranties.",
      image: {
        src: "/works-4.svg",
        alt: "Peace of Mind",
      },
    },
  ],
} as const

export const ROOF_CONTENT = {
  headline: "Cut Out the Middleman!",
  subheadline: "Full-Service Roof Replacement",
  description: "Our goal is to make a complex process as fast, easy and affordable as possible! We furnish, sell, install, service and arrange financing for customers. We control every aspect of quality and cost, so you don't have the hassle, risk and added cost of dealing with various middlemen.",
  
  image: {
    src: "/roof.webp", // Update with actual image asset path if different
    alt: "Roof"
  },

  roofImage: {
    src: "/roof-bg.webp", // Update with actual image asset path if different
    alt: "Roof"
  }
} as const  

export const SAVING_CONTENT = {
  headline: "Potential Energy Bill Savings!",
  subheadline: "With an Energy-Efficient Metal Roofing System",
  description: "One of our metal roofs is more than just a durable steel roof, it's a complete, energy-efficient roofing system that can help lower your energy bills by keeping your home warmer in the winter and cooler in the summer.",
  
  image: {
    src: "/save.webp", // Update with actual image asset path if different
    alt: "Roof"
  },

  roofImage: {
    src: "/save-bg.webp", // Update with actual image asset path if different
    alt: "Roof"
  }
} as const  

export const CHOOSE_CONTENT = {
  headline: "Our \"Next-Generation\" Stone Coated Metal Roofing System",
  description:
    "The future of roofing is here! Our flagship metal roofing system comes in 3 beautiful designer styles (resembling shingle, tile and wood) and 25+ different colors to complement any home. Unlike most metal roofs that are easily dented by hail, our Next-Generation Metal Roofs have a unique stone coating that make them resistant to hail and extreme weather.",
  features: [
    { label: "Lifetime limited transferrable warranty" },
    { label: "Wind-resistant up to 120MPH" },
    { label: "Class 4 Impact Resistant (baseball-size hail!)" },
    { label: "Fire resistant" },
    { label: "100% recyclable" },
  ],
  featureIcon: {
    src: "/choose-icon.svg",
    alt: "Checkmark",
  },
  image: {
    src: "/choose.webp",
    alt: "Stone coated metal roof on a home",
  },
  bottomImage: {
    src: "/choose-bottom.webp",
    alt: "Roof background",
  },
} as const

export const INFO_CONTENT = {
  headline: "The Smart Financial Decision!",

  description:
    "Investing in an energy-saving, high-quality roofing system can payoff BIG in the long run. Our roofing system may help you:",
  features: [
    { label: "Significantly increase your home value" },
    { label: "Lower home insurance premiums" },
    { label: "Lower your energy bills" },
    { label: "Eliminate future repair & replacement costs" },
    
  ],
  featureIcon: {
    src: "/choose-icon.svg",
    alt: "Checkmark",
  },
  image: {
    src: "/info.webp",
    alt: "Stone coated metal roof on a home",
  },
  
  
  
  

  
} as const 











export const RATING_CONTENT = {

  headline: "Hear From Our Customers",
  description: "With Over 100,000 Satisfied Customers and Thousands of 5-Star Reviews Online, We Are America's Roof Replacement Leader!",

  starImage: {
    src: "/star.svg",
    alt: "Stone coated metal roof on a home",
  },

  RatingImage: {
    src: "/rating.webp",
    alt: "Stone coated metal roof on a home",
  }



  
}


export const ROOF_TYPE_CONTENT = {
  headline: "How to Know If You Need a New Roof",
  description:
    "It may be difficult to spot potentially major problems caused by a faulty and failing roof. Don't let an outside problem become an inside problem! If you see any of these signs, or if you are noticing damage to the inside of your home, contact our Metal Roofing Experts right away for a FREE roof and attic inspection!",
  backgroundImage: {
    src: "/rooftype-bg.webp",
    alt: "Roof shingles background",
  },
  signs: [
    {
      id: 1,
      title: "Curled Shingles",
      image: {
        src: "/roof-1.webp",
        alt: "Curled shingles on roof",
      },
    },
    {
      id: 2,
      title: "Cracked Shingles",
      image: {
        src: "/roof-2.webp",
        alt: "Cracked shingles on roof",
      },
    },
    {
      id: 3,
      title: "Missing Shingles",
      image: {
        src: "/roof-3.webp",
        alt: "Missing shingles on roof",
      },
    },
    {
      id: 4,
      title: "Granules in the Gutters",
      image: {
        src: "/roof-4.webp",
        alt: "Granules in the gutters",
      },
    },
    {
      id: 5,
      title: "Shingles in the Yard",
      image: {
        src: "/roof-5.webp",
        alt: "Shingles in the yard",
      },
    },
    {
      id: 6,
      title: "Moss",
      image: {
        src: "/roof-6.webp",
        alt: "Moss on roof shingles",
      },
    },
    {
      id: 7,
      title: "Dark Streaks",
      image: {
        src: "/roof-7.webp",
        alt: "Dark streaks on roof",
      },
    },
    {
      id: 8,
      title: "Insects",
      image: {
        src: "/roof-8.webp",
        alt: "Insects on roof",
      },
    },
  ],
} as const



export const REVIEW_CONTENT = {
  
  reviews: [
    {
      number: 1,
      name: "Michael F.",
      description:
        "I am very pleased with my new roof. It was installed in a day and the crew did an excellent job of cleaning up after the job was done. I would highly recommend a metal roof, as it is the last roof you should ever need!",
    },
    {
      number: 2,
      name: "Francis C.",
      description:
        "A few of our neighbors made comments about how nice our new roof looked. They were surprised to learn that it was a metal roof since it looks exactly like a shingled roof.",
    },
    {
      number: 3,
      name: "David B.",
      description:
        "Great company. Good product and reasonable prices. Very professional. As a construction worker myself it's nice to see a contractor that is on the ball. I would definitely hire them again!",
    },
    
  ],

  starImage: {
    src: "/star.svg",
    alt: "Stone coated metal roof on a home",
  },

  image: {
    src: "/review-bg.webp",
    alt: "Review background",
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
