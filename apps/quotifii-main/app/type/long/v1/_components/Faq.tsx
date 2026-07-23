"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { FAQ_CONTENT } from "@/lib/constant"

export default function Faq() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(FAQ_CONTENT.faqs[0]?.id ?? null)

  const toggleFaq = (id: number) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <div id="faq" className="faq bg-white w-full h-full px-6 py-6 md:px-8 md:py-8 lg:px-14 lg:py-10 xl:px-23 xl:py-12 ">
      <div className="container mx-auto max-w-[1380px]">
        <div className="faq-content w-full flex flex-col items-center justify-center gap-6 md:gap-10 lg:gap-12 xl:gap-15">
          <h2
            className="text-[1.5rem] md:text-2xl lg:text-2xl xl:text-4xl md:max-w-[500px] lg:max-w-full font-bold text-[#1A1A1A] text-center font-sans"
            style={{ lineHeight: 1.3 }}
          >
            {FAQ_CONTENT.header}
          </h2>

          <div className="w-full md:max-w-[600px] lg:max-w-[650px] xl:max-w-[880px] flex flex-col">
            {FAQ_CONTENT.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id

              return (
                <div
                  key={faq.id}
                  className="w-full border-b border-[#E5E7EB] last:border-b-0 py-5.5 md:py-6 lg:py-7 xl:py-8.5"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-start justify-between gap-4 text-left"
                  >
                    <h3 className="text-[0.9rem] lg:text-[0.96rem] xl:text-[1.3rem] font-semibold text-[#1A1A1A] font-sans min-w-0">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 pt-1">
                      <Image
                        src={isOpen ? "/minus.svg" : "/plus.svg"}
                        alt={isOpen ? "Collapse" : "Expand"}
                        width={18}
                        height={18}
                        className="w-4 h-auto xl:w-5"
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pt-4 xl:pr-3 text-[0.82rem] xl:text-[1.1rem]  font-normal text-[#4B5563] font-sans"
                          style={{ lineHeight: 1.6 }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
