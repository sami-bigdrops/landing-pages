import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Home Security Assuritii | Get a free home security quote",
  description:
    "Secure your home and protect your loved ones. Get a free quote for Assuritii Home Security solutions.",
}

export default function Page() {
  return <HomeContent />
}
