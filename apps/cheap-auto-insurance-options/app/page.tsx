import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Cheap Auto Insurance Options",
  description:
    "Cheap Auto Insurance Options provides affordable auto insurance quotes and outstanding customer care to drivers across the USA. Compare rates and find coverage that suits your needs and budget.",
}

export default function Page() {
  return <HomeContent />
}
