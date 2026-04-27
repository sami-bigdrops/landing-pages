import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Affordable Windows of America",
  description:
    "Affordable Windows of America delivers high-quality, energy-efficient window replacement services nationwide. We specialize in expert installations and exceptional customer care, helping homeowners increase comfort, value, and curb appeal with affordable solutions.",
}

export default function Page() {
  return <HomeContent />
}
