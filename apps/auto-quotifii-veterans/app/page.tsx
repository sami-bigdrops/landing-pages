import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Auto Quotifii Veterans",
  description:
    "Auto Quotifii Veterans provides top-quality auto insurance services across the USA. We offer auto insurance, expert installation, and outstanding customer care to help homeowners enhance comfort, value, and curb appeal.",
}

export default function Page() {
  return <HomeContent />
}
