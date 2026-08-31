export const STATE_LICENSE_FORMATS: Record<string, number> = {
  AL: 7, AK: 7, AZ: 9, AR: 9, CA: 8, CO: 9, CT: 9, DE: 7, FL: 13, GA: 9,
  HI: 9, ID: 9, IL: 12, IN: 10, IA: 9, KS: 9, KY: 9, LA: 9, ME: 7, MD: 13,
  MA: 9, MI: 13, MN: 13, MS: 9, MO: 9, MT: 13, NE: 9, NV: 10, NH: 10, NJ: 15,
  NM: 9, NC: 12, ND: 9, OH: 8, OK: 9, OR: 9, PA: 8, RI: 7, SC: 9, SD: 9,
  TN: 9, TX: 7, UT: 9, VT: 8, VA: 9, WA: 12, WV: 7, WI: 14, WY: 9,
}

export const TOTAL_STEPS = 38

export const spendingOptions = [
  { value: "auto-purchase", label: "Auto Purchase" },
  { value: "credit-card-consolidation", label: "Credit Card Consolidation" },
  { value: "debt-consolidation", label: "Debt Consolidation" },
  { value: "debt-settlement", label: "Debt Settlement" },
  { value: "education", label: "Education" },
  { value: "home-improvement", label: "Home Improvement" },
  { value: "medical", label: "Medical" },
  { value: "relocation", label: "Relocation" },
  { value: "renewable-energy", label: "Renewable Energy" },
  { value: "small-business", label: "Small Business" },
  { value: "travel", label: "Travel" },
  { value: "wedding", label: "Wedding" },
  { value: "other", label: "Other" },
]

export const creditScoreOptions = [
  { value: "excellent", label: "Excellent (720+)" },
  { value: "good", label: "Good (660-719)" },
  { value: "fair", label: "Fair (600-659)" },
  { value: "poor", label: "Poor (Under 599)" },
  { value: "no-credit-established", label: "No Credit Established" },
]

export const employmentStatusOptions = [
  { value: "employed", label: "Employed" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "benefits", label: "Benefits" },
]

export const paymentFrequencyOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "semi-monthly", label: "Twice A Month" },
  { value: "biweekly", label: "Every Other Week" },
  { value: "weekly", label: "Weekly" },
]

export const bankAccountDurationOptions = [
  { value: "2", label: "Less than 3 Months" },
  { value: "4", label: "3-6 Months" },
  { value: "9", label: "6-12 Months" },
  { value: "24", label: "1-3 Years" },
  { value: "48", label: "3+ Years" },
]

export const addressDurationOptions = [
  { value: "60", label: "5 Years or More" },
  { value: "42", label: "3-4 Years" },
  { value: "18", label: "1-2 Years" },
  { value: "7", label: "4-11 Months" },
  { value: "2", label: "Less than 3 Months" },
]

export const vehicleStatusOptions = [
  { value: "paid-off", label: "Yes - its paid off" },
  { value: "making-payments", label: "Yes - I'm making payments" },
  { value: "no", label: "No" },
]

export const unsecuredDebtAmountOptions = [
  { value: "9999-or-less", label: "$9,999 or less" },
  { value: "10000-19999", label: "$10,000 - $19,999" },
  { value: "20000-29999", label: "$20,000 - $29,999" },
  { value: "30000-or-more", label: "$30,000 or more" },
]

export const employerDurationOptions = [
  { value: "60", label: "5 years or more" },
  { value: "42", label: "3-4 years" },
  { value: "18", label: "1-2 years" },
  { value: "7", label: "4 - 11 months" },
  { value: "2", label: "Less than 3 months" },
]

export const bankruptcyChapterOptions = [
  { value: "chapter-7", label: "Chapter 7" },
  { value: "chapter-13", label: "Chapter 13" },
]

export const bankruptcyStatusOptions = [
  { value: "completed", label: "Discharged (Completed)" },
  { value: "in-progress", label: "Open (In Progress)" },
  { value: "incomplete", label: "Dismissed (Incomplete)" },
]

export const driverLicenseStateOptions = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]
