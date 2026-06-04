"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"
import Partners from "@/app/type/long/v1/_components/Partners"
import Options from "@/app/type/long/v1/_components/Options"
import Features from "@/app/type/long/v1/_components/Features"

export default function HomeContent() {
  return (
    <div className="flex flex-col">
      <div className="flex h-svh min-h-0 flex-col">
        <Navbar />
        <Hero />
        <Partners />
      </div>
      <Features />
      <Options />
      <Footer />
    </div>
  )
}
