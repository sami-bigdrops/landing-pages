"use client"

import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer-v2"
import Hero from "../type/long/v2/_components/Hero"
import Features from "../type/long/v2/_components/Features"
import Roof from "../type/long/v2/_components/Roof"



export default function HomeContent() {
  return (
    <div className="flex w-full flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <Roof />
        <Footer />
      </div>
  )
}
