import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import CookiesAndOtherTechnology from "@/app/_components/CookiesAndOtherTechnology"
import Footer from "@/app/_components/Footer"

export const metadata: Metadata = {
  title: "Cookies and Other Technology",
  description:
    "Protectifii Cookies and Other Technology policy. Learn how we use cookies, tracking technologies, and your privacy choices.",
}

export default function CookiesAndOtherTechnologyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CookiesAndOtherTechnology />
      <Footer />
    </div>
  )
}
