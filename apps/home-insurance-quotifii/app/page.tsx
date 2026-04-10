import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Quotifii Home Insurance",
  description:
    "Quotifii Home Insurance provides premier home insurance services to protect your property and peace of mind. Enjoy comprehensive coverage, expert guidance, and dedicated customer care for homeowners across the USA.",
}

export default function Page() {
  return <HomeContent />
}
