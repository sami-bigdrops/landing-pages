"use client"

import React, { useState } from 'react'
import { FAQ_CONTENT } from '@/lib/constant'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq bg-white w-full h-full px-6 py-8 md:px-6 md:py-10 lg:px-14 lg:py-10  xl:px-20 xl:py-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="faq-content w-full flex flex-col items-center justify-center gap-6 md:gap-12  xl:gap-14 ">
          <h2
            className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl md:max-w-[430px] xl:max-w-[540px] font-bold text-[#0F172A] text-center font-sans"
            style={{ lineHeight: 1.3 }}
          >
            {FAQ_CONTENT.header}
          </h2>

          <div className="w-full max-w-[700px] xl:max-w-[870px] mx-auto">
            {FAQ_CONTENT.faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={faq.question}
                  className={index !== FAQ_CONTENT.faqs.length - 1 ? "border-b border-[#E5E7EB]" : ""}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full py-5 pb-6  md:py-6 md:pb-7 xl:py-8 xl:pb-8 flex items-start justify-between gap-4 text-left"
                  >
                    <h3 className="text-[0.95rem] md:text-base   xl:text-xl font-semibold text-[#0F172A] font-sans">
                      {faq.question}
                    </h3>
                    <span className="mt-1 min-w-[26px] flex items-center justify-center" aria-hidden="true">
                      {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="3" viewBox="0 0 18 3" fill="none" className="w-4 h-4 xl:w-5 xl:h-5 text-[#0F294C]">
                          <path d="M16.25 2.16667H1.08333C0.796016 2.16667 0.520466 2.05253 0.317301 1.84937C0.114137 1.6462 0 1.37065 0 1.08333C0 0.796016 0.114137 0.520466 0.317301 0.317301C0.520466 0.114137 0.796016 0 1.08333 0H16.25C16.5373 0 16.8129 0.114137 17.016 0.317301C17.2192 0.520466 17.3333 0.796016 17.3333 1.08333C17.3333 1.37065 17.2192 1.6462 17.016 1.84937C16.8129 2.05253 16.5373 2.16667 16.25 2.16667Z" fill="#0F294C" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" className="w-5 h-5 md:w-5.5 md:h-5.5 xl:w-6 xl:h-6 text-[#0F294C]">
                          <path d="M20.5834 11.9167H14.0834V5.41671C14.0834 5.12939 13.9692 4.85384 13.7661 4.65068C13.5629 4.44751 13.2874 4.33337 13 4.33337C12.7127 4.33337 12.4372 4.44751 12.234 4.65068C12.0308 4.85384 11.9167 5.12939 11.9167 5.41671V11.9167H5.41671C5.12939 11.9167 4.85384 12.0308 4.65068 12.234C4.44751 12.4372 4.33337 12.7127 4.33337 13C4.33337 13.2874 4.44751 13.5629 4.65068 13.7661C4.85384 13.9692 5.12939 14.0834 5.41671 14.0834H11.9167V20.5834C11.9167 20.8707 12.0308 21.1462 12.234 21.3494C12.4372 21.5526 12.7127 21.6667 13 21.6667C13.2874 21.6667 13.5629 21.5526 13.7661 21.3494C13.9692 21.1462 14.0834 20.8707 14.0834 20.5834V14.0834H20.5834C20.8707 14.0834 21.1462 13.9692 21.3494 13.7661C21.5526 13.5629 21.6667 13.2874 21.6667 13C21.6667 12.7127 21.5526 12.4372 21.3494 12.234C21.1462 12.0308 20.8707 11.9167 20.5834 11.9167Z" fill="#0F294C" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {isOpen && faq.answer ? (
                    <p className="text-[0.85rem] md:text-[0.83rem] lg:text-[0.84rem] xl:text-base pb-6 xl:pb-9  text-[#374151] text-left  font-sans" style={{ lineHeight: 1.6 }}>
                      {faq.answer}
                    </p>
               
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}