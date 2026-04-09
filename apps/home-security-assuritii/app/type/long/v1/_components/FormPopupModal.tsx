"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

const FormModalCloseContext = createContext<(() => void) | null>(null)

export function useFormModalClose() {
  return useContext(FormModalCloseContext)
}

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
    }, 320)
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

    const t = requestAnimationFrame(() => setVisible(true))
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
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-3 sm:p-4 md:p-6 md:pl-24 xl:pl-6 xl:pt-12 2xl:pt-16"
    >
      <div
        className={`absolute inset-0 transition-[background-color,backdrop-filter] duration-300 ease-out ${
          visible && !closing
            ? "bg-black/35 backdrop-blur-md"
            : "bg-black/0 backdrop-blur-none"
        }`}
        aria-hidden
        onClick={handleClose}
      />
      <div className="relative z-10 flex h-full min-h-0 w-full max-w-[min(520px,calc(100vw-1.5rem))] flex-col sm:max-w-[520px]">
        <FormModalCloseContext.Provider value={handleClose}>
          <div
            className={`relative flex max-h-[min(90dvh,100dvh-2rem)] min-h-0 w-full flex-col transition-[opacity,transform] duration-300 ease-out ${
              visible && !closing ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-1"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden rounded-[20px]">{children}</div>
          </div>
        </FormModalCloseContext.Provider>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
