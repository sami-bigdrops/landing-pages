"use client"

import React, { useState, useCallback } from "react"
import { TextInput as TextInputUI } from "@workspace/ui/components/text-input"
import { PhoneNumberInput as PhoneNumberInputUI } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput as ZipCodeInputUI } from "@workspace/ui/components/zip-code-input"
import { Button as ButtonUI } from "@workspace/ui/components/button"
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group"
import { TrustedForm, getCookie } from "@workspace/lp-core"

type FormProps = {
  embedInModal?: boolean
  phonePlaceholder?: string
  showPartnerBadges?: boolean
}

export default function Form({ embedInModal, phonePlaceholder = "Phone Number", showPartnerBadges = false }: FormProps = {}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isHomeowner, setIsHomeowner] = useState("")

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
      address: "",
      city: "",
      state: "",
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      zipCode: zipCode.trim(),
      isHomeowner: isHomeowner.trim(),
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
        const message = data.error ?? "Submission failed"
        if (data.field && typeof data.field === "string") {
          setFieldErrors({ [data.field]: message })
          setSubmitError("")
        } else {
          setFieldErrors({})
          setSubmitError(message)
        }
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

  const compact = !embedInModal
  return (
    <div
      className={`w-full flex flex-col justify-center items-center md:justify-end lg:justify-end ${embedInModal ? "gap-6 2xl:gap-8" : "gap-3 2xl:gap-4 shrink-0 md:h-full md:rounded-[10px] md:min-h-0 md:flex-1  md:items-stretch md:justify-center"}`}
    >
      <div
        className={`relative min-w-0 w-full rounded-[10px]  md:rounded-none  lg:mx-0 xl:mx-0  ${embedInModal ? "md:mx-auto " : "md:flex md:h-full md:min-h-0 md:w-full md:rounded-[10px] md:flex-1 md:flex-col md:items-center md:justify-center"}`}
      >
        <form
          onSubmit={handleSubmit}
          className={`flex w-full flex-col items-center justify-center bg-white md:py-4 lg:pt-4 lg:mx-0 xl:mx-0 ${compact ? "py-1.5 px-2 sm:py-2 sm:px-2.5 gap-2 rounded-[10px] md:rounded-none md:border-none md:mx-auto md:h-full md:min-h-0 md:flex-1 md:justify-center   xl:gap-2.5" : "py-3 px-5 h-full rounded-[10px] md:rounded-[10px] md:max-w-[25rem] lg:max-w-[28rem] xl:max-w-[35rem] 2xl:max-w-[33rem] md:justify-center gap-2.5 xl:gap-3"}`}
        >
          <TrustedForm />

          <h2
            id="form-modal-title"
            className={`font-bold text-[#0F172A] text-center mb-2 mt-2 md:mt-0 md:mb-3 lg:max-w-full mx-auto ${compact ? "text-[1.28rem]  leading-[1.2] max-w-[260px] md:max-w-[230px]" : "text-lg lg:text-[1.15rem] xl:text-[1.4rem] md:max-w-[250px] xl:max-w-[300px]"}`}
          >
            Start Here for Your FREE Quote
          </h2>

          <div className={`w-full flex flex-col ${compact ? "gap-1.5 xl:gap-2" : "gap-2.5 xl:gap-3"}`}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? "gap-1.5 xl:gap-2" : "gap-2 xl:gap-3"}`}>
              <TextInputUI
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  clearFieldError("firstName")
                }}
                error={fieldErrors.firstName}
                className={`rounded-[5px] border border-[#D1D5DB] bg-white placeholder:text-[#999999] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
                containerClassName="mb-0"
              />
              <TextInputUI
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                  clearFieldError("lastName")
                }}
                error={fieldErrors.lastName}
                className={`rounded-[5px] border border-[#D1D5DB] bg-white placeholder:text-[#999999] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
                containerClassName="mb-0"
              />
            </div>

            <PhoneNumberInputUI
              placeholder={phonePlaceholder}
              value={phoneNumber}
              onChange={(value) => {
                setPhoneNumber(value)
                clearFieldError("phoneNumber")
              }}
              error={fieldErrors.phoneNumber}
              className={`rounded-[5px] border border-[#D1D5DB] bg-white placeholder:text-[#999999] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
              containerClassName="mb-0"
            />

            <ZipCodeInputUI
              placeholder="Zip Code"
              value={zipCode}
              onChange={(value) => {
                setZipCode(value)
                clearFieldError("zipCode")
              }}
              error={fieldErrors.zipCode}
              className={`rounded-[5px] border border-[#D1D5DB] bg-white placeholder:text-[#999999] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
              containerClassName="mb-0"
            />

            <TextInputUI
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearFieldError("email")
              }}
              error={fieldErrors.email}
              className={`rounded-[5px] border border-[#D1D5DB] bg-white placeholder:text-[#999999] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
              containerClassName="mb-0"
            />

            <div className="w-full mt-1 mb-1">
              <p className={`font-semibold text-[#111827] text-[0.8rem] ${compact ? "text-sm mb-1.5" : "text-sm mb-2 xl:mb-2.5"}`}>Are you a homeowner?</p>
              <RadioButtonGroup
                name="isHomeowner"
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                value={isHomeowner}
                onChange={(value) => setIsHomeowner(value)}
                type="3"
                layout="row"
                className={compact ? "flex flex-row gap-1.5 !text-sm" : "flex flex-row gap-2 xl:gap-3 !text-sm"}
                optionClassName={`flex-1 justify-center items-center text-center min-w-0 border border-[#D1D5DB] bg-white text-[#111827] !text-sm transition-colors transition-colors transition duration-200 ease-in-out has-[:checked]:border-[#3498DB] has-[:checked]:bg-[#3498DB] has-[:checked]:text-white ${compact ? "rounded-[5px] py-2 h-[42px]" : "rounded-[5px] py-2 xl:py-3 h-[50px]"}`}
              />
            </div>
          </div>

          <div className={`w-full flex flex-col ${compact ? "gap-4" : "gap-5"}`}>
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
              className={`w-full rounded-[6px] bg-[#3498DB] text-white font-medium ${compact ? "py-5 xl:py-6 text-[0.85rem]" : "py-5 xl:py-6 text-sm lg:text-base xl:text-lg"}`}
            >
              {submitStatus === "loading" ? "Submitting..." : "GET YOUR FREE QUOTE"}
            </ButtonUI>

            <p className={`text-[#374151] text-left md:text-left leading-relaxed ${compact ? "text-[0.6rem] xl:text-[0.65rem]" : "text-[0.65rem] lg:text-[0.7rem] xl:text-[0.75rem]"}`}>
            By clicking the “Get Your FREE Quote" button, you agree that Brinks Home may contact you at the phone number and/or email address provided by you via phone calls, text messages, and/or emails, using automated technology, for sales/marketing purposes or any other informational purposes. Your information is collected and used in accordance with our Privacy Policy. Your consent is not required to purchase any products or services.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
