"use client"

import { useRef, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"
import { ThankYouType2, type ThankYouAd } from "@/app/_components/ThankYouType2"
import {
  THANKYOU_CONTENT,
  THANKYOU_REQUIRE_EMAIL_IN_PARAMS,
  THANKYOU_TYPE2_CONTENT,
  THANKYOU_TYPE2_CONTENT_NO_PARTNER,
} from "@/lib/constant"

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

type ThankYouPageContentProps = {
  loadingFallback?: ReactNode
}

export function ThankYouPageContent({ loadingFallback }: ThankYouPageContentProps) {
  const searchParams = useSearchParams()
  const firstNameRef = useRef<string | null>(null)
  const buyerIdRef = useRef<string | null>(null)

  if (firstNameRef.current === null) {
    firstNameRef.current =
      searchParams.get("firstName")?.trim() ||
      searchParams.get("first_name")?.trim() ||
      ""
  }

  if (buyerIdRef.current === null) {
    buyerIdRef.current = searchParams.get("buyer_id")?.trim() || ""
  }

  const firstName = firstNameRef.current
  const buyerId = buyerIdRef.current
  const showPrimeStreet = buyerId === "01"
  const baseContent = showPrimeStreet
    ? THANKYOU_TYPE2_CONTENT
    : THANKYOU_TYPE2_CONTENT_NO_PARTNER

  const title = firstName
    ? THANKYOU_CONTENT.title.replace("{first_name}", firstName)
    : THANKYOU_CONTENT.titleFallback

  return (
    <ThankYouType2
      content={{
        ...baseContent,
        title,
      }}
      ads={THANKYOU_ADS}
      redirectPath="/"
      loadingFallback={loadingFallback}
      requireEmailInParams={THANKYOU_REQUIRE_EMAIL_IN_PARAMS}
    />
  )
}
