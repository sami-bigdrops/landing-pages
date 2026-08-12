import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import TermsAndConditions from "@/app/_components/TermsAndConditions"
import Footer from "@/app/_components/Footer"
import JsonLd from "@/app/_components/JsonLd"
import { buildPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo"

const TITLE = "Terms of Use"
const DESCRIPTION =
  "Review the Quotifii terms of use for our U.S. auto and home insurance quote comparison website, including site policies and user responsibilities."

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms-of-use",
})

export default function TermsOfUsePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms-of-use" },
        ])}
      />
      <Navbar />
      <TermsAndConditions />
      <Footer />
    </div>
  )
}
