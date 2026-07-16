"use client"

import React from 'react'
import Image from 'next/image'
import { REVIEW_CONTENT } from '@/lib/constant'

export default function Review() {
  return (
    <div className="review bg-white w-full h-full px-6 py-8 md:px-8 md:py-8 lg:px-14 lg:py-10 xl:px-23 xl:py-12">
      <div className="container mx-auto max-w-[1400px] ">
        <div className="review-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-15 xl:pb-5 ">
          <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl  lg:max-w-full font-bold text-[#102A43] text-center font-sans "style={{
            lineHeight: "1.3",
          }}>
            {REVIEW_CONTENT.header}
          </h2>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-6 xl:gap-8 ">
              {REVIEW_CONTENT.reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full md:w-auto min-w-0 bg-white border border-[#CDD1D8] shadow-[0_4px_15px_0_rgba(16,46,80,0.02)] rounded-[15px] flex flex-col items-start justify-start gap-5  p-5 py-6 xl:p-6  xl:gap-5 md:min-h-[260px] lg:min-h-[250px] xl:min-h-[265px]"
                >
           
                  <div className="w-full flex items-center justify-between gap-3">
                    <div className="flex items-center justify-start gap-0.5">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          className="w-4.5 h-4.5 xl:w-6 xl:h-6"
                        >
                          <path
                            d="M9.35575 8.79725L12.2709 2.89042C12.569 2.28653 13.4301 2.28653 13.7281 2.89042L16.6433 8.79725L23.1619 9.74445C23.8283 9.84129 24.0944 10.6603 23.6122 11.1303L18.8953 15.7282L20.0088 22.2204C20.1227 22.8841 19.426 23.3903 18.8299 23.0769L12.9995 20.0117L7.16916 23.0769C6.57308 23.3903 5.87642 22.8841 5.99026 22.2204L7.10377 15.7282L2.38688 11.1303C1.90465 10.6603 2.17075 9.84129 2.83718 9.74445L9.35575 8.79725Z"
                            fill="#FFB300"
                          />
                        </svg>
                      ))}
                    </div>

                    {REVIEW_CONTENT.badge.map((badge) => (
                      <div
                        key={badge.text}
                        className="inline-flex shrink-0 items-center gap-1.5 xl:gap-1.5"
                      >
                        <Image
                          src={badge.icon}
                          alt=""
                          width={16}
                          height={16}
                          className="h-3.5 w-3.5 xl:h-4 xl:w-4 object-contain"
                          aria-hidden
                        />
                        <span className="text-[0.7rem] xl:text-sm font-normal text-[#374151] font-sans">
                          {badge.text}
                        </span>
                      </div>
                    ))}
                     


                  </div>

                  <p className="text-[0.85rem] xl:text-base xl:max-w-[330px]  text-[#374151] font-sans flex-1" style={{ lineHeight: 1.5 }}>
                    &quot;{review.quote}&quot;
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
                        <p className="font-semibold text-[0.85rem]  xl:text-base text-[#212A31] font-sans">
                          {review.customer.name}
                        </p>
                        <p className="text-xs  xl:text-sm text-[#374151] font-inter">
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

