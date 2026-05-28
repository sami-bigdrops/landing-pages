"use client"

import { FORM_PRIMARY_COLOR } from "@/lib/constant"
import { ArrowRightIcon } from "lucide-react"

interface StepPhoneProps {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function StepPhone({ value, onChange, onSubmit }: StepPhoneProps) {
  const digits = value.replace(/\D/g, "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatPhone(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (digits.length === 10) onSubmit()
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your phone number?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder="e.g. (555) 000-1234"
          required
          autoComplete="tel"
          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm lg:text-base font-medium outline-none transition-colors focus:border-[#205BB9] focus:ring-2 focus:ring-[#E2F1FD]"
          style={{ color: FORM_PRIMARY_COLOR }}
          aria-label="Phone number"
        />

        <button
          type="submit"
          disabled={digits.length !== 10}
          className="w-full rounded-lg px-6 py-3.5 text-base  font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#F97316" }}
        >
          Finish &amp; Get Quotes 
          <ArrowRightIcon className="w-4.5 h-4.5 xl:w-5 xl:h-5 inline-block ml-2" />
        </button>

        <p className="text-[0.65rem] xl:text-[0.75rem] text-gray-700 text-left leading-relaxed mt-4"style={{lineHeight: "1.5"}}>
          By clicking Finish &amp; Get Quotes and submitting this form, I am providing express written consent to being contacted by you,{" "}
          <a href="https://www.everquote.com/marketing-partners/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
            EverQuote Marketing Partners
          </a>
          , or by one or more agents or brokers or your partners which companies I agree may reach me to discuss my interest, including offers of insurance, at the phone number and/or email address I have provided to you in submitting this form and/or additional information obtained. I consent by electronic signature to being contacted by telephone (via call and/or text) for marketing/telemarketing purposes at the phone number I provided in this form, even if my phone number is listed on a Do Not Call Registry, and I agree that such contact may be made using an automatic telephone dialing system and/or an artificial or prerecorded voice (standard call, text message, and data rates apply). I can revoke my consent at any time. I also understand that my agreement to be contacted is not a condition of purchasing any property, goods or services, and that I may call 1-855-940-1377 to speak with someone about obtaining an insurance quote. By clicking Finish &amp; Get Quotes and submitting this form, I affirm that I have read and agree to this website’s{" "}
          <a href="/privacy-policy" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          {" "}and{" "}
          <a href="/terms-of-use" className="underline hover:text-gray-700">
            Terms of Use
          </a>
          {" "}including the arbitration provision and the{" "}
          <a href="https://www.everquote.com/legal/esign-consent/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
            E-SIGN Consent
          </a>
          .
        </p>

   
      </form>
    </div>
  )
}
