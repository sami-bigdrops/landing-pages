import { Metadata } from "next"
import HomeContentV2 from "@/app/_components/HomeContentV2"

export const metadata: Metadata = {
  title: "United Roofing Experts",
  description:
    "United Roofing Experts provides top-quality roofing services across the USA. We offer energy-efficient windows, expert installation, and outstanding customer care to help homeowners enhance comfort, value, and curb appeal.",
}

export default function Page() {
  return <HomeContentV2 />
}
