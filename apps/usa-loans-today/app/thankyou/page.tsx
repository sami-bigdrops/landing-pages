import { Suspense } from "react"
import type { Metadata } from "next"
import { THANKYOU_TYPE2_CONTENT } from "@/lib/constant"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import { ThankYouType2, type ThankYouAd } from "@/app/_components/ThankYouType2"
import { buildPageMetadata } from "@/lib/seo"

const THANKYOU_ADS: ThankYouAd[] = [
  {
    image: "/2.png",
    link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=115&sub1=pwe_${utm_source}&sub2=${utm_id}",
  },
  {
    image: "/3.jpg",
    link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=113&sub1=pwe_${utm_source}&sub2=${utm_id}",
  },
]

export const metadata: Metadata = buildPageMetadata({
  title: "Thank You",
  description:
    "Your Quotifii request has been received. A specialist will contact you shortly.",
  path: "/thankyou",
  index: false,
  follow: false,
})

function ThankYouLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-gray-600" />
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
        <ThankYouType2
          content={THANKYOU_TYPE2_CONTENT}
          ads={THANKYOU_ADS}
          redirectPath="/"
          loadingFallback={<ThankYouLoading />}
        />
      </Suspense>
      <Footer />
    </div>
  )
}
