import FormPageWrapper from "@/app/type/long/v1/_components/Form"
import Navbar from "../_components/Navbar.js"
import Footer from "../_components/Footer.js"

export default function FormRoute() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <FormPageWrapper />
      <Footer />
    </div>
  )
}
