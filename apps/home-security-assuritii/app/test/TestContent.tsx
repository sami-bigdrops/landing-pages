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
import Trust from "@/app/type/long/v1/_components/Trust"
import Choose from "@/app/type/long/v1/_components/Choose"
import Info from "@/app/type/long/v1/_components/Info"

const PLACEHOLDER_PHONE = "(1800) XXX - XXXX"

export default function TestContent() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar contactLabel={PLACEHOLDER_PHONE} contactHref="#" />
        <Hero />
        <Partners />
        <About />
        <Features />
        <Works onGetQuoteClick={() => setIsFormModalOpen(true)} />
        <Trust />
        <Choose />
        <Info onGetQuoteClick={() => setIsFormModalOpen(true)} />
        <Footer />
      </div>
      <FormPopupModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        <div className="px-4 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4">
          <Form embedInModal phonePlaceholder={PLACEHOLDER_PHONE} />
        </div>
      </FormPopupModal>
    </>
  )
}
