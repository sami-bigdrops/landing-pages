"use client"

import Navbar from "@/app/_components/Navbar"
import TopNav from "@/app/type/long/v1/_components/Top-nav"
import Hero from "@/app/type/long/v1/_components/Hero"
import Help from "@/app/type/long/v1/_components/Help"
import Footer from "@/app/_components/Footer"


export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <Navbar />
      <Hero />
      <Help />
      <Footer />
    </div>
  )
}
