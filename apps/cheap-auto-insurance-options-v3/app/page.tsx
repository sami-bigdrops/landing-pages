import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Cheap Auto Insurance Options",
  description:
    "Cheap Auto Insurance Options helps you compare auto insurance and get quotes instantly from top companies. Find affordable coverage and save money with free, fast comparisons.",
}

export default function Page() {
  return <HomeContent />
}
