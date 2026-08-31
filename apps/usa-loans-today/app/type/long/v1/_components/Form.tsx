"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "@workspace/lp-core"
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group"

const BORROW_AMOUNT_OPTIONS = [
  { value: "100-1000", label: "$100 - $1000" },
  { value: "1000-2000", label: "$1000 - $2000" },
  { value: "2000-3000", label: "$2000 - $3000" },
  { value: "3000-4000", label: "$3000 - $4000" },
  { value: "4000-5000", label: "$4000 - $5000" },
  { value: "5000+", label: "$5000+" },
] as const

const OFFER_CARD_SHELL =
  "flex w-full flex-col items-center gap-6 lg:gap-7 xl:gap-8 rounded-[15px] border border-[#E2E8F0] bg-white shadow-[0_0_10px_0_rgba(31,58,95,0.15)] px-5 py-6 md:px-6 xl:py-8"
const OFFER_CARD_TITLE =
  "text-center font-inter text-sm xl:text-[1.2rem] font-normal text-[#182542]"

function HeroBorrowForm() {
  const router = useRouter()
  const [borrowAmount, setBorrowAmount] = useState("")

  const handleSelect = (value: string) => {
    setBorrowAmount(value)
    setCookie("borrowAmount", value)
    router.push("/form")
  }

  return (
    <section className="flex w-full flex-col items-center gap-8 md:min-h-[190px] md:gap-10 xl:min-h-[250px] xl:gap-12">
      <div className="flex w-full items-center justify-center">
        <section className={OFFER_CARD_SHELL}>
          <div className="flex flex-col items-center justify-center gap-1.5 xl:gap-2">
            <h2 className="text-center font-sans text-lg font-extrabold uppercase tracking-normal text-[#0F2D52] md:text-xl xl:text-[1.7rem]">
              Start Your Loan Search
            </h2>
            <p className={OFFER_CARD_TITLE}>How much would you like to borrow?</p>
          </div>
          <div className="flex w-full flex-col items-center gap-5 md:gap-5">
            <RadioButtonGroup
              name="borrowAmount"
              options={[...BORROW_AMOUNT_OPTIONS]}
              value={borrowAmount}
              onChange={handleSelect}
              type="1"
              layout="column"
              containerClassName="w-full"
              className="w-full gap-3.5 md:mb-1 md:grid lg:mb-2 lg:grid-cols-2"
              optionClassName="w-full rounded-[10px] border border-[#D1D5DB] bg-white"
              selectedOptionBackgroundColor="#F4F8FF"
              selectedOptionBorderColor="#2563EB"
              selectedIndicatorColor="#C62828"
            />
            <p
              className="flex items-center justify-center gap-2 text-left font-inter text-[0.8rem] font-medium text-[#486581] xl:text-[0.9rem]"
              style={{ lineHeight: 1.4 }}
            >
              <img src="/Lock.svg" alt="" width={18} height={18} className="h-4 w-4 shrink-0" />
              <span>
                Checking your options <span className="font-bold text-[#2C3E50]">won&apos;t affect</span>{" "}
                your credit score.
              </span>
            </p>
          </div>
        </section>
      </div>
    </section>
  )
}

export default function Form({ heroOnly = false }: { heroOnly?: boolean }) {
  if (!heroOnly) {
    return null
  }

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[190px] items-center justify-center bg-white">
          <div className="text-base font-semibold text-[#102E50] md:text-lg">Loading...</div>
        </div>
      }
    >
      <HeroBorrowForm />
    </Suspense>
  )
}
