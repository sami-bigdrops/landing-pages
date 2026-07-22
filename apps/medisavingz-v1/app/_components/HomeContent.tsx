"use client"

import { useCallback, useState } from "react"
import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"

import Steps from "@/app/type/long/v1/_components/Steps"
import Works from "@/app/type/long/v1/_components/Works"
import Options from "@/app/type/long/v1/_components/Options"
import Faq from "@/app/type/long/v1/_components/Faq"
import Ribbon from "@/app/type/long/v1/_components/Ribbon"
import Coverage from "@/app/type/long/v1/_components/Coverage"
import Form from "@/app/type/long/v1/_components/Form"

export default function HomeContent() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [submittedZip, setSubmittedZip] = useState("")

  const handleZipSubmit = useCallback((zip: string) => {
    setSubmittedZip(zip)
    setIsFormOpen(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {isFormOpen ? (
        <Form initialZip={submittedZip} />
      ) : (
        <>
          <Hero onZipSubmit={handleZipSubmit} />
          <Ribbon />
          <Steps />
          <Coverage />
          <Works />
          <Faq />
          <Options />
        </>
      )}
      <Footer />
    </div>
  )
}
