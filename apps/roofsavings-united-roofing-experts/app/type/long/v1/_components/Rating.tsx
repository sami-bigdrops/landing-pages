"use client"

import React from 'react'
import Image from 'next/image'
import { RATING_CONTENT } from '@/lib/constant'



export default function Rating() {
  
  return (
    <div className="steps bg-white w-full h-full px-6 py-6 md:px-6 md:py-8 lg:px-14 lg:py-10  xl:px-23 xl:py-11">
      <div className="container mx-auto">
        <div className="step-content w-full flex flex-col items-center justify-center gap-5 md:gap-5 xl:gap-6 ">
          <div className="w-full flex flex-col items-center justify-center gap-1.5 md:gap-1" >
            <Image src={RATING_CONTENT.starImage.src} alt={RATING_CONTENT.starImage.alt} width={20} height={20}
              className="w-35 xl:w-43 h-auto  object-cover object-center" />
            <h2 className="text-2xl md:text-3xl xl:text-4xl   font-bold  text-[#000000] text-center font-sans " style={{ lineHeight: "1.3" }}>
              {RATING_CONTENT.headline}
            </h2>
          </div>
          <p className="text-center font-sans text-sm text-center font-normal text-[#000000]  xl:text-lg md:max-w-[440px] lg:max-w-[440px] xl:max-w-[550px] " style={{ lineHeight: 1.6 }}>
            {RATING_CONTENT.description}
          </p>


          <div className="bottom flex w-full flex-col items-center justify-center">
            <Image src={RATING_CONTENT.RatingImage.src} alt={RATING_CONTENT.RatingImage.alt} width={500} height={500}
              className="w-full h-full object-cover object-center md:h-auto  md:max-w-[370px] xl:max-w-[440px]  " />
          </div>


        </div>

      </div>

    </div>
  )
}