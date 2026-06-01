import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import OptOutContent from "@/app/_components/OptOutContent"
import Footer from "@/app/_components/Footer"

export const metadata: Metadata = {
  title: "Opt Out",
  description: "Opt out of marketing communications from Insurlii Auto Insurance.",
}

export default function OptOutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <OptOutContent />
      <Footer />
    </div>
  )
}
