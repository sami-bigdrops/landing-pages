'use client'

import React, { useState } from 'react'
import { FAQ_CONTENT } from '@/lib/constant'

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(1)

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div id="faq" className="faq bg-white w-full h-full p-4 md:p-6 lg:px-14 lg:py-10 xl:px-20 xl:py-16">
      <div className="container mx-auto">
        <div className="faq-content w-full flex flex-col items-center justify-center gap-5 md:gap-8 lg:gap-10 xl:gap-16">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl md:max-w-[600px] lg:max-w-[800px] xl:max-w-full font-bold text-[#111827] text-center font-['Inter']">
            {FAQ_CONTENT.header}
          </h2>

          <div className="w-full flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-full md:w-[calc(50%-0.625rem)] flex flex-col gap-5">
              {FAQ_CONTENT.faqs.filter((faq) => faq.id === 1 || faq.id === 3).map((faq) => (
                <div
                  key={faq.id}
                  className="w-full bg-white rounded-[10px] border border-[#D1D5DB] shadow-[2px_2px_15px_0_rgba(31,58,95,0.10)] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between transition-colors hover:bg-gray-50"
                  >
                    <h3 className="text-[0.9rem] md:text-base lg:text-lg xl:text-xl font-semibold text-[#111827] font-['Inter'] pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 flex items-center justify-center rounded-[6px]" style={{ background: '#3498DB' }}>
                        <svg
                          className={`w-4 h-4 text-white transition-all duration-200 ${openFaq === faq.id ? 'rotate-0' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {openFaq === faq.id ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 12h16"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          )}
                        </svg>
                      </div>
                    </div>
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-sm md:text-base lg:text-lg text-[#374151] font-['Inter'] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full md:w-[calc(50%-0.625rem)] flex flex-col gap-5">
              {FAQ_CONTENT.faqs.filter((faq) => faq.id === 2 || faq.id === 4).map((faq) => (
                <div
                  key={faq.id}
                  className="w-full bg-white rounded-[10px] border border-[#D1D5DB] shadow-[2px_2px_15px_0_rgba(31,58,95,0.10)] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between transition-colors hover:bg-gray-50"
                  >
                    <h3 className="text-[0.9rem] md:text-base lg:text-lg xl:text-xl font-semibold text-[#111827] font-['Inter'] pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 flex items-center justify-center rounded-[6px]" style={{ background: '#3498DB' }}>
                        <svg
                          className={`w-4 h-4 text-white transition-all duration-200 ${openFaq === faq.id ? 'rotate-0' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {openFaq === faq.id ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 12h16"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          )}
                        </svg>
                      </div>
                    </div>
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#374151] font-['Inter'] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}