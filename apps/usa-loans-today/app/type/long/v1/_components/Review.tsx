"use client"

import React from 'react'
import Image from 'next/image'
import { REVIEW_CONTENT } from '@/lib/constant'

export default function Review() {
  return (
    <div className="review bg-[#F8FAFC] w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10 xl:px-23 xl:py-15">
      <div className="container mx-auto max-w-[1300px] ">
        <div className="review-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-15 xl:pb-5 ">
          <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-5 xl:gap-6">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl  font-bold text-[#1A1A1A] text-center font-sans md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] mx-auto" style={{
              lineHeight: "1.3",
            }}>
              {REVIEW_CONTENT.header}
            </h2>

            <div className=" flex w-full items-center justify-center  gap-2">

              <p className="text-[0.85rem] xl:text-[1.15rem] text-center  font-medium text-[#2C3E50]  font-sans">
                {REVIEW_CONTENT.trustpilot.text}
              </p>
              <div className="w-auto h-6.5 xl:h-9 flex items-center justify-center">
                <Image
                  src={REVIEW_CONTENT.trustpilot.logo.src}
                  alt={REVIEW_CONTENT.trustpilot.logo.alt}
                  width={104}
                  height={104}
                  className="w-full h-full object-contain"
                />
              </div>


            </div>

          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4  lg:gap-6 xl:gap-8 ">
              {REVIEW_CONTENT.reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full md:w-auto min-w-0 bg-white border border-[#CEDBEC] shadow-[0_4px_15px_0_rgba(44,62,80,0.02)] rounded-[10px] flex flex-col items-start justify-start gap-5 p-4.5 py-5.5 xl:p-6 xl:gap-5 md:min-h-[220px] lg:min-h-[195px] xl:min-h-[225px]"
                >
           


                  <div className="w-full flex items-center justify-between gap-3">
                    <div className="flex items-center justify-start gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-4 w-4 shrink-0 xl:h-5.5 xl:w-5.5"
                        aria-hidden
                      >
                        <path
                          d="M20 7.67123H12.3577L10.0163 0L7.64228 7.67123L0 7.63699L6.17886 12.363L3.80488 20L9.98374 15.274L16.1626 20L13.7886 12.363L20 7.67123Z"
                          fill="#04DA8D"
                        />
                      </svg>
                      <p className="flex items-baseline gap-0 font-sans leading-none">
                        <span className="text-base font-bold text-[#1A1A1A] xl:text-[1.3rem]">5</span>
                       
                        <span className="text-[0.7rem] font-normal text-[#1A1A1A] xl:text-base">/5</span>
                      </p>
                    </div>

                    
                    <div className="flex items-center justify-start gap-0.5">
                      <p className="text-[0.77rem] xl:text-[0.95rem] text-[#486581] font-sans">
                        {review.date}
                      </p>
                        
                     </div>
                    



                  </div>

                  <p className="text-[0.85rem]   xl:text-base xl:mt-0.5  xl:max-w-[330px] font-medium  text-[#486581] font-sans flex-1" style={{ lineHeight: 1.6 }}>
                    {review.quote}
                  </p>

                  <div className="w-full flex flex-col items-start justify-start xl:flex-row xl:items-center xl:justify-between gap-2 mt-auto">
                    <div className="flex items-center justify-start gap-3  ">
                      <div className="w-10 h-10 xl:w-11.5 xl:h-11.5 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                        <Image
                          src={review.customer.image.src}
                          alt={review.customer.image.alt}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-0.5 ">
                        <p className="font-bold text-[0.85rem]  xl:text-base text-[#1A1A1A] font-sans">
                          {review.customer.name}
                        </p>
                        <p className="text-xs  xl:text-sm text-[#2C3E50] font-sans">
                          {review.customer.location}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

