"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUtmParams } from "@workspace/lp-core"
import PartnerLogos from "@/app/_components/PartnerLogos"
import CreditScoreNotice from "@/app/_components/CreditScoreNotice"
import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"
import {
  DEBT_AMOUNT_STORAGE_KEY,
  FORM_STEP_NAMES,
  trackArohaa,
} from "@/lib/arohaa"
import { SelectInput } from "@workspace/ui/components/select-input"

const INPUT_FIELD =
  "mt-0 h-14 w-full rounded-[10px] border border-[#AAAEC1] bg-white px-4 text-sm text-[#111827] shadow-[0_4px_12px_0_rgba(0,0,0,0.06)] focus:border-[#102E50] focus:outline-none xl:h-15 xl:text-base"

const options = [
  { label: "Less than $7,500", value: "under_7500" },
  { label: "$7,500 – $10,000", value: "7500_10000" },
  { label: "$10,000 – $15,000", value: "10000_15000" },
  { label: "$15,000 – $20,000", value: "15000_20000" },
  { label: "$20,000 – $30,000", value: "20000_30000" },
  { label: "$30,000+", value: "30000_plus" },
]

export default function Hero() {
  useUtmParams(30)
  const [value, setValue] = useState("")
  const [showError, setShowError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    trackArohaa("form_start")
    trackArohaa("form_step_view", {
      step: 1,
      step_name: FORM_STEP_NAMES[1],
    })
  }, [])

  const handleContinue = () => {
    if (!value) {
      setShowError(true)
      return
    }

    try {
      sessionStorage.setItem(DEBT_AMOUNT_STORAGE_KEY, value)
    } catch {
      // ignore storage failures
    }
    router.push("/form")
  }

  const handleSelectChange = (selectedValue: string) => {
    setValue(selectedValue)
    setShowError(false)
  }

  return (
    <div className="relative bg-white w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10 xl:px-20 xl:py-16 ">
      <div className="container mx-auto">
        <div className="hero-content flex flex-col items-center justify-center gap-8 xl:gap-11">
          

          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5">
            <Form />
          </div>

         
        </div>
      </div>
    </div>
  )
}
