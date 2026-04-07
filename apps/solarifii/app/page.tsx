import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Solarifii - Solar Panel Solutions",
  description:
    "Solarifii helps homeowners switch to solar energy with ease. Get expert advice, transparent pricing, and top-rated solar solutions to save money and protect the environment.",
}

export default function Page() {
  return <HomeContent />
}
