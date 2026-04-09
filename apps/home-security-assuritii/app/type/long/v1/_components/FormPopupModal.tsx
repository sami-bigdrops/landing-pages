"use client"

import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

type FormPopupModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function FormPopupModal({ isOpen, onClose, children }: FormPopupModalProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  function handleClose() {
    setClosing(true)
    setVisible(false)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 280)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const html = document.documentElement
    const body = document.body
    const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth)

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverscroll: body.style.overscrollBehavior,
    }

    html.style.overflow = "hidden"
    html.style.overscrollBehavior = "none"
    body.style.overflow = "hidden"
    body.style.overscrollBehavior = "none"
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => {
      cancelAnimationFrame(t)
      html.style.overflow = prev.htmlOverflow
      html.style.overscrollBehavior = prev.htmlOverscroll
      body.style.overflow = prev.bodyOverflow
      body.style.overscrollBehavior = prev.bodyOverscroll
      body.style.paddingRight = prev.bodyPaddingRight
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setVisible(false)
      setClosing(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen && !closing) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, closing])

  if (!mounted || (!isOpen && !closing)) return null

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-3 sm:p-4 md:p-6 transition-[opacity] duration-300 ease-out ${
        visible && !closing ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-md"
        aria-hidden
        onClick={handleClose}
      />
      <div className="relative z-10 flex h-full min-h-0 w-full max-w-[min(520px,calc(100vw-1.5rem))] flex-col sm:max-w-[520px]">
        <div
          className={`relative flex max-h-[min(90dvh,100dvh-2rem)] min-h-0 w-full flex-col transition-[opacity,transform] duration-300 ease-out ${
            visible && !closing ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-1"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close form"
            className="absolute -top-1 -right-1 z-[110] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_12px_rgba(15,23,42,0.12)] ring-1 ring-black/5 text-[#374151] transition-colors hover:bg-[#F3F4F6] sm:-top-2 sm:-right-2 sm:h-11 sm:w-11"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="h-5 w-5">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden rounded-[20px]">{children}</div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
