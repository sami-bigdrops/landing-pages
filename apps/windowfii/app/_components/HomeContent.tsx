"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"
import Partners from "@/app/type/long/v1/_components/Partners"
import Features from "@/app/type/long/v1/_components/Features"
import Review from "@/app/type/long/v1/_components/Review"
import Steps from "@/app/type/long/v1/_components/Steps"
import Options from "@/app/type/long/v1/_components/Options"
import Faq from "@/app/type/long/v1/_components/Faq"


export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />
      <Hero />
      <Partners />
      <Features />
      <Steps />
      <Review />
      <Faq />
      <Options />
      
      <Footer />
    </div>
  )
}
