import { Suspense } from "react"
import type { Metadata } from "next"
import { ThankYouContent, type ThankYouAd } from "@workspace/bdmg-component"
import { SITE_BRAND, THANKYOU_CONTENT } from "@/lib/constant"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"

const THANKYOU_ADS: ThankYouAd[] = [
  {
    image: "/2.png",
    link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=115&sub1=pwe_{{utm_source}}&sub2={{utm_id}}",
  },
  {
    image: "/3.jpg",
    link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=113&sub1=pwe_{{utm_source}}&sub2={{utm_id}}",
  },
]

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
        <ThankYouContent
          variant="1"
          title={THANKYOU_CONTENT.title}
          subtitle={THANKYOU_CONTENT.subtitle}
          showBuyerLogo={false}
          showContact={false}
          confirmationTitle={THANKYOU_CONTENT.confirmationTitle}
          confirmationDescription={THANKYOU_CONTENT.confirmationDescription}
          redirectPath="/"
          sendWelcomeEmail
          ads={THANKYOU_ADS}
          loadingFallback={<ThankYouLoading />}
        />
      </Suspense>
      <Footer />
    </div>
  )
}
