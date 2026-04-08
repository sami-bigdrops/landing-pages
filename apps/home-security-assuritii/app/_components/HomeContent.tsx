"use client"

import { useState } from "react"
import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Partners from "@/app/type/long/v1/_components/parners"
import Footer from "@/app/_components/Footer"
import { FormPopupModal } from "@/app/type/long/v1/_components/FormPopupModal"
import Form from "@/app/type/long/v1/_components/Form"
import About from "@/app/type/long/v1/_components/About"
import Features from "@/app/type/long/v1/_components/Features"
import Works from "@/app/type/long/v1/_components/Works"

export default function HomeContent() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Partners />
        <About />
        <Features />
        <Works />
        <Footer />
      </div>
      <FormPopupModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <Form onClose={() => setIsFormModalOpen(false)} embedInModal />
        </div>
      </FormPopupModal>
    </>
  )
}
