import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Windowfii",
  description:
    "Windowfii connects you with expert home window replacement and installation services. Discover trusted local window installers and upgrade your home's efficiency and curb appeal at windowfii.com.",
}

export default function Page() {
  return <HomeContent />
}
