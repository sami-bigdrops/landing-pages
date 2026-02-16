"use client"

import Navbar from "@/app/_components/Navbar"
import Ribbon from "@/app/_components/Ribbon"
import Hero from "@/app/type/long/v1/_components/Hero"
import Work from "@/app/type/long/v1/_components/Work"
import Features from "@/app/type/long/v1/_components/Features"
import Review from "@/app/type/long/v1/_components/Review"
import Faq from "@/app/type/long/v1/_components/Faq"
import About from "@/app/type/long/v1/_components/About"
import Cover from "@/app/type/long/v1/_components/Cover"
import Footer from "@/app/_components/Footer"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Ribbon />
      <Hero />
      <About />
      <Work />
      <Cover />
      <Features />
      <Review />
      <Faq />
      <Footer />
    </div>
  )
}
