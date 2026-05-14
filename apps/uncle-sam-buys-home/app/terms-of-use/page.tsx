import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import TermsAndConditions from "@/app/_components/TermsAndConditions"
import Footer from "@/app/_components/Footer"
import { SITE_BRAND } from "@/lib/constant"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_BRAND.name}. Read this agreement before using our website or submitting your information.`,
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