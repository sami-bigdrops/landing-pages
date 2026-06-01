import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import OptOutContent from "@/app/_components/OptOutContent"
import Footer from "@/app/_components/Footer"
import { BRAND_FULL_NAME, FORM_LIGHT_BG } from "@/lib/constant"

export const metadata: Metadata = {
  title: "Opt Out",
  description: `Opt out of marketing communications from ${BRAND_FULL_NAME}.`,
}

export default function OptOutPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: FORM_LIGHT_BG }}
    >
      <Navbar />
      <OptOutContent />
      <Footer />
    </div>
  )
}
