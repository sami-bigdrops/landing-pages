"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Choose from "@/app/type/long/v1/_components/Choose"
import Review from "../type/long/v1/_components/Review"
import Footer from "@/app/_components/Footer"
import Trust from "@/app/type/long/v1/_components/Trust"
import Ribbon from "@/app/type/long/v1/_components/Ribbon"
import Works from "../type/long/v1/_components/Works"
import Rating from "@/app/type/long/v1/_components/Rating"

export default function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Ribbon />
      <Works />
      <Rating />
      <Review />
      <Footer />
    </div>
  )
}
