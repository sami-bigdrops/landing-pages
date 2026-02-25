"use client"

import React from 'react'
import Image from 'next/image'
import { REVIEW_CONTENT } from '@/lib/constant'

export default function Review() {
  return (
    <div className="review bg-white w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-20 xl:py-14">
      <div className="container mx-auto">
        <div className="review-content w-full flex flex-col items-center justify-center gap-8 md:gap-8 lg:gap-10 xl:gap-16">
          <h2 className="text-2xl md:text-[1.7rem] lg:text-3xl xl:text-4xl font-bold text-[#111827] text-center font-sans ">
            {REVIEW_CONTENT.header}
          </h2>

          <div className="w-full flex flex-col items-center justify-center md:flex-row  gap-6">
            {REVIEW_CONTENT.testimonialImages.map((image) => (
              <div key={image.id} className="relative w-full  h-auto md:max-w-[400px] md:h-[230px]">
                <Image src={image.testimonialImage.src} alt={image.testimonialImage.alt} width={200} height={200} 
                className="w-full h-full object-cover" priority />

                <div className="absolute bottom-0 left-0 mb-2 ml-2 bg-[#FFFFFF] px-3 py-1.5 rounded-[6px]">
                  <p className="text-[#1F3A5F] text-left text-xs  font-semibold font-sans">BEFORE</p>
                </div>

                <div className="absolute bottom-0 right-0 mb-2 mr-2 bg-[#FFFFFF] px-3 py-1.5 rounded-[6px]">
                  <p className="text-[#1F3A5F] text-right text-xs  font-semibold font-sans">AFTER</p>
                </div>
              </div>
            ))}

          </div>

          <div>
            
          </div>


        </div>
      </div>
    </div>
  )
}

