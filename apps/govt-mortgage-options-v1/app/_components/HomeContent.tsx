"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"
import WhyRefinance from "@/app/type/long/v1/_components/WhyRefinance"
import { HERO_CONTENT } from "@/lib/constant"

export default function HomeContent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_CONTENT.image.src})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#1C2833]/50" aria-hidden />
        <div className="relative z-10">
          <Hero />
        </div>
      </section>
      <WhyRefinance />
      <Footer />
    </div>
  )
}
