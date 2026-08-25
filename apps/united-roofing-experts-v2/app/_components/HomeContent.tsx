"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"

export default function HomeContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}
