import FormPageWrapper from "@/app/type/long/v2/_components/Form"
import Navbar from "../_components/Navbar"
import FormFooter from "../type/long/v2/_components/Form-footer"

export default function FormRoute() {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col">
        <FormPageWrapper />
      </div>
      <FormFooter />
    </div>
  )
}
