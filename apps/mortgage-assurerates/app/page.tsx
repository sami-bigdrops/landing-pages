import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Mortgage Assurerates",
  description:
    "Mortgage Assurerates provides top-quality mortgage services across the USA. We offer mortgage, expert installation, and outstanding customer care to help homeowners enhance comfort, value, and curb appeal.",
}

export default function Page() {
  return <HomeContent />
}
