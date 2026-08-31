import LoanForm from "@/app/type/long/v1/_components/loan-form/LoanForm"
import Navbar from "../_components/Navbar"
import Footer from "../_components/Footer"

export default function FormRoute() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-dvh w-full flex-col overflow-hidden">
        <Navbar />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#F8FAFC]">
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6 sm:px-6 md:px-8 md:py-8">
            <LoanForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
