import FormPageWrapper from "@/app/type/long/v1/_components/Form"
import Navbar from "../_components/Navbar"
import Footer from "../_components/Footer"

export default function FormRoute() {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col">
        <FormPageWrapper />
      </div>
      <Footer />
    </div>
  )
}
