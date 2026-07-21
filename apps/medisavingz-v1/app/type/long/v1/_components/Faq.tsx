"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { FAQ_CONTENT } from '@/lib/constant'

export default function Faq() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  const faqItem = (faq: (typeof FAQ_CONTENT.faqs)[number]) => {
    const isOpen = openFaqId === faq.id
    return (
      <div
        key={faq.id}
        className={`w-full rounded-[10px] border border-[#CEDBEC] overflow-hidden transition-colors ${
          isOpen ? "bg-[#F3F8FF]" : "bg-white"
        }`}
      >
 
 
        <button
          type="button"
          onClick={() => toggleFaq(faq.id)}
          className={`w-full p-5  xl:p-6 text-left flex items-center justify-between transition-colors ${
            isOpen ? "hover:bg-[#F3F8FF]" : "hover:bg-gray-50"
          }`}
        >
          <h3 className="text-[0.9rem] lg:text-[0.96rem] xl:text-[1.25rem] font-semibold text-[#17212B] font-sans pr-4">
            {faq.question}
          </h3>
          <div className="flex-shrink-0">
            <Image
              src={isOpen ? "/arrow-up.svg" : "/arrow-down.svg"}
              alt={isOpen ? "Collapse" : "Expand"}
              width={18}
              height={10}
              className="w-4 h-auto xl:w-5"
            />
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
                <p className="text-[0.82rem] xl:text-[1.1rem]  font-normal text-[#464F5B] font-sans" style={{ lineHeight: 1.6 }}>
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
    <div id="faq" className="faq bg-white w-full h-full px-6 py-6 md:px-8 md:py-8 lg:px-14 lg:py-10  xl:px-23 xl:py-12 xl:pb-16">
      <div className="container mx-auto max-w-[1280px]">
        <div className="faq-content w-full flex flex-col items-center justify-center gap-6 md:gap-10 lg:gap-12 xl:gap-15">
          <div className="flex  w-full h-full flex-col items-center justify-center gap-2.5 xl:gap-4">
          <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl md:max-w-[500px] lg:max-w-full font-bold text-[#17212B] text-center font-sans" style={{ lineHeight: 1.3 }}>
            {FAQ_CONTENT.header}
          </h2>
          <p className="text-[#464F5B] text-center font-normal font-sans text-[0.85rem]  xl:text-[1.18rem] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[700px] font-sans" style={{ lineHeight: 1.6 }}>{FAQ_CONTENT.subheader}</p>
          </div>

          <div className="w-full md:max-w-[600px] lg:max-w-[700px] xl:max-w-[1000px] flex flex-col gap-3 md:gap-3.5 xl:gap-4">
            {FAQ_CONTENT.faqs.map(faqItem)}
          </div>
        </div>
      </div>
    </div>
  )
}
