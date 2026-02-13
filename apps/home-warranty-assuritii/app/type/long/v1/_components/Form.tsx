"use client"

import React, { useState, useCallback } from "react"
import { TextInput as TextInputUI } from "@workspace/ui/components/text-input"
import { PhoneNumberInput as PhoneNumberInputUI } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput as ZipCodeInputUI } from "@workspace/ui/components/zip-code-input"
import { Button as ButtonUI } from "@workspace/ui/components/button"
import { TrustedForm, getCookie } from "@workspace/lp-core"
import Image from "next/image"
import { HERO_CONTENT } from "@/lib/constant"

export default function Form() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({})

  const clearFieldError = useCallback((field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError("")

    const errors: Partial<Record<string, string>> = {}
    if (!firstName.trim()) errors.firstName = ""
    if (!lastName.trim()) errors.lastName = ""
    if (!address.trim()) errors.address = ""
    if (!zipCode.trim()) errors.zipCode = ""
    if (!phoneNumber.trim()) errors.phoneNumber = ""
    if (!email.trim()) errors.email = ""

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setSubmitStatus("error")
      setSubmitError("")
      return
    }

    setFieldErrors({})
    setSubmitStatus("loading")

    const form = e.currentTarget
    const certInput = form.elements.namedItem("xxTrustedFormCertUrl") as HTMLInputElement | null
    const tokenInput = form.elements.namedItem("xxTrustedFormToken") as HTMLInputElement | null

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      zipCode: zipCode.trim(),
      subid1: getCookie("subid1") ?? "",
      subid2: getCookie("subid2") ?? "",
      subid3: getCookie("subid3") ?? "",
      xxTrustedFormCertUrl: certInput?.value ?? "",
      xxTrustedFormToken: tokenInput?.value ?? "",
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        setSubmitStatus("error")
        setSubmitError(data.error ?? "Submission failed")
        return
      }

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl
        return
      }
      setSubmitStatus("idle")
    } catch {
      setSubmitStatus("error")
      setSubmitError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="w-full  flex flex-col-reverse justify-center items-center gap-6 2xl:gap-8">
      <div className="partners flex justify-center xl:justify-start">
          <div className="w-full min-w-0 flex items-center justify-center lg:justify-start xl:justify-start  gap-4 sm:gap-6 xl:gap-6 2xl:gap-11 overflow-hidden">
            <Image src={HERO_CONTENT.partners[0].src} alt={HERO_CONTENT.partners[0].alt} width={80} height={80} className="object-contain w-16 sm:w-20 lg:w-22 xl:w-24 2xl:w-30 h-auto min-w-0 flex-shrink" />
            <Image src={HERO_CONTENT.partners[1].src} alt={HERO_CONTENT.partners[1].alt} width={80} height={80} className="object-contain w-10 sm:w-16 lg:w-16 xl:w-16 2xl:w-18 h-auto min-w-0 flex-shrink" />
            <Image src={HERO_CONTENT.partners[2].src} alt={HERO_CONTENT.partners[2].alt} width={80} height={80} className="object-contain w-28 sm:w-32 lg:w-40 xl:w-50 2xl:w-63 h-auto min-w-0 flex-shrink" />
          </div>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 xl:gap-6 rounded-lg"
        >
          <TrustedForm />

          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-[2.05rem] font-bold text-[#1F3A5F] text-center md:text-left" style={{ lineHeight: "1.2" }}>
            Let Us Get You Covered With a Free Quote
          </h2>

          <div className="w-full flex flex-col gap-2.5 xl:gap-3">
            <div className="grid grid-cols-2 gap-2 xl:gap-3">
              <div className="relative">
                <Image src="/user.svg" alt="User icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 z-10 pointer-events-none" />
                <TextInputUI
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    clearFieldError("firstName")
                  }}
                  error={fieldErrors.firstName}
                  className="pl-10 rounded-[10px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-sm lg:text-[0.95rem] py-4 xl:py-4.5 h-auto shadow-[0_0_10px_0_rgba(31,58,95,0.06)]"
                  containerClassName="mb-0"
                />
              </div>
              <div className="relative">
                <Image src="/user.svg" alt="User icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 z-10 pointer-events-none" />
                <TextInputUI
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    clearFieldError("lastName")
                  }}
                  error={fieldErrors.lastName}
                  className="pl-10 rounded-[10px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-sm lg:text-[0.95rem] py-4 xl:py-4.5 h-auto shadow-[0_0_10px_0_rgba(31,58,95,0.06)]"
                  containerClassName="mb-0"
                />
              </div>
            </div>

            <div className="relative">
              <Image src="/location.svg" alt="Location icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 z-10 pointer-events-none" />
              <TextInputUI
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                  clearFieldError("address")
                }}
                error={fieldErrors.address}
                className="pl-10 rounded-[10px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-sm lg:text-[0.95rem] py-4 xl:py-4.5 h-auto shadow-[0_0_10px_0_rgba(31,58,95,0.06)]"
                containerClassName="mb-0"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-3">
              <div className="relative">
                <Image src="/location.svg" alt="Location icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 z-10 pointer-events-none" />
                <ZipCodeInputUI
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(value) => {
                    setZipCode(value)
                    clearFieldError("zipCode")
                  }}
                  error={fieldErrors.zipCode}
                  className="pl-10 rounded-[10px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-sm lg:text-[0.95rem] py-4 xl:py-4.5 h-auto shadow-[0_0_10px_0_rgba(31,58,95,0.06)]"
                  containerClassName="mb-0"
                />
              </div>
              <div className="relative">
                <Image src="/phone.svg" alt="Phone icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 z-10 pointer-events-none" />
                <PhoneNumberInputUI
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value)
                    clearFieldError("phoneNumber")
                  }}
                  error={fieldErrors.phoneNumber}
                  className="pl-10 rounded-[10px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-sm lg:text-[0.95rem] py-4 xl:py-4.5 h-auto shadow-[0_0_10px_0_rgba(31,58,95,0.06)]"
                  containerClassName="mb-0"
                />
              </div>
            </div>

            <div className="relative">
              <Image src="/email.svg" alt="Email icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-5 h-5 z-10 pointer-events-none" />
              <TextInputUI
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearFieldError("email")
                }}
                error={fieldErrors.email}
                className="pl-10 rounded-[10px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-sm lg:text-[0.95rem] py-4 xl:py-4.5 h-auto shadow-[0_0_10px_0_rgba(31,58,95,0.06)]"
                containerClassName="mb-0"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-5">
            {submitStatus === "error" && submitError && (
              <p className="w-full text-sm text-red-600 text-center" role="alert">
                {submitError}
              </p>
            )}

            <ButtonUI
              type="1"
              variant="default"
              htmlType="submit"
              disabled={submitStatus === "loading"}
              className="w-full bg-[#3498DB] text-white font-medium py-7 xl:py-7.5 rounded-[10px] text-base lg:text-lg"
            >
              {submitStatus === "loading" ? "Submitting..." : "Get FREE Quote"}
            </ButtonUI>

            <p className="text-[0.65rem] lg:text-[0.7rem] xl:text-[0.75rem] text-[#374151] text-center md:text-left leading-relaxed">
              By Clicking The Button Below, You Consent To Receive Email At The Email Address You Provided, As Well As Prerecorded Messages, Auto-Dialed Phone Calls, And Text Messages At The Phone Number You Provided, From Assuritii And Its Marketing Partner.
              You Can View The Full List Of Our Marketing Partners Here
              You Understand That Your Consent Is Not A Condition Of Purchase.
              View Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
