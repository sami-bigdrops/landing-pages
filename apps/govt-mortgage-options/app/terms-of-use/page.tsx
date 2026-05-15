import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import TermsAndConditions from "@/app/_components/TermsAndConditions"
import Footer from "@/app/_components/Footer"
import { SITE_BRAND } from "@/lib/constant"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `${SITE_BRAND.name} terms of use and conditions. Please read these terms before using our services.`,
}

export default function TermsOfUsePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TermsAndConditions />
      <Footer />
    </div>
  )
}