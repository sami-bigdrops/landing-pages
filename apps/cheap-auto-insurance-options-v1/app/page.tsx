import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Cheap Auto Insurance Options",
  description:
    "Cheap Auto Insurance Options helps drivers find affordable auto insurance plans quickly and easily. Compare quotes and save on car insurance with trusted providers at cheapautoinsuranceoptions.com.",
}

export default function Page() {
  return <HomeContent />
}
