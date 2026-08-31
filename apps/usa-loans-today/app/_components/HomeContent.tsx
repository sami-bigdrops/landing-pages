"use client"

import { useState } from "react"
import Navbar from "@/app/_components/Navbar"
import Hero from "@/app/type/long/v1/_components/Hero"
import Review from "@/app/type/long/v1/_components/Review"
import Footer from "@/app/_components/Footer"
import Faq from "@/app/type/long/v1/_components/Faq"
import Works from "@/app/type/long/v1/_components/Works"
import Compare from "@/app/type/long/v1/_components/Compare"
import Options from "@/app/type/long/v1/_components/Options"
import Needs from "@/app/type/long/v1/_components/Needs"
import { BorrowAmountDialog } from "@/app/type/long/v1/_components/BorrowAmountDialog"

export default function HomeContent() {
  const [borrowDialogOpen, setBorrowDialogOpen] = useState(false)

  const openBorrowDialog = () => setBorrowDialogOpen(true)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Works onGetQuoteClick={openBorrowDialog} />
        <Needs />
        <Compare onGetQuoteClick={openBorrowDialog} />
        <Review />
        <Faq />
        <Options onGetQuoteClick={openBorrowDialog} />
      </main>
      <Footer />
      <BorrowAmountDialog
        isOpen={borrowDialogOpen}
        onClose={() => setBorrowDialogOpen(false)}
      />
    </div>
  )
}
