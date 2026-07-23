import { Suspense } from "react"
import type { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import SimpleThankYou from "@/app/_components/SimpleThankYou"

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thank you for contacting MediSavingz. A MediSavingz expert will contact you soon to help review your Medicare options.",
}

function ThankYouLoading() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#2F6FED]" />
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
          title="Thank you!"
          message="Your request has been received. A MediSavingz expert will contact you soon to help you review your Medicare options."
          redirectPath="/"
          loadingFallback={<ThankYouLoading />}
        />
      </Suspense>
      <Footer />
    </div>
  )
}
