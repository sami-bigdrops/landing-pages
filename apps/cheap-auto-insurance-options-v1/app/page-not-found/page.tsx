import type { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import PageNotFoundContent from "@/app/_components/PageNotFoundContent"

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page or quote offer you requested could not be found. Return home to compare auto insurance options.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PageNotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageNotFoundContent />
      <Footer />
    </div>
  )
}
