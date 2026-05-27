"use client"

import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import Form from "@/app/type/long/v1/_components/Form"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Form />
      <Footer />
    </div>
  )
}
