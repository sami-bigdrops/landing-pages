"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FAQ_CONTENT } from '@/lib/constant'

export default function Faq() {
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set())

  const toggleFaq = (id: number) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const faqItem = (faq: (typeof FAQ_CONTENT.faqs)[number]) => {
    const isOpen = openFaqs.has(faq.id)
    return (
      <div
        key={faq.id}
        className="w-full bg-[#FFF] rounded-[10px] border border-[#CDD1D8]  overflow-hidden"
   
      >
 
        <button
          type="button"
          onClick={() => toggleFaq(faq.id)}
          className="w-full p-5 text-left flex items-center justify-between transition-colors hover:bg-gray-50"
        >
          <h3 className="text-[0.9rem] lg:text-[0.96rem] xl:text-[1.25rem] font-semibold text-[#102A43] font-sans pr-4">
            {faq.question}
          </h3>
          <div className="flex-shrink-0">
            <div
              className="w-7.5 h-7.5 xl:w-10 xl:h-10 flex items-center justify-center rounded-full"
              style={{ background: '#F59E0B' }}
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none" className="w-3.5 xl:w-4.5 h-auto">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.263258 9.66704C-0.0877419 9.29886 -0.0877419 8.70341 0.263258 8.33614L7.70086 0.551589C7.8648 0.377336 8.06212 0.238584 8.28082 0.14377C8.49952 0.0489578 8.73502 6.48499e-05 8.97301 6.48499e-05C9.211 6.48499e-05 9.4465 0.0489578 9.66519 0.14377C9.88389 0.238584 10.0812 0.377336 10.2452 0.551589L17.7377 8.3925C17.9051 8.57045 17.9992 8.80611 18.0009 9.05161C18.0026 9.29711 17.9117 9.53406 17.7467 9.71432C17.6652 9.80362 17.5664 9.87507 17.4565 9.92424C17.3465 9.97342 17.2278 9.99928 17.1076 10.0002C16.9873 10.0012 16.8682 9.97715 16.7575 9.92969C16.6468 9.88224 16.547 9.81233 16.4642 9.72432L9.60886 2.54795C9.52688 2.46076 9.42819 2.39132 9.3188 2.34387C9.20941 2.29642 9.09161 2.27195 8.97256 2.27195C8.85351 2.27195 8.7357 2.29642 8.62631 2.34387C8.51692 2.39132 8.41824 2.46076 8.33626 2.54795L1.53496 9.66704C1.45306 9.75422 1.35445 9.82364 1.24513 9.87108C1.13582 9.91851 1.01809 9.94298 0.899109 9.94298C0.780132 9.94298 0.662399 9.91851 0.553083 9.87108C0.443768 9.82364 0.345158 9.75422 0.263258 9.66704Z" fill="#102A43" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none" className="w-3.5 xl:w-4.5 h-auto">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.263258 0.3332C-0.0877419 0.701381 -0.0877419 1.29684 0.263258 1.66411L7.70086 9.44866C7.8648 9.62291 8.06212 9.76166 8.28082 9.85647C8.49952 9.95129 8.73502 10.0002 8.97301 10.0002C9.211 10.0002 9.4465 9.95129 9.66519 9.85647C9.88389 9.76166 10.0812 9.62291 10.2452 9.44866L17.7377 1.60775C17.9051 1.42979 17.9992 1.19414 18.0009 0.948633C18.0026 0.70313 17.9117 0.466188 17.7467 0.285927C17.6652 0.196628 17.5664 0.125178 17.4565 0.0760001C17.3465 0.0268222 17.2278 0.000963883 17.1076 2.64366e-05C16.9873 -0.00091101 16.8682 0.0230924 16.7575 0.0705502C16.6468 0.118008 16.547 0.18791 16.4642 0.275927L9.60886 7.45229C9.52688 7.53949 9.42819 7.60893 9.3188 7.65637C9.20941 7.70382 9.09161 7.72829 8.97256 7.72829C8.85351 7.72829 8.7357 7.70382 8.62631 7.65637C8.51692 7.60893 8.41824 7.53949 8.33626 7.45229L1.53496 0.3332C1.45306 0.246027 1.35445 0.176607 1.24513 0.129169C1.13582 0.0817301 1.01809 0.0572657 0.899109 0.0572657C0.780132 0.0572657 0.662399 0.0817301 0.553083 0.129169C0.443768 0.176607 0.345158 0.246027 0.263258 0.3332Z" fill="#102A43" />
                </svg>
              )}
            </div>
          </div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <p className="text-[0.85rem] xl:text-[1.1rem]  font-medium text-[#374151] font-sans" style={{ lineHeight: 1.6 }}>
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div id="faq" className="faq bg-white w-full h-full px-6 py-6 md:px-8 md:py-10 lg:px-14 lg:py-12  xl:px-23 xl:py-15 xl:pb-19">
      <div className="container mx-auto max-w-[1400px]">
        <div className="faq-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-16">
          <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl md:max-w-[500px] lg:max-w-full font-bold text-[#102A43] text-center font-sans" style={{ lineHeight: 1.3 }}>
            {FAQ_CONTENT.header}
          </h2>

          <div className="w-full flex flex-col lg:flex-row lg:items-start gap-4 xl:gap-5">
            <div className="w-full lg:w-[calc(50%-0.625rem)] flex flex-col gap-4 xl:gap-5">
              {FAQ_CONTENT.faqs
                .filter((faq) => faq.id === 1 || faq.id === 3)
                .map(faqItem)}
            </div>

            <div className="w-full lg:w-[calc(50%-0.625rem)] flex flex-col gap-4 xl:gap-5">
              {FAQ_CONTENT.faqs
                .filter((faq) => faq.id === 2 || faq.id === 4)
                .map(faqItem)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
