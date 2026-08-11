"use client"

import React from 'react'

import Image from 'next/image'
import { COVER_CONTENT } from '@/lib/constant'

export default function Cover() {
  return (
    <div className="cover bg-[#EBF4FF] w-full h-full px-6 py-6 md:px-6 md:py-8 lg:px-14 lg:py-10  xl:px-23 xl:py-14">
      <div className="container mx-auto">
        <div className="cover-content w-full flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-10 xl:gap-16 ">
          <h2 className="text-xl lg:text-2xl xl:text-3xl  md:max-w-full  font-bold text-[#1A1A1A] text-center font-poppins " style={{ lineHeight: "1.4" }}>
            {COVER_CONTENT.header}
          </h2>

          <div className="cover-container mx-auto grid w-full  grid-cols-1 gap-6 md:grid-cols-2  lg:max-w-none lg:grid-cols-4 xl:gap-7 2xl:gap-7">
            {COVER_CONTENT.items.map((item) => (
              <div
                key={item.title}
                className="relative aspect-[4/3] w-full md:h-[200px] lg:h-[250px] xl:h-[330px]  justify-self-center overflow-hidden rounded-[15px] "
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={90}
                  className="object-cover"
                />
                <div className="absolute inset-x-3 bottom-3 lg:inset-x-2.5 xl:inset-x-3  lg:bottom-2.5  xl:bottom-3  rounded-none p-3 md:p-3.5 xl:p-4 " style={{ background: "rgba(26, 26, 26, 0.80)" }}>
           
                  <h3 className="font-poppins text-left text-[0.9rem] text-white  xl:text-[1.15rem] font-semibold">
                    {item.title}
                  </h3>
                  <p className="font-poppins mt-1.5 xl:mt-2 text-[0.8rem] lg:text-[0.75rem]  max-w-[200px] xl:max-w-[250px] md:max-w-none  xl:text-base text-white text-left font-normal" style={{ lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

