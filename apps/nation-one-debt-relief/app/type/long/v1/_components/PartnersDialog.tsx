"use client"

import { useEffect, useRef, useState } from "react"
import { TCPA_PARTNER_NAMES } from "@/lib/constant"

type PartnersDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function PartnersDialog({ isOpen, onClose }: PartnersDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => {
      cancelAnimationFrame(t)
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setVisible(false)
      setClosing(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setClosing(true)
    setVisible(false)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 250)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose()
  }

  if (!isOpen && !closing) return null

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="partners-dialog-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm transition-opacity duration-300 ${
        visible && !closing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`relative my-auto w-full max-w-[min(560px,calc(100vw-2rem))] rounded-[12px] bg-white shadow-xl transition-all duration-300 ${
          visible && !closing ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
          <h2 id="partners-dialog-title" className="text-base font-semibold text-[#1C1C1C] xl:text-lg">
            Partners
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer rounded-full p-1 text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827]"
            aria-label="Close partners list"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <ul className="max-h-[min(70vh,520px)] overflow-y-auto px-5 py-4">
          {TCPA_PARTNER_NAMES.map((name) => (
            <li
              key={name}
              className="border-b border-[#F3F4F6] py-2.5 text-sm leading-relaxed text-[#343434] last:border-b-0"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
