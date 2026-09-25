import { Suspense } from "react"
import type { Metadata } from "next"
import { THANKYOU_PAGE } from "@/lib/constant"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import SimpleThankYou from "@/app/_components/SimpleThankYou"

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your request has been received. We will contact you soon.",
}

function ThankYouLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#2B75FB]" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </main>
  )
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Suspense fallback={<ThankYouLoading />}>
        <SimpleThankYou
          title={THANKYOU_PAGE.title}
          message={THANKYOU_PAGE.message}
          redirectPath="/"
          loadingFallback={<ThankYouLoading />}
        />
      </Suspense>
      <Footer />
    </div>
  )
}
