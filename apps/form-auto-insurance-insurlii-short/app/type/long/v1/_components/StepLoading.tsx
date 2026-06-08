"use client"

import { useEffect, useRef, useState } from "react"

interface StepLoadingProps {
  firstName: string
  cityName: string
  onComplete: () => void
}

export function StepLoading({ firstName, cityName, onComplete }: StepLoadingProps) {
  const [progress, setProgress] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => {
    // Bar starts at 0 and advances progressively before completing
    const t0 = setTimeout(() => setProgress(20), 80)
    const t1 = setTimeout(() => { setProgress(45); setVisibleCount(1) }, 700)
    const t2 = setTimeout(() => { setProgress(68); setVisibleCount(2) }, 1400)
    const t3 = setTimeout(() => { setProgress(85); setVisibleCount(3) }, 2100)
    const t4 = setTimeout(() => setProgress(100), 3400)
    const t5 = setTimeout(() => onCompleteRef.current(), 3800)
    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2)
      clearTimeout(t3); clearTimeout(t4); clearTimeout(t5)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const items = [
    `Looking for the best rates in ${cityName}`,
    "Comparing quotes from carriers",
    "Checking for discounts",
  ]

  return (
    <>
      <style>{`
        @keyframes insurlii-stripe {
          from { background-position: 40px 0; }
          to   { background-position: 0 0; }
        }
        .insurlii-progress-bar {
          background: repeating-linear-gradient(
            -45deg,
            #10b981 0,
            #10b981 10px,
            #059669 10px,
            #059669 20px
          );
          background-size: 40px 40px;
          animation: insurlii-stripe 0.7s linear infinite;
          transition: width 0.6s ease-out;
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Just a Moment, {firstName}...
        </h2>
        <p className="text-lg md:text-xl font-semibold text-sky-500 mb-7">
          We&apos;re finalizing your quotes.
        </p>

        {/* Animated striped progress bar */}
        <div className="w-full rounded-full h-4 mb-8 overflow-hidden bg-gray-200">
          <div
            className="insurlii-progress-bar h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Checklist items */}
        <div className="flex flex-col gap-3 mb-8">
          {items.map((item, i) => (
            <p
              key={i}
              className={`flex items-center gap-2.5 text-sm text-gray-500 transition-opacity duration-500 ${i < visibleCount ? "opacity-100" : "opacity-0"}`}
            >
              <span className="text-sky-500 font-bold text-base leading-none">✓</span>
              {item}
            </p>
          ))}
        </div>

        {/* Insurance partner logos */}
        <div className="border-t border-gray-100 pt-6 flex items-center justify-between flex-wrap gap-x-6 gap-y-3">
          <div className="flex items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-[#0032A0] flex items-center justify-center text-white font-black text-sm">N</div>
            <span className="text-[#0032A0] font-bold text-sm">Nationwide</span>
          </div>

          <div className="text-center">
            <span className="text-[#1a5fa8] font-bold text-sm block">Safeway Insurance</span>
            <span className="text-gray-400 text-xs italic">Keeping Promises.</span>
          </div>

          <span className="text-[#0075C9] font-black text-xl tracking-tight">MetLife</span>

          <div className="text-center">
            <span className="text-gray-600 font-semibold text-sm italic block">esurance</span>
            <span className="text-gray-400 text-[10px]">an Allstate company</span>
          </div>

          
        </div>
      </div>
    </>
  )
}
