"use client"

import React, { useState, useCallback, useRef } from "react"
import Script from "next/script"
import { TextInput as TextInputUI } from "@workspace/ui/components/text-input"
import { PhoneNumberInput as PhoneNumberInputUI } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput as ZipCodeInputUI } from "@workspace/ui/components/zip-code-input"
import { Button as ButtonUI } from "@workspace/ui/components/button"
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group"
import { TrustedForm, getCookie } from "@workspace/lp-core"
import Image from "next/image"
import { HERO_CONTENT } from "@/lib/constant"

const PLACES_STYLES = `
  .pac-container { border: 1px solid #e5e7eb; border-radius: 6px; margin-top: 4px; box-shadow: 0 8px 24px rgba(0,0,0,0.10); font-family: Inter, sans-serif; overflow: hidden; padding: 4px 0; background: #fff; z-index: 9999; }
  .pac-container::after { display: none; }
  .pac-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; font-size: 13px; color: #1C2833; cursor: pointer; border-top: none; transition: background 0.15s; }
  .pac-item:hover, .pac-item-selected { background: #eff8ff; }
  .pac-icon { width: 16px; height: 16px; background-image: none !important; flex-shrink: 0; }
  .pac-icon::before { content: ""; display: block; width: 14px; height: 14px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233498DB'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z'/%3E%3C/svg%3E") center/contain no-repeat; }
  .pac-item-query { font-weight: 600; color: #1C2833; font-size: 13px; }
  .pac-matched { color: #3498DB; }
`

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: { types?: string[]; componentRestrictions?: { country: string }; fields?: string[] }
          ) => {
            getPlace: () => {
              address_components?: Array<{ long_name: string; short_name: string; types: string[] }>
              formatted_address?: string
            }
            addListener: (event: string, fn: () => void) => void
          }
        }
      }
    }
  }
}

type FormProps = {
  onClose?: () => void
  embedInModal?: boolean
  phonePlaceholder?: string
  showPartnerBadges?: boolean
}

export default function Form({ onClose, embedInModal, phonePlaceholder = "Phone Number",showPartnerBadges = false }: FormProps = {}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isHomeowner, setIsHomeowner] = useState("")

  const addressInputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<{ getPlace: () => { address_components?: Array<{ long_name: string; short_name: string; types: string[] }> }; addListener: (e: string, fn: () => void) => void } | null>(null)

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

  const initAutocomplete = useCallback(() => {
    if (!addressInputRef.current || autocompleteRef.current || typeof window === "undefined" || !window.google?.maps?.places) return
    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "us" },
      fields: ["address_components", "formatted_address"],
    })
    autocompleteRef.current = autocomplete
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      if (!place?.address_components) return
      let streetNumber = "", route = "", cityVal = "", stateVal = "", zipVal = ""
      for (const comp of place.address_components) {
        const t = comp.types[0]
        if (t === "street_number") streetNumber = comp.long_name
        else if (t === "route") route = comp.short_name
        else if (t === "locality") cityVal = comp.long_name
        else if (t === "sublocality_level_1" && !cityVal) cityVal = comp.long_name
        else if (t === "administrative_area_level_1") stateVal = comp.short_name
        else if (t === "postal_code") zipVal = comp.long_name.replace(/\D/g, "").slice(0, 5)
      }
      setAddress([streetNumber, route].filter(Boolean).join(" ") || place.formatted_address || "")
      setCity(cityVal)
      setState(stateVal)
      setZipCode(zipVal)
      clearFieldError("address")
      clearFieldError("zipCode")
    })
  }, [clearFieldError])

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
      city: city.trim(),
      state: state.trim(),
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
        className={`relative min-w-0 w-full rounded-[10px] md:rounded-none  lg:mx-0 xl:mx-0  ${embedInModal ? "md:mx-auto " : "md:flex md:h-full md:min-h-0 md:w-full md:rounded-[10px] md:flex-1 md:flex-col md:items-center md:justify-center"}`}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="absolute top-1.5 right-3 md:right-17 md:top-3 lg:right-9 xl:right-7 lg:top-5 z-10 w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-4 h-4">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <form
          onSubmit={handleSubmit}
          className={`flex w-full flex-col items-center justify-center bg-white md:py-4 lg:pt-4 lg:mx-0 xl:mx-0 ${compact ? "py-1.5 px-2 sm:py-2 sm:px-2.5 gap-2 rounded-[10px] md:rounded-none md:border-none md:mx-auto md:h-full md:min-h-0 md:flex-1 md:justify-center lg:max-w-[22rem] xl:max-w-[35rem] 2xl:max-w-[30rem] xl:gap-2.5" : "py-8 px-6 xl:px-7 h-full rounded-[10px] md:rounded-[10px] md:max-w-[25rem] lg:max-w-[28rem] xl:max-w-[35rem] 2xl:max-w-[33rem] md:justify-center gap-2.5 xl:gap-3"}`}
        >
          <TrustedForm />

          <h2
            id="form-modal-title"
            className={`font-bold text-[#1F3A5F] mb-2 xl:max-w-[300px] ${onClose ? "pr-0" : ""} ${compact ? "text-left text-[1.28rem] sm:text-[1.48rem] leading-[1.2] max-w-[260px] self-start" : "text-lg lg:text-[1.15rem] text-center xl:text-[1.4rem] md:max-w-[250px] xl:max-w-[300px]"}`}
          >
            Let Us Get You Covered
            <br />
            With a Free Quote
          </h2>

          <div className={`w-full flex flex-col ${compact ? "gap-1.5 xl:gap-2" : "gap-2.5 xl:gap-3"}`}>
          <p className={`font-semibold text-[#111827] text-[0.8rem] `}>Personal Information</p>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? "gap-1.5 xl:gap-2" : "gap-2 xl:gap-3"}`}>
              <div className="relative">
                <Image src="/user.svg" alt="User icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-4 h-4 z-10 pointer-events-none" />
                <TextInputUI
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    clearFieldError("firstName")
                  }}
                  error={fieldErrors.firstName}
                  className={`pl-9 rounded-[4px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
                  containerClassName="mb-0"
                />
              </div>
              <div className="relative">
                <Image src="/user.svg" alt="User icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-4 h-4 z-10 pointer-events-none" />
                <TextInputUI
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    clearFieldError("lastName")
                  }}
                  error={fieldErrors.lastName}
                  className={`pl-9 rounded-[4px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
                  containerClassName="mb-0"
                />
              </div>
            </div>

            <div className="relative">
              <style>{PLACES_STYLES}</style>
              <Image src="/location.svg" alt="Location icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-4 h-4 z-10 pointer-events-none" />
              <input
                ref={addressInputRef}
                id="address"
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                  clearFieldError("address")
                }}
                placeholder="Address"
                autoComplete="off"
                className={`w-full pl-9 pr-3 rounded-[4px] border bg-white placeholder:text-[#9CA3AF] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${fieldErrors.address ? "border-red-400" : "border-[#D1D5DB]"} ${compact ? "py-2.5 xl:py-3" : "py-2.5 xl:py-3"}`}
              />
              {fieldErrors.address !== undefined && <p className="text-xs text-red-500 mt-1">Required</p>}
            </div>

            <div className={`grid grid-cols-2 ${compact ? "gap-1.5 xl:gap-2" : "gap-2 xl:gap-3"}`}>
              <div className="relative">
                <Image src="/location.svg" alt="Location icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-4 h-4 z-10 pointer-events-none" />
                <ZipCodeInputUI
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(value) => {
                    setZipCode(value)
                    clearFieldError("zipCode")
                  }}
                  error={fieldErrors.zipCode}
                  className={`pl-9 rounded-[4px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
                  containerClassName="mb-0"
                />
              </div>

              <div className="relative">
                <Image src="/phone.svg" alt="Phone icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-4 h-4 z-10 pointer-events-none" />
                <PhoneNumberInputUI
                  placeholder={phonePlaceholder}
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value)
                    clearFieldError("phoneNumber")
                  }}
                  error={fieldErrors.phoneNumber}
                  className={`pl-9 rounded-[4px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
                  containerClassName="mb-0"
                />
              </div>
            </div>

            <div className="relative">
              <Image src="/email.svg" alt="Email icon" width={20} height={20} className="absolute left-3 top-[50%] -translate-y-1/2 w-4 h-4 z-10 pointer-events-none" />
              <TextInputUI
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearFieldError("email")
                }}
                error={fieldErrors.email}
                className={`pl-9 rounded-[4px] border border-[#D1D5DB] bg-white placeholder:text-[#9CA3AF] text-[0.8rem] shadow-[0_0_10px_0_rgba(31,58,95,0.06)] ${compact ? "py-2.5 xl:py-3 h-auto" : "py-2.5 xl:py-3 h-auto"}`}
                containerClassName="mb-0"
              />
            </div>

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
                optionClassName={`flex-1 justify-center items-center text-center min-w-0 border border-[#D1D5DB] bg-white text-[#111827] !text-sm transition-colors transition-colors transition duration-200 ease-in-out has-[:checked]:border-[#3498DB] has-[:checked]:bg-[#3498DB] has-[:checked]:text-white ${compact ? "rounded-[4px] py-2 h-[42px]" : "rounded-[4px] py-2 xl:py-3 h-[50px]"}`}
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
              className={`w-full bg-[#3498DB] text-white font-medium rounded-[4px] ${compact ? "py-5 xl:py-6 text-sm rounded-[4px]" : "py-5 xl:py-6 text-sm lg:text-base xl:text-lg rounded-[4px]"}`}
            >
              {submitStatus === "loading" ? "Submitting..." : "Get A FREE Quote"}
            </ButtonUI>

            <p className={`text-[#374151] text-left md:text-left leading-relaxed ${compact ? "text-[0.6rem] xl:text-[0.65rem]" : "text-[0.65rem] lg:text-[0.7rem] xl:text-[0.75rem]"}`}>
              By Clicking The Button Below, You Consent To Receive Email At The Email Address You Provided, As Well As Prerecorded Messages, Auto-Dialed Phone Calls, And Text Messages At The Phone Number You Provided, From Assuritii And Its Marketing Partner.
              You Can View The Full List Of Our Marketing Partners Here
              You Understand That Your Consent Is Not A Condition Of Purchase.
              View Privacy Policy
            </p>
             
          
          </div>
        </form>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onLoad={initAutocomplete}
      />
      </div>
    </div>
  )
}
