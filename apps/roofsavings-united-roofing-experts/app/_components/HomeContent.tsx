"use client"

import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Footer from "@/app/_components/Footer"
import Works from "@/app/type/long/v1/_components/Works"
import { FormPopupProvider, useFormPopup } from "@/app/type/long/v1/_components/FormPopupContext"
import { FormPopupModal } from "@/app/type/long/v1/_components/FormPopupModal"
import FormPage from "@/app/type/long/v1/_components/Form"
import Roof from "@/app/type/long/v1/_components/Roof"

function FormPopupGate() {
  const { isOpen, closeFormPopup } = useFormPopup()
  return (
    <FormPopupModal isOpen={isOpen} onClose={closeFormPopup}>
      <FormPage onClose={closeFormPopup} embedInModal />
    </FormPopupModal>
  )
}

export default function HomeContent() {
  return (
    <FormPopupProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <Works />
        <Roof />
        
        <Footer />
      </div>
      <FormPopupGate />
    </FormPopupProvider>
  )
}
