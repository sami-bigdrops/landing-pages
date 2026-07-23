import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: {
    absolute: "MediSavingz | Compare Medicare Options",
  },
  description:
    "Compare Medicare options with MediSavingz, a trusted non-government resource. Review plans around your doctors, prescriptions, pharmacy preferences, and budget.",
}

export default function Page() {
  return <HomeContent />
}
