import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import PrivacyPolicy from "@/app/_components/PrivacyPolicy"
import Footer from "@/app/_components/Footer"
import JsonLd from "@/app/_components/JsonLd"
import { buildPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo"

const TITLE = "Privacy Policy"
const DESCRIPTION =
  "Read the Quotifii privacy policy to learn how we collect, use, and protect your personal information when you compare auto and home insurance quotes in the United States."

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy-policy",
})

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </div>
  )
}
