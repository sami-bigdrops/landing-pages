import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Cheap Home Insurance Options",
  description:
    "Cheap Home Insurance Options helps homeowners find affordable home insurance plans quickly and easily. Compare quotes and save on home insurance with trusted providers.",
}

export default function Page() {
  return <HomeContent />
}
