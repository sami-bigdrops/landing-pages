import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import CaliforniaPrivacyChoices from "@/app/_components/CaliforniaPrivacyChoices"
import Footer from "@/app/_components/Footer"

export const metadata: Metadata = {
  title: "California Privacy Choices",
  description:
    "Protectifii California Privacy Choices and Privacy Policy. Learn how we collect, use, and share personal information and how to exercise your CCPA rights.",
}

export default function CaliforniaPrivacyChoicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CaliforniaPrivacyChoices />
      <Footer />
    </div>
  )
}
