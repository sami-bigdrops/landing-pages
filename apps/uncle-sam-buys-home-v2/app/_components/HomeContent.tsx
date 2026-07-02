"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"
import Offer from "@/app/type/long/v1/_components/Offer"

export default function HomeContent() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <Navbar />
        <Hero />
        <Offer />
        <Footer />
      </div>
    </>
  )
}
