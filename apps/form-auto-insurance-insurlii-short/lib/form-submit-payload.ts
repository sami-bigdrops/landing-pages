import {
  getInsurliiTrackingFromCookies,
  toLeadSubids,
} from "@/lib/tracking-params"
import type { FormVehicleType } from "@/lib/constant"

export type FormSubmitInput = {
  zip: string
  email: string
  phone: string
  streetAddress: string
  dob: string
  city: string
  state: string
  d1FirstName: string
  d1LastName: string
  vehicleYear: string
  vehicleType: FormVehicleType
  vehicleMake: string
  vehicleModel: string
  addVehicle2: boolean | null
  v2Year: string
  v2Make: string
  v2VehicleType: FormVehicleType
  v2Model: string
  hadInsurance: boolean | null
  currentInsurer: string
  yearsInsured: string
  d1Gender: string
  d1Married: boolean | null
  d1Accidents: string
  d1DUI: boolean | null
  isHomeowner: boolean | null
  wantsHomeDiscount: boolean | null
  servedMilitary: boolean | null
  xxTrustedFormCertUrl: string
  xxTrustedFormToken: string
}

export function buildFormSubmitPayload(input: FormSubmitInput) {
  const { subid1, subid2, subid3 } = toLeadSubids(getInsurliiTrackingFromCookies())

  return {
    zipCode: input.zip,
    email: input.email,
    phoneNumber: input.phone,
    address: input.streetAddress,
    dob: input.dob,
    city: input.city,
    state: input.state,
    d1FirstName: input.d1FirstName,
    d1LastName: input.d1LastName,
    vehicleYear: input.vehicleYear,
    vehicleType: input.vehicleType,
    vehicleMake: input.vehicleMake,
    vehicleModel: input.vehicleModel,
    addVehicle2: input.addVehicle2,
    v2Year: input.v2Year,
    v2Make: input.v2Make,
    v2VehicleType: input.v2VehicleType,
    v2Model: input.v2Model,
    hadInsurance: input.hadInsurance,
    currentInsurer: input.currentInsurer,
    yearsInsured: input.yearsInsured,
    driverCount: 1,
    d1Gender: input.d1Gender,
    d1Married: input.d1Married,
    d1Accidents: input.d1Accidents,
    d1DUI: input.d1DUI,
    isHomeowner: input.isHomeowner,
    wantsHomeDiscount: input.wantsHomeDiscount,
    servedMilitary: input.servedMilitary,
    subid1,
    subid2,
    subid3,
    xxTrustedFormCertUrl: input.xxTrustedFormCertUrl,
    xxTrustedFormToken: input.xxTrustedFormToken,
  }
}
