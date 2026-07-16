import { Suspense } from "react"
import type { Metadata } from "next"
import { SITE_BRAND } from "@/lib/constant"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import { ThankYouPageContent } from "@/app/_components/ThankYouPageContent"

export const metadata: Metadata = {
  title: "Thank You",
  description: `Your request to ${SITE_BRAND.name} was received. A specialist will contact you shortly about your property.`,
}

function ThankYouLoading() {
  return (
    <main className="flex min-h-[50vh] flex-1 flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-[#1e3a5f]" />
        <p className="text-sm text-slate-600">Loading...</p>
      </div>
    </main>
  )
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Suspense fallback={<ThankYouLoading />}>
        <ThankYouPageContent loadingFallback={<ThankYouLoading />} />
      </Suspense>
      <Footer />
    </div>
  )
}
