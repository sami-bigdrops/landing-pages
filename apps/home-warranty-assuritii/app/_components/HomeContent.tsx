"use client"

import { useState } from "react"
import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Work from "@/app/type/long/v1/_components/Work"
import Review from "@/app/type/long/v1/_components/Review"
import Faq from "@/app/type/long/v1/_components/Faq"
import About from "@/app/type/long/v1/_components/About"
import Cover from "@/app/type/long/v1/_components/Cover"
import Footer from "@/app/_components/Footer"
import { FormPopupModal } from "@/app/type/long/v1/_components/FormPopupModal"
import Form from "@/app/type/long/v1/_components/Form"

export default function HomeContent() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Work onGetQuoteClick={() => setIsFormModalOpen(true)} />
        <Cover onGetQuoteClick={() => setIsFormModalOpen(true)} />

        <Review />
        <Faq />
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
