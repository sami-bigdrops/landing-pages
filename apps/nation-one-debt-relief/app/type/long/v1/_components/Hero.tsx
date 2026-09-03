"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUtmParams } from "@workspace/lp-core"
import PartnerLogos from "@/app/_components/PartnerLogos"
import CreditScoreNotice from "@/app/_components/CreditScoreNotice"
import { HERO_CONTENT } from "@/lib/constant"
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

  const handleContinue = () => {
    if (!value) {
      setShowError(true)
      return
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
          <div className=" w-full flex flex-col items-center  gap-2 xl:gap-2.5">
            <h1 className="w-full text-center  font-extrabold text-[#142B4A] text-3xl  xl:text-4xl  font-sans" style={{ lineHeight: "1.3" }}>
              {HERO_CONTENT.headline}
            </h1>
       
            <p className="text-center text-sm xl:text-lg text-center text-[#475467] font-normal md:max-w-[480px] lg:max-w-[500px] xl:max-w-[600px]" style={{ lineHeight: "1.6" }}>
              {HERO_CONTENT.description}
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5">
            <h3 className="text-center text-lg  font-semibold text-[#142B4A] xl:text-xl ">How much debt do you have?</h3>

            <div className="w-full flex flex-col-reverse items-center justify-center gap-4 md:max-w-[300px] xl:max-w-[330px]">
              <div className="flex w-full max-w-lg flex-col gap-4">
                <div className="flex w-full items-stretch gap-2.5 md:max-w-[300px] xl:max-w-[330px] md:mx-auto">
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="h-12 flex-1 cursor-pointer rounded-[10px] bg-[#BF0A30] text-sm xl:text-base font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 md:h-[52px] md:py-3.5 xl:h-14 xl:text-[1.05rem]"
                  >
                    See My Options
                  </button>
                </div>
                <CreditScoreNotice />
              </div>

              <div className="flex w-full max-w-lg flex-col gap-4 text-left">
                <SelectInput
                  placeholder="Select debt amount"
                  options={options}
                  value={value}
                  onChange={handleSelectChange}
                  selectClassName={`${INPUT_FIELD} ${showError ? "border-red-500 focus:border-red-500" : ""}`}
                />
              </div>
            </div>
          </div>

          <PartnerLogos className="w-full mt-3"/>
        </div>
      </div>
    </div>
  )
}
