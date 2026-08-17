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
        className="w-full bg-white rounded-[10px] border border-[#CEDBEC] overflow-hidden"
      >
 

        <button
          type="button"
          onClick={() => toggleFaq(faq.id)}
          className="w-full p-5 xl:p-7 text-left flex items-center justify-between transition-colors "
        >
          <h3 className="text-[0.9rem] lg:text-[0.96rem] xl:text-[1.25rem] font-bold text-[#1A1A1A] font-sans pr-4 lg:max-w-[330px] xl:max-w-full">
            {faq.question}
          </h3>
          <div className="flex-shrink-0">
            <div
              className="flex items-center justify-center"
              
            >
              {isOpen ? (
                // Up icon (section open)
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="11" viewBox="0 0 19 11" fill="none" className="w-3.5 xl:w-5 h-auto">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.763197 10.1668C0.412197 9.79862 0.412197 9.20316 0.763197 8.83589L8.2008 1.05135C8.36474 0.877092 8.56206 0.73834 8.78076 0.643527C8.99946 0.548715 9.23496 0.499822 9.47295 0.499822C9.71093 0.499822 9.94644 0.548715 10.1651 0.643527C10.3838 0.73834 10.5812 0.877092 10.7451 1.05135L18.2376 8.89226C18.405 9.07021 18.4992 9.30586 18.5008 9.55137C18.5025 9.79687 18.4116 10.0338 18.2466 10.2141C18.1651 10.3034 18.0663 10.3748 17.9564 10.424C17.8465 10.4732 17.7277 10.499 17.6075 10.5C17.4873 10.5009 17.3681 10.4769 17.2575 10.4294C17.1468 10.382 17.0469 10.3121 16.9641 10.2241L10.1088 3.04771C10.0268 2.96051 9.92813 2.89108 9.81874 2.84363C9.70935 2.79618 9.59155 2.77171 9.4725 2.77171C9.35345 2.77171 9.23564 2.79618 9.12625 2.84363C9.01686 2.89108 8.91818 2.96051 8.8362 3.04771L2.0349 10.1668C1.953 10.254 1.85439 10.3234 1.74507 10.3708C1.63576 10.4183 1.51802 10.4427 1.39905 10.4427C1.28007 10.4427 1.16234 10.4183 1.05302 10.3708C0.943707 10.3234 0.845097 10.254 0.763197 10.1668Z" fill="#3B82F6" stroke="#3B82F6"/>
                </svg>
              ) : (
                // Down icon (section closed)
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="11" viewBox="0 0 19 11" fill="none" className="w-3.5 xl:w-5 h-auto">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.763319 0.832711C0.412319 1.20089 0.412319 1.79635 0.763319 2.16362L8.20092 9.94816C8.36486 10.1224 8.56219 10.2612 8.78088 10.356C8.99958 10.4508 9.23508 10.4997 9.47307 10.4997C9.71106 10.4997 9.94656 10.4508 10.1653 10.356C10.384 10.2612 10.5813 10.1224 10.7452 9.94816L18.2377 2.10726C18.4052 1.92931 18.4993 1.69365 18.501 1.44815C18.5026 1.20264 18.4117 0.9657 18.2467 0.785439C18.1652 0.69614 18.0665 0.62469 17.9565 0.575512C17.8466 0.526334 17.7278 0.500476 17.6076 0.499538C17.4874 0.498601 17.3682 0.522604 17.2576 0.570062C17.1469 0.61752 17.0471 0.687421 16.9642 0.775439L10.1089 7.9518C10.0269 8.039 9.92825 8.10844 9.81886 8.15589C9.70947 8.20333 9.59167 8.2278 9.47262 8.2278C9.35357 8.2278 9.23576 8.20333 9.12638 8.15589C9.01698 8.10844 8.9183 8.039 8.83632 7.9518L2.03502 0.832711C1.95312 0.745539 1.85451 0.676119 1.74519 0.62868C1.63588 0.581242 1.51815 0.556777 1.39917 0.556777C1.28019 0.556777 1.16246 0.581242 1.05314 0.62868C0.943829 0.676119 0.845219 0.745539 0.763319 0.832711Z" fill="#3B82F6" stroke="#3B82F6"/>
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
                <p className="text-[0.8rem] xl:text-[1.1rem]  font-medium text-[#4B5563] font-sans" style={{ lineHeight: 1.6 }}>
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
      <div className="container mx-auto max-w-[1300px]">
        <div className="faq-content w-full flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12 xl:gap-16">
          <div className="flex flex-col items-center justify-center gap-2.5 xl:gap-3">
            <h2
              className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#1A1A1A] text-center font-sans tracking-tight"
              style={{ lineHeight: 1.3 }}
            >
              {FAQ_CONTENT.header}
            </h2>
            <p
              className="text-sm font-medium xl:text-lg mx-auto text-[#4B5563] text-center font-sans "
              style={{ lineHeight: 1.6 }}
            >
              {FAQ_CONTENT.subtitle}
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row md:items-start gap-4 xl:gap-5">
            <div className="w-full md:w-[calc(50%-0.625rem)] flex flex-col gap-4 xl:gap-5">
              {FAQ_CONTENT.faqs
                .filter((_, index) => index % 2 === 0)
                .map(faqItem)}
            </div>

            <div className="w-full md:w-[calc(50%-0.625rem)] flex flex-col gap-4 xl:gap-5">
              {FAQ_CONTENT.faqs
                .filter((_, index) => index % 2 === 1)
                .map(faqItem)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
