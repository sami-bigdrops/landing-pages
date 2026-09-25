import { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import Form from "@/app/type/long/v1/_components/Form"

export const metadata: Metadata = {
  title: "Get Your Free Window Quote | Windowfii",
  description:
    "Answer a few quick questions so Windowfii can help you compare window replacement options for your home.",
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
