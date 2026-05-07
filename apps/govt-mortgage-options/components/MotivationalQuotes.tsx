'use client'

import React from 'react'

interface MotivationalQuoteProps {
  step: number
  formType?: 'refinance'
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ step }) => {
  const refinanceQuotes = [
    // Quotes for steps 1-5 (first 5 steps)
    {
      text: "You're off to a great start! Every detail you provide helps us find you the best refinance options. Keep going!",
    },
    // Quotes for steps 6-10 (next 5 steps)
    {
      text: "Great progress! You're unlocking better rates and terms. The savings are worth it - let's keep moving forward!",
    },
    // Quotes for steps 11-15 (next 5 steps)
    {
      text: "Almost there! Just a few more questions and we'll be able to show you amazing refinance opportunities that could save you money!",
    },
    // Quotes for steps 16-19 (next steps)
    {
      text: "You're in the final stretch! Just a couple more details and you'll be one step closer to better mortgage terms!",
    },
    // Quote for step 20 (final step)
    {
      text: "Last step! You're about to submit your information and unlock potential savings. You've got this!",
    }
  ]

  const quotes = refinanceQuotes

  // Determine which quote set to show based on step range and form type
  let quoteIndex = 0
  if (step >= 1 && step <= 5) {
    quoteIndex = 0
  } else if (step >= 6 && step <= 10) {
    quoteIndex = 1
  } else if (step >= 11 && step <= 15) {
    quoteIndex = 2
  } else if (step >= 16 && step <= 19) {
    quoteIndex = 3
  } else if (step === 20) {
    quoteIndex = 4
  }

  const quoteText = quotes[quoteIndex]?.text ?? quotes[0]?.text ?? ""

  return (
    <div className="w-full max-w-xl px-4 mx-auto">
      <p className="text-xs md:text-sm font-medium text-[#7F1A2A] leading-relaxed text-center" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
        {quoteText}
      </p>
    </div>
  )
}

export default MotivationalQuote

