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
  d2FirstName: string
  d2LastName: string
  d3FirstName: string
  d3LastName: string
  vehicleYear: string
  vehicleType: FormVehicleType
  vehicleMake: string
  vehicleModel: string
  v1Ownership: string
  v1PrimaryUse: string
  v1Miles: string
  v1Coverage: string
  addVehicle2: boolean | null
  v2Year: string
  v2Make: string
  v2VehicleType: FormVehicleType
  v2Model: string
  v2Ownership: string
  v2PrimaryUse: string
  v2Miles: string
  v2Coverage: string
  addVehicle3: boolean | null
  v3Year: string
  v3Make: string
  v3VehicleType: FormVehicleType
  v3Model: string
  v3Ownership: string
  v3PrimaryUse: string
  v3Miles: string
  v3Coverage: string
  hadInsurance: boolean | null
  currentInsurer: string
  yearsInsured: string
  driverCount: 1 | 2 | 3
  d1Gender: string
  d1Married: boolean | null
  d1Education: string
  d1Occupation: string
  d1CreditScore: string
  d1Accidents: string
  d1Tickets: string
  d1DUI: boolean | null
  d1Suspended: boolean | null
  d2Relation: string
  d2Gender: string
  d2Married: boolean | null
  d2Education: string
  d2Occupation: string
  d2Accidents: string
  d2Tickets: string
  d2DUI: boolean | null
  d2Suspended: boolean | null
  d2DOB: string
  d3Relation: string
  d3Gender: string
  d3Married: boolean | null
  d3Education: string
  d3Occupation: string
  d3Accidents: string
  d3Tickets: string
  d3DUI: boolean | null
  d3Suspended: boolean | null
  d3DOB: string
  isHomeowner: boolean | null
  wantsHomeDiscount: boolean | null
  wantsRentersDiscount: boolean | null
  servedMilitary: boolean | null
  helpGoal: string
  belongsToAARP: boolean | null
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
    d2FirstName: input.d2FirstName,
    d2LastName: input.d2LastName,
    d3FirstName: input.d3FirstName,
    d3LastName: input.d3LastName,
    vehicleYear: input.vehicleYear,
    vehicleType: input.vehicleType,
    vehicleMake: input.vehicleMake,
    vehicleModel: input.vehicleModel,
    v1Ownership: input.v1Ownership,
    v1PrimaryUse: input.v1PrimaryUse,
    v1Miles: input.v1Miles,
    v1Coverage: input.v1Coverage,
    addVehicle2: input.addVehicle2,
    v2Year: input.v2Year,
    v2Make: input.v2Make,
    v2VehicleType: input.v2VehicleType,
    v2Model: input.v2Model,
    v2Ownership: input.v2Ownership,
    v2PrimaryUse: input.v2PrimaryUse,
    v2Miles: input.v2Miles,
    v2Coverage: input.v2Coverage,
    addVehicle3: input.addVehicle3,
    v3Year: input.v3Year,
    v3Make: input.v3Make,
    v3VehicleType: input.v3VehicleType,
    v3Model: input.v3Model,
    v3Ownership: input.v3Ownership,
    v3PrimaryUse: input.v3PrimaryUse,
    v3Miles: input.v3Miles,
    v3Coverage: input.v3Coverage,
    hadInsurance: input.hadInsurance,
    currentInsurer: input.currentInsurer,
    yearsInsured: input.yearsInsured,
    driverCount: input.driverCount,
    d1Gender: input.d1Gender,
    d1Married: input.d1Married,
    d1Education: input.d1Education,
    d1Occupation: input.d1Occupation,
    d1CreditScore: input.d1CreditScore,
    d1Accidents: input.d1Accidents,
    d1Tickets: input.d1Tickets,
    d1DUI: input.d1DUI,
    d1Suspended: input.d1Suspended,
    d2Relation: input.d2Relation,
    d2Gender: input.d2Gender,
    d2Married: input.d2Married,
    d2Education: input.d2Education,
    d2Occupation: input.d2Occupation,
    d2Accidents: input.d2Accidents,
    d2Tickets: input.d2Tickets,
    d2DUI: input.d2DUI,
    d2Suspended: input.d2Suspended,
    d2DOB: input.d2DOB,
    d3Relation: input.d3Relation,
    d3Gender: input.d3Gender,
    d3Married: input.d3Married,
    d3Education: input.d3Education,
    d3Occupation: input.d3Occupation,
    d3Accidents: input.d3Accidents,
    d3Tickets: input.d3Tickets,
    d3DUI: input.d3DUI,
    d3Suspended: input.d3Suspended,
    d3DOB: input.d3DOB,
    isHomeowner: input.isHomeowner,
    wantsHomeDiscount: input.wantsHomeDiscount,
    wantsRentersDiscount: input.wantsRentersDiscount,
    servedMilitary: input.servedMilitary,
    helpGoal: input.helpGoal,
    belongsToAARP: input.belongsToAARP,
    subid1,
    subid2,
    subid3,
    xxTrustedFormCertUrl: input.xxTrustedFormCertUrl,
    xxTrustedFormToken: input.xxTrustedFormToken,
  }
}
