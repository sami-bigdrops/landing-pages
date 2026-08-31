"use client"

import { useRef, useState } from "react"

export function useFormState() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(Math.round((1 / 38) * 100))
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState("")
  const [subid1, setSubid1] = useState("")
  const [subid2, setSubid2] = useState("")
  const [subid3, setSubid3] = useState("")

  const [spendingPurpose, setSpendingPurpose] = useState("")
  const [creditScore, setCreditScore] = useState("")
  const [employmentStatus, setEmploymentStatus] = useState("")
  const [paymentFrequency, setPaymentFrequency] = useState("")
  const [monthlyIncome, setMonthlyIncome] = useState("$ ")
  const [debtAmount, setDebtAmount] = useState("$ ")
  const [nextPayDate, setNextPayDate] = useState("")
  const [secondPayDate, setSecondPayDate] = useState("")
  const [hasCheckingAccount, setHasCheckingAccount] = useState("")
  const [hasDirectDeposit, setHasDirectDeposit] = useState("")
  const [bankAccountDuration, setBankAccountDuration] = useState("")
  const [bankRoutingNumber, setBankRoutingNumber] = useState("")
  const [bankName, setBankName] = useState("")
  const [bankAccountNumber, setBankAccountNumber] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [zipCodeCity, setZipCodeCity] = useState("")
  const [state, setState] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [homeOwnership, setHomeOwnership] = useState("")
  const [addressDuration, setAddressDuration] = useState("")
  const [email, setEmail] = useState("")
  const [vehicleStatus, setVehicleStatus] = useState("")
  const [driverLicenseState, setDriverLicenseState] = useState("")
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("")
  const [isMilitaryMember, setIsMilitaryMember] = useState("")
  const [unsecuredDebtAmount, setUnsecuredDebtAmount] = useState("")
  const [employer, setEmployer] = useState("")
  const [employerDuration, setEmployerDuration] = useState("")
  const [occupation, setOccupation] = useState("")
  const [monthlyHousingPayment, setMonthlyHousingPayment] = useState("$ ")
  const [hasFiledBankruptcy, setHasFiledBankruptcy] = useState("")
  const [bankruptcyChapter, setBankruptcyChapter] = useState("")
  const [bankruptcyStatus, setBankruptcyStatus] = useState("")
  const [bankruptcyDischargedInLast2Years, setBankruptcyDischargedInLast2Years] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [homePhoneNumber, setHomePhoneNumber] = useState("")
  const [workPhoneNumber, setWorkPhoneNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [ssn, setSsn] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLookingUpBank, setIsLookingUpBank] = useState(false)
  const [isValidatingZip, setIsValidatingZip] = useState(false)
  const [zipCodeError, setZipCodeError] = useState("")
  const [touchedFields, setTouchedFields] = useState<Record<number, boolean>>({})

  const markFieldTouched = (step: number) => {
    setTouchedFields((prev) => ({ ...prev, [step]: true }))
  }

  const previousStepRef = useRef(1)
  const isNavigatingBackRef = useRef(false)
  const lastUserInteractionStepRef = useRef<number | null>(null)
  const incomeInputRef = useRef<HTMLInputElement | null>(null)
  const debtInputRef = useRef<HTMLInputElement | null>(null)
  const routingNumberInputRef = useRef<HTMLInputElement | null>(null)
  const driverLicenseInputRef = useRef<HTMLInputElement | null>(null)
  const housingPaymentInputRef = useRef<HTMLInputElement | null>(null)
  const homePhoneInputRef = useRef<HTMLInputElement | null>(null)
  const workPhoneInputRef = useRef<HTMLInputElement | null>(null)
  const phoneInputRef = useRef<HTMLInputElement | null>(null)
  const ssnInputRef = useRef<HTMLInputElement | null>(null)

  return {
    currentStep,
    setCurrentStep,
    progress,
    setProgress,
    trustedFormCertUrl,
    setTrustedFormCertUrl,
    subid1,
    setSubid1,
    subid2,
    setSubid2,
    subid3,
    setSubid3,
    spendingPurpose,
    setSpendingPurpose,
    creditScore,
    setCreditScore,
    employmentStatus,
    setEmploymentStatus,
    paymentFrequency,
    setPaymentFrequency,
    monthlyIncome,
    setMonthlyIncome,
    debtAmount,
    setDebtAmount,
    nextPayDate,
    setNextPayDate,
    secondPayDate,
    setSecondPayDate,
    hasCheckingAccount,
    setHasCheckingAccount,
    hasDirectDeposit,
    setHasDirectDeposit,
    bankAccountDuration,
    setBankAccountDuration,
    bankRoutingNumber,
    setBankRoutingNumber,
    bankName,
    setBankName,
    bankAccountNumber,
    setBankAccountNumber,
    zipCode,
    setZipCode,
    zipCodeCity,
    setZipCodeCity,
    state,
    setState,
    streetAddress,
    setStreetAddress,
    homeOwnership,
    setHomeOwnership,
    addressDuration,
    setAddressDuration,
    email,
    setEmail,
    vehicleStatus,
    setVehicleStatus,
    driverLicenseState,
    setDriverLicenseState,
    driverLicenseNumber,
    setDriverLicenseNumber,
    isMilitaryMember,
    setIsMilitaryMember,
    unsecuredDebtAmount,
    setUnsecuredDebtAmount,
    employer,
    setEmployer,
    employerDuration,
    setEmployerDuration,
    occupation,
    setOccupation,
    monthlyHousingPayment,
    setMonthlyHousingPayment,
    hasFiledBankruptcy,
    setHasFiledBankruptcy,
    bankruptcyChapter,
    setBankruptcyChapter,
    bankruptcyStatus,
    setBankruptcyStatus,
    bankruptcyDischargedInLast2Years,
    setBankruptcyDischargedInLast2Years,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    birthdate,
    setBirthdate,
    homePhoneNumber,
    setHomePhoneNumber,
    workPhoneNumber,
    setWorkPhoneNumber,
    phoneNumber,
    setPhoneNumber,
    ssn,
    setSsn,
    isSubmitting,
    setIsSubmitting,
    isLookingUpBank,
    setIsLookingUpBank,
    isValidatingZip,
    setIsValidatingZip,
    zipCodeError,
    setZipCodeError,
    touchedFields,
    markFieldTouched,
    previousStepRef,
    isNavigatingBackRef,
    lastUserInteractionStepRef,
    incomeInputRef,
    debtInputRef,
    routingNumberInputRef,
    driverLicenseInputRef,
    housingPaymentInputRef,
    homePhoneInputRef,
    workPhoneInputRef,
    phoneInputRef,
    ssnInputRef,
  }
}
