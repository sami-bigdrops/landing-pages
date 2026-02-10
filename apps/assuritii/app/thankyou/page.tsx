import { Suspense } from "react"
import type { Metadata } from "next"
import { ThankYouContent } from "@workspace/bdmg-component"
import type { ThankYouAd } from "@workspace/bdmg-component"
import { THANKYOU_CONTENT } from "../../lib/constant"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"

const THANKYOU_ADS: ThankYouAd[] = [
  {
    image: "/nerdwallet.png",
    link: "https://www.platinum-home-track.com/28KL6/3GHXJS7/?sub1=ndr_{{utm_source}}&sub2={{utm_id}}&sub3={{utm_s1}}",
  },
  {
    image: "/adt.png",
    link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?sub1=ndr_{{utm_source}}&sub2={{utm_id}}&sub3={{utm_s1}}",
  },
  {
    image: "/ahs.jpg",
    link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=113&sub1=ndr_{{utm_source}}&sub2={{utm_id}}&sub3={{utm_s1}}",
  },
  {
    image: "/arw-home.png",
    link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=114&sub1=ndr_{{utm_source}}&sub2={{utm_id}}&sub3={{utm_s1}}",
  },
]

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your request has been received. A specialist will contact you shortly.",
}

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
        <ThankYouContent
          title={THANKYOU_CONTENT.title}
          subtitle={THANKYOU_CONTENT.subtitle}
          showBuyerLogo={false}
          confirmationTitle={THANKYOU_CONTENT.confirmationTitle}
          confirmationDescription={THANKYOU_CONTENT.confirmationDescription}
          contactTitle={THANKYOU_CONTENT.contactTitle}
          contactPhoneLabel={THANKYOU_CONTENT.contactPhoneLabel}
          contactPhoneHref={THANKYOU_CONTENT.contactPhoneHref}
          redirectPath="/"
          sendWelcomeEmail={false}
          ads={THANKYOU_ADS}
        />
      </Suspense>
      <Footer />
    </div>
  )
}
