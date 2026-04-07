"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Benefits from "@/app/type/long/v1/_components/Benefits"
import Choose from "@/app/type/long/v1/_components/Choose"
import Replace from "@/app/type/long/v1/_components/Replace"
import Review from "@/app/type/long/v1/_components/Review"
import Footer from "@/app/_components/Footer"
import Trust from "@/app/type/long/v1/_components/Trust"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      {/* <Benefits />
      <Choose />
      <Replace />
      <Review />
      <Trust />
       */}
       <Footer />
    </div>
  )
}
