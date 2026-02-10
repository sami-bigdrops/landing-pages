"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { TextInput as TextInputUI } from "@workspace/ui/components/text-input"
import { SelectInput as SelectInputUI } from "@workspace/ui/components/select-input"
import { PhoneNumberInput as PhoneNumberInputUI } from "@workspace/ui/components/phone-number-input"
import { ZipCodeInput as ZipCodeInputUI } from "@workspace/ui/components/zip-code-input"
import { Button as ButtonUI } from "@workspace/ui/components/button"
import { CarTaxiFront, UserRoundPen } from "lucide-react"
import { TrustedForm, getCookie } from "@workspace/lp-core"
import { FORM_CONTENT } from "@/lib/constant"

type SelectOption = { value: string; label: string }

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

  const [yearOptions, setYearOptions] = useState<SelectOption[]>([])
  const [makeOptions, setMakeOptions] = useState<SelectOption[]>([])
  const [modelOptions, setModelOptions] = useState<SelectOption[]>([])

  const [yearsLoading, setYearsLoading] = useState(true)
  const [makesLoading, setMakesLoading] = useState(false)
  const [modelsLoading, setModelsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "error">("idle")
  const [submitError, setSubmitError] = useState("")

  const makesCache = useRef<Record<string, SelectOption[]>>({})
  const modelsCache = useRef<Record<string, SelectOption[]>>({})

  useEffect(() => {
    let cancelled = false
    setYearsLoading(true)
    fetch("/api/vehicle/years")
      .then((res) => res.json())
      .then((data: SelectOption[]) => {
        const options = Array.isArray(data) ? data : []
        if (!cancelled) setYearOptions(options)
        const currentYear = String(new Date().getFullYear())
        if (!cancelled && options.some((o) => o.value === currentYear)) {
          fetch(`/api/vehicle/makes?year=${encodeURIComponent(currentYear)}`)
            .then((r) => r.json())
            .then((makes: SelectOption[]) => {
              if (!cancelled) {
                makesCache.current[currentYear] = Array.isArray(makes) ? makes : []
              }
            })
            .catch(() => {})
        }
      })
      .catch(() => {
        if (!cancelled) setYearOptions([])
      })
      .finally(() => {
        if (!cancelled) setYearsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!carYear) {
      setMakeOptions([])
      setCarMake("")
      setCarModel("")
      setModelOptions([])
      return
    }
    const cached = makesCache.current[carYear]
    if (cached !== undefined) {
      setMakeOptions(cached)
      setCarMake("")
      setCarModel("")
      setModelOptions([])
      return
    }
    let cancelled = false
    setMakesLoading(true)
    setCarMake("")
    setCarModel("")
    setModelOptions([])
    fetch(`/api/vehicle/makes?year=${encodeURIComponent(carYear)}`)
      .then((res) => res.json())
      .then((data: SelectOption[]) => {
        const options = Array.isArray(data) ? data : []
        if (!cancelled) {
          makesCache.current[carYear] = options
          setMakeOptions(options)
        }
      })
      .catch(() => {
        if (!cancelled) setMakeOptions([])
      })
      .finally(() => {
        if (!cancelled) setMakesLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [carYear])

  useEffect(() => {
    if (!carMake) {
      setModelOptions([])
      setCarModel("")
      return
    }
    const cached = modelsCache.current[carMake]
    if (cached !== undefined) {
      setModelOptions(cached)
      setCarModel("")
      return
    }
    let cancelled = false
    setModelsLoading(true)
    setCarModel("")
    fetch(`/api/vehicle/models?makeId=${encodeURIComponent(carMake)}`)
      .then((res) => res.json())
      .then((data: SelectOption[]) => {
        const options = Array.isArray(data) ? data : []
        if (!cancelled) {
          modelsCache.current[carMake] = options
          setModelOptions(options)
        }
      })
      .catch(() => {
        if (!cancelled) setModelOptions([])
      })
      .finally(() => {
        if (!cancelled) setModelsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [carMake])

  const handleYearChange = useCallback((value: string) => {
    setCarYear(value)
  }, [])

  const handleMakeChange = useCallback((value: string) => {
    setCarMake(value)
  }, [])

  const handleModelChange = useCallback((value: string) => {
    setCarModel(value)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus("loading")
    setSubmitError("")

    const form = e.currentTarget
    const certInput = form.elements.namedItem("xxTrustedFormCertUrl") as HTMLInputElement | null
    const tokenInput = form.elements.namedItem("xxTrustedFormToken") as HTMLInputElement | null

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      zipCode: zipCode.trim(),
      carYear,
      carMake,
      carModel,
      currentMileage: currentMileage.trim(),
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

  const makePlaceholder = !carYear
    ? "Select year first"
    : makesLoading
      ? "Loading..."
      : FORM_CONTENT.fields.carMake.placeholder

  const modelPlaceholder = !carMake
    ? "Select make first"
    : modelsLoading
      ? "Loading..."
      : FORM_CONTENT.fields.carModel.placeholder

  return (
    <div className="w-full max-w-4xl xl:max-w-[700px] overflow-hidden rounded-[10px] border border-[#1F3A5F] shadow-[4px_4px_20px_0_rgba(17,24,39,0.20)]">
      <form
        onSubmit={handleSubmit}
        className="form w-full flex flex-col items-center justify-center gap-6 font-['Inter']"
      >
        <TrustedForm />
        <h2 className="text-base md:text-lg xl:text-2xl w-full font-semibold text-white bg-[#1F3A5F] text-center font-['Inter'] py-5 px-5 xl:py-6 xl:px-6">
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
                placeholder={
                  yearsLoading ? "Loading..." : FORM_CONTENT.fields.carYear.placeholder
                }
                options={yearOptions}
                value={carYear}
                onChange={handleYearChange}
                searchable
                searchPlaceholder="Search options..."
                disabled={yearsLoading}
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />

              <SelectInputUI
                label={FORM_CONTENT.fields.carMake.label}
                placeholder={makePlaceholder}
                options={makeOptions}
                value={carMake}
                onChange={handleMakeChange}
                searchable
                searchPlaceholder="Search options..."
                disabled={!carYear || makesLoading}
                className="rounded-[6px] px-4 py-6 mt-1 border border-[#D1D5DB] bg-[#FBFBFC] placeholder:text-[#9CA3AF] placeholder:text-sm"
              />

              <SelectInputUI
                label={FORM_CONTENT.fields.carModel.label}
                placeholder={modelPlaceholder}
                options={modelOptions}
                value={carModel}
                onChange={handleModelChange}
                searchable
                searchPlaceholder="Search options..."
                disabled={!carMake || modelsLoading}
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
          {submitStatus === "error" && submitError && (
            <p className="w-full text-sm text-red-600 text-center font-['Inter']" role="alert">
              {submitError}
            </p>
          )}
          <div className="w-full">
            <ButtonUI
              type="1"
              variant="default"
              htmlType="submit"
              disabled={submitStatus === "loading"}
              className="w-full bg-[#3498DB] text-white py-6 text-sm xl:text-base font-semibold font-['Inter'] rounded-[10px]"
            >
              {submitStatus === "loading" ? "Submitting..." : FORM_CONTENT.button}
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
