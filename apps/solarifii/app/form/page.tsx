import FormPageWrapper from "@/app/type/long/v1/_components/Form"
import Navbar from "@/app/_components/Navbar"
import Footer from "@/app/_components/Footer"

export default function FormRoute() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <FormPageWrapper />
      <Footer />
    </div>
  )
}
