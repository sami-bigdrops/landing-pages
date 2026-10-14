"use client"

import { useCallback, useState } from "react"
import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"
import Steps from "@/app/type/long/v1/_components/Steps"
import Info from "@/app/type/long/v1/_components/Info"

export default function HomeContent() {
  const [formStep, setFormStep] = useState(1)

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
        <Hero onGetQuoteClick={scrollToOffer} onFormStepChange={setFormStep} />
        <Steps onGetQuoteClick={scrollToOffer} />
        {formStep < 2 ? <Info onGetQuoteClick={scrollToOffer} /> : null}
        <Footer />
      </div>
    </>
  )
}
