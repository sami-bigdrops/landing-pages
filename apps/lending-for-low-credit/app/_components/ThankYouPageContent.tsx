"use client"

import type { ReactNode } from "react"
import { ThankYouType2 } from "@/app/_components/ThankYouType2"
import {
  THANKYOU_REQUIRE_EMAIL_IN_PARAMS,
  THANKYOU_TYPE2_CONTENT,
} from "@/lib/constant"

type ThankYouPageContentProps = {
  loadingFallback?: ReactNode
}

export function ThankYouPageContent({ loadingFallback }: ThankYouPageContentProps) {
  return (
    <ThankYouType2
      content={THANKYOU_TYPE2_CONTENT}
      redirectPath="/"
      loadingFallback={loadingFallback}
      requireEmailInParams={THANKYOU_REQUIRE_EMAIL_IN_PARAMS}
    />
  )
}
