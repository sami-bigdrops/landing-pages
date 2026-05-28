"use client"

import Image from "next/image"

interface StepResultsProps {
  firstName: string
  cityName: string
  cityState: string
  vehicleCount: number
  driverCount: number
  city: string
}

function CheckIcon({ color = "#1976D2" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={color} className="mt-0.5 flex-shrink-0" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}

function PhoneRingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2196F3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-10 h-10 sm:w-12 sm:h-12"}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.36a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 7.95 7.96" />
      <path d="M14.05 6A5 5 0 0 1 18 9.95" />
    </svg>
  )
}

export function StepResults({
  firstName,
  city,
  cityName,
}: StepResultsProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex min-h-0 flex-col overflow-auto"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <div className="flex flex-shrink-0 items-center justify-center border-b border-gray-200 bg-white p-4 shadow-sm ">
        <Image
          src="/insurlii-logo.svg"
          alt="Insurlii"
          width={130}
          height={42}
          className="h-8 w-auto xl:h-10"
          priority
        />
      </div>

      <div className="mx-auto flex w-full lg:max-w-4xl max-w-5xl flex-1 flex-col gap-4 px-4 py-5 sm:gap-5 sm:px-6 sm:py-8">
        <div className="mb-4">
          <h1 className="text-lg lg:text-2xl xl:text-4xl font-bold leading-tight text-[#003399] sm:text-2xl md:text-3xl">
            Congratulations, {firstName}!
          </h1>
          <p className="mt-2 text-xs md:text-sm font-medium text-gray-600 xl:text-base">
            Click below to view the quotes provided by our featured insurers in {cityName}.
          </p>
        </div>
   

        <div className="overflow-hidden rounded-xl shadow-md" style={{ border: "2px solid #E91E8C" }}>
          <div
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5"
            style={{ backgroundColor: "#E91E8C" }}
          >
            <svg className="h-4 w-4 flex-shrink-0 sm:h-[18px] sm:w-[18px]" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
              Recommended for you
            </span>
          </div>

          <div className="flex flex-col gap-4 bg-white p-4 sm:gap-5 sm:p-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4 sm:gap-5 lg:flex-col lg:items-center lg:gap-2 lg:min-w-[80px]">
              <span
                className="text-xl font-black italic tracking-tight sm:text-2xl"
                style={{ color: "#003399" }}
              >
                GEICO
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                    viewBox="0 0 24 24"
                    fill="#FFC107"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 text-sm font-bold text-gray-900 sm:text-base">
                Est Monthly payment ONLY $275.82
              </p>
              <ul className="flex flex-col gap-1">
                <li className="flex items-start gap-1.5 text-xs text-gray-600 sm:text-sm">
                  <CheckIcon />
                  Enjoy coverage backed by a 97% customer satisfaction rating
                </li>
                <li className="flex items-start gap-1.5 text-xs text-gray-600 sm:text-sm">
                  <CheckIcon />
                  Get discounts for car safety features, good driving habits, and more
                </li>
                <li className="flex items-start gap-1.5 text-xs text-gray-600 sm:text-sm">
                  <CheckIcon />
                  Save even more when you bundle
                </li>
              </ul>
            </div>

            <div className="relative w-full flex-shrink-0 lg:w-auto lg:self-center">
              <div
                className="absolute -right-1 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white shadow sm:-right-2"
                style={{ backgroundColor: "#FF6D00" }}
              >
                1
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:px-5 lg:w-auto lg:whitespace-nowrap"
                style={{ backgroundColor: "#1976D2" }}
              >
                View My Quote &#9654;
              </button>
            </div>
          </div>
        </div>

        
      </div>

      <footer className="flex-shrink-0 border-t border-gray-100 bg-white px-4 py-4 sm:py-5">
        <p className="mx-auto max-w-3xl text-center text-[10px] leading-relaxed text-gray-400 sm:text-xs">
          © 2026 Insurlii.com. All rights reserved. Insurlii.com is a digital insurance comparison engine,
          providing real-time rates and insurance services in all 50 states through its relationships with
          carrier and agency partners.{" "}
          <span className="inline-flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5">
            <a href="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</a>
            <span aria-hidden="true">|</span>
            <a href="/terms-of-use" className="underline hover:text-gray-600">Terms of Use</a>
            <span aria-hidden="true">|</span>
            <a href="#" className="underline hover:text-gray-600">Do not sell my personal information</a>
            <span aria-hidden="true">|</span>
            <a href="#" className="underline hover:text-gray-600">California Privacy Choices</a>
            <span aria-hidden="true">|</span>
            <a href="#" className="underline hover:text-gray-600">Cookies and Other Technology</a>
          </span>
        </p>
      </footer>
    </div>
  )
}
