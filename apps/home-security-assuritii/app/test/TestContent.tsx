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

const PLACEHOLDER_PHONE = "(1800) XXX - XXXX"
const PLACEHOLDER_OFFER = "LIMITED OFFER! : <YOUR PROMOTIONAL OFFER>"

export default function TestContent() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar contactLabel={PLACEHOLDER_PHONE} contactHref="#" />
        <Hero offerText={PLACEHOLDER_OFFER} />
        <About />
        <Work onGetQuoteClick={() => setIsFormModalOpen(true)} />
        <Cover
          onGetQuoteClick={() => setIsFormModalOpen(true)}
          phoneNumber={PLACEHOLDER_PHONE}
          phoneHref="#"
        />
        <Review placeholder />
        <Faq />
        <Footer />
      </div>
      <FormPopupModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <Form embedInModal phonePlaceholder={PLACEHOLDER_PHONE} />
        </div>
      </FormPopupModal>
    </>
  )
}
