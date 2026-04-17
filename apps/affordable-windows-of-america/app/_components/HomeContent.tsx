"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Choose from "@/app/type/long/v1/_components/Choose"
import Footer from "@/app/_components/Footer"
import About from "@/app/type/long/v1/_components/About"
import Cost from "@/app/type/long/v1/_components/Cost"
import Options from "@/app/type/long/v1/_components/Options"
import Works from "@/app/type/long/v1/_components/Works"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Choose />
      <Cost />
      <Options />
      <Footer />
    </div>
  )
}
