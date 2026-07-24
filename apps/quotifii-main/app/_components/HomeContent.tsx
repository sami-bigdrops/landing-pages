"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Review from "@/app/type/long/v1/_components/Review"
import Footer from "@/app/_components/Footer"
import Partners from "@/app/type/long/v1/_components/Partners"
import Steps from "@/app/type/long/v1/_components/Steps"
import Features from "@/app/type/long/v1/_components/Features"
import Faq from "@/app/type/long/v1/_components/Faq"
import Coverage from "@/app/type/long/v1/_components/Coverage"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Partners />
      <Features />
      <Steps />
      <Review />
      <Coverage />
      <Faq />
    
      <Footer />
    </div>
  )
}
