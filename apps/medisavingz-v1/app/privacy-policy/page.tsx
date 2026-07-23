import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import PrivacyPolicy from "@/app/_components/PrivacyPolicy"
import Footer from "@/app/_components/Footer"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the MediSavingz Privacy Policy to learn how we collect, use, disclose, retain, and protect your personal information when you use our website and Medicare comparison services.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </div>
  )
}