"use client"

import { useId, useState } from "react"
import { ArrowRightIcon, Loader2 } from "lucide-react"
import { BRAND_DOMAIN, BRAND_NAME, FORM_PRIMARY_COLOR } from "@/lib/constant"
import {
  FORM_FIELD_TEXT_INPUT_CLASSNAME,
  FORM_TEXT_INPUT_ERROR_CLASSNAME,
} from "@/lib/form-input-styles"
import { cn } from "@workspace/ui/lib/utils"

interface StepPhoneProps {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void | Promise<void>
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function StepPhone({ value, onChange, onSubmit }: StepPhoneProps) {
  const errorId = useId()
  const [error, setError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)
  const digits = value.replace(/\D/g, "")
  const phoneDisplay = digits.length === 10 ? formatPhone(value) : "[Phone_Number]"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatPhone(e.target.value))
    if (error) setError(null)
  }

  const handleContinue = async () => {
    if (digits.length !== 10) return

    setVerifying(true)
    setError(null)

    try {
      const res = await fetch("/api/verify-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: value }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setError(data.error ?? "Please enter a valid phone number")
        return
      }

      await onSubmit()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      )
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div>
      <h2
        className="text-2xl font-bold text-center tracking-tight leading-tight mb-8 md:mb-10"
        style={{ color: FORM_PRIMARY_COLOR }}
      >
        What is your phone number?
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <input
            type="tel"
            value={value}
            onChange={handleChange}
            placeholder="e.g. (555) 000-1234"
            required
            disabled={verifying}
            autoComplete="tel"
            className={cn(
              FORM_FIELD_TEXT_INPUT_CLASSNAME,
              error && FORM_TEXT_INPUT_ERROR_CLASSNAME
            )}
            style={{ color: FORM_PRIMARY_COLOR }}
            aria-label="Phone number"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
          {error && (
            <p id={errorId} className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={digits.length !== 10 || verifying}
          onClick={() => void handleContinue()}
          className="w-full rounded-lg px-6 py-3.5 text-base font-bold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#F97316" }}
        >
          {verifying ? (
            <>
              <Loader2 className="w-4.5 h-4.5 inline-block animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              Finish &amp; Get Quotes
              <ArrowRightIcon className="w-4.5 h-4.5 xl:w-5 xl:h-5 inline-block ml-2" />
            </>
          )}
        </button>

        <p
          className="text-[0.65rem] xl:text-[0.75rem] text-gray-700 text-left leading-relaxed mt-4"
          style={{ lineHeight: "1.5" }}
        >
          By clicking Finish &amp; Get Quotes and submitting this form, I am providing express written consent to being contacted by you,{" "}
          <a
            href="https://www.insurlii.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            {BRAND_DOMAIN}
          </a>
          , or by one or more agents or brokers or your partners which companies I agree may reach me to discuss my interest, including offers of insurance, at {phoneDisplay} and/or the email address I have provided to you in submitting this form and/or additional information obtained. I consent by electronic signature to being contacted by telephone (via call and/or text) for marketing/telemarketing purposes at {phoneDisplay}, even if my phone number is listed on a Do Not Call Registry, and I agree that such contact may be made using an automatic telephone dialing system and/or an artificial or prerecorded voice (standard call, text message, and data rates apply). I can revoke my consent at any time. I also understand that my agreement to be contacted is not a condition of purchasing any property, goods or services. By clicking Finish &amp; Get Quotes and submitting this form, I affirm that I have read and agree to {BRAND_NAME}&apos;s{" "}
          <a href="/privacy-policy" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          {" "}and{" "}
          <a href="/terms-of-use" className="underline hover:text-gray-700">
            Terms of Use
          </a>
          {" "}including the arbitration provision and the{" "}
          <a href="/terms-of-use#e-sign-consent" className="underline hover:text-gray-700">
            E-SIGN Consent
          </a>
          .
        </p>
      </div>
    </div>
  )
}
