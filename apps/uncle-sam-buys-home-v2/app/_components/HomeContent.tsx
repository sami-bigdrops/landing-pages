"use client"

import { useCallback } from "react"
import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"
import Offer from "@/app/type/long/v1/_components/Offer"
import Help from "@/app/type/long/v1/_components/Help"
import Works from "@/app/type/long/v1/_components/Works"
import Steps from "@/app/type/long/v1/_components/Steps"
import Review from "@/app/type/long/v1/_components/Review"
import Info from "@/app/type/long/v1/_components/Info"

export default function HomeContent() {
  const scrollToOffer = useCallback(() => {
    document.getElementById("offer-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, [])

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <Navbar />
        <Hero onGetQuoteClick={scrollToOffer} />
        <Offer />
        <Help onGetQuoteClick={scrollToOffer} />
        <Steps onGetQuoteClick={scrollToOffer} />
        <Works onGetQuoteClick={scrollToOffer} />
        <Review onGetQuoteClick={scrollToOffer} />
        <Info onGetQuoteClick={scrollToOffer} />
        <Footer />
      </div>
    </>
  )
}
