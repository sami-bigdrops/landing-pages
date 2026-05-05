"use client"

import { useState } from "react"
import Image from "next/image"
import { ProgressBar } from "@workspace/ui/components/progress-bar"

const HOME_TYPE_OPTIONS = [
  {
    id: "single_family",
    label: "Single Family Home",
    Icon: "/family.svg",
  },
  {
    id: "condominium",
    label: "Condominium / Townhome",
    Icon: "/mall.svg",
  },
  {
    id: "mobile",
    label: "Mobile / Manufactured Home",
    Icon: "/car.svg",
  },
  {
    id: "vacant_land",
    label: "Vacant Land",
    Icon: "/land.svg",
  },
] as const

type HomeTypeId = (typeof HOME_TYPE_OPTIONS)[number]["id"]

export default function Form() {
  const currentStep = 1
  const totalSteps = 4
  const [homeType, setHomeType] = useState<HomeTypeId>("condominium")

  return (
    <div className="w-full  flex flex-col items-center justify-center gap-10 md:gap-10">
      <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-[#111827]  text-center">
         Need to Sell Quickly? Get a Cash Offer Now for Your Home Today!
      </h2>
      <div className="flex w-full max-w-2xl flex-col justify-center items-center gap-3">
        <div className="w-full md:max-w-lg xl:max-w-2xl flex justify-center items-center">
        <ProgressBar
          type="8"
          currentStep={currentStep}
          totalSteps={totalSteps}
          backgroundColor="#2CA58D33"
     
          foregroundColor="#2CA58D"
        />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <h2 className="text-center text-base font-medium text-[#1C1C1C] ">
            Confirm Your Home Type
          </h2>

          <div className="grid grid-cols-2 gap-3 md:gap-4 md:max-w-lg">
            {HOME_TYPE_OPTIONS.map(({ id, label, Icon }) => {
              const selected = homeType === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setHomeType(id)}
                  aria-pressed={selected}
                  className="flex flex-col items-center justify-center gap-4 rounded-[10px] border border-[#2CA58D] bg-white px-3 py-5 text-center transition-colors md:px-4 md:py-6"
             
                    
                >
                  <span className="flex shrink-0 items-center justify-center">
                    <Image
                      src={Icon}
                      alt=""
                      width={48}
                      height={48}
                      aria-hidden
                      className="h-9.5 w-9.5 md:h-10 md:w-10 object-contain"
                    />
                  </span>
                  <span
                    className="text-[0.85rem] font-semibold leading-normal text-[#343434]"
                  >
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
