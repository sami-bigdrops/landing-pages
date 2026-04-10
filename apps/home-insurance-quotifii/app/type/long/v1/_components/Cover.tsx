"use client"

import React from 'react'
import Image from 'next/image'
import { REVIEW_CONTENT } from '@/lib/constant'

export default function Review() {
  return (
    <div className="review bg-white w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-20 xl:py-14">
      <div className="container mx-auto">
        <div className="review-content w-full flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-10 xl:gap-16 ">
          <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1C2833] text-center font-inter  leading-tight tracking-tight">
            {REVIEW_CONTENT.header}
          </h2>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 xl:gap-6 2xl:gap-14">
              {REVIEW_CONTENT.reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full md:w-auto min-w-0 bg-white border border-[#B2B6BC] shadow-[4px_4px_6px_0_rgba(31,58,95,0.10)] rounded-[20px] flex flex-col items-start justify-start gap-4 p-5 xl:p-6 lg:gap-5.5 xl:gap-5  min-h-[260px] xl:min-h-[250px] "
                >
                  <div className="flex items-center justify-start gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        className="w-5 h-5 xl:w-6 xl:h-6"
                      >
                        <path
                          d="M9.35575 8.79725L12.2709 2.89042C12.569 2.28653 13.4301 2.28653 13.7281 2.89042L16.6433 8.79725L23.1619 9.74445C23.8283 9.84129 24.0944 10.6603 23.6122 11.1303L18.8953 15.7282L20.0088 22.2204C20.1227 22.8841 19.426 23.3903 18.8299 23.0769L12.9995 20.0117L7.16916 23.0769C6.57308 23.3903 5.87642 22.8841 5.99026 22.2204L7.10377 15.7282L2.38688 11.1303C1.90465 10.6603 2.17075 9.84129 2.83718 9.74445L9.35575 8.79725Z"
                          fill="#FFB300"
                        />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[0.9rem] lg:text-base xl:text-[1.05rem] xl:max-w-[330px] text-[#374151] font-inter flex-1" style={{ lineHeight: 1.5 }}>
                    &quot;{review.quote}&quot;
                  </p>

                  <div className="w-full flex flex-col items-start justify-start xl:flex-row xl:items-center xl:justify-between gap-2 mt-auto">
                    <div className="flex items-center justify-start gap-3 xl:w-[58%] ">
                      <div className="w-10 h-10 xl:w-12 xl:h-12 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                        <Image
                          src={review.customer.image.src}
                          alt={review.customer.image.alt}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-sm lg:text-base xl:text-lg text-[#1C2833] font-inter">
                          {review.customer.name}
                        </p>
                        <p className="text-[0.83rem] md:text-[0.83rem] lg:text-[0.88rem] 2xl:text-[0.95rem] text-[#374151] font-inter">
                          {review.customer.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-start xl:justify-end w-full xl:w-[42%] xl:mt-0 mt-2">
                      <div className="inline-flex items-center gap-1.5 rounded-[20px] bg-[#EDF2F9] px-2 py-1.5 xl:py-2">
                        <Image
                          src={REVIEW_CONTENT.verifiedBadge.src}
                          alt={REVIEW_CONTENT.verifiedBadge.alt}
                          width={18}
                          height={18}
                          className="w-3.5 h-3.5flex-shrink-0 object-contain"
                        />
                        <span className="text-xs xl:text-[0.8rem] font-medium text-[#1F3A5F] font-inter">
                          {REVIEW_CONTENT.verifiedBadge.label}
                        </span>
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

