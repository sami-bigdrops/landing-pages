"use client"

import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"
import Hero from "../type/long/v2/_components/Hero"
import Features from "../type/long/v2/_components/Features"



export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
  )
}
