import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import HippaAuthorization from "@/app/_components/HippaAuthorization"
import Footer from "@/app/_components/Footer"

export const metadata: Metadata = {
  title: "HIPAA Authorization",
  description:
    "Review the MediSavingz HIPAA Authorization detailing how your contact and insurance-related information may be used and shared for Medicare and related product outreach, and how you can revoke consent.",
}

export default function HippaAuthorizationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HippaAuthorization />
      <Footer />
    </div>
  )
}
