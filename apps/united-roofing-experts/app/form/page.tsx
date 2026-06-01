import FormPageWrapper from "@/app/type/long/v2/_components/Form"
import Navbar from "../_components/Navbar"
import Footer from "../_components/Footer-v2"

export default function FormRoute() {
  return (
    <div className="w-full h-full flex flex-col min-h-screen">
      <Navbar />
      <FormPageWrapper />
      <Footer />
    </div>
  )
}
