"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Review from "@/app/type/long/v1/_components/Review"
import Footer from "@/app/_components/Footer"
import Partners from "@/app/type/long/v1/_components/Partners"
import WhyRefinance from "@/app/type/long/v1/_components/WhyRefinance"
import Options from "@/app/type/long/v1/_components/Options"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Partners />
      <WhyRefinance />
      <Review />
      <Options /> 
      <Footer />
    </div>
  )
}
