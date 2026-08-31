"use client"

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react"

import { TrustedForm, getCookie } from "@workspace/lp-core"
import { ProgressBar } from "@workspace/ui/components/progress-bar"
import { SelectInput } from "@workspace/ui/components/select-input"

import { useFormState } from "@/hooks/useFormState"
import { useValidation } from "@/hooks/useValidation"
import * as validation from "@/lib/form/validation"
import {
  formatCurrency,
  formatDisplayDate,
  formatPhoneNumber,
  formatRoutingNumber,
  formatSSN,
} from "@/lib/form/formatters"
import {
  TOTAL_STEPS,
  STATE_LICENSE_FORMATS,
  spendingOptions,
  creditScoreOptions,
  employmentStatusOptions,
  paymentFrequencyOptions,
  bankAccountDurationOptions,
  addressDurationOptions,
  vehicleStatusOptions,
  unsecuredDebtAmountOptions,
  employerDurationOptions,
  bankruptcyChapterOptions,
  bankruptcyStatusOptions,
  driverLicenseStateOptions,
} from "@/lib/form/constants"

import DatePicker from "./DatePicker"
import BirthdatePicker from "./BirthdatePicker"
import {
  StepShell,
  PrimaryButton,
  PreviousButton,
  ChoiceOption,
  NavRow,
  ErrorBox,
  INPUT_FIELD,
} from "./form-ui"

const COOKIE_PREFIX = "form_"
const COOKIE_MAX_AGE_DAYS = 7
const PERSIST_DEBOUNCE_MS = 500
const AUTO_ADVANCE_DELAY_MS = 180

const AUTO_ADVANCE_STEPS = new Set([2, 3, 4, 9, 17, 18, 20, 23, 24, 26, 29, 30, 31, 32])

function getMotivationCopy(step: number): { title: string; subtitle: string } {
  if (step <= 4) {
    return {
      title: "You're off to a strong start",
      subtitle: "A few quick answers and we'll start matching you with loan options that fit.",
    }
  }
  if (step <= 10) {
    return {
      title: "Looking good — keep going",
      subtitle: "Every detail helps us find offers that feel right for your situation.",
    }
  }
  if (step <= 18) {
    return {
      title: "You're getting closer",
      subtitle: "Hang in there — clearer options are taking shape as you go.",
    }
  }
  if (step <= 26) {
    return {
      title: "Almost there — this is the home stretch",
      subtitle: "You're closing in on personalized loan matches. The finish line is near.",
    }
  }
  if (step <= 33) {
    return {
      title: "Final details — relief is right ahead",
      subtitle: "Just a little more and you'll be ready to see what options are waiting for you.",
    }
  }
  if (step < TOTAL_STEPS) {
    return {
      title: "You're one breath away",
      subtitle: "Submit when you're ready — the next step toward the funding you need is almost here.",
    }
  }
  return {
    title: "Ready when you are",
    subtitle: "Hit submit and take that weight off your shoulders. Your loan search is about to get real.",
  }
}

const PERSISTED_FIELDS = [
  "spendingPurpose",
  "creditScore",
  "employmentStatus",
  "paymentFrequency",
  "monthlyIncome",
  "debtAmount",
  "nextPayDate",
  "secondPayDate",
  "hasCheckingAccount",
  "hasDirectDeposit",
  "bankAccountDuration",
  "bankRoutingNumber",
  "bankName",
  "bankAccountNumber",
  "zipCode",
  "zipCodeCity",
  "state",
  "streetAddress",
  "homeOwnership",
  "addressDuration",
  "email",
  "vehicleStatus",
  "driverLicenseState",
  "driverLicenseNumber",
  "isMilitaryMember",
  "unsecuredDebtAmount",
  "employer",
  "employerDuration",
  "occupation",
  "monthlyHousingPayment",
  "hasFiledBankruptcy",
  "bankruptcyChapter",
  "bankruptcyStatus",
  "bankruptcyDischargedInLast2Years",
  "firstName",
  "lastName",
  "birthdate",
  "homePhoneNumber",
  "workPhoneNumber",
  "phoneNumber",
  "ssn",
] as const

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
]

const homeOwnershipOptions = [
  { value: "own", label: "I own my home" },
  { value: "rent", label: "I rent" },
]

const bankruptcyDischargedOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "n/a", label: "Not applicable" },
]

const PAY_FREQUENCY_INTERVAL_DAYS: Record<string, number> = {
  weekly: 7,
  biweekly: 14,
  "semi-monthly": 15,
  monthly: 30,
}

function readFormCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const target = `${encodeURIComponent(name)}=`
  const match = document.cookie.split("; ").find((entry) => entry.startsWith(target))
  return match ? decodeURIComponent(match.slice(target.length)) : ""
}

function writeFormCookie(name: string, value: string) {
  if (typeof document === "undefined") return
  const expires = new Date(Date.now() + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function deleteFormCookie(name: string) {
  if (typeof document === "undefined") return
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

function isoToDate(iso: string): Date | null {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }
  return date
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  next.setDate(next.getDate() + days)
  return next
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "")
}

const calculateProgress = (step: number) => Math.round((step / TOTAL_STEPS) * 100)

function LoanFormInner() {
  const form = useFormState()
  const {
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
  } = form

  const [isHydrated, setIsHydrated] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [bankLookupError, setBankLookupError] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const isInitialScrollRef = useRef(true)

  const errors = useValidation({
    monthlyIncome,
    debtAmount,
    nextPayDate,
    secondPayDate,
    bankRoutingNumber,
    bankName,
    bankAccountNumber,
    zipCode,
    streetAddress,
    state,
    email,
    driverLicenseState,
    driverLicenseNumber,
    employer,
    firstName,
    lastName,
    birthdate,
    touchedFields,
  })

  useEffect(() => {
    const setters: Record<string, (value: string) => void> = {
      spendingPurpose: setSpendingPurpose,
      creditScore: setCreditScore,
      employmentStatus: setEmploymentStatus,
      paymentFrequency: setPaymentFrequency,
      monthlyIncome: setMonthlyIncome,
      debtAmount: setDebtAmount,
      nextPayDate: setNextPayDate,
      secondPayDate: setSecondPayDate,
      hasCheckingAccount: setHasCheckingAccount,
      hasDirectDeposit: setHasDirectDeposit,
      bankAccountDuration: setBankAccountDuration,
      bankRoutingNumber: setBankRoutingNumber,
      bankName: setBankName,
      bankAccountNumber: setBankAccountNumber,
      zipCode: setZipCode,
      zipCodeCity: setZipCodeCity,
      state: setState,
      streetAddress: setStreetAddress,
      homeOwnership: setHomeOwnership,
      addressDuration: setAddressDuration,
      email: setEmail,
      vehicleStatus: setVehicleStatus,
      driverLicenseState: setDriverLicenseState,
      driverLicenseNumber: setDriverLicenseNumber,
      isMilitaryMember: setIsMilitaryMember,
      unsecuredDebtAmount: setUnsecuredDebtAmount,
      employer: setEmployer,
      employerDuration: setEmployerDuration,
      occupation: setOccupation,
      monthlyHousingPayment: setMonthlyHousingPayment,
      hasFiledBankruptcy: setHasFiledBankruptcy,
      bankruptcyChapter: setBankruptcyChapter,
      bankruptcyStatus: setBankruptcyStatus,
      bankruptcyDischargedInLast2Years: setBankruptcyDischargedInLast2Years,
      firstName: setFirstName,
      lastName: setLastName,
      birthdate: setBirthdate,
      homePhoneNumber: setHomePhoneNumber,
      workPhoneNumber: setWorkPhoneNumber,
      phoneNumber: setPhoneNumber,
      ssn: setSsn,
    }

    PERSISTED_FIELDS.forEach((field) => {
      const stored = readFormCookie(`${COOKIE_PREFIX}${field}`)
      if (!stored) return
      setters[field]?.(stored)
    })

    const storedStep = Number(readFormCookie(`${COOKIE_PREFIX}currentStep`))
    if (Number.isInteger(storedStep) && storedStep >= 1 && storedStep <= TOTAL_STEPS) {
      setCurrentStep(storedStep)
    }

    setSubid1(getCookie("subid1") ?? "")
    setSubid2(getCookie("subid2") ?? "")
    setSubid3(getCookie("subid3") ?? "")
    setIsHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const persistSnapshot = JSON.stringify({
    currentStep: String(currentStep),
    spendingPurpose,
    creditScore,
    employmentStatus,
    paymentFrequency,
    monthlyIncome,
    debtAmount,
    nextPayDate,
    secondPayDate,
    hasCheckingAccount,
    hasDirectDeposit,
    bankAccountDuration,
    bankRoutingNumber,
    bankName,
    bankAccountNumber,
    zipCode,
    zipCodeCity,
    state,
    streetAddress,
    homeOwnership,
    addressDuration,
    email,
    vehicleStatus,
    driverLicenseState,
    driverLicenseNumber,
    isMilitaryMember,
    unsecuredDebtAmount,
    employer,
    employerDuration,
    occupation,
    monthlyHousingPayment,
    hasFiledBankruptcy,
    bankruptcyChapter,
    bankruptcyStatus,
    bankruptcyDischargedInLast2Years,
    firstName,
    lastName,
    birthdate,
    homePhoneNumber,
    workPhoneNumber,
    phoneNumber,
    ssn,
  })

  useEffect(() => {
    if (!isHydrated) return
    const timer = window.setTimeout(() => {
      const snapshot = JSON.parse(persistSnapshot) as Record<string, string>
      Object.entries(snapshot).forEach(([field, value]) => {
        if (value) writeFormCookie(`${COOKIE_PREFIX}${field}`, value)
        else deleteFormCookie(`${COOKIE_PREFIX}${field}`)
      })
    }, PERSIST_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [persistSnapshot, isHydrated])

  const clearPersistedForm = useCallback(() => {
    deleteFormCookie(`${COOKIE_PREFIX}currentStep`)
    PERSISTED_FIELDS.forEach((field) => deleteFormCookie(`${COOKIE_PREFIX}${field}`))
  }, [])

  useEffect(() => {
    setProgress(calculateProgress(currentStep))
  }, [currentStep, setProgress])

  useEffect(() => {
    if (!isHydrated) return

    const scrollParent = topRef.current?.closest(
      ".overflow-y-auto"
    ) as HTMLElement | null

    if (isInitialScrollRef.current) {
      isInitialScrollRef.current = false
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      if (scrollParent) scrollParent.scrollTop = 0
      return
    }

    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })
    }
  }, [currentStep, isHydrated])

  useEffect(() => {
    previousStepRef.current = currentStep
  }, [currentStep, previousStepRef])

  const goToNextStep = useCallback(() => {
    isNavigatingBackRef.current = false
    setCurrentStep((step) => {
      if (step === 29) return hasFiledBankruptcy === "no" ? 33 : 30
      if (step >= TOTAL_STEPS) return step
      return step + 1
    })
  }, [hasFiledBankruptcy, isNavigatingBackRef, setCurrentStep])

  const goToPreviousStep = useCallback(() => {
    isNavigatingBackRef.current = true
    lastUserInteractionStepRef.current = null
    setCurrentStep((step) => {
      if (step === 33) return hasFiledBankruptcy === "no" ? 29 : 32
      if (step <= 1) return 1
      return step - 1
    })
  }, [hasFiledBankruptcy, isNavigatingBackRef, lastUserInteractionStepRef, setCurrentStep])

  const autoAdvanceValue = useMemo(() => {
    switch (currentStep) {
      case 2:
        return creditScore
      case 3:
        return employmentStatus
      case 4:
        return paymentFrequency
      case 9:
        return hasCheckingAccount
      case 17:
        return homeOwnership
      case 18:
        return addressDuration
      case 20:
        return vehicleStatus
      case 23:
        return isMilitaryMember
      case 24:
        return unsecuredDebtAmount
      case 26:
        return employerDuration
      case 29:
        return hasFiledBankruptcy
      case 30:
        return bankruptcyChapter
      case 31:
        return bankruptcyStatus
      case 32:
        return bankruptcyDischargedInLast2Years
      default:
        return ""
    }
  }, [
    currentStep,
    creditScore,
    employmentStatus,
    paymentFrequency,
    hasCheckingAccount,
    homeOwnership,
    addressDuration,
    vehicleStatus,
    isMilitaryMember,
    unsecuredDebtAmount,
    employerDuration,
    hasFiledBankruptcy,
    bankruptcyChapter,
    bankruptcyStatus,
    bankruptcyDischargedInLast2Years,
  ])

  useEffect(() => {
    if (!AUTO_ADVANCE_STEPS.has(currentStep)) return
    if (!autoAdvanceValue) return
    if (lastUserInteractionStepRef.current !== currentStep) return
    if (isNavigatingBackRef.current) return
    const timer = window.setTimeout(() => goToNextStep(), AUTO_ADVANCE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [
    autoAdvanceValue,
    currentStep,
    goToNextStep,
    isNavigatingBackRef,
    lastUserInteractionStepRef,
  ])

  const selectChoice = useCallback(
    (step: number, currentValue: string, setter: (value: string) => void, value: string) => {
      lastUserInteractionStepRef.current = step
      isNavigatingBackRef.current = false
      setter(value)
      const shouldAdvanceDirectly =
        !AUTO_ADVANCE_STEPS.has(step) || currentValue === value
      if (shouldAdvanceDirectly) {
        window.setTimeout(() => goToNextStep(), AUTO_ADVANCE_DELAY_MS)
      }
    },
    [goToNextStep, isNavigatingBackRef, lastUserInteractionStepRef]
  )

  const handleCurrencyChange = (setter: (value: string) => void) => (raw: string) => {
    const digits = digitsOnly(raw).slice(0, 9)
    setter(digits ? `$ ${formatCurrency(digits)}` : "$ ")
  }

  const nextPayDateBounds = useMemo(() => {
    const today = new Date()
    return { min: today, max: addDays(today, 60) }
  }, [])

  const secondPayDateBounds = useMemo(() => {
    const base = isoToDate(nextPayDate)
    if (!base) return null
    const interval = PAY_FREQUENCY_INTERVAL_DAYS[paymentFrequency] ?? 30
    const expected = addDays(base, interval)
    const earliestAllowed = addDays(base, 1)
    const rawMin = addDays(expected, -5)
    return {
      expected,
      min: rawMin.getTime() < earliestAllowed.getTime() ? earliestAllowed : rawMin,
      max: addDays(expected, 5),
    }
  }, [nextPayDate, paymentFrequency])

  const licenseMaxLength = STATE_LICENSE_FORMATS[driverLicenseState] ?? 9

  const lookupBankName = useCallback(
    async (routing: string) => {
      setIsLookingUpBank(true)
      setBankLookupError("")
      try {
        const res = await fetch(`/api/wise-routing?routing=${routing}`)
        const data = (await res.json()) as { bankName?: string; error?: string }
        if (!res.ok || !data.bankName) {
          setBankLookupError(data.error ?? "We could not find a bank for that routing number")
          return
        }
        setBankName(data.bankName)
      } catch {
        setBankLookupError("We could not verify that routing number right now")
      } finally {
        setIsLookingUpBank(false)
      }
    },
    [setBankName, setIsLookingUpBank]
  )

  useEffect(() => {
    if (currentStep !== 12) return
    const routing = digitsOnly(bankRoutingNumber)
    if (routing.length !== 9) return
    const timer = window.setTimeout(() => {
      void lookupBankName(routing)
    }, 400)
    return () => window.clearTimeout(timer)
  }, [bankRoutingNumber, currentStep, lookupBankName])

  const validateZipAndContinue = useCallback(async () => {
    const zip = digitsOnly(zipCode).slice(0, 5)
    if (zip.length !== 5) {
      setZipCodeError("Please enter a valid 5-digit US zip code")
      return
    }
    setIsValidatingZip(true)
    setZipCodeError("")
    try {
      const res = await fetch(`/api/validate-zip?zip=${zip}`)
      const data = (await res.json()) as {
        valid?: boolean
        isNewYork?: boolean
        error?: string
        city?: string
        stateAbbreviation?: string
      }
      if (data.isNewYork) {
        setZipCodeError("We do not provide service in New York")
        return
      }
      if (!res.ok || !data.valid) {
        setZipCodeError(data.error ?? "Please enter a valid US zip code")
        return
      }
      if (data.city) setZipCodeCity(data.city)
      if (data.stateAbbreviation) setState(data.stateAbbreviation.toUpperCase())
      goToNextStep()
    } catch {
      setZipCodeError("We could not verify that zip code right now")
    } finally {
      setIsValidatingZip(false)
    }
  }, [goToNextStep, setIsValidatingZip, setState, setZipCodeCity, setZipCodeError, zipCode])

  const getStepError = useCallback(
    (step: number): string | null => {
      switch (step) {
        case 1:
          return spendingPurpose ? null : "Please select what you need the funds for"
        case 5:
          return validation.getStep5Error(monthlyIncome)
        case 6:
          return validation.getStep6Error(debtAmount)
        case 7:
          return validation.getStep7Error(nextPayDate)
        case 8:
          return validation.getStep8Error(secondPayDate)
        case 10:
          return hasDirectDeposit ? null : "Please choose an option"
        case 11:
          return bankAccountDuration ? null : "Please choose how long you have had this account"
        case 12:
          return validation.getStep12Error(bankRoutingNumber)
        case 13:
          return validation.getStep13Error(bankName)
        case 14:
          return validation.getStep14Error(bankAccountNumber)
        case 15:
          return digitsOnly(zipCode).length === 5 ? null : "Please enter a valid 5-digit US zip code"
        case 16:
          return validation.getStep16Error(streetAddress, state)
        case 19:
          return validation.getStep19Error(email)
        case 21:
          return validation.getStep21Error(driverLicenseState)
        case 22:
          return validation.getStep22Error(driverLicenseState, driverLicenseNumber)
        case 25:
          return validation.getStep25Error(employer)
        case 27:
          return occupation.trim() ? null : "Occupation is required"
        case 28:
          return digitsOnly(monthlyHousingPayment)
            ? null
            : "Monthly housing payment is required"
        case 33:
          return validation.getStep33Error(firstName, lastName)
        case 34:
          return validation.getStep34Error(birthdate)
        case 35:
          return digitsOnly(homePhoneNumber).length === 10
            ? null
            : "Please enter a valid 10-digit phone number"
        case 36:
          return digitsOnly(workPhoneNumber).length === 10
            ? null
            : "Please enter a valid 10-digit phone number"
        case 37:
          return digitsOnly(phoneNumber).length === 10
            ? null
            : "Please enter a valid 10-digit cell phone number"
        case 38:
          if (digitsOnly(ssn).length !== 9) return "Please enter a valid 9-digit SSN"
          if (!acceptedTerms) return "Please accept the terms to continue"
          return null
        default:
          return null
      }
    },
    [
      acceptedTerms,
      bankAccountDuration,
      bankAccountNumber,
      bankName,
      bankRoutingNumber,
      birthdate,
      debtAmount,
      driverLicenseNumber,
      driverLicenseState,
      email,
      employer,
      firstName,
      hasDirectDeposit,
      homePhoneNumber,
      lastName,
      monthlyHousingPayment,
      monthlyIncome,
      nextPayDate,
      occupation,
      phoneNumber,
      secondPayDate,
      spendingPurpose,
      ssn,
      state,
      streetAddress,
      workPhoneNumber,
      zipCode,
    ]
  )

  const currentStepError = getStepError(currentStep)

  const handleContinue = useCallback(() => {
    markFieldTouched(currentStep)
    lastUserInteractionStepRef.current = currentStep
    if (getStepError(currentStep)) return
    if (currentStep === 15) {
      void validateZipAndContinue()
      return
    }
    goToNextStep()
  }, [
    currentStep,
    getStepError,
    goToNextStep,
    lastUserInteractionStepRef,
    markFieldTouched,
    validateZipAndContinue,
  ])

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return
    event.preventDefault()
    if (currentStep === TOTAL_STEPS) return
    handleContinue()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentStep !== TOTAL_STEPS) {
      handleContinue()
      return
    }

    markFieldTouched(TOTAL_STEPS)
    if (getStepError(TOTAL_STEPS)) return

    setSubmitError("")
    setIsSubmitting(true)

    const certInput = document.querySelector<HTMLInputElement>("#xxTrustedFormCertUrl_0")
    const tokenInput = document.querySelector<HTMLInputElement>("#xxTrustedFormToken_0")
    const certUrl = certInput?.value ?? trustedFormCertUrl
    if (certUrl) setTrustedFormCertUrl(certUrl)

    const payload = {
      loanAmount: getCookie("borrowAmount") ?? "",
      spendingPurpose,
      creditScore,
      employmentStatus,
      paymentFrequency,
      monthlyIncome: digitsOnly(monthlyIncome),
      debtAmount: digitsOnly(debtAmount),
      nextPayDate,
      secondPayDate,
      hasCheckingAccount,
      hasDirectDeposit,
      bankAccountDuration,
      bankRoutingNumber: digitsOnly(bankRoutingNumber),
      bankName: bankName.trim(),
      bankAccountNumber: bankAccountNumber.trim(),
      zipCode: digitsOnly(zipCode).slice(0, 5),
      city: zipCodeCity.trim(),
      state: state.trim().toUpperCase(),
      address: streetAddress.trim(),
      homeOwnership,
      addressDuration,
      email: email.trim(),
      vehicleStatus,
      driverLicenseState,
      driverLicenseNumber: driverLicenseNumber.trim().toUpperCase(),
      isMilitaryMember,
      unsecuredDebtAmount,
      employer: employer.trim(),
      employerDuration,
      occupation: occupation.trim(),
      monthlyHousingPayment: digitsOnly(monthlyHousingPayment),
      hasFiledBankruptcy,
      bankruptcyChapter,
      bankruptcyStatus,
      bankruptcyDischargedInLast2Years,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthdate,
      homePhoneNumber: digitsOnly(homePhoneNumber),
      workPhoneNumber: digitsOnly(workPhoneNumber),
      phoneNumber: digitsOnly(phoneNumber),
      ssn: digitsOnly(ssn),
      subid1: subid1 || (getCookie("subid1") ?? ""),
      subid2: subid2 || (getCookie("subid2") ?? ""),
      subid3: subid3 || (getCookie("subid3") ?? ""),
      xxTrustedFormCertUrl: certUrl,
      xxTrustedFormToken: tokenInput?.value ?? "",
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as {
        success?: boolean
        error?: string
        redirectUrl?: string
      }

      if (!res.ok || !data.success) {
        setSubmitError(data.error ?? "Submission failed. Please try again.")
        return
      }

      clearPersistedForm()
      window.location.href = data.redirectUrl ?? "/thankyou"
    } catch {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const showPrevious = currentStep > 1
  const motivation = getMotivationCopy(currentStep)

  return (
    <div className="min-h-full bg-[#F8FAFC] py-6">
      <div ref={topRef} />
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto w-full max-w-2xl px-4"
        aria-label={`Loan application, ${progress}% complete`}
      >
        <TrustedForm />

        <div key={motivation.title} className="mb-5 md:mb-6">
          <p className="text-center font-sans text-lg font-bold text-[#0F2D52] transition-opacity duration-300 md:text-xl xl:text-2xl">
            {motivation.title}
          </p>
          <p
            className="mx-auto mt-1.5 max-w-xl text-center font-sans text-sm font-normal text-[#4B5563] md:text-[0.95rem]"
            style={{ lineHeight: 1.55 }}
          >
            {motivation.subtitle}
          </p>
        </div>

        <ProgressBar
          type="1"
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          foregroundColor="#C62828"
          backgroundColor="#E5E7EB"
          className="mb-8"
        />

        {currentStep === 1 ? (
          <StepShell
            title="What do you need the funds for?"
            subtitle="Choose the option that fits your plan best."
          >
            <SelectInput
              options={spendingOptions}
              value={spendingPurpose}
              onChange={setSpendingPurpose}
              placeholder="Select a purpose"
              searchable
              searchPlaceholder="Search purposes..."
              className="h-14 rounded-[6px] border-[#CCCCCF] text-[0.85rem] text-[#2C3E50] xl:h-15 xl:text-base"
            />
            <ErrorBox message={touchedFields[1] ? currentStepError : null} />
            <NavRow>
              <PrimaryButton disabled={!spendingPurpose} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 2 ? (
          <StepShell title="How would you rate your credit score?">
            <div className="flex flex-col gap-3">
              {creditScoreOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={creditScore === option.value}
                  onClick={() => selectChoice(2, creditScore, setCreditScore, option.value)}
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 3 ? (
          <StepShell title="What is your employment status?">
            <div className="flex flex-col gap-3">
              {employmentStatusOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={employmentStatus === option.value}
                  onClick={() =>
                    selectChoice(3, employmentStatus, setEmploymentStatus, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 4 ? (
          <StepShell title="How often are you paid?">
            <div className="flex flex-col gap-3">
              {paymentFrequencyOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={paymentFrequency === option.value}
                  onClick={() =>
                    selectChoice(4, paymentFrequency, setPaymentFrequency, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 5 ? (
          <StepShell
            title="What is your monthly income?"
            subtitle="Enter your total income before taxes."
          >
            <ErrorBox message={touchedFields[5] ? errors[5] : null} />
            <input
              ref={incomeInputRef}
              type="text"
              inputMode="numeric"
              value={monthlyIncome}
              onChange={(e) => handleCurrencyChange(setMonthlyIncome)(e.target.value)}
              onBlur={() => markFieldTouched(5)}
              onKeyDown={handleInputKeyDown}
              placeholder="$ 0"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 6 ? (
          <StepShell
            title="How much debt do you currently have?"
            subtitle="Include credit cards, loans and other balances."
          >
            <ErrorBox message={touchedFields[6] ? errors[6] : null} />
            <input
              ref={debtInputRef}
              type="text"
              inputMode="numeric"
              value={debtAmount}
              onChange={(e) => handleCurrencyChange(setDebtAmount)(e.target.value)}
              onBlur={() => markFieldTouched(6)}
              onKeyDown={handleInputKeyDown}
              placeholder="$ 0"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 7 ? (
          <StepShell title="When is your next pay date?">
            <ErrorBox message={touchedFields[7] ? errors[7] : null} />
            <DatePicker
              value={nextPayDate}
              onChange={(value) => {
                setNextPayDate(value)
                setSecondPayDate("")
                markFieldTouched(7)
              }}
              onEnterKeyPress={handleContinue}
              minDate={nextPayDateBounds.min}
              maxDate={nextPayDateBounds.max}
              placeholder="Select your next pay date"
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 8 ? (
          <StepShell title="When is your second pay date?">
            <ErrorBox message={touchedFields[8] ? errors[8] : null} />
            {secondPayDateBounds ? (
              <p className="mb-4 rounded-lg border border-[#E2E8F0] bg-[#F4F8FF] p-3 text-sm text-[#0F2D52]">
                Based on your pay frequency, your second pay date should fall near{" "}
                <span className="font-semibold">
                  {formatDisplayDate(secondPayDateBounds.expected)}
                </span>
                . Select any date between {formatDisplayDate(secondPayDateBounds.min)} and{" "}
                {formatDisplayDate(secondPayDateBounds.max)}.
              </p>
            ) : null}
            <DatePicker
              value={secondPayDate}
              onChange={(value) => {
                setSecondPayDate(value)
                markFieldTouched(8)
              }}
              onEnterKeyPress={handleContinue}
              minDate={secondPayDateBounds?.min}
              maxDate={secondPayDateBounds?.max}
              placeholder="Select your second pay date"
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 9 ? (
          <StepShell title="Do you have an active checking account?">
            <div className="flex flex-col gap-3">
              {yesNoOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={hasCheckingAccount === option.value}
                  onClick={() =>
                    selectChoice(9, hasCheckingAccount, setHasCheckingAccount, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 10 ? (
          <StepShell title="Is your income deposited directly into your bank account?">
            <div className="flex flex-col gap-3">
              {yesNoOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={hasDirectDeposit === option.value}
                  onClick={() => {
                    lastUserInteractionStepRef.current = 10
                    isNavigatingBackRef.current = false
                    setHasDirectDeposit(option.value)
                    if (option.value === "yes") {
                      window.setTimeout(() => goToNextStep(), AUTO_ADVANCE_DELAY_MS)
                    }
                  }}
                />
              ))}
            </div>
            {hasDirectDeposit === "no" ? (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <p className="text-sm text-amber-700">
                  Most lenders in our network prefer direct deposit, but you can still continue
                  your application. Your options may be more limited.
                </p>
              </div>
            ) : null}
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              {hasDirectDeposit === "no" ? (
                <PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>
              ) : null}
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 11 ? (
          <StepShell title="How long have you had this bank account?">
            <SelectInput
              options={bankAccountDurationOptions}
              value={bankAccountDuration}
              onChange={setBankAccountDuration}
              placeholder="Select a duration"
              className="h-14 rounded-[6px] border-[#CCCCCF] text-[0.85rem] text-[#2C3E50] xl:h-15 xl:text-base"
            />
            <ErrorBox message={touchedFields[11] ? currentStepError : null} />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 12 ? (
          <StepShell
            title="What is your bank routing number?"
            subtitle="This is the 9-digit number on the bottom left of your checks."
          >
            <ErrorBox message={touchedFields[12] ? errors[12] : null} />
            <input
              ref={routingNumberInputRef}
              type="text"
              inputMode="numeric"
              value={bankRoutingNumber}
              onChange={(e) => setBankRoutingNumber(formatRoutingNumber(e.target.value))}
              onBlur={() => markFieldTouched(12)}
              onKeyDown={handleInputKeyDown}
              placeholder="000-000-000"
              className={INPUT_FIELD}
            />
            {isLookingUpBank ? (
              <p className="mt-2 text-sm text-[#4B5563]">Looking up your bank...</p>
            ) : null}
            {bankLookupError ? (
              <p className="mt-2 text-sm text-amber-700">{bankLookupError}</p>
            ) : null}
            {bankName && !isLookingUpBank ? (
              <p className="mt-2 text-sm font-medium text-[#0F2D52]">{bankName}</p>
            ) : null}
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 13 ? (
          <StepShell title="What is the name of your bank?">
            <ErrorBox message={touchedFields[13] ? errors[13] : null} />
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              onBlur={() => markFieldTouched(13)}
              onKeyDown={handleInputKeyDown}
              placeholder="Bank name"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 14 ? (
          <StepShell title="What is your bank account number?">
            <ErrorBox message={touchedFields[14] ? errors[14] : null} />
            <input
              type="text"
              inputMode="numeric"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value.replace(/[^0-9]/g, "").slice(0, 30))}
              onBlur={() => markFieldTouched(14)}
              onKeyDown={handleInputKeyDown}
              placeholder="Account number"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 15 ? (
          <StepShell title="What is your zip code?">
            <ErrorBox message={zipCodeError || (touchedFields[15] ? currentStepError : null)} />
            <input
              type="text"
              inputMode="numeric"
              value={zipCode}
              onChange={(e) => {
                setZipCode(digitsOnly(e.target.value).slice(0, 5))
                setZipCodeError("")
              }}
              onBlur={() => markFieldTouched(15)}
              onKeyDown={handleInputKeyDown}
              placeholder="Zip code"
              className={INPUT_FIELD}
            />
            {zipCodeCity ? (
              <p className="mt-2 text-sm font-medium text-[#0F2D52]">
                {[zipCodeCity, state].filter(Boolean).join(", ")}
              </p>
            ) : null}
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton
                disabled={!!currentStepError || isValidatingZip}
                onClick={handleContinue}
              >
                {isValidatingZip ? "Checking..." : "Continue"}
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 16 ? (
          <StepShell title="What is your street address?">
            <ErrorBox message={touchedFields[16] ? errors[16] : null} />
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                onBlur={() => markFieldTouched(16)}
                onKeyDown={handleInputKeyDown}
                placeholder="Street address"
                autoComplete="address-line1"
                className={INPUT_FIELD}
              />
              <SelectInput
                options={driverLicenseStateOptions}
                value={state}
                onChange={setState}
                placeholder="Select your state"
                searchable
                searchPlaceholder="Search states..."
                className="h-14 rounded-[6px] border-[#CCCCCF] text-[0.85rem] text-[#2C3E50] xl:h-15 xl:text-base"
              />
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 17 ? (
          <StepShell title="Do you own or rent your home?">
            <div className="flex flex-col gap-3">
              {homeOwnershipOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={homeOwnership === option.value}
                  onClick={() => selectChoice(17, homeOwnership, setHomeOwnership, option.value)}
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 18 ? (
          <StepShell title="How long have you lived at this address?">
            <div className="flex flex-col gap-3">
              {addressDurationOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={addressDuration === option.value}
                  onClick={() =>
                    selectChoice(18, addressDuration, setAddressDuration, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 19 ? (
          <StepShell title="What is your email address?">
            <ErrorBox message={touchedFields[19] ? errors[19] : null} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => markFieldTouched(19)}
              onKeyDown={handleInputKeyDown}
              placeholder="you@example.com"
              autoComplete="email"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 20 ? (
          <StepShell title="Do you own a vehicle?">
            <div className="flex flex-col gap-3">
              {vehicleStatusOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={vehicleStatus === option.value}
                  onClick={() => selectChoice(20, vehicleStatus, setVehicleStatus, option.value)}
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 21 ? (
          <StepShell title="Which state issued your driver's license?">
            <ErrorBox message={touchedFields[21] ? errors[21] : null} />
            <SelectInput
              options={driverLicenseStateOptions}
              value={driverLicenseState}
              onChange={(value) => {
                setDriverLicenseState(value)
                setDriverLicenseNumber("")
              }}
              placeholder="Select a state"
              searchable
              searchPlaceholder="Search states..."
              className="h-14 rounded-[6px] border-[#CCCCCF] text-[0.85rem] text-[#2C3E50] xl:h-15 xl:text-base"
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 22 ? (
          <StepShell
            title="What is your driver's license number?"
            subtitle={`Your state requires ${licenseMaxLength} characters.`}
          >
            <ErrorBox message={touchedFields[22] ? errors[22] : null} />
            <input
              ref={driverLicenseInputRef}
              type="text"
              value={driverLicenseNumber}
              maxLength={licenseMaxLength}
              onChange={(e) =>
                setDriverLicenseNumber(
                  e.target.value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, licenseMaxLength)
                )
              }
              onBlur={() => markFieldTouched(22)}
              onKeyDown={handleInputKeyDown}
              placeholder="License number"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 23 ? (
          <StepShell title="Are you an active member of the military?">
            <div className="flex flex-col gap-3">
              {yesNoOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={isMilitaryMember === option.value}
                  onClick={() =>
                    selectChoice(23, isMilitaryMember, setIsMilitaryMember, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 24 ? (
          <StepShell title="How much unsecured debt do you have?">
            <div className="flex flex-col gap-3">
              {unsecuredDebtAmountOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={unsecuredDebtAmount === option.value}
                  onClick={() =>
                    selectChoice(24, unsecuredDebtAmount, setUnsecuredDebtAmount, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 25 ? (
          <StepShell title="Who is your employer?">
            <ErrorBox message={touchedFields[25] ? errors[25] : null} />
            <input
              type="text"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              onBlur={() => markFieldTouched(25)}
              onKeyDown={handleInputKeyDown}
              placeholder="Employer name"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 26 ? (
          <StepShell title="How long have you worked for this employer?">
            <div className="flex flex-col gap-3">
              {employerDurationOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={employerDuration === option.value}
                  onClick={() =>
                    selectChoice(26, employerDuration, setEmployerDuration, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 27 ? (
          <StepShell title="What is your occupation?">
            <ErrorBox message={touchedFields[27] ? currentStepError : null} />
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              onBlur={() => markFieldTouched(27)}
              onKeyDown={handleInputKeyDown}
              placeholder="Occupation"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 28 ? (
          <StepShell title="What is your monthly housing payment?">
            <ErrorBox message={touchedFields[28] ? currentStepError : null} />
            <input
              ref={housingPaymentInputRef}
              type="text"
              inputMode="numeric"
              value={monthlyHousingPayment}
              onChange={(e) => handleCurrencyChange(setMonthlyHousingPayment)(e.target.value)}
              onBlur={() => markFieldTouched(28)}
              onKeyDown={handleInputKeyDown}
              placeholder="$ 0"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 29 ? (
          <StepShell title="Have you ever filed for bankruptcy?">
            <div className="flex flex-col gap-3">
              {yesNoOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={hasFiledBankruptcy === option.value}
                  onClick={() =>
                    selectChoice(29, hasFiledBankruptcy, setHasFiledBankruptcy, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 30 ? (
          <StepShell title="Which chapter did you file?">
            <div className="flex flex-col gap-3">
              {bankruptcyChapterOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={bankruptcyChapter === option.value}
                  onClick={() =>
                    selectChoice(30, bankruptcyChapter, setBankruptcyChapter, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 31 ? (
          <StepShell title="What is the status of your bankruptcy?">
            <div className="flex flex-col gap-3">
              {bankruptcyStatusOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={bankruptcyStatus === option.value}
                  onClick={() =>
                    selectChoice(31, bankruptcyStatus, setBankruptcyStatus, option.value)
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 32 ? (
          <StepShell title="Was your bankruptcy discharged in the last 2 years?">
            <div className="flex flex-col gap-3">
              {bankruptcyDischargedOptions.map((option) => (
                <ChoiceOption
                  key={option.value}
                  label={option.label}
                  selected={bankruptcyDischargedInLast2Years === option.value}
                  onClick={() =>
                    selectChoice(
                      32,
                      bankruptcyDischargedInLast2Years,
                      setBankruptcyDischargedInLast2Years,
                      option.value
                    )
                  }
                />
              ))}
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 33 ? (
          <StepShell title="What is your name?">
            <ErrorBox message={touchedFields[33] ? errors[33] : null} />
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => markFieldTouched(33)}
                onKeyDown={handleInputKeyDown}
                placeholder="First name"
                autoComplete="given-name"
                className={INPUT_FIELD}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => markFieldTouched(33)}
                onKeyDown={handleInputKeyDown}
                placeholder="Last name"
                autoComplete="family-name"
                className={INPUT_FIELD}
              />
            </div>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 34 ? (
          <StepShell title="What is your date of birth?">
            <ErrorBox message={touchedFields[34] ? errors[34] : null} />
            <BirthdatePicker
              value={birthdate}
              onChange={(value) => {
                setBirthdate(value)
                markFieldTouched(34)
              }}
              onEnterKeyPress={handleContinue}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 35 ? (
          <StepShell title="What is your home phone number?">
            <ErrorBox message={touchedFields[35] ? currentStepError : null} />
            <input
              ref={homePhoneInputRef}
              type="tel"
              inputMode="tel"
              value={homePhoneNumber}
              onChange={(e) => setHomePhoneNumber(formatPhoneNumber(e.target.value))}
              onBlur={() => markFieldTouched(35)}
              onKeyDown={handleInputKeyDown}
              placeholder="(000) 000 - 0000"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 36 ? (
          <StepShell title="What is your work phone number?">
            <ErrorBox message={touchedFields[36] ? currentStepError : null} />
            <input
              ref={workPhoneInputRef}
              type="tel"
              inputMode="tel"
              value={workPhoneNumber}
              onChange={(e) => setWorkPhoneNumber(formatPhoneNumber(e.target.value))}
              onBlur={() => markFieldTouched(36)}
              onKeyDown={handleInputKeyDown}
              placeholder="(000) 000 - 0000"
              className={INPUT_FIELD}
            />
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 37 ? (
          <StepShell title="What is your cell phone number?">
            <ErrorBox message={touchedFields[37] ? currentStepError : null} />
            <input
              ref={phoneInputRef}
              type="tel"
              inputMode="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              onBlur={() => markFieldTouched(37)}
              onKeyDown={handleInputKeyDown}
              placeholder="(000) 000 - 0000"
              autoComplete="tel"
              className={INPUT_FIELD}
            />
            <p className="mt-4 text-justify text-[0.7rem] leading-relaxed text-[#4B5563] xl:text-[0.8rem]">
              By providing your phone number you agree that we and our lending partners may
              contact you at the number provided, including by autodialer, prerecorded or
              artificial voice, SMS and MMS, even if your number is on a state, federal or
              corporate Do Not Call list. Consent is not a condition of receiving a loan.
              Message and data rates may apply and message frequency varies.
            </p>
            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton disabled={!!currentStepError} onClick={handleContinue}>
                Continue
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}

        {currentStep === 38 ? (
          <StepShell
            title="Final step - what is your Social Security number?"
            subtitle="Lenders use this to verify your identity. Your information is encrypted."
          >
            <ErrorBox message={touchedFields[38] ? currentStepError : null} />
            <input
              ref={ssnInputRef}
              type="text"
              inputMode="numeric"
              value={ssn}
              onChange={(e) => setSsn(formatSSN(e.target.value))}
              onBlur={() => markFieldTouched(38)}
              placeholder="000-00-0000"
              autoComplete="off"
              className={INPUT_FIELD}
            />

            <label className="mt-5 flex items-start gap-3 text-justify text-[0.7rem] leading-relaxed text-[#4B5563] xl:text-[0.8rem]">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[#C62828]"
              />
              <span>
                By submitting this form I electronically sign (pursuant to the ESIGN Act) and
                agree to the{" "}
                <a
                  href="/terms-of-use"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3399FF] underline"
                >
                  Terms of Use
                </a>
                , including the{" "}
                <a href="/terms-of-use#dispute-resolution" className="text-[#3399FF] underline">
                  Arbitration provision
                </a>
                , and the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3399FF] underline"
                >
                  Privacy Policy
                </a>
                . I authorize lenders and lending partners to verify my information and to
                contact me about my request.
              </span>
            </label>

            {submitError ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {submitError}
              </p>
            ) : null}

            <NavRow>
              <PreviousButton onClick={goToPreviousStep} />
              <PrimaryButton type="submit" disabled={!!currentStepError || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </PrimaryButton>
            </NavRow>
          </StepShell>
        ) : null}
      </form>
    </div>
  )
}

export default function LoanForm() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-[#0F2D52]">
          Loading...
        </div>
      }
    >
      <LoanFormInner />
    </Suspense>
  )
}
