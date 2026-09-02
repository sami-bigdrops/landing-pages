import FormPageWrapper from "@/app/type/long/v1/_components/Form"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"

export default function FormRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-10 xl:px-20 xl:py-14">
        <FormPageWrapper />
      </div>
      <Footer />
    </div>
  )
}
