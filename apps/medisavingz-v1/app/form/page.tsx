import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import Form from "@/app/type/long/v1/_components/Form"

export const metadata: Metadata = {
  title: "Review Your Medicare Options",
  description:
    "Answer a few quick questions so MediSavingz can help you compare Medicare Advantage, Part D, and related plan options that fit your doctors, prescriptions, and budget.",
}

export default function FormRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <Form />
      <Footer />
    </div>
  )
}
