"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Review from "@/app/type/long/v1/_components/Review"
import Footer from "@/app/_components/Footer"
import Partners from "@/app/type/long/v1/_components/Partners"
import Options from "@/app/type/long/v1/_components/Options"
import Features from "@/app/type/long/v1/_components/Features"

export default function HomeContent() {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <Partners />
      <Review />
      <Features />
      <Options /> 
      <Footer />
    </div>
  )
}
