import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import TermsAndConditions from "@/app/_components/TermsAndConditions"
import Footer from "@/app/_components/Footer"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the MediSavingz Terms of Use for the rules governing your use of our website and services, including arbitration, disclaimers, and your rights and responsibilities.",
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