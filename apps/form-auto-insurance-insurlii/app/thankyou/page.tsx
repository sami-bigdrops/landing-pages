import { Suspense } from "react"
import type { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import { ThankYouMessage } from "@/app/_components/ThankYouMessage"
import { BRAND_FULL_NAME, FORM_LIGHT_BG } from "@/lib/constant"
import { isThankYouEmailCheckEnabled } from "@/lib/thankyou-email-check"

export const metadata: Metadata = {
  title: "Thank You",
  description: `Your quote request has been received. ${BRAND_FULL_NAME}`,
}

function ThankYouLoading() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#205BB9]" />
    </main>
  )
}

export default function ThankYouPage() {
  const requireEmailCheck = isThankYouEmailCheckEnabled()

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: FORM_LIGHT_BG }}
    >
      <Navbar className="bg-transparent" />
      <Suspense fallback={<ThankYouLoading />}>
        <ThankYouMessage requireEmailCheck={requireEmailCheck} />
      </Suspense>
      <Footer />
    </div>
  )
}
