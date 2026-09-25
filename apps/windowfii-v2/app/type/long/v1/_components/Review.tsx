"use client"

import React from 'react'
import Image from 'next/image'
import { REVIEW_CONTENT, STEPS_CONTENT } from '@/lib/constant'

export default function Review() {
  return (
    <div className="review bg-white w-full h-full px-6 py-8 md:px-8 md:py-8 lg:px-14 lg:py-10 xl:px-23 xl:py-15">
      <div className="container mx-auto max-w-[1350px] ">
        <div className="review-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-15 xl:pb-5 ">
          <div className="flex w-full h-full flex-col items-center justify-center gap-2.5 xl:gap-4">
            <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl  md:max-w-[500px]  xl:max-w-[700px] font-bold text-[#000000] text-center font-sans" style={{ lineHeight: '1.3' }}>
              {REVIEW_CONTENT.header}
            </h2>
            <p className="text-[#333333] text-center font-normal font-sans text-[0.85rem]  xl:text-[1.14rem]  md:max-w-[530px]  xl:max-w-[830px] " style={{ lineHeight: "1.6" }}>
              {REVIEW_CONTENT.subheader}
            </p>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-6 xl:gap-10 ">
              {REVIEW_CONTENT.reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full md:w-auto min-w-0 bg-white border border-[#CDD1D8] shadow-[0_4px_15px_0_rgba(16,46,80,0.02)] rounded-[15px] flex flex-col items-start justify-start gap-5 p-4.5 py-6 xl:p-6 xl:gap-5 md:min-h-[260px] lg:min-h-[210px] xl:min-h-[260px]
                    rounded-[15px]
                    border border-[#CDD1D8]
                    bg-white
                    shadow-[0_4px_15px_0_rgba(16,46,80,0.02)]
                  "
                >



                  <p className="text-[0.85rem] xl:text-[1.05rem]  text-[#333333] font-sans flex-1" style={{ lineHeight: 1.6 }}>
                    &quot;{review.quote}&quot;
                  </p>

                  <div className="w-full flex flex-row md:flex-col-reverse md:items-start md:justify-start items-center justify-between lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-3.5 lg:gap-0 ">
                    {/* Left: Profile, name (with checkmark), time */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Profile image */}
                      <div className="w-9 h-9  xl:w-12 xl:h-12 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                        <Image
                          src={review.customer.image.src}
                          alt={review.customer.image.alt}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      {/* Name, verification, and time */}
                      <div className="flex flex-col justify-center items-start">
                        <div className="flex items-center justify-center gap-0.5">
                          <p className="font-semibold text-[0.83rem] lg:text-sm xl:text-lg text-[#000000] font-inter whitespace-nowrap">
                            {review.customer.name}
                          </p>
                          {review.customer.verified && (
                            <Image
                              src="/tick.svg"
                              alt="Verified"
                              width={16}
                              height={16}
                              className="ml-0.5 mb-1 size-3.5 xl:size-4 shrink-0"
                            />
                          )}
                        </div>
                        <p className="text-[0.75rem]  lg:text-[0.78rem] xl:text-[0.95rem] text-[#333333] font-inter">
                          {review.customer.time}
                        </p>
                      </div>
                    </div>
                    {/* Right: Stars */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="18"
                          viewBox="0 0 19 18"
                          fill="none"
                          className="w-4 h-4 xl:w-5.5 xl:h-5.5"
                        >
                          <path
                            d="M6.10511 5.38132L8.57181 0.383236C8.824 -0.127745 9.55264 -0.127745 9.80482 0.383236L12.2715 5.38132L17.7872 6.18281C18.3511 6.26474 18.5763 6.95773 18.1683 7.35547L14.1771 11.2459L15.1193 16.7394C15.2156 17.301 14.6261 17.7293 14.1217 17.4641L9.18832 14.8705L4.25491 17.4641C3.75054 17.7293 3.16106 17.301 3.25738 16.7394L4.19958 11.2459L0.208368 7.35547C-0.199675 6.95773 0.0254884 6.26474 0.58939 6.18281L6.10511 5.38132Z"
                            fill="#FFB300"
                          />
                        </svg>
                      ))}
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

