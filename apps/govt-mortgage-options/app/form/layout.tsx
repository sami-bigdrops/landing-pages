import type { Metadata } from "next"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"

export const metadata: Metadata = {
  title: "Get Your Rate",
  description: "Find the best mortgage rate for your situation.",
}

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F9]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-5">
        {children}
      </main>
      <Footer />
    </div>
  )
}
