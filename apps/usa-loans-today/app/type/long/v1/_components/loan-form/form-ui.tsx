"use client"

import type { ReactNode } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export const STEP_CARD =
  "w-full max-w-2xl mx-auto rounded-[15px] border border-[#E2E8F0] bg-white px-5 py-6 shadow-[0_0_10px_0_rgba(31,58,95,0.15)] md:px-8 md:py-8 xl:px-10 xl:py-10"

export const STEP_TITLE =
  "text-center font-sans text-xl font-extrabold text-[#0F2D52] md:text-2xl xl:text-[1.7rem]"

export const STEP_SUBTITLE =
  "mt-2 text-center font-sans text-sm font-normal text-[#4B5563] xl:text-base"

export const INPUT_FIELD =
  "h-14 w-full rounded-[6px] border border-[#CCCCCF] bg-white px-4 text-[0.85rem] text-[#2C3E50] outline-none transition-[color,box-shadow] focus:border-[#C62828] focus:ring-[3px] focus:ring-[#C62828]/20 xl:h-15 xl:text-base"

export function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className={STEP_CARD}>
      <h2 className={STEP_TITLE}>{title}</h2>
      {subtitle ? <p className={STEP_SUBTITLE}>{subtitle}</p> : null}
      <div className="mt-6 md:mt-8">{children}</div>
    </div>
  )
}

export function PrimaryButton({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-13 flex-1 items-center justify-center gap-2 rounded-[10px] px-6 text-sm font-semibold uppercase transition-all xl:h-14 xl:text-[1.05rem]",
        disabled
          ? "cursor-not-allowed bg-gray-300 text-gray-500"
          : "cursor-pointer bg-[#C62828] text-white hover:bg-[#B71C1C]"
      )}
    >
      {children}
      <ArrowRight size={18} />
    </button>
  )
}

export function PreviousButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-13 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#E5E7EB] px-6 text-sm font-semibold text-[#0F2D52] transition-all hover:bg-[#D1D5DB] xl:h-14 xl:text-[1.05rem]"
    >
      <ArrowLeft size={18} />
      Previous
    </button>
  )
}

export function ChoiceOption({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-[10px] border px-4 py-3.5 text-left text-[0.85rem] font-semibold text-[#3E3E3F] transition-all xl:py-4 xl:text-lg",
        selected
          ? "border-[#C62828] bg-[linear-gradient(0deg,rgba(193,32,38,0.10)_0%,rgba(193,32,38,0.10)_100%),#FFF]"
          : "border-[#D1D5DB] bg-white hover:bg-[#fde9ea]"
      )}
    >
      {label}
    </button>
  )
}

export function NavRow({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex gap-3 md:gap-4">{children}</div>
}

export function ErrorBox({ message }: { message?: string | null }) {
  if (!message) return null
  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  )
}
