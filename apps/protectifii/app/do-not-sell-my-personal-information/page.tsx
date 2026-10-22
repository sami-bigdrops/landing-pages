import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import DoNotSellContent from "@/app/_components/DoNotSellContent"
import Footer from "@/app/_components/Footer"

export const metadata: Metadata = {
  title: "Do Not Sell My Personal Information",
  description:
    "California privacy rights request form. Access, delete, or opt out of the sale of your personal information with Protectifii.",
}

export default function DoNotSellPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <DoNotSellContent />
      <Footer />
    </div>
  )
}
