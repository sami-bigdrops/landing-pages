import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "MediSavingz",
  description:
    "MediSavingz helps individuals and families discover ways to save on healthcare and insurance costs. Compare plans, explore affordable options, and access trustworthy resources to maximize your medical savings with MediSavingz.",
}

export default function Page() {
  return <HomeContent />
}
