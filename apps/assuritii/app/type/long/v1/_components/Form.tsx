"use client"

import React, { useState } from 'react'
import { TextInput as TextInputUI } from "@workspace/ui/components/text-input"
import { SelectInput as SelectInputUI } from "@workspace/ui/components/select-input"
import { PhoneNumberInput as PhoneNumberInputUI } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput as ZipCodeInputUI } from "@workspace/ui/components/zip-code-input"
import { Button as ButtonUI } from "@workspace/ui/components/button"
import { CarTaxiFront, UserRoundPen } from "lucide-react"
import { FORM_CONTENT } from "@/lib/constant"

const carYearOptions = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  
]

const carMakeOptions = [
  { value: "toyota", label: "Toyota" },
  { value: "honda", label: "Honda" },
  { value: "ford", label: "Ford" },
  
]

const carModelOptions = [
  { value: "camry", label: "Camry" },
  { value: "accord", label: "Accord" },
  { value: "f150", label: "F-150" },
  
]

export default function Form() {
  const [carYear, setCarYear] = useState("")
  const [carMake, setCarMake] = useState("")
  const [carModel, setCarModel] = useState("")
  const [currentMileage, setCurrentMileage] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [zipCode, setZipCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = {
      carYear,
      carMake,
      carModel,
      currentMileage,
      firstName,
      lastName,
      email,
      phoneNumber,
      zipCode,
    }

    console.log("Form submitted with data:", formData)
  }

  return (

    
    <div className="w-full max-w-4xl xl:max-w-[700px] overflow-hidden rounded-[10px] border border-[#1F3A5F] shadow-[4px_4px_20px_0_rgba(17,24,39,0.20)]">
      <form
        onSubmit={handleSubmit}
        className="form w-full flex flex-col items-center justify-center gap-6 font-['Inter']"
      >

      
        <h2 className="text-base md:text-lg xl:text-2xl w-full font-semibold text-white text-[#111827] bg-[#1F3A5F] text-center font-['Inter'] py-5 px-5 xl:py-6 xl:px-6">
            {FORM_CONTENT.header}
        </h2>
      
        
        <div className="w-full  flex flex-col md:flex-row items-center justify-center gap-6 px-5 ">
          <div className="w-full md:w-[50%] flex flex-col items-center justify-center gap-5">
            <div className="inline-flex items-center gap-2 bg-[#E8F0FA] rounded-[20px] px-3 py-1.5 ">
              <CarTaxiFront className="w-4.5 h-4.5 text-[#0F2440]" />
              <span className="text-[0.8rem] font-semibold text-[#0F2440] uppercase tracking-wide font-['Inter']">
                {FORM_CONTENT.tabs.vehicleDetails}
              </span>
            </div>
            
            <div className="w-full space-y-3.5">
              <SelectInputUI
                label={FORM_CONTENT.fields.carYear.label}
                placeholder={FORM_CONTENT.fields.carYear.placeholder}
                options={carYearOptions}
                value={carYear}
                onChange={setCarYear}
                searchable
                searchPlaceholder="Search options..."
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />
              
              <SelectInputUI
                label={FORM_CONTENT.fields.carMake.label}
                placeholder={FORM_CONTENT.fields.carMake.placeholder}
                options={carMakeOptions}
                value={carMake}
                onChange={setCarMake}
                searchable
                searchPlaceholder="Search options..."
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />
              
              <SelectInputUI
                label={FORM_CONTENT.fields.carModel.label}
                placeholder={FORM_CONTENT.fields.carModel.placeholder}
                options={carModelOptions}
                value={carModel}
                onChange={setCarModel}
                searchable
                searchPlaceholder="Search options..."
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />
              
              <TextInputUI
                label={FORM_CONTENT.fields.currentMileage.label}
                placeholder={FORM_CONTENT.fields.currentMileage.placeholder}
              
                value={currentMileage}
                onChange={(e) => setCurrentMileage(e.target.value)}
                type="number"
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />
            </div>
          </div>

          <div className="w-full md:w-[50%] flex flex-col items-center justify-center gap-5">
            <div className="inline-flex items-center gap-2 bg-[#E8F0FA] rounded-[20px] px-3 py-1.5">
              <UserRoundPen className="w-4.5 h-4.5 text-[#0F2440]" />
              <span className="text-[0.8rem] font-semibold text-[#0F2440] uppercase tracking-wide font-['Inter']">
                {FORM_CONTENT.tabs.personalDetails}
              </span>
            </div>
            
            <div className="w-full space-y-3.5">
              <TextInputUI
                label={FORM_CONTENT.fields.firstName.label}
                placeholder={FORM_CONTENT.fields.firstName.placeholder}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />
              
              <TextInputUI
                label={FORM_CONTENT.fields.lastName.label}
                placeholder={FORM_CONTENT.fields.lastName.placeholder}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />
              
              <TextInputUI
                label={FORM_CONTENT.fields.email.label}
                placeholder={FORM_CONTENT.fields.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhoneNumberInputUI
                  label={FORM_CONTENT.fields.phoneNumber.label}
                  value={phoneNumber}
                  placeholder="(123) 4567 - 890"
                  onChange={setPhoneNumber}
                  className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
                />
                
                <ZipCodeInputUI
                  label={FORM_CONTENT.fields.zipCode.label}
                  placeholder="Enter Zip Code"
                  value={zipCode}
                  onChange={setZipCode}
                  className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-5 px-5 pb-6">
          <div className="w-full">
            <ButtonUI
              type="1"
              variant="default"
              htmlType="submit"
              className="w-full bg-[#3498DB] text-white py-6 text-sm xl:text-base font-semibold font-['Inter'] rounded-[10px]"
            >
              {FORM_CONTENT.button}
            </ButtonUI>
          </div>

          <p className="w-full text-[0.62rem] xl:text-[0.7rem] text-[#374151] text-center leading-relaxed font-['Inter']">
            {FORM_CONTENT.disclaimer}
          </p>
        </div>
      </form>
    </div>
  )
}