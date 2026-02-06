"use client"
import Navbar from "@/app/_components/Navbar"
import Ribbon from "@/app/_components/Ribbon"
import Hero from "@/app/type/long/v1/_components/Hero"
import Steps from "@/app/type/long/v1/_components/Steps"
import Features from "@/app/type/long/v1/_components/Features"
import Review from "@/app/type/long/v1/_components/Review"
import Faq from "@/app/type/long/v1/_components/Faq"


export default function Page() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Ribbon />
      <Hero />
      <Steps />
      <Features />
      <Review />
      <Faq />
    </div>
     
  )
}
