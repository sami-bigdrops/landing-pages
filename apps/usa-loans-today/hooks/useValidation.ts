"use client"

import { useMemo } from "react"
import * as validation from "@/lib/form/validation"

type UseValidationArgs = {
  monthlyIncome: string
  debtAmount: string
  nextPayDate: string
  secondPayDate: string
  bankRoutingNumber: string
  bankName: string
  bankAccountNumber: string
  zipCode: string
  streetAddress: string
  state: string
  email: string
  driverLicenseState: string
  driverLicenseNumber: string
  employer: string
  firstName: string
  lastName: string
  birthdate: string
  touchedFields: Record<number, boolean>
}

export function useValidation(args: UseValidationArgs): Record<number, string | null> {
  return useMemo(() => {
    const errors: Record<number, string | null> = {}

    if (args.touchedFields[5]) errors[5] = validation.getStep5Error(args.monthlyIncome)
    if (args.touchedFields[6]) errors[6] = validation.getStep6Error(args.debtAmount)
    if (args.touchedFields[7]) errors[7] = validation.getStep7Error(args.nextPayDate)
    if (args.touchedFields[8]) errors[8] = validation.getStep8Error(args.secondPayDate)
    if (args.touchedFields[12]) errors[12] = validation.getStep12Error(args.bankRoutingNumber)
    if (args.touchedFields[13]) errors[13] = validation.getStep13Error(args.bankName)
    if (args.touchedFields[14]) errors[14] = validation.getStep14Error(args.bankAccountNumber)
    if (args.touchedFields[16]) errors[16] = validation.getStep16Error(args.streetAddress, args.state)
    if (args.touchedFields[19]) errors[19] = validation.getStep19Error(args.email)
    if (args.touchedFields[21]) errors[21] = validation.getStep21Error(args.driverLicenseState)
    if (args.touchedFields[22]) {
      errors[22] = validation.getStep22Error(args.driverLicenseState, args.driverLicenseNumber)
    }
    if (args.touchedFields[25]) errors[25] = validation.getStep25Error(args.employer)
    if (args.touchedFields[33]) errors[33] = validation.getStep33Error(args.firstName, args.lastName)
    if (args.touchedFields[34]) errors[34] = validation.getStep34Error(args.birthdate)

    return errors
  }, [args])
}
