"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PartnersModalProps {
  isOpen: boolean
  onClose: () => void
}

const PARTNERS = ["West Capital Lending - NMLS 1566096"] as const

export default function PartnersModal({ isOpen, onClose }: PartnersModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!mounted || !isOpen) return null

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="partners-modal-title"
          className="relative flex w-full max-w-lg max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
            <h2
              id="partners-modal-title"
              className="font-inter text-xl font-bold text-[#1C2833] sm:text-2xl"
            >
              Our Partners
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close partners modal"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-5 sm:px-6">
            <ul className="space-y-2">
              {PARTNERS.map((partner) => (
                <li
                  key={partner}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-inter text-sm font-medium text-[#1C2833] sm:text-base"
                >
                  {partner}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
