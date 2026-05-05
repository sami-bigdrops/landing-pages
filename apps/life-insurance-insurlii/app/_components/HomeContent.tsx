"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Review from "@/app/type/long/v1/_components/Review"
import Footer from "@/app/_components/Footer"
import Partners from "@/app/type/long/v1/_components/Badge"
import Options from "@/app/type/long/v1/_components/Options"
import Features from "@/app/type/long/v1/_components/Features"
import Badge from "@/app/type/long/v1/_components/Badge"
import Works from "@/app/type/long/v1/_components/Works"
import FAQ from "@/app/type/long/v1/_components/FAQ"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Badge />
      <Features />
      <Works />
      <FAQ />
      <Options /> 
      <Footer />
    </div>
  )
}
