import FormPageWrapper from "@/app/type/long/v1/_components/Form"
import { FORM_LIGHT_BG } from "@/lib/constant"
import Navbar from "../_components/Navbar"
import Footer from "../_components/Footer"

export default function FormRoute() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: FORM_LIGHT_BG }}
    >
      <Navbar className="bg-transparent" />
      <FormPageWrapper />
      <Footer />
    </div>
  )
}
