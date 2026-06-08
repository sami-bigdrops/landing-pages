import { Metadata } from "next"
import FormPageWrapper from "@/app/type/long/v1/_components/Form"
import {
  BRAND_DESCRIPTION,
  BRAND_FORM_PAGE_TITLE,
  BRAND_FULL_NAME,
  FORM_LIGHT_BG,
} from "@/lib/constant"
import Navbar from "../_components/Navbar"
import Footer from "../_components/Footer"

export const metadata: Metadata = {
  title: BRAND_FORM_PAGE_TITLE,
  description: BRAND_DESCRIPTION,
  openGraph: {
    title: `${BRAND_FORM_PAGE_TITLE} | ${BRAND_FULL_NAME}`,
    description: BRAND_DESCRIPTION,
  },
}

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
