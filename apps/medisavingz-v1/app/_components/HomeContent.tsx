"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"

import Steps from "@/app/type/long/v1/_components/Steps"
import Works from "@/app/type/long/v1/_components/Works"
import Options from "@/app/type/long/v1/_components/Options"
import Faq from "@/app/type/long/v1/_components/Faq"
import Ribbon from "@/app/type/long/v1/_components/Ribbon"
import Coverage from "@/app/type/long/v1/_components/Coverage"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />
      <Hero />
      <Ribbon />
      <Steps />
      <Coverage />
      <Works />
      <Faq />
      <Options />
      
      <Footer />
    </div>
  )
}
