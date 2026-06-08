"use client"

import { useState } from "react"

type YesNo = "yes" | "no"

type FormState = {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  email: string
  phone: string
  preferredContactMethod: string
  receiveInformationVia: string
  wantAccess: YesNo
  wantDelete: YesNo
  wantOptOutSale: YesNo
  isAuthorizedAgent: YesNo
}

type FormErrors = Partial<Record<keyof FormState, string>>

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  phone: "",
  preferredContactMethod: "Both",
  receiveInformationVia: "Email",
  wantAccess: "no",
  wantDelete: "no",
  wantOptOutSale: "no",
  isAuthorizedAgent: "no",
}

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#1e1e1e] font-inter focus:outline-none focus:ring-2 focus:ring-blue-500/40"

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-bold text-[#1e1e1e] mb-1 font-inter">
      {children}
      <span className="text-red-600">*</span>
    </label>
  )
}

function YesNoToggle({
  value,
  onChange,
  primaryColor,
}: {
  value: YesNo
  onChange: (v: YesNo) => void
  primaryColor: string
}) {
  const base =
    "min-w-[4.5rem] px-4 py-2 text-sm font-semibold border transition-colors font-inter"
  const selected = { backgroundColor: primaryColor, color: "#fff", borderColor: primaryColor }
  const unselected = {
    backgroundColor: "#fff",
    color: primaryColor,
    borderColor: "#d1d5db",
  }

  return (
    <div className="flex shrink-0">
      <button
        type="button"
        onClick={() => onChange("yes")}
        className={`${base} rounded-l`}
        style={value === "yes" ? selected : unselected}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange("no")}
        className={`${base} rounded-r border-l-0`}
        style={value === "no" ? selected : unselected}
      >
        No
      </button>
    </div>
  )
}

export default function CcpaRequestForm({ primaryColor }: { primaryColor: string }) {
  const [formData, setFormData] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const validate = (): boolean => {
    const next: FormErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.firstName.trim()) next.firstName = "Required"
    if (!formData.lastName.trim()) next.lastName = "Required"
    if (!formData.address.trim()) next.address = "Required"
    if (!formData.city.trim()) next.city = "Required"
    if (!formData.state.trim()) next.state = "Required"
    if (!formData.zip.trim()) next.zip = "Required"
    else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim())) next.zip = "Enter a valid ZIP code"
    if (!formData.email.trim()) next.email = "Required"
    else if (!emailRegex.test(formData.email.trim())) next.email = "Enter a valid email"
    if (!formData.phone.trim()) next.phone = "Required"

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("idle")
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/ccpa-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok && result.success) {
        setFormData(INITIAL)
        setErrors({})
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const questionRow = (
    label: string,
    key: "wantAccess" | "wantDelete" | "wantOptOutSale" | "isAuthorizedAgent"
  ) => (
    <div
      key={key}
      className="flex flex-col gap-3 py-4 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm font-bold text-[#1e1e1e] font-inter sm:max-w-[70%]">{label}</p>
      <YesNoToggle
        value={formData[key]}
        onChange={(v) => setField(key, v)}
        primaryColor={primaryColor}
      />
    </div>
  )

  return (
    <form id="ccpa-form" onSubmit={handleSubmit} className="mt-10 space-y-4 font-inter">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <RequiredLabel>First Name</RequiredLabel>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            className={inputClass}
          />
          {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <RequiredLabel>Last Name</RequiredLabel>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            className={inputClass}
          />
          {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <RequiredLabel>Address</RequiredLabel>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setField("address", e.target.value)}
          className={inputClass}
        />
        {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <RequiredLabel>City</RequiredLabel>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setField("city", e.target.value)}
            className={inputClass}
          />
          {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
        </div>
        <div>
          <RequiredLabel>State</RequiredLabel>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => setField("state", e.target.value)}
            className={inputClass}
          />
          {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
        </div>
        <div>
          <RequiredLabel>Zip</RequiredLabel>
          <input
            type="text"
            value={formData.zip}
            onChange={(e) => setField("zip", e.target.value)}
            className={inputClass}
          />
          {errors.zip && <p className="text-red-600 text-xs mt-1">{errors.zip}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <RequiredLabel>Email</RequiredLabel>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setField("email", e.target.value)}
            className={inputClass}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <RequiredLabel>Phone</RequiredLabel>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={inputClass}
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3 py-4 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-[#1e1e1e] font-inter sm:max-w-[70%]">
          What are your preferred contact methods for questions about your request?
        </p>
        <select
          value={formData.preferredContactMethod}
          onChange={(e) => setField("preferredContactMethod", e.target.value)}
          className={`${inputClass} sm:w-40`}
        >
          <option value="Both">Both</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
        </select>
      </div>

      <div className="flex flex-col gap-3 py-4 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-[#1e1e1e] font-inter sm:max-w-[70%]">
          How do you want to receive the information you requested?
        </p>
        <select
          value={formData.receiveInformationVia}
          onChange={(e) => setField("receiveInformationVia", e.target.value)}
          className={`${inputClass} sm:w-40`}
        >
          <option value="Email">Email</option>
          <option value="Mail">Mail</option>
        </select>
      </div>

      {questionRow("Do you want access to your Personal Information?", "wantAccess")}
      {questionRow("Do you want us to delete your Personal Information?", "wantDelete")}
      {questionRow(
        "Do you want to opt-out of the sale of your Personal Information?",
        "wantOptOutSale"
      )}
      {questionRow(
        "Are you submitting this request as an authorized agent for the above consumer?",
        "isAuthorizedAgent"
      )}

      {status === "success" && (
        <p className="text-sm text-green-700 text-center">
          Your request has been submitted. We will respond according to applicable timelines.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 text-center">
          Something went wrong. Please try again or call 877-323-7750.
        </p>
      )}

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-10 py-2.5 rounded text-white font-semibold text-sm disabled:opacity-60 font-inter"
          style={{ backgroundColor: primaryColor }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  )
}
