"use client"

import Image from "next/image"

interface StepResultsProps {
  firstName: string
  cityName: string
  cityState: string
  vehicleCount: number
  driverCount: number
}

function CheckIcon({ color = "#1976D2" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={color} className="mt-0.5 flex-shrink-0" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}

function PhoneRingIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.36a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 7.95 7.96" />
      <path d="M14.05 6A5 5 0 0 1 18 9.95" />
    </svg>
  )
}

export function StepResults({
  firstName,
}: StepResultsProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-auto" style={{ backgroundColor: "#f2f2f2" }}>
      {/* Top nav bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-center flex-shrink-0 shadow-sm">
        <Image
          src="/insurlii-logo.svg"
          alt="Insurlii"
          width={130}
          height={42}
          className="h-auto"
          priority
        />
      </div>

      {/* Main content */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* Congratulations header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Congratulations, {firstName}.
          </h1>
          <p className="text-[#1976D2] text-lg mt-1 font-medium">
            Click on the offers below to see your quotes.
          </p>
        </div>

        {/* Recommended quote card */}
        <div className="rounded-xl overflow-hidden shadow-md" style={{ border: "2px solid #E91E8C" }}>
          {/* Pink header bar */}
          <div className="px-4 py-2.5 flex items-center gap-2" style={{ backgroundColor: "#E91E8C" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="text-white text-sm font-semibold tracking-wide">Recommended for you</span>
          </div>

          {/* Card body */}
          <div className="bg-white p-5 flex items-center gap-5">
            {/* Carrier logo + stars */}
            <div className="flex flex-col items-center gap-2 min-w-[80px]">
              <span className="font-black text-2xl italic tracking-tight" style={{ color: "#003399" }}>
                GEICO
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFC107" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Price + bullets */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-base mb-2">
                Est Monthly payment ONLY $275.82
              </p>
              <ul className="flex flex-col gap-1">
                <li className="flex items-start gap-1.5 text-sm text-gray-600">
                  <CheckIcon />
                  Enjoy coverage backed by a 97% customer satisfaction rating
                </li>
                <li className="flex items-start gap-1.5 text-sm text-gray-600">
                  <CheckIcon />
                  Get discounts for car safety features, good driving habits, and more
                </li>
                <li className="flex items-start gap-1.5 text-sm text-gray-600">
                  <CheckIcon />
                  Save even more when you bundle
                </li>
              </ul>
            </div>

            {/* CTA button */}
            <div className="flex-shrink-0 relative self-center">
              <div
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center z-10 shadow"
                style={{ backgroundColor: "#FF6D00" }}
              >
                1
              </div>
              <button
                type="button"
                className="rounded-lg px-5 py-3 text-sm font-bold text-white flex items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1976D2" }}
              >
                View My Quote &#9654;
              </button>
            </div>
          </div>
        </div>

        {/* Phone / agent card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="flex-shrink-0">
            <PhoneRingIcon />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-base leading-snug">
              Get a Free Quote Instantly – Talk to an Agent.
            </p>
            <p className="text-gray-500 text-sm mt-0.5">
              Rather speak to someone? Talk to a licensed agent right now.
            </p>
          </div>

          <div className="flex-shrink-0 text-right">
            <p className="font-bold text-gray-800 text-sm mb-0.5">Call Now</p>
            <a
              href="tel:8555813316"
              className="font-bold text-xl block leading-tight"
              style={{ color: "#1976D2" }}
            >
              855-581-3316
            </a>
            <div className="flex items-center gap-1.5 justify-end mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
              <span className="text-gray-500 text-xs">Agents online now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-4 py-5">
        <p className="text-gray-400 text-xs max-w-3xl mx-auto text-center leading-relaxed">
          © 2026 Insurlii.com. All rights reserved. Insurlii.com is a digital insurance comparison engine,
          providing real-time rates and insurance services in all 50 states through its relationships with
          carrier and agency partners.{" "}
          <a href="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</a>
          {" | "}
          <a href="/terms-of-use" className="underline hover:text-gray-600">Terms of Use</a>
          {" | "}
          <a href="#" className="underline hover:text-gray-600">Do not sell my personal information</a>
          {" | "}
          <a href="#" className="underline hover:text-gray-600">California Privacy Choices</a>
          {" | "}
          <a href="#" className="underline hover:text-gray-600">Cookies and Other Technology</a>
        </p>
      </footer>
    </div>
  )
}
