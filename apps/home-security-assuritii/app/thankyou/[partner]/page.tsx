import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import { ThankYouType2, type ThankYouAd } from "@/app/_components/ThankYouType2"
import {
  getThankYouContentForPartner,
  isThankYouPartnerSlug,
  THANKYOU_PARTNER_SLUGS,
} from "@/lib/constant"

const THANKYOU_ADS: ThankYouAd[] = [
  // {
  //   image: "/2.png",
  //   link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=115&sub1=pwe_${utm_source}&sub2=${utm_id}",
  // },
  {
    image: "/3.jpg",
    link: "https://www.platinum-home-track.com/28KL6/49FHNSP/?uid=113&sub1=pwe_${utm_source}&sub2=${utm_id}",
  },
]

export async function generateStaticParams() {
  return THANKYOU_PARTNER_SLUGS.map((partner) => ({ partner }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partner: string }>
}): Promise<Metadata> {
  const { partner } = await params
  const content = getThankYouContentForPartner(partner)
  return {
    title: content ? `Thank You | ${content.partnerName}` : "Thank You",
    description:
      "Your request has been received. A home security specialist will contact you shortly.",
  }
}

function ThankYouLoading() {
  return (
    <main className="flex min-h-[50vh] flex-1 flex-col items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-gray-200 border-t-sky-600" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </main>
  )
}

export default async function ThankYouPartnerPage({
  params,
}: {
  params: Promise<{ partner: string }>
}) {
  const { partner } = await params
  if (!isThankYouPartnerSlug(partner)) notFound()
  const content = getThankYouContentForPartner(partner)
  if (!content) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Suspense fallback={<ThankYouLoading />}>
        <ThankYouType2
          content={content}
          ads={THANKYOU_ADS}
          redirectPath="/"
          loadingFallback={<ThankYouLoading />}
        />
      </Suspense>
      <Footer />
    </div>
  )
}
