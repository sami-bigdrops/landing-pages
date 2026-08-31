"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "@workspace/lp-core"
import { RadioButtonGroup } from "@workspace/ui/components/radio-button-group"

const BORROW_AMOUNT_OPTIONS = [
  { value: "100-1000", label: "$100 - $1000" },
  { value: "1000-2000", label: "$1000 - $2000" },
  { value: "2000-3000", label: "$2000 - $3000" },
  { value: "3000-4000", label: "$3000 - $4000" },
  { value: "4000-5000", label: "$4000 - $5000" },
  { value: "5000+", label: "$5000+" },
] as const

type BorrowAmountDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function BorrowAmountDialog({ isOpen, onClose }: BorrowAmountDialogProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [selected, setSelected] = useState("")

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
      setSelected("")
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

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose()
  }

  const handleSelect = (value: string) => {
    setSelected(value)
    setCookie("borrowAmount", value)
    router.push("/form")
  }

  if (!isOpen && !closing) return null

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="borrow-amount-dialog-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm transition-opacity duration-300 ${
        visible && !closing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`relative my-auto w-full max-w-[min(560px,calc(100vw-2rem))] rounded-[15px] border border-[#E2E8F0] bg-white px-5 py-6 shadow-[0_0_10px_0_rgba(31,58,95,0.15)] transition-all duration-300 md:px-6 xl:py-8 ${
          visible && !closing ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 cursor-pointer rounded-full p-1.5 text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827] xl:right-4 xl:top-4"
          aria-label="Close dialog"
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

        <div className="flex flex-col items-center justify-center gap-5 md:gap-6 xl:gap-7">
          <div className="flex flex-col items-center justify-center gap-1.5 xl:gap-2">
            <h2
              id="borrow-amount-dialog-title"
              className="text-center font-sans text-lg font-extrabold uppercase tracking-normal text-[#0F2D52] md:text-xl xl:text-[1.7rem]"
            >
              Start Your Loan Search
            </h2>
            <p className="text-center font-inter text-sm font-normal text-[#182542] xl:text-[1.2rem]">
              How much would you like to borrow?
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-5 md:gap-5">
            <RadioButtonGroup
              name="dialogBorrowAmount"
              options={[...BORROW_AMOUNT_OPTIONS]}
              value={selected}
              onChange={handleSelect}
              type="1"
              layout="column"
              containerClassName="w-full"
              className="w-full gap-3.5 md:mb-1 md:grid lg:mb-2 lg:grid-cols-2"
              optionClassName="w-full rounded-[10px] border border-[#D1D5DB] bg-white"
              selectedOptionBackgroundColor="#F4F8FF"
              selectedOptionBorderColor="#2563EB"
              selectedIndicatorColor="#C62828"
            />

            <p
              className="flex items-center justify-center gap-2 text-left font-inter text-[0.8rem] font-medium text-[#486581] xl:text-[0.9rem]"
              style={{ lineHeight: 1.4 }}
            >
              <img
                src="/Lock.svg"
                alt=""
                width={18}
                height={18}
                className="h-4 w-4 shrink-0"
              />
              <span>
                Checking your options <span className="font-bold text-[#2C3E50]">won&apos;t affect</span>{" "}
                your credit score.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
