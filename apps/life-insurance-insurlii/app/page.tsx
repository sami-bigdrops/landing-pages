import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Insurlii Life Insurance - Get Quotes Fast",
  description:
    "Insurlii Life Insurance helps you compare and get the best life insurance quotes quickly. Fast, competitive rates, and excellent customer support across the USA.",
}

export default function Page() {
  return <HomeContent />
}
