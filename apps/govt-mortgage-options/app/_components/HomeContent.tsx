"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"
import WhyRefinance from "@/app/type/long/v1/_components/WhyRefinance"
import Options from "@/app/type/long/v1/_components/Options"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <WhyRefinance />
      <Options /> 
      <Footer />
    </div>
  )
}
