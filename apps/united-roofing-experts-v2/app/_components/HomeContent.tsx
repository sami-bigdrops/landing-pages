"use client"

import { useUtmParams } from "@workspace/lp-core"
import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"

export default function HomeContent() {
  useUtmParams(30)

  return (
    <div className="flex w-full flex-col">
      <div className="flex h-dvh w-full flex-col overflow-hidden">
        <Navbar />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <Hero />
        </div>
      </div>
      <Footer />
    </div>
  )
}
